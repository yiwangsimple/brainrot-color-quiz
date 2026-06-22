# Brainrot Color Quiz

Low-cost static MVP following the fast new-keyword playbook:

1. Replace the target keyword and fictional prompt data in `app.js`.
2. Replace `https://brainrot-color-quiz.pages.dev/` in `index.html`, `robots.txt`, and `sitemap.xml` when moving to a custom domain.
3. Deploy only the publishable static files to Cloudflare Pages, Netlify, Vercel, or GitHub Pages.
4. Add GA4, Google Search Console, Bing, and Yandex verification snippets to `index.html` when those accounts are ready.
5. Submit `sitemap.xml` to Google Search Console, Bing Webmaster Tools, and Yandex Webmaster.
6. Watch GSC queries before adding typo pages, language folders, or prompt-specific pages.

The leaderboard and wall are local-only interactive elements. They are intentionally kept out of the static SEO copy to reduce UGC keyword pollution.

Publishable files:

- `.nojekyll`
- `_headers`
- `_redirects`
- `app.js`
- `favicon.svg`
- `icon-192.png`
- `icon-512.png`
- `index.html`
- `og-image.png`
- `og-image.svg`
- `robots.txt`
- `site.webmanifest`
- `sitemap.xml`
- `styles.css`

Do not publish development docs such as `README.md`, `DEPLOY.md`, `.git`, or local notes as public site assets.
