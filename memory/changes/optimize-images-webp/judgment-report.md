---
type: judgment-report
change_name: "optimize-images-webp"
iteration: 1
verdict: pass
confirmed_issues: 0
suspect_issues: 1
created: "2026-05-28"
tags: [judgment]
---

# Judgment Report: optimize-images-webp

> Trigger de judgment: change high-risk por `effort=L` (criterio canónico). Revisión
> adversarial con dos jueces independientes que intentaron refutar el veredicto PASS de
> `verify-report.md`. La refutación se realizó verificando el código real (commit `e6ade3a`)
> y el output de build (`dist/client/`) en el worktree, no solo el reporte de verify.

## Síntesis

| Categoría | Count |
|-----------|-------|
| Confirmed (ambos jueces) | 0 |
| Suspect A (solo Judge A) | 0 |
| Suspect B (solo Judge B) | 1 |
| Clean | — |

Veredicto Judge A (Correctness & Compliance): **pass**
Veredicto Judge B (Security & Robustness): **pass** (con 1 hallazgo `low` no bloqueante)

---

## Evidencia verificada contra código y build reales (no solo verify-report)

Foco 1 — Migración a astro:assets + `<Picture>` AVIF/WebP, sin rutas crudas residuales:
- Diff `e6ade3a`: 27 strings `/images/...` en `constants.ts` reemplazados por imports
  estáticos `ImageMetadata`; `<img>` → `<Picture formats={['avif','webp']}>` en las 8
  superficies de contenido (Hero, Services, Industries, WhyVideo poster, servicios×2,
  nosotros×1, industrias×2). CONFIRMADO contra el diff.
- `grep` de rutas crudas `/images/{services,industries,process}/*.jpeg` en `dist/client/`:
  **0 resultados**. No quedan rutas crudas residuales en el HTML emitido.
- Paridad i18n: `dist/client/{index,en/index,pt/index}.html` → 19 `<picture>`, 19 AVIF,
  19 WebP **en cada locale**. CONFIRMADO.

Foco 2 — `imageService:'compile'` en adapter Cloudflare (deploy estático Pages):
- `astro.config.mjs`: `output:'static'` + `adapter: cloudflare({ imageService:'compile' })`
  + bloque `image.service` Sharp explícito. La decisión es CORRECTA: `compile` pre-optimiza
  en build-time y emite estáticos en `_astro/`; el default `'cloudflare'` (workerd on-demand)
  requeriría binding de runtime, inapropiado para CDN estático.
- Verificación de runtime/build: `grep '/_image'` en `dist/client/` → **0 rutas on-demand**.
  Se emitieron 32 AVIF + 33 WebP estáticos. Sin coste de runtime, sin binding requerido.
  No hay riesgo de build/runtime en Cloudflare Pages para este modo.
- Documentación: ADR-0006 menciona compatibilidad "Cloudflare estático" pero **no nombra
  explícitamente `imageService:'compile'`**. Ver hallazgo Suspect B (low, no bloqueante).

Foco 3 — Hero LCP (eager/sync/fetchpriority/width/height/sizes/widths):
- `<Picture priority widths={[768,1280,1920,heroImg.width]} sizes="100vw" quality={80}>`.
- HTML emitido del hero (es/en/pt): `loading="eager" decoding="sync" fetchpriority="high"
  width="1376" height="768"` + `srcset` AVIF/WebP. `width`/`height` intrínsecos →
  **CLS reservado**. CONFIRMADO en los 3 locales.
- Peso hero AVIF real en `_astro/`: 93 KB / 207 KB / 236 KB — todas **<250 KB**. CONFIRMADO.

Foco 4 — Eliminación de código muerto (sin consumidores ni refs runtime/i18n):
- Diff borra `src/assets/industries/*.jpg` (14, ~10.8 MB), `src/lib/industryImages.ts`
  (export `INDUSTRY_IMAGES`), `src/assets/logo.svg`. Los assets eliminados (`*.jpg`) son
  **distintos** de los migrados (`*.jpeg` en `src/assets/images/`): no hay solapamiento de
  nombres. Build PASS post-borrado (status git limpio). Sin refs por string dinámico en
  i18n: las traducciones `es/en/pt.json` no portan rutas de imagen (las imágenes viven en
  `constants.ts`, no en JSON). Riesgo de borrado bajo, sin consumidores activos.

