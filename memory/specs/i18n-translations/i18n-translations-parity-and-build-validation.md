---
type: capability-spec
title: "Paridad de diccionarios en tres idiomas, validación en build y textos sin respaldo"
capability: "i18n-translations"
slug: "i18n-translations-parity-and-build-validation"
domain: "debt"
delta_type: MODIFY
supersedes: "[[i18n-translations-json-structure]]"
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-core-three-locales-single-source]]"
change_ref: "[[debt-i18n-three-locales]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
feature_branch: feature/debt-i18n-three-locales
mr: ""
acceptance_criteria:
  - "[ ] Los tres diccionarios tienen el mismo conjunto exacto de claves y existe al menos un namespace por cada área de negocio enumerada."
  - "[ ] El diccionario maestro en español refleja el microcopy actual del código."
  - "[ ] `npm run build` falla cuando hay divergencia estructural y el reporte indica idioma y clave de cada divergencia."
  - "[ ] La validación termina antes del paso de generación de HTML y existe un script ejecutable de validación independiente de la construcción (`npm run validate-i18n`)."
  - "[ ] `scripts/validate-i18n.ts` no declara literales de idiomas y toma los idiomas y el maestro de la definición única de idiomas."
  - "[ ] Una búsqueda de textos de respaldo en español (el operador `??` seguido de un texto literal en español) en los scripts de `CTASection.astro` y `WhyVideoSection.astro` no arroja resultados; el valor enviado al operador queda fuera de la búsqueda."
  - "[ ] El HTML generado de las páginas que incluyen esos scripts difiere de la línea base solo en el script de cliente (contenido inline o nombre con hash del bundle) y únicamente por la eliminación de los respaldos."
  - "[ ] [[i18n-translations-json-structure]] e [[i18n-translations-build-validation]] declaran `superseded_by` hacia esta spec."
  - "[ ] ADR-0003 incluye una nota de actualización fechada que declara que `prebuild` nunca existió y que el hook `astro:build:start` es el mecanismo único, sin reescribir la decisión."

related:
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-translations-build-validation]]"
  - "[[copy-single-source]]"
  - "[[i18n-core-three-locales-single-source]]"
affects: []
adrs:
  - "[[0003-i18n-key-validation-build-hook]]"
scope:
  - "log-atm-web-astro/src/i18n/translations/"
  - "log-atm-web-astro/scripts/validate-i18n.ts"
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/src/components/sections/CTASection.astro"
  - "log-atm-web-astro/src/components/sections/WhyVideoSection.astro"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec, i18n]
---

# Paridad de diccionarios en tres idiomas, validación en build y textos sin respaldo

## Purpose

El equipo de contenido y el de desarrollo pueden agregar, modificar y traducir textos del sitio sin romper su integridad: toda clave del idioma maestro (español) existe en inglés y portugués y viceversa, y la construcción del sitio se detiene antes de publicar diccionarios desbalanceados. Ningún script del navegador conserva textos de respaldo en español: los mensajes que ve el visitante salen siempre de las traducciones. Esta spec reemplaza a [[i18n-translations-json-structure]] y absorbe los requisitos de [[i18n-translations-build-validation]], que la declara como sucesora; la validación de paridad se trasladó sin cambio de comportamiento. Complementa a [[copy-single-source]].

## Requirements

- El sistema SHALL contener un diccionario por cada idioma soportado: español, inglés y portugués.
- El sistema SHALL tratar el diccionario en español como maestro: ninguna clave puede existir en otro idioma sin estar también en español.
- El sistema SHALL organizar las claves por áreas de negocio en namespaces (al menos: navegación, footer, home, servicios, industrias, nosotros, contacto, cotizar, comunes y accesibilidad).
- El sistema SHALL preservar la paridad estructural de claves entre los tres diccionarios; las traducciones que aún no tengan contenido real pueden quedar provisionales, pero deben existir.
- El sistema SHALL ejecutar una validación de paridad de claves entre los tres diccionarios antes de generar el HTML de salida.
- El sistema SHALL hacer fallar el proceso de construcción cuando el inglés o el portugués tengan claves faltantes o sobrantes respecto del maestro español.
- El sistema SHALL reportar al desarrollador la lista exacta de claves divergentes por idioma cuando la validación falla.
- El sistema SHALL tomar los idiomas que valida de la definición única de idiomas de [[i18n-core-three-locales-single-source]].
- El sistema SHOULD permitir ejecutar la validación de forma aislada, sin construir el sitio completo, para iterar rápido.
- El sistema SHALL mostrar los mensajes del formulario de contacto de la home y las etiquetas del control del video de «por qué elegirnos» exclusivamente desde las traducciones del idioma de la página, sin textos de respaldo en español incrustados en los scripts del navegador.
- El sistema SHOULD dejar fuera de esta regla los valores que un formulario envía al operador, porque no son texto visible para el visitante.

