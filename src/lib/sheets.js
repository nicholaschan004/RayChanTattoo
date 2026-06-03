/**
 * Convert Google Drive sharing URLs to direct image URLs.
 */
export function convertDriveUrl(url) {
  if (!url) return '';
  const fileMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  return url;
}

/**
 * Request a resized version of an image to avoid shipping full-resolution
 * originals to the browser. Google user-content URLs support a `=w{width}`
 * sizing suffix that returns a scaled thumbnail (much smaller/faster). Other
 * URLs are returned unchanged.
 */
export function sizedImageUrl(url, width) {
  if (!url) return '';
  if (url.includes('googleusercontent.com')) {
    const base = url.split('=')[0];
    return `${base}=w${width}`;
  }
  return url;
}

/**
 * Parse a single CSV line, handling quoted fields with commas.
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

/**
 * Parse CSV text into an array of objects keyed by column headers.
 */
export function parseCsv(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());

  return lines.slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = parseCSVLine(line);
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = (values[i] || '').trim();
      });
      return obj;
    });
}

/**
 * Fetch a published Google Sheet CSV and parse it into row objects.
 */
export async function fetchSheetCsv(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
  const text = await res.text();
  return parseCsv(text);
}
