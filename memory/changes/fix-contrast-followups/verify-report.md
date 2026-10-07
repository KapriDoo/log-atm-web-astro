---
verdict: PASS
---

# Verify Report: fix-contrast-followups

**Fecha**: 2026-10-06

Camino apply-only, `spec_refs` vacío: no hay specs, scenarios, deltas `MODIFY` ni grafo de specs que validar. Los criterios son los `Acceptance` de T1–T9 (`tasks.md`) y los «Criterios de aceptación» del brief 13 (`input.md`). Segunda iteración de verify: se reescribe el informe completo sobre el HEAD `339cf86` (que incluye `.skip-link:hover` en `global.css`), con mediciones propias de esta fase. Toda cifra vive en los bloques de evidencia registrados al final (`verify-report.N`); la evidencia de `apply-evidence.md` solo se usó para ubicar las capturas.

## Resultados por criterio

| Criterio | Status | Notas |
|----------|--------|-------|
| T1 / brief: sin `#898580` ni texto o enlace de tamaño normal con `#4A7BB5` en `email-templates.ts` | ✅ | Bloque 6: solo restan la flecha «→» (24px/600, texto grande, umbral 3:1) y el borde izquierdo del mensaje (no es texto). `#898580` y `#339965` ya no aparecen. |
| T1 / brief: textos y enlaces de los 3 correos ≥ 4,5:1 sobre su fondo real | ✅ | Bloque 17 (pares leídos del fuente: blanco, `#f8f7f6`, `#eef4fb`, header, footer, badges, botones): ningún texto bajo 4,5:1; flecha y borde sobre 3:1. |
| T2: `grep -rn 2d9b6f src/` sin resultados; la rama `success` usa el token del form de contacto | ✅ con observación | Bloque 19 (búsqueda literal de T2): sin resultados. La rama usa `var(--color-text-accent)`, igual que `contacto.astro:222`; el bloque 16 aplica la expresión sobre `#quote-status` y mide el color resuelto contra su fondo real. Con búsqueda sin distinguir mayúsculas queda `#2D9B6F` en `src/lib/constants.ts:238` (bloque 7, ver H1). |
| T3-a: links base ≥ 4,5:1 en superficies claras | ✅ | Bloque 10: 636 enlaces visibles (18 páginas, 1280 y 390 px) en reposo; los únicos < 4,5:1 son falsos positivos (tarjetas `.svc-card` con foto y overlay, migas del hero con foto) cuyo color es propio y no hereda la regla base (bloque 11). Axe sin violaciones: bloque 5. |
| T3-b: ningún link sobre superficie oscura < 4,5:1 por heredar el color base | ✅ | Bloque 10: 634 enlaces medidos con puntero encima, sin ninguno bajo 4,5:1 fuera de los mismos falsos positivos; el único defecto de la iteración anterior (`.skip-link` en hover) está corregido, bloque 9. |
| H1 de la iteración anterior (hover del skip link) | ✅ corregido | Bloque 9: con foco, y con foco más puntero encima (`:hover` activo), el texto del skip link es blanco sobre primary-600 a 6,08:1 en 1440, 1280 y 390 px, en `/`, `/en/` y `/pt/servicios/`. Antes era primary-700 sobre primary-600. |
| T4 / brief: placeholder de la CTA final ≥ 4,5:1 en el peor punto del fondo, muestreo documentado | ✅ | Bloques 12 y 13 (muestreo de píxeles con el placeholder oculto: región del texto y caja de contenido completa, es/en/pt, escritorio y móvil, reposo y foco): color primary-200, el peor píxel da el ratio mínimo que muestran ambos bloques, sobre el umbral. |
| T5 / brief: el anillo del skip link no se superpone al logo (antes/después) | ✅ con observación | Capturas `capturas/t5-skiplink-antes-1440.png` (anillo blanco cruzando logo y nombre) y `capturas/t5-skiplink-despues-1440.png` (anillo accent-400 dentro de la caja opaca), inspeccionadas; bloque 9 confirma anillo accent-400 de 3px con offset -5px, y el bloque 18 su contraste de 1.4.11. La caja opaca sigue cubriendo parte del logo (H3). |
| T6 / brief: `DESIGN.md` coincide con el CSS de la navegación | ✅ | Lectura contra `Navbar.astro`: `.nav__link` `--color-text`, 500, 0,9375rem; hover, foco y activo `--color-brand-dark` sobre `--color-surface-alt`; activo con subrayado de 2px y offset .3em; `.nav-drawer__link` neutral-700, 500, 1,0625rem, hover/foco primary-50. `DESIGN.md` §Navigation lo describe igual. |
| T7: «Desconsolidação» completa dentro de su tarjeta en `/pt/servicios/` a 390 y 1440 px | ✅ | Bloque 14: a 390 px cabe en una línea dentro de la tarjeta; a 1440 px se parte con guion en dos líneas, ambas dentro de la tarjeta. Capturas `capturas/t7-desconsolidacao-despues-390.jpg` y `-1440.jpg`; inspección propia de la tarjeta a 1440 px. |
| T7: sin regresiones en `/servicios/` y `/en/services/` | ✅ con observación | Bloque 14: cero desbordes en es/en/pt a 390, 1280 y 1440 px; cambia el corte con guion en tarjetas angostas (H2). Capturas `t7-grid-antes/despues-*` de es, en y pt. |
| T8 / brief: nombre accesible del enlace de marca y de `#lang-trigger` empieza por el texto visible y anuncia su propósito | ✅ | Bloque 15 (árbol de accesibilidad de Chrome, es/en/pt): sin `aria-label`; nombre = texto visible + sufijo `.sr-only` localizado («— Inicio/Home/Início», «— Idioma actual: …, cambiar idioma»). `#lang-trigger` solo es visible en escritorio. Bloque 8: sin `aria-label` residual con esas claves. |
| T8: `npm run validate-i18n` sin errores | ✅ | Bloque 3. |
| T9 / brief clave: `npm run a11y` exit 0, sin `label-content-name-mismatch` | ✅ | Bloque 5: 21 URLs × escritorio/móvil, 0 violaciones, 0 estados HTTP inesperados, exit 0. |
| T9: `npm run check` 0 errores y build OK | ✅ | Bloques 1 y 2. |
| T9: `check-i18n-links` | ✅ | Bloque 4. |
| T9: evidencia registrada en el workspace | ✅ | `apply-evidence.md` y `capturas/` presentes; `comprobar` sobre `apply-evidence.md` sin bloques que no calcen (bloque 20). |

