const grid = [
  [1, 0, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
] as const;

const GAP = 0.25;
const STEP = 1 + GAP;
const BAR_HEIGHT = GAP / 2;
const ROW_GAP = 2 * BAR_HEIGHT;
const BAND_ROW_STEP = BAR_HEIGHT + ROW_GAP;

export const VIEW_W = grid[0].length * STEP - GAP;
export const VIEW_H = grid.length * STEP - GAP;
export const BAND_VIEW_H = grid.length * BAND_ROW_STEP - ROW_GAP;

export function mapFilledCells<T>(f: (c: number, r: number) => T): T[] {
  return grid.flatMap((row, r) => row.flatMap((cell, c) => (cell ? [f(c, r)] : [])));
}

export function getCellCenter(c: number, r: number) {
  return { cx: c * STEP + 0.5, cy: r * STEP + 0.5 };
}

function getBarRect(c: number, r: number) {
  return { x: c * STEP, y: r * BAND_ROW_STEP, width: 1, height: BAR_HEIGHT };
}

export function buildDotCircles(): string {
  return mapFilledCells((c, r) => {
    const { cx, cy } = getCellCenter(c, r);
    return `<circle cx="${cx}" cy="${cy}" r="0.5"/>`;
  }).join("");
}

export function buildBarRects(): string {
  return mapFilledCells((c, r) => {
    const { x, y, width, height } = getBarRect(c, r);
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}"/>`;
  }).join("");
}
