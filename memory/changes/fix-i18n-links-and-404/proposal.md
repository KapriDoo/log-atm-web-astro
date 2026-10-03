---
type: proposal
change_name: "fix-i18n-links-and-404"
domain: "fix"
status: approved
iteration: 1
effort: S
risks:
  - descripcion: "El comportamiento de Cloudflare en producción ante rutas inexistentes difiere del verificado en astro preview (workerd)"
    probabilidad: Media
    mitigacion: "AC post-deploy declarado en el PR: verificación manual de https://logatm.com/en/no-existe, /pt/no-existe y /no-existe"
  - descripcion: "La 404 bajo demanda emite selector de idioma, canonical, og:url, hreflang y BreadcrumbList apuntando a la URL inexistente"
    probabilidad: Media
    mitigacion: "Selector de la 404 apunta a los homes por locale vía prop de Navbar (sin editar LanguageSelector.astro) y BaseLayout omite canonical/og:url/hreflang/BreadcrumbList cuando noindex=true (hoy solo lo usa la 404)"
  - descripcion: "Dependencia de un detalle interno del DefaultErrorHandler de Astro 6.3 (errorState.pathname conserva el path real en la 404 no prerenderizada)"
    probabilidad: Baja
    mitigacion: "AC de preview con /no-existe, /en/no-existe y /pt/no-existe como verificación repetible ante upgrades de Astro"
  - descripcion: "Regresión futura: un href interno nuevo hardcodeado sin buildLocaleUrl vuelve a sacar al usuario de su idioma"
    probabilidad: Media
    mitigacion: "El barrido de dist/client/{en,pt} queda como script versionado en scripts/ (junto a axe-audit.mjs), ejecutable tras el build"
created: "2026-10-02"
updated: "2026-10-02"
tags: [proposal]
---

# Propuesta: fix-i18n-links-and-404

## Intent

En `/en/**` y `/pt/**` varios links internos llevan a la versión en español, y una ruta inexistente bajo `/en/` o `/pt/` responde con la 404 en español (`lang="es-CL"`). El cambio hace que la navegación interna conserve el idioma de la página y que la 404 se sirva en el idioma del prefijo, cumpliendo el requisito vigente de [[i18n-routing-locale-prefixes]] que hoy no se cumple.

## Scope

**Incluye:**
- Localizar con `buildLocaleUrl` los hrefs de las cards de `SERVICES` en sus dos consumidores (`ServicesSection.astro:52`, `servicios.astro:83`) y los CTAs `/contacto` (`servicios.astro:124`, `industrias.astro:141`).
- Quitar el self-link de las cards en `/servicios` (las que apuntan a `/servicios` se renderizan como `svc-card--static`); Consultoría conserva su link localizado a `/cotizar`. En home las cards siguen enlazando a `/servicios` localizado.
- **Ampliación respecto del brief** (hallazgo de exploración, necesaria para que pase el AC de barrido): breadcrumb "Inicio" `href="/"` en las 5 páginas internas y botón "volver al inicio" del wizard (`cotizar.astro:57,342`).
- 404: `export const prerender = false` en `src/pages/404.astro` (locale desde `Astro.url` con `getLangFromUrl`, ya presente) y eliminación de `src/pages/[lang]/404.astro`.
- Mitigación del efecto colateral de la 404 bajo demanda en `Navbar.astro` (prop opcional de path para el selector) y `BaseLayout.astro` (sin canonical/og:url/hreflang/BreadcrumbList cuando `noindex`).
- Script de barrido de `dist/client/{en,pt}/**/*.html` que excluye `/_astro/`, `/api/`, assets, anclas y `a[hreflang]` (links del selector, legítimos por diseño).
- Delta/spec del comportamiento 404 en runtime y de la localización de links internos (sdd-spec decide forma).

**Excluye explícitamente:**
- Archivos del PR #33: `LanguageSelector.astro`, `src/scripts/wizard.ts`, `scripts/generate-favicons.mjs`, `public/apple-touch-icon.png`.
- Reestructurar `SERVICES` en `constants.ts` (brief 07): los datos quedan agnósticos de idioma, sin cambios.
- Specs i18n de "3 locales" vs. 6 idiomas (brief 08).
- `name: 'Inicio'` fijo del JSON-LD `BreadcrumbList` en páginas indexables (deuda registrada, fuera del AC).
- Verificación en producción: queda como criterio post-deploy declarado en el PR.

## Approach Propuesto

**L1 + N1** de la exploración. Links: `buildLocaleUrl(lang, href)` en cada consumidor, sin helper ni componente nuevo (2 consumidores no justifican abstracción). 404: una sola página renderizada bajo demanda; validado en workerd (variante B): `/en/no-existe` → 404 `en-US`, `/pt/no-existe` → 404 `pt-BR`, `/no-existe` → 404 `es-CL`, todas `noindex`; rutas existentes y `/api/contacto` sin cambios; `/en/404/` pasa de 200 a 404. Como `noindex` solo lo usa la 404, condicionar los metadatos SEO a `noindex` en `BaseLayout` no afecta otras páginas. El selector se resuelve desde `Navbar` pasando `/` como path, sin tocar `LanguageSelector.astro`. Verificación: barrido de `dist` + `astro preview` (workerd) + animación GSAP de [[scroll-404-effect]] intacta.

## Esfuerzo Estimado

Cambios mecánicos y localizados en ~10 archivos `.astro` más un script de barrido; el comportamiento de la 404 ya está validado empíricamente, por lo que no hay investigación pendiente. Sin tests automatizados en el proyecto: la verificación es build + barrido + preview.

## Riesgos

- Producción vs. preview: se infiere de `handler.js` del adapter y del preview en workerd; se cierra con el AC post-deploy.
- Selector/SEO de la 404: sin la mitigación, el selector ofrece tres 404 y los metadatos apuntan a URLs inexistentes; con ella, salidas útiles a los homes y sin señales SEO contradictorias.
- Detalle interno de Astro: el AC de preview detecta un cambio de comportamiento tras un upgrade.
- Regresión de links: el script versionado permite repetir el barrido.

## Trade-offs

- **A favor**: cambio mínimo con el helper existente (KISS); una sola 404 (SSOT/YAGNI); sin middleware ni configuración de Workers nueva; elimina además el 307 por hrefs sin trailing slash.
- **En contra**: la localización queda repetida en cada consumidor (DRY relativo, aceptado frente a una abstracción para 2 usos); la 404 pasa a renderizarse por request (coste mínimo, ya pasaba por el worker) y deja de existir `404.html` estático; el script de barrido es un artefacto nuevo a mantener; la ampliación a breadcrumbs/backHome excede la tabla del brief.
