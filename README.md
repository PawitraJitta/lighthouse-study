# Syngenta Digital Lighthouse · Thailand Chapter

A cinematic React + Tailwind presentation site built for the Global Lighthouse Offsite (June 2026).

## Stack
- React 18 + Vite
- Tailwind CSS 3
- Google Fonts: Syne (display) + Space Grotesk (body) + JetBrains Mono

## Local Dev
```bash
npm install
npm run dev
```

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel --prod
```

### Option B — GitHub → Vercel dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com/new → Import repo
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy ✓

## Deploy to GitHub Pages
```bash
npm run build
# Push the /dist folder or use gh-pages package
```

## Project Structure
```
src/
  App.jsx          # All sections (Hero, Stats, Segments, Phases, Fixes, North Star)
  index.css        # Global styles, animations, glass effects
  main.jsx         # Entry point
```
