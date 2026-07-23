import { defineConfig } from 'astro/config';

// StackCompass — minimal static build. Non-public / internal QA build.
// No adapters, no UI frameworks: plain Astro + vanilla JS islands only.
export default defineConfig({
  site: 'https://example-nonpublic.invalid', // placeholder — set real domain before any public deploy
  compressHTML: true,
  // Build to local disk, then copy into ./dist — the mounted session
  // filesystem rejects unlink() on some intermediate build files, which
  // breaks Astro/Vite's build cache cleanup when outDir lives on the mount.
  outDir: process.env.ASTRO_OUT_DIR ? process.env.ASTRO_OUT_DIR : './dist',
});
