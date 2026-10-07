---
verdict: PARTIAL
---

# Verify Report: fix-contrast-followups

**Fecha**: 2026-10-06

Camino apply-only, `spec_refs` vacío: no hay specs, scenarios, deltas `MODIFY` ni grafo de specs que validar. Los criterios son los `Acceptance` de T1–T9 (`tasks.md`) y los «Criterios de aceptación» del brief 13 (`input.md`). Todas las cifras están en los bloques de evidencia registrados al final (`verify-report.N`), medidos por esta fase sobre el HEAD del worktree (`5b5910a`); la evidencia de `apply-evidence.md` solo se usó para ubicar capturas.

## Resultados por criterio

| Criterio | Status | Notas |
|----------|--------|-------|
| T1 / brief: sin `#898580` ni texto o enlace normal en `#4A7BB5` en `email-templates.ts` | ✅ | Bloque 6: solo quedan la flecha «→» (24px/600, texto grande, umbral 3:1) y el borde izquierdo del mensaje (no texto). El kicker `#339965` ya no aparece. |
| T1 / brief: textos y enlaces de los correos ≥ 4,5:1 sobre su fondo real | ✅ | Bloque 9 (cálculo propio de cada par, incluidos header, footer, badges, ruta, botones): ningún texto normal bajo 4,5:1; flecha y borde ≥ 3:1. |
| T2: sin `#2d9b6f` en `src/`; rama `success` con el token del form de contacto | ✅ con observación | La rama usa `var(--color-text-accent)`, el mismo que `contacto.astro` (diff y lectura de `contacto.astro:221`). Bloques 7 y 8 (búsqueda sin distinguir mayúsculas): ninguna ocurrencia en minúsculas; queda `#2D9B6F` en `src/lib/constants.ts:238` (ver hallazgo H2). |
| T3-a: links base ≥ 4,5:1 en superficies claras | ✅ | Bloque 10: en estado normal, todo enlace visible (18 páginas, escritorio y móvil) cuyo fondo opaco se resuelve queda ≥ 4,5:1; los únicos < 4,5:1 son falsos positivos con foto/degradado en la cadena de fondo (tarjetas `.svc-card` y el breadcrumb del hero, con color propio inalterado). Axe sin violaciones: bloque 5. |
| T3-b: ningún link sobre superficie oscura < 4,5:1 por heredar el color base | ❌ | En hover, `.skip-link` (superficie primary-600) pasa a primary-700 sobre primary-600, muy bajo 4,5:1 (bloques 10 y 11). Ver H1. Resto de enlaces oscuros (footer, hero, CTA, navbar dark): sin regresión en el barrido de hover (bloque 10). |
| T4 / brief: placeholder de la CTA final ≥ 4,5:1 en el peor punto, muestreo documentado | ✅ | Bloque 13 (muestreo de píxeles con el placeholder oculto, región del texto, es/en/pt, escritorio y móvil, reposo y foco): color `primary-200`, todos los píxeles de la región del texto sobre el umbral. |
| T5 / brief: el anillo del skip link no se superpone al logo (antes/después) | ✅ con observación | Capturas `capturas/t5-skiplink-antes-1440.png` (anillo blanco cruzando logo y nombre) y `...despues-1440.png` (anillo accent-400 interior, dentro de la caja opaca). La caja sigue tapando parte del logo (H5). |
| T6 / brief: `DESIGN.md` coincide con el CSS de la navegación | ✅ | Lectura contra `Navbar.astro` y `tokens.css`: `.nav__link` neutral-900 (`--color-text`), 500, 15px; hover/foco/activo `--color-brand-dark` sobre `--color-surface-alt`; drawer neutral-700, 500, 17px, hover primary-50; activo con subrayado 2px y offset .3em. Coinciden. |
| T7: «Desconsolidação» completa en `/pt/servicios/` a 390 y 1440 px | ✅ | Capturas `t7-desconsolidacao-despues-390.jpg` y `-1440.jpg`, `t7-grid-despues-pt-servicios-1440.jpg`; bloque 14: ningún desborde de títulos en es/en/pt a 390, 1280 y 1440. |
| T7: sin regresiones en `/servicios/` y `/en/services/` | ✅ con observación | Capturas `t7-grid-antes/despues-servicios|en-servicios-1440.jpg` y bloque 14: sin desbordes; cambia el corte con guion (H4). |
| T8 / brief: nombre accesible del enlace de marca y de `#lang-trigger` empieza por el texto visible y anuncia su propósito | ✅ | Bloque 15 (árbol de accesibilidad de Chrome, es/en/pt, escritorio y móvil): sin `aria-label`, nombre = texto visible + sufijo `.sr-only` localizado («— Inicio/Home/Início», «— Idioma actual: …, cambiar idioma»). `#lang-trigger` solo existe en escritorio. |
| T8: `npm run validate-i18n` sin errores | ✅ | Bloque 3 (paridad es/en/pt). |
| T9 / brief clave: `npm run a11y` exit 0, sin `label-content-name-mismatch` | ✅ | Bloque 5: 21 URLs × escritorio/móvil, 0 violaciones, 0 estados HTTP inesperados. |
| T9: `npm run check` 0 errores y build OK | ✅ | Bloques 1 y 2. |
| T9: `check-i18n-links` | ✅ | Bloque 4. |
| T9: evidencia registrada en el workspace | ✅ | `apply-evidence.md` y `capturas/`; `comprobar` sobre `apply-evidence.md` sin bloques que no calcen (bloque 16). |

