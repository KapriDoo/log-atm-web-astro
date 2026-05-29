---
type: change-tasks
change_name: optimize-images-webp
domain: refactoring
fast_path: full
created: "2026-05-28"
updated: "2026-05-28"
specs_traced:
  - "image-optimization-pipeline/image-asset-migration"
  - "image-optimization-pipeline/image-multiformat-delivery"
  - "hero-lcp-performance/hero-lcp-priority"
  - "dead-code-cleanup/asset-dead-code-removal"
---

# Tasks: optimize-images-webp

## Orden de ejecución

Las tareas siguen el orden seguro definido en design.md §Orden de Implementación Seguro.
El sitio queda temporalmente roto entre T1 y T5 (rutas `/images/` dejan de existir) — es intencional y se resuelve en T2–T5.
**No ejecutar `npm run build` antes de T6.**

```
T1 (mover assets)
  └─→ T2 (constants.ts — imports + tipos)
        └─→ T3 (astro.config.mjs — bloque image:)
              └─→ T4 (HeroSection — Picture priority)
                    └─→ T5a (ServicesSection)
                    └─→ T5b (IndustriesSection)
                    └─→ T5c (WhyVideoSection — poster)
                    └─→ T5d (servicios.astro — ×2 img)
                    └─→ T5e (nosotros.astro — ×1 img)
                    └─→ T5f (industrias.astro — ×2 img, spotlight con widths/sizes)
                          └─→ T6 (build de validación — npm run build)
                                └─→ T7 (eliminar código muerto)
                                      └─→ T8 (build final + verificación de output)
```

T5a–T5f pueden ejecutarse en cualquier orden entre sí (sin dependencia mutua).
T7 depende de T6 (build verde es precondición).

---

## Spec: image-optimization-pipeline / image-asset-migration

### T1: Mover los 27 JPEG de `public/images/` a `src/assets/images/`

- **Archivos**:
  - `public/images/services/` (11 archivos) → `src/assets/images/services/`
  - `public/images/industries/` (12 archivos) → `src/assets/images/industries/`
  - `public/images/process/` (4 archivos) → `src/assets/images/process/`
- **Qué hacer**: Crear las carpetas destino y mover los 27 JPEG usando `git mv` para preservar historial. Los nombres de archivo se mantienen exactos (`svc-*.jpeg`, `ind-*.jpeg`, `how-*.jpeg`).
- **Criterio de completado**: Las tres subcarpetas existen en `src/assets/images/` con todos sus archivos y `public/images/services/`, `public/images/industries/`, `public/images/process/` quedan vacías (o no existen).
- **Requiere**: ninguna tarea previa.
- **Trazabilidad**: `image-asset-migration` §Requirements — "SHALL ubicar todos los archivos en la carpeta de assets gestionados"; §Scenario "La carpeta pública no contiene los JPEG de contenido migrados".