Foco 5 — i18n es/en/pt vía componentes compartidos:
- Los wrappers `src/pages/[lang]/{index,servicios,industrias,nosotros}.astro` son finos:
  `import RootPage from '../X.astro'` + `<RootPage lang={...} />`. No declaran `<img>`
  propias. CONFIRMADO leyendo los 4 wrappers. Migrar páginas canónicas + secciones cubre
  los 3 locales automáticamente; el build emitió paridad 19/19/19 verificada.

Foco 6 — Regresión Swiper/GSAP por wrapper `<picture>`:
- **No existe Swiper** en el repo (`grep -ri swiper src/` → 0). El concern era especulativo.
- GSAP: `gsap-ind-directory.ts` consulta `.ind-directory__slide` (el `<div>` padre), no el
  `<img>`. Ningún script consulta el elemento `img` directamente. Los `data-*` (`data-slide`,
  `data-scroll-*`) viven en los contenedores, no en el `<img>` migrado → `<Picture>` no los
  toca. CONFIRMADO.
- CSS: ningún selector usa el combinador hijo directo `> img` (`grep '> img' src/styles/`
  → 0). Los selectores `.xxx__media img` (descendiente) siguen casando con `<picture> img`.
  Sin regresión de selectores.

---

## Hallazgos Confirmados

Ninguno.

## Hallazgos Suspect

### [Judge B · severity: low · no bloqueante] ADR-0006 no documenta explícitamente `imageService:'compile'`
- **file**: `memory/adrs/0006-picture-multiformat-content-images.md`
- **description**: La decisión de fijar `imageService:'compile'` en el adapter Cloudflare se
  tomó durante `sdd-apply` y está comentada en `astro.config.mjs`, pero ADR-0006 solo
  menciona "compatible con Cloudflare estático" sin nombrar el flag ni su rationale frente
  al default `'cloudflare'` (workerd on-demand). Es una omisión de trazabilidad documental,
  no un defecto funcional: el comportamiento está verificado correcto (0 rutas `/_image`,
  estáticos emitidos) y el código está auto-documentado con comentario. Recomendación
  (no bloqueante, post-archive): añadir una línea a ADR-0006 registrando la elección de
  `imageService:'compile'`. No amerita ADR aparte (es consecuencia directa de la decisión
  Sharp + build-time ya capturada en ADR-0006).

---

## Veredicto Final

**pass** — Ambos jueces aprueban. La revisión adversarial verificó las 4 specs no solo
contra `verify-report.md` sino contra el diff real (`e6ade3a`) y el output de build
(`dist/client/`): migración completa sin rutas crudas residuales, `<Picture>` AVIF/WebP con
fallback JPEG correcto, hero con tríada LCP + dimensiones intrínsecas (CLS reservado) y AVIF
<250 KB, código muerto sin consumidores, paridad i18n 19/19/19 en es/en/pt, y cero regresión
GSAP/CSS (no hay Swiper; los scripts no consultan `img` y no hay `> img` en CSS). La decisión
`imageService:'compile'` es la correcta para Cloudflare Pages estático y está verificada por
la ausencia de rutas on-demand `/_image` en el HTML. El único hallazgo es de severidad `low`
y de naturaleza documental (ADR-0006), no bloqueante. El cambio puede proceder a sdd-archive.

> Nota de proceso: una primera pasada del executor leyó rutas equivocadas (asumió un layout
> de memory distinto) y emitió un veredicto erróneo de REJECTED/ESCALATED. Ese borrador fue
> descartado al confirmar que el branch `feature/optimize-images-webp` y los commits
> `e6ade3a`/`45d798d` existen y que el subdir `log-atm-web-astro/` está presente. Este reporte
> reemplaza por completo aquel borrador y se basa en evidencia verificada del código y build.
