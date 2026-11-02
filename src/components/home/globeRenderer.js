// A white wireframe-style globe drawn by a single full-canvas WebGL2 shader (no 3D library): each pixel
// inside the disc is ray-cast onto a unit sphere, rotated by the axial tilt and spin, and shaded as soft
// white with an anti-aliased latitude/longitude grid. Light-blue pulses of light streak along a few grid
// lines at a time, like current running over the surface. The limb fades towards white so it sits
// lightly on the page.

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uCenter;   // device px, GL origin (bottom-left)
uniform float uRadius;  // device px
uniform float uSpin;
uniform float uTilt;
uniform float uAlpha;
uniform float uTime;    // seconds, drives the light pulses
out vec4 outColor;

const float PI = 3.14159265;
const float STEP = 15.0; // grid spacing, degrees
const vec3 LIGHT = vec3(-0.42, 0.42, 0.8);
const vec3 LINE = vec3(0.62, 0.69, 0.78);
const vec3 PULSE = vec3(0.3, 0.7, 1.0);
const float TAIL = 48.0; // degrees of fading trail behind each pulse head

float hash(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }

// A pulse travelling along one grid line: "along" is how far (degrees) this point lies behind the head.
// Bright at the head, fading over the tail.
float trail(float along) {
  float behind = along >= 0.0 ? pow(1.0 - clamp(along / TAIL, 0.0, 1.0), 2.2) : 0.0;
  return max(behind, exp(-along * along * 0.08));
}

// 1 on a grid line, 0 between them, anti-aliased to about one pixel.
float gridLine(float deg, float width) {
  float d = abs(fract(deg / STEP + 0.5) - 0.5) * STEP;
  return 1.0 - smoothstep(0.0, width, d);
}

void main() {
  vec2 p = (gl_FragCoord.xy - uCenter) / uRadius;
  float r = length(p);
  float inside = smoothstep(1.0, 1.0 - 1.5 / uRadius, r);

  // A faint cool halo just outside the limb, so the white sphere still reads against a white page.
  float t = max(r - 1.0, 0.0) / 0.06;
  float halo = exp(-t * t * 2.0) * 0.18 * (1.0 - inside);

  vec3 color = vec3(1.0);
  if (r < 1.0) {
    vec3 n = vec3(p, sqrt(max(1.0 - r * r, 0.0)));
    // Undo the axial tilt (about z), then the spin (about y), to get the surface point on the globe.
    float ct = cos(uTilt), st = sin(uTilt);
    vec3 q = vec3(ct * n.x + st * n.y, -st * n.x + ct * n.y, n.z);
    float cs = cos(uSpin), ss = sin(uSpin);
    vec3 o = vec3(cs * q.x - ss * q.z, q.y, ss * q.x + cs * q.z);

    float lat = degrees(asin(clamp(o.y, -1.0, 1.0)));
    float lon = degrees(atan(o.x, o.z));
    // Longitude jumps at the date line; take its derivative from a copy that's continuous there.
    float lonB = mod(lon + 360.0, 360.0);
    float lonWidth = min(fwidth(lon), fwidth(lonB)) * 1.2;

    float lines = max(
      gridLine(lat, fwidth(lat) * 1.2),
      // Meridians stop short of the poles, where they would bunch into a dark knot.
      gridLine(lon, lonWidth) * (1.0 - smoothstep(70.0, 80.0, abs(lat)))
    );
    lines = max(lines, gridLine(lat, fwidth(lat) * 2.2) * step(abs(lat), 1.0)); // a slightly bolder equator

    // Light pulses. Each grid line rolls its own dice per lap: only some carry a pulse, at their own
    // speed and phase, so a few streaks are always in flight without the grid flashing in unison.
    float glowLat = fwidth(lat) * 3.5;
    float idxLon = floor(lon / STEP + 0.5);
    float idxLat = floor(lat / STEP + 0.5);
    float pulse = 0.0;
    {
      // Meridians: pulses run pole-ward, north to south.
      float h = hash(idxLon);
      float speed = 0.2 + 0.16 * hash(idxLon + 7.0);
      float lap = uTime * speed + h;
      float on = step(hash(idxLon * 3.1 + floor(lap)), 0.45);
      float head = 80.0 - fract(lap) * (160.0 + TAIL);
      float line = gridLine(lon, lonWidth * 3.0) * (1.0 - smoothstep(70.0, 80.0, abs(lat)));
      pulse = max(pulse, on * line * trail(lat - head));
    }
    {
      // Parallels: pulses run east around the globe.
      float h = hash(idxLat + 50.0);
      float speed = 0.14 + 0.12 * hash(idxLat + 91.0);
      float lap = uTime * speed + h;
      float on = step(hash(idxLat * 5.3 + floor(lap) + 17.0), 0.5) * step(abs(idxLat * STEP), 60.0);
      float head = fract(lap) * 360.0 - 180.0;
      float along = mod(head - lon + 360.0, 360.0); // degrees west of (behind) the head
      along = along > 180.0 ? along - 360.0 : along;
      pulse = max(pulse, on * gridLine(lat, glowLat) * trail(along));
    }

    float diffuse = max(dot(n, normalize(LIGHT)), 0.0);
    vec3 surface = vec3(0.985, 0.988, 0.993) * (0.84 + 0.18 * diffuse);
    color = mix(surface, LINE, lines * 0.75);
    // Towards the limb everything fades to white; the pulses fade with it, but less.
    color = mix(color, vec3(1.0), pow(1.0 - n.z, 2.4) * 0.8);
    color = mix(color, PULSE, clamp(pulse, 0.0, 1.0) * (1.0 - pow(1.0 - n.z, 3.0) * 0.6));
  }

  float alpha = (inside + halo) * uAlpha;
  outColor = vec4((color * inside + vec3(0.55, 0.68, 0.85) * halo) * uAlpha, alpha);
}`;

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
};

// Returns null when WebGL2 isn't available, so the caller can fall back to a flat globe.
export function createGlobe(canvas) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch (error) {
    console.warn('Globe shader failed:', error);
    return null;
  }
  gl.useProgram(program);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name) => gl.getUniformLocation(program, name);
  const u = {
    center: uniform('uCenter'),
    radius: uniform('uRadius'),
    spin: uniform('uSpin'),
    tilt: uniform('uTilt'),
    alpha: uniform('uAlpha'),
    time: uniform('uTime'),
  };
  const state = { dpr: 1, h: 0 };

  return {
    // Size the drawing buffer to the canvas's CSS size.
    resize(width, height, dpr) {
      state.dpr = dpr;
      state.h = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    // Center and radius in CSS px from the canvas's top-left.
    draw({ x, y, radius, spin, tilt, alpha, time = 0 }) {
      const { dpr } = state;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (alpha <= 0.001) return;
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(u.center, x * dpr, (state.h - y) * dpr);
      gl.uniform1f(u.radius, radius * dpr);
      gl.uniform1f(u.spin, spin);
      gl.uniform1f(u.tilt, tilt);
      gl.uniform1f(u.alpha, alpha);
      gl.uniform1f(u.time, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      // No loseContext(): the canvas (and so its context) can be reused by a remount, e.g. under StrictMode.
    },
  };
}
