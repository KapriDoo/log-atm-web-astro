---
type: proposal
change_name: "debt-assets-weight"
domain: "debt"
status: approved
iteration: 1
effort: M
risks:
  - descripcion: "widths/sizes por sí solos no bajan el home a < 2 MB en móvil 390×844 DPR 3: la card a ancho completo pide ~1080w y el ahorro frente a 1376w ronda el 38 %, de modo que el total queda cerca del límite (~2 MB con hero y poster)"
    probabilidad: Media
    mitigacion: "Limitar los widths de card a ~2× su ancho de render (el navegador DPR 3 usa el candidato más grande disponible) y, si el script aún mide ≥ 2 MB, bajar la quality AVIF de las cards; decide la medición, no la intuición"
  - descripcion: "Un sizes que no refleje los breakpoints reales de los grids (services bento, industries) sirve una variante chica y produce pérdida de nitidez visible a DPR 2"
    probabilidad: Baja
    mitigacion: "Derivar sizes de las reglas CSS de cada grid y verificar visualmente las cards a DPR 2 en desktop y móvil antes de cerrar"
  - descripcion: "Editar entradas existentes de memory/observations.md tensiona su naturaleza append-only"
    probabilidad: Baja
    mitigacion: "Anotar en sitio (línea de estado y commit) sin borrar el contenido original; la regla de rechazo de la convención gobierna solo los appends nuevos"
  - descripcion: "Eliminar png-to-svg.mjs y potrace impide regenerar public/logo.svg desde el PNG sin recuperar el script"
    probabilidad: Baja
    mitigacion: "El script queda en el historial git (d5bce4a); public/logo.svg ya está generado y versionado"
created: "2026-10-02"
updated: "2026-10-02"
tags: [proposal]
---

# Propuesta: debt-assets-weight

## Intent

Saldar la deuda de peso de assets: el home sirve ~2,9–3,1 MB de imágenes y la spec vigente `image-multiformat-delivery` pide menos de 2 MB con AVIF. A eso se suman ~7,5 MB de videos duplicados en el deploy y residuos de `dead-code-cleanup` en scripts, docs y `observations.md`. Es la única deuda con impacto directo en el usuario (datos móviles, LCP de secciones).

## Scope

**Incluye:**
- Borrar `public/video/intro.mp4`, la carpeta `public/video/` y `public/videos/hero-port.mp4` (los tres MP4 tienen el mismo md5 `4900f0e5…`); queda `public/videos/log-atm-intro.mp4`, el único referenciado (`WhyVideoSection.astro:44`).
- `widths` + `sizes` en las 7 `<Picture>` de card: `ServicesSection.astro:57`, `IndustriesSection.astro:41`, `servicios.astro:86,115`, `nosotros.astro:104` e `industrias.astro:76`.
- Un script de medición reproducible sobre `dist/client/index.html` que simula la selección de `srcset`/`sizes` AVIF para 1440×900 DPR 1 y 390×844 DPR 3, y suma el peso tras el scroll completo.
- Borrar `scripts/png-to-svg.mjs` y la dependencia `potrace`; actualizar `README.md:85` y `docs/project-brief.md:21,66-74` para que apunten a `public/logo.svg`.
- `observations.md`: marcar como resueltos por `e6ade3a` los candidates de assets de industrias y de `logo.svg`; corregir la ruta errónea de la línea 91, porque git confirma que se borró `src/assets/logo.svg`; cerrar el candidate de videos con este cambio. Todo se ubica por contenido.
- CSS: el zoom en hover aplica solo a `.svc-card:not(.svc-card--static)` (`services.css:69`), en el home y en `/servicios`.

**Excluye explícitamente:**
- La imagen del hero (`eager`, ≤ 237 KB, ya cumple), el poster WebP y la recompresión o re-encode del video.
- `public/logo.svg` y `scripts/generate-favicons.mjs:13` (referencia legítima).
- Presupuestos de peso para páginas distintas del home: las otras páginas reciben `widths`/`sizes` por consistencia, pero sin AC de peso.
- Cambios de formato (AVIF/WebP/JPEG) o de `imageService`.

## Approach Propuesto

Corrección de implementación: el comportamiento lo fija la spec vigente y el código no lo cumple. `sdd-spec` deja `image-multiformat-delivery` (`completed`) intacta y escribe una spec de deuda en `image-optimization-pipeline`, relacionada con esa spec y con `dead-code-cleanup`, con los AC del brief. Las imágenes se corrigen en orden: primero se escribe y ejecuta el script de medición sobre el build actual para fijar el baseline; luego se agregan `widths` (tope ~2× el ancho máximo de render de cada card) y `sizes` derivados de los grids CSS; por último se mide de nuevo. Si el móvil DPR 3 sigue en 2 MB o más, se baja la quality AVIF de las cards hasta cumplir y se verifica la nitidez a DPR 2. Los ítems de videos, residuos, observations y CSS son mecánicos e independientes, y van en commits separados. La verificación de referencias rotas recorre `src/` y `dist/client` con `/usr/bin/grep`.

## Esfuerzo Estimado

Cuatro de los cinco ítems son mecánicos (borrados, una regla CSS, ediciones de texto). El costo se concentra en las imágenes: escribir el script de medición, calcular `sizes` para dos grids distintos más tres páginas, hacer build (el worktree no trae `node_modules`), iterar sobre widths y quality, y verificar a DPR 2. Supera un fix puntual y no implica cambios de arquitectura.

## Riesgos

- Peso móvil DPR 3 al límite: tope de widths a 2× y ajuste de quality guiados por el script.
- Pérdida de nitidez: `sizes` derivados del CSS real y revisión visual a DPR 2.
- Edición de un log append-only: anotación en sitio sin borrar contenido.
- Pérdida del script de vectorización: recuperable desde `d5bce4a`.

## Trade-offs

- **Tope de widths a 2× (recomendado) contra servir hasta 3×**: a favor, cumple el presupuesto de peso en DPR 3 y conserva el AC de nitidez, que se mide a DPR 2. En contra, en pantallas DPR 3 las cards se ven algo menos nítidas de lo que el hardware permite.
- **Borrar `png-to-svg.mjs` + `potrace` (recomendado) contra reapuntar el script a `public/logo.svg`**: a favor, aplica YAGNI (script de un solo uso con su salida ya versionada) y saca una dependencia de producción sin uso. En contra, regenerar el logo exige recuperar el script desde git. La alternativa conserva la herramienta, pero mantiene `potrace` instalado sin consumidor en runtime.
- **Anotar `observations.md` en sitio contra agregar solo entradas de cierre**: a favor, el lector ve el estado real junto al candidate, como pide el AC. En contra, se aparta del modelo puramente append-only.
