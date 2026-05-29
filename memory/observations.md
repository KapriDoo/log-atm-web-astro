---
title: Observaciones — optimize-images-webp
created_at: 2026-05-28
status: active
---

## Contexto del Proyecto

**log-atm-web-astro** es un sitio estático Astro 6.1.5 con optimización de performance como requisito crítico (Lighthouse ≥95).

### Stack Relevante para Imágenes

- **Framework:** Astro 6.1.5 (SSG, output: static)
- **Image Tools:** `sharp@^0.34.5` (ya en devDeps)
- **SVG Optimization:** `svgo@^4.0.1`
- **Build Target:** Cloudflare Pages (workers + static assets)
- **Performance Requirement:** Lighthouse ≥95 (todas las páginas)

### Infraestructura Existente

1. **sharp ya está instalado** — dev dependency disponible para image processing
2. **astro.config.mjs existente** — sin integraciones de imagen aún; oportunidad de agregar astro:assets
3. **i18n activa** — 3 locales (es, en, pt); imágenes pueden ser locale-agnostic o con variantes
4. **Vite SSR override** — `noExternal: ['worker-mailer']`; importante para bundling final

## Descubrimientos Iniciales

### Estructuras de Assets

El proyecto define típicamente:
- `src/assets/` — Assets optimizables (images, svgs)
- `public/` — Assets estáticos (favicons, manifest.json; no optimizables vía Astro:assets)
- `src/components/` — Componentes React que puede que usen `<img>` vs. `<Image>`

### Oportunidades de Optimización

1. **WebP/AVIF:** Reducción típica 30-50% en raster vs PNG/JPG
2. **astro:assets:** Soporte nativo en Astro 6 para format negotiation sin plugin externo
3. **<Image /> component:** Lazy loading, responsive sizes, srcset automático
4. **LCP Impact:** Hero images optimizadas → mejora inmediata de Core Web Vitals

### Riesgos Identificados

1. **Breaking Changes:** Si hay rutas hardcoded a assets, migración requiere QA cuidadosa
2. **Navegador Compatibility:** WebP ≥95% en navegadores modernos; AVIF aún en marcha
3. **Build Performance:** sharp + WebP encoding puede agregar 10-30s a build time
4. **i18n Variants:** Si hay imágenes con texto (e.g., banners), puede haber versiones por locale

## Próximos Pasos

1. **sdd-explore:** Auditoría completa de assets, medición de baseline, identificación de críticos
2. **sdd-spec:** Especificación de comportamiento esperado (formatos, fallbacks, responsive)
3. **sdd-design:** Arquitectura de solución (integración astro:assets, componentes wrapper)
4. **sdd-tasks:** Plan de migración incremental (críticos primero, validación per-step)
5. **sdd-apply:** Implementación + QA de formato negotiation y visual parity


## 2026-05-28 | debt-candidate | Assets de industrias sin uso en src/assets (10.5 MB)
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `src/assets/industries/*.jpg` (14 archivos) + `src/lib/industryImages.ts`
**Descripción**: `INDUSTRY_IMAGES` se exporta pero nunca se importa/consume en ningún archivo de `src/`. Los 14 jpg (10.5 MB) duplican las industrias que sí se sirven desde `public/images/industries/`. Inflan el repositorio sin aportar valor.
**Promoción sugerida**: `sdd new cleanup-dead-industry-assets --domain debt`

## 2026-05-28 | debt-candidate | logo.svg duplicado/sin uso en src/assets
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `src/assets/logo.svg`
**Descripción**: No referenciado en `src/`. El logo activo es `public/logo.svg` / `public/logo.png`. Generado por `scripts/png-to-svg.mjs` (one-shot) y aparentemente huérfano.
**Promoción sugerida**: `sdd new cleanup-orphan-logo-svg --domain debt`

