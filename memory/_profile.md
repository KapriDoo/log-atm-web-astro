---
name: "log-atm-web-astro"
description: "Sitio web de servicios de logística aérea y marítima con soporte multiidioma"
created: "2026-05-19"
updated: "2026-05-26"
---

## Estructura del Repositorio

> **Estructura anidada**: el proyecto Astro NO vive en la raíz del repo.
> El repo contiene un worktree padre con configuración Docker/nginx; el proyecto Astro
> está en el subdirectorio `log-atm-web-astro/`.

```
repo-root/
├── docker-compose.yml
├── fix-wsl2-port.bat
├── README.md
├── skills-lock.json
└── log-atm-web-astro/       ← raíz del proyecto Astro
    ├── package.json
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── wrangler.toml
    ├── Dockerfile
    ├── nginx.conf / default.conf
    └── src/
```

**Al referenciar rutas, siempre prefijamos con `log-atm-web-astro/` desde la raíz del worktree.**

## Stack

- **Framework**: Astro 6.3.1 (static output) — actualizado de 6.1.5
- **Styling**: Tailwind CSS v4.2.2 + Tailwind Vite plugin
- **JavaScript**: TypeScript (strict mode)
- **Components**: React 19.2.5 (islas reactivas)
- **Animaciones**: GSAP 3.14.2 ✅, Motion (Framer) 12.38.0
- **Deploy**: Cloudflare Pages (adapter @astrojs/cloudflare ^13.5.0)
- **Package manager**: npm (Node >=22.12.0 / actual: v24.15.0)
- **Icon system**: astro-icon 1.1.5 con @iconify-json/lucide
- **Sitemap**: @astrojs/sitemap 3.7.2
- **Build tool**: Astro CLI (Vite internamente)
- **Fonts**: @fontsource/jetbrains-mono, @fontsource/inter, @fontsource/outfit
- **Test runner**: No configurado
- **Linter**: No configurado (.eslintrc ausente)
- **CI**: No detectado (.github/workflows ausente)

## Estructura src/

```
src/
├── assets/          # Imágenes, SVGs
├── components/      # Componentes reutilizables (React + Astro)
│   ├── sections/    # HeroSection, etc.
│   └── ui/          # LanguageSelector, etc.
├── i18n/            # Traducciones (es, en, pt) y utilidades
├── layouts/         # BaseLayout.astro (layout principal)
├── lib/             # Utilidades y helpers
├── pages/           # Rutas Astro con i18n ([lang]/) + cotizar, contacto, etc.
├── scripts/         # wizard.ts, scroll-animations.ts, gsap-*.ts
├── styles/          # Estilos globales y por página
└── types/           # TypeScript types
```

## Convenciones

- **i18n**: Tres idiomas soportados (es, en, pt) con routing prefixed en idiomas no defecto, fallback manual por clave
- **Componentes**: Props over inheritance, composición
- **Naming**: kebab-case para archivos, PascalCase para componentes React
- **Animaciones**: Siempre respetar `prefers-reduced-motion`
- **Performance**: Lighthouse ≥95 en todas las páginas
- **Accesibilidad**: WCAG AA mínimo
- **Validación**: i18n validator en build hook via `tsx` para evitar colisiones

## Patrón de Inicialización de Scripts — BUG SITE-WIDE (detectado 2026-05-26)

> **CRÍTICO**: todos los scripts del sitio usan `document.addEventListener('astro:page-load', ...)`.
> Este evento SÓLO lo dispara `ClientRouter` (View Transitions), que **no está montado**
> en `BaseLayout.astro`. En carga directa de URL, el evento nunca se dispara — los scripts
> nunca inicializan. Bug PREEXISTENTE en `main`, no regresión del refactor de iconos.

Archivos afectados por el bug:
- `src/scripts/wizard.ts` — wizard de cotizar (línea 61)
- `src/scripts/scroll-animations.ts` (línea 149)
- `src/components/sections/HeroSection.astro` (línea 78)
- `src/pages/contacto.astro` (línea 197)
- `src/pages/servicios.astro` (línea 180)
- `src/pages/nosotros.astro` (línea 173)
- `src/pages/industrias.astro` (líneas 189, 215)

Patrón funcional (referencia): `src/components/ui/LanguageSelector.astro` usa `DOMContentLoaded` y funciona.

## Observaciones

1. **GSAP ya presente**: El proyecto tiene `gsap@3.14.2` y `motion@12.38.0` como deps. No hay restricciones para añadir efectos GSAP.
2. **Build hooks**: El proyecto usa hooks Astro (`astro:build:start`) para validación i18n con `tsx` subprocess. Útil para pre-builds.
3. **Cloudflare Pages**: Output es static, deployado en Cloudflare. No hay SSR.
4. **Multi-idioma**: Rutas i18n implementadas sin fallback automático (por diseño, para evitar colisiones). Las claves en `src/i18n/` deben estar en paridad.
5. **Componentes React**: Usados como islas reactivas (no full SPA). Mejor para performance.
6. **Tailwind v4**: Configuración vía Vite plugin, no archivo config tradicional.
7. **Sitemap automático**: Generado con soporte i18n.
8. **`<ClientRouter />` ausente**: No existe en `BaseLayout.astro` ni en ningún layout. La decisión de montarlo o no es arquitectónica (scope site-wide vs. fix localizado).
