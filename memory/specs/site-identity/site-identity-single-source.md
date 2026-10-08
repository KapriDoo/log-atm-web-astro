---
type: capability-spec
title: "Identidad del sitio con una única fuente: nombre, URL, contacto, dirección, redes y slogan"
capability: "site-identity"
slug: "site-identity-single-source"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[debt-copy-tokens-ssot]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
feature_branch: feature/debt-copy-tokens-ssot
mr: ""
acceptance_criteria:
  - "[ ] Existe una única definición de la identidad del sitio (nombre, URL, teléfono, teléfono de lectura, email, dirección estructurada, coordenadas y redes), importable sin arrastrar imágenes ni otros módulos, y no contiene slogan"
  - "[ ] Los meta (incluidas las cuentas de twitter:site y twitter:creator, derivadas de la red X/Twitter), el JSON-LD, el correo, el enlace de WhatsApp, el nombre de marca de la barra de navegación, el pie de página y la página de contacto leen sus datos de esa definición; el layout base no redefine nombre ni URL del sitio y el i18n no define el nombre del sitio"
  - "[ ] El enlace de WhatsApp se deriva del teléfono de la identidad; la línea de dirección del pie de página, de contacto y del correo se arma desde la dirección estructurada"
  - "[ ] El eslogan del JSON-LD de cada página es el meta.tagline del idioma de esa página, y el título por defecto usa la clave meta.defaultTitle del i18n"
  - "[ ] La plantilla de correo toma el eslogan de meta.tagline del archivo de español del i18n, importado como JSON completo, y el nombre y la dirección de la identidad del sitio"
  - "[ ] Cambiar un dato de la identidad en su única definición se refleja en meta, JSON-LD, correo, WhatsApp, pie de página y contacto sin otra edición"
  - "[ ] El teléfono y el email de contacto mostrados siguen siendo +56 9 8270 8492 y contacto@logatm.com en todas las páginas, y el JSON-LD de /en y /pt publica el eslogan en inglés y portugués respectivamente"

related:
  - "[[site-global-contact-details]]"
  - "[[canonical-host-www]]"
  - "[[copy-single-source]]"
  - "[[email-brand-identity]]"
affects:
  - "[[canonical-host-www]]"
adrs: []
scope:
  - "log-atm-web-astro/src/lib/site.ts"
  - "log-atm-web-astro/src/lib/constants.ts"
  - "log-atm-web-astro/src/lib/email-templates.ts"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
  - "log-atm-web-astro/src/components/ui/Footer.astro"
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
  - "log-atm-web-astro/src/pages/contacto.astro"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec]
---

# Identidad del sitio con una única fuente: nombre, URL, contacto, dirección, redes y slogan

## Purpose

El nombre, la URL, el teléfono, el email, la dirección, las coordenadas y las redes del sitio viven en un solo lugar, y todo lo que los muestra o los publica los lee de ahí: los meta de las páginas, los datos estructurados para buscadores, los correos al operador, el enlace de WhatsApp, el pie de página y la página de contacto. El slogan tiene su propia fuente única en las traducciones, que ya lo localizan por idioma. Cambiar un dato de la empresa exige una sola edición.

## Requirements

- El sistema SHALL definir nombre, URL, teléfono (y su forma de lectura), email, dirección estructurada (calle, localidad, ciudad, región, país y código de país), coordenadas y redes del sitio en una única definición.
- El sistema SHALL mantener esa definición libre de imágenes y de otras dependencias, de modo que la lean por igual la configuración de construcción, el envío de correos y las páginas.
- El sistema SHALL NOT incluir el slogan en esa definición; el slogan tiene como única fuente la clave de eslogan de las traducciones.
- El sistema SHALL derivar de esa definición el enlace de WhatsApp, la línea de dirección del pie de página y de contacto, la línea de dirección del correo y los datos del negocio en los datos estructurados.
- El sistema SHALL publicar en los datos estructurados de cada página el eslogan en el idioma de esa página.
- El sistema SHALL usar como título por defecto de una página el de las traducciones, sin que el layout base redefina nombre ni URL del sitio.
- El sistema SHALL tomar el eslogan de los correos al operador de las traducciones en español, porque esos correos se redactan en español.
- El sistema SHALL mostrar el nombre de marca de la barra de navegación y del pie de página desde esa definición, y derivar de su red X/Twitter la cuenta de los meta `twitter:site` y `twitter:creator`.
- El sistema SHALL mantener sin cambios el teléfono y el email de contacto vigentes.
- El sistema SHALL NOT conservar un dato de identidad duplicado en otro lugar.

