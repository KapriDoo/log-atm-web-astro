---
type: capability-spec
title: "Catálogo de servicios sin CTA de detalle ni páginas de detalle"
capability: "content-services"
slug: "services-catalog-cta-and-detail-pages"
domain: "feature"
delta_type: "MODIFY"
supersedes: "[[content/content-services]]"
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["3ae0f66"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] Ninguna tarjeta de servicio (Home ni catálogo /servicios) muestra un botón o enlace 'Conocer más' en es/en/pt"
  - "[x] Las tarjetas de Carga Aérea y Carga Marítima no son clicables ni muestran affordance visual de enlace (cursor, hover de tarjeta-enlace)"
  - "[x] No existe página de detalle accesible para Carga Aérea ni Carga Marítima, en ninguna variante de idioma"
  - "[x] Ningún enlace del sitio (Home, catálogo, sitemap) apunta a una URL de detalle de Carga Aérea o Carga Marítima"
related:
  - "[[content-services/services-descriptions-bullets]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/servicios.astro"
  - "log-atm-web-astro/src/pages/servicios/carga-aerea.astro"
  - "log-atm-web-astro/src/pages/servicios/carga-maritima.astro"
  - "log-atm-web-astro/src/pages/[lang]/servicios.astro"
  - "log-atm-web-astro/src/pages/[lang]/servicios/carga-aerea.astro"
  - "log-atm-web-astro/src/pages/[lang]/servicios/carga-maritima.astro"
  - "log-atm-web-astro/src/components/sections/ServicesSection.astro"
  - "log-atm-web-astro/src/lib/constants.ts"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Catálogo de servicios sin CTA de detalle ni páginas de detalle

## Purpose

El catálogo de servicios (Home y /servicios) dejó de ofrecer páginas de detalle individuales por servicio. Las tarjetas de servicio deben reflejar ese estado: sin botón "Conocer más" que ya no lleva a ninguna parte, y sin apariencia de enlace en las tarjetas de Carga Aérea y Carga Marítima, cuyas páginas de detalle se retiran del sitio.

## Requirements

- El sistema SHALL no mostrar ningún botón o texto "Conocer más" en las tarjetas de servicio, ni en Home ni en el catálogo /servicios, en ninguno de los tres idiomas.
- El sistema SHALL no servir ninguna página de detalle para Carga Aérea ni Carga Marítima, en ninguna variante de idioma.
- El sistema SHALL presentar las tarjetas de Carga Aérea y Carga Marítima como contenido no interactivo: sin atributo de enlace ni affordance visual de tarjeta-clicable (cursor de puntero, hover de enlace).
- El sistema SHALL mantener el resto de las tarjetas de servicio con su comportamiento habitual (sin regresión en servicios que no tenían página de detalle).
- El sistema SHOULD no dejar ninguna referencia interna (menú, sitemap, footer) apuntando a las rutas de detalle retiradas.

## Scenarios

### Scenario: Visitante recorre el catálogo de servicios

**GIVEN** un visitante navega a la página de catálogo de servicios en cualquiera de los tres idiomas
**WHEN** revisa las tarjetas de Carga Aérea y Carga Marítima
**THEN** no ve un botón "Conocer más" ni percibe que la tarjeta completa sea clicable

### Scenario: Visitante intenta acceder a una URL de detalle retirada

**GIVEN** un visitante conoce o recuerda la URL de detalle de Carga Aérea o Carga Marítima
**WHEN** intenta visitarla directamente
**THEN** el sitio no sirve contenido de detalle en esa ruta (no hay página viva ahí)

### Scenario: Visitante navega desde Home

**GIVEN** un visitante ve la sección de servicios en la página de inicio
**WHEN** observa las tarjetas de servicio
**THEN** ninguna tarjeta ofrece un CTA "Conocer más" y las de Carga Aérea/Carga Marítima no aparentan ser enlaces

## Acceptance Criteria

- [x] Cero apariciones del texto "Conocer más" (o su equivalente en/pt) en Home y catálogo de servicios
- [x] Cero páginas de detalle accesibles para Carga Aérea o Carga Marítima en es/en/pt
- [x] Las tarjetas de Carga Aérea y Carga Marítima no tienen affordance de enlace
- [x] El resto del catálogo de servicios se muestra sin regresiones
