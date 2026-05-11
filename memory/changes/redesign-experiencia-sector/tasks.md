---
type: tasks
change_name: "redesign-experiencia-sector"
created: "2026-05-10"
---

# Tasks — redesign-experiencia-sector

## Orden de ejecución

1. **Spec: data/industries-images** → T1, T2, T3 (independientes entre sí)
2. **Spec: sections/industries-home** → T4, T5 (dependen de T1, T2, T3)
3. **Spec: sections/industries-page** → T6, T7 (dependen de T1, T2, T3)

---

## Spec: data/industries-images

### T1 — Extender tipo IndustryItem con campos image y alt
**Archivo(s)**: `src/lib/types.ts`
**Acción**: Agregar propiedades opcionales `image?: string` y `alt?: string` a la interfaz `IndustryItem`.
**Criterio de completado**: El tipo `IndustryItem` compila sin errores y cuenta con los 6 campos (`icon`, `name`, `sub`, `color`, `image`, `alt`).
- [ ] Agregar `image?: string;` después de `color: string;`
- [ ] Agregar `alt?: string;` después de `image`

### T2 — Crear directorio de assets y mapa de imports estáticos
**Archivo(s)**: `src/assets/industries/` (nuevo directorio), `src/lib/industryImages.ts` (nuevo archivo)
**Acción**: Crear el directorio `src/assets/industries/` para alojar las 14 imágenes fuente, y crear `src/lib/industryImages.ts` con un mapa de imports estáticos de Astro Assets.
**Criterio de completado**: Existe el directorio y el archivo con imports estáticos para cada industria, exportando un mapa `Record<string, ImageMetadata>`.
- [ ] Crear directorio `src/assets/industries/`
- [ ] Crear `src/lib/industryImages.ts` con 14 imports estáticos (uno por industria)
- [ ] Exportar mapa `industryImages` indexado por nombre de industria (ej. `'Minería'`, `'Retail'`)
- [ ] Verificar que Astro detecta los imports estáticos (no hay errores de tipado)

### T3 — Extender constantes INDUSTRIES con image y alt
**Archivo(s)**: `src/lib/constants.ts`
**Acción**: Agregar a cada uno de los 14 objetos en `INDUSTRIES` los campos `image` (nombre clave que referencia el mapa de T2) y `alt` (texto descriptivo). Mantener `icon` para backward compatibility.
**Criterio de completado**: El array `INDUSTRIES` tiene 14 objetos, cada uno con `icon`, `name`, `sub`, `color`, `image`, `alt`. No se eliminan ni modifican los campos existentes.
- [ ] Agregar campo `image` a cada industria (referencia al mapa, ej. `'mineria'`)
- [ ] Agregar campo `alt` a cada industria con texto descriptivo específico
- [ ] Verificar que no hay errores de TypeScript (compatibilidad con `IndustryItem`)

---

## Spec: sections/industries-home

**Depends on**: T1, T2, T3

### T4 — Mostrar imagen fotográfica en header de tarjeta de home
**Archivo(s)**: `src/components/sections/IndustriesSection.astro`
**Acción**: Reemplazar el bloque de icono (`ind-card__icon-wrap`) por una imagen fotográfica en la parte superior de la tarjeta. Importar `Image` de `astro:assets` y el mapa de `industryImages`. Usar `object-fit: cover`, aspect-ratio 16:10 (~140px), `loading="lazy"`, `decoding="async"`, dimensiones explícitas.
**Criterio de completado**: Las 14 tarjetas muestran una imagen fotográfica en la parte superior; el texto permanece sobre fondo sólido; no hay CLS.
- [ ] Importar `Image` de `astro:assets`
- [ ] Importar `industryImages` desde `../../lib/industryImages.ts`
- [ ] Destructurar `image` y `alt` del array `INDUSTRIES`
- [ ] Reemplazar `ind-card__icon-wrap` por contenedor `ind-card__image-wrap` con `<Image>`
- [ ] Configurar `width={320}`, `height={200}`, `loading="lazy"`, `decoding="async"`
- [ ] Mantener `icon` como fallback (no mostrar si hay imagen)
- [ ] Verificar que las imágenes se renderizan correctamente en dev

