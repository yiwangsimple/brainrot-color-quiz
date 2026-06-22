# Deploy Brainrot Color Quiz

This is a static site. There is no build step.

## Before publishing

1. Pick the production URL:
   - Cloudflare Pages preview: `https://brainrot-color-quiz.pages.dev/`
   - GitHub Pages: `https://yiwangsimple.github.io/brainrot-color-quiz/`
   - Custom domain: `https://brainrotcolorquiz.com/`
2. Replace every `https://yiwangsimple.github.io/brainrot-color-quiz/` value in these files when moving to a custom domain:
   - `index.html`
   - `robots.txt`
   - `sitemap.xml`
3. Replace the commented verification placeholders in `index.html`:
   - Google Search Console
   - Bing Webmaster Tools
   - Yandex Webmaster
   - GA4 measurement ID
4. Confirm the homepage, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, and `/og-image.svg` are reachable after deployment.

## Recommended path: Cloudflare Pages

1. Create a new Cloudflare Pages project named `brainrot-color-quiz`.
2. Upload this folder directly or connect a GitHub repo.
3. Build command: leave empty.
4. Output directory: `/` if uploading this folder, or `brainrot-color-quiz` if deploying from the workspace root.
5. After the first deploy, update canonical URLs to the final Pages URL or custom domain, then redeploy.

## Backup path: GitHub Pages

1. Put this folder in its own public GitHub repository.
2. Keep `.nojekyll` in the repository root.
3. Enable Pages from the repository's default branch and root folder.
4. After the Pages URL is live, update canonical URLs and redeploy.

## Post-launch SEO checks

1. Open the deployed page on desktop and mobile.
2. Submit `sitemap.xml` to Google Search Console, Bing Webmaster Tools, and Yandex Webmaster.
3. Request indexing for the homepage.
4. Watch queries in GSC before adding typo pages, language folders, daily archives, or prompt pages.
