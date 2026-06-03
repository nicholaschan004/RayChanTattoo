/**
 * Download portfolio photos from the Google Sheet, resize them into local
 * WebP files under public/portfolio/, and write a static manifest the app
 * reads directly (src/data/portfolio.json).
 *
 * This replaces the slow runtime fetch of full-resolution Google Drive images
 * with pre-optimized images served from our own CDN — they load instantly.
 *
 * Usage:  npm run fetch:portfolio
 * Requires VITE_SHEETS_PHOTOS_CSV / VITE_SHEETS_CATEGORIES_CSV in .env(.local).
 */
import { readFileSync, existsSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parseCsv, convertDriveUrl } from '../src/lib/sheets.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const OUT_DIR = join(root, 'public', 'portfolio');
const MANIFEST = join(root, 'src', 'data', 'portfolio.json');

const GRID_WIDTH = 1000;   // thumbnail used in the grid/slider
const FULL_WIDTH = 1800;   // larger version used in the lightbox
const SOURCE_WIDTH = 2400; // size requested from Google (large but sane)

// --- Load env from .env then .env.local (later overrides), mirroring Vite ---
function loadEnv() {
  for (const file of ['.env', '.env.local']) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      let val = m[2];
      if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1);
      process.env[m[1]] = val;
    }
  }
}
loadEnv();

const PHOTOS_CSV = process.env.VITE_SHEETS_PHOTOS_CSV;
const CATEGORIES_CSV = process.env.VITE_SHEETS_CATEGORIES_CSV;

if (!PHOTOS_CSV || !CATEGORIES_CSV) {
  console.error('✗ Missing VITE_SHEETS_PHOTOS_CSV / VITE_SHEETS_CATEGORIES_CSV in .env');
  process.exit(1);
}

async function fetchCsv(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CSV fetch failed (${res.status})`);
  return parseCsv(await res.text());
}

async function main() {
  console.log('→ Fetching sheets…');
  const [photos, cats] = await Promise.all([
    fetchCsv(PHOTOS_CSV),
    fetchCsv(CATEGORIES_CSV),
  ]);

  const categories = [
    { id: 'all', label: 'All Works', kanji: '全' },
    ...cats.map((c) => ({
      id: (c.id || c.label || '').toLowerCase().trim(),
      label: c.label || c.id || '',
      kanji: c.kanji || '',
    })),
  ];

  const rows = photos
    .map((p) => ({
      url: (p.image_url || p.imageurl || p.image || p.url || '').trim(),
      category: (p.category || p.type || '').toLowerCase().trim(),
    }))
    .filter((r) => r.url);

  console.log(`→ ${rows.length} photos found. Downloading + resizing…`);

  // Regenerate the directory from scratch so it stays in sync with the sheet.
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const items = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const n = String(i + 1).padStart(2, '0');
    const base = n; // filenames: 01.webp (grid) + 01-full.webp (lightbox)

    const direct = convertDriveUrl(row.url);
    const sourceUrl = direct.includes('googleusercontent.com')
      ? `${direct.split('=')[0]}=w${SOURCE_WIDTH}`
      : direct;

    process.stdout.write(`  [${n}/${rows.length}] … `);
    try {
      const res = await fetch(sourceUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());

      const write = (width, quality, file) =>
        sharp(buf, { failOn: 'none' })
          .rotate() // honor EXIF orientation
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toFile(join(OUT_DIR, file));

      await write(GRID_WIDTH, 80, `${base}.webp`);
      await write(FULL_WIDTH, 82, `${base}-full.webp`);

      items.push({
        id: i + 1,
        src: `/portfolio/${base}.webp`,
        full: `/portfolio/${base}-full.webp`,
        category: row.category,
      });
      console.log('ok');
    } catch (err) {
      console.log(`skipped (${err.message})`);
    }
  }

  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, `${JSON.stringify({ categories, items }, null, 2)}\n`);

  console.log(`\n✓ Saved ${items.length} images to public/portfolio/`);
  console.log('✓ Wrote manifest to src/data/portfolio.json');
}

main().catch((err) => {
  console.error('\n✗ Failed:', err);
  process.exit(1);
});