### T5 — Agregar estilos CSS para header image en tarjetas home
**Archivo(s)**: `src/styles/sections/industries.css`
**Acción**: Agregar reglas CSS para `.ind-card__image-wrap` y `.ind-card__image`. Usar `aspect-ratio: 16/10`, `object-fit: cover`, `overflow: hidden`, `border-radius` superior. Mantener estilos existentes del icono como fallback. Respetar `prefers-reduced-motion` en transiciones.
**Criterio de completado**: Las imágenes se muestran con aspect-ratio correcto, sin distorsión, responsive en breakpoints 639px y 479px, sin CLS.
- [ ] Crear `.ind-card__image-wrap` con `aspect-ratio: 16 / 10`, `overflow: hidden`, `border-radius` coherente
- [ ] Crear `.ind-card__image` con `width: 100%`, `height: 100%`, `object-fit: cover`
- [ ] Ajustar `.ind-card` padding/margins si es necesario para integrar la imagen
- [ ] Responsive: ajustar en `@media (max-width: 639px)` y `@media (max-width: 479px)`
- [ ] Verificar `prefers-reduced-motion` heredado (sin cambios requeridos si ya está)

---

## Spec: sections/industries-page

**Depends on**: T1, T2, T3

### T6 — Extender datos de /industrias con image y alt
**Archivo(s)**: `src/pages/industrias.astro`
**Acción**: Agregar campos `image` y `alt` a cada uno de los 14 objetos del array `industries` inline en la página. Los valores deben coincidir con los de `src/lib/constants.ts` para consistencia.
**Criterio de completado**: El array `industries` tiene 14 objetos con `image` y `alt`; no se pierden `description` ni `specialties`.
- [ ] Agregar `image` a cada objeto del array `industries`
- [ ] Agregar `alt` a cada objeto del array `industries`
- [ ] Verificar que el tipo del array local es consistente (TypeScript no marca errores)

### T7 — Mostrar imagen fotográfica en header de tarjeta expandida
**Archivo(s)**: `src/pages/industrias.astro`
**Acción**: En el layout de tarjeta expandida, agregar una imagen fotográfica en la parte superior con aspect-ratio 16:9 (~180px). Importar `Image` de `astro:assets` y el mapa de imágenes. El contenido textual (título, descripción, especialidades) debe permanecer sobre fondo sólido debajo de la imagen.
**Criterio de completado**: Las 14 tarjetas expandidas muestran imagen en header; texto legible sobre fondo sólido; no hay CLS; lazy loading; responsive en 639px y 479px.
- [ ] Importar `Image` de `astro:assets`
- [ ] Importar `industryImages` desde `../lib/industryImages.ts`
- [ ] Agregar contenedor `.industry-card__image` dentro del `<article>` antes del header
- [ ] Usar `<Image>` con `width={400}`, `height={225}`, `loading="lazy"`, `decoding="async"`
- [ ] Ajustar estructura para que imagen quede por encima del header con icono+título
- [ ] Agregar estilos inline o en `<style>` para `aspect-ratio: 16/9`, `object-fit: cover`, `overflow: hidden`
- [ ] Responsive: ajustar en `@media (max-width: 640px)`
- [ ] Verificar que no hay regresiones en contenido textual

---

## Notas de implementación

- **No aplica TDD** para este cambio: es un rediseño visual sin lógica de negocio que requiera tests unitarios. La verificación se hará manualmente y via `sdd-verify`.
- **Backward compatibility**: El campo `icon` se mantiene en `INDUSTRIES` y en tipos. En home, si una industria no tiene imagen, podría mostrarse el icono como fallback.
- **Performance**: Todas las imágenes usan `loading="lazy"` y `decoding="async"`. Astro + Sharp generarán WebP/AVIF en build time.
- **Accesibilidad**: Cada imagen tiene `alt` descriptivo específico en los datos. No usar `alt=""` ni `role="presentation"`.
- **Estilos**: Mantener CSS module en `industries.css`. Convención BEM para nuevas clases (`.ind-card__image`, `.industry-card__image`).
