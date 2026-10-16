# Tasks

## 1. Links internos con locale

- [x] 1.1 Localizar con `buildLocaleUrl` el `href` de las cards de `ServicesSection` (Links internos con el prefijo del idioma); verificar leyendo que `/en/` y `/pt/` generan `/en/servicios/` y `/pt/servicios/`. archivos: `log-atm-web-astro/src/components/sections/ServicesSection.astro`
- [x] 1.2 Localizar breadcrumb `href="/"` y CTA `/contacto` en `industrias.astro`, y breadcrumbs en `contacto.astro` y `nosotros.astro` (Links internos con el prefijo del idioma); verificar con `npm run build --prefix log-atm-web-astro` y leyendo que no queda `href="/"` ni `href="/contacto"` literal. archivos: `log-atm-web-astro/src/pages/industrias.astro`, `log-atm-web-astro/src/pages/contacto.astro`, `log-atm-web-astro/src/pages/nosotros.astro`
- [x] 1.3 Localizar breadcrumb y «volver al inicio» (línea 342) en `cotizar.astro` (Links internos con el prefijo del idioma); verificar leyendo el código y con `npm run build --prefix log-atm-web-astro`. archivos: `log-atm-web-astro/src/pages/cotizar.astro`

## 2. Catálogo de servicios

- [x] 2.1 En `servicios.astro`, localizar breadcrumb y CTA `/contacto`, y renderizar las cards sin `<a>` salvo Consultoría hacia `/cotizar` localizado (Las cards de /servicios no se enlazan a sí mismas); verificar con el barrido de `dist/client/{,en/,pt/}servicios/index.html` tras `npm run build --prefix log-atm-web-astro`. archivos: `log-atm-web-astro/src/pages/servicios.astro`

## 3. 404 localizada

- [x] 3.1 Hacer la 404 bajo demanda (`prerender = false`), con el idioma desde la URL, y eliminar `[lang]/404.astro` (404 en el idioma del prefijo de la URL); verificar `npm run build --prefix log-atm-web-astro` y `npm run validate-i18n --prefix log-atm-web-astro`. archivos: `log-atm-web-astro/src/pages/404.astro`, `log-atm-web-astro/src/pages/[lang]/404.astro`
