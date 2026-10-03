# Exploración: fix-i18n-links-and-404

Rutas `src/...` relativas a `log-atm-web-astro/`. Verificación runtime hecha en una copia aislada del worktree (git archive + build + `astro preview` sobre workerd, bajo el directorio de temporales); el worktree no se modificó.

## Estado Actual

### Links internos (Problema 1)

- `SERVICES[]` guarda `href` agnóstico de idioma: `'/servicios'` en 8 ítems (n=03,04,06,07,08,09,10,11), `'/cotizar'` en Consultoría (n=05), `null` en Aérea/Marítima (cards no clicables, spec vigente [[services-catalog-cta-and-detail-pages]]). [fuente: código src/lib/constants.ts:81-191]
- Dos consumidores renderizan `s.href` crudo: `ServicesSection.astro:52` (home, 6 cards destacadas) y `servicios.astro:83` (catálogo, 11 cards). `ServicesSection` ya calcula `servicesHref = buildLocaleUrl(currentLang, '/servicios')` para el botón "ver todos", pero no lo aplica a las cards. [fuente: código src/components/sections/ServicesSection.astro:9,52,74; src/pages/servicios.astro:78-86]
- CTAs hardcodeados: `servicios.astro:124` (`/contacto`, 6 filas de detalle) e `industrias.astro:141` (`/contacto`, 12 filas). [fuente: código src/pages/servicios.astro:124, src/pages/industrias.astro:141]
- **Hallazgo adicional no listado en el brief** (también viola el AC de barrido): `<a href="/">` hardcodeado en el breadcrumb "Inicio" de las 5 páginas internas (`servicios.astro:45`, `industrias.astro:43`, `contacto.astro:28`, `nosotros.astro:35`, `cotizar.astro:57`) y en el botón "volver al inicio" de la pantalla de éxito del wizard (`cotizar.astro:342`). Confirmado en `dist/client`: `en/contacto`, `en/nosotros`, `en/cotizar` (2), `en/industrias`, `en/servicios` contienen `<a href="/">` fuera de selector. [fuente: código; barrido de dist/client]
- Barrido (script en el directorio de temporales, sobre `dist/client/{en,pt}/**/*.html`, solo `<body>`, excluyendo `/_astro/`, `/api/`, assets, anclas): violaciones reales = `/servicios` (3 en home, 8 en servicios), `/cotizar` (1 en home, 1 en servicios), `/contacto` (12 industrias, 6 servicios) y `/` (breadcrumbs y backHome). Idénticas en `pt`. [fuente: código/barrido]
- **Falsos positivos del AC de barrido**: `LanguageSelector.astro:31,66` emite, por diseño, un link a cada locale (incluido el español sin prefijo y el otro idioma no-actual) con `hreflang`/`lang`. El barrido del AC debe excluir `a[hreflang]` (o el contenedor `.lang-selector`), si no marcará como violación los links legítimos `/<ruta>/`, `/pt/<ruta>/`. [fuente: código src/components/ui/LanguageSelector.astro:25-80]
- Navbar, Footer, Hero, CTASection, IndustriesSection ya usan `buildLocaleUrl`; no requieren cambio. [fuente: código grep de `href=` en src/components]
- `buildLocaleUrl(lang, '/x')` devuelve `/x/` (es) o `/<lang>/x/`, con trailing slash. Los hrefs de `SERVICES` salen hoy sin slash final (`/servicios`), lo que además provoca un 307 en preview. [fuente: código src/i18n/utils.ts:46-57]
- Self-link: en `/servicios` (3 variantes) las 8 cards con `href='/servicios'` enlazan a la propia página. La clase `.svc-card--static` ya existe (cursor default, sin hover) y se usa para cards sin href. [fuente: código src/styles/sections/services.css:35-36; servicios.astro:79-85]
- Sin tests automatizados en el proyecto (solo `scripts/validate-i18n.ts` y `scripts/axe-audit.mjs`); la verificación es por barrido de `dist` y `astro preview`. [fuente: código package.json, scripts/]

