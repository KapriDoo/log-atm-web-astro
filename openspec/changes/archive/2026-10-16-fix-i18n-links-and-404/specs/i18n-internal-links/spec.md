# Spec Delta

## Purpose

Garantiza que los links internos de las páginas en inglés y portugués conserven el prefijo de su idioma, y que las cards del catálogo de servicios no se enlacen a la propia página.

## ADDED Requirements

### Requirement: Links internos con el prefijo del idioma
Every internal link (`<a href>`) rendered in a page under `/en/` or `/pt/` MUST point to a route that starts with that page's locale prefix. Excluded: `/_astro/`, `/api/`, assets, anchors and the language selector links (those with `hreflang`).

#### Scenario: Barrido de las páginas en inglés y portugués
- **WHEN** se recorren todos los `.html` de `dist/client/en/**` y `dist/client/pt/**` tras `npm run build`
- **THEN** ningún `<a href>` interno (excluyendo `/_astro/`, `/api/`, assets, anclas y los links del selector de idioma, los que llevan `hreflang`) apunta a una ruta sin el prefijo `/en/` o `/pt/` de su página

#### Scenario: Cards de servicios en la home
- **WHEN** se renderiza la sección de servicios de `/en/` o `/pt/` y una card tiene destino `/servicios`
- **THEN** su `href` es `/en/servicios/` o `/pt/servicios/` respectivamente

#### Scenario: Breadcrumb y volver al inicio
- **WHEN** se renderiza el breadcrumb de inicio en `industrias`, `contacto`, `cotizar`, `nosotros` o `servicios`, o el link «volver al inicio» de `cotizar`, en `/en/` o `/pt/`
- **THEN** su `href` es `/en/` o `/pt/` respectivamente

#### Scenario: CTAs a contacto
- **WHEN** se renderizan los CTAs hacia `/contacto` de `industrias` y `servicios` en `/en/` o `/pt/`
- **THEN** su `href` es `/en/contacto/` o `/pt/contacto/` respectivamente

#### Scenario: Español sin cambios
- **WHEN** se renderizan las mismas páginas en español (sin prefijo)
- **THEN** los links son `/`, `/contacto/` y `/servicios/`, sin prefijo de idioma

### Requirement: Las cards de /servicios no se enlazan a sí mismas
On `/servicios`, `/en/servicios` and `/pt/servicios`, service cards MUST NOT contain a link to the page itself. The Consultoría card MUST link to the quote page with the page's locale prefix.

#### Scenario: Cards sin self-link
- **WHEN** se renderiza `/servicios`, `/en/servicios` o `/pt/servicios`
- **THEN** ninguna card del catálogo contiene un `<a>` cuyo `href` sea la propia página, y las cards sin destino propio se renderizan sin `<a>`

#### Scenario: Card de Consultoría
- **WHEN** se renderiza la card de Consultoría en `/servicios`, `/en/servicios` o `/pt/servicios`
- **THEN** es un link a `/cotizar/`, `/en/cotizar/` o `/pt/cotizar/` respectivamente

#### Scenario: Rutas y API sin cambios
- **WHEN** se usan las rutas existentes y los endpoints de `/api/`
- **THEN** responden igual que antes del cambio
