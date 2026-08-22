<div align="center">

<img src="public/logo-200.png" alt="Ray Chan Tattoo" height="88" />

# Ray Chan Tattoo

*Portfolio and booking site for a Japanese tattoo artist*

[![Live site](https://img.shields.io/badge/Live-raychantattoo.com-A52734?style=flat-square)](https://www.raychantattoo.com)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[Overview](#overview) • [Content workflow](#content-workflow) • [Getting started](#getting-started) • [Design](#design)

</div>

A single page site for a custom Japanese tattoo artist: portfolio, process, artist story, and
a two step booking flow. Built so the artist can add work without touching code or waiting on
a developer.

## Overview

A tattoo portfolio lives or dies on its images, and the client updates them constantly. The
interesting constraint here was not the visuals but the workflow: the artist needed to publish
new pieces from a phone, and the site still had to load fast on mobile data.

- **Portfolio managed from a Google Sheet** — no CMS, no admin login, no monthly cost
- **Images optimized at build time** rather than fetched full resolution at runtime
- **Booking without a backend** — Google Calendar for scheduling, Google Forms for details
- **Filterable masonry gallery** with a keyboard navigable lightbox

## Content workflow

The artist owns two tabs in a Google Sheet, `Photos` and `Categories`, published as CSV. A
build step turns that into a static bundle.

```
Google Sheet  ──►  npm run fetch:portfolio  ──►  public/portfolio/*.webp
(artist edits)     download + resize (sharp)     src/data/portfolio.json
                                                        │
                                                        ▼
                                                 served from the CDN
```

`usePortfolioData` prefers the generated manifest and only falls back to reading the live
Sheet if the manifest is empty. That keeps the gallery instant in production while leaving a
zero build path for local experiments.

> [!NOTE]
> Full resolution Google Drive images were slow enough on mobile to be the site's worst
> bottleneck. Moving the fetch to build time and shipping pre-sized WebP was the single
> largest performance win.

## Getting started

**Prerequisites:** Node.js 20+

```bash
git clone https://github.com/nicholaschan004/RayChanTattoo.git
cd RayChanTattoo
npm install
cp .env.example .env.local
npm run dev
```

The site runs without any environment variables — sections that need them show placeholder
states — so you can start immediately and wire the integrations when you need them.

| Variable | Purpose |
| --- | --- |
| `VITE_SHEETS_PHOTOS_CSV` | Published CSV of the `Photos` tab |
| `VITE_SHEETS_CATEGORIES_CSV` | Published CSV of the `Categories` tab |
| `VITE_GOOGLE_CALENDAR_URL` | Appointment schedule embedded in the booking section |
| `VITE_GOOGLE_FORM_URL` | Form for tattoo details and reference photos |

`.env.example` documents how to produce each link. Once the Sheet URLs are set:

```bash
npm run fetch:portfolio   # pull + optimize images, regenerate the manifest
npm run build
```

> [!TIP]
> `fetch:portfolio` also runs as part of the deploy, so a fresh build always picks up whatever
> the artist has added to the Sheet.

## Design

Japanese inspired, built around restraint: obsidian and deep crimson, kanji used as texture
rather than decoration, and motion that suggests ink rather than announcing itself.

- **Scroll driven warmth** — the page background interpolates from cold obsidian to a warmer
  charcoal as you move from viewing the work toward booking it
- **Kanji section markers** — 作品集, 工程, 芸術家, 予約 at low opacity behind each section
- **Ink motion** — `inkFlow`, `smokeRise` and `crimsonPulse` keyframes drive the ambient
  animation; Framer Motion handles entrances
- **Typography** — Syne, Inter, Noto Serif JP and Cormorant Garamond

```
src/
  pages/Home.jsx        composes every section, owns the scroll gradient
  components/           Hero, Portfolio, Process, Artist, Booking, Footer
  components/ui/        shared primitives
  hooks/                usePortfolioData, useSiteSettings
  lib/sheets.js         CSV parsing and Drive URL conversion
scripts/
  fetch-portfolio.mjs   Sheet to optimized WebP + manifest
```
