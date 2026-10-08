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
updated: "2026-10-08"
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

### Dev Tools
- `sharp@^0.34.5` — Image processing (native binary)
- `svgo@^4.0.1` — SVG optimization
- `tsx@^4.20.6` — TypeScript execution
- `@astrojs/check@^0.9.10` — Type checking (`astro check`)
- `typescript@^6.0.3` — TypeScript compiler for `astro check`
- `playwright-core@^1.63.0` — Browser automation for the a11y audit (browser provided via `CHROME_PATH` or `./chrome`)
- `axe-core@^4.14.0` — Accessibility rules engine for the a11y audit
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
- **Deploy Target:** Cloudflare Workers mediante Workers Builds (integración git: cada push dispara un build; `main` es producción)
- **Build Scripts:** `npm run build` (`astro build`, sin type-check); `npm run build:ci` (`astro check && astro build`); `npm run validate-i18n` (validador i18n vía tsx, ejecución separada); `npm run check-i18n-links` (chequeo de links i18n vía tsx, ejecución separada)
- **Validation:** Custom i18n validator via tsx at build time
- **Container:** `log-atm-web-astro/Containerfile` (Podman rootless, un stage `node:22-slim`, `astro preview` con workerd en el puerto 4321; `.dev.vars` montado en solo lectura al ejecutar); comandos `npm run container:build` / `npm run container:run`
- **Type-check:** `npm run check` (`astro check`), separado de `npm run build`, que no verifica tipos
- **Verification Commands:** `npm run check`; `npm run a11y` (requiere `npm run build` y Chrome vía `CHROME_PATH` o `./chrome`); `npm run validate-i18n`; `npm run check-i18n-links`
- **CI:** sin integración continua; las verificaciones las ejecuta quien desarrolla y `sdd-verify`

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
- **Fuentes de datos:** todo texto visible sale del i18n (`src/i18n/translations/*.json`); `src/lib/constants.ts` conserva solo datos no textuales (ids, imágenes, íconos, tamaños, enlaces y colores), alineados por posición con su lista de texto mediante `tListFor`; la identidad del sitio (nombre, URL, teléfono, email, dirección, coordenadas y redes) vive en `src/lib/site.ts`

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

**Convention:** `constants.ts` es la fuente única de los datos no textuales y de los assets de imagen (sin mapas auxiliares clave→asset); el texto visible sale del i18n y la identidad del sitio, de `src/lib/site.ts`.
