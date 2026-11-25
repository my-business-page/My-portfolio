# Mad Web Studios® — portfolio

A static, responsive studio portfolio built with semantic HTML, modular CSS and vanilla JavaScript. No build step or backend is required.

## Structure

- `index.html` — page structure, metadata and accessible landmarks
- `assets/css/` — design tokens, base styles, layout, components and motion
- `assets/js/` — central configuration, reveal observer, independent social metric dials, navigation and effects

## Deploy with GitHub Pages

1. Open repository **Settings → Pages**.
2. Under Build and deployment, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then Save.
4. Wait for the Pages deployment to finish.

## Before public launch

- Replace `hello@yourstudio.com` in `assets/js/config.js` with the studio's real contact email.
- Add the Snapchat, Instagram and TikTok usernames in the `social` object in `assets/js/config.js` (without the @ symbol).
- Confirm the monthly view figures in each platform's analytics before presenting them as verified results. The current values are the figures supplied for this portfolio, not independently verified by this code.
- Replace concept work with approved client work when available. Concept visuals are labelled as concepts in the page.

## Editing the social metrics

Edit the `metrics` values in `assets/js/config.js` and the matching `data-value`, labels and displayed figures in `index.html` together so the animated dial and visible number remain consistent.

## Technology

HTML5, CSS3, JavaScript (ES6), SVG, JSON-style configuration and an inline SVG noise texture. Uses Google Fonts when a network connection is available and falls back to system fonts.
