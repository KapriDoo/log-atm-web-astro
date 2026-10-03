---
type: external-input
domain: fix
change_name: fix-i18n-links-and-404
fast_path: full
priority: P1
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 03 — Links internos sin locale y 404 no localizada

**Despacho:** `sdd new fix-i18n-links-and-404 --domain fix --path full --integration-target main --input-file .sdd/briefs/auditoria-2026-10/03-fix-i18n-links-and-404.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: validación de auditoría (hallazgos B4 ampliado y B5). Idiomas vigentes: `es` (sin prefijo), `en`, `pt`.

## Problema 1 — Links internos que sacan al usuario de su idioma (severidad Media)

En `/en/...` y `/pt/...` varios links llevan a la versión en español:

| Origen | Evidencia | Efecto medido en `dist/client` |
|--------|-----------|-------------------------------|
| `SERVICES[].href = '/servicios'` | `src/lib/constants.ts:103-191`; consumidores sin helper: `src/components/**/ServicesSection.astro:52`, `src/pages/servicios.astro:83` | `en/index.html`: 3 cards → `/servicios`; `en/servicios/`: 8 cards → `/servicios` |
| `SERVICES[].href = '/cotizar'` (Consultoría) | `constants.ts:125` | 1 card → `/cotizar` en cada página |
| CTA `/contacto` | `src/pages/industrias.astro:141` | 12 CTAs en `/en/industrias/` |
| CTA `/contacto` | `src/pages/servicios.astro:124` | 6 CTAs en `/en/servicios/` |

`buildLocaleUrl` ya existe (se usa en `ServicesSection.astro:9` para otros links). Además, en `/servicios` las cards son self-links al mismo catálogo.

## Problema 2 — La 404 siempre sale en español (severidad Media)

- Existen `src/pages/404.astro` y `src/pages/[lang]/404.astro` (el build genera `404.html`, `en/404/index.html`, `pt/404/index.html`).
- En runtime (adapter `@astrojs/cloudflare`): `dist/server/wrangler.json` no define `not_found_handling`; no hay middleware, `_redirects` ni `_routes.json`. Ante un asset inexistente, el worker hace `app.render` y el default handler de Astro fija `errorRoutePath = "/404"` sin considerar el locale.
- Verificado en `astro preview` (workerd): `/en/ruta-inexistente`, `/pt/...` y `/en/ruta/profunda/x` → **404 con `lang="es-CL"`, "Página no encontrada"**. `/en/404/` responde 200 en inglés.
- No verificable localmente el comportamiento exacto en Cloudflare productivo (`preview_urls = false` en `wrangler.toml`).

## Estado deseado

1. Ningún link interno en páginas `en`/`pt` apunta a una ruta de otro idioma.
2. En `/servicios` (todas las variantes) las cards no se enlazan a sí mismas.
3. Una ruta inexistente bajo `/en/` o `/pt/` responde 404 con la página de error en ese idioma; el resto, en español. Siempre con status 404 y `noindex`.

## Pistas de diseño (validadas, a confirmar en sdd-design)

- Links: aplicar `buildLocaleUrl(lang, href)` en todos los consumidores (no en los datos de `constants.ts`, que deben seguir siendo agnósticos de idioma).
- 404: renderizar la 404 bajo demanda (`export const prerender = false` en la 404) eligiendo el locale desde `Astro.url.pathname`. Un middleware **no** alcanza la 404 prerenderizada, y `not_found_handling = "404-page"` de Workers Static Assets busca `404.html` por directorio (las variantes están en `en/404/index.html`), así que no resuelve el caso sin mover archivos.
- Evaluar si `src/pages/[lang]/404.astro` sigue siendo necesario después del cambio (YAGNI: una sola 404 con detección de locale).

## Criterios de aceptación

- [ ] Barrido automatizado de `dist/client/en/**/*.html` y `dist/client/pt/**/*.html`: ningún `<a href>` interno (excluyendo `/_astro/`, `/api/`, assets y anclas) apunta a una ruta sin el prefijo de su idioma.
- [ ] En `/servicios`, `/en/servicios` y `/pt/servicios` las cards de servicio no contienen un link a la propia página.
- [ ] `astro preview`: `/en/no-existe` → 404, `lang` inglés, copy en inglés; `/pt/no-existe` → 404 en portugués; `/no-existe` → 404 en español. Todas con `noindex`.
- [ ] Rutas existentes y la API no cambian de comportamiento.
- [ ] Post-deploy en producción: verificación manual de `https://logatm.com/en/no-existe`.

## Fuera de alcance

- Reestructurar `SERVICES` en `constants.ts` (copy vs datos) → brief 07 (depende de este).
- Specs i18n "3 locales" → brief 08.