**Scenarios verificados**: N/A (sin specs).

### Tests

El perfil no declara test runner; la verificación del proyecto son sus comandos. Build: bloque 1. `astro check`: bloque 2. i18n: bloques 3 y 4. Auditoría axe en Chrome real (corrida completa): bloque 5. Mediciones propias: bloques 6 a 8 (búsquedas), 9 (skip link), 10 y 11 (enlaces), 12 y 13 (placeholder), 14 (cortes de palabra), 15 (nombres accesibles), 16 (rama `success`), 17 y 18 (ratios). `comprobar`: bloques 20 (`apply-evidence.md`) y 21 (este informe). El servidor de vista previa y los navegadores levantados por la fase están bajados.

**Cobertura**: no hay instrumento de cobertura.

## Hallazgos

**H1 (observación, no bloquea).** `#2D9B6F` en mayúsculas permanece en `src/lib/constants.ts:238` (industria «Agroindustria», bloque 7). Se consume como `--ind-color` (glifo del icono sobre círculo blanco y borde en hover), no como texto: aplica el umbral 3:1 de 1.4.11 y axe no reporta violación (bloque 5). El criterio de T2 tal como está escrito (`grep -rn 2d9b6f src/`, bloque 19) se cumple; solo una lectura sin distinguir mayúsculas del criterio del brief («sin `#2d9b6f` en `src/`») lo tocaría, y su intención (texto y rama `success`) se cumple. Opcional: tokenizar ese color.

**H2 (riesgo aceptado).** `hyphens: auto` parte con guion títulos es/en/pt en tarjetas angostas a 1280 y 1440 px (bloque 14: «Documentación», «Desconsolidado», «Documentation», «Deconsolidation», «Armazenagem», «Desconsolidação»). Ninguna palabra desborda su tarjeta; a 390 px no hay cortes. Es el comportamiento que el brief pidió; el costo es estético.

**H3 (riesgo aceptado).** La caja del skip link enfocado cubre parte del logo y del nombre de la marca (bloque 9: solape caja/logo y caja/nombre). El anillo ya no cruza el logo (captura «después»), que es lo que exige el criterio; la caja opaca solo aparece con foco de teclado.

**H4 (riesgo aceptado).** El kicker de los correos pasó de `#339965` a `#22663f` (espejo de `--color-text-accent`, 6,91:1 en el bloque 17): cumple el criterio del brief («todos los textos ≥ 4,5:1») pero excede el texto literal de T1 («sin hex nuevo fuera de esos dos valores»); es un hex ya validado del sistema.

**Bloques de `comprobar`.** Ningún bloque aparece en `no_calzan` ni con `error` (bloques 20 y 21). Los bloques de servidor, build, auditoría y `npm run check` llevan `--no-recomprobable` con su motivo.

## Hallazgos de Seguridad (si aplica)

Sin hallazgos de seguridad (dominio `fix`; sin cambios en entradas, secretos ni dependencias).

## Coherencia de Grafo de Specs

No aplica: `spec_refs` vacío.

## Acciones Requeridas

Ninguna bloqueante. Opcional (H1): sustituir `#2D9B6F` en `constants.ts` por un color tokenizado ≥ 3:1.

## Evidencia registrada

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:04-03:00","exit":0,"sha256":"c298d0677027ac9e6c4cc4a7ae62b7ca901c39de8b6e00885083e1b4afbcbef8","lineas":527,"omitidas":487,"no_recomprobable":"reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 527 líneas, 487 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

21:54:57 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:54:57 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:54:59 [types] Generated 1.28s
21:54:59 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
21:54:59 [build] output: "static"
21:54:59 [build] mode: "server"
21:54:59 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/
21:54:59 [build] adapter: @astrojs/cloudflare
21:54:59 [build] Collecting build info...
21:54:59 [build] ✓ Completed in 1.70s.
21:54:59 [build] Building server entrypoints...
21:55:01 [vite] ✓ built in 2.12s
21:55:03 [vite] ✓ built in 1.42s
21:55:03 [vite] ✓ built in 686ms

 prerendering static routes 
21:55:04   ├─ /contacto/index.html (+21ms) 
21:55:04   ├─ /cotizar/index.html (+12ms) 
21:55:04   ├─ /industrias/index.html (+21ms) 
21:55:04   ├─ /nosotros/index.html (+14ms) 
21:55:04   ├─ /servicios/index.html (+22ms) 
21:55:04   ├─ /en/contacto/index.html (+9ms) 
21:55:04   ├─ /pt/contacto/index.html (+9ms) 
21:55:04   ├─ /en/cotizar/index.html (+10ms) 
21:55:04   ├─ /pt/cotizar/index.html (+9ms) 
21:55:04   ├─ /en/industrias/index.html (+10ms) 
21:55:04   ├─ /pt/industrias/index.html (+11ms) 
21:55:04   ├─ /en/nosotros/index.html (+9ms) 
21:55:04   ├─ /pt/nosotros/index.html (+9ms) 
21:55:04   ├─ /en/servicios/index.html (+13ms) 
21:55:04   ├─ /pt/servicios/index.html (+13ms) 
21:55:04   ├─ /en/index.html (+15ms) 
21:55:04   ├─ /pt/index.html (+14ms) 
21:55:04   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:15-03:00","exit":0,"sha256":"4fe97ad5f56968ecc57e4783f5c2ba9df466f59c3ba4191cdebc5daa4e00f684","lineas":13,"omitidas":0,"no_recomprobable":"salida con marcas de tiempo y duraciones que varian entre corridas"} -->
**Evidencia `verify-report.2`** · exit 0 · 13 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: salida con marcas de tiempo y duraciones que varian entre corridas

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