- [x] Crear `src/assets/images/services/`, `src/assets/images/industries/`, `src/assets/images/process/` (mkdir -p)
- [x] `git mv public/images/services/svc-aduana.jpeg src/assets/images/services/svc-aduana.jpeg`
- [x] `git mv public/images/services/svc-aerea.jpeg src/assets/images/services/svc-aerea.jpeg`
- [x] `git mv public/images/services/svc-almacenaje.jpeg src/assets/images/services/svc-almacenaje.jpeg`
- [x] `git mv public/images/services/svc-asesoria.jpeg src/assets/images/services/svc-asesoria.jpeg`
- [x] `git mv public/images/services/svc-casillero.jpeg src/assets/images/services/svc-casillero.jpeg`
- [x] `git mv public/images/services/svc-consultoria.jpeg src/assets/images/services/svc-consultoria.jpeg`
- [x] `git mv public/images/services/svc-courier.jpeg src/assets/images/services/svc-courier.jpeg`
- [x] `git mv public/images/services/svc-desconsolidado.jpeg src/assets/images/services/svc-desconsolidado.jpeg`
- [x] `git mv public/images/services/svc-maritima.jpeg src/assets/images/services/svc-maritima.jpeg`
- [x] `git mv public/images/services/svc-medio-oriente.jpeg src/assets/images/services/svc-medio-oriente.jpeg`
- [x] `git mv public/images/services/svc-seguros.jpeg src/assets/images/services/svc-seguros.jpeg`
- [x] `git mv public/images/industries/ind-agro.jpeg src/assets/images/industries/ind-agro.jpeg`
- [x] `git mv public/images/industries/ind-chatarra.jpeg src/assets/images/industries/ind-chatarra.jpeg`
- [x] `git mv public/images/industries/ind-construccion.jpeg src/assets/images/industries/ind-construccion.jpeg`
- [x] `git mv public/images/industries/ind-ecommerce.jpeg src/assets/images/industries/ind-ecommerce.jpeg`
- [x] `git mv public/images/industries/ind-efectos.jpeg src/assets/images/industries/ind-efectos.jpeg`
- [x] `git mv public/images/industries/ind-farma.jpeg src/assets/images/industries/ind-farma.jpeg`
- [x] `git mv public/images/industries/ind-iluminarias.jpeg src/assets/images/industries/ind-iluminarias.jpeg`
- [x] `git mv public/images/industries/ind-maquinaria.jpeg src/assets/images/industries/ind-maquinaria.jpeg`
- [x] `git mv public/images/industries/ind-mineria.jpeg src/assets/images/industries/ind-mineria.jpeg`
- [x] `git mv public/images/industries/ind-retail.jpeg src/assets/images/industries/ind-retail.jpeg`
- [x] `git mv public/images/industries/ind-textil.jpeg src/assets/images/industries/ind-textil.jpeg`
- [x] `git mv public/images/industries/ind-vehiculos.jpeg src/assets/images/industries/ind-vehiculos.jpeg`
- [x] `git mv public/images/process/how-01-ejecutivo.jpeg src/assets/images/process/how-01-ejecutivo.jpeg`
- [x] `git mv public/images/process/how-02-diagnostico.jpeg src/assets/images/process/how-02-diagnostico.jpeg`
- [x] `git mv public/images/process/how-03-ruta.jpeg src/assets/images/process/how-03-ruta.jpeg`
- [x] `git mv public/images/process/how-04-operacion.jpeg src/assets/images/process/how-04-operacion.jpeg`
- [x] Verificar que `public/images/services/`, `public/images/industries/`, `public/images/process/` no contienen JPEG

---

### T2: Actualizar `src/lib/constants.ts` — imports estáticos de `ImageMetadata` y reemplazo de strings

- **Archivos**: `src/lib/constants.ts`
- **Qué hacer**: Añadir 27 imports estáticos en la cabecera del archivo (uno por JPEG). Cambiar el tipo del campo `img` de `string` a `ImageMetadata` en `SERVICES`, `INDUSTRIES`, `HOW_WE_WORK`. Reemplazar los 27 valores string `/images/...` por la variable importada correspondiente. Si `as const` provoca error de tipos con `ImageMetadata`, ajustar el tipado del array afectado (ver R1 en design.md).
- **Criterio de completado**: El archivo no contiene ningún string `/images/` en campos `img:`. Cada `img:` apunta a una variable importada de `ImageMetadata`. TypeScript compila sin errores (el build del paso T6 lo valida).
- **Requiere**: T1 (los archivos deben existir en `src/assets/images/` para que los imports resuelvan).
- **Trazabilidad**: `image-asset-migration` §Requirements — "datos editoriales SHALL permanecer en una única fuente de verdad"; `image-multiformat-delivery` §Requirements — "datos de negocio SHALL permanecer centralizados"; design.md §D1.

