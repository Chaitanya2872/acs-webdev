import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { portfolioCards } from '../../data/home';
import { createGlobe } from './globeRenderer';

const ORBIT_SPEED = 0.5; // radians per second
const HOVER_SPEED = 0.16; // slows (doesn't stop) while hovered, so cards stay clickable
const SPIN_SPEED = 0.09; // globe turn, radians per second
const AXIAL_TILT = 0.41; // Earth's 23.4°
const START_SPIN = -1.3; // opens on India / the Middle East
const TILT = 0.48; // how far the orbit ring leans towards the viewer
const PERSPECTIVE = 1100;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);

// Portfolio images orbiting a rotating white grid globe. Cards fade in as they swing round to the
// front and out as they pass behind the globe. The ring leans with the pointer, can be dragged, and
// slows while hovered.
export default function PortfolioOrbit() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current;
    const count = cards.length;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const globe = createGlobe(canvasRef.current);
    if (!globe) stage.classList.add('lp-orbit--flat');

    const view = { w: 0, h: 0, cx: 0, cy: 0, ring: 0, radius: 0 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const motion = { orbit: 0, spin: START_SPIN, speed: ORBIT_SPEED, target: ORBIT_SPEED };
    const drag = { active: false, lastX: 0, moved: 0, velocity: 0 };
    let frame = null;
    let last = 0;
    let onScreen = true;

    const resize = () => {
      view.w = stage.clientWidth;
      view.h = stage.clientHeight;
      view.cx = view.w / 2;
      view.cy = view.h / 2;
      view.ring = Math.min(view.w * 0.4, view.h * 0.7);
      view.radius = Math.min(view.w * 0.24, view.h * 0.27);
      globe?.resize(view.w, view.h, Math.min(window.devicePixelRatio || 1, 2));
      const cardWidth = Math.max(80, Math.min(view.w * 0.17, 150));
      stage.style.setProperty('--card-w', `${cardWidth.toFixed(0)}px`);
      stage.style.setProperty('--globe-r', `${view.radius.toFixed(0)}px`);
    };

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

    const render = () => {
      const tilt = TILT + pointer.y * 0.08;
      const roll = -0.12 + pointer.x * 0.06;
      const { ring } = view;

      globe?.draw({
        x: view.cx + pointer.x * 6,
        y: view.cy + pointer.y * 4,
        radius: view.radius,
        spin: motion.spin,
        tilt: AXIAL_TILT,
        alpha: 1,
        time: performance.now() / 1000,
      });

      cards.forEach((card, i) => {
        if (!card) return;
        const pt = ringPoint(motion.orbit + (i * Math.PI * 2) / count, ring, tilt, roll);
        const depth = (pt.z / ring + 1) / 2; // 0 at the back, 1 at the front
        const alpha = smooth(clamp01((depth - 0.14) / 0.36));
        const scale = pt.scale * (0.74 + depth * 0.26);
        const spinY = (pt.x / ring) * -18; // cards turn slightly as they sweep across the sides
        card.style.transform = `translate3d(${(view.cx + pt.x).toFixed(1)}px, ${(view.cy + pt.y).toFixed(1)}px, 0) translate(-50%, -50%) perspective(600px) rotateY(${spinY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = alpha.toFixed(3);
        card.style.visibility = alpha < 0.02 ? 'hidden' : '';
        // The globe canvas sits at z-index 1000: cards behind it go under, cards in front go over.
        card.style.zIndex = String(Math.round(1000 + pt.z));
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
      motion.spin += SPIN_SPEED * dt;

      // Under a stacked section (see useStackedSections) there's nothing to see; keep time, skip the draw.
      if (!stage.closest('.is-covered')) render();
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
      motion.spin += step * 0.6;
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
    const slow = () => {
      motion.target = HOVER_SPEED;
    };
    const resume = () => {
      motion.target = ORBIT_SPEED;
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
    stage.addEventListener('mouseenter', slow);
    stage.addEventListener('mouseleave', resume);
    stage.addEventListener('focusin', slow);
    stage.addEventListener('focusout', onFocusOut);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      globe?.dispose();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('click', onClick, true);
      stage.removeEventListener('mouseenter', slow);
      stage.removeEventListener('mouseleave', resume);
      stage.removeEventListener('focusin', slow);
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
        <i className="bi bi-arrows-move" /> Hover to slow · drag to spin
      </span>
    </div>
  );
}