### 404 (Problema 2)

- `src/pages/404.astro` (es, deriva el locale de `Astro.props.lang ?? getLangFromUrl(Astro.url)`), más `src/pages/[lang]/404.astro` que delega con `lang={Astro.params.lang}` y `getStaticPaths` sobre `NON_DEFAULT_LOCALES`. Ambas se prerenderizan: `404.html`, `en/404/index.html`, `pt/404/index.html`. [fuente: código src/pages/404.astro:1-12; src/pages/[lang]/404.astro]
- Runtime: el handler del adapter hace `app.render`; para una ruta no encontrada el `DefaultErrorHandler` de Astro fija `errorRoutePath = "/404"` sin considerar locale y, si la ruta 404 es prerenderizada, la sirve vía `prerenderedErrorPageFetch` desde `ASSETS` (`/404.html`). No hay middleware, `_redirects`, `_routes.json` ni `not_found_handling`. [fuente: código node_modules/astro/dist/core/errors/default-handler.js; node_modules/@astrojs/cloudflare/dist/utils/handler.js; dist/server/wrangler.json]
- Si la ruta 404 NO es prerenderizada, el handler renderiza el componente con `errorState.pathname` = path real de la request, por lo que `Astro.url.pathname` conserva `/en/...`. [fuente: código default-handler.js]
- La config i18n de Astro (`prefixDefaultLocale: false`, sin `fallback`) no interfiere. [fuente: código astro.config.mjs:64-75]
- Sin spec que cubra el 404 en runtime: [[i18n-routing-locale-prefixes]] ya exige "devolver la versión 404 en el idioma del prefijo cuando la URL incluye prefijo válido y el resto del path no existe" (el fix cumple un requisito vigente, hoy incumplido; el spec habla de 6 idiomas, desfase tratado en el brief 08). [[scroll-404-effect]] declara `src/pages/404.astro` en su scope (animación GSAP del "404"). Ninguna es stale por criterio `verified_at` (null / sin commits posteriores relevantes).

### Verificación empírica de la pista de diseño (copia aislada, workerd)

Variante A: `export const prerender = false` en `404.astro`, manteniendo `[lang]/404.astro`. Variante B: A + eliminar `[lang]/404.astro`. Resultados (status / `<html lang>`; `noindex, nofollow` presente en todas):

| URL | Variante A | Variante B |
|-----|-----------|-----------|
| `/no-existe` | 404 / es-CL | 404 / es-CL |
| `/en/no-existe`, `/en/no-existe/` | 404 / en-US, "Page not found" | 404 / en-US |
| `/pt/no-existe` | 404 / pt-BR, "Página não encontrada" | 404 / pt-BR |
| `/en/ruta/profunda/x` | 404 / en-US | 404 / en-US |
| `/es/no-existe` | 404 / es-CL | no probado (igual lógica) |
| `/_astro/nope.js`, `/api/nope` | 404 / es-CL (HTML) | 404 / es-CL (HTML) |
| `/en/404/`, `/pt/404/` | **200** (ruta prerenderizada normal, noindex) | **404** (en/pt) |
| `/404/`, `/404` | 404 | 404 |
| rutas existentes (`/en/servicios/`, `/en/`) | 200 | 200 |
| `POST /api/contacto` vacío / `GET` | 400 / 405 (sin cambios) | 400 / 405 |