- [x] Añadir al inicio de `src/lib/constants.ts` (después de imports existentes): 11 imports de `src/assets/images/services/*.jpeg`
  - `import svcAduana from '../assets/images/services/svc-aduana.jpeg';`
  - `import svcAerea from '../assets/images/services/svc-aerea.jpeg';`
  - `import svcAlmacenaje from '../assets/images/services/svc-almacenaje.jpeg';`
  - `import svcAsesoria from '../assets/images/services/svc-asesoria.jpeg';`
  - `import svcCasillero from '../assets/images/services/svc-casillero.jpeg';`
  - `import svcConsultoria from '../assets/images/services/svc-consultoria.jpeg';`
  - `import svcCourier from '../assets/images/services/svc-courier.jpeg';`
  - `import svcDesconsolidado from '../assets/images/services/svc-desconsolidado.jpeg';`
  - `import svcMaritima from '../assets/images/services/svc-maritima.jpeg';`
  - `import svcMedioOriente from '../assets/images/services/svc-medio-oriente.jpeg';`
  - `import svcSeguros from '../assets/images/services/svc-seguros.jpeg';`
- [x] Añadir 12 imports de `src/assets/images/industries/*.jpeg` (ind-agro, ind-chatarra, ind-construccion, ind-ecommerce, ind-efectos, ind-farma, ind-iluminarias, ind-maquinaria, ind-mineria, ind-retail, ind-textil, ind-vehiculos)
- [x] Añadir 4 imports de `src/assets/images/process/*.jpeg` (how-01-ejecutivo, how-02-diagnostico, how-03-ruta, how-04-operacion)
- [x] En la const `SERVICES`: reemplazar cada `img: '/images/services/svc-*.jpeg'` por `img: svc*` (variable importada correspondiente)
- [x] En la const `INDUSTRIES`: reemplazar cada `img: '/images/industries/ind-*.jpeg'` por `img: ind*`
- [x] En la const `HOW_WE_WORK`: reemplazar cada `img: '/images/process/how-*.jpeg'` por `img: how0*`
- [x] Verificar que no queda ningún string `/images/` en el archivo
- [x] Si `as const` genera error de tipos con `ImageMetadata`, retipar el array afectado (p. ej. `as readonly Array<{..., img: ImageMetadata, ...}>`)

---

## Spec: image-optimization-pipeline / image-multiformat-delivery

### T3: Configurar bloque `image:` con servicio Sharp explícito en `astro.config.mjs`

- **Archivos**: `astro.config.mjs`
- **Qué hacer**: Añadir el bloque `image:` con el servicio Sharp y opciones de codec documentadas. El bloque va dentro del objeto de configuración raíz de `defineConfig()`.
- **Criterio de completado**: El archivo contiene el bloque `image:` con `entrypoint: 'astro/assets/services/sharp'` y las opciones `jpeg: { mozjpeg: true }` y `webp: { effort: 4 }`. El build no reporta warnings de servicio desconocido.
- **Requiere**: T1 (conveniente tener los assets en su lugar antes de tocar la config).
- **Trazabilidad**: `image-multiformat-delivery` §Requirements — "SHALL configurar explícitamente el servicio de procesamiento con opciones de calidad documentadas"; design.md §D6.

- [x] Añadir el bloque `image:` dentro de `defineConfig({...})`:
  ```js
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { mozjpeg: true },
        webp: { effort: 4 },
      },
    },
  },
  ```
- [x] Verificar que el bloque no duplica una key `image:` ya existente en el archivo

---