**Scenarios verificados**: N/A (sin specs).

### Tests

No hay test runner en el perfil: la verificación del proyecto son los comandos de `_profile.md`. Build: bloque 1. `astro check`: bloque 2. i18n: bloques 3 y 4. Auditoría axe en Chrome real (corrida completa): bloque 5. Mediciones propias: bloque 9 (correos), 10 (barrido de enlaces normal y hover), 11 (skip link), 13 (placeholder), 14 (cortes de palabra), 15 (nombres accesibles). `comprobar`: bloques 16 (`apply-evidence.md`) y 17 (este informe).

**Cobertura**: no hay instrumento de cobertura.

## Hallazgos

**H1 (bloqueante de T3-b, regresión del cambio).** La regla nueva `a:hover { color: var(--color-primary-700) }` vive en `@layer base`, igual que `.skip-link`; con especificidad (0,1,1) frente a (0,1,0) gana el hover y el texto del skip link enfocado y con el puntero encima pasa de blanco a primary-700 sobre fondo primary-600 (bloques 10 y 11, en los tres anchos). Axe no evalúa hover, por eso `npm run a11y` sigue en exit 0. Es el único enlace con regresión: los demás colores propios de enlaces oscuros están sin capa o en `@layer components`, que ganan a `base`. Corrección: `.skip-link:hover { color: var(--color-brand-solid-text); }` en `global.css` (o mover el color del hover al propio `.skip-link`).

**H2 (observación, no bloquea).** `#2D9B6F` en mayúsculas permanece en `src/lib/constants.ts:238` (industria «Agroindustria»). Se consume solo como `--ind-color` (`IndustriesSection.astro:42`): glifo del icono dentro del círculo blanco y borde en hover (`industries.css:36,93`). No es texto: aplica el umbral 3:1 de 1.4.11 (el bloque 9 muestra el ratio sobre blanco, por encima de 3:1) y axe no reporta violación (bloque 5). El criterio literal del brief («sin `#2d9b6f` en `src/`») sí falla con búsqueda sin distinguir mayúsculas; su intención (texto y rama `success`) se cumple. Opcional: cambiar el hex por un par ≥ 3:1 ya tokenizado para cerrar el criterio al pie de la letra.

**H3 (riesgo a, aceptado).** El kicker de los correos pasó de `#339965` a `#22663f` (espejo de `--color-text-accent`). Está dentro del criterio del brief («todos los textos ≥ 4,5:1», bloque 9 para el nuevo valor) pero excede el texto literal de T1 («sin hex nuevo fuera de esos dos valores»); es un hex ya validado del sistema y queda registrado en observaciones del apply.

**H4 (riesgo b, aceptado).** `hyphens: auto` parte con guion títulos es/en/pt en tarjetas angostas a 1280 y 1440 px (bloque 14: «Documenta-ción», «Desconsoli-dado», «Documen-tation», «Deconsoli-dation» y, en pt, también «Armaze-nagem»). Antes esas palabras tocaban o invadían el borde derecho de la tarjeta (capturas «antes»); ahora ninguna desborda. A 390 px no hay cortes. Es el comportamiento que el brief pidió («permitir corte de palabra con guion»); el único costo estético es «Armazenagem» en pt, que antes cabía justa.

**H5 (riesgo c, aceptado).** La caja del skip link enfocado cubre parte del logo y del nombre de la marca (bloque 11: solape de la caja con el logo). El anillo ya no cruza el logo (captura «después»), que es lo que el criterio exige; la caja opaca es transitoria (solo con foco de teclado).

**H6 (bloque inestable, sin regresión).** `comprobar` sobre este informe lista `verify-report.2` (`npm run check`) en `no_calzan` por causa `distinto` con el mismo exit 0: su salida lleva marcas de tiempo y duraciones que varían entre corridas (`[types] Generated …s`, hora de cada línea). Vigente para el resultado: el bloque 2 (0 errores). No se re-ejecuta `comprobar`.

**Bloque obsoleto.** El bloque 12 (primer muestreo del placeholder, que cubría el campo entero y no solo la región del texto) queda retirado: vale el bloque 13.

## Hallazgos de Seguridad (si aplica)

Sin hallazgos de seguridad (dominio `fix`, sin cambios en entradas, secretos ni dependencias).

## Coherencia de Grafo de Specs

No aplica: `spec_refs` vacío.

## Acciones Requeridas

1. Corregir H1 en `src/styles/global.css` (color del `.skip-link:hover`) y volver a medir hover del skip link; no requiere rehacer la auditoría axe completa más allá de `npm run build` + `npm run a11y` de confirmación.
2. Opcional (H2): sustituir `#2D9B6F` por un color tokenizado ≥ 3:1 si se quiere el criterio literal del brief.

## Evidencia registrada

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:40:23-03:00","exit":0,"sha256":"069aca148631197c2d80147d476ed3096c2adc30e4b39b8730e1f9128cce51aa","lineas":527,"omitidas":487,"no_recomprobable":"reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 527 líneas, 487 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:40:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

