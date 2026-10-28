import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { portfolioCards, portfolioGroups } from '../../data/home';

const ORBIT_SPEED = 0.16; // radians per second
const SPIN_SPEED = 0.12; // building turn, radians per second
const TILT = 0.5; // how far the orbit ring leans towards the viewer
const PITCH = 0.52; // camera elevation looking down on the building
const PERSPECTIVE = 1100;
const CYCLE_SECONDS = 9; // one closed → open → closed loop
const START_YAW = 0.6;

// Bottom-up: a foundation slab, then one floor per portfolio group.
const FLOORS = [{ key: 'foundation' }, ...portfolioGroups];
const LIGHT = { x: -0.55, y: 0.62, z: 0.56 };

// Shaded RGB for a face whose rotated normal is n.
const shade = ([r, g, b], n) => {
  const k = 0.78 + 0.22 * Math.max(-1, Math.min(1, n.x * LIGHT.x + n.y * LIGHT.y + n.z * LIGHT.z));
  return `${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)}`;
};

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

// Box sides as [corner a, corner b, outward normal], corners ordered as in `square` below.
const SIDES = [
  [0, 1, { x: 0, y: 0, z: -1 }],
  [1, 2, { x: 1, y: 0, z: 0 }],
  [2, 3, { x: 0, y: 0, z: 1 }],
  [3, 0, { x: -1, y: 0, z: 0 }],
];
const square = (cx, cz, hw, hd, y) => [
  [cx - hw, y, cz - hd],
  [cx + hw, y, cz - hd],
  [cx + hw, y, cz + hd],
  [cx - hw, y, cz + hd],
];

