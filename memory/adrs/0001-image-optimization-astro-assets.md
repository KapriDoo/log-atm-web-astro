---
status: accepted
date: 2026-05-10
deciders: sdd-design
consulted: stack-existing, astro-docs
informed: sdd-apply, sdd-verify
---

# ADR 0001: Optimización de imágenes con Astro Assets y Sharp

## Contexto

El cambio "redesign-experiencia-sector" introduce 14 imágenes fotográficas en el sitio web de LOG ATM. Estas imágenes reemplazarán iconos SVG en las tarjetas de industria tanto en la página de inicio como en la página dedicada `/industrias`.

Las imágenes fotográficas presentan desafíos de performance que los iconos SVG no tenían:
- Mayor peso en bytes (fotos vs. vectores)
- Necesidad de formatos modernos (WebP/AVIF) para reducir tamaño
- Riesgo de CLS si no se reserva espacio antes de la carga
- Impacto potencial en LCP si las imágenes se cargan de forma síncrona o sin optimización
- Necesidad de srcset responsive para diferentes densidades de pantalla

El proyecto actualmente usa:
- Astro 6.1.5 (con soporte nativo para `astro:assets`)
- Sharp 0.34.5 como dependencia de producción
- Tailwind CSS v4 para estilos
- Sin imágenes fotográficas previas en el sitio (solo SVGs e iconos)

## Decisión

Usar **Astro Assets** (`astro:assets`) con **Sharp** como motor de procesamiento de imágenes. Las imágenes fuente se alojarán en `src/assets/industries/` y se consumirán mediante el componente `<Image>` nativo de Astro.

### Aspectos técnicos de la decisión:

1. **Ubicación**: `src/assets/industries/` (no `public/industries/`)
2. **Componente**: `<Image>` de `astro:assets`
3. **Formatos de salida**: WebP y AVIF (generados automáticamente por Astro + Sharp)
4. **Importación**: Imports estáticos de TypeScript para que Astro pueda procesarlas en build time
5. **Lazy loading**: `loading="lazy"` nativo del navegador para todas las imágenes
6. **Prevención de CLS**: Dimensiones explícitas en `<Image>` + contenedor CSS con `aspect-ratio`

## Consecuencias

### Positivas

- **Optimización automática**: Astro + Sharp generan WebP/AVIF y srcset sin configuración adicional.
- **Zero CLS**: El componente `<Image>` inyecta width/height explícitos y reserva espacio.
- **Responsive built-in**: Genera variantes 1x, 2x automáticamente según el viewport.
- **Sin dependencias nuevas**: Sharp ya está en `package.json`; Astro Assets es parte del framework.
- **Build-time processing**: Las imágenes se procesan una vez en build, no en cada request.
- **Cache-friendly**: Las imágenes optimizadas se versionan con hash en el nombre de archivo.

### Negativas

- **Imports estáticos requeridos**: Astro no soporta paths dinámicos en `<Image>` (ej: `src={variable}` no funciona si la variable es un string). Requiere un mapa de imports estáticos o importar cada imagen explícitamente.
- **Tamaño de build**: El directorio `src/assets/industries/` aumentará el tamaño del repositorio con las imágenes fuente (aunque las optimizadas son las que se sirven).
- **No hot-reload de imágenes nuevas**: Si se agrega una nueva imagen, se requiere reiniciar `astro dev` para que Astro la reconozca (limitación conocida de Vite/Astro).

### Riesgos mitigados

- **Performance**: Mitigado por lazy loading + formatos modernos + srcset.
- **CLS**: Mitigado por dimensiones explícitas + aspect-ratio CSS.
- **Accessibility**: Mitigado por campo `alt` obligatorio en el modelo de datos.

## Alternativas consideradas

### Opción A: Directorio `public/industries/` con imágenes estáticas

Las imágenes se colocarían en `public/industries/` y se referenciarían directamente por URL.

**Descartada porque**:
- Sin optimización automática; se servirían en el formato original (probablemente JPG/PNG de alto peso).
- No genera srcset responsive; los usuarios móviles descargarían imágenes de escritorio.
- Requeriría pipeline manual (CLI de Sharp, script de build) para convertir a WebP/AVIF.
- Mayor riesgo de CLS si no se gestionan dimensiones manualmente.

### Opción B: CDN externo (Cloudinary, Imgix, etc.)

Las imágenes se alojarían en un servicio CDN especializado y se referenciarían por URL.

**Descartada porque**:
- Añade dependencia de infraestructura externa y costo operacional.
- Complejidad de gestión de URLs, versionado y sincronización de assets.
- Para un sitio estático corporativo con 14 imágenes, es over-engineering.
- No se alinea con el principio KISS del proyecto.

### Opción C: Componente React con lazy loading manual (Intersection Observer)

Una isla React manejaría el lazy loading de imágenes con Intersection Observer.

**Descartada porque**:
- Añade JavaScript innecesario al cliente; `loading="lazy"` nativo tiene soporte >90%.
- Rompe el patrón de Astro de "menos JS en el cliente"; estas imágenes no requieren interactividad.
- Astro Image ya gestiona el lazy loading nativo de forma declarativa.

## Notas de implementación

Para resolver la limitación de imports estáticos de Astro Image, se recomienda crear un módulo auxiliar:

```typescript
// src/lib/industryImages.ts
import mineria from '../assets/industries/mineria.jpg';
import retail from '../assets/industries/retail.jpg';
// ... (14 imports)

export const INDUSTRY_IMAGE_MAP = {
  mineria,
  retail,
  // ...
} as const;
```

Luego en el componente:

```astro
---
import { Image } from 'astro:assets';
import { INDUSTRY_IMAGE_MAP } from '../lib/industryImages';
const { industryKey, alt } = Astro.props;
const imageSrc = INDUSTRY_IMAGE_MAP[industryKey as keyof typeof INDUSTRY_IMAGE_MAP];
---

<Image src={imageSrc} alt={alt} width={320} height={200} loading="lazy" />
```

Esto permite que Astro resuelva las imágenes en build time mientras mantiene un mapeo limpio entre datos y assets.

## Estado

**Accepted** — 2026-05-10

No hay ADRs previos que esta decisión superseda.

> **Extendido por** [[0006-picture-multiformat-content-images]] (2026-05-28): el cambio
> `optimize-images-webp` generaliza esta decisión desde el feature de industrias a todas
> las imágenes de contenido del sitio, adopta `<Picture>` (multi-formato AVIF+WebP) sobre
> `<Image>`, porta `ImageMetadata` en `constants.ts` (en vez de mapa auxiliar), e introduce
> `priority` para LCP y `getImage()` para el poster de video. ADR-0001 permanece vigente.
