# Exploración: optimize-images-webp

> Modo: normal · domain: refactoring · fast_path: full
> Raíz de código: `.sdd/worktrees/optimize-images-webp/log-atm-web-astro/`
> Fuentes: no existe capability-spec de imágenes/assets en `memory/specs/`; toda la sección de imágenes se documenta `[fuente: código]`. Las specs vigentes consultadas (`sections`, `internal-page-heroes`, `branding`) describen comportamiento de UI pero no el pipeline de assets.

## Estado Actual

El proyecto **no usa `astro:assets` en absoluto**. No hay un solo `<Image/>`, `<Picture/>`, `getImage()` ni `import 'astro:assets'` en todo `src/` `[fuente: código — grep vacío en src/]`. Todas las imágenes raster se sirven como archivos estáticos crudos desde `public/` mediante etiquetas `<img>` con rutas string hardcodeadas (o referenciadas como string en `src/lib/constants.ts`).

### Inventario de imágenes

**Raster en `public/` (servidas tal cual, 28 archivos, 21.59 MB) `[fuente: código]`**

| Grupo | Ubicación | Archivos | Rango de peso |
|-------|-----------|----------|---------------|
| Servicios | `public/images/services/*.jpeg` | 12 | 755 KB – 1.10 MB |
| Industrias | `public/images/industries/*.jpeg` | 12 | 627 KB – 975 KB |
| Proceso | `public/images/process/*.jpeg` | 4 | 690 KB – 851 KB |

Las más pesadas: `svc-almacenaje.jpeg` (1.10 MB), `svc-medio-oriente.jpeg` (1.04 MB), `svc-desconsolidado.jpeg` (977 KB), `svc-maritima.jpeg` (937 KB — usada como **hero LCP** y poster de video).

**Raster en `src/assets/industries/*.jpg` (14 archivos, 10.53 MB) `[fuente: código]`**
Importadas estáticamente en `src/lib/industryImages.ts` → `INDUSTRY_IMAGES`. **CÓDIGO MUERTO**: `INDUSTRY_IMAGES` se exporta pero **nunca se importa ni consume** en ningún archivo (grep solo encuentra la definición). Son duplicados de las industrias que sí se usan desde `public/images/industries/`. Candidatas a eliminación, no a migración.

**SVG / íconos (5 archivos, 63 KB) `[fuente: código]`**
`public/logo.svg`, `public/logo-white.svg`, `public/favicon.svg`, `public/og-default.svg`, `src/assets/logo.svg`. **NO migrar** (vectoriales). `src/assets/logo.svg` parece sin uso en `src/` (no referenciado).

**Otros formato-fijo `[fuente: código]`**
`public/logo.png` (26 KB, usado en Navbar/Footer/WhyVideo), `public/favicon.ico` (1.1 KB), `public/og-default.svg` (og:image). El logo.png podría migrarse a WebP pero es liviano; favicon/og deben mantener formato fijo.

**Total raster (public + src/assets): 32.11 MB** — peso muy alto, riesgo directo para Lighthouse ≥95 y LCP.

### Cómo se sirven HOY (referencias) `[fuente: código]`

- Hero LCP: `src/components/sections/HeroSection.astro:19` — `<img src="/images/services/svc-maritima.jpeg" fetchpriority="high">`.
- Industrias (home): `src/components/sections/IndustriesSection.astro:40` — `<img src={ind.img} loading="lazy" decoding="async">`, `ind.img` viene de `INDUSTRIES` en `constants.ts`.
- Servicios (home): `src/components/sections/ServicesSection.astro:48` — idem con `s.img`.
- Páginas: `src/pages/servicios.astro` (líneas 83, 115), `src/pages/nosotros.astro:131`, `src/pages/industrias.astro` (69, 105) — `<img>` con string de `constants.ts`.
- Logo: `src/components/ui/Navbar.astro` (33, 72), `src/components/ui/Footer.astro:18`, `src/components/sections/WhyVideoSection.astro:56` — `/logo.png`.
- Video poster: `src/components/sections/WhyVideoSection.astro:33` — `poster="/images/services/svc-maritima.jpeg"`.
- Fuente de verdad de paths: `src/lib/constants.ts` — 27 campos `img:` apuntando a `/images/.../*.jpeg`.
- Las páginas localizadas `src/pages/[lang]/*.astro` **no** declaran `<img>` propias; reutilizan las secciones/componentes, por lo que la superficie de migración está centralizada.
- CSS: única `url()` en `src/styles/sections/cta.css:104` es un data-URI SVG inline (no requiere migración). No hay `background-image` con archivos raster.
- React islands: **no existen archivos `.tsx`/`.jsx`** en `src/` (React está configurado pero no se usa para imágenes).

