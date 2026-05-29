---
type: proposal
change_name: "optimize-images-webp"
domain: "refactoring"
status: pending-approval
iteration: 1
created: "2026-05-28"
updated: "2026-05-28"
tags: [proposal]
---

# Propuesta: optimize-images-webp

## Intent

El proyecto sirve 21.6 MB de imágenes JPEG crudas desde `public/` sin ninguna optimización de formato ni dimensiones. `astro:assets` no se usa en absoluto. El objetivo es migrar las imágenes raster a WebP+AVIF mediante `astro:assets` (`<Picture>`), moviendo los assets a `src/assets/` para que Sharp los optimice en build-time, reduciendo el peso de página y mejorando LCP y Lighthouse sin coste en runtime (SSG + Cloudflare estático).

## Scope

**Incluye:**
- Mover los 28 JPEG de `public/images/` a `src/assets/images/` (3 grupos: services, industries, process)
- Reemplazar los 27 campos `img:` en `src/lib/constants.ts` de strings `/images/...` por imports de `ImageMetadata`
- Migrar `<img>` a `<Picture formats={['avif','webp']}>` en los componentes/páginas afectados (~9 archivos): `HeroSection.astro`, `IndustriesSection.astro`, `ServicesSection.astro`, `WhyVideoSection.astro`, `servicios.astro`, `nosotros.astro`, `industrias.astro`, y análogos en `src/pages/[lang]/`
- Hero LCP (`svc-maritima.jpeg`, 937 KB) con `fetchpriority="high"` y `loading="eager"` — prioridad máxima
- Poster del video: generar URL WebP única vía `getImage()` (el atributo `poster` de `<video>` no admite `<picture>`)
- Añadir bloque `image:` en `astro.config.mjs` con calidad por defecto (webp: 80, avif: 70) y formatos ['avif', 'webp']
- **Eliminar código muerto**: `src/assets/industries/*.jpg` (14 archivos, 10.5 MB) + `src/lib/industryImages.ts` + `src/assets/logo.svg` (sin referencias)

**Excluye explícitamente:**
- SVG: `public/logo.svg`, `public/logo-white.svg`, `public/favicon.svg`, `public/og-default.svg` — vectoriales, sin optimización aplicable
- `public/favicon.ico` y `public/og-default.svg` — formatos fijos requeridos por spec
- `public/logo.png` (26 KB) — liviano; migración optional de bajo impacto, no prioritaria
- Videos `public/videos/*.mp4` — fuera del alcance de optimización de imágenes
- Migración a SSR/on-demand rendering — se mantiene `output: 'static'`
- CSS `background-image` raster — no existe ninguna en el proyecto (solo un data-URI SVG inline)

## Approach Propuesto

**Approach A completo**: migración a `astro:assets` moviendo todos los assets a `src/assets/`, con eliminación de código muerto en el mismo PR.

Se descartó el **Approach B** (script Sharp + `<picture>` manual) porque no usa `astro:assets` y no resuelve el resize/CLS automático. Se descartó el **Approach C** (incremental por fases) porque la superficie es centralizada (~9 archivos + `constants.ts`) y el estado mixto temporal aumenta riesgo de regresión; hacer todo en un PR es más seguro y verificable.

El patrón es: (1) mover assets → `src/assets/images/{services,industries,process}/`; (2) crear mapas de `ImageMetadata` (patrón ya existente en `industryImages.ts`) reemplazando los strings de `constants.ts`; (3) sustituir `<img>` por `<Picture formats={['avif','webp']} fallbackFormat="jpeg">` con dimensiones inferidas por Sharp (elimina CLS); (4) `getImage()` para el poster del video; (5) eliminar `src/assets/industries/` y `industryImages.ts`.

**WebP vs AVIF+WebP**: se usa `<Picture formats={['avif','webp']}>` (con fallback JPEG implícito). AVIF ofrece ~50% menos peso que JPEG vs WebP ~30%; la cobertura de navegadores modernos (AVIF: 96%+, WebP: 97%+) justifica emitir ambos. `<Picture>` negocia automáticamente vía `<source type="image/avif">` → `<source type="image/webp">` → `<img>` JPEG. Sin riesgo de compatibilidad.

**Código muerto**: se incluye la limpieza en este mismo cambio. Los 10.5 MB de `src/assets/industries/` son duplicados sin consumidor; mantenerlos separados añade deuda sin beneficio y confunde el inventario de assets.

## Impacto Esperado

| Métrica | Antes | Después (estimado) |
|---------|-------|---------------------|
| Peso imágenes (home) | ~5–8 MB | ~0.8–1.5 MB (AVIF/WebP) |
| Hero LCP (`svc-maritima.jpeg`, 937 KB) | ~937 KB | ~150–200 KB WebP |
| Repo size raster | 32.1 MB | ~21.6 MB (elimina 10.5 MB muertos) |
| CLS imágenes | potencial (sin width/height) | 0 (Sharp infiere dimensiones) |
| Lighthouse Performance | desconocido actual | mejora estimada +10–20 pts |

## Esfuerzo Estimado

**L** — 28 archivos a mover, 27 entradas de `constants.ts` a convertir a `ImageMetadata`, ~9 componentes/páginas a refactorizar, 1 caso especial (poster vía `getImage()`), eliminación de código muerto, y verificación de build. La migración es mecánica pero voluminosa y debe validarse sin regresiones visuales.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Regresión visual por CLS o aspect-ratio roto en grids | Media | Verificar CSS `object-fit` en componentes de card; Sharp infiere width/height — aplicar `aspect-ratio` CSS si es necesario |
| Mapa `constants.ts` → `ImageMetadata` incompleto (ruta/key no coincide) | Media | Cubrir las 27 claves explícitamente; el build de Astro falla en import inválido, lo que actúa como test automático |
| Poster de video (`<video poster>`) incompatible con `<picture>` | Baja | Usar `getImage()` para generar una URL WebP estática única — patrón estándar en Astro |
| Adapter Cloudflare incompatible con Sharp en build | Baja | Confirmado: `output: 'static'` → optimización en build-time, no en runtime; adapter no interfiere |
| AVIF no soportado en navegadores muy antiguos | Baja | `<Picture>` emite fallback JPEG automáticamente; cobertura AVIF ≥96% en 2026 |

## Trade-offs

- **A favor**: máxima reducción de peso sin coste runtime, elimina 10.5 MB de código muerto, CLS automático, patrón mantenible a futuro, un solo PR verificable
- **En contra**: refactor voluminoso en un PR (mayor surface de revisión), `constants.ts` pasa de strings simples a imports estáticos (mayor acoplamiento en build, pero es el trade-off correcto para SSG)
