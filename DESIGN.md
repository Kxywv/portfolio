# Design System - Portfolio Website

## Overview

A minimalist, monochrome portfolio website with a strong focus on typography, clean layouts, and subtle animations. The design alternates between light (white) and dark (zinc-900) sections for visual contrast as the user scrolls.

## Color Palette

### Light Sections (Hero, Projects)
| Token          | Value                | Usage                    |
|----------------|----------------------|--------------------------|
| Background     | `#ffffff` (white)    | Section backgrounds      |
| Text Primary   | `#000000` (black)    | Headings, primary text   |
| Text Secondary | `#374151` (gray-700) | Body text                |
| Text Muted     | `#6b7280` (gray-500) | Labels, secondary text   |
| Border         | `#000000` (black)    | Card borders, buttons    |
| Card BG        | `#f9fafb` (gray-50)  | Project cards            |

### Dark Sections (Skills, Experience)
| Token          | Value                  | Usage                    |
|----------------|------------------------|--------------------------|
| Background     | `#18181b` (zinc-900)   | Section backgrounds      |
| Card BG        | `#27272a` (zinc-800)   | Cards, panels            |
| Text Primary   | `#ffffff` (white)      | Headings, primary text   |
| Text Secondary | `#a1a1aa` (zinc-400)   | Descriptions             |
| Text Muted     | `#71717a` (zinc-500)   | Timestamps, labels       |
| Border         | `#3f3f46` (zinc-700)   | Card borders, dividers   |
| Accent Border  | `#ffffff` (white)      | Active indicators        |

## Typography

### Font Stack
- **Primary**: Geist Sans (`--font-geist-sans`)
- **Monospace**: Geist Mono (`--font-geist-mono`)
- Both loaded via `next/font/google` with CSS variable strategy

### Type Scale
| Element          | Size (mobile / desktop)       | Weight   |
|------------------|-------------------------------|----------|
| Section Heading  | `text-4xl` / `text-5xl`       | `bold`   |
| Hero Title (h1)  | `text-5xl` / `text-6xl`       | `bold`   |
| Hero Subtitle    | `text-2xl` / `text-3xl`       | `bold`   |
| Card Title (h3)  | `text-xl` / `text-2xl`        | `bold`   |
| Body Text        | `text-base`                   | `normal` |
| Small Label      | `text-xs`                     | `semibold` (uppercase) |
| Tab Button       | `text-sm`                     | `semibold` |

## Spacing & Layout

- **Section padding**: `px-6 py-20` (mobile), consistent vertical rhythm
- **Max content width**: `max-w-5xl` (skills/experience), `max-w-7xl` (hero)
- **Card padding**: `p-8 md:p-10` (experience), `p-6 md:p-12` (skills chart)
- **Section gap pattern**: Alternating `min-h-screen` sections
- **Grid**: `grid-cols-2 md:grid-cols-4` for stat cards, `md:grid-cols-2` for experience layout

## Components

### Navbar
- **Position**: Fixed top-center, horizontally centered
- **Shape**: Pill shape (`border-radius: 15px`, `rounded-full` for language switcher)
- **Default state**: `bg-black/10 backdrop-blur-[24px] border-black/20`
- **Scrolled state**: `bg-black/30 backdrop-blur-[24px] border-gray-800`, white text
- **Language switcher**: Fixed top-right corner, pill toggle (EN/ID)

### Hero Section
- **Layout**: Two-column (text left, profile right), stacks on mobile
- **Profile image**: Circular (`rounded-full`), 320px mobile / 384px desktop
- **Social links**: Circular icon buttons with border, hover inverts to black fill
- **Canvas effects**: Horizontal particle trails (dark lines) + fluid particle burst behind profile

### Skills Section
- **Tabs**: Pill-shaped buttons with glassmorphism active state (`bg-white/10 backdrop-blur-md`)
- **Chart**: Horizontal bar chart with animated fill (`scaleX` from 0 to 1, 1.2s ease-out)
- **Layout**: Two-column (chart left, descriptions right) with border divider
- **Stats grid**: 2x2 mobile, 4-column desktop with animated number counters

### Projects Section
- **Card**: Rounded corners (`rounded-2xl`), 2px black border, shadow on hover
- **Screenshot**: External preview via microlink.io API, dark overlay while loading
- **Link button**: Circular chevron button, hover inverts

### Experience Section
- **Layout**: Two-column grid (experience card + education timeline)
- **Timeline**: Vertical animated line with dot indicators, items slide in from right
- **Animation**: IntersectionObserver-triggered, staggered delays (400ms per item)

## Animations

### Hero
- `fadeInUp`: opacity 0 → 1, translateY 30px → 0 (0.8s ease-out)
- `fadeInRight`: opacity 0 → 1, translateX 30px → 0 (0.8s ease-out)
- Staggered delays: 0.2s, 0.4s, 0.5s, 0.6s

### Skills
- `fillProgress`: scaleX 0 → 1 (1.2s ease-out, CSS keyframes)
- Number counter: Animated from 0 to target value (1.2s, cubic ease-out)
- Triggered by IntersectionObserver (threshold: 0.1)

### Experience
- Timeline line: scaleY 0 → 1 (2s ease-out)
- Timeline items: opacity 0 → 1, translateX 20px → 0 (700ms, staggered 400ms)
- Dots: scale 1 → 1.2, border color transition (500ms, staggered)

### Cursor
- Custom trail effect using `ogl` library, black color (`#000000`)
- Spring physics: `baseSpring: 0.1`, `baseFriction: 0.7`, `baseThickness: 14`

## Responsive Breakpoints

Using Tailwind's default breakpoints:
- **Mobile**: Default (< 768px)
- **Tablet/Desktop**: `md:` (≥ 768px)

Key responsive changes at `md:`:
- Hero: Stacked → side-by-side layout
- Skills: Stacked → two-column chart + descriptions
- Experience: Stacked → two-column grid
- Stats grid: 2 columns → 4 columns
- Font sizes scale up one step

## Internationalization

- **Supported languages**: English (`en`), Indonesian (`id`)
- **Default**: Indonesian (`id`)
- **Persistence**: `localStorage` key `portfolio_lang`
- **Implementation**: React Context (`LanguageProvider`), inline translation objects per component
