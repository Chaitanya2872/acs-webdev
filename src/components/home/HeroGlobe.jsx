import { useEffect, useRef } from 'react';

import { worldBorders } from './worldBorders';

const SIZE = 580;
const RADIUS = 240;
const CENTER = SIZE / 2;
const ROTATION_SPEED = 0.005;

const HOTSPOTS = [
  { lat: 17.4, lon: 78.5 }, // Hyderabad
  { lat: 25.2, lon: 55.3 }, // Dubai
  { lat: 28.6, lon: 77.2 }, // Delhi
  { lat: 1.3, lon: 103.8 }, // Singapore
  { lat: 51.5, lon: -0.1 }, // London
  { lat: 48.9, lon: 2.3 }, // Paris
  { lat: 35.7, lon: 139.7 }, // Tokyo
  { lat: 40.7, lon: -74.0 }, // New York
];

// Rotating wireframe globe with country outlines and office hotspots.
export default function HeroGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let rotY = 0;
    let frameId;

    const project = (latDeg, lonDeg) => {
      const phi = (latDeg * Math.PI) / 180;
      const lam = (lonDeg * Math.PI) / 180 + rotY;
      return {
        x: RADIUS * Math.cos(phi) * Math.sin(lam),
        y: -RADIUS * Math.sin(phi),
        z: RADIUS * Math.cos(phi) * Math.cos(lam),
      };
    };

    // Strokes the visible (front-facing) runs of a polyline, fading with depth between minAlpha and maxAlpha.
    const drawArc = (points, [r, g, b], minAlpha, maxAlpha, lineWidth) => {
      let segment = [];
      const flush = () => {
        if (segment.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(CENTER + segment[0].x, CENTER + segment[0].y);
          for (let j = 1; j < segment.length; j++) ctx.lineTo(CENTER + segment[j].x, CENTER + segment[j].y);
          const midZ = segment[Math.floor(segment.length / 2)].z;
          const alpha = (minAlpha + maxAlpha * Math.max(0, midZ / RADIUS)).toFixed(2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
        segment = [];
      };
      points.forEach((p) => (p.z > -5 ? segment.push(p) : flush()));
      flush();
    };

    const range = (from, to, step) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
    const fillCircle = (radius, style) => {
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, radius, 0, Math.PI * 2);
      ctx.fillStyle = style;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const atmosphere = ctx.createRadialGradient(CENTER, CENTER, RADIUS * 0.88, CENTER, CENTER, RADIUS * 1.18);
      atmosphere.addColorStop(0, 'rgba(0,149,218,0.22)');
      atmosphere.addColorStop(0.6, 'rgba(0,80,160,0.07)');
      atmosphere.addColorStop(1, 'rgba(0,0,0,0)');
      fillCircle(RADIUS * 1.18, atmosphere);

      const base = ctx.createRadialGradient(CENTER - RADIUS * 0.28, CENTER - RADIUS * 0.28, 0, CENTER, CENTER, RADIUS);
      base.addColorStop(0, 'rgba(0,90,160,0.55)');
      base.addColorStop(0.55, 'rgba(3,22,55,0.65)');
      base.addColorStop(1, 'rgba(1,8,28,0.88)');
      fillCircle(RADIUS, base);

      const grid = [0, 149, 218];
      range(0, 340, 20).forEach((lon) => drawArc(range(-88, 88, 2).map((lat) => project(lat, lon)), grid, 0.06, 0.52, 0.9));
      range(-75, 75, 15).forEach((lat) => drawArc(range(0, 360, 2).map((lon) => project(lat, lon)), grid, 0.06, 0.52, 0.9));
      drawArc(range(0, 360, 2).map((lon) => project(0, lon)), [92, 200, 245], 0.15, 0.7, 1.0);

      worldBorders.forEach((line) => drawArc(line.map(([lon, lat]) => project(lat, lon)), [200, 230, 255], 0.07, 0.48, 0.8));

      HOTSPOTS.forEach(({ lat, lon }) => {
        const p = project(lat, lon);
        if (p.z < 0) return;
        const alpha = 0.35 + 0.65 * (p.z / RADIUS);
        ctx.beginPath();
        ctx.arc(CENTER + p.x, CENTER + p.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,209,102,${alpha.toFixed(2)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(CENTER + p.x, CENTER + p.y, 5.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,209,102,${(alpha * 0.45).toFixed(2)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      const highlight = ctx.createRadialGradient(
        CENTER - RADIUS * 0.32,
        CENTER - RADIUS * 0.38,
        0,
        CENTER - RADIUS * 0.12,
        CENTER - RADIUS * 0.18,
        RADIUS * 0.72,
      );
      highlight.addColorStop(0, 'rgba(255,255,255,0.13)');
      highlight.addColorStop(0.5, 'rgba(255,255,255,0.03)');
      highlight.addColorStop(1, 'rgba(255,255,255,0)');
      fillCircle(RADIUS, highlight);

      ctx.beginPath();
      ctx.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,149,218,0.55)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rotY += ROTATION_SPEED;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <canvas id="hero-globe" ref={canvasRef} width={SIZE} height={SIZE} aria-hidden="true" />;
}