### T4: Migrar `HeroSection.astro` — `<Picture>` con `priority`, `widths` y `sizes`

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: Importar `{ Picture }` de `astro:assets` y el asset `heroImg` desde `../../assets/images/services/svc-maritima.jpeg`. Reemplazar el `<img>` existente (línea 19) por `<Picture>` con `priority`, `formats`, `fallbackFormat`, `widths`, `sizes` y `quality`. Preservar todas las clases CSS, atributos `data-*` y `aria-*` del `<img>` original pasándolos al `<Picture>` (Astro los propaga al `<img>` interno).
- **Criterio de completado**: El componente no contiene ningún `<img>` con `src` hardcoded `/images/`. El `<Picture>` tiene los atributos `priority`, `widths={[768,1280,1920,heroImg.width]}`, `sizes="100vw"`, `formats={['avif','webp']}`, `fallbackFormat="jpeg"` y `quality={80}`.
- **Requiere**: T2 (los assets deben estar en `src/assets/images/`; en este caso el import es local al componente, pero T1 es la precondición real).
- **Trazabilidad**: `hero-lcp-priority` §Requirements — "SHALL indicar al navegador que descargue la imagen del hero con la mayor prioridad posible"; "SHALL proveer variantes para diferentes tamaños de pantalla"; "SHALL declarar que la imagen ocupa el ancho completo"; design.md §D3, §D4.

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Añadir en el frontmatter: `import heroImg from '../../assets/images/services/svc-maritima.jpeg';`
- [x] Reemplazar el elemento `<img>` de línea 19 por:
  ```astro
  <Picture
    src={heroImg}
    formats={['avif', 'webp']}
    fallbackFormat="jpeg"
    priority
    alt=""
    widths={[768, 1280, 1920, heroImg.width]}
    sizes="100vw"
    quality={80}
  />
  ```
- [x] Preservar las clases CSS originales del `<img>` (p. ej. `class="hero__img"` o equivalente) en el `<Picture>`
- [x] Preservar atributos `data-*` del `<img>` original en el `<Picture>` (para GSAP)
- [x] Eliminar el atributo `fetchpriority="high"` del `<img>` original (lo reemplaza `priority`)
- [x] Verificar que el componente no referencia `/images/` tras la migración

---

### T5a: Migrar `ServicesSection.astro` — `<Picture>` para cards de servicios

- **Archivos**: `src/components/sections/ServicesSection.astro`
- **Qué hacer**: Importar `{ Picture }` de `astro:assets`. Reemplazar el `<img src={s.img}>` (línea 48) por `<Picture src={s.img} ...>`. Preservar clases CSS y atributos `data-*` del `<img>` original.
- **Criterio de completado**: No hay `<img src={s.img}>` en el archivo. El `<Picture>` tiene `formats`, `quality` y `alt`.
- **Requiere**: T2 (el tipo de `s.img` ya es `ImageMetadata`).
- **Trazabilidad**: `image-multiformat-delivery` §Scenario "Visitante con navegador moderno ve las imágenes"; §AC "El HTML generado contiene `<picture>` con `<source type=image/avif>`"; design.md §D2.

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Reemplazar `<img src={s.img} ...>` (línea 48) por:
  ```astro
  <Picture src={s.img} formats={['avif', 'webp']} alt={s.title} quality={80} />
  ```
- [x] Preservar las clases CSS del `<img>` original (p. ej. `class="services__media-img"`) en el `<Picture>`
- [x] Preservar atributos `data-*` del `<img>` original en el `<Picture>` (para Swiper/GSAP)
- [x] Verificar que no queda ningún `<img src={s.img}>` en el archivo

---

### T5b: Migrar `IndustriesSection.astro` — `<Picture>` para cards de industrias

- **Archivos**: `src/components/sections/IndustriesSection.astro`
- **Qué hacer**: Importar `{ Picture }`. Reemplazar `<img src={ind.img}>` (línea 40) por `<Picture>`. Preservar clases y `data-*`.
- **Criterio de completado**: No hay `<img src={ind.img}>`. El `<Picture>` tiene `formats`, `quality` y `alt`.
- **Requiere**: T2.
- **Trazabilidad**: `image-multiformat-delivery` §D2; `image-asset-migration` §Scenario "Versiones multiidioma muestran las imágenes sin cambios adicionales".

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Reemplazar `<img src={ind.img} ...>` (línea 40) por:
  ```astro
  <Picture src={ind.img} formats={['avif', 'webp']} alt={ind.name} quality={80} />
  ```
