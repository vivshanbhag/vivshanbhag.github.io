import { useEffect, useRef } from "react";

/*
 * Ambient fluid backdrop.
 *
 * A WebGL fragment shader warps layered value noise to produce a slow, liquid
 * colour field — the same idea as the animated mesh gradients used on modern
 * product sites, but drawn continuously from a clock rather than tied to
 * scrolling. Colours are read from the theme tokens (--fluid-*) so light and
 * dark each get their own palette, and the whole layer parks on a single frame
 * when the visitor prefers reduced motion or when WebGL is unavailable.
 */

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform vec3 uD;
uniform float uStrength;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 4; i++) {
    total += amp * noise(p);
    p = rot * p * 2.03;
    amp *= 0.5;
  }
  return total;
}

float ribbon(float distance, float width) {
  float x = distance / width;
  return exp(-x * x);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y * 2.0;
  float t = uTime * 0.055;

  // A warped diagonal coordinate turns the palette into broad ribbons of
  // colour that ripple and drift, with no shapes or edges to read as blobs.
  float warp = fbm(vec2(p.x * 0.55 + t * 0.9, p.y * 0.70 - t * 0.6));
  float fine = fbm(vec2(p.x * 1.30 - t * 0.5, p.y * 1.10 + t * 0.4));
  // The sine term turns the bands into slow, curtain-like waves. No linear
  // drift term here: it would walk the whole set of bands off screen.
  float lane = p.y * 0.80 + p.x * 0.22 + (warp - 0.5) * 1.25
             + 0.45 * sin(p.x * 0.55 + t * 1.1);

  // Evenly spaced, overlapping bands: the page always carries some colour,
  // and the warp makes them ripple instead of reading as stripes.
  vec3 col = uBg;
  float w = 0.90;
  col = mix(col, uC, 0.27 * uStrength * ribbon(lane + 2.30, w));
  col = mix(col, uB, 0.32 * uStrength * ribbon(lane + 1.15, w));
  col = mix(col, uA, 0.25 * uStrength * ribbon(lane, w));
  col = mix(col, uD, 0.21 * uStrength * ribbon(lane - 1.15, w));
  col = mix(col, uB, 0.18 * uStrength * ribbon(lane - 2.30, w));

  // A soft internal sheen keeps the bands from looking flat.
  col *= 0.94 + 0.12 * fine + 0.08 * warp;

  // Calm the corners so type stays easy to read.
  col = mix(col, uBg, 0.32 * smoothstep(0.60, 1.10, length(uv - 0.5)));

  gl_FragColor = vec4(col, 1.0);
}
`;

type Rgb = [number, number, number];

function toRgb(value: string, fallback: Rgb): Rgb {
  const color = value.trim();
  const hex = /^#?([0-9a-f]{6})$/i.exec(color);
  if (hex) {
    const int = Number.parseInt(hex[1], 16);
    return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
  }
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(color);
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (parts.length >= 3) return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
  }
  return fallback;
}

function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const read = (token: string, fallback: Rgb) => toRgb(styles.getPropertyValue(token), fallback);
  return {
    bg: read("--fluid-bg", [0.04, 0.07, 0.08]),
    a: read("--fluid-a", [0.13, 0.62, 0.53]),
    b: read("--fluid-b", [0.18, 0.44, 0.82]),
    c: read("--fluid-c", [0.48, 0.36, 0.84]),
    d: read("--fluid-d", [0.11, 0.5, 0.59]),
    strength: Number.parseFloat(styles.getPropertyValue("--fluid-strength")) || 1,
  };
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    // No WebGL: the wrapper's flat --fluid-bg colour is the fallback.
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uBg = gl.getUniformLocation(program, "uBg");
    const uA = gl.getUniformLocation(program, "uA");
    const uB = gl.getUniformLocation(program, "uB");
    const uC = gl.getUniformLocation(program, "uC");
    const uD = gl.getUniformLocation(program, "uD");
    const uStrength = gl.getUniformLocation(program, "uStrength");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Colours change only when the theme flips, so they are uploaded once.
    const uploadPalette = () => {
      const palette = readPalette();
      gl.uniform3fv(uBg, palette.bg);
      gl.uniform3fv(uA, palette.a);
      gl.uniform3fv(uB, palette.b);
      gl.uniform3fv(uC, palette.c);
      gl.uniform3fv(uD, palette.d);
      gl.uniform1f(uStrength, palette.strength);
    };

    const render = (seconds: number) => {
      gl.uniform1f(uTime, reduceMotion.matches ? 14 : seconds);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.round(window.innerWidth * dpr);
      const height = Math.round(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
    };

    let frame = 0;
    let running = false;
    const start = performance.now();

    const loop = (now: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(loop);
      render((now - start) / 1000);
    };

    const play = () => {
      if (running || reduceMotion.matches) return;
      running = true;
      frame = window.requestAnimationFrame(loop);
    };

    const pause = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const restart = () => {
      pause();
      resize();
      uploadPalette();
      render((performance.now() - start) / 1000);
      play();
    };

    restart();

    const onResize = () => {
      resize();
      uploadPalette();
      if (!running) render((performance.now() - start) / 1000);
    };

    // Theme flips re-read the palette; a hidden tab stops drawing entirely.
    const observer = new MutationObserver(() => {
      uploadPalette();
      if (!running) render((performance.now() - start) / 1000);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onVisibility = () => {
      if (document.hidden) pause();
      else restart();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", restart);

    return () => {
      pause();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", restart);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <div aria-hidden className="fluid">
      <canvas ref={canvasRef} className="fluid-canvas" />
      <div className="fluid-grain" />
    </div>
  );
}
