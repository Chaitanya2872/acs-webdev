// Animated 3D hero scenes for the portfolio pages, drawn on a 2D canvas through a small projection kit.
// World units: y is up, the scene fits roughly inside a 3-unit cube around the origin.

const TAU = Math.PI * 2;
const INK = '10,10,10';
const BLUE = '0,149,218';
const TEAL = '0,190,170';
const GREEN = '22,170,110';
const RED = '229,72,77';

const frac = (x) => x - Math.floor(x);
const rgba = (rgb, a) => `rgba(${rgb},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => scale(a, 1 / Math.hypot(a[0], a[1], a[2]));
const seeded = (i) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);

const LIGHT = [-0.55, 0.62, 0.56];

// Drawing helpers bound to one frame's canvas context and camera projection.
export function createKit(ctx, project, rotateNormal) {
  const P = (p) => project(p);

  const line = (a, b, style, width = 1, dash) => {
    const p = P(a);
    const q = P(b);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.stroke();
    if (dash) ctx.setLineDash([]);
  };

  const path = (points, { stroke, fill, width = 1, close = false, dash } = {}) => {
    if (points.length < 2) return;
    ctx.beginPath();
    points.forEach((pt, i) => {
      const p = P(pt);
      if (i) ctx.lineTo(p.x, p.y);
      else ctx.moveTo(p.x, p.y);
    });
    if (close) ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      if (dash) ctx.setLineDash(dash);
      ctx.stroke();
      if (dash) ctx.setLineDash([]);
    }
  };

  const dot = (pt, r, fill, ringStyle) => {
    const p = P(pt);
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.5, r * p.k), 0, TAU);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (ringStyle) {
      ctx.strokeStyle = ringStyle;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    return p;
  };

  // Circle of `radius` around `center` in the plane spanned by unit vectors u and v.
  const circle = (center, u, v, radius, n = 48, from = 0, to = TAU) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const a = from + ((to - from) * i) / n;
      return add(center, add(scale(u, Math.cos(a) * radius), scale(v, Math.sin(a) * radius)));
    });
  const flatCircle = (center, radius, n = 48, from, to) => circle(center, [1, 0, 0], [0, 0, 1], radius, n, from, to);

  const grid = (y, extent, n, alpha = 0.1) => {
    for (let i = 0; i <= n; i += 1) {
      const v = -extent + (2 * extent * i) / n;
      line([-extent, y, v], [extent, y, v], rgba(INK, alpha));
      line([v, y, -extent], [v, y, extent], rgba(INK, alpha));
    }
  };

  const shade = ([r, g, b], n) => {
    const k = 0.8 + 0.2 * Math.max(-1, Math.min(1, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]));
    return `${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)}`;
  };

  // Axis-aligned box; visible faces are shaded and handed to `decorate(normal, corners)` for detailing.
  const box = (c, h, rgb, { alpha = 1, edge = 'rgba(255,255,255,0.9)', decorate } = {}) => {
    const [x, y, z] = c;
    const [hx, hy, hz] = h;
    const faces = [
      [[0, 0, 1], [[x - hx, y - hy, z + hz], [x + hx, y - hy, z + hz], [x + hx, y + hy, z + hz], [x - hx, y + hy, z + hz]]],
      [[0, 0, -1], [[x + hx, y - hy, z - hz], [x - hx, y - hy, z - hz], [x - hx, y + hy, z - hz], [x + hx, y + hy, z - hz]]],
      [[1, 0, 0], [[x + hx, y - hy, z + hz], [x + hx, y - hy, z - hz], [x + hx, y + hy, z - hz], [x + hx, y + hy, z + hz]]],
      [[-1, 0, 0], [[x - hx, y - hy, z - hz], [x - hx, y - hy, z + hz], [x - hx, y + hy, z + hz], [x - hx, y + hy, z - hz]]],
      [[0, 1, 0], [[x - hx, y + hy, z + hz], [x + hx, y + hy, z + hz], [x + hx, y + hy, z - hz], [x - hx, y + hy, z - hz]]],
    ];
    faces.forEach(([n, corners]) => {
      const rn = rotateNormal(n);
      if (rn[2] <= 0) return;
      path(corners, { fill: `rgba(${shade(rgb, rn)},${alpha})`, stroke: edge, width: 1, close: true });
      if (decorate) decorate(n, corners);
    });
  };

  // Point on a quad face at (s, t) in [0, 1]², corners ordered bottom-left, bottom-right, top-right, top-left.
  const onFace = (corners, s, t) => lerp3(lerp3(corners[0], corners[1], s), lerp3(corners[3], corners[2], s), t);

  return { ctx, P, line, path, dot, circle, flatCircle, grid, box, onFace };
}

// ---------------------------------------------------------------- Geospatial: radar + drones
const terrain = (x, z) => -0.42 + 0.1 * Math.sin(2.1 * x + 0.6) * Math.cos(1.7 * z) + 0.05 * Math.sin(3.7 * x + 2.9 * z);
const BLIPS = [
  [0.75, 0.3],
  [-0.5, 0.95],
  [-1.05, -0.35],
  [0.3, -1.1],
  [1.1, -0.65],
  [-0.2, 0.45],
];
const DRONES = [
  { cx: 0.15, cz: 0.1, r: 1.05, w: 0.32, y: 0.62, ph: 0 },
  { cx: -0.3, cz: 0.15, r: 0.72, w: -0.48, y: 0.82, ph: 2.1 },
  { cx: 0.35, cz: -0.25, r: 0.55, w: 0.62, y: 0.44, ph: 4.2 },
];

function geospatial(kit, t) {
  const { path, line, dot, circle, flatCircle } = kit;
  const N = 22;
  const E = 1.5;

  // Wireframe terrain
  for (let i = 0; i <= N; i += 1) {
    const v = -E + (2 * E * i) / N;
    const rowX = [];
    const rowZ = [];
    for (let j = 0; j <= N; j += 1) {
      const u = -E + (2 * E * j) / N;
      rowX.push([u, terrain(u, v), v]);
      rowZ.push([v, terrain(v, u), u]);
    }
    path(rowX, { stroke: rgba(INK, 0.09) });
    path(rowZ, { stroke: rgba(INK, 0.09) });
  }

  // Range rings draped on the terrain
  [0.5, 1.0, 1.42].forEach((r) => {
    const ring = flatCircle([0, 0, 0], r, 64).map(([x, , z]) => [x, terrain(x, z) + 0.01, z]);
    path(ring, { stroke: rgba(BLUE, 0.3), dash: [3, 4] });
  });

  // Rotating sweep
  const az = t * 0.9;
  const origin = [0, terrain(0, 0) + 0.01, 0];
  const sector = [origin];
  for (let a = az - 0.55; a <= az + 0.001; a += 0.05) {
    const x = 1.45 * Math.cos(a);
    const z = 1.45 * Math.sin(a);
    sector.push([x, terrain(x, z) + 0.01, z]);
  }
  path(sector, { fill: rgba(BLUE, 0.12), close: true });
  line(origin, sector[sector.length - 1], rgba(BLUE, 0.7), 1.5);

  // Targets light up as the sweep passes and then fade
  BLIPS.forEach(([x, z]) => {
    const diff = ((az - Math.atan2(z, x)) % TAU + TAU) % TAU;
    const glow = Math.exp(-diff * 1.4);
    const p = [x, terrain(x, z) + 0.02, z];
    dot(p, 3, rgba(BLUE, 0.25 + glow * 0.75));
    if (glow > 0.05) path(flatCircle(p, 0.05 + (1 - glow) * 0.12, 24), { stroke: rgba(BLUE, glow * 0.6) });
  });

  // Radar tower: tripod, mast and a parabolic dish tracking the sweep
  const ground = terrain(0, 0);
  const head = [0, 0.18, 0];
  [0, 1, 2].forEach((i) => {
    const a = (i / 3) * TAU + 0.4;
    line([Math.cos(a) * 0.22, ground, Math.sin(a) * 0.22], [0, 0.0, 0], rgba(INK, 0.55), 1.4);
  });
  line([0, ground, 0], head, rgba(INK, 0.7), 2);

  const el = 0.45;
  const d = [Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el)];
  const u = norm(cross(d, [0, 1, 0]));
  const v = cross(u, d);
  const c = [0, 0.3, 0];
  line(head, c, rgba(INK, 0.7), 2);
  const R = 0.34;
  const rim = circle(add(c, scale(d, 1.1 * R * R)), u, v, R, 48);
  kit.path(rim, { fill: 'rgba(255,255,255,0.88)', stroke: rgba(BLUE, 0.85), width: 1.5, close: true });
  [0.1, 0.18, 0.26].forEach((r) => path(circle(add(c, scale(d, 1.1 * r * r)), u, v, r, 36), { stroke: rgba(BLUE, 0.35) }));
  for (let i = 0; i < 10; i += 1) line(c, rim[Math.round((i / 10) * 48)], rgba(BLUE, 0.3));
  const feed = add(c, scale(d, 0.36));
  [0, 16, 32].forEach((i) => line(rim[i], feed, rgba(INK, 0.35)));
  dot(feed, 3.5, rgba(INK, 0.9));
  // Beam pulses travelling out along the dish axis
  for (let i = 0; i < 3; i += 1) {
    const p = frac(t * 0.8 + i / 3);
    path(circle(add(feed, scale(d, p * 0.9)), u, v, 0.05 + p * 0.25, 24), { stroke: rgba(BLUE, (1 - p) * 0.45) });
  }

  // Survey drones
  DRONES.forEach((drone, n) => {
    const pos = (time) => {
      const a = drone.w * time + drone.ph;
      return [drone.cx + drone.r * Math.cos(a), drone.y + 0.05 * Math.sin(time * 2 + drone.ph), drone.cz + drone.r * 0.7 * Math.sin(a)];
    };
    const p = pos(t);
    const ahead = pos(t + 0.05);
    const heading = Math.atan2(ahead[2] - p[2], ahead[0] - p[0]);

    // Trail
    path(Array.from({ length: 16 }, (_, i) => pos(t - i * 0.12)), { stroke: rgba(INK, 0.18), dash: [2, 4] });

    // Scan footprint and cone down to the terrain
    const side = [Math.cos(heading + Math.PI / 2) * 0.17, 0, Math.sin(heading + Math.PI / 2) * 0.17];
    const g = [p[0], terrain(p[0], p[2]) + 0.01, p[2]];
    const left = add(g, side);
    const right = add(g, scale(side, -1));
    left[1] = terrain(left[0], left[2]) + 0.01;
    right[1] = terrain(right[0], right[2]) + 0.01;
    path([p, left, right], { fill: rgba(TEAL, 0.1), close: true });
    line(left, right, rgba(TEAL, 0.7), 1.5);

    // Data link to the radar
    line(p, c, rgba(BLUE, 0.14), 1, [3, 5]);

    // Body: X frame, spinning rotors, blinking LED
    [0.25, 0.75, 1.25, 1.75].forEach((q) => {
      const a = heading + q * Math.PI;
      const end = add(p, [Math.cos(a) * 0.09, 0, Math.sin(a) * 0.09]);
      line(p, end, rgba(INK, 0.85), 2);
      path(flatCircle(end, 0.045, 18), { fill: 'rgba(255,255,255,0.6)', stroke: rgba(INK, 0.35), close: true });
      const spin = t * 30 + q * 3;
      line(
        add(end, [Math.cos(spin) * 0.045, 0, Math.sin(spin) * 0.045]),
        add(end, [-Math.cos(spin) * 0.045, 0, -Math.sin(spin) * 0.045]),
        rgba(INK, 0.6),
        1.2,
      );
    });
    dot(p, 4, rgba(INK, 0.95));
    dot(add(p, [0, 0.02, 0]), 2, frac(t * 1.4 + n * 0.3) < 0.18 ? rgba(RED, 1) : rgba(GREEN, 0.9));
  });
}

// ---------------------------------------------------------------- AI: rotating neural network
const AI_LAYERS = [4, 6, 6, 3];
const aiNodes = AI_LAYERS.map((n, l) => {
  const x = -0.95 + (l * 1.9) / (AI_LAYERS.length - 1);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * TAU + l * 0.4;
    const r = n > 4 ? 0.62 : 0.45;
    return [x, Math.sin(a) * r, Math.cos(a) * r];
  });
});
const aiEdges = [];
aiNodes.forEach((layer, l) => {
  if (l === aiNodes.length - 1) return;
  layer.forEach((a, i) => aiNodes[l + 1].forEach((b, j) => aiEdges.push({ a, b, l, seed: seeded(l * 50 + i * 7 + j) })));
});

function ai(kit, t) {
  const { line, dot, P } = kit;
  aiEdges.forEach((e) => line(e.a, e.b, rgba(INK, 0.07)));
  aiEdges.forEach((e, i) => {
    if (i % 2) return;
    const p = frac(t * 0.45 + e.seed);
    dot(lerp3(e.a, e.b, p), 2.4, rgba(e.l % 2 ? TEAL : BLUE, Math.sin(Math.PI * p) * 0.9));
  });
  const all = aiNodes.flatMap((layer, l) => layer.map((pt, i) => ({ pt, l, i, z: P(pt).z })));
  all.sort((a, b) => a.z - b.z);
  all.forEach(({ pt, l, i }) => {
    const act = 0.5 + 0.5 * Math.sin(t * 2.2 - l * 1.1 + i);
    dot(pt, 9, 'rgba(255,255,255,0.95)', rgba(BLUE, 0.6));
    dot(pt, 5, rgba(l === AI_LAYERS.length - 1 ? TEAL : BLUE, 0.25 + act * 0.75));
  });
}

// ---------------------------------------------------------------- Software: floating code panels
const CODE = Array.from({ length: 3 }, (_, p) =>
  Array.from({ length: 8 }, (_, r) => {
    let x = 0.08 * (r % 3 === 0 ? 0 : r % 3);
    const segs = [];
    const count = 1 + Math.floor(seeded(p * 40 + r) * 3);
    for (let s = 0; s < count; s += 1) {
      const w = 0.12 + seeded(p * 90 + r * 5 + s) * 0.32;
      segs.push({ x, w, tone: (r + s + p) % 3 });
      x += w + 0.06;
    }
    return segs;
  }),
);

function software(kit, t) {
  const { path, line, dot, P, ctx } = kit;
  const tones = [rgba(INK, 0.55), rgba(BLUE, 0.85), rgba(TEAL, 0.8)];
  const panels = [0, 1, 2].map((i) => ({ i, x: -0.32 + i * 0.32, y: 0.15 - i * 0.16 + Math.sin(t * 0.9 + i) * 0.04, z: -0.5 + i * 0.5 }));
  panels
    .map((p) => ({ ...p, depth: P([p.x, p.y, p.z]).z }))
    .sort((a, b) => a.depth - b.depth)
    .forEach(({ i, x, y, z }) => {
      const w = 0.72;
      const h = 0.48;
      path(
        [
          [x - w, y - h, z],
          [x + w, y - h, z],
          [x + w, y + h, z],
          [x - w, y + h, z],
        ],
        { fill: 'rgba(255,255,255,0.92)', stroke: rgba(INK, 0.14), close: true },
      );
      line([x - w, y + h - 0.1, z], [x + w, y + h - 0.1, z], rgba(INK, 0.08));
      [RED, '245,180,0', GREEN].forEach((rgb, k) => dot([x - w + 0.07 + k * 0.06, y + h - 0.05, z], 2.6, rgba(rgb, 0.9)));

      // The front panel types itself out; the others are complete.
      const typed = i === 2 ? frac(t * 0.12) * 1.25 : 2;
      CODE[i].forEach((segs, r) => {
        const rowY = y + h - 0.2 - r * 0.095;
        segs.forEach((seg) => {
          const shown = Math.min(1, Math.max(0, (typed * 8 - r) * 1.2));
          if (shown <= 0) return;
          const a = [x - w + 0.1 + seg.x, rowY, z];
          const b = [x - w + 0.1 + Math.min(seg.x + seg.w * shown, w * 2 - 0.2), rowY, z];
          const k = P(a).k;
          ctx.lineCap = 'round';
          line(a, b, tones[seg.tone], 4.5 * k);
          ctx.lineCap = 'butt';
        });
        if (i === 2 && Math.floor(typed * 8) === r && frac(t * 1.6) < 0.6) {
          dot([x - w + 0.12 + Math.min(1.2, typed) * 0.9, rowY, z], 3, rgba(BLUE, 1));
        }
      });
    });
}

// ---------------------------------------------------------------- IT infrastructure: server racks
function infrastructure(kit, t) {
  const { grid, box, line, path, dot, onFace } = kit;
  grid(-0.62, 1.4, 12, 0.07);
  const hub = [0, 1.0, -0.2];
  [-0.55, 0, 0.55].forEach((x, r) => {
    box([x, -0.06, 0], [0.2, 0.56, 0.22], [236, 241, 246], {
      decorate: (n, corners) => {
        if (n[2] !== 1) return;
        for (let u = 1; u < 9; u += 1) line(onFace(corners, 0.08, u / 9), onFace(corners, 0.92, u / 9), rgba(INK, 0.12));
        for (let u = 0; u < 9; u += 1) {
          const on = frac(t * (0.8 + seeded(r * 10 + u)) + seeded(u * 3 + r)) < 0.55;
          dot(onFace(corners, 0.82, (u + 0.5) / 9), 2.2, on ? rgba(u % 3 ? GREEN : BLUE, 0.95) : rgba(INK, 0.15));
          line(onFace(corners, 0.14, (u + 0.5) / 9), onFace(corners, 0.55, (u + 0.5) / 9), rgba(INK, 0.18), 2);
        }
      },
    });
    const top = [x, 0.5, 0];
    const ctrl = [x * 0.4, 1.15, 0];
    const curve = Array.from({ length: 17 }, (_, i) => {
      const s = i / 16;
      return lerp3(lerp3(top, ctrl, s), lerp3(ctrl, hub, s), s);
    });
    path(curve, { stroke: rgba(BLUE, 0.35), width: 1.4 });
    for (let k = 0; k < 2; k += 1) {
      const s = frac(t * 0.5 + r / 3 + k / 2);
      dot(curve[Math.round(s * 16)], 3, rgba(BLUE, 0.9));
    }
  });
  kit.path(kit.flatCircle(hub, 0.12, 32), { fill: 'rgba(255,255,255,0.95)', stroke: rgba(BLUE, 0.8), width: 1.5, close: true });
  kit.path(kit.flatCircle(hub, 0.18 + 0.04 * Math.sin(t * 2), 32), { stroke: rgba(BLUE, 0.3) });
  dot(hub, 4, rgba(BLUE, 1));
}

// ---------------------------------------------------------------- Security: perimeter cameras under a scan dome
function security(kit, t) {
  const { grid, box, path, line, dot, circle, flatCircle } = kit;
  const floor = -0.55;
  grid(floor, 1.4, 12, 0.07);
  box([0, floor + 0.2, 0], [0.32, 0.2, 0.32], [228, 236, 244]);

  // Dome
  const R = 1.15;
  for (let m = 0; m < 10; m += 1) {
    const a = (m / 10) * Math.PI + t * 0.08;
    path(circle([0, floor, 0], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], R, 32, 0, Math.PI), { stroke: rgba(BLUE, 0.08) });
  }
  [0.35, 0.75, 1.1].forEach((lat) => path(flatCircle([0, floor + Math.sin(lat) * R, 0], Math.cos(lat) * R, 48), { stroke: rgba(BLUE, 0.08) }));
  const scan = frac(t * 0.3);
  const lat = scan * (Math.PI / 2);
  path(flatCircle([0, floor + Math.sin(lat) * R, 0], Math.cos(lat) * R, 64), { stroke: rgba(BLUE, (1 - scan) * 0.7), width: 1.6 });

  // Intruder walking the perimeter
  const ia = t * 0.35;
  const intruder = [Math.cos(ia) * 1.0, floor, Math.sin(ia) * 1.0];
  let spotted = false;

  [
    [-0.95, 0.95],
    [0.95, -0.95],
    [0.95, 0.95],
  ].forEach(([px, pz], i) => {
    const base = [px, floor, pz];
    const headPt = [px, floor + 0.6, pz];
    line(base, headPt, rgba(INK, 0.6), 2);
    const look = Math.atan2(-pz, -px) + Math.sin(t * 0.6 + i * 2) * 0.7;
    const spread = 0.32;
    const reach = 1.25;
    const fan = [headPt];
    for (let a = look - spread; a <= look + spread + 0.001; a += spread / 6) fan.push([px + Math.cos(a) * reach, floor, pz + Math.sin(a) * reach]);
    path(fan, { fill: rgba(BLUE, 0.09), close: true });
    line(headPt, fan[1], rgba(BLUE, 0.3));
    line(headPt, fan[fan.length - 1], rgba(BLUE, 0.3));
    dot(headPt, 4.5, rgba(INK, 0.9));

    const dx = intruder[0] - px;
    const dz = intruder[2] - pz;
    const diff = Math.abs(((Math.atan2(dz, dx) - look + Math.PI) % TAU + TAU) % TAU - Math.PI);
    if (diff < spread && Math.hypot(dx, dz) < reach) spotted = true;
  });

  dot(intruder, 5, spotted ? rgba(RED, 1) : rgba(INK, 0.45));
  if (spotted) path(flatCircle(intruder, 0.08 + 0.04 * Math.sin(t * 8), 24), { stroke: rgba(RED, 0.7), width: 1.5 });
}

// ---------------------------------------------------------------- Smart facilities: IoT building
function facilities(kit, t) {
  const { grid, box, path, line, dot, flatCircle } = kit;
  const floor = -0.7;
  grid(floor, 1.4, 12, 0.07);
  const active = Math.floor(t * 0.6) % 4;
  const nodes = [];
  for (let i = 0; i < 4; i += 1) {
    const y = floor + 0.15 + i * 0.3;
    box([0, y, 0], [0.48, 0.14, 0.36], i === active ? [150, 205, 236] : [196, 224, 241], {
      decorate: (n, corners) => {
        if (n[1] === 1) return;
        for (let w = 1; w < 6; w += 1) line(kit.onFace(corners, w / 6, 0), kit.onFace(corners, w / 6, 1), 'rgba(255,255,255,0.6)');
      },
    });
    nodes.push([0.48, y + 0.05, 0.36], [-0.48, y + 0.05, -0.36]);
  }
  const hub = [0, 1.05, 0];
  nodes.forEach((n, i) => {
    line(n, hub, rgba(BLUE, 0.13), 1, [3, 5]);
    const s = frac(t * 0.4 + i * 0.13);
    dot(lerp3(n, hub, s), 2.6, rgba(BLUE, Math.sin(Math.PI * s)));
    const pulse = frac(t * 0.8 + i * 0.21);
    path(flatCircle(n, 0.03 + pulse * 0.16, 24), { stroke: rgba(TEAL, (1 - pulse) * 0.8) });
    dot(n, 3.2, rgba(TEAL, 1));
  });
  path(flatCircle(hub, 0.13, 32), { fill: 'rgba(255,255,255,0.95)', stroke: rgba(BLUE, 0.8), width: 1.5, close: true });
  path(flatCircle(hub, 0.2 + 0.05 * Math.sin(t * 2), 32), { stroke: rgba(BLUE, 0.3) });
  dot(hub, 4, rgba(BLUE, 1));
}

// ---------------------------------------------------------------- Electro-mechanical: meshing gears
const GEARS = (() => {
  const g1 = { x: -0.45, y: 0.05, r: 0.42, teeth: 14, dir: 1 };
  const at = (g, r, deg) => ({ x: g.x + (g.r + r) * Math.cos((deg * Math.PI) / 180), y: g.y + (g.r + r) * Math.sin((deg * Math.PI) / 180) });
  const g2 = { ...at(g1, 0.3, 20), r: 0.3, teeth: 10, dir: -1 };
  const g3 = { ...at(g1, 0.22, -38), r: 0.22, teeth: 7, dir: -1 };
  return [g1, g2, g3];
})();

function electro(kit, t) {
  const { path, line, dot } = kit;
  const base = t * 0.5;
  GEARS.forEach((g, gi) => {
    const rot = (g.dir * base * GEARS[0].teeth) / g.teeth + (gi ? Math.PI / g.teeth : 0);
    const outline = (z) => {
      const pts = [];
      const steps = g.teeth * 4;
      for (let i = 0; i <= steps; i += 1) {
        const a = rot + (i / steps) * TAU;
        const r = i % 4 < 2 ? g.r + 0.04 : g.r - 0.04;
        pts.push([g.x + Math.cos(a) * r, g.y + Math.sin(a) * r, z]);
      }
      return pts;
    };
    const back = outline(-0.08);
    const front = outline(0.08);
    path(back, { stroke: rgba(BLUE, 0.35), close: true });
    for (let i = 0; i < back.length; i += 4) line(back[i], front[i], rgba(BLUE, 0.25));
    path(front, { fill: 'rgba(255,255,255,0.94)', stroke: rgba(BLUE, 0.9), width: 1.5, close: true });
    for (let s = 0; s < 5; s += 1) {
      const a = rot + (s / 5) * TAU;
      line([g.x, g.y, 0.08], [g.x + Math.cos(a) * g.r * 0.72, g.y + Math.sin(a) * g.r * 0.72, 0.08], rgba(INK, 0.3), 2);
    }
    path(kit.circle([g.x, g.y, 0.08], [1, 0, 0], [0, 1, 0], g.r * 0.72, 32), { stroke: rgba(INK, 0.2) });
    dot([g.x, g.y, 0.08], 6, rgba(INK, 0.9));
  });
  // Power line with current flowing along it
  const wave = Array.from({ length: 60 }, (_, i) => {
    const x = -1.3 + (i / 59) * 2.6;
    return [x, -0.82 + Math.sin(x * 6 - t * 4) * 0.04, 0.2];
  });
  path(wave, { stroke: rgba(BLUE, 0.45), width: 1.5 });
  for (let k = 0; k < 4; k += 1) dot(wave[Math.floor(frac(t * 0.35 + k / 4) * 59)], 3, rgba(TEAL, 1));
}

// ---------------------------------------------------------------- Telecom: lattice tower with signal rings
function telecom(kit, t) {
  const { grid, line, path, dot, flatCircle } = kit;
  const floor = -0.72;
  const top = 0.85;
  grid(floor, 1.4, 12, 0.07);

  const levels = 8;
  const ring = (y) => {
    const s = 0.28 - ((y - floor) / (top - floor)) * 0.22;
    return [
      [-s, y, -s],
      [s, y, -s],
      [s, y, s],
      [-s, y, s],
    ];
  };
  for (let l = 0; l < levels; l += 1) {
    const a = ring(floor + ((top - floor) * l) / levels);
    const b = ring(floor + ((top - floor) * (l + 1)) / levels);
    for (let c = 0; c < 4; c += 1) {
      line(a[c], b[c], rgba(INK, 0.6), 1.4);
      line(a[c], b[(c + 1) % 4], rgba(INK, 0.18));
      line(b[c], b[(c + 1) % 4], rgba(INK, 0.25));
    }
  }
  [0, 1, 2].forEach((i) => {
    const a = (i / 3) * TAU + 0.5;
    const p = [Math.cos(a) * 0.1, top, Math.sin(a) * 0.1];
    line(p, [p[0], top + 0.22, p[2]], rgba(BLUE, 0.9), 4);
  });
  const mast = [0, top + 0.12, 0];
  for (let i = 0; i < 3; i += 1) {
    const s = frac(t * 0.4 + i / 3);
    path(flatCircle([0, top + 0.1 + s * 0.12, 0], 0.12 + s * 1.5, 64), { stroke: rgba(BLUE, (1 - s) * 0.55), width: 1.4 });
  }

  [
    [-1.1, 0.65],
    [1.05, -0.5],
    [0.9, 0.9],
  ].forEach(([x, z], i) => {
    const tip = [x, floor + 0.5, z];
    line([x - 0.06, floor, z], tip, rgba(INK, 0.45), 1.2);
    line([x + 0.06, floor, z], tip, rgba(INK, 0.45), 1.2);
    dot(tip, 3.5, rgba(BLUE, 0.9));
    const ctrl = [(x + mast[0]) / 2, top + 0.35, (z + mast[2]) / 2];
    const curve = Array.from({ length: 21 }, (_, k) => {
      const s = k / 20;
      return lerp3(lerp3(mast, ctrl, s), lerp3(ctrl, tip, s), s);
    });
    path(curve, { stroke: rgba(BLUE, 0.2), dash: [3, 4] });
    dot(curve[Math.floor(frac(t * 0.5 + i / 3) * 20)], 3, rgba(TEAL, 1));
  });
  dot(mast, 4, rgba(INK, 0.9));
}

// ---------------------------------------------------------------- Managed services: monitored network globe + dashboard
const ORBITS = [
  { tilt: 0.4, spin: 0.5, n: 3 },
  { tilt: -0.5, spin: -0.35, n: 2 },
  { tilt: 1.2, spin: 0.25, n: 2 },
];

function managed(kit, t) {
  const { path, dot, line, circle, flatCircle, P, ctx } = kit;
  const c = [-0.25, 0.05, 0];
  const R = 0.5;
  for (let m = 0; m < 8; m += 1) {
    const a = (m / 8) * Math.PI + t * 0.25;
    path(circle(c, [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], R, 40), { stroke: rgba(BLUE, 0.16) });
  }
  [-0.6, -0.2, 0.2, 0.6].forEach((y) => path(flatCircle([c[0], c[1] + y * R, c[2]], Math.sqrt(1 - y * y) * R, 40), { stroke: rgba(BLUE, 0.16) }));

  ORBITS.forEach((o, oi) => {
    const u = [1, 0, 0];
    const v = [0, Math.sin(o.tilt), Math.cos(o.tilt)];
    path(circle(c, u, v, 0.82, 64), { stroke: rgba(INK, 0.12) });
    for (let k = 0; k < o.n; k += 1) {
      const a = t * o.spin + (k / o.n) * TAU + oi;
      const p = add(c, add(scale(u, Math.cos(a) * 0.82), scale(v, Math.sin(a) * 0.82)));
      const healthy = frac(t * 0.15 + oi * 0.3 + k * 0.5) > 0.12;
      dot(p, 7, 'rgba(255,255,255,0.95)', rgba(healthy ? GREEN : RED, 0.8));
      dot(p, 3.2, rgba(healthy ? GREEN : RED, 1));
      line(p, c, rgba(INK, 0.05));
    }
  });

  // Floating dashboard panel
  const x0 = 0.5;
  const x1 = 1.3;
  const y0 = -0.2;
  const y1 = 0.42;
  const z = 0.35;
  path(
    [
      [x0, y0, z],
      [x1, y0, z],
      [x1, y1, z],
      [x0, y1, z],
    ],
    { fill: 'rgba(255,255,255,0.94)', stroke: rgba(INK, 0.14), close: true },
  );
  for (let b = 0; b < 6; b += 1) {
    const h = 0.08 + (0.5 + 0.5 * Math.sin(t * 1.5 + b * 1.3)) * 0.25;
    const bx = x0 + 0.1 + b * 0.11;
    const k = P([bx, y0 + 0.05, z]).k;
    ctx.lineCap = 'round';
    line([bx, y0 + 0.06, z], [bx, y0 + 0.06 + h, z], rgba(b === 5 ? TEAL : BLUE, 0.85), 7 * k);
    ctx.lineCap = 'butt';
  }
  const beat = Array.from({ length: 40 }, (_, i) => {
    const s = i / 39;
    const phase = frac(s - t * 0.4);
    const spike = phase > 0.45 && phase < 0.55 ? Math.sin((phase - 0.45) * 10 * TAU) * 0.06 : 0;
    return [x0 + 0.06 + s * (x1 - x0 - 0.12), y1 - 0.1 + spike, z];
  });
  path(beat, { stroke: rgba(GREEN, 0.9), width: 1.5 });
}

// spin: 'full' turns continuously; 'sway' rocks gently so flat panels never go edge-on.
export const SCENES = {
  'geospatial-technologies': { draw: geospatial, spin: 'full', speed: 0.12, pitch: 0.5, size: 0.3 },
  'artificial-intelligence-solutions': { draw: ai, spin: 'full', speed: 0.25, pitch: 0.3, size: 0.34 },
  'software-development': { draw: software, spin: 'sway', pitch: 0.2, size: 0.36 },
  'it-infrastructure': { draw: infrastructure, spin: 'sway', pitch: 0.42, size: 0.32 },
  'security-surveillance': { draw: security, spin: 'full', speed: 0.1, pitch: 0.48, size: 0.32 },
  'smart-facilities-management': { draw: facilities, spin: 'full', speed: 0.15, pitch: 0.45, size: 0.32 },
  'electro-mechanical-projects': { draw: electro, spin: 'sway', pitch: 0.18, size: 0.36 },
  'telecom-services': { draw: telecom, spin: 'full', speed: 0.14, pitch: 0.4, size: 0.32 },
  'managed-services': { draw: managed, spin: 'sway', pitch: 0.25, size: 0.36 },
};
