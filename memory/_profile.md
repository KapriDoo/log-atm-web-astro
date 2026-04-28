---
type: project-profile
updated: "2026-04-26"
---

# log-atm-web-astro

## Stack

- **Lenguaje**: TypeScript (strict mode, tsconfig extends astro/tsconfigs/strict)
- **Framework**: Astro 6.1.5 + React 19.2.5 (islas interactivas)
- **Test runner**: — (no configurado)
- **Linter**: — (no detectado)
- **Build/bundler**: Vite + Tailwind CSS v4 via @tailwindcss/vite
- **CI**: — (no detectado)

## Dependencias clave

- `@astrojs/react` — Integración React para islas
- `@astrojs/sitemap` — Sitemap automático
- `tailwindcss` v4 + `@tailwindcss/vite` — Framework de estilos
- `gsap` + `motion` (Framer Motion) — Animaciones
- `astro-icon` + `@iconify-json/lucide` — Iconos
- `@fontsource/inter` + `@fontsource/outfit` — Fuentes self-hosted
- `sharp` — Optimización de imágenes
- `potrace` — Conversión PNG a SVG

## Convenciones

- **Commits**: Conventional Commits
- **Branches**: `feature/` para cambios nuevos
- **PR base**: main

## Notas del proyecto

- Proyecto de sitio web corporativo para LOG ATM (logística aérea y marítima)
- Stack: Astro 6.1.5 + Tailwind v4 + React (islas) + GSAP + Framer Motion
- Diseño: "Corporativo confiable con calidez humana"
- Color de marca: #4A7BB5 (azul plano)
- Estructura: `src/{layouts,components/{ui,islands},pages,content,styles,assets}`
- Tailwind v4 usa `@theme` en `styles/global.css` para tokens
- Performance objetivo: Lighthouse ≥ 95
- Accesibilidad: WCAG AA mínimo