21:55:10 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:55:10 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:55:11 [types] Generated 1.31s
21:55:11 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:15-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 6 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:16-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 5 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:16-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:40-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"auditoria completa con navegador y servidor propios; la corrida completa de verify corre una sola vez"} -->
**Evidencia `verify-report.5`** · exit 0 · 7 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: auditoria completa con navegador y servidor propios; la corrida completa de verify corre una sola vez

```text
npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["/usr/bin/grep","-n","-i","-E","#898580|#4A7BB5|#339965","src/lib/email-templates.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:50-03:00","exit":0,"sha256":"70b6ff2d78f4e4adaa21c465de9308c8b1980724654655f5795f7fa12db9eaab","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 2 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -i -E '#898580|#4A7BB5|#339965' src/lib/email-templates.ts
```

```text
180:    `<span style="color:#4A7BB5;font-size:24px;font-weight:600;">&rarr;</span>` +
252:    `<div style="background:#f8f7f6;border-left:3px solid #4A7BB5;padding:18px 22px;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.6;color:#37332f;border-radius:0 12px 12px 0;">` +
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["/usr/bin/grep","-rn","-i","2d9b6f","src","docs","DESIGN.md","public"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:50-03:00","exit":0,"sha256":"d6fa28f85b3e784e2274f372882ab1230c7ad4b36f5106eafc9129486373265b","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 1 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn -i 2d9b6f src docs DESIGN.md public
```

```text
src/lib/constants.ts:238:  { icon: 'lucide:wheat',         name: 'Agroindustria',      sub: 'Fruta, vinos, granos',         color: '#2D9B6F', img: indAgro },
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["/usr/bin/grep","-rn","-E","aria-label=\\{t\\(.a11y\\.(brandHome|languageCurrent)","src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T21:55:50-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 1 · 0 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T21:55:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn -E 'aria-label=\{t\(.a11y\.(brandHome|languageCurrent)' src
```

```text
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Skip link enfocado, en foco y foco+hover: color, fondo, ratio, anillo y solape con el logo (1440/1280/390 px; /, /en/, /pt/servicios/). Requiere el servidor de vista previa en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/skip.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:01:56-03:00","exit":0,"sha256":"b58d9790692d6b4e2ca8dd251a35991a3b24e14f720aa05a04cb4e03dc0fbab8","lineas":18,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.9`** · exit 0 · 18 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:01:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Skip link enfocado, en foco y foco+hover: color, fondo, ratio, anillo y solape con el logo (1440/1280/390 px; /, /en/, /pt/servicios/). Requiere el servidor de vista previa en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/skip.mjs http://127.0.0.1:4431
```

```text
1440x900 / foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1341
1440x900 / foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1341
1440x900 /en/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=333
1440x900 /en/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=333
1440x900 /pt/servicios/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1812
1440x900 /pt/servicios/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=120,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1812
1280x800 / foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2781
1280x800 / foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2781
1280x800 /en/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1773
1280x800 /en/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=1773
1280x800 /pt/servicios/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2772
1280x800 /pt/servicios/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=40,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2772
390x844 / foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2911
390x844 / foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,242,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2911
390x844 /en/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2133
390x844 /en/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,187,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2133
390x844 /pt/servicios/ foco: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2772
390x844 /pt/servicios/ foco+hover: activo=true color=rgb(255, 255, 255) fondo=rgb(59, 100, 151) ratio=6.08:1 anillo=rgb(135, 211, 176) 3px off=-5px caja=0,0,269,42 logo=20,17,38,38 solape_caja_logo_px2=935 solape_caja_nombre_px2=2772
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"# Barrido propio: contraste de todos los enlaces visibles (reposo y hover) contra su fondo opaco mas cercano, 18 paginas, 1280 y 390 px. Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/links.mjs http://127.0.0.1:4431 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:02:52-03:00","exit":0,"sha256":"a41dcbd654c6f79f978603bcb748841e627ef9b62ab484866a1c8967aa680c2c","lineas":8,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.10`** · exit 0 · 8 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:02:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Barrido propio: contraste de todos los enlaces visibles (reposo y hover) contra su fondo opaco mas cercano, 18 paginas, 1280 y 390 px. Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/links.mjs http://127.0.0.1:4431 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client
```

