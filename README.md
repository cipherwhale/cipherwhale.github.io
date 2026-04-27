# Hello World Page

This repo now serves a simple static `index.html`.

## Deploy on GitHub Pages (no build step)
1. Push this branch to GitHub.
2. In GitHub repo settings, open **Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch: `main`, folder: `/ (root)`.
5. Save.

GitHub Pages will publish `index.html` directly.


## Quick sanity check
```bash
npm run validate:json
```
Use this before `npm ci` if GitHub Actions reports an EJSONPARSE error.
