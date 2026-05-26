# State — fix-cotizar-wizard-init

```yaml
change_name: fix-cotizar-wizard-init
domain: fix
fast_path: spec-first
feature_branch: feature/fix-cotizar-wizard-init
integration_target: main
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-cotizar-wizard-init
phases_completed:
  - sdd-init
  - sdd-propose
  - sdd-spec
  - sdd-tasks
  - sdd-apply
  - sdd-verify
current_phase: ""
updated: "2026-05-26"
status: completed
mr_url: ""
mr_status: pending
mr_error: ""
spec_refs:
  - "[[quote-wizard/wizard-direct-url-init]]"
  - "[[site-script-init/script-init-direct-url]]"
```

## Path Inference

- **Inferred**: spec-first (rule 2)
- **Signals**:
  - S1=Y — dominio es `fix` (bug confirmado con causa raíz identificada)
  - S2=Y — causa raíz verificada con evidencia concreta (Playwright + dispatch manual del evento)
  - S3=N — no es deuda técnica ni vulnerabilidad de seguridad
- **Override**: none

## Intent

El wizard de cotizar (4 pasos, /cotizar/) está completamente inerte en una carga normal de página: ningún clic/selección/botón responde, no avanza de paso, no habilita "Continuar", no actualiza el resumen en vivo. Causa raíz confirmada por pruebas con Playwright: toda la lógica del wizard (`src/scripts/wizard.ts`) y de otros scripts del sitio (`src/scripts/scroll-animations.ts`, `HeroSection.astro`, páginas contacto/industrias/nosotros/servicios) está envuelta en `document.addEventListener("astro:page-load", ...)`. Ese evento solo lo dispara el ClientRouter de Astro (`<ClientRouter />` / View Transitions de `astro:transitions`), que NO está montado en `src/layouts/BaseLayout.astro` (verificado: no existe `ClientRouter`/`ViewTransitions` ni en la rama actual ni en `origin/main`; `meta[name="astro-view-transitions-enabled"]` ausente en runtime). Por eso en carga directa de URL el evento nunca se dispara y los scripts nunca inicializan ni enlazan listeners — fallo silencioso (scripts HTTP 200, sin errores en consola). Evidencia clave: al disparar manualmente `document.dispatchEvent(new Event('astro:page-load'))` el wizard despertó y el flujo completo de 4 pasos funcionó de punta a punta. Es un bug PREEXISTENTE en main (no regresión del refactor de iconos) y de alcance site-wide. Dos enfoques candidatos a decidir en la propuesta: (1) montar `<ClientRouter />` en BaseLayout para restaurar `astro:page-load` en todo el sitio; (2) cambiar los listeners para correr también en carga inicial (patrón `DOMContentLoaded` que ya usa `LanguageSelector` y funciona). La lógica del wizard está sana; el único defecto es el disparador de inicialización. El fix debe re-verificarse en el navegador.

## Contexto de Archivos Clave

| Archivo | Relevancia |
|---------|------------|
| `log-atm-web-astro/src/scripts/wizard.ts` | Script principal del wizard; usa `astro:page-load` |
| `log-atm-web-astro/src/layouts/BaseLayout.astro` | Layout base; `ClientRouter` ausente aquí |
| `log-atm-web-astro/src/scripts/scroll-animations.ts` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/components/sections/HeroSection.astro` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/pages/contacto.astro` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/pages/servicios.astro` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/pages/nosotros.astro` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/pages/industrias.astro` | Afectado (mismo patrón) |
| `log-atm-web-astro/src/components/ui/LanguageSelector.astro` | Referencia: patrón correcto con `DOMContentLoaded` |
