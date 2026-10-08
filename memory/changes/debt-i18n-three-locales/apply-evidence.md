---
type: apply-evidence
change_name: "debt-i18n-three-locales"
created: "2026-10-08"
updated: "2026-10-08"
---

# Evidencia de apply: debt-i18n-three-locales

Camino spec-first, sin `design.md`. El proyecto no tiene suite de tests ni filtro de casos en el perfil: ninguna tarea es `[TDD]` y la verificación de cada tarea es por `npm run check`, búsquedas sobre `src`, el build y el diff de `dist/client` contra la línea base (`baseline.md`). Los comandos de `npm` corren en `log-atm-web-astro/` del worktree.

Commit previo de la fase: `f882dc2` (`docs(sdd): add specs, proposal and tasks for debt-i18n-three-locales`) registra los artefactos de las fases anteriores que el worktree tenía sin commit; no toca código.

## Tarea 1: línea base de `main@1c70406`

Medición en `baseline.md` (bloques `baseline.1` a `baseline.6`), tomada antes de cualquier edición de código. La copia de `dist/client` de la línea base queda bajo el directorio de temporales del despacho para el diff de la Tarea 6. Sin commit de código: la línea base se registra en el commit de evidencia.

## Tarea 2: retirar el código RTL muerto

Se eliminan `RTL_LOCALES` (`config.ts`), `isRTL`, su import y su re-export (`utils.ts`), la constante `dir` de `BaseLayout.astro` (el `<html>` declara `dir="ltr"` literal), la constante `rtl`, la clase `is-rtl`, las reglas `[dir="rtl"]`/`.is-rtl` del drawer y la variable `--drawer-offset` de `Navbar.astro` (el panel usa `translateX(100%)`).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["bash","-c","echo \"coincidencias RTL en src: $(/usr/bin/grep -rnF -e RTL_LOCALES -e isRTL -e is-rtl -e '[dir=\"rtl\"]' -e drawer-offset src | wc -l)\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"f882dc2b544af7de3a9091de51842c74e45ffa52","fecha":"2026-10-08T20:15:36-03:00","exit":0,"sha256":"41f99679d770706c700c8a9411ee8442f3ed9067dcbe63bae119b175476dd2d6","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 0 · 1 líneas, 0 omitidas · HEAD `f882dc2b544a` · 2026-10-08T20:15:36-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'echo "coincidencias RTL en src: $(/usr/bin/grep -rnF -e RTL_LOCALES -e isRTL -e is-rtl -e '"'"'[dir="rtl"]'"'"' -e drawer-offset src | wc -l)"'
```

```text
coincidencias RTL en src: 0
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["bash","-c","npm run check 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"f882dc2b544af7de3a9091de51842c74e45ffa52","fecha":"2026-10-08T20:15:43-03:00","exit":0,"sha256":"0dc002fc3ab326d189e836f6687fa4ab6da9f6abfc86bebffa5edf52a65457e3","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 4 líneas, 0 omitidas · HEAD `f882dc2b544a` · 2026-10-08T20:15:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'npm run check 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.2 -->

Commit `6cebb35`. `apply-evidence.1`: la búsqueda en `src` de `RTL_LOCALES`, `isRTL`, `is-rtl`, `[dir="rtl"]` y `drawer-offset` no arroja coincidencias. `apply-evidence.2`: `npm run check` sin errores, avisos ni sugerencias. El `dir="ltr"` de las 18 páginas se comprueba sobre el build de la Tarea 6.

## Tarea 3: idiomas desde la definición única de `config.ts`

`config.ts` deriva `NON_DEFAULT_LOCALES` de `LOCALES` con un filtro tipado (`DEFAULT_LOCALE` pasa a `'es' satisfies Locale`, de modo que su tipo es el literal y `Exclude<Locale, typeof DEFAULT_LOCALE>` vale `'en' | 'pt'`), y su cabecera la declara definición única sin imports. `astro.config.mjs` importa `LOCALES`, `DEFAULT_LOCALE` y `SITEMAP_LOCALES` de `./src/i18n/config.ts` para el bloque `i18n` y el sitemap; `scripts/validate-i18n.ts` importa `LOCALES` y `DEFAULT_LOCALE` (maestro) de `../src/i18n/config.ts`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["bash","-c","/usr/bin/grep -nE \"'(es|en|pt)'|\\\"(es|en|pt)\\\"\" astro.config.mjs scripts/validate-i18n.ts; echo \"literales de idioma: $(/usr/bin/grep -cE \"'(es|en|pt)'|\\\"(es|en|pt)\\\"\" astro.config.mjs scripts/validate-i18n.ts | paste -sd' ')\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"6cebb359a397f563fccefd92130c07e3c56b2cc2","fecha":"2026-10-08T20:16:23-03:00","exit":0,"sha256":"8e6c081cd7563798f0c6373e07ee734bf4e16a957929f37e245774e8dbbfdccb","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 0 · 1 líneas, 0 omitidas · HEAD `6cebb359a397` · 2026-10-08T20:16:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -nE "'"'"'(es|en|pt)'"'"'|\"(es|en|pt)\"" astro.config.mjs scripts/validate-i18n.ts; echo "literales de idioma: $(/usr/bin/grep -cE "'"'"'(es|en|pt)'"'"'|\"(es|en|pt)\"" astro.config.mjs scripts/validate-i18n.ts | paste -sd'"'"' '"'"')"'
```

```text
literales de idioma: astro.config.mjs:0 scripts/validate-i18n.ts:0
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["bash","-c","set -o pipefail; npm run validate-i18n 2\u003e&1 | tail -n 2"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"6cebb359a397f563fccefd92130c07e3c56b2cc2","fecha":"2026-10-08T20:16:24-03:00","exit":0,"sha256":"133dc95e03f2372fcb10bb281953cd89d844d7497c703010f45e104a5a699107","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 2 líneas, 0 omitidas · HEAD `6cebb359a397` · 2026-10-08T20:16:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'set -o pipefail; npm run validate-i18n 2>&1 | tail -n 2'
```

```text
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin apply-evidence.4 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["bash","-c","set -o pipefail; npm run check 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"6cebb359a397f563fccefd92130c07e3c56b2cc2","fecha":"2026-10-08T20:16:31-03:00","exit":0,"sha256":"0dc002fc3ab326d189e836f6687fa4ab6da9f6abfc86bebffa5edf52a65457e3","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 4 líneas, 0 omitidas · HEAD `6cebb359a397` · 2026-10-08T20:16:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'set -o pipefail; npm run check 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.5 -->

Commit `29b2bc8`. `apply-evidence.3`: `astro.config.mjs` y `scripts/validate-i18n.ts` no contienen literales `'es'`, `'en'` ni `'pt'` (ni con comillas dobles). `apply-evidence.4`: `npm run validate-i18n` reporta `en` y `pt` en OK. `apply-evidence.5`: `npm run check` sin errores. El `npm run build` del criterio se comprueba en la Tarea 6; que `NON_DEFAULT_LOCALES` conserva `['en', 'pt']` se ve en las 6 páginas por idioma de `/en/` y `/pt/` del mismo build.

## Tarea 10: nombre del inicio localizado en el `BreadcrumbList`

`BaseLayout.astro` toma el `name` del primer ítem de `breadcrumbSchema` de `t('common.breadcrumbHome')` (Inicio / Home / Início); `t` se define en la línea 32 del frontmatter, antes de `breadcrumbSchema`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["bash","-c","echo \"literal 'Inicio' en BaseLayout.astro: $(/usr/bin/grep -c \"'Inicio'\" src/layouts/BaseLayout.astro)\"; /usr/bin/grep -n \"breadcrumbHome\" src/layouts/BaseLayout.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"29b2bc84dc3138de936a7a164c448825d1dd7c26","fecha":"2026-10-08T20:16:48-03:00","exit":0,"sha256":"675b44db644814364d0dd40fc5851250270070bb45173ad038923a8ded50183c","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.6`** · exit 0 · 2 líneas, 0 omitidas · HEAD `29b2bc84dc31` · 2026-10-08T20:16:48-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'echo "literal '"'"'Inicio'"'"' en BaseLayout.astro: $(/usr/bin/grep -c "'"'"'Inicio'"'"'" src/layouts/BaseLayout.astro)"; /usr/bin/grep -n "breadcrumbHome" src/layouts/BaseLayout.astro'
```

```text
literal 'Inicio' en BaseLayout.astro: 0
118:      name: t('common.breadcrumbHome'),
```
<!-- evidencia:fin apply-evidence.6 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["bash","-c","set -o pipefail; npm run check 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"29b2bc84dc3138de936a7a164c448825d1dd7c26","fecha":"2026-10-08T20:16:55-03:00","exit":0,"sha256":"0dc002fc3ab326d189e836f6687fa4ab6da9f6abfc86bebffa5edf52a65457e3","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.7`** · exit 0 · 4 líneas, 0 omitidas · HEAD `29b2bc84dc31` · 2026-10-08T20:16:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'set -o pipefail; npm run check 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.7 -->

Commit `38d5d41`. `apply-evidence.6`: `BaseLayout.astro` no contiene el literal `'Inicio'` y la línea 118 lee `common.breadcrumbHome`. `apply-evidence.7`: `npm run check` sin errores. Los nombres Inicio / Home / Início en `dist/client` se comprueban en las Tareas 6 y 11.

## Tarea 12: scripts de cliente sin respaldos en español

`CTASection.astro` quita el `?? "<texto>"` de las nueve entradas de `MSG` y `WhyVideoSection.astro` el de las dos etiquetas del `aria-label`. El ajuste de tipos es la aserción no nula (`!`) de TypeScript, que el bundle no conserva: el JS de cliente cambia solo por la eliminación de los respaldos. `payload.preference = "Email"` (valor que se envía al operador) y los `?? ""` de lecturas no visibles quedan como estaban.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["bash","-c","/usr/bin/grep -nE \"\\?\\? *(\\\"|')[^\\\"']+(\\\"|')\" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro; echo \"respaldos ?? con texto literal: $(/usr/bin/grep -cE \"\\?\\? *(\\\"|')[^\\\"']+(\\\"|')\" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro | paste -sd' ')\"; /usr/bin/grep -n 'payload.preference = \"Email\"' src/components/sections/CTASection.astro; git -C .. diff --stat 1c70406 -- log-atm-web-astro/src/components/sections | tail -n 1"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"38d5d411717435fdb5595200c1ffffdf786861bb","fecha":"2026-10-08T20:17:43-03:00","exit":0,"sha256":"89a5dd99915d900e5d49cbbef7033c0232c6b7c9dd10a75a6465bb18c541adb5","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.8`** · exit 0 · 3 líneas, 0 omitidas · HEAD `38d5d4117174` · 2026-10-08T20:17:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -nE "\?\? *(\"|'"'"')[^\"'"'"']+(\"|'"'"')" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro; echo "respaldos ?? con texto literal: $(/usr/bin/grep -cE "\?\? *(\"|'"'"')[^\"'"'"']+(\"|'"'"')" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro | paste -sd'"'"' '"'"')"; /usr/bin/grep -n '"'"'payload.preference = "Email"'"'"' src/components/sections/CTASection.astro; git -C .. diff --stat 1c70406 -- log-atm-web-astro/src/components/sections | tail -n 1'
```

```text
respaldos ?? con texto literal: src/components/sections/CTASection.astro:0 src/components/sections/WhyVideoSection.astro:0
347:            payload.preference = "Email";
 2 files changed, 12 insertions(+), 10 deletions(-)
```
<!-- evidencia:fin apply-evidence.8 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["bash","-c","set -o pipefail; npm run check 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"38d5d411717435fdb5595200c1ffffdf786861bb","fecha":"2026-10-08T20:17:50-03:00","exit":0,"sha256":"0dc002fc3ab326d189e836f6687fa4ab6da9f6abfc86bebffa5edf52a65457e3","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.9`** · exit 0 · 4 líneas, 0 omitidas · HEAD `38d5d4117174` · 2026-10-08T20:17:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'set -o pipefail; npm run check 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.9 -->

Commit `e7527bb`. `apply-evidence.8`: ninguno de los dos archivos contiene `??` seguido de un texto literal; `payload.preference = "Email"` sigue en la línea 347; el diff de `src/components/sections` contra `1c70406` toca solo esos dos archivos. `apply-evidence.9`: `npm run check` sin errores. El efecto sobre el JS de cliente se comprueba en la Tarea 6.

## Tareas 4, 13 y 5: notas de ADR-0002 y ADR-0003 y convención del perfil

Commit `9fbbd95`. ADR-0002 y ADR-0003 reciben al final, después de `## Estado`, la sección `## Nota de actualización — 2026-10-08`; el perfil recibe la viñeta `Idiomas` en `## Conventions`. `apply-evidence.10` muestra que los dos ADR solo suman líneas (4 añadidas, 0 borradas) y `apply-evidence.11` que el único hunk del perfil es la viñeta nueva, dentro de `## Conventions`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["git","diff","--numstat","e7527bb","9fbbd95","--","memory/adrs","memory/_profile.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:18:26-03:00","exit":0,"sha256":"faaa57f9ea4c3f9b27d68d35184d53db69382d7371059d42c88f0b4e3968d828","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.10`** · exit 0 · 3 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:18:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
git diff --numstat e7527bb 9fbbd95 -- memory/adrs memory/_profile.md
```

```text
1	0	memory/_profile.md
4	0	memory/adrs/0002-i18n-routing-pages-lang-folder.md
4	0	memory/adrs/0003-i18n-key-validation-build-hook.md
```
<!-- evidencia:fin apply-evidence.10 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["bash","-c","git diff -U0 e7527bb 9fbbd95 -- memory/_profile.md | /usr/bin/grep -E '^(@@|[+-][^+-])' | cut -c1-160; git show 9fbbd95:memory/_profile.md | /usr/bin/grep -nE '^## |^- \\*\\*Idiomas' "],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:18:26-03:00","exit":0,"sha256":"5113406350682c40362ad8c7feb92dff92582aa3bc98c846d7e35a5a58cf8620","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 9 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:18:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c 'git diff -U0 e7527bb 9fbbd95 -- memory/_profile.md | /usr/bin/grep -E '"'"'^(@@|[+-][^+-])'"'"' | cut -c1-160; git show 9fbbd95:memory/_profile.md | /usr/bin/grep -nE '"'"'^## |^- \*\*Idiomas'"'"' '
```

```text
@@ -89,0 +90 @@ updated: "2026-10-08"
14:## Stack
24:## Key Dependencies
63:## Build & Deploy
74:## Design System & Branding
82:## Conventions
90:- **Idiomas:** la lista de idiomas soportados (`LOCALES`), el idioma por defecto (`DEFAULT_LOCALE`), los idiomas con prefijo (`NON_DEFAULT_LOCALES`, derivados) y los códigos regionales (`HTML_LANG`, `OG_LOCALE`, `SITEMAP_LOCALES`) viven en `src/i18n/config.ts`, sin imports; `astro.config.mjs` (routing y sitemap) y `scripts/validate-i18n.ts` los importan de ahí, sin literales de idiomas propios
93:## Notable Implementation Details
100:## Image Pipeline (Current)
```
<!-- evidencia:fin apply-evidence.11 -->

## Tarea 6: build y diff contra la línea base

Resultado en `baseline.md`, sección «Resultado del diff (Tarea 6)», bloques `baseline.7` a `baseline.9`: build en verde con 18 páginas, lista de HTML, sitemap, `hreflang`, `og:locale` y `dir="ltr"` idénticos a la línea base, y diff clasificado. Además de las dos diferencias admitidas y de las reglas RTL del drawer que admite `clarifications.md`, el CSS del panel del drawer cambia por el reemplazo de `--drawer-offset` (hallazgo registrado en `baseline.md` y en `observations.md`).

## Tarea 8: idioma ficticio solo en la definición única, en copia aislada

Copia de `log-atm-web-astro/` de `HEAD` (`git archive`) en un `mktemp -d` bajo el directorio de temporales, fuera del repo y de todo worktree (comprobado con `realpath`), con `node_modules` enlazado al del worktree. En la copia se agrega `xx` solo en `src/i18n/config.ts`: a `LOCALES`, `LOCALE_LABELS`, `LOCALE_NAMES`, `HTML_LANG` (de donde sale `SITEMAP_LOCALES`) y `OG_LOCALE`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["bash","-c","diff -rq --exclude=node_modules /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro | /usr/bin/grep -v '^Only in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro: \\(dist\\|\\.astro\\)$'; cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/astro.config.mjs astro.config.mjs && cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/scripts/validate-i18n.ts scripts/validate-i18n.ts && echo 'astro.config.mjs y scripts/validate-i18n.ts idénticos al worktree'"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:22:06-03:00","exit":0,"sha256":"19f2384bcd7b70d4c4eff0e94a1858506c1c202dcd0b63e873abc63c64d24cb5","lineas":3,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.12`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:22:06-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'diff -rq --exclude=node_modules /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro | /usr/bin/grep -v '"'"'^Only in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro: \(dist\|\.astro\)$'"'"'; cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/astro.config.mjs astro.config.mjs && cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/scripts/validate-i18n.ts scripts/validate-i18n.ts && echo '"'"'astro.config.mjs y scripts/validate-i18n.ts idénticos al worktree'"'"''
```

```text
Files /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/src/i18n/config.ts and /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro/src/i18n/config.ts differ
Only in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro: .wrangler
astro.config.mjs y scripts/validate-i18n.ts idénticos al worktree
```
<!-- evidencia:fin apply-evidence.12 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["bash","-c","npm run validate-i18n 2\u003e&1 | /usr/bin/grep -E 'i18n\\]|ENOENT' | cut -c1-200; exit ${PIPESTATUS[0]}"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:22:06-03:00","exit":1,"sha256":"16b27b0ed85002607a0a47bc8e7f720863fa44847f05dc37395d046b3c6ae638","lineas":2,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.13`** · exit 1 · 2 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:22:06-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'npm run validate-i18n 2>&1 | /usr/bin/grep -E '"'"'i18n\]|ENOENT'"'"' | cut -c1-200; exit ${PIPESTATUS[0]}'
```

```text
Error: ENOENT: no such file or directory, open '/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro/src/i18n/trans
  code: 'ENOENT',
```
<!-- evidencia:fin apply-evidence.13 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["bash","-c","npm run validate-i18n \u003e ../validate-xx.log 2\u003e&1; st=$?; /usr/bin/grep -oE \"ENOENT: no such file or directory, open '.*/src/i18n/translations/[a-z]+\\.json'\" ../validate-xx.log | sed -E 's#open .*/src/#open src/#'; echo \"exit de validate-i18n: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:22:16-03:00","exit":1,"sha256":"48a0fcc9fb754e309e014fe822e5ade8e0ca75fc49199a78653bb62a69cff7a2","lineas":2,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.14`** · exit 1 · 2 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:22:16-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'npm run validate-i18n > ../validate-xx.log 2>&1; st=$?; /usr/bin/grep -oE "ENOENT: no such file or directory, open '"'"'.*/src/i18n/translations/[a-z]+\.json'"'"'" ../validate-xx.log | sed -E '"'"'s#open .*/src/#open src/#'"'"'; echo "exit de validate-i18n: $st"; exit $st'
```

```text
ENOENT: no such file or directory, open src/i18n/translations/xx.json'
exit de validate-i18n: 1
```
<!-- evidencia:fin apply-evidence.14 -->

`apply-evidence.12`: la copia difiere del worktree solo en `src/i18n/config.ts` (la otra línea es `.wrangler`, directorio local del worktree que `git archive` no trae), y `astro.config.mjs` y `scripts/validate-i18n.ts` son idénticos a los del worktree. `apply-evidence.13` y `apply-evidence.14`: `npm run validate-i18n` en la copia sale con exit 1 porque exige el diccionario `src/i18n/translations/xx.json`, que no existe.

Para llevar el build más allá de la validación se agrega a la copia el diccionario `xx.json` (copia de `en.json`, un archivo de datos, no de configuración) y se construye la copia: el routing de Astro genera las páginas `xx/` (las páginas de `src/pages/[lang]/` iteran `NON_DEFAULT_LOCALES`) y el sitemap emite las URLs de `xx/` y la alternativa `xx-XX`, sin editar `astro.config.mjs` ni `validate-i18n.ts`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"argv","argv":["bash","-c","npm run build \u003e ../build-xx.log 2\u003e&1; st=$?; /usr/bin/grep -E 'i18n\\] (en|pt|xx)|prerender\\]' ../build-xx.log | sed -E 's/^[0-9:]+ //'; echo \"HTML en dist/client/xx: $(find dist/client/xx -name index.html | wc -l)\"; echo \"URLs xx en sitemap: $(/usr/bin/grep -o '<loc\u003ehttps://www.logatm.com/xx/[^<]*</loc\u003e' dist/client/sitemap-0.xml | wc -l) de $(/usr/bin/grep -o '<loc\u003e' dist/client/sitemap-0.xml | wc -l)\"; echo \"alternativas hreflang=xx-XX en sitemap: $(/usr/bin/grep -o 'hreflang=\"xx-XX\"' dist/client/sitemap-0.xml | wc -l)\"; /usr/bin/grep -o '<link rel=\"alternate\" hreflang=\"xx-XX\"[^\u003e]*\u003e' dist/client/servicios/index.html; /usr/bin/grep -o '<html[^\u003e]*\u003e' dist/client/xx/servicios/index.html; echo \"exit de build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:22:39-03:00","exit":0,"sha256":"34c8aea9be8221708e35f788bd037940a2a2d1f0879c1a21b86e3579ad03f74e","lineas":10,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.15`** · exit 0 · 10 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:22:39-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/ssot-xx.LtUo1iOg/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'npm run build > ../build-xx.log 2>&1; st=$?; /usr/bin/grep -E '"'"'i18n\] (en|pt|xx)|prerender\]'"'"' ../build-xx.log | sed -E '"'"'s/^[0-9:]+ //'"'"'; echo "HTML en dist/client/xx: $(find dist/client/xx -name index.html | wc -l)"; echo "URLs xx en sitemap: $(/usr/bin/grep -o '"'"'<loc>https://www.logatm.com/xx/[^<]*</loc>'"'"' dist/client/sitemap-0.xml | wc -l) de $(/usr/bin/grep -o '"'"'<loc>'"'"' dist/client/sitemap-0.xml | wc -l)"; echo "alternativas hreflang=xx-XX en sitemap: $(/usr/bin/grep -o '"'"'hreflang="xx-XX"'"'"' dist/client/sitemap-0.xml | wc -l)"; /usr/bin/grep -o '"'"'<link rel="alternate" hreflang="xx-XX"[^>]*>'"'"' dist/client/servicios/index.html; /usr/bin/grep -o '"'"'<html[^>]*>'"'"' dist/client/xx/servicios/index.html; echo "exit de build: $st"; exit $st'
```

```text
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
[i18n] xx: OK (535 claves)
[log-atm:prerender-output-guard] [prerender] 24 páginas prerenderizadas con HTML válido
HTML en dist/client/xx: 6
URLs xx en sitemap: 6 de 24
alternativas hreflang=xx-XX en sitemap: 24
<link rel="alternate" hreflang="xx-XX" href="https://www.logatm.com/xx/servicios/">
<html lang="xx-XX" dir="ltr">
exit de build: 0
```
<!-- evidencia:fin apply-evidence.15 -->

`apply-evidence.15`: con `xx.json` presente, la validación del build reporta `xx` en OK, la guarda de prerender cuenta 24 páginas (6 por cada uno de los 4 idiomas), `dist/client/xx/` tiene 6 HTML, el sitemap tiene 6 URLs de `xx/` entre 24 y la alternativa `xx-XX` en cada una de las 24, y las páginas declaran el `hreflang` y el `lang` `xx-XX`. Al terminar, la copia se borra; `git status` del worktree no lista cambios de código (`apply-evidence.16`).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["bash","-c","echo \"cambios en log-atm-web-astro/: $(git status --porcelain --untracked-files=normal -- log-atm-web-astro | wc -l)\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:22:49-03:00","exit":0,"sha256":"2000ae82fe2b4a86b58951de436924e26d25beac9374177c9c32cd377cdeaa66","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 0 · 1 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:22:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c 'echo "cambios en log-atm-web-astro/: $(git status --porcelain --untracked-files=normal -- log-atm-web-astro | wc -l)"'
```

```text
cambios en log-atm-web-astro/: 0
```
<!-- evidencia:fin apply-evidence.16 -->

## Tarea 14: paridad y validación en build, en copia aislada

Copia nueva con la misma preparación que la Tarea 8 (`git archive` de `HEAD` en un `mktemp -d`, `realpath` comprobado, `node_modules` enlazado). En la copia se elimina la clave `common.breadcrumbHome` de `pt.json`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["bash","-c","set -o pipefail; npm run validate-i18n 2\u003e&1 | tail -n 3"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:23:03-03:00","exit":1,"sha256":"5af28e8e9dcd833cd4a3ed07f80478e611a02b7c613981955a514b6ef333fe63","lineas":3,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.17`** · exit 1 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:23:03-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'set -o pipefail; npm run validate-i18n 2>&1 | tail -n 3'
```

```text
[i18n] en: OK (535 claves)
[i18n] pt: FAIL
  - missing: common.breadcrumbHome
```
<!-- evidencia:fin apply-evidence.17 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["bash","-c","npm run build \u003e ../build-paridad.log 2\u003e&1; st=$?; /usr/bin/grep -E 'i18n\\]|Paridad de claves rota|prerender|building client|generating static' ../build-paridad.log | sed -E 's/^[0-9:]+ //' | cut -c1-160; echo \"HTML generados: $(find dist -name '*.html' 2\u003e/dev/null | wc -l)\"; echo \"exit de build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:23:07-03:00","exit":1,"sha256":"c0cb94882c4a4eff679467a1b168e43a8537460d024b5a383ac626d8e0b64dd8","lineas":6,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.18`** · exit 1 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:23:07-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'npm run build > ../build-paridad.log 2>&1; st=$?; /usr/bin/grep -E '"'"'i18n\]|Paridad de claves rota|prerender|building client|generating static'"'"' ../build-paridad.log | sed -E '"'"'s/^[0-9:]+ //'"'"' | cut -c1-160; echo "HTML generados: $(find dist -name '"'"'*.html'"'"' 2>/dev/null | wc -l)"; echo "exit de build: $st"; exit $st'
```

```text
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: FAIL
[i18n] Paridad de claves rota entre traducciones (exit 1). Ver detalles arriba.
HTML generados: 0
exit de build: 1
```
<!-- evidencia:fin apply-evidence.18 -->

`apply-evidence.17`: `npm run validate-i18n` sale con exit 1 y reporta `pt: FAIL` con `missing: common.breadcrumbHome` (idioma y clave). `apply-evidence.18`: `npm run build` se detiene en el hook `astro:build:start` («Paridad de claves rota»), con exit 1 y 0 HTML generados en la copia.

Después se restaura `pt.json` (idéntico al del worktree) y se agrega a `en.json` la clave sobrante `common.extraKeyProbe`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["bash","-c","set -o pipefail; npm run validate-i18n 2\u003e&1 | tail -n 3"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:23:17-03:00","exit":1,"sha256":"d619c3d976dbf3e3afaa12a2d7e0e685a69f24fa21b97c26469ba24ab48c4fcc","lineas":3,"omitidas":0,"no_recomprobable":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"} -->
**Evidencia `apply-evidence.19`** · exit 1 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:23:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/paridad.AY0b5Kez/log-atm-web-astro`
No re-comprobable: corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba

```text
bash -c 'set -o pipefail; npm run validate-i18n 2>&1 | tail -n 3'
```

```text
[i18n] en: FAIL
  - extra:   common.extraKeyProbe
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin apply-evidence.19 -->

`apply-evidence.19`: con la clave sobrante en `en.json`, la validación sale con exit 1 y reporta `en: FAIL` con `extra: common.extraKeyProbe`. La copia se borra al terminar.

## Tareas 9, 11 y 14: corpus de las capabilities

`apply-evidence.20` lista el `superseded_by` de las bases que el cambio reemplaza o absorbe: `i18n-routing-locale-prefixes` e `i18n-ui-selector-navbar` apuntan a `i18n-routing-pages-and-language-selector`, `i18n-seo-hreflang` a `i18n-seo-alternates-sitemap-and-breadcrumbs`, `i18n-translations-json-structure` e `i18n-translations-build-validation` a `i18n-translations-parity-and-build-validation`, e `i18n-core-translation-helpers` a `i18n-core-three-locales-single-source`. `apply-evidence.21`: en las specs vigentes (no superseded) de `i18n-routing`, los códigos `zh`, `hi` y `ar` solo aparecen en el propio criterio que pide su ausencia (frontmatter y cuerpo de `i18n-routing-pages-and-language-selector`), y las tres specs de 404 y enlaces no tienen cambios respecto de `1c70406`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"argv","argv":["bash","-c","for f in i18n-routing/i18n-routing-locale-prefixes i18n-ui-selector/i18n-ui-selector-navbar i18n-seo-hreflang/i18n-seo-hreflang i18n-translations/i18n-translations-json-structure i18n-translations/i18n-translations-build-validation i18n-core/i18n-core-translation-helpers; do echo \"$(basename $f): $(/usr/bin/grep -m1 '^superseded_by' $f.md)\"; done"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/specs","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:23:37-03:00","exit":0,"sha256":"8e28fcc238c432d74220979d4ba82d5083d43ca525df4a1f856abcc18b1d9b27","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.20`** · exit 0 · 6 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:23:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/specs`

```text
bash -c 'for f in i18n-routing/i18n-routing-locale-prefixes i18n-ui-selector/i18n-ui-selector-navbar i18n-seo-hreflang/i18n-seo-hreflang i18n-translations/i18n-translations-json-structure i18n-translations/i18n-translations-build-validation i18n-core/i18n-core-translation-helpers; do echo "$(basename $f): $(/usr/bin/grep -m1 '"'"'^superseded_by'"'"' $f.md)"; done'
```

```text
i18n-routing-locale-prefixes: superseded_by: "[[i18n-routing-pages-and-language-selector]]"
i18n-ui-selector-navbar: superseded_by: "[[i18n-routing-pages-and-language-selector]]"
i18n-seo-hreflang: superseded_by: "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
i18n-translations-json-structure: superseded_by: "[[i18n-translations-parity-and-build-validation]]"
i18n-translations-build-validation: superseded_by: "[[i18n-translations-parity-and-build-validation]]"
i18n-core-translation-helpers: superseded_by: "[[i18n-core-three-locales-single-source]]"
```
<!-- evidencia:fin apply-evidence.20 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"argv","argv":["bash","-c","for f in memory/specs/i18n-routing/*.md; do if /usr/bin/grep -q '^superseded_by: null' $f; then echo \"$(basename $f): menciones zh/hi/ar $(/usr/bin/grep -cwE 'zh|hi|ar' $f), fuera del criterio que pide su ausencia $(/usr/bin/grep -wE 'zh|hi|ar' $f | /usr/bin/grep -vc 'Ninguna spec vigente de esta capability menciona')\"; fi; done; echo \"specs de 404 y enlaces con cambios desde 1c70406: $(git diff --name-only 1c70406 -- memory/specs/i18n-routing/i18n-not-found-localized.md memory/specs/i18n-routing/i18n-not-found-navigation-and-seo-signals.md memory/specs/i18n-routing/i18n-internal-links-keep-language.md | wc -l)\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:23:37-03:00","exit":0,"sha256":"ac1660b7fced20012727b3bd54ed91dd8cbe6048a221294bcd6440e3a460fc5e","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.21`** · exit 0 · 5 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:23:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c 'for f in memory/specs/i18n-routing/*.md; do if /usr/bin/grep -q '"'"'^superseded_by: null'"'"' $f; then echo "$(basename $f): menciones zh/hi/ar $(/usr/bin/grep -cwE '"'"'zh|hi|ar'"'"' $f), fuera del criterio que pide su ausencia $(/usr/bin/grep -wE '"'"'zh|hi|ar'"'"' $f | /usr/bin/grep -vc '"'"'Ninguna spec vigente de esta capability menciona'"'"')"; fi; done; echo "specs de 404 y enlaces con cambios desde 1c70406: $(git diff --name-only 1c70406 -- memory/specs/i18n-routing/i18n-not-found-localized.md memory/specs/i18n-routing/i18n-not-found-navigation-and-seo-signals.md memory/specs/i18n-routing/i18n-internal-links-keep-language.md | wc -l)"'
```

```text
i18n-internal-links-keep-language.md: menciones zh/hi/ar 0, fuera del criterio que pide su ausencia 0
i18n-not-found-localized.md: menciones zh/hi/ar 0, fuera del criterio que pide su ausencia 0
i18n-not-found-navigation-and-seo-signals.md: menciones zh/hi/ar 0, fuera del criterio que pide su ausencia 0
i18n-routing-pages-and-language-selector.md: menciones zh/hi/ar 2, fuera del criterio que pide su ausencia 0
specs de 404 y enlaces con cambios desde 1c70406: 0
```
<!-- evidencia:fin apply-evidence.21 -->

## Tarea 9: páginas por idioma, selector y drawer sobre el build final

La lista de 18 HTML sin 404 es la de la línea base (`baseline.9`). `apply-evidence.23` (que reemplaza a `apply-evidence.22`, cuya búsqueda de la regla `@media` no calzaba con el CSS minificado), sobre `dist/client` del build de la Tarea 6: en `/`, `/en/` y `/pt/` cada uno de los dos selectores (escritorio y drawer) lista los tres idiomas y marca con `aria-current="page"` el activo; el drawer conserva `aria-hidden="true"` y la regla `prefers-reduced-motion` que anula sus transiciones. El diff de la Tarea 6 (`baseline.8`) no deja residuo en el HTML fuera de migas y scripts de `CTASection`/`WhyVideoSection`, y ningún JS común cambia: el markup del drawer y su script (inert sobre el resto del documento y focus-trap) son los de la línea base. Los exit codes de `npm run a11y` y `npm run check-i18n-links` están en la corrida de cierre (Tarea 7).

<!-- evidencia:retirado {"v":1,"id":"apply-evidence.22","sha256":"64b9ddf29210a42e2c5e1fb3bbc4096ed9e573c24fe9b551fe48ecb5aab911bb","remite":"apply-evidence.23"} -->
**Evidencia `apply-evidence.22` retirada** · remite a `apply-evidence.23` · sha256 `64b9ddf29210`

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["bash","-c","for p in index.html en/index.html pt/index.html; do echo \"$p: opciones $(/usr/bin/grep -o 'class=\"lang-selector__option[^\"]*\" hreflang=\"[a-z]*\"' dist/client/$p | sed -E 's/.*hreflang=\"([a-z]+)\"/\\1/' | sort | uniq -c | tr -s ' ' | paste -sd',' ), activas con aria-current $(/usr/bin/grep -o 'lang-selector__option is-active\" hreflang=\"[a-z]*\" aria-current=\"page\"' dist/client/$p | sed -E 's/.*hreflang=\"([a-z]+)\".*/\\1/' | paste -sd' ')\"; done; /usr/bin/grep -o '<div class=\"nav-drawer\"[^\u003e]*\u003e' dist/client/index.html; /usr/bin/grep -ho '@media *(prefers-reduced-motion:reduce){.nav-drawer__panel[^}]*}' dist/client/_astro/Footer.*.css"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:24:14-03:00","exit":0,"sha256":"dc5028dc949064530f21cfa4507dde20e3e8c571d11f8de3248b0afc790e6ba8","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.23`** · exit 0 · 5 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:24:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'for p in index.html en/index.html pt/index.html; do echo "$p: opciones $(/usr/bin/grep -o '"'"'class="lang-selector__option[^"]*" hreflang="[a-z]*"'"'"' dist/client/$p | sed -E '"'"'s/.*hreflang="([a-z]+)"/\1/'"'"' | sort | uniq -c | tr -s '"'"' '"'"' | paste -sd'"'"','"'"' ), activas con aria-current $(/usr/bin/grep -o '"'"'lang-selector__option is-active" hreflang="[a-z]*" aria-current="page"'"'"' dist/client/$p | sed -E '"'"'s/.*hreflang="([a-z]+)".*/\1/'"'"' | paste -sd'"'"' '"'"')"; done; /usr/bin/grep -o '"'"'<div class="nav-drawer"[^>]*>'"'"' dist/client/index.html; /usr/bin/grep -ho '"'"'@media *(prefers-reduced-motion:reduce){.nav-drawer__panel[^}]*}'"'"' dist/client/_astro/Footer.*.css'
```

```text
index.html: opciones  2 en, 2 es, 2 pt, activas con aria-current es es
en/index.html: opciones  2 en, 2 es, 2 pt, activas con aria-current en en
pt/index.html: opciones  2 en, 2 es, 2 pt, activas con aria-current pt pt
<div class="nav-drawer" id="nav-drawer" aria-hidden="true" data-astro-cid-o5wx45wj>
@media(prefers-reduced-motion:reduce){.nav-drawer__panel[data-astro-cid-o5wx45wj],.nav-drawer__backdrop[data-astro-cid-o5wx45wj]{transition:none!important}
```
<!-- evidencia:fin apply-evidence.23 -->

## Tarea 11: alternativas, sitemap, `og:locale` y migas contra la línea base

Sobre el build de la Tarea 6: `baseline.9` muestra `hreflang` (3 de idioma más `x-default`), `og:locale` con sus dos `og:locale:alternate` y sitemap (18 URLs con alternativas, sin 404) idénticos a la línea base, y el primer ítem de migas Inicio / Home / Início por idioma; `baseline.8` muestra que, fuera de ese `name`, el HTML (JSON-LD incluido) no deja residuo frente a la línea base. `apply-evidence.24` cruza los tags BCP-47: el `lang` de `<html>` por carpeta de idioma, los `hreflang` de las páginas y del sitemap y `HTML_LANG` de `config.ts` usan el mismo conjunto `es-CL`, `en-US`, `pt-BR`. `apply-evidence.25` sirve el build con `astro preview` y pide una URL inexistente por idioma: la 404 responde con HTTP 404 en su idioma y sin canónica, `og:url`, `hreflang` alternos ni `BreadcrumbList`. El `superseded_by` de `i18n-seo-hreflang` figura en `apply-evidence.20`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"argv","argv":["bash","-c","for loc in es en pt; do d=dist/client; [ $loc = es ] || d=dist/client/$loc; echo \"<html lang\u003e en $loc: $(cat $(find $d -maxdepth 2 -name index.html $( [ $loc = es ] && echo '-not -path */en/* -not -path */pt/*')) | /usr/bin/grep -o '<html lang=\"[^\"]*\"' | sort -u | paste -sd' ')\"; done; echo \"hreflang de idioma en páginas: $(cat $(find dist/client -name index.html) | /usr/bin/grep -o 'hreflang=\"[a-z]*-[A-Z]*\"' | sort -u | paste -sd' ')\"; echo \"hreflang del sitemap: $(/usr/bin/grep -o 'hreflang=\"[^\"]*\"' dist/client/sitemap-0.xml | sort -u | paste -sd' ')\"; echo \"HTML_LANG de config.ts: $(sed -n '/^export const HTML_LANG/,/^};/p' src/i18n/config.ts | /usr/bin/grep -o \"'[a-z]*-[A-Z]*'\" | paste -sd' ')\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:24:48-03:00","exit":0,"sha256":"e9b69fd6b4caf34899b38802d393825e08530abca4df5fea4a2e54005e22e301","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.24`** · exit 0 · 6 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:24:48-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```text
bash -c 'for loc in es en pt; do d=dist/client; [ $loc = es ] || d=dist/client/$loc; echo "<html lang> en $loc: $(cat $(find $d -maxdepth 2 -name index.html $( [ $loc = es ] && echo '"'"'-not -path */en/* -not -path */pt/*'"'"')) | /usr/bin/grep -o '"'"'<html lang="[^"]*"'"'"' | sort -u | paste -sd'"'"' '"'"')"; done; echo "hreflang de idioma en páginas: $(cat $(find dist/client -name index.html) | /usr/bin/grep -o '"'"'hreflang="[a-z]*-[A-Z]*"'"'"' | sort -u | paste -sd'"'"' '"'"')"; echo "hreflang del sitemap: $(/usr/bin/grep -o '"'"'hreflang="[^"]*"'"'"' dist/client/sitemap-0.xml | sort -u | paste -sd'"'"' '"'"')"; echo "HTML_LANG de config.ts: $(sed -n '"'"'/^export const HTML_LANG/,/^};/p'"'"' src/i18n/config.ts | /usr/bin/grep -o "'"'"'[a-z]*-[A-Z]*'"'"'" | paste -sd'"'"' '"'"')"'
```

```text
<html lang> en es: <html lang="es-CL"
<html lang> en en: <html lang="en-US"
<html lang> en pt: <html lang="pt-BR"
hreflang de idioma en páginas: hreflang="en-US" hreflang="es-CL" hreflang="pt-BR"
hreflang del sitemap: hreflang="en-US" hreflang="es-CL" hreflang="pt-BR"
HTML_LANG de config.ts: 'es-CL' 'en-US' 'pt-BR'
```
<!-- evidencia:fin apply-evidence.24 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"archivo","argv":null,"texto":"# Sonda de la 404 bajo demanda servida por `astro preview` (Tarea 11, debt-i18n-three-locales).\n# Corre en log-atm-web-astro/ del worktree, después de `npm run build`; baja el servidor al terminar.\nPORT=4398\nnode_modules/.bin/astro preview --host 127.0.0.1 --port \"$PORT\" \u003e /dev/null 2\u003e&1 &\nSRV=$!\ntrap 'kill \"$SRV\" 2\u003e/dev/null; wait \"$SRV\" 2\u003e/dev/null' EXIT\nfor _ in $(seq 1 60); do\n  curl -s -o /dev/null \"http://127.0.0.1:$PORT/\" && break\n  sleep 0.5\ndone\nst=0\nfor ruta in /ruta-inexistente/ /en/ruta-inexistente/ /pt/ruta-inexistente/; do\n  cuerpo=$(curl -s -w '\\n%{http_code}' \"http://127.0.0.1:$PORT$ruta\")\n  codigo=$(printf '%s' \"$cuerpo\" | tail -n 1)\n  html=$(printf '%s' \"$cuerpo\" | sed '$d')\n  lang=$(printf '%s' \"$html\" | grep -o '<html lang=\"[^\"]*\"' | head -n 1)\n  canon=$(printf '%s' \"$html\" | grep -c 'rel=\"canonical\"')\n  ogurl=$(printf '%s' \"$html\" | grep -c 'property=\"og:url\"')\n  alts=$(printf '%s' \"$html\" | grep -o 'rel=\"alternate\" hreflang' | wc -l)\n  migas=$(printf '%s' \"$html\" | grep -c 'BreadcrumbList')\n  robots=$(printf '%s' \"$html\" | grep -o '<meta name=\"robots\" content=\"[^\"]*\"' | head -n 1)\n  echo \"$ruta: HTTP $codigo, $lang, canonical $canon, og:url $ogurl, hreflang alternos $alts, BreadcrumbList $migas, $robots\"\n  [ \"$codigo\" = 404 ] && [ \"$canon\" = 0 ] && [ \"$ogurl\" = 0 ] && [ \"$alts\" = 0 ] && [ \"$migas\" = 0 ] || st=1\ndone\nexit \"$st\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:24:50-03:00","exit":0,"sha256":"5442d29c6c1a6a951eb15b5e2630959e8fa5cbf16b5cc746dcbbc7af2e66798a","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.25`** · exit 0 · 3 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:24:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`

```bash
# Sonda de la 404 bajo demanda servida por `astro preview` (Tarea 11, debt-i18n-three-locales).
# Corre en log-atm-web-astro/ del worktree, después de `npm run build`; baja el servidor al terminar.
PORT=4398
node_modules/.bin/astro preview --host 127.0.0.1 --port "$PORT" > /dev/null 2>&1 &
SRV=$!
trap 'kill "$SRV" 2>/dev/null; wait "$SRV" 2>/dev/null' EXIT
for _ in $(seq 1 60); do
  curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break
  sleep 0.5
done
st=0
for ruta in /ruta-inexistente/ /en/ruta-inexistente/ /pt/ruta-inexistente/; do
  cuerpo=$(curl -s -w '\n%{http_code}' "http://127.0.0.1:$PORT$ruta")
  codigo=$(printf '%s' "$cuerpo" | tail -n 1)
  html=$(printf '%s' "$cuerpo" | sed '$d')
  lang=$(printf '%s' "$html" | grep -o '<html lang="[^"]*"' | head -n 1)
  canon=$(printf '%s' "$html" | grep -c 'rel="canonical"')
  ogurl=$(printf '%s' "$html" | grep -c 'property="og:url"')
  alts=$(printf '%s' "$html" | grep -o 'rel="alternate" hreflang' | wc -l)
  migas=$(printf '%s' "$html" | grep -c 'BreadcrumbList')
  robots=$(printf '%s' "$html" | grep -o '<meta name="robots" content="[^"]*"' | head -n 1)
  echo "$ruta: HTTP $codigo, $lang, canonical $canon, og:url $ogurl, hreflang alternos $alts, BreadcrumbList $migas, $robots"
  [ "$codigo" = 404 ] && [ "$canon" = 0 ] && [ "$ogurl" = 0 ] && [ "$alts" = 0 ] && [ "$migas" = 0 ] || st=1
done
exit "$st"
```

```text
/ruta-inexistente/: HTTP 404, <html lang="es-CL", canonical 0, og:url 0, hreflang alternos 0, BreadcrumbList 0, <meta name="robots" content="noindex, nofollow"
/en/ruta-inexistente/: HTTP 404, <html lang="en-US", canonical 0, og:url 0, hreflang alternos 0, BreadcrumbList 0, <meta name="robots" content="noindex, nofollow"
/pt/ruta-inexistente/: HTTP 404, <html lang="pt-BR", canonical 0, og:url 0, hreflang alternos 0, BreadcrumbList 0, <meta name="robots" content="noindex, nofollow"
```
<!-- evidencia:fin apply-evidence.25 -->

## Tarea 7: corrida completa de cierre

Los cinco comandos del criterio de cierre, una vez, sobre el árbol final (HEAD `9fbbd95`, sin cambios de código posteriores) y el build de la Tarea 6, cuya guarda de prerender queda en verde (`baseline.7`). `npm run a11y` usa el Chrome del repo principal vía `CHROME_PATH`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.26","forma":"argv","argv":["bash","-c","set -o pipefail; npm run check 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:25:13-03:00","exit":0,"sha256":"0dc002fc3ab326d189e836f6687fa4ab6da9f6abfc86bebffa5edf52a65457e3","lineas":4,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.26`** · exit 0 · 4 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:25:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'set -o pipefail; npm run check 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.26 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.27","forma":"argv","argv":["bash","-c","set -o pipefail; npm run validate-i18n 2\u003e&1 | tail -n 2"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:25:14-03:00","exit":0,"sha256":"133dc95e03f2372fcb10bb281953cd89d844d7497c703010f45e104a5a699107","lineas":2,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.27`** · exit 0 · 2 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:25:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'set -o pipefail; npm run validate-i18n 2>&1 | tail -n 2'
```

```text
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin apply-evidence.27 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.28","forma":"argv","argv":["bash","-c","set -o pipefail; npm run check-i18n-links 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:25:14-03:00","exit":0,"sha256":"9ed4c48e0f75aced5db017aa7b72ac0eb70ec528455a10ed2b2a19cfca5c3a49","lineas":4,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.28`** · exit 0 · 4 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:25:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'set -o pipefail; npm run check-i18n-links 2>&1 | tail -n 4'
```

```text
> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.28 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.29","forma":"argv","argv":["bash","-c","export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome; npm run a11y \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/a11y-final.txt 2\u003e&1; st=$?; tail -n 6 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/a11y-final.txt; echo \"exit de a11y: $st\"; exit $st"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:25:38-03:00","exit":0,"sha256":"ae10e4a8ac5d48903095b5ae725d51236d51ffcdf32d5efa8183d25065de323f","lineas":7,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.29`** · exit 0 · 7 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:25:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome; npm run a11y > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/a11y-final.txt 2>&1; st=$?; tail -n 6 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/a11y-final.txt; echo "exit de a11y: $st"; exit $st'
```

```text
> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
exit de a11y: 0
```
<!-- evidencia:fin apply-evidence.29 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.30","forma":"argv","argv":["bash","-c","set -o pipefail; npm run measure:images 2\u003e&1 | tail -n 3"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro","head":"9fbbd95c50f72d64090782fef6e04c94cb4b87c9","fecha":"2026-10-08T20:25:39-03:00","exit":0,"sha256":"b25984495b80debc50a8ee4bed701b9322985375a2f2084d4afefe28ed9e640a","lineas":3,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.30`** · exit 0 · 3 líneas, 0 omitidas · HEAD `9fbbd95c50f7` · 2026-10-08T20:25:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'set -o pipefail; npm run measure:images 2>&1 | tail -n 3'
```

```text

escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin apply-evidence.30 -->

Los cinco terminan con exit 0: `npm run check` sin errores (`apply-evidence.26`), `npm run validate-i18n` con `en` y `pt` en OK (`apply-evidence.27`), `npm run check-i18n-links` sin violaciones sobre las 18 páginas (`apply-evidence.28`), `npm run a11y` sin violaciones ni estados HTTP inesperados en las 18 páginas y las 3 sondas 404, en escritorio y móvil (`apply-evidence.29`), y `npm run measure:images` dentro del presupuesto en escritorio y móvil (`apply-evidence.30`). El servidor de `astro preview` de `a11y` y el de la sonda de la Tarea 11 quedan detenidos.

## Specs marcadas

`spec_marks.py apply` escribe `status: review`, `feature_branch` y `worktree` en las cuatro specs de `spec_refs`.