21:40:15 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:40:15 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:40:17 [types] Generated 1.71s
21:40:17 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
21:40:18 [build] output: "static"
21:40:18 [build] mode: "server"
21:40:18 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/
21:40:18 [build] adapter: @astrojs/cloudflare
21:40:18 [build] Collecting build info...
21:40:18 [build] ✓ Completed in 2.23s.
21:40:18 [build] Building server entrypoints...
21:40:20 [vite] ✓ built in 2.42s
21:40:21 [vite] ✓ built in 1.45s
21:40:22 [vite] ✓ built in 721ms

 prerendering static routes 
21:40:23   ├─ /contacto/index.html (+21ms) 
21:40:23   ├─ /cotizar/index.html (+12ms) 
21:40:23   ├─ /industrias/index.html (+21ms) 
21:40:23   ├─ /nosotros/index.html (+15ms) 
21:40:23   ├─ /servicios/index.html (+22ms) 
21:40:23   ├─ /en/contacto/index.html (+10ms) 
21:40:23   ├─ /pt/contacto/index.html (+10ms) 
21:40:23   ├─ /en/cotizar/index.html (+9ms) 
21:40:23   ├─ /pt/cotizar/index.html (+8ms) 
21:40:23   ├─ /en/industrias/index.html (+11ms) 
21:40:23   ├─ /pt/industrias/index.html (+11ms) 
21:40:23   ├─ /en/nosotros/index.html (+8ms) 
21:40:23   ├─ /pt/nosotros/index.html (+8ms) 
21:40:23   ├─ /en/servicios/index.html (+13ms) 
21:40:23   ├─ /pt/servicios/index.html (+14ms) 
21:40:23   ├─ /en/index.html (+15ms) 
21:40:23   ├─ /pt/index.html (+13ms) 
21:40:23   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:40:33-03:00","exit":0,"sha256":"c399e27625ab311132adaa47a73dc4d14a4c3630bc954d5a0d4c96ec2b5c2eb6","lineas":13,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 13 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:40:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

21:40:28 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:40:28 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:40:29 [types] Generated 1.36s
21:40:29 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:40:34-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 6 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:40:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:40:34-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 5 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:40:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:41:04-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.5`** · exit 0 · 7 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:41:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["/usr/bin/grep","-n","-i","-E","#898580|#4A7BB5|#339965","src/lib/email-templates.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:41:07-03:00","exit":0,"sha256":"70b6ff2d78f4e4adaa21c465de9308c8b1980724654655f5795f7fa12db9eaab","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 2 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:41:07-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -i -E '#898580|#4A7BB5|#339965' src/lib/email-templates.ts
```

```text
180:    `<span style="color:#4A7BB5;font-size:24px;font-weight:600;">&rarr;</span>` +
252:    `<div style="background:#f8f7f6;border-left:3px solid #4A7BB5;padding:18px 22px;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.6;color:#37332f;border-radius:0 12px 12px 0;">` +
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["/usr/bin/grep","-rn","-i","2d9b6f","src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:41:07-03:00","exit":0,"sha256":"d6fa28f85b3e784e2274f372882ab1230c7ad4b36f5106eafc9129486373265b","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 1 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:41:07-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn -i 2d9b6f src
```

```text
src/lib/constants.ts:238:  { icon: 'lucide:wheat',         name: 'Agroindustria',      sub: 'Fruta, vinos, granos',         color: '#2D9B6F', img: indAgro },
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["/usr/bin/grep","-rn","-i","2d9b6f","src","docs","DESIGN.md","public"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:41:08-03:00","exit":0,"sha256":"d6fa28f85b3e784e2274f372882ab1230c7ad4b36f5106eafc9129486373265b","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 1 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:41:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn -i 2d9b6f src docs DESIGN.md public
```

