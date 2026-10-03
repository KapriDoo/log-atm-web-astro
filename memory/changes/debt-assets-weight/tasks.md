# Tasks: debt-assets-weight

Camino spec-first: no hay `design.md`; el enfoque aprobado vive en `proposal.md`. Las rutas de código son relativas a `log-atm-web-astro/` dentro del worktree; `memory/observations.md` es relativa a la raíz del worktree. Ninguna tarea es `[TDD]`: el proyecto no tiene runner de tests; la verificación es por build, grep y el script de medición.

## Orden de ejecución

1. Las specs `duplicate-video-removal`, `logo-vectorization-residue-removal`, `services-static-card-no-hover-zoom` y `card-image-weight-budget` son independientes entre sí y van en commits separados.
2. Dentro de `card-image-weight-budget` el orden es estricto: T1 (instalar dependencias) → T2 (script de medición) → T3 (baseline) → T4 (widths/sizes) → T5 (medición final) → T6 (quality, solo si T5 mide ≥ 2 MB) → T7 (verificación de nitidez).
3. `observations-debt-log-sync` va al final: anota el cierre del candidate de videos y de los residuos de logo, por lo que requiere que `duplicate-video-removal` y `logo-vectorization-residue-removal` estén aplicadas.
4. Cada grupo cierra con su commit (Conventional Commits, en inglés) y un `npm run build` verde.

---

## Spec: [[duplicate-video-removal]] — Una única copia del video institucional en el sitio desplegado

### Tarea 1: Eliminar los MP4 duplicados y la carpeta `public/video/`

- **Archivos**: `public/video/intro.mp4`, `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4` (se conserva), `src/components/sections/WhyVideoSection.astro`
- **Qué hacer**: confirmar que los tres MP4 comparten md5 (`4900f0e5…`), borrar `public/video/intro.mp4` (y la carpeta `public/video/`) y `public/videos/hero-port.mp4`; dejar `public/videos/log-atm-intro.mp4`, único referenciado (`WhyVideoSection.astro:44`).
- **Criterio de completado**: `public/videos/` contiene solo `log-atm-intro.mp4`; `public/video/` no existe; `/usr/bin/grep -rn "intro.mp4\|hero-port\|/video/" src/` no devuelve referencias a las copias eliminadas, y la única coincidencia de `intro.mp4` es `log-atm-intro.mp4`.
- **Requiere**: ninguna (independiente de las demás specs).

- [ ] Verificar con `md5sum` que los tres MP4 son idénticos antes de borrar
- [ ] `git rm public/video/intro.mp4` y verificar que la carpeta `public/video/` desaparece
- [ ] `git rm public/videos/hero-port.mp4`
- [ ] Confirmar que `public/videos/log-atm-intro.mp4` sigue presente y que `WhyVideoSection.astro:44` lo referencia

### Tarea 2: Verificar ausencia de referencias rotas en `src/`

- **Archivos**: `src/` (solo lectura)
- **Qué hacer**: buscar con `/usr/bin/grep` los nombres de los archivos eliminados.
- **Criterio de completado**: cero coincidencias de `hero-port` y de `intro.mp4` distintas de `log-atm-intro.mp4` en `src/`.
- **Requiere**: Tarea 1

- [ ] `/usr/bin/grep -rn "hero-port" src/` devuelve vacío
- [ ] `/usr/bin/grep -rnE "(^|[^-])intro\.mp4|/video/" src/` devuelve vacío

### Tarea 3: Build y verificación sobre `dist/client`

- **Archivos**: `dist/client/` (solo lectura)
- **Qué hacer**: ejecutar `npm run build` (requiere T1 de [[card-image-weight-budget]] para tener `node_modules`) y buscar referencias a los archivos eliminados; confirmar que `dist/client/videos/` contiene solo `log-atm-intro.mp4` y que `dist/client/video/` no existe.
- **Criterio de completado**: build verde; grep sobre `dist/client` sin referencias a `hero-port` ni a `/video/intro.mp4`; una sola copia del MP4 en `dist/client`.
- **Requiere**: Tarea 2; T1 de [[card-image-weight-budget]]