```text
paginas 18 {"enlaces":636,"normalBajos":60,"hoverMedidos":634,"hoverBajos":60}
Enlaces con ratio < 4.5 agrupados por estado|clase|tipo de fondo:
  hover|svc-card svc-card--std|fondo opaco n=24 min=1.00 ej: escritorio / "Aduana Chile     03 · Servic"
  hover|svc-card svc-card--wide|fondo opaco n=6 min=1.00 ej: escritorio / "D2D     06 · Servicio Courie"
  hover||fondo con imagen/degradado n=30 min=1.64 ej: escritorio /contacto/ "Inicio"
  normal|svc-card svc-card--std|fondo opaco n=24 min=1.00 ej: escritorio / "Aduana Chile     03 · Servic"
  normal|svc-card svc-card--wide|fondo opaco n=6 min=1.00 ej: escritorio / "D2D     06 · Servicio Courie"
  normal||fondo con imagen/degradado n=30 min=1.20 ej: escritorio /contacto/ "Inicio"
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"# Colores propios de los enlaces marcados como falsos positivos por el barrido (tarjeta de servicio sobre foto, migas del hero): reposo y hover. Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/falsos.mjs http://127.0.0.1:4431; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/bc.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:02:56-03:00","exit":0,"sha256":"9fc2cde346509ec3dd0e629c15b94146dcc8e94a55d3ce3a913363f90362ba85","lineas":16,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.11`** · exit 0 · 16 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:02:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Colores propios de los enlaces marcados como falsos positivos por el barrido (tarjeta de servicio sobre foto, migas del hero): reposo y hover. Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/falsos.mjs http://127.0.0.1:4431; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/bc.mjs http://127.0.0.1:4431
```

```text
["/servicios/","normal",{"cls":"svc-card svc-card--std","color":"rgb(255, 255, 255)","bgImgChain":[],"imgs":2,"overlay":true}]
["/servicios/","hover",{"cls":"svc-card svc-card--std","color":"rgb(255, 255, 255)","bgImgChain":[],"imgs":2,"overlay":true}]
["/contacto/","normal",{"cls":"nav__brand","color":"rgb(33, 31, 28)","bgImgChain":[],"imgs":1,"overlay":false}]
["/contacto/","hover",{"cls":"nav__brand","color":"rgb(33, 31, 28)","bgImgChain":[],"imgs":1,"overlay":false}]
[
 {
  "color": "rgb(215, 228, 244)",
  "chain": [
   "a. bg=rgba(0, 0, 0, 0) img=-",
   "div.page-hero__breadcrumb bg=rgba(0, 0, 0, 0) img=-",
   "div.container bg=rgba(0, 0, 0, 0) img=-",
   "section.page-hero bg=rgba(0, 0, 0, 0) img=si",
   "main. bg=rgba(0, 0, 0, 0) img=-"
  ]
 }
]
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"# Muestreo de pixeles del fondo detras del texto del placeholder de .cta-final__input (placeholder oculto), es/en/pt, escritorio y movil, reposo y foco. Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/ph.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:10-03:00","exit":0,"sha256":"d0016d2ee9c478031b9bf971d9a01a154533697db50a383b6e8676343c4ca6d5","lineas":25,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.12`** · exit 0 · 25 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:10-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Muestreo de pixeles del fondo detras del texto del placeholder de .cta-final__input (placeholder oculto), es/en/pt, escritorio y movil, reposo y foco. Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/ph.mjs http://127.0.0.1:4431
```

```text
escritorio / input#0 reposo: placeholder="tu@empresa.cl" color=rgb(174, 199, 229) region=109x24px peor_ratio=7.40:1 (pixel mas claro rgb(40,51,63)) mejor=7.51:1
escritorio / input#0 foco: placeholder="tu@empresa.cl" color=rgb(174, 199, 229) region=109x24px peor_ratio=6.85:1 (pixel mas claro rgb(46,56,68)) mejor=6.96:1
escritorio / input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
escritorio / input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
escritorio /en/ input#0 reposo: placeholder="you@company.com" color=rgb(174, 199, 229) region=143x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
escritorio /en/ input#0 foco: placeholder="you@company.com" color=rgb(174, 199, 229) region=143x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
escritorio /en/ input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
escritorio /en/ input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
escritorio /pt/ input#0 reposo: placeholder="voce@empresa.com" color=rgb(174, 199, 229) region=148x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
escritorio /pt/ input#0 foco: placeholder="voce@empresa.com" color=rgb(174, 199, 229) region=148x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
escritorio /pt/ input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
escritorio /pt/ input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
movil / input#0 reposo: placeholder="tu@empresa.cl" color=rgb(174, 199, 229) region=109x24px peor_ratio=7.40:1 (pixel mas claro rgb(40,51,63)) mejor=7.51:1
movil / input#0 foco: placeholder="tu@empresa.cl" color=rgb(174, 199, 229) region=109x24px peor_ratio=6.85:1 (pixel mas claro rgb(46,56,68)) mejor=6.96:1
movil / input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.32:1 (pixel mas claro rgb(40,52,63)) mejor=7.51:1
movil / input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.70:1 (pixel mas claro rgb(46,58,68)) mejor=6.96:1
movil /en/ input#0 reposo: placeholder="you@company.com" color=rgb(174, 199, 229) region=143x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
movil /en/ input#0 foco: placeholder="you@company.com" color=rgb(174, 199, 229) region=143x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
movil /en/ input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.32:1 (pixel mas claro rgb(40,52,63)) mejor=7.51:1
movil /en/ input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.70:1 (pixel mas claro rgb(46,58,68)) mejor=6.96:1
movil /pt/ input#0 reposo: placeholder="voce@empresa.com" color=rgb(174, 199, 229) region=148x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
movil /pt/ input#0 foco: placeholder="voce@empresa.com" color=rgb(174, 199, 229) region=148x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
movil /pt/ input#1 reposo: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=7.40:1 (pixel mas claro rgb(40,51,63)) mejor=7.51:1
movil /pt/ input#1 foco: placeholder="+56 9 1234 5678" color=rgb(174, 199, 229) region=121x24px peor_ratio=6.85:1 (pixel mas claro rgb(46,56,68)) mejor=6.96:1
peor ratio global: 6.70:1
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"archivo","argv":null,"texto":"# Mismo muestreo sobre toda la caja de contenido del campo (mas ancha que el texto). Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/ph-content.mjs http://127.0.0.1:4431 | sed -E 's/ placeholder=\"[^\"]*\"//' | tail -8\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:24-03:00","exit":0,"sha256":"97b7453724448ba71b5ebfaf00b713e4e56842c5784210747b685aee9d82403c","lineas":8,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.13`** · exit 0 · 8 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Mismo muestreo sobre toda la caja de contenido del campo (mas ancha que el texto). Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/ph-content.mjs http://127.0.0.1:4431 | sed -E 's/ placeholder="[^"]*"//' | tail -8
```

```text
movil /en/ input#0 foco: color=rgb(174, 199, 229) region=278x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
movil /en/ input#1 reposo: color=rgb(174, 199, 229) region=278x24px peor_ratio=7.32:1 (pixel mas claro rgb(40,52,63)) mejor=7.51:1
movil /en/ input#1 foco: color=rgb(174, 199, 229) region=278x24px peor_ratio=6.70:1 (pixel mas claro rgb(46,58,68)) mejor=6.96:1
movil /pt/ input#0 reposo: color=rgb(174, 199, 229) region=278x24px peor_ratio=7.51:1 (pixel mas claro rgb(39,50,62)) mejor=7.51:1
movil /pt/ input#0 foco: color=rgb(174, 199, 229) region=278x24px peor_ratio=6.96:1 (pixel mas claro rgb(45,55,67)) mejor=6.96:1
movil /pt/ input#1 reposo: color=rgb(174, 199, 229) region=278x24px peor_ratio=7.42:1 (pixel mas claro rgb(39,51,63)) mejor=7.51:1
movil /pt/ input#1 foco: color=rgb(174, 199, 229) region=278x24px peor_ratio=6.87:1 (pixel mas claro rgb(45,56,68)) mejor=6.96:1
peor ratio global: 6.70:1
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"# Titulos de tarjeta de servicios: desbordes fuera de la tarjeta y palabras partidas con guion, es/en/pt a 390/1280/1440 px. Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/hyphen.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:32-03:00","exit":0,"sha256":"5cc2e034581dc95475ccc02cefe476b6b2e369c18bdef2527c75bf3d2696b578","lineas":9,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.14`** · exit 0 · 9 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Titulos de tarjeta de servicios: desbordes fuera de la tarjeta y palabras partidas con guion, es/en/pt a 390/1280/1440 px. Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/hyphen.mjs http://127.0.0.1:4431
```

