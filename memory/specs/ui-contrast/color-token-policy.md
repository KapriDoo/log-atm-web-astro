---
type: capability-spec
title: "Política de color: tokens para marca y semántica, sin literales nuevos"
capability: "ui-contrast"
slug: "color-token-policy"
domain: "debt"
delta_type: ADD
supersedes: "[[contrast-token-single-source]]"
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[debt-copy-tokens-ssot]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot"
feature_branch: "feature/debt-copy-tokens-ssot"
mr: ""
acceptance_criteria:
  - "[ ] La cabecera de la fuente de tokens y la regla «Don't» de la documentación de diseño enuncian la misma política: colores de marca, semánticos y pares validados solo vía tokens; ningún literal nuevo fuera de la fuente de tokens salvo en las plantillas de correo; los literales existentes son legado tolerado que no se migra"
  - "[ ] La fuente de tokens no define ninguno de los 18 tokens de opacidad ni el token de hover oscuro de WhatsApp, ni en las variables del sitio ni en el tema de Tailwind"
  - "[ ] Los tokens de WhatsApp en uso (base, hover y texto) permanecen definidos con el verde visible del sitio"
  - "[ ] El CSS que genera Tailwind sobre el sitio construido difiere del CSS previo al cambio solo en las declaraciones eliminadas de opacidad y de hover oscuro de WhatsApp"
  - "[ ] Los tokens de sombra y de radio de borde siguen definidos en la fuente de tokens y disponibles como utilidades de Tailwind"
  - "[ ] Cada par validado figura una sola vez en la fuente de tokens y el sitio construye sin errores"
  - "[ ] La documentación de diseño declara la excepción de los correos, muestra ratios que coinciden con los medidos y no describe como apto para texto normal un color cuyo par no alcanza 4.5:1"
  - "[ ] Los colores de las industrias llevan un comentario de una línea que justifica por qué son datos y no tokens"
  - "[ ] Las siete specs de estilos (cta-styles, hero-styles, services-styles, why-styles, navbar-styles, footer-styles, industries-styles), create-functional-tokens y contrast-token-single-source declaran esta spec como sucesora"

related:
  - "[[contrast-token-single-source]]"
  - "[[create-functional-tokens]]"
  - "[[consolidate-tokens]]"
  - "[[industries-colors]]"
  - "[[sitewide-contrast-verification]]"
  - "[[cta-styles]]"
  - "[[hero-styles]]"
  - "[[services-styles]]"
  - "[[why-styles]]"
  - "[[navbar-styles]]"
  - "[[footer-styles]]"
  - "[[industries-styles]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/DESIGN.md"
  - "log-atm-web-astro/src/lib/constants.ts"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec]
---

# Política de color: tokens para marca y semántica, sin literales nuevos

## Purpose

El equipo de diseño y desarrollo necesita una regla de color que describa lo que el sitio hace de verdad. La política consolida en una sola spec vigente las reglas de colores de marca, de pares de contraste, de sombras y de radios, retira los tokens que ningún estilo consume y declara qué literales de color existentes se toleran como legado. Así la regla se puede cumplir y verificar sin migrar los literales actuales.

## Requirements

- El sistema SHALL definir los colores de marca, los colores semánticos y cada par de texto y fondo validado una sola vez en la fuente de tokens de diseño, y los estilos del sitio los consumen desde ahí.
- El sistema MUST NOT introducir colores literales nuevos fuera de la fuente de tokens, salvo en las plantillas de correo. La regla alcanza todo color escrito como valor fijo, también los colores con transparencia de las capas que oscurecen fotografías.
- El sistema SHALL tolerar los colores literales existentes fuera de la fuente de tokens como legado y SHALL NOT exigir su migración a tokens.
- El sistema SHALL enunciar la misma política en la cabecera de la fuente de tokens y en las reglas «Don't» de la documentación de diseño.
- El sistema SHALL declarar la excepción de las plantillas de correo en la documentación de diseño: los clientes de correo exigen estilos en línea y no leen los tokens.
- El sistema SHALL NOT definir tokens de opacidad ni el token de hover oscuro de WhatsApp, porque ningún estilo ni clase utilitaria los consume.
- El sistema SHALL conservar los tokens de WhatsApp en uso (color base, hover y texto) con el verde que el sitio muestra.
- El sistema SHALL mantener definidos los tokens de sombra y de radio de borde, disponibles tanto para los estilos del sitio como para las clases utilitarias de Tailwind.
- El sistema SHALL poner cada token a disposición tanto de los estilos del sitio como de las clases utilitarias de Tailwind.
- El sistema SHALL mostrar en la documentación de diseño los ratios de contraste medidos de cada par validado y mantenerla coherente con ellos: no presenta como apto para texto normal un color cuyo par no alcanza 4.5:1 y declara las excepciones vigentes al anillo de foco por contexto.
- El sistema SHALL justificar con un comentario de una línea que los colores de las industrias son datos del contenido y no tokens, de modo que la decisión de colores queda documentada junto a los datos.

