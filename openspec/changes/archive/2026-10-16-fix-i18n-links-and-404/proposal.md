# Propuesta

## Por qué

En las páginas `/en/...` y `/pt/...` varios links internos llevan a la versión en español (cards de servicios, CTAs de `/contacto`, y los `href="/"` de breadcrumbs y de «volver al inicio»), y las cards del catálogo en `/servicios` se enlazan a sí mismas. Además, una ruta inexistente bajo `/en/` o `/pt/` responde 404 siempre en español, porque el handler por defecto de Astro en el worker fija `errorRoutePath = "/404"` sin mirar el locale. Ambos problemas sacan al usuario de su idioma.

## Qué cambia

**Entra:**
- Aplicar `buildLocaleUrl(lang, href)` en todos los consumidores de links internos sin locale: `SERVICES[].href` (`src/components/**/ServicesSection.astro`, `src/pages/servicios.astro`), CTAs `/contacto` en `industrias.astro` y `servicios.astro`, y los `href="/"` de breadcrumbs (`industrias`, `contacto`, `cotizar`, `nosotros`, `servicios`) y de `cotizar.astro:342`. Los datos de `src/lib/constants.ts` siguen agnósticos de idioma.
- En `/servicios` (es, en, pt) las cards de servicio dejan de enlazarse a sí mismas.
- La 404 se renderiza bajo demanda (`prerender = false`) y elige el idioma desde `Astro.url.pathname` (`/en/...` → inglés, `/pt/...` → portugués, el resto → español). Siempre status 404 y `noindex`.

**Fuera de alcance** (un hallazgo del review sobre esto se anota como deuda, sin corregirlo aquí):
- Reestructurar `SERVICES` (copy vs datos) → brief 07.
- Specs i18n «3 locales» → brief 08.
- Cualquier otro cambio en rutas existentes o en la API.

**Criterios de aceptación:**
- Barrido automatizado de `dist/client/en/**/*.html` y `dist/client/pt/**/*.html`: ningún `<a href>` interno (excluyendo `/_astro/`, `/api/`, assets y anclas) apunta a una ruta sin el prefijo de su idioma.
- En `/servicios`, `/en/servicios` y `/pt/servicios` las cards de servicio no contienen un link a la propia página.
- `astro preview`: `/en/no-existe` → 404, `lang` inglés, copy en inglés; `/pt/no-existe` → 404 en portugués; `/no-existe` → 404 en español. Todas con `noindex`.
- Rutas existentes y la API no cambian de comportamiento.
- Post-deploy en producción: verificación manual de `https://logatm.com/en/no-existe`.

## Preguntas

1. **¿Se elimina `src/pages/[lang]/404.astro`?** Recomendación: sí, si tras el cambio la 404 única cubre los tres idiomas (YAGNI). Se confirma en el diseño; si algo depende de `/en/404/`, se conserva.
2. **¿Qué hacen las cards de servicio en `/servicios`?** Recomendación: renderizarlas sin `<a>` (como `<div>`/`<article>`), salvo la de Consultoría, que enlaza a `/cotizar` (con locale), porque no es un self-link.
3. **¿Los breadcrumbs `href="/"` entran?** Recomendación: sí; el criterio 1 los alcanza, y el barrido los marcaría.

## Capabilities

### New Capabilities
- `i18n-internal-links`: los links internos de las páginas `en`/`pt` conservan el prefijo de su idioma; las cards de `/servicios` no se enlazan a sí mismas.
- `localized-not-found`: una ruta inexistente responde 404 con `noindex` y la página de error en el idioma del prefijo de la URL (`en`, `pt`; el resto en español).

### Modified Capabilities

## Impacto

- Código: `src/pages/{industrias,servicios,contacto,cotizar,nosotros}.astro`, `src/components/**/ServicesSection.astro`, `src/pages/404.astro` y posiblemente `src/pages/[lang]/404.astro`. `constants.ts` no cambia.
- La 404 pasa a ejecutarse en el worker de Cloudflare (SSR) en vez de ser estática; sin dependencias nuevas.
- Riesgo: medio. El comportamiento en Cloudflare productivo no es verificable localmente (`preview_urls = false`); se verifica a mano post-deploy. Sin tests automatizados: se verifica con `npm run build`, `npm run validate-i18n` y el barrido sobre `dist/client`.
