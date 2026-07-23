import type { APIRoute } from 'astro';
import { SITE_URL, SITE_PAGES, LAST_VERIFIED_DATE } from '../config';

// Generated in both PUBLIC_MODE=false and PUBLIC_MODE=true builds — harmless
// while staging since robots.txt still disallows everything and every page
// carries a noindex meta tag until the flag is flipped. Lists only real,
// standalone content pages; /go/<program>/ affiliate-redirect stubs are
// intentionally excluded (see SITE_PAGES in src/config.ts).

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;');
}

export const GET: APIRoute = () => {
  const urlEntries = SITE_PAGES.map(
    (page) =>
      `  <url>\n    <loc>${escapeXml(`${SITE_URL}${page.path}`)}</loc>\n    <lastmod>${LAST_VERIFIED_DATE}</lastmod>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`
  ).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