## Scenarios

### Scenario: Equipo consulta la regla de color

**GIVEN** una persona del equipo lee la cabecera de la fuente de tokens y la documentación de diseño
**WHEN** compara la regla de color que enuncia cada una
**THEN** ambas dicen lo mismo: marca, semántica y pares validados solo vía tokens, ningún literal nuevo salvo en los correos y los literales existentes como legado tolerado

### Scenario: Equipo agrega un estilo con un color de marca

**GIVEN** una persona del equipo necesita un color de marca en un componente nuevo
**WHEN** revisa las diferencias de estilos del cambio
**THEN** el color se obtiene de un token y no hay literales de color nuevos fuera de la fuente de tokens, salvo los botones de los correos

### Scenario: Equipo encuentra un literal existente

**GIVEN** un estilo del sitio que contiene un color literal fuera de la fuente de tokens
**WHEN** el equipo lo detecta al revisar el código
**THEN** se considera legado tolerado y no se exige migrarlo

### Scenario: Equipo busca tokens de opacidad o el hover oscuro de WhatsApp

**GIVEN** una persona del equipo abre la fuente de tokens
**WHEN** busca los tokens de opacidad y el hover oscuro de WhatsApp
**THEN** no existen, mientras los tokens de WhatsApp en uso siguen definidos con el verde visible del sitio

### Scenario: El sitio se ve igual tras retirar tokens sin uso

**GIVEN** el sitio construido antes y después de retirar los tokens sin uso
**WHEN** se comparan las hojas de estilo generadas
**THEN** solo difieren las declaraciones retiradas y ninguna página cambia de aspecto

### Scenario: Equipo consulta las sombras y los radios

**GIVEN** una persona del equipo necesita una sombra o un radio de borde
**WHEN** busca el token correspondiente
**THEN** lo encuentra en la fuente de tokens y puede usarlo en estilos del sitio y en clases utilitarias

### Scenario: Equipo consulta los colores de las industrias

**GIVEN** una persona del equipo lee los datos de industrias
**WHEN** se pregunta por qué sus colores no son tokens
**THEN** un comentario de una línea junto a los datos explica la decisión

## Acceptance Criteria

- [ ] La cabecera de la fuente de tokens y la regla «Don't» de la documentación de diseño enuncian la misma política: colores de marca, semánticos y pares validados solo vía tokens; ningún literal nuevo fuera de la fuente de tokens salvo en las plantillas de correo; los literales existentes son legado tolerado que no se migra
- [ ] La fuente de tokens no define ninguno de los 18 tokens de opacidad ni el token de hover oscuro de WhatsApp, ni en las variables del sitio ni en el tema de Tailwind
- [ ] Los tokens de WhatsApp en uso (base, hover y texto) permanecen definidos con el verde visible del sitio
- [ ] El CSS que genera Tailwind sobre el sitio construido difiere del CSS previo al cambio solo en las declaraciones eliminadas de opacidad y de hover oscuro de WhatsApp
- [ ] Los tokens de sombra y de radio de borde siguen definidos en la fuente de tokens y disponibles como utilidades de Tailwind
- [ ] Cada par validado figura una sola vez en la fuente de tokens y el sitio construye sin errores
- [ ] La documentación de diseño declara la excepción de los correos, muestra ratios que coinciden con los medidos y no describe como apto para texto normal un color cuyo par no alcanza 4.5:1
- [ ] Los colores de las industrias llevan un comentario de una línea que justifica por qué son datos y no tokens
- [ ] Las siete specs de estilos (cta-styles, hero-styles, services-styles, why-styles, navbar-styles, footer-styles, industries-styles), create-functional-tokens y contrast-token-single-source declaran esta spec como sucesora

## Related

- [[contrast-token-single-source]] — spec base que esta política extiende y reemplaza como vigente
- [[create-functional-tokens]] — sus requisitos de sombras y radios se reenuncian aquí; el de opacidades se retira
- [[consolidate-tokens]] — consolidación previa de tokens
- [[industries-colors]] — la decisión de colores de industrias que exige un comentario
- [[sitewide-contrast-verification]] — verificación de contrastes del sitio
