# Scroll-Driven Hero Section Animation

A premium scroll-driven hero section built with **Next.js**, **Tailwind CSS**, **GSAP** and **ScrollTrigger**.

## Features

- **Scroll-tied car animation** — a top-view car moves across a road as the user scrolls, leaving a coloured trail behind it
- **Letter reveal** — the "WELCOME ITZFIZZ" headline reveals letter-by-letter as the car passes each character
- **Staggered stat boxes** — four impact-metric cards fade in at different scroll positions
- **Sticky viewport** — the hero section is pinned while the animation plays out, then unpins naturally
- **Static export** — pre-rendered HTML ready for GitHub Pages or any static host

## Tech Stack

| Layer       | Technology               |
| ----------- | -------------------------
| Framework   | Next.js 15 (App Router)  |
| Styling     | Tailwind CSS 4           |
| Animation   | GSAP 3 + ScrollTrigger   |
| Language    | TypeScript               |

## Getting Started

```bash
# install dependencies
npm install

# run dev server
npm run dev

# production build (static export → ./out)
npm run build
```

## Deployment

Push to `main` — the included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and deploys it to GitHub Pages automatically.

## Project Structure

```
src/
  app/
    components/
      HeroSection.tsx   ← scroll-driven hero with GSAP
      Footer.tsx         ← simple footer
    globals.css          ← Tailwind imports + custom styles
    layout.tsx           ← root layout
    page.tsx             ← home page
public/
  car-top-view.png       ← car sprite (top view)
```
