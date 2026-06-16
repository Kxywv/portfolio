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
- Fonts: Poppins (via `next/font/google`)
- Analytics: @vercel/analytics (production only)

## Directory Structure
- `app/`: Routing, layout, and global styles
  - `layout.tsx` — Root layout with fonts, language provider, analytics, and PageReadyProvider
  - `page.tsx` — Main home page (Hero, Projects, Footer)
  - `hobby/page.tsx` — Music player and hobby showcase
  - `about/page.tsx` — Bio, skills, and experience sections
  - `globals.css` — Tailwind v4 theme, shadcn CSS variables, light/dark tokens
- `components/`: Section components (all client-side)
  - `navbar.tsx` — Fixed navigation with scroll detection and language switcher
  - `hero.tsx` — Hero section with profile image, role text type animation, and fluid canvas
  - `skills.tsx` — Tabbed skill display (Programming / Hard / Soft) with animated bars
  - `projects.tsx` — Project showcase with external screenshot previews
  - `experience.tsx` — Work experience and education timeline with scroll animations
  - `music-player.tsx` — Music player with visualizer integration
  - `Particles.tsx` — Reactbits WebGL shader component for background particle effects (used individually in Hero, About, and Hobby pages)
  - `SplitText.tsx` — Text animation component for splitting and animating characters
  - `TextType.tsx` — Typewriter effect text component
  - `AboutBio.tsx` — About me bio section
  - `FadeInOnLoad.tsx` — Wrapper for scroll/load fade animations
  - `PageContent.tsx` — Wrapper component that auto-marks page as ready for loading sync
- `components/ui/`: Reusable UI primitives
  - `button.tsx` — shadcn button component
  - `page-transition.tsx` — Loading overlay with sync to PageReadyContext
- `lib/`: Utilities and context
  - `LanguageContext.tsx` — EN/ID language context with localStorage persistence
  - `PageReadyContext.tsx` — Page loading readiness provider and hooks for sync
  - `utils.ts` — Class merging utility (clsx + tailwind-merge)
- `public/`: Static assets (icons, profile image, project preview, music covers)

## Key Patterns
- **Client Components:** All interactive components must use `'use client'` directive.
- **Language Support:** EN/ID handled via `LanguageContext`. Default is `id` (Indonesian). Translations are defined inline per component.
- **Animations:** 
  - Scroll-triggered effects use `IntersectionObserver` or Framer Motion/custom hooks.
  - Text animations use `SplitText` and `TextType`.
- **Background Effects:** `Particles.tsx` uses WebGL and runs in specific sections (`hero.tsx`, `about/page.tsx`, `hobby/page.tsx`). It tracks mouse movement globally via `window` listeners to allow interactivity even under pointer-events-none wrappers.
- **Hydration:** `<html>` tag uses `suppressHydrationWarning` for browser extension compatibility. Icon metadata uses non-empty `url` values.
- **Responsiveness:** Tailwind utility classes (`md:`, `lg:`) handle mobile-first responsive design.

## Known Issues / Gotchas
- **WebGL Contexts:** React 18+ strict mode double-mounts effects. In custom WebGL components (like Particles), clean DOM before init instead of fully dropping WebGL contexts during effect cleanup to avoid context loss.
- **Text Clipping:** When animating text with transforms (like `SplitText`), ensure parent containers use `overflow-visible` and have slight padding (e.g., `px-2`) so the first/last characters aren't clipped by bounding boxes.
- **Z-Index Stacking:** The particles background has `z-0` and uses `absolute top-0 w-full h-screen` to prevent it from following the scroll. Page content should be wrapped with `position: relative, zIndex: 1` or higher to stay clickable and visible on top of the particles.

## Design Reference
- See `DESIGN.md` (if available) for the full visual design system, color palette, typography, and component specs.