- [ ] `npm run build` termina sin errores
- [ ] `/usr/bin/grep -rn "hero-port\|/video/intro" dist/client` devuelve vacío
- [ ] `find dist/client -name "*.mp4"` lista únicamente `log-atm-intro.mp4`
- [ ] Commit: `chore(assets): remove duplicate intro video copies`

---

## Spec: [[logo-vectorization-residue-removal]] — Retiro de la herramienta de vectorización de logo y de sus referencias obsoletas

### Tarea 1: Eliminar `scripts/png-to-svg.mjs` y la dependencia `potrace`

- **Archivos**: `scripts/png-to-svg.mjs`, `package.json`, `package-lock.json`
- **Qué hacer**: borrar el script (queda en el historial, `d5bce4a`), quitar `potrace` de `dependencies` en `package.json` y actualizar el lockfile con `npm uninstall potrace`. No tocar `public/logo.svg` ni `scripts/generate-favicons.mjs`.
- **Criterio de completado**: `scripts/png-to-svg.mjs` no existe; `package.json` y `package-lock.json` no mencionan `potrace`; `public/logo.svg` y `generate-favicons.mjs` sin diff.
- **Requiere**: T1 de [[card-image-weight-budget]] (npm disponible con dependencias instaladas)

- [ ] `git rm scripts/png-to-svg.mjs`
- [ ] `npm uninstall potrace`
- [ ] Verificar con `git diff --stat` que solo cambian `package.json`, `package-lock.json` y el script borrado

### Tarea 2: Actualizar `README.md` y `docs/project-brief.md`

- **Archivos**: `README.md` (línea ~85), `docs/project-brief.md` (líneas 21 y 63-74)
- **Qué hacer**: en `README.md:85` quitar la mención de `png-to-svg` de la descripción de `scripts/`; en `docs/project-brief.md:21` cambiar «Logo destino» a `public/logo.svg`; reemplazar el bloque 63-74 (instrucciones con `potrace` y resultado en `src/assets/logo.svg`) por una nota breve que señale `public/logo.svg` como fuente vigente del logo vectorial.
- **Criterio de completado**: ni `README.md`, ni `docs/`, ni `scripts/` contienen `src/assets/logo.svg`, `png-to-svg` ni `potrace`; ambos documentos señalan `public/logo.svg`.
- **Requiere**: Tarea 1

- [ ] Editar `README.md:85` para quitar `(png-to-svg)`
- [ ] Editar `docs/project-brief.md:21` para apuntar a `public/logo.svg`
- [ ] Reemplazar `docs/project-brief.md:63-74` por la referencia a `public/logo.svg`

### Tarea 3: Verificar cero referencias, favicons y build

- **Archivos**: `scripts/`, `docs/`, `README.md`, `package.json` (solo lectura)
- **Qué hacer**: buscar las referencias eliminadas con `/usr/bin/grep`, correr `npm run favicons` y `npm run build`.
- **Criterio de completado**: `/usr/bin/grep -rn "src/assets/logo.svg\|png-to-svg\|potrace" scripts docs README.md package.json` vacío; `npm run favicons` y `npm run build` terminan sin errores; `git status` no muestra cambios en los favicons generados distintos de los esperados (si cambian binarios, revertirlos con `git checkout` solo sobre esos archivos del worktree del cambio).
- **Requiere**: Tarea 2

- [ ] Grep de referencias obsoletas devuelve vacío
- [ ] `npm run favicons` termina sin errores
- [ ] `npm run build` termina sin errores
- [ ] Commit: `chore(scripts): remove logo vectorization script and potrace dependency`

---

## Spec: [[services-static-card-no-hover-zoom]] — Las tarjetas de servicios no enlazadas no amplían su imagen al pasar el cursor

### Tarea 1: Restringir el zoom en hover a tarjetas enlazadas

