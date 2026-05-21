# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>

## 2026-05-20 | debt | fix-cotizar-mobile-wizard-stepper | A11y: stepper__label oculto a screen readers en mobile
**Severidad**: Low — Detectado por sdd-judgment iter1 (Juez A y B coincidieron).
**Ubicación**: `log-atm-web-astro/src/styles/pages/cotizar.css` (media `max-width: 640px`)
**Descripción**: `.stepper__label { display: none }` en ≤640px oculta el texto del paso ("PASO 01") a lectores de pantalla sin equivalente accesible. Gap preexistente al patrón del stepper; mitigado parcialmente por el `<h2>` de cada panel del wizard.
**Promoción sugerida**: añadir `.sr-only` con el texto del paso o `aria-current="step"` + `aria-label` en el step activo. Fix de a11y trivial, fuera de scope de la regresión mobile.

## 2026-05-20 | pre-adr | fix-cotizar-mobile-wizard-stepper | Verify estático no detecta bugs de runtime mobile/touch
**Categoría**: lección del pipeline (refuerza la observación equivalente de `fix-ux-multipage-bugs`).
**Descripción**: El PR#19 marcó verify PASS pero los bugs B7/B9 persistieron en iPhone Safari real. Causa: el verify estático (build + curl + grep) es estructuralmente incapaz de detectar (a) overflow de layout responsive, (b) delays táctiles iOS (300ms sin touch-action), (c) fallos de event registration específicos de Safari. Este es el SEGUNDO change con esta lección.
**Promoción sugerida**: con ≥2 ocurrencias, considerar ADR formal sobre el contrato de verify para changes con superficie mobile/touch: requerir smoke en device real o emulación headless (chromium con `--device`) ANTES de marcar PASS; o marcar explícitamente el AC de runtime como "pendiente validación usuario" y bloquear el cierre del bug (no del PR) hasta confirmación.

## 2026-05-10 | architecture | redesign-experiencia-sector | Astro Assets + Sharp para optimización de imágenes
Se decide usar `astro:assets` con Sharp para procesar las 14 imágenes de industrias en build time, generando WebP/AVIF y previniendo CLS. Las imágenes fuente van en `src/assets/industries/`, no en `public/`. Se crea ADR-0001 documentando la decisión y sus alternativas descartadas (public/ estático, CDN externo, lazy loading manual con Intersection Observer).

## 2026-05-12 | follow-up | rescue-multi-language-support | nginx 404 multilingüe decorativo
**Detectado por**: sdd-judgment (Juez 2) en `rescue-multi-language-support`
**Ubicación**: `log-atm-web-astro/default.conf`, `log-atm-web-astro/nginx.conf`
**Descripción**: las páginas `/[lang]/404.astro` se generan estáticamente, pero la regla nginx actual `try_files $uri $uri/index.html /index.html` redirige cualquier URL inexistente al index español con status 200, produciendo soft-404 para URLs `/en/foo`, `/ar/bar`, etc. Las páginas 404 multilingües nunca se sirven.
**Promoción sugerida**: `sdd new fix-nginx-404-per-locale --domain fix` — añadir `error_page 404 /[lang]/404.html` por bloque location y propagar `try_files` con fallback al 404 del locale.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-1: contacto.astro pasa ariaLabel a WhatsAppIcon (doble anuncio)
**Severidad**: Low — Detectado por sdd-judgment iter2 (Juez A y B coincidieron).
**Ubicación**: `log-atm-web-astro/src/pages/contacto.astro:141`
**Descripción**: El componente `WhatsAppIcon.astro` quedó tras iter2 con soporte de modo decorativo (aria-hidden default), pero el caller en contacto.astro:141 aún pasa `ariaLabel="WhatsApp"` explícito, reactivando el doble anuncio en lectores porque el texto adyacente "WhatsApp · respuesta inmediata" ya nombra el bloque.
**Promoción sugerida**: fix trivial — eliminar `ariaLabel` en el caller o pasar `decorative={true}`.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-2: potrace en dependencies (debería ser devDep)
**Severidad**: Low — Detectado por sdd-judgment iter2 (Juez B).
**Ubicación**: `log-atm-web-astro/package.json`
**Descripción**: Tras mover sharp a devDependencies por simetría con su uso solo en scripts de build, potrace quedó en dependencies aunque también es solo para build.
**Promoción sugerida**: incluir en próximo housekeeping de deps.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-3: type-loss en wizard.ts:196
**Severidad**: Nit — Detectado por sdd-judgment iter2 (Juez B).
**Ubicación**: `log-atm-web-astro/src/scripts/wizard.ts:196`
**Descripción**: `__stepperTransition` tipado como `(opts: unknown) => void` en el módulo nuevo. Type-loss menor; idealmente con interfaz tipada compartida.

## 2026-05-19 | pre-adr | fix-ux-multipage-bugs | Verify reforzado: grep de TS leak en HTML/JS producido
**Categoría**: lección del pipeline.
**Descripción**: Iter1 de sdd-verify reportó PASS basado solo en build estático sin grep del HTML/JS producido. El issue H-1 (sintaxis TS sin transpilar en `<script define:vars>`) fue invisible para typecheck/build pero rompía el wizard en runtime. Judgment lo detectó con `node --check` sobre el HTML construido. Recomendación: `sdd-verify` para changes que tocan `<script define:vars>` debe incluir explícitamente `grep -rE '(as [A-Z]\w+|type \w+ =|: \w+ =|<[A-Z]\w+>)' dist/client/**/*.html dist/_astro/*.js`.
**Promoción sugerida**: si este patrón se repite ≥3 veces → ADR formal sobre el contrato de verify para scripts inline.