```text
390px /servicios/ lang=es-CL tarjetas=11 desbordes=[] palabras_partidas_con_guion=[] Desconsolidacao={"lineas":1,"dentro":true,"tarjeta":[20,370],"rects":[[45,203]]}
390px /en/servicios/ lang=en-US tarjetas=11 desbordes=[] palabras_partidas_con_guion=[]
390px /pt/servicios/ lang=pt-BR tarjetas=11 desbordes=[] palabras_partidas_con_guion=[] Desconsolidacao={"lineas":1,"dentro":true,"tarjeta":[20,370],"rects":[[45,213]]}
1280px /servicios/ lang=es-CL tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentación,Desconsolidado] Desconsolidacao={"lineas":2,"dentro":true,"tarjeta":[851,1037],"rects":[[876,982],[982,993],[876,927]]}
1280px /en/servicios/ lang=en-US tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentation,Deconsolidation]
1280px /pt/servicios/ lang=pt-BR tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentação,Armazenagem,Desconsolidação] Desconsolidacao={"lineas":2,"dentro":true,"tarjeta":[851,1037],"rects":[[876,982],[982,993],[876,937]]}
1440px /servicios/ lang=es-CL tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentación,Desconsolidado] Desconsolidacao={"lineas":2,"dentro":true,"tarjeta":[931,1117],"rects":[[956,1062],[1062,1073],[956,1007]]}
1440px /en/servicios/ lang=en-US tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentation,Deconsolidation]
1440px /pt/servicios/ lang=pt-BR tarjetas=11 desbordes=[] palabras_partidas_con_guion=[Documentação,Armazenagem,Desconsolidação] Desconsolidacao={"lineas":2,"dentro":true,"tarjeta":[931,1117],"rects":[[956,1062],[1062,1073],[956,1017]]}
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"# Nombre accesible (arbol de accesibilidad de Chrome) del enlace de marca y de #lang-trigger frente a su texto visible (WCAG 2.5.3). Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/names.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:37-03:00","exit":0,"sha256":"d945ada80968e0858cd59b769fd32da863a4379c79c3a468ff87ab6f89e8d489","lineas":12,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.15`** · exit 0 · 12 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Nombre accesible (arbol de accesibilidad de Chrome) del enlace de marca y de #lang-trigger frente a su texto visible (WCAG 2.5.3). Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/names.mjs http://127.0.0.1:4431
```

```text
escritorio / a.nav__brand: aria-label=null texto_visible="LOG ATM Logística a tu medida" nombre_accesible="LOG ATM LOGÍSTICA A TU MEDIDA — Inicio" empieza_por_texto_visible=true
escritorio / #lang-trigger: aria-label=null texto_visible="ES" nombre_accesible="ES — Idioma actual: Español, cambiar idioma" empieza_por_texto_visible=true
escritorio /en/ a.nav__brand: aria-label=null texto_visible="LOG ATM Logistics tailored to you" nombre_accesible="LOG ATM LOGISTICS TAILORED TO YOU — Home" empieza_por_texto_visible=true
escritorio /en/ #lang-trigger: aria-label=null texto_visible="EN" nombre_accesible="EN — Current language: English, change language" empieza_por_texto_visible=true
escritorio /pt/ a.nav__brand: aria-label=null texto_visible="LOG ATM Logística sob medida" nombre_accesible="LOG ATM LOGÍSTICA SOB MEDIDA — Início" empieza_por_texto_visible=true
escritorio /pt/ #lang-trigger: aria-label=null texto_visible="PT" nombre_accesible="PT — Idioma atual: Português, mudar idioma" empieza_por_texto_visible=true
movil / a.nav__brand: aria-label=null texto_visible="LOG ATM Logística a tu medida" nombre_accesible="LOG ATM LOGÍSTICA A TU MEDIDA — Inicio" empieza_por_texto_visible=true
movil / #lang-trigger no visible
movil /en/ a.nav__brand: aria-label=null texto_visible="LOG ATM Logistics tailored to you" nombre_accesible="LOG ATM LOGISTICS TAILORED TO YOU — Home" empieza_por_texto_visible=true
movil /en/ #lang-trigger no visible
movil /pt/ a.nav__brand: aria-label=null texto_visible="LOG ATM Logística sob medida" nombre_accesible="LOG ATM LOGÍSTICA SOB MEDIDA — Início" empieza_por_texto_visible=true
movil /pt/ #lang-trigger no visible
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"# Rama success de setQuoteStatus: color resuelto de var(--color-text-accent) sobre el fondo real de #quote-status. Requiere el servidor en 4431; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/quote.mjs http://127.0.0.1:4431\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:38-03:00","exit":0,"sha256":"e9aa522a4a0db3a5b1758e2d71a90deac55feeb0c5624c16797434ae14198779","lineas":2,"omitidas":0,"no_recomprobable":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"} -->
**Evidencia `verify-report.16`** · exit 0 · 2 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite

