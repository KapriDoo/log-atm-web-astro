---
status: accepted
date: 2026-05-28
deciders: sdd-design
consulted: stack-existing, astro-docs, ADR-0001
informed: sdd-tasks, sdd-apply, sdd-verify
extends: "[[0001-image-optimization-astro-assets]]"
change_ref: "[[optimize-images-webp]]"
capability: image-pipeline
---

# ADR 0006: `<Picture>` multi-formato como estándar para todas las imágenes de contenido

## Contexto

ADR-0001 estableció `astro:assets` + Sharp + `src/assets/` + imports estáticos como
estándar de optimización de imágenes, pero acotado a un feature concreto (14 imágenes
de industrias, mediante el componente `<Image>` y un mapa auxiliar `industryImages.ts`).

El estado real del proyecto al iniciar este cambio (verificado por código):

- `astro:assets` **no se usa** en ningún componente o página. El único vestigio es
  `src/lib/industryImages.ts` (mapa `INDUSTRY_IMAGES`), que es **código muerto**
  (cero consumidores).
- Las 27 imágenes de contenido (`services`, `industries`, `process`) se sirven como
  JPEG crudos desde `public/images/` vía `<img src="/images/...">`, con los paths
  como strings en `src/lib/constants.ts`. Peso total ~21.6 MB, sin formatos modernos,
  sin `width`/`height` (riesgo CLS), Hero LCP de 937 KB.
- Stack: Astro 6.3.1, sharp 0.34.5, `output: 'static'`, adapter Cloudflare → la
  optimización ocurre en build-time (Sharp), emite estáticos, sin coste runtime.
- Constraint del proyecto: Lighthouse ≥ 95.

Se necesita una decisión que cubra el **catálogo completo de imágenes de contenido**,
no solo un feature, y que defina el componente y los helpers a usar de forma uniforme.

## Decisión

Adoptar como **estándar del proyecto para toda imagen raster de contenido**:

1. **Ubicación**: `src/assets/images/{services,industries,process}/` (procesable por
   `astro:assets`). Espejo de la estructura previa en `public/images/`.
2. **Componente**: `<Picture>` de `astro:assets` con `formats={['avif','webp']}` y
   fallback JPEG automático (negociación vía `<source>`), en lugar de `<Image>`.
   `<Picture>` se elige sobre `<Image>` porque emite múltiples formatos modernos con
   fallback automático para navegadores sin soporte AVIF/WebP, sin lógica manual.
3. **Portador de `ImageMetadata`**: `src/lib/constants.ts` mantiene el campo `img`
   pero cambia su tipo de `string` a `ImageMetadata`, poblado con imports estáticos
   en el propio archivo. Se descarta el patrón de mapa auxiliar key→asset
   (`industryImages.ts`) por añadir indirección propensa a errores; los imports
   directos hacen que el build falle ante cualquier asset inexistente, actuando como
   validación automática.
4. **Above-the-fold / LCP**: usar el atributo `priority` de `<Picture>` (Astro setea
   `loading="eager"`, `decoding="sync"`, `fetchpriority="high"` automáticamente) en
   lugar de atributos manuales.
5. **Responsive (`widths`+`sizes`)**: solo en imágenes fluidas grandes (Hero,
   spotlight). Las cards de grid de tamaño acotado por CSS no generan srcset
   (evita variantes innecesarias en build — YAGNI).
6. **Casos no-HTML**: usar `getImage()` para URLs optimizadas fuera de markup
   declarativo. Caso canónico: el atributo `poster` de `<video>` (no admite
   `<picture>`), donde se genera una variante WebP única.
7. **Config**: bloque `image:` en `astro.config.mjs` con servicio Sharp explícito;
   la calidad se controla con el prop `quality` por componente (no existe un campo
   global de calidad por-formato en la config no-experimental de Astro 6).

## Relación con ADR-0001

Este ADR **extiende**, no supersede, a ADR-0001. ADR-0001 sigue vigente: su decisión
de "astro:assets + Sharp + src/assets + imports estáticos" se mantiene como cimiento.
ADR-0006 (a) generaliza el alcance de "un feature" a "todas las imágenes de
contenido", (b) prefiere `<Picture>` sobre `<Image>` para negociación multi-formato,
y (c) reemplaza el patrón de mapa auxiliar por imports en `constants.ts`.

## Consecuencias

### Positivas

- Optimización build-time real (AVIF/WebP + JPEG fallback) en todo el sitio, sin
  coste runtime; compatible con Cloudflare estático.
- `width`/`height` intrínsecos inyectados por Astro → CLS = 0.
- Reducción de peso esperada de ~5–8 MB a ~0.8–1.5 MB en home; LCP del hero de
  ~937 KB a ~150–200 KB.
- `constants.ts` permanece como única fuente de verdad de datos de negocio + assets.
- Patrón uniforme y mantenible para futuras imágenes.

### Negativas

- `constants.ts` pasa de strings simples a imports estáticos (mayor acoplamiento en
  build-time; es el trade-off correcto para SSG).
- Refactor voluminoso (27 entradas, 7 archivos de render) en un PR.
- Limitación conocida de Astro/Vite: agregar una imagen nueva requiere reiniciar
  `astro dev` para que sea reconocida (heredado de ADR-0001).

## Alternativas consideradas

### A — `<Image>` (un solo formato) en vez de `<Picture>`
Descartada: no negocia múltiples formatos; AVIF directo sin fallback rompería
navegadores antiguos. `<Picture>` da fallback automático sin código manual.

### B — Script Sharp + `<picture>` manual en `public/`
Descartada (Approach B de la propuesta): no usa `astro:assets`, no infiere
`width`/`height` (CLS persiste), duplica assets y exige mantenimiento manual de
variantes.

### C — Mapa auxiliar key→asset (estilo `industryImages.ts`)
Descartada: añade indirección key→asset propensa a "key no coincide" y es el patrón
muerto que este cambio elimina. Imports directos en `constants.ts` son más simples y
auto-validados por el build.

### D — `import.meta.glob` para carga dinámica
Descartada: complica el tipado de `constants.ts` (data plana `as const`) y es
over-engineering para 27 assets fijos (YAGNI).

## Estado

**Accepted** — 2026-05-28

Extiende ADR-0001 (que permanece **accepted**). No supersede ningún ADR.
