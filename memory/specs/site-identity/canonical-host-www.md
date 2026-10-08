---
type: capability-spec
title: "Host canónico www en todas las señales de búsqueda"
capability: "site-identity"
slug: "canonical-host-www"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[site-identity-single-source]]"
change_ref: "[[debt-copy-tokens-ssot]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
feature_branch: feature/debt-copy-tokens-ssot
mr: ""
acceptance_criteria:
  - "[x] La URL de la identidad del sitio es https://www.logatm.com y es la única fuente del host canónico"
  - "[x] En el sitio construido, canonical, hreflang, og:url, og:image, sitemap y JSON-LD de las siete páginas en es, en y pt usan https://www.logatm.com y no contienen https://logatm.com"
  - "[x] dist/client/robots.txt existe y contiene la línea Sitemap: https://www.logatm.com/sitemap-index.xml"
  - "[x] robots.txt se genera desde un endpoint prerenderizado (prerender = true) que responde con tipo de contenido text/plain y arma la línea Sitemap desde la URL de la identidad; el archivo estático public/robots.txt no existe"
  - "[x] La configuración de Astro lee la URL del sitio de la definición de identidad (astro.config.mjs importa src/lib/site.ts) y npm run build termina en verde"
  - "[x] manifest.json no contiene host y no se modifica; el email contacto@logatm.com no cambia"
  - "[x] Las únicas diferencias del sitio construido respecto del anterior en estas señales son el cambio de host a www; ninguna otra señal SEO cambia"

related:
  - "[[site-identity-single-source]]"
  - "[[i18n-seo-hreflang]]"
  - "[[site-global-contact-details]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/src/pages/robots.txt.ts"
  - "log-atm-web-astro/public/robots.txt"
  - "log-atm-web-astro/src/lib/site.ts"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
verified_at: 2026-10-08

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec]
---

# Host canónico www en todas las señales de búsqueda

## Purpose

El sitio responde en `www.logatm.com`: el dominio sin `www` redirige (301) a esa dirección. Las señales que leen los buscadores (canonical, hreflang, og:url, og:image, sitemap, robots y datos estructurados) apuntan a la dirección que el sitio realmente sirve, y todas derivan de una sola URL. Así se evita que los buscadores sigan una redirección para cada página.

## Requirements

- El sistema SHALL usar `https://www.logatm.com` como URL canónica del sitio, definida una sola vez en la identidad del sitio.
- El sistema SHALL derivar de esa URL el canonical, los hreflang, el og:url, el og:image, el sitemap, el robots y los datos estructurados de todas las páginas en los tres idiomas.
- El sistema SHALL NOT dejar ninguna señal de búsqueda con el dominio sin `www`.
- El sistema SHALL publicar un `robots.txt` cuya línea de sitemap apunta a `https://www.logatm.com/sitemap-index.xml`, generado a partir de la URL de la identidad y entregado como archivo estático del sitio construido, con tipo de contenido de texto plano.
- El sistema SHALL NOT mantener un `robots.txt` escrito a mano junto al generado, porque ambos chocan al construir y duplican el host.
- El sistema SHALL leer la URL del sitio para su configuración de construcción desde la definición de identidad, sin dependencias que impidan cargarla en el entorno de construcción.
- El sistema SHALL mantener sin cambios el email de contacto `contacto@logatm.com`, y el manifiesto de la aplicación, que no contiene host.

## Scenarios

### Scenario: Buscador lee las señales de una página

**GIVEN** un buscador que rastrea cualquier página del sitio en cualquier idioma
**WHEN** lee el canonical, los hreflang, el og:url y el sitemap
**THEN** todas las URLs usan el dominio con `www`
**AND** ninguna requiere seguir una redirección

### Scenario: Buscador lee el robots

**GIVEN** un buscador que pide el archivo de robots del sitio
**WHEN** el sitio lo entrega
**THEN** recibe texto plano con la línea de sitemap hacia `https://www.logatm.com/sitemap-index.xml`

### Scenario: La empresa cambia de dominio

**GIVEN** la empresa decide cambiar la URL del sitio
**WHEN** el equipo edita la URL en la identidad del sitio
**THEN** canonical, hreflang, og:url, sitemap, robots y datos estructurados siguen el cambio sin otra edición

### Scenario: Equipo busca restos del dominio sin www

**GIVEN** el sitio construido
**WHEN** una persona del equipo busca el dominio sin `www` en el HTML, el sitemap y el robots
**THEN** no encuentra ninguna aparición

## Acceptance Criteria

- [x] La URL de la identidad del sitio es https://www.logatm.com y es la única fuente del host canónico
- [x] En el sitio construido, canonical, hreflang, og:url, og:image, sitemap y JSON-LD de las siete páginas en es, en y pt usan https://www.logatm.com y no contienen https://logatm.com
- [x] dist/client/robots.txt existe y contiene la línea Sitemap: https://www.logatm.com/sitemap-index.xml
- [x] robots.txt se genera desde un endpoint prerenderizado (prerender = true) que responde con tipo de contenido text/plain y arma la línea Sitemap desde la URL de la identidad; el archivo estático public/robots.txt no existe
- [x] La configuración de Astro lee la URL del sitio de la definición de identidad (astro.config.mjs importa src/lib/site.ts) y npm run build termina en verde
- [x] manifest.json no contiene host y no se modifica; el email contacto@logatm.com no cambia
- [x] Las únicas diferencias del sitio construido respecto del anterior en estas señales son el cambio de host a www; ninguna otra señal SEO cambia

## Related

- [[site-identity-single-source]] — la identidad del sitio de la que se deriva el host
- [[i18n-seo-hreflang]] — señales hreflang y sitemap multilingües
- [[site-global-contact-details]] — el email de contacto vigente no cambia
