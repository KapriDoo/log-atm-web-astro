---
name: "log-atm-web-astro"
description: "Sitio web de servicios de logística aérea y marítima con soporte multiidioma"
created: "2026-05-19"
updated: "2026-05-20"
---

## Stack

- **Framework**: Astro 6.1.5 (static output)
- **Styling**: Tailwind CSS v4.2.2 + Tailwind Vite plugin
- **JavaScript**: TypeScript (strict mode)
- **Components**: React 19.2.5 (islas reactivas)
- **Animaciones**: GSAP 3.14.2 ✅, Framer Motion 12.38.0
- **Deploy**: Cloudflare Pages (adapter @astrojs/cloudflare ^13.5.0)
- **Package manager**: npm (Node >=22.12.0)
- **Icon system**: astro-icon con Lucide
- **Sitemap**: @astrojs/sitemap 3.7.2
- **Build tool**: Astro CLI
- **Fonts**: @fontsource/jetbrains-mono, @fontsource/inter, @fontsource/outfit

## Estructura

```
src/
├── assets/          # Imágenes, SVGs
├── components/      # Componentes reutilizables (React + Astro)
├── i18n/            # Traducciones (es, en, pt) y utilidades
├── layouts/         # Layouts base
├── lib/             # Utilidades y helpers
├── pages/           # Rutas Astro con i18n ([lang]/)
├── scripts/         # Scripts Node (validación i18n)
├── sections/        # Secciones de página (componentes grandes)
└── styles/          # Estilos globales
```

## Convenciones

- **i18n**: Tres idiomas soportados (es, en, pt) con routing prefixed en idiomas no defecto, fallback manual por clave
- **Componentes**: Props over inheritance, composición
- **Naming**: kebab-case para archivos, PascalCase para componentes React
- **Animaciones**: Siempre respetar `prefers-reduced-motion`
- **Performance**: Lighthouse ≥95 en todas las páginas
- **Accesibilidad**: WCAG AA mínimo
- **Validación**: i18n validator en build hook via `tsx` para evitar colisiones

## Observaciones

1. **GSAP ya presente**: El proyecto tiene `gsap@3.14.2` y `motion@12.38.0` como deps. No hay restricciones para añadir efectos GSAP.
2. **Build hooks**: El proyecto usa hooks Astro (`astro:build:start`) para validación i18n con `tsx` subprocess. Útil para pre-builds.
3. **Cloudflare Pages**: Output es static, deployado en Cloudflare. No hay SSR.
4. **Multi-idioma**: Rutas i18n implementadas sin fallback automático (por diseño, para evitar colisiones). Las claves en `src/i18n/` deben estar en paridad.
5. **Componentes React**: Usados como islas reactivas (no full SPA). Mejor para performance.
6. **Tailwind v4**: Configuración vía Vite plugin, no archivo config tradicional.
7. **Sitemap automático**: Generado con soporte i18n.