## Scenarios

### Scenario: La empresa cambia su teléfono

**GIVEN** el teléfono de la empresa cambia
**WHEN** el equipo lo edita en la única definición de identidad
**THEN** el nuevo teléfono aparece en el pie de página, la página de contacto, los datos estructurados y el enlace de WhatsApp sin otra edición

### Scenario: La empresa cambia su dirección

**GIVEN** la empresa cambia de oficina
**WHEN** el equipo edita la dirección estructurada una sola vez
**THEN** la nueva dirección aparece en el pie de página, la página de contacto, el correo al operador y los datos estructurados

### Scenario: Buscador lee el slogan de una página en inglés

**GIVEN** un buscador que lee los datos estructurados de una página en inglés
**WHEN** interpreta el eslogan de la empresa
**THEN** lee «Logistics tailored to you»
**AND** en portugués lee «Logística sob medida» y en español «Logística a tu medida»

### Scenario: El operador recibe un correo de cotización

**GIVEN** un cliente que envía una cotización desde cualquier idioma
**WHEN** el operador abre el correo
**THEN** el pie del correo muestra el nombre, el eslogan en español y la dirección de la empresa

### Scenario: Equipo busca un dato duplicado

**GIVEN** una persona del equipo busca el nombre, la URL o el slogan de la empresa escritos como valor fijo
**WHEN** revisa layout, correos, configuración y componentes
**THEN** solo los encuentra en su fuente única

## Acceptance Criteria

- [ ] Existe una única definición de la identidad del sitio (nombre, URL, teléfono, teléfono de lectura, email, dirección estructurada, coordenadas y redes), importable sin arrastrar imágenes ni otros módulos, y no contiene slogan
- [ ] Los meta (incluidas las cuentas de twitter:site y twitter:creator, derivadas de la red X/Twitter), el JSON-LD, el correo, el enlace de WhatsApp, el nombre de marca de la barra de navegación, el pie de página y la página de contacto leen sus datos de esa definición; el layout base no redefine nombre ni URL del sitio y el i18n no define el nombre del sitio
- [ ] El enlace de WhatsApp se deriva del teléfono de la identidad; la línea de dirección del pie de página, de contacto y del correo se arma desde la dirección estructurada
- [ ] El eslogan del JSON-LD de cada página es el meta.tagline del idioma de esa página, y el título por defecto usa la clave meta.defaultTitle del i18n
- [ ] La plantilla de correo toma el eslogan de meta.tagline del archivo de español del i18n, importado como JSON completo, y el nombre y la dirección de la identidad del sitio
- [ ] Cambiar un dato de la identidad en su única definición se refleja en meta, JSON-LD, correo, WhatsApp, pie de página y contacto sin otra edición
- [ ] El teléfono y el email de contacto mostrados siguen siendo +56 9 8270 8492 y contacto@logatm.com en todas las páginas, y el JSON-LD de /en y /pt publica el eslogan en inglés y portugués respectivamente

## Related

- [[site-global-contact-details]] — teléfono y email vigentes que esta fuente única conserva
- [[canonical-host-www]] — el host canónico sale de la URL de esta identidad
- [[copy-single-source]] — fuente única del texto visible
- [[email-brand-identity]] — identidad visual de los correos