```text
src/lib/constants.ts:238:  { icon: 'lucide:wheat',         name: 'Agroindustria',      sub: 'Fruta, vinos, granos',         color: '#2D9B6F', img: indAgro },
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Ratios WCAG 2.x de los pares texto/fondo de src/lib/email-templates.ts (cálculo propio de verify).\n# Badges: rgba(color,.18) compuesto sobre el extremo claro del degradado del header (#1c3554) y sobre el oscuro (#112236).\npython3 - <<'PY'\ndef rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]\ndef lum(c):\n    f=lambda v:(v/255)/12.92 if v/255<=0.04045 else (((v/255)+0.055)/1.055)**2.4\n    r,g,b=[f(x) for x in c]; return 0.2126*r+0.7152*g+0.0722*b\ndef ratio(a,b):\n    la,lb=lum(rgb(a) if isinstance(a,str) else a),lum(rgb(b) if isinstance(b,str) else b)\n    if la<lb: la,lb=lb,la\n    return (la+.05)/(lb+.05)\ndef over(fg,a,bg): return [round(fg[i]*a+rgb(bg)[i]*(1-a)) for i in range(3)]\npairs=[\n (\"SLA/metadatos #6e6963 sobre #ffffff\",\"#6e6963\",\"#ffffff\"),\n (\"metadatos #6e6963 sobre #f8f7f6\",\"#6e6963\",\"#f8f7f6\"),\n (\"mailto/tel/empresa #3b6497 sobre #ffffff\",\"#3b6497\",\"#ffffff\"),\n (\"mailto en caja metadatos #3b6497 sobre #f8f7f6\",\"#3b6497\",\"#f8f7f6\"),\n (\"kicker #22663f sobre #ffffff\",\"#22663f\",\"#ffffff\"),\n (\"logo A #3b6497 sobre #ffffff\",\"#3b6497\",\"#ffffff\"),\n (\"etiqueta Ruta #3b6497 sobre #eef4fb\",\"#3b6497\",\"#eef4fb\"),\n (\"valor ruta #112236 sobre #eef4fb\",\"#112236\",\"#eef4fb\"),\n (\"subtitulo #544f4a sobre #ffffff\",\"#544f4a\",\"#ffffff\"),\n (\"mensaje #37332f sobre #f8f7f6\",\"#37332f\",\"#f8f7f6\"),\n (\"cuerpo #211f1c sobre #ffffff\",\"#211f1c\",\"#ffffff\"),\n (\"pill #2b4e78 sobre #d7e4f4\",\"#2b4e78\",\"#d7e4f4\"),\n (\"boton email #ffffff sobre #3b6497\",\"#ffffff\",\"#3b6497\"),\n (\"boton WA #111b21 sobre #25D366\",\"#111b21\",\"#25D366\"),\n (\"header tagline #aec7e5 sobre #1c3554\",\"#aec7e5\",\"#1c3554\"),\n (\"header LOG ATM #ffffff sobre #1c3554\",\"#ffffff\",\"#1c3554\"),\n (\"footer #aec7e5 sobre #0a1624\",\"#aec7e5\",\"#0a1624\"),\n (\"footer #658fc3 sobre #0a1624\",\"#658fc3\",\"#0a1624\"),\n]\nfor n,f,b in pairs: print(f\"{ratio(f,b):5.2f}:1  {n}\")\nfor nm,fg,al,txt in ((\"badge azul\",(74,123,181),.18,\"#9cc0ec\"),(\"badge verde\",(62,185,120),.18,\"#87d3b0\"),(\"badge ambar\",(245,180,80),.18,\"#f0c074\")):\n    for bgh in (\"#112236\",\"#1c3554\"):\n        c=over(fg,al,bgh); print(f\"{ratio(txt,c):5.2f}:1  {nm} {txt} sobre rgba(.18) en {bgh}\")\nprint(f\"{ratio('#4A7BB5','#ffffff'):5.2f}:1  flecha 24px/600 #4A7BB5 sobre #eef4fb: \", f\"{ratio('#4A7BB5','#eef4fb'):.2f} (texto grande, umbral 3:1)\")\nprint(f\"{ratio('#4A7BB5','#f8f7f6'):5.2f}:1  borde 3px #4A7BB5 sobre #f8f7f6 (no texto, umbral 3:1)\")\nprint(f\"{ratio('#2D9B6F','#ffffff'):5.2f}:1  #2D9B6F (industria Agroindustria, icono) sobre blanco\")\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:41:42-03:00","exit":0,"sha256":"a12246f55d6ac3bd0d6a206babe9ecb671c1a9451815e3855352a433133a9ffd","lineas":27,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.9`** · exit 0 · 27 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:41:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```bash
# Ratios WCAG 2.x de los pares texto/fondo de src/lib/email-templates.ts (cálculo propio de verify).
# Badges: rgba(color,.18) compuesto sobre el extremo claro del degradado del header (#1c3554) y sobre el oscuro (#112236).
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
pairs=[
 ("SLA/metadatos #6e6963 sobre #ffffff","#6e6963","#ffffff"),
 ("metadatos #6e6963 sobre #f8f7f6","#6e6963","#f8f7f6"),
 ("mailto/tel/empresa #3b6497 sobre #ffffff","#3b6497","#ffffff"),
 ("mailto en caja metadatos #3b6497 sobre #f8f7f6","#3b6497","#f8f7f6"),
 ("kicker #22663f sobre #ffffff","#22663f","#ffffff"),
 ("logo A #3b6497 sobre #ffffff","#3b6497","#ffffff"),
 ("etiqueta Ruta #3b6497 sobre #eef4fb","#3b6497","#eef4fb"),
 ("valor ruta #112236 sobre #eef4fb","#112236","#eef4fb"),
 ("subtitulo #544f4a sobre #ffffff","#544f4a","#ffffff"),
 ("mensaje #37332f sobre #f8f7f6","#37332f","#f8f7f6"),
 ("cuerpo #211f1c sobre #ffffff","#211f1c","#ffffff"),
 ("pill #2b4e78 sobre #d7e4f4","#2b4e78","#d7e4f4"),
 ("boton email #ffffff sobre #3b6497","#ffffff","#3b6497"),
 ("boton WA #111b21 sobre #25D366","#111b21","#25D366"),
 ("header tagline #aec7e5 sobre #1c3554","#aec7e5","#1c3554"),
 ("header LOG ATM #ffffff sobre #1c3554","#ffffff","#1c3554"),
 ("footer #aec7e5 sobre #0a1624","#aec7e5","#0a1624"),
 ("footer #658fc3 sobre #0a1624","#658fc3","#0a1624"),
]
for n,f,b in pairs: print(f"{ratio(f,b):5.2f}:1  {n}")
for nm,fg,al,txt in (("badge azul",(74,123,181),.18,"#9cc0ec"),("badge verde",(62,185,120),.18,"#87d3b0"),("badge ambar",(245,180,80),.18,"#f0c074")):
    for bgh in ("#112236","#1c3554"):
        c=over(fg,al,bgh); print(f"{ratio(txt,c):5.2f}:1  {nm} {txt} sobre rgba(.18) en {bgh}")
print(f"{ratio('#4A7BB5','#ffffff'):5.2f}:1  flecha 24px/600 #4A7BB5 sobre #eef4fb: ", f"{ratio('#4A7BB5','#eef4fb'):.2f} (texto grande, umbral 3:1)")
print(f"{ratio('#4A7BB5','#f8f7f6'):5.2f}:1  borde 3px #4A7BB5 sobre #f8f7f6 (no texto, umbral 3:1)")
print(f"{ratio('#2D9B6F','#ffffff'):5.2f}:1  #2D9B6F (industria Agroindustria, icono) sobre blanco")
PY
```