- **Archivos**: `src/styles/sections/services.css` (línea 69)
- **Qué hacer**: cambiar el selector `.svc-card:hover .svc-card__media img` a `.svc-card:not(.svc-card--static):hover .svc-card__media img`, conservando `transform: scale(1.04)`. La clase `svc-card--static` ya se aplica en `ServicesSection.astro:51` y `servicios.astro:82` cuando la tarjeta no es enlace.
- **Criterio de completado**: la regla de zoom solo alcanza `.svc-card:not(.svc-card--static)`; el resto del CSS queda intacto; `npm run build` verde.
- **Requiere**: T1 de [[card-image-weight-budget]] (node_modules para el build)

- [ ] Editar el selector en `services.css:69`
- [ ] Revisar que `.svc-card--static:hover` (línea 36) no se modifica
- [ ] `npm run build` termina sin errores

### Tarea 2: Verificar el comportamiento en el navegador

- **Archivos**: `src/styles/sections/services.css` (solo lectura)
- **Qué hacer**: con el servidor de preview, inspeccionar la tarjeta no enlazada de `/servicios` (carga aérea/marítima) y una enlazada del inicio; comprobar el `transform` computado de la imagen en hover.
- **Criterio de completado**: en la tarjeta no enlazada el `transform` de la imagen permanece `none` al hover; en la tarjeta enlazada del inicio pasa a `scale(1.04)`.
- **Requiere**: Tarea 1

- [ ] Hover sobre tarjeta no enlazada de `/servicios`: sin ampliación
- [ ] Hover sobre tarjeta enlazada del inicio: imagen amplía a `scale(1.04)`
- [ ] Commit: `fix(services): limit hover image zoom to linked cards`

---

## Spec: [[card-image-weight-budget]] — Peso de imágenes del inicio bajo 2 MB mediante variantes acordes al tamaño de cada tarjeta

### Tarea 1: Instalar dependencias y obtener un build de referencia

- **Archivos**: `package.json`, `package-lock.json` (sin modificar)
- **Qué hacer**: el worktree no trae `node_modules`; ejecutar `npm ci` en `log-atm-web-astro/` y un primer `npm run build` para generar `dist/client/index.html` con el estado actual.
- **Criterio de completado**: `node_modules` existe, el build termina sin errores y `dist/client/index.html` existe; `git status` no muestra cambios en `package*.json` ni artefactos de build versionados.

- [ ] `npm ci` termina sin errores
- [ ] `npm run build` termina sin errores
- [ ] Confirmar que `dist/client/index.html` existe y `dist/` está ignorado por git

### Tarea 2: Escribir el script de medición de peso AVIF

- **Archivos**: `scripts/measure-home-image-weight.mjs` (nuevo), `package.json` (script npm opcional `measure:images`)
- **Qué hacer**: crear un script Node reproducible que lea `dist/client/index.html`, extraiga cada `<picture>`/`<source type="image/avif">` con su `srcset` y `sizes`, y simule la selección del navegador para dos escenarios: 1440×900 DPR 1 y 390×844 DPR 3 (ancho de slot = valor de `sizes` evaluado contra el viewport; candidato elegido = el menor ancho con `w >= slot × DPR`, o el mayor disponible). Sumar el tamaño en disco de los archivos AVIF elegidos (incluyendo hero y poster, que se cargan) tras el scroll completo (se asume que todas las imágenes lazy se descargan) y emitir el total por escenario, indicando si supera 2 MB. Salida determinista (mismo resultado en ejecuciones sucesivas). Comentarios en español.
- **Criterio de completado**: `node scripts/measure-home-image-weight.mjs` imprime el peso total (bytes y MB) de ambos escenarios y retorna exit code distinto de cero si algún escenario ≥ 2 MB; dos ejecuciones consecutivas producen la misma salida.
- **Requiere**: Tarea 1

- [ ] Crear el script con el parseo de `srcset`/`sizes` del HTML construido
- [ ] Implementar la selección de candidato por viewport y DPR para los dos escenarios
- [ ] Sumar pesos desde `dist/client/_astro/` e imprimir el total por escenario con veredicto contra 2 MB
- [ ] Ejecutarlo dos veces y comprobar que la salida es idéntica

### Tarea 3: Fijar el baseline con el build actual

