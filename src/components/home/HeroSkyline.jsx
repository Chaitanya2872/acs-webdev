import { useEffect, useRef } from 'react';

// A faint line-drawn city skyline behind the hero headline: two rows of outlined buildings with the
// lightest blue wash, masked so it dissolves into the page at the top, bottom and right edge. Light-blue
// pulses of light run round a few of the front buildings' outlines, and as the page scrolls the two rows
// drift at different speeds (the back row faster) for depth.
// Laid out once from a seeded PRNG, so it is identical on every visit.

const WIDTH = 1000;
const HEIGHT = 420;
const PARALLAX = { back: 0.22, front: 0.1 }; // px of drift per px scrolled

const seededRandom = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function buildRow(seed, minH, maxH, minW, maxW, traceShare) {
  const random = seededRandom(seed);
  const buildings = [];
  for (let x = -10; x < WIDTH; ) {
    const w = minW + random() * (maxW - minW);
    const h = minH + (maxH - minH) * random() ** 1.4;
    const traced = random() < traceShare;
    buildings.push({
      x,
      y: HEIGHT - h,
      w,
      h,
      spire: random() < 0.12,
      // A traced building gets its own lap time and start point, so the pulses never sync up.
      trace: traced ? { duration: 2.6 + random() * 2.4, delay: -random() * 5 } : null,
    });
    x += w + 2 + random() * 6;
  }
  return buildings;
}

const BACK = buildRow(42, 150, 360, 34, 70, 0);
const FRONT = buildRow(1980, 70, 250, 44, 96, 0.35);

function Row({ buildings, stroke, fill }) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth={1}>
      {buildings.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} />
          {b.spire && <rect x={b.x + b.w / 2 - 1} y={b.y - 26} width={2} height={26} />}
        </g>
      ))}
    </g>
  );
}

// A short bright dash that laps each traced building's outline (pathLength normalises every rect to 100).
function Traces({ buildings }) {
  return (
    <g className="lp-skyline-traces" fill="none">
      {buildings
        .filter((b) => b.trace)
        .map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            pathLength={100}
            style={{ animationDuration: `${b.trace.duration.toFixed(2)}s`, animationDelay: `${b.trace.delay.toFixed(2)}s` }}
          />
        ))}
    </g>
  );
}

export default function HeroSkyline() {
  const backRef = useRef(null);
  const frontRef = useRef(null);

  // Scroll parallax: both rows sink as the page scrolls, the back row faster, so the skyline reads in depth.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = null;
    const update = () => {
      frame = null;
      const y = Math.min(window.scrollY, window.innerHeight * 1.5);
      backRef.current.style.transform = `translate(0, ${(y * PARALLAX.back).toFixed(1)}px)`;
      frontRef.current.style.transform = `translate(0, ${(y * PARALLAX.front).toFixed(1)}px)`;
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg className="lp-skyline" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMinYMax slice" aria-hidden="true">
      <defs>
        {/* Per-building wash: the faintest blue at the roof fading to white at street level. */}
        <linearGradient id="lp-skyline-shade-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f9fd" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="lp-skyline-shade-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef5fd" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="lp-skyline-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lp-skyline-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="lp-skyline-fade-v">
          <rect width={WIDTH} height={HEIGHT} fill="url(#lp-skyline-v)" />
        </mask>
        <mask id="lp-skyline-fade-h">
          <rect width={WIDTH} height={HEIGHT} fill="url(#lp-skyline-h)" />
        </mask>
      </defs>
      <g mask="url(#lp-skyline-fade-v)">
        <g mask="url(#lp-skyline-fade-h)">
          <g ref={backRef} className="lp-skyline-row">
            <Row buildings={BACK} stroke="#eceef2" fill="url(#lp-skyline-shade-back)" />
          </g>
          <g ref={frontRef} className="lp-skyline-row">
            <Row buildings={FRONT} stroke="#e1e4ea" fill="url(#lp-skyline-shade-front)" />
            <Traces buildings={FRONT} />
          </g>
        </g>
      </g>
    </svg>
  );
}
