---
type: capability-spec
title: "Los scripts interactivos del sitio deben inicializarse en carga directa de URL"
capability: "site-script-init"
slug: "script-init-direct-url"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: critical
depends_on: []
change_ref: "[[fix-cotizar-wizard-init]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-cotizar-wizard-init"
feature_branch: "feature/fix-cotizar-wizard-init"
commits: ["adec814"]
mr: ""
updated: "2026-05-26"
acceptance_criteria:
  - "Al acceder directamente a la página de inicio, las animaciones del hero y los contadores numéricos se ejecutan sin necesidad de navegar desde otra página"
  - "Al acceder directamente a /contacto/, el formulario de contacto puede enviarse correctamente"
  - "Al acceder directamente a /servicios/, los filtros de servicios responden al clic del usuario"
  - "Al acceder directamente a /nosotros/, la animación de la línea de tiempo se dispara al hacer scroll hasta esa sección"
  - "Al acceder directamente a /industrias/, el directorio de industrias muestra el slide inicial y responde a la interacción del usuario"
  - "Ninguno de los comportamientos anteriores se duplica ni produce errores cuando el usuario navega entre páginas dentro de la misma sesión"

related:
  - "[[quote-wizard/wizard-direct-url-init]]"
  - "[[scroll-animations/scroll-inner-pages]]"
  - "[[nosotros-timeline-reveal/spec]]"
affects:
  - "src/components/sections/HeroSection.astro"
  - "src/pages/contacto.astro"
  - "src/pages/servicios.astro"
  - "src/pages/nosotros.astro"
  - "src/pages/industrias.astro"
  - "src/scripts/wizard.ts"
  - "src/scripts/scroll-animations.ts"
adrs: []
scope:
  - "log-atm-web-astro/src/components/sections/HeroSection.astro"
  - "log-atm-web-astro/src/pages/contacto.astro"
  - "log-atm-web-astro/src/pages/servicios.astro"
  - "log-atm-web-astro/src/pages/nosotros.astro"
  - "log-atm-web-astro/src/pages/industrias.astro"
  - "log-atm-web-astro/src/scripts/wizard.ts"
  - "log-atm-web-astro/src/scripts/scroll-animations.ts"
verified_at: "2026-05-26"

created: "2026-05-26"
updated: "2026-05-26"
tags: [capability-spec]
---

# Los scripts interactivos del sitio deben inicializarse en carga directa de URL

## Purpose

Siete componentes y páginas del sitio de LOG ATM contienen lógica interactiva (animaciones, formularios, filtros, directorios) que permanece completamente inactiva cuando el usuario accede directamente a su URL. La causa es que toda esa lógica depende de un mecanismo de inicialización que solo se activa al navegar *internamente* desde otra página del sitio, y que no se dispara en una carga directa (acceso por URL, recarga, enlace externo). El usuario que llega a la página de inicio, de contacto, de servicios, de nosotros o de industrias de forma directa no ve ni puede usar ninguna de las funcionalidades interactivas. Esta spec cubre el patrón de corrección: los scripts afectados deben inicializarse en cualquier tipo de carga de página, con lógica idempotente que garantice que la doble inicialización (en navegaciones internas) no duplique efectos.

## Requirements

- El sistema SHALL inicializar todos los scripts interactivos afectados en cualquier carga de página, incluyendo el acceso directo por URL, la recarga de página y la apertura desde marcadores o enlaces externos.
- El sistema SHALL garantizar que cada inicialización sea idempotente: si una página se inicializa más de una vez dentro de la misma sesión, los listeners no se duplican y las animaciones no se ejecutan dos veces.
- El sistema SHALL mantener la compatibilidad con navegaciones internas: si en el futuro se activan las View Transitions de Astro, los scripts deben seguir funcionando correctamente al navegar entre páginas.
- El sistema SHALL aplicar el patrón de inicialización de forma consistente en todos los scripts afectados, sin tratar cada caso de forma ad hoc.
- Los scripts afectados que ya inicializan en carga de módulo (sin depender del mecanismo problemático) SHOULD mantenerse sin cambios para evitar regresar comportamiento correcto.

## Scenarios

### Scenario: Animaciones e indicadores numéricos del hero en carga directa

**GIVEN** un visitante abre la página de inicio del sitio directamente (desde un buscador o enlace externo)
**WHEN** la página termina de cargar
**THEN** las animaciones del bloque hero se ejecutan y los indicadores numéricos del sitio (años de experiencia, clientes, envíos) realizan el conteo animado de forma visible para el visitante

### Scenario: Formulario de contacto operable en carga directa

**GIVEN** un visitante llega a la página de contacto directamente
**WHEN** la página termina de cargar y el visitante completa el formulario y hace clic en enviar
**THEN** el formulario se envía correctamente al servidor y el visitante recibe confirmación visual de éxito

### Scenario: Filtros de servicios operables en carga directa

**GIVEN** un visitante llega a la página de servicios directamente
**WHEN** la página termina de cargar y el visitante hace clic en un botón de filtro de servicio
**THEN** el filtro seleccionado se marca como activo visualmente y los resultados se filtran según la selección

### Scenario: Línea de tiempo de nosotros visible en carga directa

**GIVEN** un visitante llega a la página de nosotros directamente
**WHEN** la página termina de cargar y el visitante hace scroll hasta la sección de historia de la empresa
**THEN** la línea de tiempo se anima mostrando los hitos cronológicos de la empresa de forma progresiva

### Scenario: Directorio de industrias interactivo en carga directa

**GIVEN** un visitante llega a la página de industrias directamente
**WHEN** la página termina de cargar
**THEN** el directorio de industrias muestra el primer slide con su información de nombre, sector y etiquetas, y la autorotación entre industrias empieza; el visitante puede hacer clic en una industria para ver su información

### Scenario: Sin duplicación de efectos en navegación interna

**GIVEN** un visitante está en cualquier página interactiva del sitio que fue cargada directamente
**WHEN** el visitante navega a otra página y vuelve (navegación interna, sin recarga completa)
**THEN** los scripts se re-inicializan correctamente al regresar, sin duplicar listeners ni ejecutar animaciones dobles

## Acceptance Criteria

- [ ] Al acceder directamente a la página de inicio, las animaciones del hero y los contadores numéricos se ejecutan sin necesidad de navegar desde otra página
- [ ] Al acceder directamente a /contacto/, el formulario de contacto puede enviarse correctamente
- [ ] Al acceder directamente a /servicios/, los filtros de servicios responden al clic del usuario
- [ ] Al acceder directamente a /nosotros/, la animación de la línea de tiempo se dispara al hacer scroll hasta esa sección
- [ ] Al acceder directamente a /industrias/, el directorio de industrias muestra el slide inicial y responde a la interacción del usuario
- [ ] Ninguno de los comportamientos anteriores se duplica ni produce errores cuando el usuario navega entre páginas dentro de la misma sesión

## Related

- [[quote-wizard/wizard-direct-url-init]] — spec que documenta el caso del wizard de cotización, que forma parte del mismo grupo de scripts afectados
- [[scroll-animations/scroll-inner-pages]] — spec de animaciones por scroll en páginas internas; las páginas afectadas por esta spec también usan animaciones por scroll
- [[nosotros-timeline-reveal/spec]] — spec de la línea de tiempo de nosotros; esta spec complementa su comportamiento en carga directa