## Scenarios

### Scenario: Construcción con diccionarios alineados

**GIVEN** los tres diccionarios con paridad estructural completa
**WHEN** un desarrollador construye el sitio
**THEN** la validación pasa silenciosamente y la construcción continúa hasta generar el HTML

### Scenario: Construcción con una clave faltante en portugués

**GIVEN** el diccionario portugués al que se le borró una clave por error
**WHEN** un desarrollador construye el sitio
**THEN** la construcción se aborta antes de generar HTML, termina con código distinto de cero y reporta la clave faltante en portugués

### Scenario: Una traducción quedó huérfana

**GIVEN** un diccionario en inglés que conserva una clave eliminada del maestro
**WHEN** se construye el sitio
**THEN** la construcción falla indicando la clave sobrante en inglés

### Scenario: Desarrollador valida sin construir

**GIVEN** un desarrollador que acaba de modificar diccionarios
**WHEN** ejecuta el comando dedicado de validación
**THEN** obtiene el mismo reporte de divergencias sin generar el sitio completo

### Scenario: El equipo agrega un idioma a la lista única

**GIVEN** un equipo que agrega un idioma de prueba solo a la definición única de idiomas
**WHEN** ejecuta la validación de traducciones
**THEN** la validación exige el diccionario del idioma nuevo sin que el equipo edite el script de validación

### Scenario: Visitante en inglés recibe un error al enviar el formulario de contacto

**GIVEN** un visitante en la home en inglés que envía el formulario sin dato de contacto
**WHEN** el formulario muestra el mensaje de error
**THEN** el mensaje aparece en inglés, tomado de las traducciones

### Scenario: Visitante en portugués usa el control del video

**GIVEN** un visitante en la home en portugués
**WHEN** pausa y reproduce el video de «por qué elegirnos»
**THEN** la etiqueta accesible del control aparece en portugués en cada estado

## Acceptance Criteria

- [ ] Los tres diccionarios tienen el mismo conjunto exacto de claves y existe al menos un namespace por cada área de negocio enumerada.
- [ ] El diccionario maestro en español refleja el microcopy actual del código.
- [ ] `npm run build` falla cuando hay divergencia estructural y el reporte indica idioma y clave de cada divergencia.
- [ ] La validación termina antes del paso de generación de HTML y existe un script ejecutable de validación independiente de la construcción (`npm run validate-i18n`).
- [ ] `scripts/validate-i18n.ts` no declara literales de idiomas y toma los idiomas y el maestro de la definición única de idiomas.
- [ ] Una búsqueda de textos de respaldo en español (el operador `??` seguido de un texto literal en español) en los scripts de `CTASection.astro` y `WhyVideoSection.astro` no arroja resultados; el valor enviado al operador queda fuera de la búsqueda.
- [ ] El HTML generado de las páginas que incluyen esos scripts difiere de la línea base solo en el script de cliente (contenido inline o nombre con hash del bundle) y únicamente por la eliminación de los respaldos.
- [ ] [[i18n-translations-json-structure]] e [[i18n-translations-build-validation]] declaran `superseded_by` hacia esta spec.
- [ ] ADR-0003 incluye una nota de actualización fechada que declara que `prebuild` nunca existió y que el hook `astro:build:start` es el mecanismo único, sin reescribir la decisión.

## Related

- [[i18n-translations-json-structure]] — spec reemplazada por esta; su texto concuerda con esta spec en los tres diccionarios
- [[i18n-translations-build-validation]] — spec absorbida: su validación de paridad vive aquí y su texto concuerda con esta spec
- [[copy-single-source]] — todo el texto visible sale del i18n
- [[i18n-core-three-locales-single-source]] — define los tres idiomas y su fuente única