- El build con `prerender = false` ya no emite `dist/client/404.html`; en la variante B tampoco `en/404/` ni `pt/404/`. Ningún consumidor del repo referencia esos archivos (sitemap sin entradas 404; sin nginx/redirect que los use en el flujo Workers). [fuente: código/build]
- **Efecto colateral confirmado de renderizar bajo demanda**: Navbar, LanguageSelector y BaseLayout derivan todo de `Astro.url.pathname`. En `/en/no-existe` la 404 emite: selector ES/EN/PT → `/no-existe/`, `/en/no-existe/`, `/pt/no-existe/` (cada uno otra 404 en su idioma); `canonical`, `og:url`, 4 `hreflang` alternates y el `BreadcrumbList` JSON-LD apuntan a la URL inexistente. Antes (prerender) apuntaban a `/404/`, `/pt/404/`, etc. (páginas existentes). Con `noindex` el riesgo SEO es bajo, pero el selector deja de ofrecer una salida útil. [fuente: código src/layouts/BaseLayout.astro:42-62; src/components/ui/Navbar.astro:7-9; probe]

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| src/components/sections/ServicesSection.astro | Cards de servicios en home | `href` de cards (líneas 52) sin localizar → aplicar `buildLocaleUrl` |
| src/pages/servicios.astro | Catálogo + detalle de servicios | Cards (83) con href crudo y self-link; CTA `/contacto` (124); breadcrumb `/` (45) |
| src/pages/industrias.astro | Página industrias | CTA `/contacto` (141, 12 filas); breadcrumb `/` (43) |
| src/pages/contacto.astro, nosotros.astro | Páginas internas | breadcrumb `/` (28, 35) |
| src/pages/cotizar.astro | Wizard cotización | breadcrumb `/` (57) y backHome `/` (342) |
| src/lib/constants.ts | Datos `SERVICES` | Se mantiene agnóstico; solo lectura (restructurar `SERVICES` es brief 07) |
| src/i18n/utils.ts | `buildLocaleUrl`, `getLangFromUrl` | Sin cambio; es el helper a reutilizar |
| src/pages/404.astro | 404 (es y base de las demás) | `prerender = false`; locale vía `getLangFromUrl(Astro.url)` ya presente |
| src/pages/[lang]/404.astro | 404 localizada prerenderizada | Candidato a eliminar (YAGNI) |
| src/components/ui/Navbar.astro, LanguageSelector.astro, src/layouts/BaseLayout.astro | Derivan paths de `Astro.url.pathname` | Posible ajuste para la 404 bajo demanda (ver riesgos) |
| src/styles/sections/services.css | `.svc-card--static` | Reutilizable para cards sin link (solo lectura) |
| memory/specs i18n-routing, scroll-404-effect | Specs que mencionan la 404 | Posible spec nueva/delta para el comportamiento 404 runtime |

