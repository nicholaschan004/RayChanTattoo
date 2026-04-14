import { useState, useEffect } from 'react';
import { convertDriveUrl, fetchSheetCsv } from '../lib/sheets';

const PHOTOS_CSV_URL = import.meta.env.VITE_SHEETS_PHOTOS_CSV;
const CATEGORIES_CSV_URL = import.meta.env.VITE_SHEETS_CATEGORIES_CSV;

const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All Works', kanji: '全' },
];

export function usePortfolioData() {
  const enabled = !!(PHOTOS_CSV_URL && CATEGORIES_CSV_URL);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
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