- [x] Preservar las clases CSS del `<img>` original en el `<Picture>`
- [x] Preservar atributos `data-*` del `<img>` original (para Swiper)
- [x] Verificar que no queda ningún `<img src={ind.img}>` en el archivo

---

### T5c: Migrar `WhyVideoSection.astro` — poster del video via `getImage()`

- **Archivos**: `src/components/sections/WhyVideoSection.astro`
- **Qué hacer**: Importar `{ getImage }` de `astro:assets` y el asset `posterSrc` desde `../../assets/images/services/svc-maritima.jpeg`. Generar el poster con `getImage()` en el frontmatter. Reemplazar `poster="/images/services/svc-maritima.jpeg"` (línea 33) por `poster={poster.src}`. NO tocar el `<img src="/logo.png">` de línea 56.
- **Criterio de completado**: El atributo `poster` del `<video>` apunta a `poster.src` (URL optimizada WebP). No hay ninguna referencia a `/images/services/svc-maritima.jpeg` en el archivo. El `<img src="/logo.png">` permanece intacto.
- **Requiere**: T1 (el asset debe estar en `src/assets/images/services/`).
- **Trazabilidad**: `image-multiformat-delivery` §Requirements — "SHOULD entregar el poster del video como imagen WebP optimizada"; §Scenario "El poster del video muestra una miniatura optimizada"; design.md §D5.

- [x] Añadir en el frontmatter: `import { getImage } from 'astro:assets';`
- [x] Añadir en el frontmatter: `import posterSrc from '../../assets/images/services/svc-maritima.jpeg';`
- [x] Añadir en el frontmatter (con await, en el bloque `---`):
  ```ts
  const poster = await getImage({ src: posterSrc, format: 'webp', width: 1280 });
  ```
- [x] Reemplazar `poster="/images/services/svc-maritima.jpeg"` por `poster={poster.src}` en el elemento `<video>`
- [x] Confirmar que la línea con `<img src="/logo.png">` no fue modificada
- [x] Verificar que no queda ninguna referencia a `/images/` en el archivo

---

### T5d: Migrar `src/pages/servicios.astro` — dos instancias de `<img>`

- **Archivos**: `src/pages/servicios.astro`
- **Qué hacer**: Importar `{ Picture }`. Reemplazar las dos instancias de `<img src={s.img}>` (líneas 83 y 115) por `<Picture>`. Preservar clases y `data-*`.
- **Criterio de completado**: No hay `<img src={s.img}>` en el archivo (verificar ambas ocurrencias). Los dos `<Picture>` tienen `formats`, `quality` y `alt`.
- **Requiere**: T2.
- **Trazabilidad**: `image-multiformat-delivery` §AC "El HTML de /servicios contiene `<picture>`"; `image-asset-migration` §Requirements — "Ningún componente referencia rutas /images/".

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Reemplazar `<img src={s.img} ...>` en línea 83 (grid catálogo) por `<Picture src={s.img} formats={['avif', 'webp']} alt={s.title} quality={80} />` preservando clases y `data-*`
- [x] Reemplazar `<img src={s.img} ...>` en línea 115 (detalle de servicio) por `<Picture src={s.img} formats={['avif', 'webp']} alt={s.title} quality={80} />` preservando clases y `data-*`
- [x] Verificar que no quedan referencias a `/images/` en el archivo

---

### T5e: Migrar `src/pages/nosotros.astro` — una instancia de `<img>`