## 2026-05-28 | debt-candidate | Videos posiblemente duplicados en public/videos (3.76 MB c/u)
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`
**Descripción**: Ambos archivos pesan exactamente 3,756,542 bytes; posible duplicado. Solo `log-atm-intro.mp4` se referencia (WhyVideoSection). Verificar y eliminar el huérfano para reducir peso del deploy.
**Promoción sugerida**: `sdd new dedupe-public-videos --domain debt`

## 2026-05-28 | architecture | `<Picture>` multi-formato como estándar de imágenes de contenido (optimize-images-webp)
Se adopta `astro:assets` con `<Picture formats={['avif','webp']}>` + fallback JPEG para todas las imágenes de contenido (services/industries/process), moviéndolas a `src/assets/images/` y portando `ImageMetadata` en `src/lib/constants.ts` (campo `img` pasa de `string` a `ImageMetadata` vía imports estáticos directos, sin mapa auxiliar). Hero LCP con `priority`; poster de `<video>` vía `getImage()` (WebP). Extiende ADR-0001 (no lo supersede). Ver ADR-0006.

## 2026-05-28 | observation | Inventario real difiere de la propuesta (optimize-images-webp)
`public/images/` tiene **27** JPEG (no 28): services 11, industries 12, process 4 — coincide con los 27 campos `img:` en `constants.ts` (SERVICES 11, INDUSTRIES 12, HOW_WE_WORK 4). Las páginas `src/pages/[lang]/*.astro` son wrappers (`import RootPage` + `<RootPage lang=...>`), no declaran `<img>` propias → migrar canónicas + secciones cubre es/en/pt. Subrutas `servicios/carga-aerea|carga-maritima.astro` no tienen imágenes.

## 2026-05-28 — optimize-images-webp / sdd-apply

- **Layout del worktree**: el proyecto Astro vive en el subdirectorio anidado `log-atm-web-astro/` dentro del worktree, no en la raíz. Build/npm e imports se ejecutan desde `.../optimize-images-webp/log-atm-web-astro/`. `node_modules` no venía instalado → `npm install` (442 paquetes) antes del primer build.
- **[pre-adr] imageService:'compile' obligatorio con adapter Cloudflare**: design.md §28 asumía que `output:'static'` + Cloudflare adapter emite AVIF/WebP estáticos en build-time automáticamente. NO es así: el adapter Cloudflare por defecto usa `imageService:'cloudflare-binding'` (servicio workerd on-demand), que emite URLs `/_image?href=...&f=avif` resueltas en runtime — NO archivos estáticos. El bloque `image.service` (Sharp) de astro.config queda overrideado por el adapter. Para honrar el diseño (optimización build-time, coste runtime cero, AC de T8 "dist/_astro contiene *.avif/*.webp"), se añadió `imageService:'compile'` al adapter. Verificado: tras el cambio el build emite 32 AVIF + 33 WebP estáticos y las URLs apuntan a `/_astro/*.avif|webp`. Decisión aplicada con default razonable (no había ADR que la cubriera); candidata a documentarse en ADR-0006.
- **`logo.svg` real**: tasks/design indicaban `src/assets/logo.svg`, pero git lo rastreaba en `src/assets/industries/logo.svg`. Eliminado junto con `git rm -r src/assets/industries/`. Ningún `logo.svg` permanece bajo `src/`.
- **Decisión `alt` en cards home**: el markup original de ServicesSection/IndustriesSection usaba `alt=""` (decorativo; el enlace de la card ya nombra el servicio/industria). tasks.md sugería `alt={s.title}`/`alt={ind.name}`. Se preservó `alt=""` en las secciones home para no alterar la semántica de accesibilidad existente. En las páginas (servicios/nosotros/industrias) el original ya tenía `alt` con texto y se respetó.
- **`as const` + ImageMetadata (R1)**: NO se materializó. Los arrays SERVICES/INDUSTRIES/HOW_WE_WORK con `as const` aceptan objetos `ImageMetadata` sin retipar. Build TS verde.
- **Peso (evidencia LCP)**: hero `svc-maritima` original 937 KB JPEG → variante 768w ~64 KB WebP / ~93 KB AVIF (el navegador descarga solo la variante que matchea el viewport, un único formato). Fuentes totales 22 MB → variantes generadas AVIF 4.9 MB + WebP 3.8 MB (por todos los breakpoints; servidas selectivamente).
- **Sin suite de tests**: el proyecto no tiene tests unitarios; la única validación automatizada es el hook `validate-i18n.ts` (corre en build) — pasó verde en ambos builds.
- **WARN pre-existente**: `industrias.astro is dynamically imported ... but also statically imported` — no relacionado con este cambio (wrappers `[lang]`).
