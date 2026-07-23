import type { APIRoute } from 'astro';
import { SITE_URL, PUBLIC_MODE } from '../config';

// Dynamic robots.txt, driven entirely by PUBLIC_MODE (src/config.ts):
//   PUBLIC_MODE = false (staging, current) → Disallow everything.
//   PUBLIC_MODE = true (public)            → explicitly allow standard search
//     bots AND AI answer-engine bots (GPTBot, ClaudeBot, PerplexityBot,
//     Google-Extended, CCBot), disallow the /go/ affiliate-redirect stubs,
//     and point to /sitemap.xml.
// A maintainer only needs to flip PUBLIC_MODE and rebuild.

export const GET: APIRoute = () => {
  const body = PUBLIC_MODE
    ? [
        'User-agent: *',
        'Allow: /',
        'Disallow: /go/',
        '',
        '# AI answer-engine / LLM crawlers — explicitly allowed',
        'User-agent: GPTBot',
        'Allow: /',
        '',
        'User-agent: ClaudeBot',
        'Allow: /',
        '',
        'User-agent: PerplexityBot',
        'Allow: /',
        '',
        'User-agent: Google-Extended',
        'Allow: /',
        '',
        'User-agent: CCBot',
        'Allow: /',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
        '',
      ].join('\n')
    : [
        '# Non-public / internal QA build — do not index or deploy publicly.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
