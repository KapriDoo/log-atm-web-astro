# Diseño

## Contexto

Ver la propuesta para la motivación. `buildLocaleUrl(lang, path)` ya existe en `src/i18n/utils.ts` y lo usan Navbar, Footer y las secciones; los consumidores listados en la propuesta tienen paths sin locale hardcodeados. `SERVICES[].href` en `constants.ts` es agnóstico de idioma y se mantiene así. Las páginas `[lang]/*.astro` reutilizan la página raíz con un prop `lang`, por lo que basta cambiar la página raíz. La 404 actual es estática: `404.astro` más `[lang]/404.astro`, que solo la reenvía.

## Objetivos / No objetivos

**Objetivos:**
- Links internos con prefijo de idioma en en/pt.
- Cards de `/servicios` sin self-link.
- Una única 404 bajo demanda que elige el idioma por la URL.

**No objetivos:**
- Reestructurar `SERVICES` (brief 07) o las specs i18n de «3 locales» (brief 08).
- Tocar otras rutas o la API.

## Decisiones

- **Localizar en el consumidor**: cada página/componente aplica `buildLocaleUrl(currentLang, href)` al renderizar. Alternativa descartada: localizar `constants.ts`, que lo ataría a un idioma.
- **Cards de `/servicios`**: se renderizan como `<a>` solo si el destino no es `/servicios` (hoy solo Consultoría, hacia `/cotizar`, localizado); el resto, `<div>` con la clase `svc-card--static` existente. Se resuelve en `servicios.astro`; la home sigue enlazando a `/servicios`, localizado.
- **404 bajo demanda**: `export const prerender = false` en `404.astro`; el idioma sale de `getLangFromUrl(Astro.url)`, que lee el primer segmento del pathname (`en`, `pt`, o español por defecto). El handler del worker de Cloudflare ya sirve esta ruta con status 404. Se elimina el prop `lang`.
- **Se elimina `src/pages/[lang]/404.astro`** (pregunta 1): nada lo referencia salvo su propio import, y la 404 única cubre los tres idiomas (YAGNI).
- **Breadcrumbs `href="/"`** (pregunta 3): entran, con `buildLocaleUrl(currentLang, '/')`.

## Riesgos / Compromisos

- [El comportamiento en Cloudflare productivo no es verificable localmente] → verificación manual de `https://logatm.com/en/no-existe` tras el deploy; localmente, `astro preview`.
- [La 404 pasa a ejecutarse en el worker] → sin dependencias nuevas; el costo es una invocación por 404.
- [Un hallazgo del review sobre `SERVICES` o los specs i18n] → se anota como deuda, no se corrige aquí.
