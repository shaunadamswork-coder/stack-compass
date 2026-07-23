# Deploying StackCompass

The site is an Astro static site. Output builds to `dist/` and can be hosted free on Cloudflare Pages or Netlify. **Nothing here is live until you do this.**

## Recommended: Cloudflare (registrar + Pages + GitHub, auto-deploy)
1. **Register the domain** at Cloudflare Registrar (at-cost, free WHOIS privacy). Use a brand-neutral name (`stackcompass.com` or a variant) — do NOT put a vendor name (getresponse, gohighlevel, etc.) in the domain; every program bans it.
2. **Push this `50_site/` folder to a new GitHub repo:**
   ```bash
   cd 50_site
   git init && git add . && git commit -m "StackCompass site v1"
   git branch -M main
   git remote add origin https://github.com/<you>/stackcompass.git
   git push -u origin main
   ```
   (`.gitignore` already excludes `node_modules`, `dist`, and secrets.)
3. **Cloudflare dashboard → Pages → Connect to Git → select the repo.** Build settings:
   - Framework preset: **Astro**
   - Build command: **`npm run build`**
   - Output directory: **`dist`**
   - Node version: **22** (set env var `NODE_VERSION=22` if needed)
4. Add your domain to the Pages project (Custom domains) — DNS auto-configures since the registrar is Cloudflare. HTTPS is automatic.
5. Every `git push` now auto-deploys.

## Alternative A — Netlify (Git, auto-deploy)
Same as above but connect the repo at app.netlify.com; `netlify.toml` in this folder already sets build command + publish dir.

## Alternative B — Instant preview, no Git (2 minutes)
`npm run build`, then drag the resulting `dist/` folder onto **app.netlify.com/drop**. Live on a free `*.netlify.app` URL. (Stays `noindex` — fine for a private look.)

## GO-LIVE checklist (do these when the domain + affiliate links exist)
1. In `src/config.ts`: set `SITE_URL` to your real domain, and flip **`PUBLIC_MODE = true`** (this removes `noindex`, emits the AI-crawler-friendly `robots.txt`, and enables the sitemap).
2. In `src/data/go-links.json`: replace each `PENDING_AFFILIATE_LINK` with the real affiliate/tracking link (never paste logins).
3. `npm run build` → deploy (push, or drag `dist/`).
4. Create a GA4 property + verify the site in Google Search Console; then we wire those into the dashboard via Supermetrics.
5. Final rendered-mobile QA (see `00_governance/RUNBOOK.md` R-5).

## Notes
- `PUBLIC_MODE=false` (current) keeps the site fully non-indexable — safe to deploy a private preview anytime.
- Secrets/affiliate logins never go in the repo. Only the affiliate *destination links* live in `go-links.json`, which is public by nature (they're the same links visitors follow).
