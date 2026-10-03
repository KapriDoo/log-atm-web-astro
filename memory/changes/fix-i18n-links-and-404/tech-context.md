---
type: tech-context
change_name: "fix-i18n-links-and-404"
libraries:
  - "astro@6.3.1"
  - "@astrojs/cloudflare@13.5.0"
consulted: "2026-10-02"
source: "context7 /withastro/docs"
tags: [tech-context]
---

# Tech context: fix-i18n-links-and-404

Librerías: `astro@6.3.1`, `@astrojs/cloudflare@13.5.0` (versiones instaladas en `node_modules` del repo principal). Consulta context7 única: 2026-10-02.

## astro@6.3.1

### Página 404 personalizada

- `src/pages/404.astro` define la página de error 404. Prerenderizada, se emite como `404.html` y el proveedor de deploy la encuentra (docs: *Astro pages → Custom 404 Error Page*).
- Una página puede salir del prerender con `export const prerender = false` en su frontmatter; el resto del sitio sigue estático. Requiere adapter (el proyecto ya lo tiene: las rutas `src/pages/api/*.ts` declaran `prerender = false`) (docs: *On-demand rendering → Enabling on-demand rendering*).
- Con `output: 'static'` + adapter, una ruta no encontrada llega al handler del adapter, que invoca `app.render(request, …)`. El manejador de error por defecto busca la ruta `/404`:
  - si está **prerenderizada**, la obtiene con `prerenderedErrorPageFetch` (en Cloudflare, desde el binding `ASSETS` → `/404.html`), sin locale;
  - si es **bajo demanda**, renderiza el componente con el `pathname` real de la request, por lo que `Astro.url.pathname` conserva el prefijo (`/en/...`). Comportamiento verificado en `astro preview` (workerd) por `sdd-explore`; no figura como contrato público en la doc, depende de `node_modules/astro/dist/core/errors/default-handler.js`.
- `RenderOptions.prerenderedErrorPageFetch` es sobreescribible en entrypoints propios (`astro/app/entrypoint`); el proyecto no tiene entrypoint propio y este cambio no lo introduce.
- i18n: `i18n.fallback` declara redirecciones por locale para páginas faltantes; sin `fallback`, una página no disponible devuelve 404. El proyecto omite `fallback` a propósito (colisión con `src/pages/[lang]/*.astro`).

## @astrojs/cloudflare@13.5.0

- Las rutas de assets estáticos se resuelven por estructura de archivos en el directorio de build; si no hay coincidencia, la request cae al Worker para render bajo demanda (docs: *Cloudflare Platform → Routes*).
- `assets.not_found_handling = "404-page"` (wrangler) sirve un `404.html` por directorio de la ruta solicitada; requiere el archivo físico por directorio. Descartado en este cambio (ver `design.md` D2).
- El adapter genera `dist/server/wrangler.json` (`name`, `main`, `assets`) en build; `wrangler.toml` del repo no los duplica.
- Los handlers "companion" para routing avanzado existen desde `13.6.0`; no aplican (versión instalada 13.5.0, sin entrypoint propio).