### Config de Astro relevante `[fuente: código astro.config.mjs]`

- `output: 'static'` (SSG) + `adapter: cloudflare({ platformProxy })`.
- **No hay bloque `image:` configurado** → usa el image service por defecto (Sharp, ya en devDeps `sharp@^0.34.5`).
- Vite: solo `tailwindcss()` plugin + SSR tweaks para `worker-mailer`. Sin config de assets/imágenes.
- Implicación del adapter Cloudflare: con `output: 'static'`, `astro:assets` optimiza **en build-time** con Sharp y emite archivos estáticos → compatible y sin coste en runtime. El adapter Cloudflare NO interfiere con optimización build-time de imágenes locales. (Si fuera SSR/on-demand, Sharp no corre en Workers y requeriría `passthroughImageService` — no es el caso aquí.)
- Scripts existentes que usan Sharp (one-shot, fuera del build): `scripts/generate-favicons.mjs`, `scripts/png-to-svg.mjs`. Confirman que Sharp funciona en el entorno.

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| `astro.config.mjs` | Config Astro/Vite | Añadir bloque `image:` (opcional: formatos/calidad por defecto); verificar service Sharp |
| `src/lib/constants.ts` | Fuente de paths `img:` (27 entradas) | Si se migra a `astro:assets`, cambiar strings de `/images/...` por imports de `ImageMetadata` desde `src/assets/` |
| `src/lib/industryImages.ts` | Mapa `INDUSTRY_IMAGES` (código muerto) | Reutilizable como patrón de import, o eliminar; sus assets en `src/assets/industries` están sin uso |
| `src/components/sections/HeroSection.astro` | Hero LCP (`svc-maritima.jpeg`) | Migrar a `<Image priority>` / `<Picture>`; mayor impacto en LCP |
| `src/components/sections/IndustriesSection.astro` | Grid industrias home | `<img src={ind.img}>` → `<Image>`/`<Picture>` con metadata |
| `src/components/sections/ServicesSection.astro` | Grid servicios home | idem |
| `src/components/sections/WhyVideoSection.astro` | Poster de video + logo | Migrar poster; el `poster=` HTML no acepta `<Picture>` (necesita una URL única WebP/JPEG) |
| `src/pages/servicios.astro`, `nosotros.astro`, `industrias.astro` | Renderizan `<img src={...img}>` | Migrar a componente de imagen |
| `src/components/ui/Navbar.astro`, `Footer.astro` | `/logo.png` | Migración opcional (PNG liviano) |
| `public/images/**` (28 jpeg, 21.6 MB) | Assets crudos | Mover a `src/assets/` para que `astro:assets` los optimice |
| `src/assets/industries/**` (14 jpg, 10.5 MB) | Assets sin uso | Eliminar (limpieza) |

## Approaches Posibles

### Approach A: Migración completa a `astro:assets` (`<Image>`/`<Picture>`) con assets en `src/assets/`
Mover los 28 jpeg de `public/images/` a `src/assets/`, importarlos como `ImageMetadata`, y renderizar con `<Picture formats={['avif','webp']}>` (con fallback jpeg). Hero con `priority`/`fetchpriority`, resto `loading="lazy"`.
- **Pros**: optimización build-time real (WebP/AVIF + resize + width/height automáticos → evita CLS), negociación de formato vía `<source>`, sin coste runtime (SSG + Sharp en build), compatible con Cloudflare. Máximo impacto en peso/LCP/Lighthouse. Aprovecha Sharp ya instalado.
- **Contras**: refactor de la fuente de paths (`constants.ts` pasa de strings a imports — imports dinámicos por key no triviales; suele requerir un mapa estático tipo `industryImages.ts`). Toca ~9 componentes/páginas. `poster` de video y og:image no se benefician de `<Picture>`.
- **Esfuerzo**: L