```bash
# Rama success de setQuoteStatus: color resuelto de var(--color-text-accent) sobre el fondo real de #quote-status. Requiere el servidor en 4431; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-1w95g2jf/quote.mjs http://127.0.0.1:4431
```

```text
estilo inline aplicado: margin: 0.5rem 0px 0px; font-size: 0.875rem; min-height: 1.25rem; color: var(--color-text-accent); | color resuelto rgb(34,102,63) | fondo opaco rgb(255,255,255) | cadena: p.quote-nav__status rgba(0, 0, 0, 0) > div.quote-card rgb(255, 255, 255)
ratio 6.91:1
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"# Ratios WCAG 2.x de los pares texto/fondo de src/lib/email-templates.ts (calculo propio de verify, pares leidos del fuente).\npython3 - <<'PY'\ndef rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]\ndef lum(c):\n    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else (((v/255)+0.055)/1.055)**2.4\n    r,g,b=[f(x) for x in c]; return 0.2126*r+0.7152*g+0.0722*b\ndef ratio(a,b):\n    la,lb=lum(rgb(a) if isinstance(a,str) else a),lum(rgb(b) if isinstance(b,str) else b)\n    if la<lb: la,lb=lb,la\n    return (la+.05)/(lb+.05)\ndef over(fg,a,bg): return [round(fg[i]*a+rgb(bg)[i]*(1-a)) for i in range(3)]\n# (descripcion, texto, fondo, umbral)\npairs=[\n (\"SLA/etiquetas metadatos/etiquetas de fila  #6e6963 / #ffffff\",\"#6e6963\",\"#ffffff\",4.5),\n (\"Folio/Formulario/Recibido/IP/User-Agent    #6e6963 / #f8f7f6\",\"#6e6963\",\"#f8f7f6\",4.5),\n (\"mailto/tel/empresa/valores de enlace      #3b6497 / #ffffff\",\"#3b6497\",\"#ffffff\",4.5),\n (\"logo A (18px/900)                         #3b6497 / #ffffff\",\"#3b6497\",\"#ffffff\",4.5),\n (\"kicker 11px                               #22663f / #ffffff\",\"#22663f\",\"#ffffff\",4.5),\n (\"etiquetas Ruta/Origen/Destino 10px        #3b6497 / #eef4fb\",\"#3b6497\",\"#eef4fb\",4.5),\n (\"valores ruta 18px/700                     #112236 / #eef4fb\",\"#112236\",\"#eef4fb\",4.5),\n (\"pill                                      #2b4e78 / #d7e4f4\",\"#2b4e78\",\"#d7e4f4\",4.5),\n (\"subtitulo/valores                         #544f4a / #ffffff\",\"#544f4a\",\"#ffffff\",4.5),\n (\"subtitulo/valores en caja                 #544f4a / #f8f7f6\",\"#544f4a\",\"#f8f7f6\",4.5),\n (\"mensaje                                   #37332f / #f8f7f6\",\"#37332f\",\"#f8f7f6\",4.5),\n (\"titulo/cuerpo                             #211f1c / #ffffff\",\"#211f1c\",\"#ffffff\",4.5),\n (\"boton email                               #ffffff / #3b6497\",\"#ffffff\",\"#3b6497\",4.5),\n (\"boton WhatsApp                            #111b21 / #25D366\",\"#111b21\",\"#25D366\",4.5),\n (\"header tagline                            #aec7e5 / #112236\",\"#aec7e5\",\"#112236\",4.5),\n (\"header tagline (extremo claro)            #aec7e5 / #1c3554\",\"#aec7e5\",\"#1c3554\",4.5),\n (\"header LOG ATM                            #ffffff / #1c3554\",\"#ffffff\",\"#1c3554\",4.5),\n (\"footer cuerpo                             #aec7e5 / #0a1624\",\"#aec7e5\",\"#0a1624\",4.5),\n (\"footer secundario 10-12px                 #658fc3 / #0a1624\",\"#658fc3\",\"#0a1624\",4.5),\n (\"footer LOG ATM                            #ffffff / #0a1624\",\"#ffffff\",\"#0a1624\",4.5),\n (\"flecha 24px/600 (texto grande)            #4A7BB5 / #eef4fb\",\"#4A7BB5\",\"#eef4fb\",3.0),\n (\"borde 3px del mensaje (no texto)          #4A7BB5 / #f8f7f6\",\"#4A7BB5\",\"#f8f7f6\",3.0),\n]\nbad=0\nfor n,f,b,u in pairs:\n    q=ratio(f,b); ok=q\u003e=u; bad+= (not ok)\n    print(f\"{q:5.2f}:1 (umbral {u})  {'OK ' if ok else 'BAJO'}  {n}\")\nfor nm,fg,al,txt in ((\"badge azul\",(74,123,181),.18,\"#9cc0ec\"),(\"badge verde\",(62,185,120),.18,\"#87d3b0\"),(\"badge ambar\",(245,180,80),.18,\"#f0c074\")):\n    for bgh in (\"#112236\",\"#1c3554\"):\n        c=over(fg,al,bgh); q=ratio(txt,c); ok=q\u003e=4.5; bad+=(not ok)\n        print(f\"{q:5.2f}:1 (umbral 4.5)  {'OK ' if ok else 'BAJO'}  {nm} {txt} sobre rgba(.18) en {bgh}\")\nprint(\"pares bajo umbral:\", bad)\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:38-03:00","exit":0,"sha256":"db083ee4010aa72e5a0fd05535cff00b3e5f10ce7655b281763d6b791d851e11","lineas":29,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.17`** · exit 0 · 29 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```bash
# Ratios WCAG 2.x de los pares texto/fondo de src/lib/email-templates.ts (calculo propio de verify, pares leidos del fuente).
python3 - <<'PY'
def rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else (((v/255)+0.055)/1.055)**2.4
    r,g,b=[f(x) for x in c]; return 0.2126*r+0.7152*g+0.0722*b
def ratio(a,b):
    la,lb=lum(rgb(a) if isinstance(a,str) else a),lum(rgb(b) if isinstance(b,str) else b)
    if la<lb: la,lb=lb,la
    return (la+.05)/(lb+.05)
def over(fg,a,bg): return [round(fg[i]*a+rgb(bg)[i]*(1-a)) for i in range(3)]
# (descripcion, texto, fondo, umbral)
pairs=[
 ("SLA/etiquetas metadatos/etiquetas de fila  #6e6963 / #ffffff","#6e6963","#ffffff",4.5),
 ("Folio/Formulario/Recibido/IP/User-Agent    #6e6963 / #f8f7f6","#6e6963","#f8f7f6",4.5),
 ("mailto/tel/empresa/valores de enlace      #3b6497 / #ffffff","#3b6497","#ffffff",4.5),
 ("logo A (18px/900)                         #3b6497 / #ffffff","#3b6497","#ffffff",4.5),
 ("kicker 11px                               #22663f / #ffffff","#22663f","#ffffff",4.5),
 ("etiquetas Ruta/Origen/Destino 10px        #3b6497 / #eef4fb","#3b6497","#eef4fb",4.5),
 ("valores ruta 18px/700                     #112236 / #eef4fb","#112236","#eef4fb",4.5),
 ("pill                                      #2b4e78 / #d7e4f4","#2b4e78","#d7e4f4",4.5),
 ("subtitulo/valores                         #544f4a / #ffffff","#544f4a","#ffffff",4.5),
 ("subtitulo/valores en caja                 #544f4a / #f8f7f6","#544f4a","#f8f7f6",4.5),
 ("mensaje                                   #37332f / #f8f7f6","#37332f","#f8f7f6",4.5),
 ("titulo/cuerpo                             #211f1c / #ffffff","#211f1c","#ffffff",4.5),
 ("boton email                               #ffffff / #3b6497","#ffffff","#3b6497",4.5),
 ("boton WhatsApp                            #111b21 / #25D366","#111b21","#25D366",4.5),
 ("header tagline                            #aec7e5 / #112236","#aec7e5","#112236",4.5),
 ("header tagline (extremo claro)            #aec7e5 / #1c3554","#aec7e5","#1c3554",4.5),
 ("header LOG ATM                            #ffffff / #1c3554","#ffffff","#1c3554",4.5),
 ("footer cuerpo                             #aec7e5 / #0a1624","#aec7e5","#0a1624",4.5),
 ("footer secundario 10-12px                 #658fc3 / #0a1624","#658fc3","#0a1624",4.5),
 ("footer LOG ATM                            #ffffff / #0a1624","#ffffff","#0a1624",4.5),
 ("flecha 24px/600 (texto grande)            #4A7BB5 / #eef4fb","#4A7BB5","#eef4fb",3.0),
 ("borde 3px del mensaje (no texto)          #4A7BB5 / #f8f7f6","#4A7BB5","#f8f7f6",3.0),
]
bad=0
for n,f,b,u in pairs:
    q=ratio(f,b); ok=q>=u; bad+= (not ok)
    print(f"{q:5.2f}:1 (umbral {u})  {'OK ' if ok else 'BAJO'}  {n}")
for nm,fg,al,txt in (("badge azul",(74,123,181),.18,"#9cc0ec"),("badge verde",(62,185,120),.18,"#87d3b0"),("badge ambar",(245,180,80),.18,"#f0c074")):
    for bgh in ("#112236","#1c3554"):
        c=over(fg,al,bgh); q=ratio(txt,c); ok=q>=4.5; bad+=(not ok)
        print(f"{q:5.2f}:1 (umbral 4.5)  {'OK ' if ok else 'BAJO'}  {nm} {txt} sobre rgba(.18) en {bgh}")
print("pares bajo umbral:", bad)
PY
```