// Portfolio images orbiting a glass tower whose floors separate into an exploded view and close again.
// Cards behind the tower sink beneath it, the ring leans with the pointer, hovering holds the tower open
// and stops the orbit, and the ring can be dragged.
export default function PortfolioOrbit() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cards = cardRefs.current;
    const count = cards.length;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const view = { w: 0, h: 0, cx: 0, cy: 0, ring: 0, size: 0 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const motion = { orbit: 0, yaw: START_YAW, speed: ORBIT_SPEED, target: ORBIT_SPEED, clock: 0 };
    const tower = { open: still ? 1 : 0, hold: false };
    const drag = { active: false, lastX: 0, moved: 0, velocity: 0 };
    let frame = null;
    let last = 0;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.w = stage.clientWidth;
      view.h = stage.clientHeight;
      view.cx = view.w / 2;
      view.cy = view.h / 2;
      view.ring = Math.min(view.w * 0.39, view.h * 0.6);
      view.size = Math.min(view.w, view.h) * 0.27;
      canvas.width = Math.round(view.w * dpr);
      canvas.height = Math.round(view.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cardWidth = Math.max(84, Math.min(view.w * 0.19, 150));
      stage.style.setProperty('--card-w', `${cardWidth.toFixed(0)}px`);
    };

    // ---- Orbit ring ----
    const ringPoint = (a, radius, tilt, roll) => {
      const x = radius * Math.cos(a);
      const z0 = radius * Math.sin(a);
      const y = z0 * Math.sin(tilt);
      const z = z0 * Math.cos(tilt);
      const scale = PERSPECTIVE / (PERSPECTIVE - z);
      const sx = x * scale;
      const sy = y * scale;
      return {
        x: sx * Math.cos(roll) - sy * Math.sin(roll),
        y: sx * Math.sin(roll) + sy * Math.cos(roll),
        z,
        scale,
      };
    };

    const strokeRing = (tilt, roll, front, alpha, dash) => {
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 120; i += 1) {
        const p = ringPoint((i / 120) * Math.PI * 2, view.ring, tilt, roll);
        if (p.z >= 0 !== front) {
          started = false;
          continue;
        }
        if (!started) ctx.moveTo(view.cx + p.x, view.cy + p.y);
        else ctx.lineTo(view.cx + p.x, view.cy + p.y);
        started = true;
      }
      ctx.setLineDash(dash);
      ctx.strokeStyle = `rgba(10,10,10,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // ---- Building ----
    const camera = (yaw, baseY) => {
      const c = Math.cos(yaw);
      const s = Math.sin(yaw);
      const cp = Math.cos(PITCH);
      const sp = Math.sin(PITCH);
      return {
        // World point (y up, ground at y = 0) to screen.
        point: ([x, y, z]) => {
          const x1 = x * c - z * s;
          const z1 = x * s + z * c;
          const y2 = y * cp - z1 * sp;
          const z2 = z1 * cp + y * sp;
          const k = PERSPECTIVE / (PERSPECTIVE - z2);
          return { x: view.cx + x1 * k, y: baseY - y2 * k };
        },
        normal: ({ x, y, z }) => {
          const x1 = x * c - z * s;
          const z1 = x * s + z * c;
          return { x: x1, y: y * cp - z1 * sp, z: z1 * cp + y * sp };
        },
      };
    };

    const polygon = (pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();
    };

    // A plain box (rooftop plant) with shaded visible sides and a light lid.
    const drawBlock = (cam, cx, cz, half, y0, height) => {
      const lo = square(cx, cz, half, half, y0).map(cam.point);
      const hi = square(cx, cz, half, half, y0 + height).map(cam.point);
      SIDES.forEach(([a, b, n]) => {
        const rn = cam.normal(n);
        if (rn.z <= 0) return;
        polygon([lo[a], lo[b], hi[b], hi[a]]);
        ctx.fillStyle = `rgb(${shade([222, 228, 234], rn)})`;
        ctx.fill();
      });
      polygon(hi);
      ctx.fillStyle = '#f1f4f7';
      ctx.fill();
    };

    const drawFloor = (cam, y0, y1, hw, hd, top, open) => {
      const lo = square(0, 0, hw, hd, y0).map(cam.point);
      const hi = square(0, 0, hw, hd, y1).map(cam.point);
      const glass = top ? [120, 196, 236] : [184, 220, 240];

      SIDES.forEach(([a, b, n]) => {
        const rn = cam.normal(n);
        if (rn.z <= 0) return;
        polygon([lo[a], lo[b], hi[b], hi[a]]);
        ctx.fillStyle = `rgba(${shade(glass, rn)},0.94)`;
        ctx.fill();

        // Mullions and a transom give the glass its window grid.
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let j = 1; j < 6; j += 1) {
          const p = lerp(lo[a], lo[b], j / 6);
          const q = lerp(hi[a], hi[b], j / 6);
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
        }
        const m1 = lerp(lo[a], hi[a], 0.5);
        const m2 = lerp(lo[b], hi[b], 0.5);
        ctx.moveTo(m1.x, m1.y);
        ctx.lineTo(m2.x, m2.y);
        ctx.stroke();

        // Slab edge along the top of the glass
        ctx.beginPath();
        ctx.moveTo(hi[a].x, hi[a].y);
        ctx.lineTo(hi[b].x, hi[b].y);
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Top slab with a simple floor plan; on lower floors it only shows once the tower opens.
      polygon(hi);
      ctx.fillStyle = `rgb(${shade([246, 249, 252], cam.normal({ x: 0, y: 1, z: 0 }))})`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(10,40,70,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const planAlpha = top ? 0.35 : 0.35 * open;
      if (planAlpha > 0.02) {
        polygon(square(0, 0, hw * 0.72, hd * 0.72, y1).map(cam.point));
        ctx.strokeStyle = `rgba(0,149,218,${planAlpha.toFixed(2)})`;
        ctx.stroke();
        const p = cam.point([0, y1, -hd * 0.72]);
        const q = cam.point([0, y1, hd * 0.72]);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      // Lift core, lined up with the light beam
      polygon(square(0, 0, hw * 0.16, hw * 0.16, y1).map(cam.point));
      ctx.fillStyle = `rgba(0,149,218,${(0.2 + 0.6 * open).toFixed(2)})`;
      ctx.fill();

      if (top) {
        drawBlock(cam, -hw * 0.5, -hd * 0.45, hw * 0.15, y1, hw * 0.12);
        drawBlock(cam, hw * 0.52, hd * 0.42, hw * 0.11, y1, hw * 0.1);
      }
    };

    const drawTower = () => {
      const s = view.size;
      const hw = s * 0.62;
      const hd = s * 0.5;
      const floorH = s * 0.2;
      const open = smooth(tower.open);
      const gap = s * 0.2 * open;
      const total = FLOORS.length * floorH + (FLOORS.length - 1) * gap;
      const baseY = view.cy + (total * Math.cos(PITCH)) / 2 + s * 0.1;
      const cam = camera(motion.yaw + pointer.x * 0.25, baseY);

      // Ground shadow
      const ground = cam.point([0, 0, 0]);
      ctx.save();
      ctx.translate(ground.x, ground.y);
      ctx.scale(1, 0.42);
      const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.1);
      shadow.addColorStop(0, `rgba(10,40,70,${(0.2 - 0.08 * open).toFixed(3)})`);
      shadow.addColorStop(1, 'rgba(10,40,70,0)');
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, s * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Light beam up the lift core, visible in the gaps between floors
      if (open > 0.02) {
        const peak = cam.point([0, total + s * 0.35, 0]);
        const beamW = hw * 0.3;
        const beam = ctx.createLinearGradient(0, ground.y, 0, peak.y);
        beam.addColorStop(0, `rgba(0,149,218,${(0.35 * open).toFixed(3)})`);
        beam.addColorStop(1, 'rgba(0,149,218,0)');
        ctx.fillStyle = beam;
        ctx.fillRect(ground.x - beamW / 2, peak.y, beamW, ground.y - peak.y);
      }

      // Floors bottom-up: the camera looks down, so each floor correctly covers the one below.
      FLOORS.forEach((_, i) => {
        const y0 = i * (floorH + gap);
        drawFloor(cam, y0, y0 + floorH, hw, hd, i === FLOORS.length - 1, open);
      });
    };

    const render = () => {
      const tilt = TILT + pointer.y * 0.08;
      const roll = -0.12 + pointer.x * 0.06;

      ctx.clearRect(0, 0, view.w, view.h);
      strokeRing(tilt, roll, false, 0.1, [3, 5]);
      drawTower();
      strokeRing(tilt, roll, true, 0.16, []);

      cards.forEach((card, i) => {
        if (!card) return;
        const p = ringPoint(motion.orbit + (i * Math.PI * 2) / count, view.ring, tilt, roll);
        const depth = (p.z / view.ring + 1) / 2; // 0 at the back, 1 at the front
        card.style.transform = `translate3d(${(view.cx + p.x).toFixed(1)}px, ${(view.cy + p.y).toFixed(1)}px, 0) translate(-50%, -50%) scale(${(p.scale * (0.78 + depth * 0.22)).toFixed(3)})`;
        card.style.opacity = (0.55 + depth * 0.45).toFixed(2);
        // The canvas (tower) sits at z-index 1000: cards behind it go under, cards in front go over.
        card.style.zIndex = String(Math.round(1000 + p.z));
      });
    };

    const tick = (time) => {
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      motion.speed += (motion.target - motion.speed) * 0.06;
      if (!drag.active) {
        motion.orbit += (motion.speed + drag.velocity) * dt;
        drag.velocity *= 0.94;
      }
      motion.yaw += SPIN_SPEED * dt;

      // Closed for the first part of each cycle, open for the rest; hovering holds it open.
      motion.clock = (motion.clock + dt) % CYCLE_SECONDS;
      const want = tower.hold || motion.clock > CYCLE_SECONDS * 0.3 ? 1 : 0;
      tower.open += (want - tower.open) * (1 - Math.exp(-dt * 2.4));

      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (still || frame !== null || !onScreen || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const onPointerMove = (e) => {
      const rect = stage.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      if (!drag.active) return;
      const dx = e.clientX - drag.lastX;
      drag.lastX = e.clientX;
      drag.moved += Math.abs(dx);
      const step = dx / view.ring;
      motion.orbit += step;
      motion.yaw += step;
      drag.velocity = step * 40;
      if (still) render();
    };
    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag.active = true;
      drag.lastX = e.clientX;
      drag.moved = 0;
      drag.velocity = 0;
    };
    const onPointerUp = () => {
      drag.active = false;
    };
    // A drag shouldn't also follow the card link it started on.
    const onClick = (e) => {
      if (drag.moved > 6) e.preventDefault();
    };
    const pause = () => {
      motion.target = 0;
      tower.hold = true;
    };
    const resume = () => {
      motion.target = ORBIT_SPEED;
      tower.hold = false;
    };
    const onFocusOut = (e) => {
      if (!stage.contains(e.relatedTarget)) resume();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const sizeObserver = new ResizeObserver(() => {
      resize();
      render();
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });

    resize();
    render();
    sizeObserver.observe(stage);
    viewObserver.observe(stage);
    start();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('click', onClick, true);
    stage.addEventListener('mouseenter', pause);
    stage.addEventListener('mouseleave', resume);
    stage.addEventListener('focusin', pause);
    stage.addEventListener('focusout', onFocusOut);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('click', onClick, true);
      stage.removeEventListener('mouseenter', pause);
      stage.removeEventListener('mouseleave', resume);
      stage.removeEventListener('focusin', pause);
      stage.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div ref={stageRef} className="lp-orbit" aria-label="Our portfolios" role="group">
      <canvas ref={canvasRef} className="lp-orbit-canvas" aria-hidden="true" />
      {portfolioCards.map((card, i) => (
        <Link
          key={card.slug}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          to={card.to}
          className="lp-orbit-card"
          data-slug={card.slug}
          draggable="false"
        >
          <img src={card.image} alt="" draggable="false" />
          <span className="lp-orbit-label">{card.title}</span>
        </Link>
      ))}
      <span className="lp-orbit-hint" aria-hidden="true">
        <i className="bi bi-arrows-move" /> Hover to open · drag to spin
      </span>
    </div>
  );
}