No tocar (PR #33): LanguageSelector, wizard.ts, favicons — nota: `LanguageSelector.astro` está en la lista de archivos del PR #33, así que cualquier ajuste del selector para la 404 debe resolverse sin editarlo (p. ej. desde Navbar/BaseLayout) o diferirse.

## Approaches Posibles

### Links

#### Approach L1: `buildLocaleUrl` en cada consumidor, `constants.ts` intacto
- **Pros**: sigue la pista del brief; datos agnósticos; cambio mínimo (2 componentes + 2 CTAs + 6 breadcrumbs/backHome); usa el helper existente.
- **Contras**: la localización se repite en varios sitios (DRY relativo); el riesgo de regresión futura es el mismo (nuevo `href="/x"` hardcodeado).
- **Esfuerzo**: S

#### Approach L2: helper de enlace compartido (p. ej. componente/función `localizedHref(lang, path)` o prop `href` ya resuelto en una lista de cards común)
- **Pros**: centraliza; evita divergencia entre Home y catálogo.
- **Contras**: abstracción nueva para 2 consumidores (YAGNI); la reestructura de `SERVICES` es explícitamente del brief 07.
- **Esfuerzo**: M

Self-link en `/servicios`: en el catálogo, tratar el `href` que apunta a `/servicios` como no-link (render `div` con `svc-card--static`) conservando el link de Consultoría a `/cotizar`; en home se mantiene el link a `/servicios` localizado.

### 404

#### Approach N1: `prerender = false` en `404.astro` y eliminar `[lang]/404.astro` (variante B)
- **Pros**: probado en workerd; 404 localizada para cualquier ruta bajo `/en/` y `/pt/`; también corrige que `/en/404/` respondía 200; una sola 404 (YAGNI/SSOT); no hay middleware ni archivos de config nuevos.
- **Contras**: deja de existir `404.html` estático; el HTML se renderiza por request (coste mínimo, ya pasaba por el worker); efecto colateral en selector/canonical/hreflang (ver riesgos).
- **Esfuerzo**: S

#### Approach N2: `prerender = false` y conservar `[lang]/404.astro`
- **Pros**: cambio aún menor.
- **Contras**: queda una ruta duplicada innecesaria y `/en/404/` sigue respondiendo 200.
- **Esfuerzo**: XS

#### Approach N3: `not_found_handling = "404-page"` en wrangler + mover variantes a `404.html` por directorio
- **Pros**: assets estáticos puros.
- **Contras**: Workers Static Assets busca `404.html` por directorio de la ruta solicitada, no resuelve rutas arbitrarias profundas sin mover archivos ni generar un 404 por cada prefijo; descartado por el brief.
- **Esfuerzo**: M

#### Approach N4: middleware que reescriba a la 404 según locale
- **Pros**: ninguno frente a N1.
- **Contras**: un middleware no alcanza la 404 prerenderizada (dato del brief); innecesario cuando la 404 es bajo demanda.
- **Esfuerzo**: M

## Recomendación

**Approach recomendado**: L1 + N1.
**Justificación**: L1 es el cambio mínimo que respeta KISS/YAGNI y la pista del brief; N1 está validado empíricamente (status 404, `lang` y copy correctos, `noindex`, rutas y API sin cambios) y elimina la 404 duplicada. sdd-design debe decidir: (a) incluir en el alcance los links `/` de breadcrumb y backHome (violan el AC de barrido; recomendado incluirlos); (b) cómo tratar selector/canonical/hreflang en la 404 bajo demanda (opciones: aceptarlo por ser `noindex`; o que la 404 no emita hreflang/canonical y que el selector apunte a los homes por locale; el selector no puede editarse en `LanguageSelector.astro` si se respeta la exclusión del PR #33); (c) definir el AC de barrido excluyendo `a[hreflang]`.

## Riesgos Identificados

- Dependencia del comportamiento interno del `DefaultErrorHandler` de Astro 6.3.1 (`errorState.pathname` = path real): una actualización mayor podría cambiarlo; mitigación: el AC de preview con las tres rutas queda como verificación repetible.
- Producción Cloudflare no verificable localmente (`preview_urls = false`): el comportamiento del asset-binding frente a rutas inexistentes se infiere de `handler.js` y del preview en workerd; mitigación: AC post-deploy `https://logatm.com/en/no-existe` declarado en el PR.
- Selector de idioma y metadatos SEO de la 404 bajo demanda apuntan a URLs inexistentes (ver estado actual); riesgo bajo por `noindex`, pero degrada la UX del selector.
- Alcance ampliado: los links `/` de breadcrumb/backHome (6 sitios en 5 archivos) no están en la tabla del brief; si se omiten, el AC de barrido no puede pasar.
- JSON-LD `BreadcrumbList` en `BaseLayout.astro:115-122` usa `name: 'Inicio'` fijo en los 3 idiomas (no es un `<a href>`, fuera del AC; se registra como deuda).
- Trailing slash: `buildLocaleUrl` normaliza a `/x/`; los hrefs actuales sin slash (`/servicios`) generan hoy un 307 en preview; el cambio de L1 lo elimina como efecto lateral benigno.
- Los specs de 404 en `i18n-routing` y `scroll-404-effect` hablan de rutas prerenderizadas / 6 idiomas; sdd-spec debe decidir delta vs. nueva spec sin entrar en el alcance del brief 08.
