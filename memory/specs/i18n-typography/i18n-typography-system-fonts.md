---
type: capability-spec
title: "Tipografía por locale: system font stacks para CJK, Devanagari y Arabic"
capability: "i18n-typography"
slug: "i18n-typography-system-fonts"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
change_ref: "[[multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "[ ] Los textos en chino (zh) se renderizan con una fuente que soporte caracteres CJK en los principales sistemas operativos (macOS, Windows, Android)"
  - "[ ] Los textos en hindi (hi) se renderizan con una fuente que soporte escritura Devanagari"
  - "[ ] Los textos en árabe (ar) se renderizan con una fuente que soporte la escritura árabe"
  - "[ ] Las fuentes Inter y Outfit se mantienen para español, inglés y portugués sin cambios"
  - "[ ] No se añaden fuentes web adicionales (Google Fonts u otras) para los scripts no-latín; se usan únicamente fuentes del sistema"
  - "[ ] El Lighthouse Performance Score no retrocede respecto a la línea base al añadir los font stacks"
  - "[ ] Los textos en scripts no-latín no muestran caracteres de reemplazo (tofu) en Chromium, WebKit y Firefox en sus versiones recientes"

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-rtl-support-arabic]]"
affects:
  - "[[i18n-rtl-support-arabic]]"
adrs: []
scope:
  - "src/styles/global.css"
verified_at: null

created: "2026-05-11"
updated: "2026-05-11"
tags: [capability-spec, i18n, typography, fonts, cjk, devanagari, arabic]
---

# Tipografía por locale: system font stacks para CJK, Devanagari y Arabic

## Purpose

Las fuentes Inter y Outfit usadas por LOG ATM no incluyen glifos para escrituras no-latinas (CJK, Devanagari, árabe). Si no se define un stack de fuentes adecuado para cada locale, los visitantes en chino, hindi y árabe verán cuadros de reemplazo ("tofu") en lugar de los caracteres correctos, lo que hace el sitio ilegible. Utilizando las fuentes del sistema operativo del visitante —que incluyen soporte nativo para sus escrituras— se logra legibilidad sin necesidad de descargar fuentes web adicionales, preservando la velocidad de carga y el puntaje de rendimiento.

## Requirements

- El sistema SHALL aplicar un stack de fuentes con soporte CJK (Noto Sans CJK, PingFang, Microsoft YaHei y sans-serif genérico como fallback final) cuando el locale activo sea chino (`zh`)
- El sistema SHALL aplicar un stack de fuentes con soporte Devanagari (Noto Sans Devanagari, Kohinoor Devanagari, Mangal y sans-serif genérico) cuando el locale activo sea hindi (`hi`)
- El sistema SHALL aplicar un stack de fuentes con soporte árabe (Noto Sans Arabic, Geeza Pro, Arial Unicode MS y sans-serif genérico) cuando el locale activo sea árabe (`ar`)
- El sistema SHALL mantener Inter y Outfit como fuentes para español (`es`), inglés (`en`) y portugués (`pt`) sin ningún cambio
- El sistema SHALL aplicar los stacks de fuentes mediante selectores CSS `:lang()` u otros mecanismos basados en el atributo `lang` del documento, sin JavaScript
- El sistema NO SHALL descargar fuentes web adicionales para los scripts no-latín en esta versión; solo se usan fuentes del sistema
- El sistema SHOULD ordenar los fallbacks del stack poniendo primero fuentes de alta cobertura (Noto) y terminando con `sans-serif` genérico para garantizar al menos un glifo visible en cualquier dispositivo

## Scenarios

### Scenario: Visitante en dispositivo macOS ve el sitio en chino

**GIVEN** un visitante que accede a `/zh/` desde un dispositivo macOS
**WHEN** la página carga
**THEN** los textos en chino se muestran correctamente usando PingFang SC (fuente del sistema macOS para CJK)

### Scenario: Visitante en dispositivo Android ve el sitio en hindi

**GIVEN** un visitante que accede a `/hi/` desde un teléfono Android
**WHEN** la página carga
**THEN** los textos en hindi se muestran con glifos Devanagari legibles; no aparecen cuadros de reemplazo

### Scenario: Visitante en Windows ve el sitio en árabe

**GIVEN** un visitante que accede a `/ar/` desde Windows
**WHEN** la página carga
**THEN** los textos árabes se renderizan con una fuente compatible (ej. Segoe UI, que incluye soporte árabe en Windows)

### Scenario: Visitante en inglés no percibe ningún cambio tipográfico

**GIVEN** un visitante que accede a `/en/`
**WHEN** la página carga
**THEN** los textos se muestran con Inter y Outfit, idénticos a la experiencia actual en español

### Scenario: Rendimiento no se ve afectado por los stacks de fuentes

**GIVEN** el equipo de desarrollo que mide el rendimiento del sitio en chino con Lighthouse
**WHEN** ejecuta la auditoría
**THEN** el puntaje de Performance se mantiene en 95 o superior, sin penalizaciones por carga de fuentes adicionales

### Scenario: Ausencia de tofu en los tres navegadores principales

**GIVEN** un revisor de calidad que accede a `/zh/`, `/hi/` y `/ar/` en Chromium, Firefox y Safari/WebKit
**WHEN** inspecciona visualmente cada página
**THEN** no encuentra cuadros de reemplazo en ningún texto; todos los caracteres son legibles

## Acceptance Criteria

- [ ] Los textos en chino (`zh`) se renderizan con una fuente que soporte caracteres CJK en los principales sistemas operativos (macOS, Windows, Android)
- [ ] Los textos en hindi (`hi`) se renderizan con una fuente que soporte escritura Devanagari
- [ ] Los textos en árabe (`ar`) se renderizan con una fuente que soporte la escritura árabe
- [ ] Las fuentes Inter y Outfit se mantienen para español, inglés y portugués sin cambios
- [ ] No se añaden fuentes web adicionales (Google Fonts u otras) para los scripts no-latín; se usan únicamente fuentes del sistema
- [ ] El Lighthouse Performance Score no retrocede respecto a la línea base al añadir los font stacks
- [ ] Los textos en scripts no-latín no muestran caracteres de reemplazo ("tofu") en Chromium, WebKit y Firefox en sus versiones recientes

## Related

- [[i18n-routing-locale-prefixes]] — el selector `:lang()` actúa sobre el atributo `lang` que el routing establece en `<html>`
- [[i18n-rtl-support-arabic]] — el stack de fuentes árabe complementa el layout RTL del locale árabe
