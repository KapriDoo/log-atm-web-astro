---
type: project-profile
name: log-atm-web-astro
description: "Sitio web de servicios de logística aérea y marítima con soporte multiidioma"
domain: web
stack_type: astro-fullstack
version: 0.0.1
node_engine: ">=22.12.0"
status: active
created: "2026-05-19"
updated: "2026-05-28"
---

## Stack

**Framework:** Astro 6.1.5
**Build Tool:** Vite
**UI Framework:** React (component islands)
**Styling:** Tailwind CSS v4 + @tailwindcss/vite
**Backend:** Cloudflare Workers (via @astrojs/cloudflare)
**Internationalization:** Astro i18n (es, en, pt)
**Animation:** GSAP 3.14 + Framer Motion 12.38

## Key Dependencies

### Core
- `astro@^6.1.5` — SSG/SSR framework
- `react@^19.2.5` — React islands for interactive components
- `react-dom@^19.2.5` — DOM rendering
- `tailwindcss@^4.2.2` — CSS utility framework
- `@tailwindcss/vite@^4.2.2` — Vite integration

### Integrations
- `@astrojs/react@^5.0.3` — React component support
- `@astrojs/cloudflare@^13.5.0` — Cloudflare Workers adapter
- `@astrojs/sitemap@^3.7.2` — Sitemap generation

### Animation & Motion
- `gsap@^3.14.2` — GSAP library
- `motion@^12.38.0` — Framer Motion
- `potrace@^2.1.8` — Vectorization utility

### Dev Tools
- `sharp@^0.34.5` — Image processing (native binary)
- `svgo@^4.0.1` — SVG optimization
- `tsx@^4.20.6` — TypeScript execution
- `@types/react@^19.2.14` — React types
- `@types/react-dom@^19.2.3` — React DOM types

### Fonts & Icons
- `@fontsource/jetbrains-mono@^5.2.8` — JetBrains Mono font
- `@fontsource/inter@^5.2.8` — Inter font
- `@fontsource/outfit@^5.2.8` — Outfit font
- `@iconify-json/lucide@^1.2.102` — Lucide icons

### Infrastructure
- `worker-mailer@^1.2.1` — Mailer for Workers
- `wrangler` — Cloudflare CLI (via package-lock)

## Build & Deploy

- **Output:** `output: 'static'` (SSG)
- **Deploy Target:** Cloudflare Pages
- **Build Scripts:** `npm run build` (Astro build + i18n validation)
- **Validation:** Custom i18n validator via tsx at build time

## Design System & Branding

**AFP Modelo Branding:**
- Color Primario: #4A7BB5
- CTA Color: #3EB978
- Design Tokens: Ver `DESIGN.md`
- Component Library: Via `afp-modelo-components` skill

## Conventions

- **Language:** Spanish (es), English (en), Portuguese (pt)
- **Commits:** English + Conventional Commits
- **Code Comments:** Spanish
- **Performance:** Lighthouse ≥ 95 (all pages)
- **Accessibility:** WCAG AA minimum
- **Animations:** `prefers-reduced-motion` required

## Notable Implementation Details

1. **i18n:** Custom fallback at key-level (not route-level fallback) to avoid collisions with `src/pages/[lang]/*.astro`
2. **Worker Environment:** Vite `noExternal: ['worker-mailer']` + workerd resolution conditions
3. **Image Handling:** Uses `sharp` for optimization (image pipeline candidate)
4. **SVG Optimization:** `svgo` available for SVG assets

## Image Pipeline (Current)

- Static images: `astro:assets` with `<Picture>` (AVIF/WebP + JPEG fallback) — build-time optimization via Sharp
- Image assets location: `src/assets/images/{services,industries,process}/` (imported as `ImageMetadata`)
- SVG optimization: via svgo CLI (manual)
- Raster optimization: Sharp (integrated via `imageService: 'compile'` for Cloudflare adapter)
- Hero LCP: `priority` prop on `<Picture>` (`fetchpriority="high"`, `loading="eager"`, `decoding="sync"`)
- Poster generation (video): `getImage()` from `astro:assets`

**Convention:** `constants.ts` is the single source of truth for content data + image assets (no auxiliary key→asset maps).
