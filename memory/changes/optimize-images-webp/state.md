---
type: change-state
name: optimize-images-webp
change_name: optimize-images-webp
domain: refactoring
status: completed
current_phase: ""
fast_path: full
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-design, sdd-spec, sdd-tasks, sdd-apply, sdd-verify, sdd-judgment]
spec_refs:
  - "[[image-asset-migration]]"
  - "[[image-multiformat-delivery]]"
  - "[[hero-lcp-priority]]"
  - "[[asset-dead-code-removal]]"
integration_target: main
feature_branch: feature/optimize-images-webp
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/optimize-images-webp
mr: ""
mr_url: ""
mr_status: pending
mr_error: ""
created: "2026-05-28"
created_at: 2026-05-28
updated: "2026-05-28"
tags: [change]
---

## Cambio

**Nombre:** optimize-images-webp  
**Tipo:** Refactoring  
**Path Rápido:** full  

## Estado Actual

- **Fase:** sdd-verify (pendiente)
- **Integración:** main
- **Branch:** feature/optimize-images-webp
- **Worktree:** /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/optimize-images-webp

## Intent

Revisar cómo se sirven actualmente las imágenes en el proyecto (Astro) y proponer un plan de migración a WebP/AVIF usando astro:assets, evaluando peso, LCP y compatibilidad.

## Scope

- Auditoría de activos de imagen (png, jpg, jpg) en src/assets y public
- Evaluación de impacto en LCP y tamaño de bundle
- Diseño de estrategia de formato negociado (WebP/AVIF con fallback)
- Plan de migración de astro:assets con <Image /> component
- Actualización de configuración Astro si aplica

## Objetivos de Éxito

- [ ] Baseline: Identificar todas las imágenes y peso actual
- [ ] Propuesta: Plan de migración sin breaking changes
- [ ] Implementación: Migración incremental de assets críticos (hero, CTAs)
- [ ] Validación: Lighthouse ≥95, compatibilidad navegadores, visual parity

---

## Historial de Fases

| Fase | Estado | Nota |
|------|--------|------|
| sdd-init | ✓ Completada | Stack detectado, profile generado |
| sdd-explore | ✓ Completada | Auditoría de assets; exploration.md generado; 3 debt candidates |
| sdd-propose | ✓ Completada | proposal.md generado; aprobada por usuario (iteración 1) |
| sdd-design | ✓ Completada | design.md generado; ADR-0006 creado (extiende ADR-0001); 27 imágenes verificadas |
| sdd-spec | ✓ Completada | 4 specs en 3 capabilities: image-optimization-pipeline (×2), hero-lcp-performance (×1), dead-code-cleanup (×1) |
| sdd-tasks | ✓ Completada | tasks.md generado; 8 tareas (T1–T8) en orden seguro; trazabilidad completa a 4 specs |
| sdd-apply | ✓ Completada | 27 JPEG migrados a src/assets/images; <Picture> AVIF/WebP en 7 archivos; poster via getImage(); imageService:'compile' en adapter Cloudflare; código muerto eliminado; build PASS, variantes estáticas emitidas |
| sdd-verify | ✓ Completada | BUILD PASS; 19 <picture> en home con AVIF+WebP; hero 91–232 KB AVIF (vs 915 KB JPEG); fetchpriority/eager/sync/100vw; código muerto eliminado; Lighthouse real pendiente (manual) |
| sdd-judgment | ✓ Completada | Revisión adversarial (2 jueces) → PASS. Verificado contra diff e6ade3a + dist/client real: migración sin rutas crudas residuales, hero LCP <250KB AVIF + CLS reservado, paridad i18n 19/19/19 es/en/pt, sin regresión GSAP/CSS (no hay Swiper), imageService:'compile' correcto (0 rutas /_image). 1 hallazgo low no bloqueante: ADR-0006 no nombra imageService:'compile' explícitamente. 0 issues confirmed. judgment-report.md |