- **Archivos**: `dist/client/index.html` (solo lectura)
- **Qué hacer**: ejecutar el script sobre el build sin cambios de `widths`/`sizes` y registrar los totales (esperado ~2,9 MB escritorio y ~3,0–3,1 MB móvil) para el reporte.
- **Criterio de completado**: los totales baseline de ambos escenarios están anotados (en el mensaje del commit y/o en `observations.md` por sdd-apply).
- **Requiere**: Tarea 2

- [ ] Ejecutar el script sobre el build de la Tarea 1
- [ ] Anotar los dos totales baseline

### Tarea 4: Agregar `widths` y `sizes` a las 7 `<Picture>` de card

- **Archivos**: `src/components/sections/ServicesSection.astro` (línea 57), `src/components/sections/IndustriesSection.astro` (línea 41), `src/pages/servicios.astro` (líneas 86 y 115), `src/pages/nosotros.astro` (línea 104), `src/pages/industrias.astro` (línea 76)
- **Qué hacer**: derivar `sizes` de las reglas CSS reales de cada grid (bento de servicios 12 columnas con spans 6/2/3 y sus breakpoints a span 4/6/12; grids de industrias, servicios y nosotros en sus páginas) y definir `widths` con tope ~2× el ancho máximo de render de cada card. Mantener `formats={['avif', 'webp']}` y `quality={80}`. No tocar la imagen del hero (`priority`), el poster ni `imageService`. Preferir una constante compartida solo si dos o más `<Picture>` usan exactamente el mismo par `widths`/`sizes` (SSOT/DRY); en caso contrario, valores en cada sitio.
- **Criterio de completado**: las 7 `<Picture>` declaran `widths` y `sizes`; el build termina sin errores; el HTML construido emite `srcset` con múltiples candidatos y `sizes` en cada `<source>` de card.
- **Requiere**: Tarea 3

- [ ] Leer los grids CSS (`services.css` y los estilos de industrias/nosotros) para calcular el ancho de render por breakpoint
- [ ] Editar `ServicesSection.astro:57` con `widths` y `sizes` del bento
- [ ] Editar `IndustriesSection.astro:41` con `widths` y `sizes` de su grid
- [ ] Editar `servicios.astro:86` y `servicios.astro:115`
- [ ] Editar `nosotros.astro:104`
- [ ] Editar `industrias.astro:76`
- [ ] `npm run build` termina sin errores

### Tarea 5: Medir el peso tras los cambios

- **Archivos**: `dist/client/index.html` (solo lectura)
- **Qué hacer**: ejecutar el script de medición sobre el nuevo build y comparar con el baseline.
- **Criterio de completado**: ambos escenarios (1440×900 DPR 1 y 390×844 DPR 3) reportan < 2 MB y el script retorna exit code 0; si alguno ≥ 2 MB se continúa con la Tarea 6.
- **Requiere**: Tarea 4

- [ ] Ejecutar `node scripts/measure-home-image-weight.mjs`
- [ ] Registrar los totales y el ahorro frente al baseline

### Tarea 6: Reducir la quality AVIF de las cards solo si la medición aún supera 2 MB

- **Archivos**: los mismos 7 `<Picture>` de la Tarea 4
- **Qué hacer**: condicional. Si la Tarea 5 mide ≥ 2 MB en algún escenario, bajar `quality` de las cards (80 → 70 → 65) y volver a construir y medir hasta cumplir; decide la medición. Si ya cumple, marcar la tarea como no aplicable sin cambios.
- **Criterio de completado**: ambos escenarios < 2 MB con la quality mínima necesaria; o tarea no aplicable documentada.
- **Requiere**: Tarea 5

- [ ] Evaluar si la Tarea 5 cumplió ambos escenarios (si sí, omitir y anotarlo)
- [ ] Si no, bajar la quality en las 7 `<Picture>`, reconstruir y re-medir hasta cumplir

### Tarea 7: Verificar nitidez a DPR 2 y que el hero no cambió

