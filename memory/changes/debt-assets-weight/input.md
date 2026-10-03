---
type: external-input
domain: debt
change_name: debt-assets-weight
fast_path: spec-first
priority: P2
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 06 — Peso de assets: videos duplicados, imágenes del home y residuos de dead-code-cleanup

**Despacho:** `sdd new debt-assets-weight --domain debt --path spec-first --integration-target main --input-file .sdd/briefs/auditoria-2026-10/06-debt-assets-weight.md`

> Rutas `src/...`, `public/...`, `scripts/...`, `docs/...` relativas a `log-atm-web-astro/`; `memory/...` relativa a la raíz del repo. Origen: validación de auditoría (D1, D2, residuos de `dead-code-cleanup`) y debt candidates de `memory/observations.md`.

## Para deuda técnica

- **Estado actual**:
  - **Videos:** `public/video/intro.mp4` y `public/videos/hero-port.mp4` (3.756.542 B c/u) son **idénticos byte a byte** (md5 `4900f0e5…`) al único video usado, `/videos/log-atm-intro.mp4` (`src/components/**/WhyVideoSection.astro:44`). Los 2 huérfanos se despliegan a `dist/client/` (≈7,5 MB inútiles). Coexisten las carpetas `public/video/` y `public/videos/`.
  - **Peso del home:** la spec `memory/specs/image-optimization-pipeline/image-multiformat-delivery.md` (`:26`, `:120`) exige "peso total de imágenes servidas en la página de inicio < 2 MB en navegadores con AVIF". Medido recorriendo toda la página: **desktop 1440 → 2,91 MB**; **móvil → 3,00–3,12 MB** (+0,15 MB del poster WebP). Causa raíz: las 18 `<Picture>` de cards no definen `widths`/`sizes` (`src/components/**/ServicesSection.astro:57`, `src/components/**/IndustriesSection.astro:41`) y siempre sirven la variante de 1376w. El hero (único `eager`, ≤ 237 KB) está bien.
  - **Residuos de `dead-code-cleanup`:** `scripts/png-to-svg.mjs:16` sigue escribiendo `src/assets/logo.svg` (archivo eliminado por `e6ade3a`), y `docs/project-brief.md:21,74` lo cita como destino. El AC de `dead-code-cleanup` pide cero referencias en el código fuente del proyecto. (Ojo: `scripts/generate-favicons.mjs:13` usa `public/logo.svg`, que es una referencia legítima y **no** forma parte de este residuo.)
  - **`memory/observations.md` desactualizado:** los debt candidates `:58-62` (assets de industrias sin uso, 10,5 MB) y `:64-68` (`logo.svg` duplicado) ya fueron resueltos por `e6ade3a` y siguen redactados como abiertos; `:86` registra una ruta errónea (`src/assets/industries/logo.svg`; lo borrado fue `src/assets/logo.svg`). El debt candidate `:70-74` (videos posiblemente duplicados) queda confirmado y se resuelve con este cambio.
- **Estado deseado**:
  - Una sola copia del video en `public/videos/`; carpeta `public/video/` eliminada.
  - Las cards del home sirven variantes acordes a su tamaño de render (`widths` + `sizes`), y el peso total servido del home queda < 2 MB en desktop 1440 y en móvil (390 px, DPR 3).
  - Sin referencias a `src/assets/logo.svg` en `scripts/` ni `docs/` (o `png-to-svg.mjs` deja de existir si ya no se usa; verificar si `README.md` documenta ese script).
  - `observations.md` refleja el estado real (resueltos marcados con el commit que los resolvió, ruta corregida, videos cerrado por este cambio).
- **Archivos/módulos afectados**: `public/video/intro.mp4`, `public/videos/hero-port.mp4`, `src/components/**/ServicesSection.astro`, `src/components/**/IndustriesSection.astro` (y cualquier otra `<Picture>` de card sin `widths`), `scripts/png-to-svg.mjs`, `docs/project-brief.md`, `README.md` (si documenta `png-to-svg`), `memory/observations.md`.
- **Ajuste menor incluido (residual de PR #34):** en `/servicios` las cards dejaron de ser links (`.svc-card--static`), pero siguen haciendo zoom de imagen en hover (`src/styles/sections/services.css:69`, `.svc-card:hover .svc-card__media img { transform: scale(1.04) }`), lo que sugiere un clic que no existe. Limitar el zoom a cards enlazadas (p. ej. excluir `.svc-card--static`).
- **Justificación de prioridad**: el peso del home es el único ítem de deuda con impacto directo en el usuario (datos móviles, LCP de secciones) e incumple una spec vigente; los videos reducen 7,5 MB de despliegue sin riesgo.

## Criterios de aceptación

- [ ] `public/` contiene una sola copia del video; no existe `public/video/`; ningún referenciador roto (`src/` y `dist/client`).
- [ ] Peso AVIF servido en el home tras scroll completo < 2 MB en desktop 1440×900 (DPR 1) y en móvil 390×844 (DPR 3). Método reproducible: script que lea los `<source type="image/avif">` de `dist/client/index.html` y simule la selección del navegador, o panel Network con caché deshabilitada.
- [ ] Sin pérdida visible de nitidez en las cards a DPR 2.
- [ ] `/usr/bin/grep -rn "src/assets/logo.svg" scripts docs README.md` sin resultados.
- [ ] `memory/observations.md` actualizado según el estado deseado.
- [ ] Las cards `.svc-card--static` no hacen zoom en hover; las cards enlazadas del home sí.

## Notas de verificación

En zsh, `grep` puede ser un alias de ugrep que ignora `dist/` por `.gitignore`; usar `/usr/bin/grep` dentro de `bash -c` para los barridos sobre `dist/`.
