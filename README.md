# William Hale — Interstellar Portfolio (GitHub Pages Edition)

Static, client-only portfolio built with **Vite 6 + React 19 + TypeScript**.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

Build output is generated in:
- `dist/`

## GitHub Pages deploy (manual)
```bash
npm run deploy
```

This uses `gh-pages` to publish `dist/` to the `gh-pages` branch.

## Optional GitHub Actions deploy (on push to main)
Use `.github/workflows/deploy.yml` included in this repo.

## Notes
- Contact form uses Formspree endpoint placeholder in `src/sections/ContactSection.tsx`.
- Replace `https://formspree.io/f/your-form-id` with your real Formspree form ID.
