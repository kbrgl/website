const grid = [
  [1, 0, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
] as const;

const GAP = 0.25;
const STEP = 1 + GAP;
const BAR_HEIGHT = GAP / 2; // bars are half the column gap thick
const ROW_GAP = 2 * BAR_HEIGHT; // equal spacing between rows

// SVG coordinate extents for the full tile (dots + gaps, no trailing gap)
export const VIEW_W = grid[0].length * STEP - GAP; // 8.5
export const VIEW_H = grid.length * STEP - GAP; // 3.5

function toDataUri(shapes: string[], viewH: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${viewH}">${shapes.join("")}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function circleMask() {
  return {
    mask: toDataUri(
      grid.flatMap((row, r) =>
        row.flatMap((cell, c) =>
          cell ? [`<circle cx="${c * STEP + 0.5}" cy="${r * STEP + 0.5}" r="0.5"/>`] : [],
        ),
      ),
      VIEW_H,
    ),
    viewH: VIEW_H,
  };
}

// Row step is derived from bar height, not dot size, so rows pack tightly.
export function barMask(barHeight = BAR_HEIGHT, rowGap = ROW_GAP) {
  const rowStep = barHeight + rowGap;
  const viewH = grid.length * rowStep - rowGap;
  return {
    mask: toDataUri(
      grid.flatMap((row, r) =>
        row.flatMap((cell, c) =>
          cell
            ? [`<rect x="${c * STEP}" y="${r * rowStep}" width="1" height="${barHeight}"/>`]
            : [],
        ),
      ),
      viewH,
    ),
    viewH,
  };
}