```text
 5.44:1 (umbral 4.5)  OK   SLA/etiquetas metadatos/etiquetas de fila  #6e6963 / #ffffff
 5.08:1 (umbral 4.5)  OK   Folio/Formulario/Recibido/IP/User-Agent    #6e6963 / #f8f7f6
 6.08:1 (umbral 4.5)  OK   mailto/tel/empresa/valores de enlace      #3b6497 / #ffffff
 6.08:1 (umbral 4.5)  OK   logo A (18px/900)                         #3b6497 / #ffffff
 6.91:1 (umbral 4.5)  OK   kicker 11px                               #22663f / #ffffff
 5.49:1 (umbral 4.5)  OK   etiquetas Ruta/Origen/Destino 10px        #3b6497 / #eef4fb
14.53:1 (umbral 4.5)  OK   valores ruta 18px/700                     #112236 / #eef4fb
 6.61:1 (umbral 4.5)  OK   pill                                      #2b4e78 / #d7e4f4
 8.09:1 (umbral 4.5)  OK   subtitulo/valores                         #544f4a / #ffffff
 7.57:1 (umbral 4.5)  OK   subtitulo/valores en caja                 #544f4a / #f8f7f6
11.70:1 (umbral 4.5)  OK   mensaje                                   #37332f / #f8f7f6
16.44:1 (umbral 4.5)  OK   titulo/cuerpo                             #211f1c / #ffffff
 6.08:1 (umbral 4.5)  OK   boton email                               #ffffff / #3b6497
 8.80:1 (umbral 4.5)  OK   boton WhatsApp                            #111b21 / #25D366
 9.27:1 (umbral 4.5)  OK   header tagline                            #aec7e5 / #112236
 7.17:1 (umbral 4.5)  OK   header tagline (extremo claro)            #aec7e5 / #1c3554
12.45:1 (umbral 4.5)  OK   header LOG ATM                            #ffffff / #1c3554
10.49:1 (umbral 4.5)  OK   footer cuerpo                             #aec7e5 / #0a1624
 5.44:1 (umbral 4.5)  OK   footer secundario 10-12px                 #658fc3 / #0a1624
18.21:1 (umbral 4.5)  OK   footer LOG ATM                            #ffffff / #0a1624
 3.96:1 (umbral 3.0)  OK   flecha 24px/600 (texto grande)            #4A7BB5 / #eef4fb
 4.10:1 (umbral 3.0)  OK   borde 3px del mensaje (no texto)          #4A7BB5 / #f8f7f6
 6.93:1 (umbral 4.5)  OK   badge azul #9cc0ec sobre rgba(.18) en #112236
 5.47:1 (umbral 4.5)  OK   badge azul #9cc0ec sobre rgba(.18) en #1c3554
 6.70:1 (umbral 4.5)  OK   badge verde #87d3b0 sobre rgba(.18) en #112236
 5.26:1 (umbral 4.5)  OK   badge verde #87d3b0 sobre rgba(.18) en #1c3554
 6.61:1 (umbral 4.5)  OK   badge ambar #f0c074 sobre rgba(.18) en #112236
 5.21:1 (umbral 4.5)  OK   badge ambar #f0c074 sobre rgba(.18) en #1c3554
pares bajo umbral: 0
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"# Ratios WCAG 1.4.11 (umbral 3:1) del anillo del skip link y de la afirmacion de DESIGN.md sobre el placeholder (calculo propio).\npython3 - <<'PY'\ndef rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]\ndef lum(c):\n    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else (((v/255)+0.055)/1.055)**2.4\n    r,g,b=[f(x) for x in c]; return 0.2126*r+0.7152*g+0.0722*b\ndef ratio(a,b):\n    la,lb=lum(rgb(a)),lum(rgb(b))\n    if la<lb: la,lb=lb,la\n    return (la+.05)/(lb+.05)\nprint(f\"{ratio('#87d3b0','#3b6497'):.2f}:1  anillo accent-400 #87d3b0 sobre fondo del skip link primary-600 #3b6497\")\nprint(f\"{ratio('#ffffff','#3b6497'):.2f}:1  texto del skip link #ffffff sobre #3b6497 (reposo y hover)\")\nprint(f\"{ratio('#aec7e5','#112236'):.2f}:1  placeholder primary-200 #aec7e5 sobre primary-900 #112236 (referencia de DESIGN.md)\")\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:03:56-03:00","exit":0,"sha256":"20e0f918e40c37c373b53e1979f3831ef2865cc590f57fabc803c90a1b675b1e","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.18`** · exit 0 · 3 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:03:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```bash
# Ratios WCAG 1.4.11 (umbral 3:1) del anillo del skip link y de la afirmacion de DESIGN.md sobre el placeholder (calculo propio).
python3 - <<'PY'
def rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else (((v/255)+0.055)/1.055)**2.4
    r,g,b=[f(x) for x in c]; return 0.2126*r+0.7152*g+0.0722*b
def ratio(a,b):
    la,lb=lum(rgb(a)),lum(rgb(b))
    if la<lb: la,lb=lb,la
    return (la+.05)/(lb+.05)
print(f"{ratio('#87d3b0','#3b6497'):.2f}:1  anillo accent-400 #87d3b0 sobre fondo del skip link primary-600 #3b6497")
print(f"{ratio('#ffffff','#3b6497'):.2f}:1  texto del skip link #ffffff sobre #3b6497 (reposo y hover)")
print(f"{ratio('#aec7e5','#112236'):.2f}:1  placeholder primary-200 #aec7e5 sobre primary-900 #112236 (referencia de DESIGN.md)")
PY
```

