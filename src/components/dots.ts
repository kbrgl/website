const grid = [
  [1, 0, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
] as const;

export const GAP = 0.25;
export const STEP = 1 + GAP;
export const BAR_HEIGHT = GAP / 2; // bars are half the column gap thick
export const ROW_GAP = 2 * BAR_HEIGHT; // equal spacing between rows

export const COLS = grid[0].length;
export const ROWS = grid.length;
export const VIEW_W = COLS * STEP - GAP; // 8.5
export const VIEW_H = ROWS * STEP - GAP; // 3.5

export function getFilledCells() {
  return grid.flatMap((row, r) => row.flatMap((cell, c) => (cell ? [{ c, r }] : [])));
}

export function mapFilledCells<T>(f: (c: number, r: number) => T): T[] {
  return grid.flatMap((row, r) => row.flatMap((cell, c) => (cell ? [f(c, r)] : [])));
}

export function getCellCenter(c: number, r: number) {
  return { cx: c * STEP + 0.5, cy: r * STEP + 0.5 };
}
