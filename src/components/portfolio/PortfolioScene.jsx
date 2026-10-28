import { useEffect, useRef } from 'react';

import { SCENES, createKit } from './scenes';

const CAMERA_DISTANCE = 4;

// Canvas host for a portfolio's animated 3D scene: sizes the canvas, runs the camera (auto spin or sway
// plus a pointer tilt), and pauses when off-screen or in a hidden tab. Reduced motion gets one still frame.
export default function PortfolioScene({ slug, label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const scene = SCENES[slug] ?? SCENES['artificial-intelligence-solutions'];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const view = { w: 0, h: 0 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = null;
    let start = null;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      view.w = host.clientWidth;
      view.h = host.clientHeight;
      canvas.width = Math.round(view.w * dpr);
      canvas.height = Math.round(view.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      const yaw = (scene.spin === 'full' ? t * scene.speed + 0.6 : 0.5 * Math.sin(t * 0.25)) + pointer.x * 0.35;
      const pitch = scene.pitch + pointer.y * 0.08;
      const c = Math.cos(yaw);
      const s = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const unit = Math.min(view.w, view.h) * scene.size;
      const cx = view.w / 2;
      const cy = view.h / 2;

      const project = ([x, y, z]) => {
        const x1 = x * c - z * s;
        const z1 = x * s + z * c;
        const y2 = y * cp - z1 * sp;
        const z2 = z1 * cp + y * sp;
        const k = CAMERA_DISTANCE / (CAMERA_DISTANCE - z2);
        return { x: cx + x1 * k * unit, y: cy - y2 * k * unit, z: z2, k };
      };
      const rotateNormal = ([x, y, z]) => {
        const x1 = x * c - z * s;
        const z1 = x * s + z * c;
        return [x1, y * cp - z1 * sp, z1 * cp + y * sp];
      };

      ctx.clearRect(0, 0, view.w, view.h);
      scene.draw(createKit(ctx, project, rotateNormal), t);
    };

    const tick = (time) => {
      if (start === null) start = time;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      draw((time - start) / 1000);
      frame = requestAnimationFrame(tick);
    };
    const run = () => {
      if (still || frame !== null || !onScreen || document.hidden) return;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const onPointer = (e) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    };
    const onVisibility = () => (document.hidden ? stop() : run());

    const sizeObserver = new ResizeObserver(() => {
      resize();
      if (still || frame === null) draw(2);
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) run();
      else stop();
    });

    resize();
    draw(2);
    sizeObserver.observe(host);
    viewObserver.observe(host);
    run();
    if (!still) window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [slug]);

  return <canvas ref={canvasRef} className="pf-scene-canvas" role="img" aria-label={label} />;
}
