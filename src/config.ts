// StackCompass — site-wide configuration.
// Single source of truth for canonical URLs, OG/Twitter tags, sitewide
// JSON-LD, and the staging/public toggle. Edit here, not per-page.

// ---------------------------------------------------------------------------
// SITE_URL — working default for build/staging purposes only.
// SWAP-AT-PUBLISH: confirm the real production domain is registered/live and
// update this single value before any public deploy. Everything else
// (canonical tags, OG/Twitter urls, JSON-LD @id/url fields, sitemap.xml,
// robots.txt Sitemap: line) derives from this constant.
// ---------------------------------------------------------------------------
export const SITE_URL = 'https://stack-compass.com'; // production domain (registered 2026-07-22)

// ---------------------------------------------------------------------------
// PUBLIC_MODE — the staging/public flag.
//   false (current) = staging/internal QA build:
//     - every page keeps <meta name="robots" content="noindex, nofollow">
//     - robots.txt stays "Disallow: /"
//   true = public build:
//     - pages emit indexable robots meta (index, follow)
//     - robots.txt explicitly allows standard search bots + AI answer-engine
//       bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) and
//       points to /sitemap.xml
// A maintainer goes live by flipping this one constant to `true` and
// rebuilding — no other code changes required.
// sitemap.xml is generated in both modes (harmless while staging).
// ---------------------------------------------------------------------------
export const PUBLIC_MODE = true; // LIVE — indexable, AI-crawler robots + sitemap enabled (2026-07-22)

// ---------------------------------------------------------------------------
// Org / brand — feeds Organization + WebSite JSON-LD and OG "site_name".
// ---------------------------------------------------------------------------
export const ORG = {
  name: 'StackCompass',
  description:
    'StackCompass is an independent, source-checked comparison site for creator and agency marketing-stack tools — email, funnels, CRM, and course platforms — with affiliate program terms verified against official vendor documentation.',
  /** Editorial/publisher name used in Article JSON-LD "publisher" and footer credit. */
  publisherName: 'StackCompass Editorial',
};

// ---------------------------------------------------------------------------
// SITE_PAGES — real, publicly-linkable pages (excludes /go/ affiliate
// redirect stubs). Used to generate sitemap.xml. Add a row whenever a new
// content page ships.
// ---------------------------------------------------------------------------
export const SITE_PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/gohighlevel-pricing/', priority: 0.9 },
  { path: '/alternatives/gohighlevel/', priority: 0.8 },
  { path: '/compare/systeme-io-vs-getresponse/', priority: 0.8 },
  { path: '/compare/gohighlevel-vs-getresponse/', priority: 0.8 },
  { path: '/compare/gohighlevel-vs-kajabi/', priority: 0.8 },
  { path: '/compare/kit-vs-getresponse/', priority: 0.8 },
  { path: '/alternatives/systeme-io/', priority: 0.8 },
  { path: '/alternatives/kit/', priority: 0.8 },
  { path: '/alternatives/getresponse/', priority: 0.8 },
  { path: '/tools/which-tool-fits-me/', priority: 0.6 },
  { path: '/tools/stack-cost-calculator/', priority: 0.6 },
  { path: '/brevo/', priority: 0.6 },
  { path: '/semrush/', priority: 0.6 },
  { path: '/disclosure/', priority: 0.3 },
  { path: '/privacy/', priority: 0.2 },
];

/** Shared "verified" date stamp used across JSON-LD datePublished/dateModified and sitemap lastmod. */
export const LAST_VERIFIED_DATE = '2026-07-22';

/**
 * Build a schema.org BreadcrumbList node (no its own @context — designed to
 * be pushed into an existing @graph array alongside Article/FAQPage nodes).
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
