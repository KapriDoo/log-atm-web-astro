---
type: capability-spec
title: "Manifiesto de Nosotros sin contradicción de antigüedad con 'Desde 2023'"
capability: "content-nosotros"
slug: "nosotros-manifesto-founding-year-consistency"
domain: "feature"
delta_type: "MODIFY"
supersedes: "[[content-nosotros/years-experience-narrative-consistency]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[content-nosotros/nosotros-hero-identity]]"
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["88c02a8"]
mr: ""
acceptance_criteria:
  - "[x] El primer párrafo del manifiesto de Nosotros (p1Html) no afirma que la empresa (LOG ATM) opera desde hace más de dos décadas"
  - "[x] El párrafo reescrito conserva el mensaje sobre la experiencia colectiva del equipo sin contradecir 'Nosotros · Desde 2023'"
  - "[x] El cambio se aplica de forma idéntica en español, inglés y portugués"
related:
  - "[[content-nosotros/years-experience-narrative-consistency]]"
  - "[[content-nosotros/nosotros-hero-identity]]"
  - "[[content-nosotros/nosotros-manifesto-messaging]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
verified_at: null
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Manifiesto de Nosotros sin contradicción de antigüedad con "Desde 2023"

## Purpose

`sdd-verify` detectó que `nosotros.manifesto.p1Html` (en los 3 idiomas) quedó sin tocar durante `sdd-apply` y dice, en es: "Llevamos más de dos décadas operando en el mundo logístico chileno..." (en: "We have spent more than two decades operating in the Chilean logistics world..."; pt: "Operamos há mais de duas décadas no mundo logístico chileno..."). Esta frase usa voz de primera persona plural de la empresa ("Llevamos"/"We have spent"/"Operamos") para afirmar más de 20 años de operación, lo cual contradice directamente "Nosotros · Desde 2023" mostrado en el hero de la misma página, apenas un scroll más arriba. Es la única superficie del sitio que rompe el patrón de reencuadre aplicado en el resto del contenido (`home.hero.eyebrow`, `footer.brandDesc`, `meta.nosotros.description`, `nosotros.heroTitleHtml`), que consistentemente usa la fórmula "profesionales con 20+ años de experiencia" (experiencia del equipo, no antigüedad de la empresa) para evitar esa contradicción.

## Requirements

- El sistema SHALL no afirmar en `nosotros.manifesto.p1Html` (ni su equivalente en/pt) que la empresa LOG ATM opera u opera desde hace más de dos décadas.
- El sistema SHALL reescribir ese fragmento para comunicar la experiencia colectiva de los profesionales del equipo en el mundo logístico chileno, siguiendo el mismo patrón de reencuadre ("profesionales con 20+ años de experiencia") usado en `home.hero.eyebrow`, `footer.brandDesc`, `meta.nosotros.description` y `nosotros.heroTitleHtml`.
- El sistema SHALL mantener el resto del párrafo (la idea de que "las cargas no se mueven solas" y las personas detrás de cada contenedor/AWB/DUS) sin alterar su sentido.
- El sistema SHALL aplicar la corrección de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee el hero y el manifiesto de Nosotros en la misma visita

**GIVEN** un visitante lee "Nosotros · Desde 2023" en el hero de la página Nosotros
**WHEN** continúa leyendo el primer párrafo del manifiesto, más abajo en la misma página
**THEN** no encuentra una afirmación de que la empresa opera desde hace más de dos décadas, sino un mensaje coherente sobre la experiencia de sus profesionales

## Acceptance Criteria

- [x] `nosotros.manifesto.p1Html` no contiene una afirmación de antigüedad de la empresa que contradiga "Desde 2023", en es/en/pt
- [x] El párrafo reescrito sigue el patrón "profesionales con 20+ años de experiencia" usado en el resto del sitio
- [x] El resto del contenido del párrafo (idea central sobre las personas detrás de cada envío) se conserva
