const grid = [
  [1, 0, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
] as const;

export const GAP = 0.25;
export const STEP = 1 + GAP;
export const BAR_HEIGHT = GAP / 2; // bars are half the column gap thick
export const ROW_GAP = 2 * BAR_HEIGHT; // equal spacing between rows

export const VIEW_W = grid[0].length * STEP - GAP; // 8.5
export const VIEW_H = grid.length * STEP - GAP; // 3.5

export function getFilledCells() {
  return grid.flatMap((row, r) => row.flatMap((cell, c) => (cell ? [{ c, r }] : [])));
}
