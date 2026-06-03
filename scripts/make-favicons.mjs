/**
 * Regenerate the tab favicons from the high-resolution logo so the edges stay
 * crisp. Produces a centered "RC" mark on a transparent square canvas:
 *   - favicon-dark.png  → white mark  (shown in dark mode)
 *   - favicon-light.png → black mark  (shown in light mode)
 *
 * Source is the white logo; the black version is produced by recoloring
 * white → black while preserving the anti-aliased alpha edges.
 *
 * Usage:  node scripts/make-favicons.mjs [sourceImage]   (default: logo-hd.png)
 */
import sharp from 'sharp';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const SRC = join(pub, process.argv[2] || 'logo-hd.png');

const SIZE = 256;  // canvas size — downsamples cleanly to 16/32/48px
const INNER = 232; // mark size within the canvas (leaves a small margin)

// Crop the transparent padding to the mark, then downscale it sharply.
const mark = await sharp(SRC)
  .trim()
  .resize(INNER, INNER, { fit: 'inside' })
  .png()
  .toBuffer();

const canvas = () =>
  sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

// White mark (dark mode)
await canvas()
  .composite([{ input: mark, gravity: 'center' }])
  .png()
  .toFile(join(pub, 'favicon-dark.png'));

// Black mark (light mode) — recolor white → black, keep the alpha edges
const blackMark = await sharp(mark).negate({ alpha: false }).png().toBuffer();
await canvas()
  .composite([{ input: blackMark, gravity: 'center' }])
  .png()
  .toFile(join(pub, 'favicon-light.png'));

console.log(`✓ Wrote favicon-light.png (black) + favicon-dark.png (white) at ${SIZE}px`);
