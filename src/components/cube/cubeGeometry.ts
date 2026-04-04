/**
 * Oblique projection geometry for a 3×3×3 cube.
 *
 * SVG viewBox: 0 0 100 110
 *
 * Projection basis vectors (screen pixels per cubie unit):
 *   X axis (right along front face):  (+14, 0)
 *   Y axis (up along front face):     (0,  -14)
 *   Z axis (depth, oblique recession): (+8, -4.5)
 *
 * The three visible faces are front (z=3), right (x=3), top (y=3).
 */

// ─── Projection constants ──────────────────────────────────────────────────
export const OX = 18;   // front-face bottom-left X
export const OY = 78;   // front-face bottom-left Y
export const FX = 14;   // X step per cell (right)
export const FY = -14;  // Y step per cell (up, screen Y is inverted)
export const DX = 8;    // depth step X (oblique right)
export const DY = -4.5; // depth step Y (oblique up)
export const N  = 3;    // cells per side

// Front face center
export const FCX = OX + (N / 2) * FX; // 39
export const FCY = OY + (N / 2) * FY; // 57

// ─── Point type ────────────────────────────────────────────────────────────
export type Pt   = [number, number];
export type Quad = [Pt, Pt, Pt, Pt];

// ─── Projection functions ──────────────────────────────────────────────────

/** Point on the front face (col 0=left, row 0=bottom) */
export const fp = (col: number, row: number): Pt =>
  [OX + col * FX, OY + row * FY];

/** Point on the right face (depth 0=front, row 0=bottom) */
export const rp = (depth: number, row: number): Pt =>
  [OX + N * FX + depth * DX, OY + depth * DY + row * FY];

/** Point on the top face (col 0=left, depth 0=front) */
export const tp = (col: number, depth: number): Pt =>
  [OX + col * FX + depth * DX, OY + N * FY + depth * DY];

// ─── Cell quads ────────────────────────────────────────────────────────────

export function frontQuad(col: number, row: number): Quad {
  return [fp(col, row), fp(col + 1, row), fp(col + 1, row + 1), fp(col, row + 1)];
}

export function rightQuad(depth: number, row: number): Quad {
  return [rp(depth, row), rp(depth + 1, row), rp(depth + 1, row + 1), rp(depth, row + 1)];
}

export function topQuad(col: number, depth: number): Quad {
  return [tp(col, depth), tp(col + 1, depth), tp(col + 1, depth + 1), tp(col, depth + 1)];
}

// ─── Utilities ─────────────────────────────────────────────────────────────

/** Inset a quad toward its center by fraction t (0=full size, 1=point) */
export function insetQuad(q: Quad, t: number): Quad {
  const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4;
  const cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
  return q.map(([x, y]): Pt => [x + (cx - x) * t, y + (cy - y) * t]) as Quad;
}

/** Convert quad to SVG polygon points string */
export function quadStr(q: Quad): string {
  return q.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

/** Convert any array of points to SVG polygon points string */
export function ptsStr(pts: Pt[]): string {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}
