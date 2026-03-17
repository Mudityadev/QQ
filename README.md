# QQ

QQ is an open-source Next.js project that clones the world monitor concept but focuses only on global news, with 2D and 3D world visualization.

## Features

- Aggregates public Google News RSS feeds.
- Supports optional free-tier GNews API (if key provided).
- Unified `/api/news` endpoint with query filters.
- `/news` page for headlines.
- `/globe` page with 2D marker map + 3D globe mode.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## API

`GET /api/news?q=...&region=...&source=all&limit=50`

## Notes

- RSS/API providers may enforce attribution and rate-limit terms.
- Geolocation is inferred heuristically from headline text and can be improved with geocoding.
