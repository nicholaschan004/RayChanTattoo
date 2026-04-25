import { useState, useEffect } from 'react';
import { convertDriveUrl, fetchSheetCsv } from '../lib/sheets';

const SETTINGS_CSV_URL = import.meta.env.VITE_SHEETS_SETTINGS_CSV;

const FALLBACK_HERO = '';
const FALLBACK_ARTIST = '';
const FALLBACK_BIO = [
  'Born in Cebu, Philippines, Ray\'s path into tattooing began in San Francisco, where he worked as a chef before apprenticing under Tango at InkVested Tattoo Studio.',
  'With over five years of experience, his work centers on Neo-Japanese tattooing, focused on movement, contrast, and composition. He creates large-scale pieces designed to flow with the body and stand the test of time.',
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