```text
3.47:1  anillo accent-400 #87d3b0 sobre fondo del skip link primary-600 #3b6497
6.08:1  texto del skip link #ffffff sobre #3b6497 (reposo y hover)
9.27:1  placeholder primary-200 #aec7e5 sobre primary-900 #112236 (referencia de DESIGN.md)
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"argv","argv":["/usr/bin/grep","-rn","2d9b6f","src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:04:04-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.19`** · exit 1 · 0 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:04:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn 2d9b6f src
```

```text
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:04:12-03:00","exit":0,"sha256":"7c4ede58b307dac88ddfdee7a4a62089620434a0286b7ac718ac06eaebc2a519","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este informe"} -->
**Evidencia `verify-report.20`** · exit 0 · 1 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:04:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md","bloques":25,"comprobados":7,"calzan":["apply-evidence.1","apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.10","apply-evidence.11","apply-evidence.16"],"no_calzan":[],"omitidos":[{"id":"apply-evidence.5","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.6","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.7","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.8","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.9","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.12","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.13","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.14","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.15","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.17","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.18","motivo":"verify corre la suite completa sobre el mismo \u00e1rbo…(+869 caracteres)
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"339cf8601b5351e2890716ff8aca466d29d8eded","fecha":"2026-10-06T22:04:13-03:00","exit":0,"sha256":"3510bd3d9ef6390b9abc694885103e0622b475538ef9fb4739fffa4f7d3d8c78","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.21`** · exit 0 · 1 líneas, 0 omitidas · HEAD `339cf8601b53` · 2026-10-06T22:04:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md","bloques":20,"comprobados":8,"calzan":["verify-report.3","verify-report.4","verify-report.6","verify-report.7","verify-report.8","verify-report.17","verify-report.18","verify-report.19"],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite"},{"id":"verify-report.2","motivo":"salida con marcas de tiempo y duraciones que varian entre corridas"},{"id":"verify-report.5","motivo":"auditoria completa con navegador y servidor propios; la corrida completa de verify corre una sola vez"},{"id":"verify-report.9","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.10","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.11","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.12","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.13","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.14","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.15","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.16","motivo":"requiere servidor de vista previa y Chrome levantados por la fase; la corrida no se repite"},{"id":"verify-report.20","motivo":"comprobar sobre verify-report.md volveria a comprobar este informe"}],"error":null}
```
<!-- evidencia:fin verify-report.21 -->
