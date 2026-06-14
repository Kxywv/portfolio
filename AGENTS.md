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
  - `layout.tsx` — Root layout with fonts, language provider, cursor, analytics
  - `page.tsx` — Main page assembling all sections
  - `globals.css` — Tailwind v4 theme, shadcn CSS variables, light/dark tokens
- `components/`: Section components (all client-side)
  - `navbar.tsx` — Fixed navigation with scroll detection and language switcher
  - `hero.tsx` — Hero section with canvas particle animations and profile image
  - `skills.tsx` — Tabbed skill display (Programming / Hard / Soft) with animated bars
  - `projects.tsx` — Project showcase with external screenshot previews
  - `experience.tsx` — Work experience and education timeline with scroll animations
- `components/ui/`: Reusable UI primitives
  - `button.tsx` — shadcn button component
  - `tailed-cursor.tsx` — Custom cursor trail effect (ogl-based)
- `lib/`: Utilities and context
  - `LanguageContext.tsx` — EN/ID language context with localStorage persistence
  - `utils.ts` — Class merging utility (clsx + tailwind-merge)
- `public/`: Static assets (icons, profile image, project preview)

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
