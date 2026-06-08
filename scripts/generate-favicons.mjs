import { mkdir, writeFile } from "node:fs/promises";

import sharp from "sharp";

import { getFilledCells, STEP, VIEW_H, VIEW_W } from "#/components/dots.ts";

const publicDir = new URL("../public/", import.meta.url);
const faviconSvgPath = new URL("favicon.svg", publicDir);
const faviconIcoPath = new URL("favicon.ico", publicDir);

const iconSize = 128;
const dotColor = "#000";
const darkDotColor = "#fff";
const icoDotColor = "#737373";
const icoSizes = [16, 32, 48];

function getLogoGeometry() {
  const scale = iconSize / VIEW_W;
  const width = VIEW_W * scale;
  const height = VIEW_H * scale;

  return {
    offsetX: (iconSize - width) / 2,
    offsetY: (iconSize - height) / 2,
    scale,
  };
}

function buildCircles() {
  const { offsetX, offsetY, scale } = getLogoGeometry();

  return getFilledCells()
    .map(({ c, r }) => {
      const cx = offsetX + (c * STEP + 0.5) * scale;
      const cy = offsetY + (r * STEP + 0.5) * scale;
      const radius = 0.5 * scale;

      return `  <circle cx="${cx.toFixed(3)}" cy="${cy.toFixed(3)}" r="${radius.toFixed(3)}" />`;
    })
    .join("\n");
}

function buildFaviconSvg() {
  const circles = buildCircles();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iconSize} ${iconSize}">
  <style>
    :root { color: ${dotColor}; }
    @media (prefers-color-scheme: dark) {
      :root { color: ${darkDotColor}; }
    }
    circle { fill: currentColor; }
  </style>
${circles}
</svg>
`;
}

function buildIcoSvg() {
  const circles = buildCircles();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iconSize} ${iconSize}">
  <style>
    circle { fill: ${icoDotColor}; }
  </style>
${circles}
</svg>
`;
}

function buildIco(pngImages) {
  const headerSize = 6;
  const directoryEntrySize = 16;
  const directorySize = headerSize + pngImages.length * directoryEntrySize;
  const directory = Buffer.alloc(directorySize);

  directory.writeUInt16LE(0, 0);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(pngImages.length, 4);

  let imageOffset = directorySize;

  pngImages.forEach(({ size, buffer }, index) => {
    const entryOffset = headerSize + index * directoryEntrySize;

    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset);
    directory.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(buffer.length, entryOffset + 8);
    directory.writeUInt32LE(imageOffset, entryOffset + 12);

    imageOffset += buffer.length;
  });

  return Buffer.concat([directory, ...pngImages.map(({ buffer }) => buffer)]);
}

async function main() {
  const svg = buildFaviconSvg();
  const icoSvgBuffer = Buffer.from(buildIcoSvg());
  const pngImages = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buffer: await sharp(icoSvgBuffer)
        .resize(size, size, {
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          fit: "contain",
        })
        .png()
        .toBuffer(),
    })),
  );

  await mkdir(publicDir, { recursive: true });
  await writeFile(faviconSvgPath, svg);
  await writeFile(faviconIcoPath, buildIco(pngImages));

  console.log(`Wrote ${faviconSvgPath.pathname}`);
  console.log(`Wrote ${faviconIcoPath.pathname}`);
}

await main();
