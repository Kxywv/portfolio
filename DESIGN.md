# Portfolio Website Design System

## Typography
- **Primary Font:** Poppins
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)
- **Styling:**
  - Headings: Bold tracking-tight (e.g. `text-5xl font-bold tracking-tight`)
  - Subheadings: Medium/Semi-bold tracking-wide (e.g. `text-2xl font-semibold tracking-wide`)
  - Body Text: Regular leading-relaxed (e.g. `text-base leading-relaxed text-gray-600`)

## Color Palette
### Light Mode (Default)
- **Background:** White (`bg-white` or `#ffffff`)
- **Text (Primary):** Black (`text-black` or `#000000`)
- **Text (Secondary):** Gray 600-700 (`text-gray-600` or `text-gray-700`)
- **Text (Muted):** Gray 400-500 (`text-gray-400` or `text-gray-500`)
- **Accents/Borders:** Gray 200 (`border-gray-200`)
- **Card Backgrounds:** Gray 50 (`bg-gray-50`)
- **Navbar/Overlay Backgrounds:** White/Black with opacity + backdrop-blur

### Dark Mode (Supported via Tailwind)
- **Background:** Black (`bg-black` or `#000000`)
- **Text (Primary):** White (`text-white` or `#ffffff`)
- **Text (Secondary):** Zinc 300-400 (`text-zinc-300` or `text-zinc-400`)
- **Accents/Borders:** Zinc 800 (`border-zinc-800`)

## Layout & Spacing
- **Container Max-Width:**
  - Default: `max-w-7xl`
  - Forms/Bio: `max-w-4xl`
  - Narrow Content: `max-w-2xl`
- **Section Padding:**
  - Desktop: `py-20` to `py-24`
  - Mobile: `py-16` to `py-20`
  - Horizontal: `px-6` (default for mobile + desktop edge safety)
- **Spacing Scale:**
  - Standard Gap: `gap-8` to `gap-12`
  - Bottom Margin: `mb-4`, `mb-8`, `mb-12`

## UI Elements
### Buttons & Links
- **Primary Action:** Solid black/white background with inverted text (`bg-black text-white hover:bg-gray-800`)
- **Secondary Action:** Outlined (`border-2 border-black hover:bg-black hover:text-white`)
- **Nav Links:** Animated underline effect (scale-x on active/hover)
- **Border Radius:**
  - Buttons: `rounded-full` or `rounded-lg`
  - Cards: `rounded-xl` or `rounded-2xl`

### Animations & Transitions
- **Fade In:** Elements fade in and slightly slide up on scroll (`animate-fade-in-up`)
- **Hover Effects:** Scale up slightly (`hover:scale-105`) or shadow increase (`hover:shadow-lg`)
- **Durations:** `duration-200` to `duration-500` for smooth interactions
- **Easing:** Standard Tailwind easing (`ease-out`, `ease-in-out`)
- **Text Animation:** Character-by-character appearance with `transform` and `opacity` (used in `SplitText`)

## Visual Effects
- **Section Backgrounds:** Interactive WebGL particles (reacts to mouse movement, placed as absolute backgrounds on Hero, About, and Hobby sections)
- **Page Transitions:** Hatch loading animation on full white overlay (`z-[9999]`)
- **Glassmorphism:** Navigation uses semi-transparent backgrounds with `backdrop-blur-[24px]`

## Breakpoints (Tailwind Default)
- `sm`: 640px
- `md`: 768px (Used heavily for Mobile vs Desktop layout switches)
- `lg`: 1024px
- `xl`: 1280px 
- `2xl`: 1536px