### Approach B: Conversión de formato sin `astro:assets` (pre-procesar a WebP/AVIF en `public/` + `<picture>` manual)
Script Sharp que genera `.webp`/`.avif` junto a cada `.jpeg` en `public/`, y reemplazar `<img>` por `<picture>` manual con `<source>`.
- **Pros**: cambios localizados, sin reestructurar `constants.ts` (siguen siendo strings); control fino del pipeline; reduce peso.
- **Contras**: no aprovecha `astro:assets` (objetivo explícito del intent); sin resize/width-height automáticos (riesgo CLS persiste); mantenimiento manual de variantes; duplica assets en repo.
- **Esfuerzo**: M

### Approach C: Híbrido incremental — `astro:assets` solo en assets críticos (hero + above-the-fold), resto en fase posterior
Migrar primero Hero + grids de la home (mayor impacto LCP/Lighthouse), dejar páginas internas para una segunda iteración.
- **Pros**: entrega de valor rápida en las páginas que más pesan Lighthouse; menor riesgo por PR; permite validar el patrón antes de generalizar.
- **Contras**: estado mixto temporal (strings + ImageMetadata coexisten); requiere disciplina para no dejar la migración a medias.
- **Esfuerzo**: M (primera tanda) + S (resto)

## Recomendación

**Approach recomendado**: C (híbrido incremental) ejecutando el patrón de A.
**Justificación**: el intent pide explícitamente `astro:assets` (descarta B). El volumen (32 MB raster, 9 archivos tocados) y el objetivo Lighthouse ≥95 favorecen migración incremental para reducir riesgo: priorizar Hero (`svc-maritima.jpeg`, LCP) y grids de la home, luego páginas internas. Se debe (1) mover assets de `public/images` a `src/assets`, (2) sustituir los strings de `constants.ts` por un mapa estático de `ImageMetadata` (reutilizando el patrón ya presente en `industryImages.ts`), (3) usar `<Picture formats={['avif','webp']}>` con dimensiones explícitas, (4) eliminar `src/assets/industries` (código muerto, 10.5 MB), y (5) añadir bloque `image:` en `astro.config.mjs` con calidad/formatos por defecto. Sharp ya está instalado y el adapter Cloudflare con `output: static` no interfiere con la optimización build-time.

## Riesgos Identificados

- **Imágenes en `public/` no optimizables**: `astro:assets` solo procesa lo importado desde `src/`. Riesgo: si se dejan en `public/`, no se optimizan. Mitigación: mover los 28 jpeg a `src/assets/`.
- **`poster` de video y og:image**: `<video poster>` requiere URL única (no `<picture>`); og:image/twitter:image (`og-default.svg`) y favicons deben mantener formato fijo. Mitigación: para el poster, generar una variante WebP única vía `getImage()`; NO tocar og/favicons.
- **`constants.ts` como strings**: la migración a `ImageMetadata` rompe el contrato actual (string path). Imports dinámicos por clave no son soportables directamente → requiere mapa estático. Riesgo de regresión si el mapeo key→asset queda incompleto. Mitigación: cubrir las 27 claves y validar en build.
- **Adapter Cloudflare**: confirmado sin impacto en optimización build-time (SSG + Sharp). Riesgo solo aparecería si el proyecto migrara a SSR/on-demand (no es el caso). Mantener `output: 'static'`.
- **Compatibilidad de formatos**: AVIF/WebP tienen soporte amplio pero `<Picture>` con fallback `jpeg` cubre navegadores antiguos automáticamente. Sin riesgo si se usa `<Picture>` y no `<Image format="avif">` directo.
- **CLS / dimensiones**: los `<img>` actuales en grids no declaran width/height (solo el logo lo hace). `astro:assets` los infiere de la metadata → mejora CLS, pero verificar que el CSS object-fit existente no se rompa.
- **Código muerto**: `src/assets/industries/*` (10.5 MB) y `src/assets/logo.svg` sin uso — debt candidate de limpieza (ver observations.md).
- **Videos**: `public/videos/*.mp4` (2 × 3.76 MB, uno posible duplicado `hero-port.mp4`/`log-atm-intro.mp4`) fuera de alcance de imágenes pero relevantes para peso de página; no abordar en este cambio.
