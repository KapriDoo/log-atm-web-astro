---
type: external-input
domain: fix
change_name: fix-contrast-followups
fast_path: apply-only
priority: P1
depends_on: [fix-color-contrast-sitewide, chore-local-container-podman]
source: residuales-brief-11-2026-10-06
---
# Brief 13 — Remanentes de a11y (incluye bloqueante de `npm run a11y`) y detalles visuales

**Despacho:** `sdd new fix-contrast-followups --domain fix --path apply-only --integration-target main --input-file .sdd/briefs/auditoria-2026-10/13-fix-contrast-followups.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`. Origen: residuales 3–8 y 11 del cierre de `fix-color-contrast-sitewide` (PR #36). **Despachar después de mergear los PR #36 y #37** (el #37 crea `npm run a11y`). **Prioridad P1:** el problema 8 deja `npm run a11y` en exit 1, y ese comando está en los comandos de verificación de `memory/_profile.md`, así que todo `sdd-verify` futuro lo verá en rojo hasta corregirlo; los números de línea corresponden a la rama de ese PR y pueden haberse corrido — ubicar por contenido. Regla del proyecto: WCAG AA en todos los componentes. Usar los tokens de contraste que creó el PR #36 (`DESIGN.md` documenta los pares validados).

## Problemas

| # | Problema | Evidencia | Ratio actual |
|---|----------|-----------|--------------|
| 1 | Correos: texto del SLA con `#898580` inline y enlace `mailto` con `#4A7BB5` inline | `src/lib/email-templates.ts` (buscar por valor) | ~3.6:1 y 4.38:1 |
| 2 | Rama `success` de `setQuoteStatus` conserva `#2d9b6f` (hoy no se alcanza: defecto latente) | `src/scripts/wizard.ts:336` | 3.48:1 |
| 3 | Regla base de links `a { color: var(--color-brand) }` (primary-500) | `src/styles/global.css:83-84` | 4.38:1 |
| 4 | Placeholder de `.cta-final__input` sobre degradado (axe no evalúa `::placeholder`) | estilos de la CTA final | ~4.0–4.8:1 según el punto del degradado |
| 5 | El anillo de foco del skip link cruza el logo del header | `.skip-link:focus-visible` | — (visual) |
| 6 | `DESIGN.md` describe la navegación con valores que no coinciden con el código (neutral-700, peso 600) | `log-atm-web-astro/DESIGN.md` | — (doc) |
| 7 | En `/pt/servicios/`, "Desconsolidação" se corta en el borde de su tarjeta | `src/i18n/translations/pt.json:189` (título de card LCL) | — (visual) |
| 8 | **`label-content-name-mismatch` (WCAG 2.5.3, serious), 63 nodos**: el `aria-label` reemplaza el texto visible sin contenerlo. Enlace de marca `<a class="nav__brand" aria-label={t('a11y.brandHome')}>` (`src/components/ui/Navbar.astro:38`, 21 URLs × desktop/móvil) y `#lang-trigger` con `aria-label={t('a11y.languageCurrent', …)}` (`src/components/ui/LanguageSelector.astro:54-55`, desktop). Verify del brief 10 comprobó que sin esos dos `aria-label` la auditoría da exit 0 | `npm run a11y` (PR #37) | — (exit 1) |

## Decisiones tomadas (KISS)

- **1:** las plantillas de correo mantienen su excepción de estilos inline; usar los mismos valores que los tokens validados: texto secundario neutral-600 `#6e6963` y enlaces primary-600 `#3b6497` (verificar ≥ 4.5:1 sobre el fondo real del correo).
- **2:** reemplazar `#2d9b6f` por el par de éxito ya usado en el form de contacto tras el PR #36 (6.91:1), vía token — sin hex nuevo.
- **3:** links base a primary-600 (`#3b6497`, 6.08:1 sobre blanco), mismo criterio que `.btn--brand`; hover primary-700. Revisar que no rompa links sobre superficies oscuras (que deben tener su propio color).
- **4:** color de placeholder que cumpla ≥ 4.5:1 en el punto más desfavorable del degradado (medir con muestreo de píxeles, no con axe).
- **5:** ajustar `outline-offset`/posición del skip link para que el anillo no se superponga al logo.
- **6:** alinear `DESIGN.md` con el código (fuente de verdad: el CSS vigente).
- **8:** el nombre accesible debe **empezar por o contener** el texto visible (2.5.3). Opción preferida (KISS): quitar el `aria-label` y, si hace falta contexto extra, agregarlo como texto visualmente oculto *después* del texto visible (p. ej. "LOG ATM" + " — inicio" oculto; "ES" + " — cambiar idioma" oculto), localizado vía i18n. Ajustar las claves `a11y.brandHome` / `a11y.languageCurrent` en es/en/pt si cambian de uso.
- **7:** permitir corte de palabra con guion en títulos de card (`hyphens: auto` con `lang` correcto, u `overflow-wrap: anywhere`), sin achicar la tipografía; verificar en es/en/pt a 390px y 1440px.

## Criterios de aceptación

- [ ] Correos de los 3 formularios: todos los textos y enlaces ≥ 4.5:1 sobre su fondo.
- [ ] Sin `#2d9b6f` en `src/`; la rama `success` del wizard usa el token de éxito.
- [ ] Links de texto base ≥ 4.5:1 en todas las superficies claras; axe sin violaciones en 21 URL × desktop/móvil.
- [ ] Placeholder de la CTA final ≥ 4.5:1 en el peor punto del degradado (muestreo documentado).
- [ ] El anillo del skip link no se superpone al logo (captura antes/después).
- [ ] `DESIGN.md` coincide con el CSS de la navegación.
- [ ] **`npm run a11y` termina en exit 0** sobre el sitio (21 URLs × desktop/móvil), sin `label-content-name-mismatch`; el lector de pantalla sigue anunciando el propósito del enlace de marca y del selector.
- [ ] "Desconsolidação" visible completa dentro de su tarjeta en `/pt/servicios/` a 390px y 1440px; sin regresiones en es/en.

## Tareas sugeridas (para `tasks.md`)

1. Colores inline de `email-templates.ts` (SLA y `mailto`).
2. Token de éxito en `wizard.ts` (rama `success`).
3. Color base de links en `global.css` + revisión de links sobre superficies oscuras.
4. Placeholder de `.cta-final__input` con muestreo de píxeles.
5. Offset del foco del skip link.
6. Corrección de `DESIGN.md` (navegación).
7. Corte de palabra en títulos de card.
8. Nombre accesible del enlace de marca y de `#lang-trigger` (2.5.3), con claves i18n en es/en/pt.
9. Verificación: `npm run a11y` en exit 0 (cubre 21 URL × 2 anchos con axe en Chrome real), muestreo de píxeles para el placeholder, capturas para 5 y 7.
