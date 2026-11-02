# Aimpi Digital Studio — Agency Site + 6 Industry Demos

React + Vite, one Netlify deployment. Routes: `/`, `/about`, `/services`, `/industries`, `/portfolio`, `/contact`, `/demos/{hotel,restaurant,construction,real-estate,fashion,cleaning}`. Unknown paths show a 404 page.

## Run
`npm install` → `npm run dev` · `npm run build` → `dist/`

## Images (IMPORTANT — not bundled)
No photographs are included. Until you add them, every image slot shows a labelled gradient fallback (no broken images).
1. Choose licensed photos on Unsplash or Pexels (check each licence).
2. Paste each download URL, photographer and source into `images.manifest.json`.
3. `npm i -D sharp && npm run images` → optimised WebP files in `public/images/` plus `CREDITS.txt`.
4. Add `public/images/og.jpg` (1200×630) for social previews.
Slot names (hero, hotel-hero, prop1…) map to pages; subject suggestions: hotel exteriors/rooms/pool; plated food and dining rooms; buildings and sites; apartments and interiors; fashion editorials and fabrics; bright interiors and cleaning.

## Forms (Netlify Forms)
Forms are declared in `index.html` and detected at deploy. Enable Forms in Netlify, then set notification emails under Site → Forms. They do not work in local dev.

## Environment variables (Netlify → Site settings; local `.env`, never commit)
- `VITE_CONTACT_EMAIL` — enables "Or email us" links.
- `VITE_WHATSAPP_NUMBER` — digits with country code; enables WhatsApp buttons. If unset, the UI says it is not configured.
Replace `your-site.netlify.app` in `public/sitemap.xml`, `public/robots.txt` and `index.html` after deploying.

## Deploy
Push to GitHub → Netlify "Import from Git". `netlify.toml` sets build, publish and SPA routing.

## Status
Source was generated without network access: `npm install`, build, Lighthouse and cross-browser tests have NOT been run. Run them before sharing.