- **Archivos**: `src/pages/nosotros.astro`
- **Qué hacer**: Importar `{ Picture }`. Reemplazar `<img src={s.img}>` (línea 131, sección cómo trabajamos — `HOW_WE_WORK`) por `<Picture>`. Preservar clases y `data-*`.
- **Criterio de completado**: No hay `<img src={s.img}>` en la sección "cómo trabajamos". El `<Picture>` tiene `formats`, `quality` y `alt`.
- **Requiere**: T2.
- **Trazabilidad**: `image-multiformat-delivery` §AC "El HTML de /nosotros contiene `<picture>`"; `image-asset-migration` §Scenario "Versiones multiidioma muestran las imágenes sin cambios adicionales".

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Reemplazar `<img src={s.img} ...>` en línea 131 por:
  ```astro
  <Picture src={s.img} formats={['avif', 'webp']} alt={s.title} quality={80} />
  ```
  preservando clases CSS y `data-*` del `<img>` original
- [x] Verificar que no quedan referencias a `/images/` en el archivo

---

### T5f: Migrar `src/pages/industrias.astro` — spotlight con `widths`/`sizes` y directory slides

- **Archivos**: `src/pages/industrias.astro`
- **Qué hacer**: Importar `{ Picture }`. Reemplazar las dos instancias de `<img>` (líneas 69 y 105). La línea 69 (spotlight) recibe `widths` y `sizes` por ser imagen grande. La línea 105 (directory slides) es card estándar sin `widths`.
- **Criterio de completado**: No hay `<img src=...>` de imagen de contenido en el archivo. El `<Picture>` del spotlight tiene `widths` y `sizes`. El de directory slides no.
- **Requiere**: T2.
- **Trazabilidad**: `image-multiformat-delivery` §D2, §D4; `hero-lcp-priority` §Requirements "SHALL proveer variantes para diferentes tamaños" (aplicado al spotlight); `image-asset-migration` §Scenario "Versiones multiidioma muestran imágenes sin cambios".

- [x] Añadir en el frontmatter: `import { Picture } from 'astro:assets';`
- [x] Reemplazar `<img src={spotlight.img} ...>` en línea 69 (spotlight) por:
  ```astro
  <Picture
    src={spotlight.img}
    formats={['avif', 'webp']}
    alt={spotlight.name}
    quality={80}
    widths={[480, 768, 1024]}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  ```
  preservando clases CSS y `data-*` del `<img>` original
- [x] Reemplazar `<img src={it.img} ...>` en línea 105 (directory slides) por:
  ```astro
  <Picture src={it.img} formats={['avif', 'webp']} alt={it.name} quality={80} />
  ```
  preservando clases CSS y `data-*` del `<img>` original
- [x] Verificar que no quedan referencias a `/images/` en el archivo

---

### T6: Ejecutar build de validación

- **Archivos**: ninguno (acción de build)
- **Qué hacer**: Ejecutar `npm run build` en el directorio del worktree. El build de Astro valida automáticamente todos los imports de imagen. Si falla, identificar la referencia inválida en el mensaje de error y corregirla en la tarea correspondiente (T2–T5f) antes de continuar.
- **Criterio de completado**: `npm run build` termina sin errores. El hook `validate-i18n.ts` pasa sin warnings.
- **Requiere**: T3, T4, T5a, T5b, T5c, T5d, T5e, T5f (todos los componentes migrados).
- **Trazabilidad**: `image-asset-migration` §Scenario "El build resuelve todas las referencias de imagen"; §Scenario "Referencia de imagen inválida falla el build inmediatamente"; `image-multiformat-delivery` §AC "El sitio construye sin errores".

- [x] Ejecutar `npm run build` en el worktree (`/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/optimize-images-webp/log-atm-web-astro/`)
- [x] Confirmar salida sin errores de compilación ni errores de import
- [x] Confirmar que el hook i18n (`validate-i18n.ts`) pasa sin errores

---

## Spec: dead-code-cleanup / asset-dead-code-removal

### T7: Eliminar código muerto — `src/assets/industries/`, `industryImages.ts`, `logo.svg`

- **Archivos**:
  - `src/assets/industries/` (directorio con 14 archivos JPG)
  - `src/lib/industryImages.ts`
  - `src/assets/logo.svg`
