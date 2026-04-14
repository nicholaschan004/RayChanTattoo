import { useState, useEffect } from 'react';
import { convertDriveUrl, fetchSheetCsv } from '../lib/sheets';

const PHOTOS_CSV_URL = import.meta.env.VITE_SHEETS_PHOTOS_CSV;
const CATEGORIES_CSV_URL = import.meta.env.VITE_SHEETS_CATEGORIES_CSV;

const FALLBACK_CATEGORIES = [
  { id: 'all', label: 'All Works', kanji: '全' },
  { id: 'sleeves', label: 'Sleeves', kanji: '袖' },
  { id: 'blackgrey', label: 'Black & Grey', kanji: '墨' },
  { id: 'traditional', label: 'Traditional', kanji: '伝統' },
  { id: 'custom', label: 'Custom', kanji: '独自' },
];

const FALLBACK_ITEMS = [
  { id: 1, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/512b1b3b4_generated_0630fb36.png', title: 'The Guardian Tiger', category: 'traditional' },
  { id: 2, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/50d13ab2c_generated_6c23bcec.png', title: 'Kanagawa Waves', category: 'custom' },
  { id: 3, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/8112cacd2_generated_bb4f8425.png', title: 'Hannya Mask', category: 'blackgrey' },
  { id: 4, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/6cb9c2add_generated_07d3a6db.png', title: 'Koi Sleeve', category: 'sleeves' },
  { id: 5, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/79f51db0b_generated_8db818fd.png', title: 'Rising Phoenix', category: 'traditional' },
  { id: 6, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/9c23ad176_generated_5cfdf5f7.png', title: 'Dragon Forearm', category: 'custom' },
  { id: 7, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/8c5c84f4d_generated_3d671ad0.png', title: 'Samurai Spirit', category: 'blackgrey' },
  { id: 8, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/0c2e1b640_generated_3d671ad0.png', title: 'Dragon Back Piece', category: 'traditional' },
];

export function usePortfolioData() {
  const enabled = !!(PHOTOS_CSV_URL && CATEGORIES_CSV_URL);
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function load() {
      try {
        const [photos, cats] = await Promise.all([
          fetchSheetCsv(PHOTOS_CSV_URL),
          fetchSheetCsv(CATEGORIES_CSV_URL),
        ]);

        if (cancelled) return;

        const parsedCategories = [
          { id: 'all', label: 'All Works', kanji: '全' },
          ...cats.map((c) => ({
            id: (c.id || c.label || '').toLowerCase().trim(),
            label: c.label || c.id || '',
            kanji: c.kanji || '',
          })),
        ];

        const parsedItems = photos
          .filter((p) => (p.image_url || p.imageurl || p.image || p.url || '').trim())
          .map((p, i) => ({
            id: i + 1,
            src: convertDriveUrl(p.image_url || p.imageurl || p.image || p.url || ''),
            title: (p.title || p.name || '').trim(),
            category: (p.category || p.type || '').toLowerCase().trim(),
          }));

        setCategories(parsedCategories);
        setItems(parsedItems);
      } catch (err) {
        console.error('Failed to load portfolio from Google Sheets:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { items, categories, loading };
}