- **Archivos**: `src/components/sections/ServicesSection.astro`, `src/components/sections/IndustriesSection.astro`, `src/pages/*.astro` (solo lectura); hero del inicio (sin cambios)
- **Qué hacer**: abrir el sitio con preview en desktop (1440×900) y móvil (390×844) con DPR 2 y comprobar visualmente las cards del inicio, servicios, industrias y nosotros; verificar con `currentSrc` que la variante elegida cubre ≥ ancho de render × 2. Confirmar con diff que la `<Picture>` del hero conserva `priority` y su peso (≤ 237 KB).
- **Criterio de completado**: sin pérdida visible de nitidez a DPR 2 en las cuatro páginas; `git diff` no toca la imagen del hero; peso del hero igual al actual.
- **Requiere**: Tarea 5 (y Tarea 6 si aplicó)

- [ ] Revisión visual a DPR 2 en escritorio (inicio, servicios, industrias, nosotros)
- [ ] Revisión visual a DPR 2 en móvil
- [ ] Confirmar que el hero conserva `priority` y peso (`git diff` sin cambios en esa `<Picture>`)
- [ ] Commit: `perf(images): serve card variants sized to render width with widths and sizes`
- [ ] Commit del script de medición: `chore(scripts): add home image weight measurement script`

---

## Spec: [[observations-debt-log-sync]] — Registro de deuda técnica alineado con el estado real de los assets

### Tarea 1: Anotar los candidates resueltos y cerrar el de videos en `memory/observations.md`

- **Archivos**: `memory/observations.md` (entradas ubicadas por contenido, no por número de línea)
- **Qué hacer**: sin borrar el texto original, agregar junto a cada entrada una línea de estado. (a) «Assets de industrias sin uso en src/assets (10.5 MB)»: resuelto por `e6ade3a`. (b) «logo.svg duplicado/sin uso en src/assets»: resuelto por `e6ade3a`. (c) «Videos posiblemente duplicados en public/videos»: cerrado por el cambio `debt-assets-weight` (confirmados 3 MP4 con el mismo md5; se dejó solo `log-atm-intro.mp4`). Anotar en sitio con una línea `**Estado**:`; no se aplica la regla de rechazo de la convención porque no se agrega una entrada nueva (riesgo declarado en la propuesta).
- **Criterio de completado**: las tres entradas conservan su texto original íntegro y llevan su línea de estado con el commit o cambio que las resolvió.
- **Requiere**: Tareas de [[duplicate-video-removal]] y [[logo-vectorization-residue-removal]] aplicadas

- [ ] Ubicar por contenido la entrada de industrias sin uso y agregar su estado «resuelto por `e6ade3a`»
- [ ] Ubicar por contenido la entrada de `logo.svg` y agregar su estado «resuelto por `e6ade3a`»
- [ ] Ubicar por contenido la entrada de videos duplicados y agregar «cerrado por `debt-assets-weight`»

### Tarea 2: Corregir la ruta errónea del logo eliminado

- **Archivos**: `memory/observations.md` (entrada que menciona «`logo.svg` real», ubicada por contenido)
- **Qué hacer**: la línea indica que git rastreaba `src/assets/industries/logo.svg` y que el `logo.svg` real estaba en `src/assets/logo.svg` según tasks/design; la propuesta indica que git confirma que se borró `src/assets/logo.svg`. Verificar con `git -C <worktree> log --diff-filter=D --name-only -- '*logo.svg'` cuál era la ruta realmente eliminada y anotar la corrección junto a la línea (sin borrar el texto previo), de modo que la ruta indicada coincida con el archivo realmente eliminado.
- **Criterio de completado**: la entrada indica la ruta realmente eliminada, verificada con el historial git, y conserva su texto original.
- **Requiere**: Tarea 1

- [ ] Confirmar con el historial git la ruta del `logo.svg` eliminado por `e6ade3a`
- [ ] Anotar la ruta correcta junto a la entrada, conservando el texto original
- [ ] Verificar con `git diff` que el único cambio en `observations.md` son los estados y la corrección agregados
- [ ] Commit: `docs(sdd): sync observations debt log with asset cleanup state`