- **Qué hacer**: Antes de borrar, ejecutar grep de defensa para confirmar que ningún archivo del proyecto referencia estos artefactos. Luego eliminar los tres grupos. Usar `git rm` para que queden en el staging de git.
- **Criterio de completado**: Los tres artefactos no existen en el repositorio. No hay ninguna referencia a `INDUSTRY_IMAGES`, `industryImages` ni `src/assets/logo.svg` en `src/`.
- **Requiere**: T6 (build verde es precondición para garantizar que los archivos no tienen consumidores activos).
- **Trazabilidad**: `asset-dead-code-removal` §Requirements — "SHALL eliminar archivos duplicados... SHALL ejecutarse DESPUÉS de verificar que el build pasa"; §Scenario "Build pasa sin los archivos de código muerto"; §Scenario "El repositorio no contiene referencias a los módulos eliminados"; §Scenario "El peso del repositorio se reduce de forma medible".

- [x] Ejecutar grep de defensa: `grep -r "INDUSTRY_IMAGES\|industryImages\|assets/logo.svg" src/ --include="*.ts" --include="*.astro" --include="*.js"` — debe retornar vacío
- [x] Ejecutar `git rm -r src/assets/industries/` (14 JPG)
- [x] Ejecutar `git rm src/lib/industryImages.ts`
- [x] Ejecutar `git rm src/assets/logo.svg`
- [x] Verificar que `src/assets/industries/` ya no existe
- [x] Verificar que `src/lib/industryImages.ts` ya no existe
- [x] Verificar que `src/assets/logo.svg` ya no existe

---

### T8: Build final y verificación de output

- **Archivos**: ninguno (verificación de output de build)
- **Qué hacer**: Ejecutar `npm run build` final. Verificar que `dist/_astro/` contiene variantes `.avif` y `.webp`. Verificar que el HTML de las páginas principales contiene `<picture>` con `<source type="image/avif">`. Verificar que no quedan rutas `/images/` en el output. Verificar que el hero tiene `fetchpriority="high"` y `loading="eager"`.
- **Criterio de completado**: Todas las verificaciones pasan (ver checklist). El build termina sin errores.
- **Requiere**: T7.
- **Trazabilidad**: `image-multiformat-delivery` §AC todos los puntos; `hero-lcp-priority` §AC "El HTML generado del hero contiene fetchpriority=high, loading=eager, decoding=sync"; `asset-dead-code-removal` §AC "El sitio construye sin errores después de la eliminación".

- [x] Ejecutar `npm run build` en el worktree y confirmar salida sin errores
- [x] Verificar que `dist/_astro/` contiene archivos `*.avif` y `*.webp` con hash de contenido
- [x] Verificar que `dist/index.html` contiene `<picture>` con `<source type="image/avif">` y `<source type="image/webp">`
- [x] Verificar que `dist/servicios/index.html` contiene `<picture>` con `<source type="image/avif">`
- [x] Verificar que `dist/industrias/index.html` contiene `<picture>` con `<source type="image/avif">`
- [x] Verificar que `dist/nosotros/index.html` contiene `<picture>` con `<source type="image/avif">`
- [x] Verificar que el `<img>` interno del hero en `dist/index.html` tiene `fetchpriority="high"` y `loading="eager"` y `decoding="sync"`
- [x] Verificar que el `<img>` interno del hero tiene atributos `width` y `height` presentes
- [x] Verificar que `grep -r '"/images/' dist/` no encuentra rutas hacia `public/images/` (las URLs en dist deben ser `/_astro/...`)
- [x] Verificar que `grep -r 'INDUSTRY_IMAGES\|industryImages\|assets/logo.svg' src/` retorna vacío
- [x] Verificar que el poster del video en `dist/index.html` apunta a una URL `/_astro/*.webp` (no a `/images/`)
- [x] Verificar que los `<img>` internos de las cards tienen atributos `width` y `height` presentes (CLS=0)
