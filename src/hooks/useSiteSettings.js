import { useState, useEffect } from 'react';
import { convertDriveUrl, fetchSheetCsv } from '../lib/sheets';

const SETTINGS_CSV_URL = import.meta.env.VITE_SHEETS_SETTINGS_CSV;

const FALLBACK_HERO = '';
const FALLBACK_ARTIST = '';
const FALLBACK_BIO = [
  'With over a decade of dedication to the craft, Ray specializes in Japanese traditional tattoo art — from bold Irezumi compositions to delicate fine-line work rooted in centuries of Eastern aesthetics.',
  'Each piece is custom-designed to flow with the client\'s natural anatomy, honoring the traditions of Japanese tattooing while embracing modern expression. No flash. No repeats. Every tattoo is a one-of-one collaboration.',
  'Based in a private studio, Ray provides a focused, judgment-free environment where the art and the individual come first.',
];

export function useSiteSettings() {
  const [heroImage, setHeroImage] = useState(FALLBACK_HERO);
  const [artistImage, setArtistImage] = useState(FALLBACK_ARTIST);
  const [artistBio, setArtistBio] = useState(FALLBACK_BIO);
  const [loading, setLoading] = useState(!!SETTINGS_CSV_URL);

  useEffect(() => {
    if (!SETTINGS_CSV_URL) return;

    let cancelled = false;

    async function load() {
      try {
        const rows = await fetchSheetCsv(SETTINGS_CSV_URL);
        if (cancelled) return;

        for (const row of rows) {
          const key = (row.key || row.setting || '').toLowerCase().trim();
          const value = (row.value || row.url || row.image_url || '').trim();
          if (!value) continue;

          if (key === 'hero_image') setHeroImage(convertDriveUrl(value));
          if (key === 'artist_image') setArtistImage(convertDriveUrl(value));
          if (key === 'artist_bio') setArtistBio(value.split('|').map((p) => p.trim()).filter(Boolean));
        }
      } catch (err) {
        console.error('Failed to load site settings from Google Sheets:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { heroImage, artistImage, artistBio, loading };
}