```text
 5.44:1  SLA/metadatos #6e6963 sobre #ffffff
 5.08:1  metadatos #6e6963 sobre #f8f7f6
 6.08:1  mailto/tel/empresa #3b6497 sobre #ffffff
 5.68:1  mailto en caja metadatos #3b6497 sobre #f8f7f6
 6.91:1  kicker #22663f sobre #ffffff
 6.08:1  logo A #3b6497 sobre #ffffff
 5.49:1  etiqueta Ruta #3b6497 sobre #eef4fb
14.53:1  valor ruta #112236 sobre #eef4fb
 8.09:1  subtitulo #544f4a sobre #ffffff
11.70:1  mensaje #37332f sobre #f8f7f6
16.44:1  cuerpo #211f1c sobre #ffffff
 6.61:1  pill #2b4e78 sobre #d7e4f4
 6.08:1  boton email #ffffff sobre #3b6497
 8.80:1  boton WA #111b21 sobre #25D366
 7.17:1  header tagline #aec7e5 sobre #1c3554
12.45:1  header LOG ATM #ffffff sobre #1c3554
10.49:1  footer #aec7e5 sobre #0a1624
 5.44:1  footer #658fc3 sobre #0a1624
 6.93:1  badge azul #9cc0ec sobre rgba(.18) en #112236
 5.47:1  badge azul #9cc0ec sobre rgba(.18) en #1c3554
 6.70:1  badge verde #87d3b0 sobre rgba(.18) en #112236
 5.26:1  badge verde #87d3b0 sobre rgba(.18) en #1c3554
 6.61:1  badge ambar #f0c074 sobre rgba(.18) en #112236
 5.21:1  badge ambar #f0c074 sobre rgba(.18) en #1c3554
 4.38:1  flecha 24px/600 #4A7BB5 sobre #eef4fb:  3.96 (texto grande, umbral 3:1)
 4.10:1  borde 3px #4A7BB5 sobre #f8f7f6 (no texto, umbral 3:1)
 3.48:1  #2D9B6F (industria Agroindustria, icono) sobre blanco
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"# Barrido propio de verify: contraste de todos los enlaces visibles (normal y hover) contra su fondo opaco más cercano.\n# Requiere el servidor de vista previa levantado por la fase en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/links-scan.mjs http://127.0.0.1:4421 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:44:55-03:00","exit":0,"sha256":"3c97fa3981062cc30847b65830299bea748267a7b7cd8c7d0459be676c5f08a9","lineas":18,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.10`** · exit 0 · 18 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:44:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Barrido propio de verify: contraste de todos los enlaces visibles (normal y hover) contra su fondo opaco más cercano.
# Requiere el servidor de vista previa levantado por la fase en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/links-scan.mjs http://127.0.0.1:4421 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client
```

```text
páginas=18 enlaces visibles medidos (normal)=672; con ratio<4.5 sin degradado=30; con degradado/imagen en cadena=30
--- combinaciones color/fondo (n, ratio mínimo) ---
 1.00:1  n=  30  rgb(255, 255, 255) sobre rgb(255, 255, 255)  ej: desktop / «Aduana Chile     03 · Servicio» .svc-card svc-card--std
 1.20:1  n=  30  rgb(215, 228, 244) sobre rgb(248, 247, 246) (con degradado/imagen en la cadena)  ej: desktop /contacto/ «Inicio» .
 6.08:1  n= 120  rgb(255, 255, 255) sobre rgb(59, 100, 151)  ej: desktop / «Saltar al contenido principal» .skip-link
 6.08:1  n= 162  rgb(59, 100, 151) sobre rgb(255, 255, 255)  ej: desktop / «01 · Sector      Minería Cobre» .ind-card ind-card--photo ind-card--tall
 6.44:1  n=   6  rgb(17, 34, 54) sobre rgb(62, 185, 120)  ej: desktop / «Cotiza ahora» .btn btn--cta
 7.30:1  n=  12  rgb(43, 78, 120) sobre rgb(239, 237, 235)  ej: desktop /contacto/ «Contacto» .nav__link is-active
 8.80:1  n=  30  rgb(17, 27, 33) sobre rgb(37, 211, 102)  ej: desktop / «WhatsApp  (se abre en nueva pe» .btn btn--wa
10.81:1  n= 144  rgb(200, 196, 193) sobre rgb(19, 18, 16)  ej: desktop / «Nosotros» .
15.36:1  n=  96  rgb(33, 31, 28) sobre rgb(248, 247, 246)  ej: desktop / «LOG ATM Logística a tu medida » .nav__brand
18.21:1  n=   6  rgb(255, 255, 255) sobre rgb(10, 22, 36)  ej: desktop / «WhatsApp» .btn btn--ghost-light
18.72:1  n=  36  rgb(255, 255, 255) sobre rgb(19, 18, 16)  ej: desktop / «LOG ATM Logística a tu medida» .nav__brand nav__brand--footer
--- hover (escritorio): enlaces con :hover efectivo=381; con ratio<4.5 = 48
/ «Saltar al contenido princ» .skip-link rgb(43, 78, 120) sobre rgb(59, 100, 151) = 1.40
/ «Aduana Chile     03 · Ser» .svc-card svc-card--std rgb(255, 255, 255) sobre rgb(255, 255, 255) = 1.00
/ «D2D     06 · Servicio Cou» .svc-card svc-card--wide rgb(255, 255, 255) sobre rgb(255, 255, 255) = 1.00
/contacto/ «Inicio» . rgb(215, 228, 244) sobre rgb(248, 247, 246) (grad) = 1.20
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"# Skip link enfocado: geometría frente al logo y color en hover. Requiere el servidor de vista previa en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/skip.mjs http://127.0.0.1:4421\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:45:15-03:00","exit":0,"sha256":"a121d7f8186418917e21bd704b6fc9f456b077184187aa0526f823a187c3d534","lineas":15,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.11`** · exit 0 · 15 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:45:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Skip link enfocado: geometría frente al logo y color en hover. Requiere el servidor de vista previa en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/skip.mjs http://127.0.0.1:4421
```

```text
[1440] foco=true focus-visible=true outline=3px solid rgb(135, 211, 176) offset -5px
  caja skip={"x":0,"y":0,"w":242.484375,"h":41.59375,"r":242.484375,"b":41.59375} logo={"x":120,"y":17,"w":38,"h":38,"r":158,"b":55}
  solape caja skip x logo = 935 px2 (logo 1444 px2); x nombre marca = 1341 px2
  anillo (offset -5, 2px?) queda dentro de la caja: true; caja izq/der/sup/inf = 0,242.484375,0,41.59375
  hover=true color=rgb(43, 78, 120) fondo=rgb(59, 100, 151) ratio=1.40:1
[1280] foco=true focus-visible=true outline=3px solid rgb(135, 211, 176) offset -5px
  caja skip={"x":0,"y":0,"w":242.484375,"h":41.59375,"r":242.484375,"b":41.59375} logo={"x":40,"y":17,"w":38,"h":38,"r":78,"b":55}
  solape caja skip x logo = 935 px2 (logo 1444 px2); x nombre marca = 2781 px2
  anillo (offset -5, 2px?) queda dentro de la caja: true; caja izq/der/sup/inf = 0,242.484375,0,41.59375
  hover=true color=rgb(43, 78, 120) fondo=rgb(59, 100, 151) ratio=1.40:1
[390] foco=true focus-visible=true outline=3px solid rgb(135, 211, 176) offset -5px
  caja skip={"x":0,"y":0,"w":242.484375,"h":41.59375,"r":242.484375,"b":41.59375} logo={"x":20,"y":17,"w":38,"h":38,"r":58,"b":55}
  solape caja skip x logo = 935 px2 (logo 1444 px2); x nombre marca = 2911 px2
  anillo (offset -5, 2px?) queda dentro de la caja: true; caja izq/der/sup/inf = 0,242.484375,0,41.59375
  hover=true color=rgb(43, 78, 120) fondo=rgb(59, 100, 151) ratio=1.40:1
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"# Muestreo propio del placeholder de la CTA final. Requiere el servidor de vista previa en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/placeholder.mjs http://127.0.0.1:4421\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:46:03-03:00","exit":0,"sha256":"f7e88a7227e1037289c62a7e152a8f673f9c9d30d786667b1bb81e9fee8ebe1b","lineas":12,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.12`** · exit 0 · 12 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:46:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Muestreo propio del placeholder de la CTA final. Requiere el servidor de vista previa en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/placeholder.mjs http://127.0.0.1:4421
```

```text
escritorio / reposo: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(71,80,91) → ratio 4.71:1; más oscuro rgb(39,50,62) → 7.51:1
escritorio / foco: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(130,203,171) → ratio 1.09:1; más oscuro rgb(45,55,67) → 6.96:1
escritorio /en/ reposo: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(71,80,91) → ratio 4.71:1; más oscuro rgb(39,50,62) → 7.51:1
escritorio /en/ foco: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(130,203,171) → ratio 1.09:1; más oscuro rgb(45,55,67) → 6.96:1
escritorio /pt/ reposo: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(71,80,91) → ratio 4.71:1; más oscuro rgb(22,33,47) → 9.36:1
escritorio /pt/ foco: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; 229x46px muestreados; píxel más claro rgb(132,206,172) → ratio 1.06:1; más oscuro rgb(22,33,47) → 9.36:1
móvil / reposo: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(66,75,86) → ratio 5.10:1; más oscuro rgb(39,50,62) → 7.51:1
móvil / foco: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(106,163,142) → ratio 1.67:1; más oscuro rgb(45,55,67) → 6.96:1
móvil /en/ reposo: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(68,77,88) → ratio 4.94:1; más oscuro rgb(39,50,62) → 7.51:1
móvil /en/ foco: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(130,203,171) → ratio 1.09:1; más oscuro rgb(45,55,67) → 6.96:1
móvil /pt/ reposo: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(68,77,88) → ratio 4.94:1; más oscuro rgb(39,50,62) → 7.51:1
móvil /pt/ foco: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; 308x46px muestreados; píxel más claro rgb(132,206,172) → ratio 1.06:1; más oscuro rgb(45,55,67) → 6.96:1
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"archivo","argv":null,"texto":"# Muestreo propio del placeholder de la CTA final. Requiere el servidor de vista previa en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/placeholder.mjs http://127.0.0.1:4421\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:46:35-03:00","exit":0,"sha256":"72da78ed895fbf7fca9b41ec5e45ad9545436c310981629413b8e0894c9a5f2a","lineas":12,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.13`** · exit 0 · 12 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:46:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Muestreo propio del placeholder de la CTA final. Requiere el servidor de vista previa en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/placeholder.mjs http://127.0.0.1:4421
```

```text
escritorio / reposo: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; región del texto x 15-124 y 10-36 (2834 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
escritorio / foco: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; región del texto x 15-124 y 10-36 (2834 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
escritorio /en/ reposo: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; región del texto x 15-158 y 10-36 (3718 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
escritorio /en/ foco: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; región del texto x 15-158 y 10-36 (3718 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
escritorio /pt/ reposo: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; región del texto x 15-163 y 10-36 (3848 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
escritorio /pt/ foco: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; región del texto x 15-163 y 10-36 (3848 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
móvil / reposo: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; región del texto x 15-124 y 10-36 (2834 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
móvil / foco: placeholder "tu@empresa.cl" color=rgb(174, 199, 229) op=1; región del texto x 15-124 y 10-36 (2834 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
móvil /en/ reposo: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; región del texto x 15-158 y 10-36 (3718 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
móvil /en/ foco: placeholder "you@company.com" color=rgb(174, 199, 229) op=1; región del texto x 15-158 y 10-36 (3718 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
móvil /pt/ reposo: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; región del texto x 15-163 y 10-36 (3848 px); píxel más claro rgb(39,50,62) → ratio 7.51:1; más oscuro rgb(39,50,62) → 7.51:1
móvil /pt/ foco: placeholder "voce@empresa.com" color=rgb(174, 199, 229) op=1; región del texto x 15-163 y 10-36 (3848 px); píxel más claro rgb(45,55,67) → ratio 6.96:1; más oscuro rgb(45,55,67) → 6.96:1
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"# Palabras de títulos de card partidas y desbordes, es/en/pt a 390/1280/1440. Requiere el servidor de vista previa en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/hyphen.mjs http://127.0.0.1:4421\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:46:59-03:00","exit":0,"sha256":"f00f893b326cb3776690e369cdd3c87a94220f84c44faa163cc9f167e7ee09ab","lineas":9,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.14`** · exit 0 · 9 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:46:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Palabras de títulos de card partidas y desbordes, es/en/pt a 390/1280/1440. Requiere el servidor de vista previa en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/hyphen.mjs http://127.0.0.1:4421
```

```text
/servicios/ @390 lang=es-CL títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: ninguna; desbordes: 0
/servicios/ @1280 lang=es-CL títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentación» en «Aduana y Documentación» (ancho 137px); «Desconsolidado» en «Desconsolidado» (ancho 137px); desbordes: 0
/servicios/ @1440 lang=es-CL títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentación» en «Aduana y Documentación» (ancho 137px); «Desconsolidado» en «Desconsolidado» (ancho 137px); desbordes: 0
/en/servicios/ @390 lang=en-US títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: ninguna; desbordes: 0
/en/servicios/ @1280 lang=en-US títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentation» en «Customs & Documentation» (ancho 137px); «Deconsolidation» en «Deconsolidation» (ancho 137px); desbordes: 0
/en/servicios/ @1440 lang=en-US títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentation» en «Customs & Documentation» (ancho 137px); «Deconsolidation» en «Deconsolidation» (ancho 137px); desbordes: 0
/pt/servicios/ @390 lang=pt-BR títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: ninguna; desbordes: 0
/pt/servicios/ @1280 lang=pt-BR títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentação» en «Aduana e Documentação» (ancho 137px); «Armazenagem» en «Armazenagem» (ancho 137px); «Desconsolidação» en «Desconsolidação» (ancho 137px); desbordes: 0
/pt/servicios/ @1440 lang=pt-BR títulos=11 (hyphens=auto, overflow-wrap=anywhere, fuente=30px); palabras partidas: «Documentação» en «Aduana e Documentação» (ancho 137px); «Armazenagem» en «Armazenagem» (ancho 137px); «Desconsolidação» en «Desconsolidação» (ancho 137px); desbordes: 0
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"# Nombre accesible vs texto visible (WCAG 2.5.3). Requiere el servidor de vista previa en 4421; no re-comprobable.\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/names.mjs http://127.0.0.1:4421\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:47:45-03:00","exit":0,"sha256":"505bb7b4553688c396f6c0702b3f99e18dbdb148ec9476588138229faecc1a86","lineas":16,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"} -->
**Evidencia `verify-report.15`** · exit 0 · 16 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:47:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar

```bash
# Nombre accesible vs texto visible (WCAG 2.5.3). Requiere el servidor de vista previa en 4421; no re-comprobable.
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-verify-7a78q76m/names.mjs http://127.0.0.1:4421
```

```text
escritorio / #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA A TU MEDIDA — Inicio" | texto visible="LOG ATM Logística a tu medida" | empieza por el visible: true | aria-label presente: false
escritorio / #lang-trigger: rol=button nombre="ES — Idioma actual: Español, cambiar idioma" | texto visible="ES" | empieza por el visible: true | aria-label presente: false
escritorio /en/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGISTICS TAILORED TO YOU — Home" | texto visible="LOG ATM Logistics tailored to you" | empieza por el visible: true | aria-label presente: false
escritorio /en/ #lang-trigger: rol=button nombre="EN — Current language: English, change language" | texto visible="EN" | empieza por el visible: true | aria-label presente: false
escritorio /pt/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA SOB MEDIDA — Início" | texto visible="LOG ATM Logística sob medida" | empieza por el visible: true | aria-label presente: false
escritorio /pt/ #lang-trigger: rol=button nombre="PT — Idioma atual: Português, mudar idioma" | texto visible="PT" | empieza por el visible: true | aria-label presente: false
escritorio /pt/servicios/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA SOB MEDIDA — Início" | texto visible="LOG ATM Logística sob medida" | empieza por el visible: true | aria-label presente: false
escritorio /pt/servicios/ #lang-trigger: rol=button nombre="PT — Idioma atual: Português, mudar idioma" | texto visible="PT" | empieza por el visible: true | aria-label presente: false
móvil / #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA A TU MEDIDA — Inicio" | texto visible="LOG ATM Logística a tu medida" | empieza por el visible: true | aria-label presente: false
móvil / #lang-trigger: no visible en este ancho
móvil /en/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGISTICS TAILORED TO YOU — Home" | texto visible="LOG ATM Logistics tailored to you" | empieza por el visible: true | aria-label presente: false
móvil /en/ #lang-trigger: no visible en este ancho
móvil /pt/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA SOB MEDIDA — Início" | texto visible="LOG ATM Logística sob medida" | empieza por el visible: true | aria-label presente: false
móvil /pt/ #lang-trigger: no visible en este ancho
móvil /pt/servicios/ #navbar a.nav__brand: rol=link nombre="LOG ATM LOGÍSTICA SOB MEDIDA — Início" | texto visible="LOG ATM Logística sob medida" | empieza por el visible: true | aria-label presente: false
móvil /pt/servicios/ #lang-trigger: no visible en este ancho
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:48:26-03:00","exit":0,"sha256":"0c7e09b8e7be0f031e49e78c7d00597ec56421b161277a0511797262ec29614a","lineas":1,"omitidas":0,"no_recomprobable":"re-comprobar verify-report.md desde su propio bloque lo volvería a comprobar a sí mismo; este bloque es la única corrida de comprobar sobre apply-evidence.md"} -->
**Evidencia `verify-report.16`** · exit 0 · 1 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:48:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: re-comprobar verify-report.md desde su propio bloque lo volvería a comprobar a sí mismo; este bloque es la única corrida de comprobar sobre apply-evidence.md

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/apply-evidence.md","bloques":20,"comprobados":7,"calzan":["apply-evidence.1","apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.10","apply-evidence.11","apply-evidence.16"],"no_calzan":[],"omitidos":[{"id":"apply-evidence.5","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.6","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.7","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.8","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.9","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.12","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.13","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.14","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.15","motivo":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"},{"id":"apply-evidence.17","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.18","motivo":"verify corre la suite completa sobre el mismo \u00e1rbo…(+271 caracteres)
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"5b5910a1f03e36e5863d81e038590b5942089ca0","fecha":"2026-10-06T21:48:38-03:00","exit":1,"sha256":"d83a50356588108d7f1666e67e577a756bc47fcada532ddd084c768d1c7af975","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría este informe a sí mismo"} -->
**Evidencia `verify-report.17`** · exit 1 · 1 líneas, 0 omitidas · HEAD `5b5910a1f03e` · 2026-10-06T21:48:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaría este informe a sí mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/memory/changes/fix-contrast-followups/verify-report.md","bloques":16,"comprobados":7,"calzan":["verify-report.3","verify-report.4","verify-report.6","verify-report.7","verify-report.8","verify-report.9"],"no_calzan":[{"id":"verify-report.2","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"verify-report.1","motivo":"reescribe dist/ y la corrida completa de verify corre una sola vez; comprobar no la repite"},{"id":"verify-report.5","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.10","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.11","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.12","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.13","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.14","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.15","motivo":"requiere el servidor de vista previa levantado por la fase (puerto 4421), que se baja al cerrar"},{"id":"verify-report.16","motivo":"re-comprobar verify-report.md desde su propio bloque lo volver\u00eda a comprobar a s\u00ed mismo; este bloque es la \u00fanica corrida de comprobar sobre apply-evidence.md"}],"error":null}
```
<!-- evidencia:fin verify-report.17 -->
