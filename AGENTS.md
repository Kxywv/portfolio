# AI Agent Guide - Portfolio Website

## Project Commands
- Run development server: `npm run dev`
- Build production version: `npm run build`
- Run linting: `npm run lint`

## Project Architecture
- Framework: Next.js 16 (App Router)
- Language: TypeScript 5.7
- Styling: Tailwind CSS v4
- UI Library: shadcn 4.8+
- Icons: lucide-react
- Fonts: Geist Sans + Geist Mono (via `next/font/google`)
- Analytics: @vercel/analytics (production only)

## Directory Structure
- `app/`: Routing, layout, and global styles
  - `layout.tsx` — Root layout with fonts, language provider, cursor, analytics, PageReadyProvider
  - `page.tsx` — Main page assembling all sections
  - `hobby/page.tsx` — Music player and hobby showcase
  - `about/page.tsx` — Skills and experience sections
  - `globals.css` — Tailwind v4 theme, shadcn CSS variables, light/dark tokens
- `components/`: Section components (all client-side)
  - `navbar.tsx` — Fixed navigation with scroll detection and language switcher
  - `hero.tsx` — Hero section with canvas particle animations and profile image
  - `skills.tsx` — Tabbed skill display (Programming / Hard / Soft) with animated bars
  - `projects.tsx` — Project showcase with external screenshot previews
  - `experience.tsx` — Work experience and education timeline with scroll animations
  - `music-player.tsx` — Music player with ShapeBlur visualizer, AudioVisualizer ring, and ElasticSlider volume
  - `ShapeBlur.tsx` — THREE.js WebGL shader component (black shape) with children support
  - `AudioVisualizer.tsx` — SVG-based frequency bar visualizer that rings around ShapeBlur outline
  - `ElasticSlider.tsx` — Framer Motion elastic slider from ReactBits with dynamic volume icons
  - `PageContent.tsx` — Wrapper component that auto-marks page as ready for loading sync
- `components/ui/`: Reusable UI primitives
  - `button.tsx` — shadcn button component
  - `tailed-cursor.tsx` — Custom cursor trail effect (ogl-based)
  - `page-transition.tsx` — Loading overlay with sync to PageReadyContext
- `lib/`: Utilities and context
  - `LanguageContext.tsx` — EN/ID language context with localStorage persistence
  - `PageReadyContext.tsx` — Page loading readiness provider and hooks for sync
  - `utils.ts` — Class merging utility (clsx + tailwind-merge)
- `public/`: Static assets (icons, profile image, project preview, music covers)

## Key Patterns
- All interactive components use `'use client'` directive
- Language support: EN/ID via `LanguageContext`, default is `id` (Indonesian)
- Translations are defined inline per component (no i18n library)
- Animations use `IntersectionObserver` for scroll-triggered effects
- Canvas-based particle effects in hero section (requestAnimationFrame loop)
- `<html>` tag uses `suppressHydrationWarning` for browser extension compatibility
- Icon metadata must always have non-empty `url` values to avoid hydration warnings

## Design Reference
- See `DESIGN.md` for the full visual design system, color palette, typography, and component specs
