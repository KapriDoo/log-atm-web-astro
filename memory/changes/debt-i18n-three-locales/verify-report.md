---
verdict: PASS
---

# Verify Report: debt-i18n-three-locales

**Fecha**: 2026-10-08

**Árbol verificado**: `HEAD` de `feature/debt-i18n-three-locales` (bloque `verify-report.1`), con `main@1c70406` como base de la comparación (`verify-report.2`: es el `merge-base`). Toda comparación usa evidencia propia de esta fase: la base se construyó desde `git archive 1c70406` y el HEAD desde `git archive HEAD`, ambos en copias aisladas bajo el directorio de temporales de la fase (`verify-report.9`). Los bloques de línea base y de copia aislada de `baseline.md` no se reutilizan como evidencia.

## Resultados por Spec

### Tres idiomas soportados con lista única y respaldo en español (`i18n-core-three-locales-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. `/` en español, `/en/` y `/pt/` en inglés y portugués | ✅ | `verify-report.24` (diccionarios, `lang` y `og` por idioma) y `verify-report.10` (el HTML del cambio no altera textos fuera de la lista cerrada). |
| 2. Clave solo en español se muestra en español en los tres idiomas | ✅ | `verify-report.26`: con la clave borrada de `pt.json` y `en.json`, `t()` devuelve el texto en español sin aviso. |
| 3. Clave inexistente se muestra como su literal con aviso en consola | ✅ | `verify-report.24`: devuelve la propia clave y emite un aviso. |
| 4. Interpolación `{nombre}` | ✅ | `verify-report.26`, en inglés y en portugués. |
| 5. Páginas en izquierda a derecha y sin `RTL_LOCALES`, `isRTL`, `is-rtl`, `[dir="rtl"]` en `src` | ✅ | `verify-report.3` (sin coincidencias de texto), `verify-report.4` (la búsqueda sin distinguir mayúsculas solo coincide con bytes dentro de imágenes JPEG, no con texto de código) y `verify-report.11` (`dir="ltr"` en todas las páginas, ninguna con `rtl`). |
| 6. Línea base medida en `main@1c70406` | ✅ | `baseline.md` existe; esta fase la reprodujo con su propia construcción de la base (`verify-report.9`, `verify-report.10`) y la lista de HTML coincide con la del HEAD. |
| 7. Diff de `dist/client` solo dentro de la lista cerrada; sitemap y `hreflang` idénticos | ✅ | `verify-report.10` y `verify-report.11`; detalle en «Diff de `dist/client`». |
| 8. Idioma ficticio solo en la definición única; sin literales de idiomas en `astro.config.mjs` ni `validate-i18n.ts` | ✅ | `verify-report.19` (routing, sitemap y validador reconocen `xx`; ambos archivos idénticos al worktree) y `verify-report.8` (sin literales). |
| 9. Cinco comandos en exit 0 y guarda de prerender en verde | ✅ | `verify-report.12` a `verify-report.16` y la guarda en `verify-report.9`. |
| 10. Nota fechada de ADR-0002 con tres idiomas, seis páginas, 404 bajo demanda y ADR-0007, sin reescribir | ✅ | `verify-report.27`: solo líneas añadidas y la nota contiene lo exigido. |

**Scenarios verificados**: 7/7 (los siete cubiertos por los bloques citados; el escenario del idioma agregado a la lista única por `verify-report.19`).

### Seis páginas por idioma con prefijo y selector (`i18n-routing-pages-and-language-selector`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Mismas páginas prerenderizadas que la base y 404 fuera de la cuenta | ✅ | `verify-report.10` (misma lista de HTML) y `verify-report.11` (ningún `404*.html` en `dist/client`). |
| 2. Español sin prefijo; inglés y portugués bajo `/en/` y `/pt/` | ✅ | Rutas del sitemap y lista de HTML (`verify-report.10`, `verify-report.11`). |
| 3. URL abierta directamente preserva idioma sin redirección | ✅ | `verify-report.16`: la auditoría exige respuesta directa de cada página compilada. |
| 4. Selector en escritorio y drawer, con los tres idiomas | ✅ | `verify-report.28` (dos variantes por página, tres opciones cada una) y la captura del drawer abierto. |
| 5. Cambio de idioma a la misma ruta y `aria-current` | ✅ | `verify-report.28`: destinos de `/en/servicios/` y marca activa. |
| 6. Drawer con inert, focus-trap y `prefers-reduced-motion`; selector operable con teclado | ✅ | `verify-report.29` (el `<script>` del Navbar es idéntico al de la base y la regla de movimiento reducido sigue) y `verify-report.18` (Escape y backdrop cierran, también con movimiento reducido). |
| 7. `npm run a11y` y `check-i18n-links` en exit 0 | ✅ | `verify-report.16` y `verify-report.14`. |
| 8. Ninguna spec vigente menciona `zh`, `hi`, `ar`; las tres specs de 404 y enlaces conservan contenido y estado | ✅ | `verify-report.30`. Ver la observación 1 sobre el único texto que nombra esos códigos. |
| 9. `locale-prefixes` y `ui-selector` declaran `superseded_by` hacia esta spec | ✅ | `verify-report.30`. |
| 10. ADR-0002 referencia a ADR-0007 en su nota | ✅ | `verify-report.27`. |

**Scenarios verificados**: 8/8 (corpus, HTML compilado y prueba de navegador; el 404 con prefijo se cubre con `verify-report.17`).

### Alternativas de idioma, sitemap y migas localizadas (`i18n-seo-alternates-sitemap-and-breadcrumbs`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Tres `hreflang` de idioma más `x-default`, idénticos a la base | ✅ | `verify-report.28` (cuatro enlaces por página, igual que la base) y `verify-report.10` (el `<head>` no figura entre las diferencias). |
| 2. `og:locale` y dos `og:locale:alternate` | ✅ | `verify-report.28`. |
| 3. Sitemap idéntico a la base, 18 URLs, sin la 404 | ✅ | `verify-report.11`: ambos `sitemap-*.xml` idénticos byte a byte. |
| 4. Tags BCP-47 del sitemap y de `hreflang` coinciden con `lang` y con la definición única | ✅ | `verify-report.24` (`HTML_LANG`) y `verify-report.11` (sitemap idéntico, páginas con `lang` regional). |
| 5. La 404 no emite alternativas, canónica, `og:url` ni migas | ✅ | `verify-report.17`, servida por `astro preview` en los tres prefijos y con HTML igual al de la base. |
| 6. Nombre del primer ítem de migas en tres idiomas, única diferencia de datos estructurados | ✅ | `verify-report.10`: las páginas de `en` y `pt` difieren solo en ese nombre; las de `es` no cambian. |
| 7. `i18n-seo-hreflang` declara `superseded_by` hacia esta spec | ✅ | `verify-report.30`. |

**Scenarios verificados**: 4/4.

### Paridad de diccionarios en tres idiomas, validación en build y textos sin respaldo (`i18n-translations-parity-and-build-validation`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Mismo conjunto de claves y namespaces por área | ✅ | `verify-report.13`; ningún diccionario cambia en este cambio (`verify-report.27`). |
| 2. Maestro en español refleja el microcopy actual | ✅ | El cambio no modifica ningún diccionario (`verify-report.27`); el criterio hereda el estado ya verificado de la base. |
| 3. `npm run build` falla con divergencia y el reporte indica idioma y clave | ✅ | `verify-report.20` y `verify-report.22` (clave faltante en `pt`, clave sobrante en `en`). |
| 4. Validación antes del HTML y script independiente | ✅ | `verify-report.20` (el build fallido no deja `dist/client`) y `verify-report.13`. |
| 5. `validate-i18n.ts` sin literales de idiomas, con idiomas y maestro de la definición única | ✅ | `verify-report.8` y `verify-report.19`. |
| 6. Sin respaldos `??` con texto en español en `CTASection` y `WhyVideoSection` | ✅ | `verify-report.8`; el valor `payload.preference = "Email"` sigue en su lugar (`verify-report.7`) y los `?? ""` restantes de `CTASection` no son texto visible. |
| 7. HTML difiere de la base solo en el script de cliente, por la eliminación de respaldos | ✅ | `verify-report.10`, clasificación de scripts. |
| 8. `json-structure` y `build-validation` declaran `superseded_by` hacia esta spec | ✅ | `verify-report.30`. |
| 9. Nota fechada de ADR-0003 (`prebuild` nunca existió; `astro:build:start` mecanismo único) | ✅ | `verify-report.27`. |

**Scenarios verificados**: 7/7 (el de «visitante en inglés recibe un error del formulario» y el del control de video se verifican por ausencia de respaldos, `verify-report.8`, y por la presencia de los `data-*` renderizados desde el i18n, `verify-report.10`).

## Diff de `dist/client` contra la línea base

Criterio aplicado: la lista cerrada del despacho, con evidencia propia (`verify-report.10`, `verify-report.11`). El clasificador compara cada HTML contra la base después de normalizar solo el nombre con hash de los dos CSS renombrados, y exige que cada diferencia caiga en una de las tres categorías.

1. **`BreadcrumbList`**: solo cambia el `name` del primer ítem, en las páginas de `en` y `pt` (incluidas sus homes, que ya emitían migas en la base). Las páginas de `es` no cambian.
2. **Script de cliente de `CTASection`/`WhyVideoSection`**: tras quitar de la base los respaldos de `dataset.msg*`/`dataset.label*` y canonizar los identificadores que el minificador renombra, cada script de la base es idéntico al del HEAD. El `payload.preference = "Email"` y los `?? ""` quedan intactos.
3. **Reglas RTL del drawer**: en `Footer.*.css` y `404.*.css` desaparece la regla `[dir=rtl] .nav-drawer__panel` / `.nav-drawer.is-rtl .nav-drawer__panel` y, exactamente una vez por archivo, `--drawer-offset: 100%;transform:translate(var(--drawer-offset))` pasa a `transform:translate(100%)`; con esas dos operaciones el CSS de la base queda igual al del HEAD. Los dos nombres con hash cambian y, normalizados, el HTML no tiene más diferencias. No hay archivos sin pareja fuera de esos dos CSS ni archivos comunes distintos.

Sitemap (`sitemap-index.xml` y `sitemap-0.xml`) idéntico byte a byte; `hreflang`, `og:locale` y `<html lang dir>` idénticos (`verify-report.11`, `verify-report.28`). Sin diferencias fuera de la lista cerrada.

### Condiciones de la sustitución de `--drawer-offset`

- Fuera de la regla RTL, la única diferencia de CSS es esa sustitución, una vez por archivo (`verify-report.10`).
- En `src/`, `scripts/` y `astro.config.mjs` no queda ningún consumidor de `--drawer-offset`, ni CSS ni JS (`verify-report.3`).
- Prueba en Chrome real (148, móvil 390x844) sobre `/` y `/pt/`, con y sin `prefers-reduced-motion: reduce` (`verify-report.18`): la posición del panel cerrado y abierto, la transición (propiedad, duración, curva y fotogramas), la posición congelada a 0/25/50/75/100 % de la animación al abrir y al cerrar, la sombra y el cierre por botón, Escape y backdrop coinciden entre base y HEAD. Con movimiento reducido no hay animación en ninguno. Las capturas del panel abierto son idénticas entre base, HEAD y una segunda corrida de la base. Las capturas de página completa con animaciones activas varían entre corridas incluso entre dos corridas de la base (control del propio bloque), por lo que el criterio de igualdad se aplica al recorte del panel; con movimiento reducido las capturas completas son idénticas. Capturas guardadas en el directorio de temporales de la fase (`capturas.*`, antes `base*` y después `head*`).

## Tests

No hay suite de tests en el proyecto: el perfil declara como verificación `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links`, `npm run a11y` y, por el criterio del cambio, `npm run measure:images`; se corrieron todos sobre una copia aislada del HEAD con su propio build:

- `npm run check` (`verify-report.12`), `npm run validate-i18n` (`verify-report.13`), `npm run check-i18n-links` (`verify-report.14`), `npm run measure:images` (`verify-report.15`), `npm run a11y` en Chrome real (`verify-report.16`): los cinco en exit 0.
- Build de la base y del HEAD en exit 0, con el validador de i18n y la guarda de prerender (ADR-0012) en verde (`verify-report.9`).
- Pruebas negativas y de lista única en copias aisladas: `verify-report.19`, `verify-report.20`, `verify-report.22`, `verify-report.26`.

Los bloques de las copias aisladas se registraron con la marca de no re-comprobable porque su árbol vive en el directorio de temporales de la fase, que no persiste.

**Cobertura**: no hay instrumento de cobertura en el proyecto.

## Hallazgos de Seguridad

Sin hallazgos de seguridad (dominio `debt`; el cambio no toca dependencias ni validación de entradas, y el único script de cliente tocado solo retira textos de respaldo).

## Contraste de bases

| Base | Delta | Marca recibida | Contraste |
|------|-------|----------------|-----------|
| [[i18n-core-translation-helpers]] | [[i18n-core-three-locales-single-source]] | cambió | concuerda |
| [[i18n-routing-locale-prefixes]] | [[i18n-routing-pages-and-language-selector]] | cambió | concuerda |
| [[i18n-seo-hreflang]] | [[i18n-seo-alternates-sitemap-and-breadcrumbs]] | cambió | concuerda |
| [[i18n-translations-json-structure]] | [[i18n-translations-parity-and-build-validation]] | cambió | concuerda |

Lectura de ambos archivos de cada par en el árbol verificado: cada base declara `superseded_by` hacia su delta, lista los tres idiomas, las seis páginas, las 18 URLs de sitemap y la exclusión de la 404 en los mismos términos que su delta, y ninguna conserva restos de los seis idiomas ni de la dirección de derecha a izquierda que contradigan al delta. La marca «cambió» corresponde a esas ediciones de la propia base (`superseded_by`, idiomas y `updated`). Además, las dos specs absorbidas ([[i18n-ui-selector-navbar]] e [[i18n-translations-build-validation]]) concuerdan con el delta que las absorbe y declaran `superseded_by` hacia él (`verify-report.30`); [[i18n-rtl-support-arabic]] queda `cancelled` con la nota de cancelación citando `551e26f`.

## Coherencia de Grafo de Specs

El cálculo de `spec_graph.py grafo` se registró antes y después de la corrección automática de metadata:

- Antes (`verify-report.25`): cinco hallazgos `adrs-asimetrico` de severidad WARN, todos `univoca: true`, por ADR-0002, ADR-0003 y ADR-0007 que no declaraban `spec_refs` hacia las specs del cambio que los citan en `adrs`.
- Después (`verify-report.31`): exit 0 y cero hallazgos.

## Correcciones de Metadata

Con la validación principal en PASS, el hallazgo unívoco y de solo metadata, se completó `spec_refs` y `updated` (2026-10-08) en tres ADR:

- `memory/adrs/0002-i18n-routing-pages-lang-folder.md`: `spec_refs` hacia [[i18n-core-three-locales-single-source]] e [[i18n-routing-pages-and-language-selector]].
- `memory/adrs/0003-i18n-key-validation-build-hook.md`: `spec_refs` hacia [[i18n-translations-parity-and-build-validation]].
- `memory/adrs/0007-not-found-page-on-demand-single.md`: se agregan a su `spec_refs` existente [[i18n-routing-pages-and-language-selector]] e [[i18n-seo-alternates-sitemap-and-breadcrumbs]].

Las marcas de criterios y `verified_at` de las cuatro specs del cambio las escribió `spec_marks.py verify` con `--registrar-fecha`; todos los criterios quedan cumplidos.

## Observaciones

1. El criterio 8 del delta de routing («ninguna spec vigente de esta capability menciona `zh`, `hi` ni `ar`») es satisfecho en su sentido: el único texto vigente que nombra esos códigos es ese propio criterio, que los niega (`verify-report.30`). No bloquea; una redacción sin los códigos evitaría la autorreferencia en una revisión futura.
2. La línea `Build Scripts` de `memory/_profile.md` incorpora `npm run build:ci`, edición que llegó en el commit `f882dc2` y no es parte de la Tarea 5 (que declara solo `## Conventions`); el contenido concuerda con `package.json`. No bloquea.
3. El PR debe declarar la lista cerrada de diferencias admitidas con la tercera categoría incluyendo la sustitución de `--drawer-offset` (condición 4 de `clarifications.md`).
4. Las capturas del drawer y las copias de base y HEAD viven en el directorio de temporales de la fase, que no persiste; si el PR las requiere, deben adjuntarse antes de que el orquestador limpie ese directorio.
5. `dist/server` no forma parte del criterio de cierre y sus archivos con hash difieren entre base y HEAD (`verify-report.11`); su comportamiento observable queda cubierto por la 404 servida (`verify-report.17`) y la auditoría (`verify-report.16`).

## Acciones Requeridas

Ninguna.

## Bloques de evidencia


<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["git","rev-parse","HEAD","1c70406"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:26-03:00","exit":0,"sha256":"91b38daf65738581e32a0e3bd9420a42b7d3d3eabcd2d0f995c2650106a8d24f","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.1`** · exit 0 · 2 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
git rev-parse HEAD 1c70406
```

```text
960703569ef4b681ff21b82141f4f1e15b5aba6d
1c70406892cd6a831a7246e09fa4a21839ec8bc5
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["git","merge-base","1c70406","HEAD"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:26-03:00","exit":0,"sha256":"fac8b550c3dac3c3eff5ca99716aedc9ccd6439f7021a2bf9167ed8068825ecb","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 1 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
git merge-base 1c70406 HEAD
```

```text
1c70406892cd6a831a7246e09fa4a21839ec8bc5
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["bash","-c","/usr/bin/grep -rnE \"RTL_LOCALES|isRTL|is-rtl|dir=.?\\\"?rtl|\\[dir=\\\"rtl\\\"\\]|drawer-offset\" log-atm-web-astro/src log-atm-web-astro/scripts log-atm-web-astro/astro.config.mjs; echo \"exit grep: $?\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:26-03:00","exit":0,"sha256":"698f57736da8ca372af71b1544b84455d36d076296ad510666df3d507213a85c","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 1 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c '/usr/bin/grep -rnE "RTL_LOCALES|isRTL|is-rtl|dir=.?\"?rtl|\[dir=\"rtl\"\]|drawer-offset" log-atm-web-astro/src log-atm-web-astro/scripts log-atm-web-astro/astro.config.mjs; echo "exit grep: $?"'
```

```text
exit grep: 1
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["bash","-c","/usr/bin/grep -rniE \"rtl|drawer-offset|right-to-left\" log-atm-web-astro/src log-atm-web-astro/scripts log-atm-web-astro/astro.config.mjs; echo \"exit grep: $?\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:33-03:00","exit":0,"sha256":"51f25f69a807ea89093d172e5985e0ac5c7a0e3687284b8e31538128bf9ec848","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 5 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c '/usr/bin/grep -rniE "rtl|drawer-offset|right-to-left" log-atm-web-astro/src log-atm-web-astro/scripts log-atm-web-astro/astro.config.mjs; echo "exit grep: $?"'
```

```text
exit grep: 0
/usr/bin/grep: log-atm-web-astro/src/assets/images/services/svc-aduana.jpeg: binary file matches
/usr/bin/grep: log-atm-web-astro/src/assets/images/process/how-01-ejecutivo.jpeg: binary file matches
/usr/bin/grep: log-atm-web-astro/src/assets/images/industries/ind-efectos.jpeg: binary file matches
/usr/bin/grep: log-atm-web-astro/src/assets/images/industries/ind-iluminarias.jpeg: binary file matches
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:retirado {"v":1,"id":"verify-report.5","sha256":"5cd206c174aee40e5f9d3bcce25162756b9172173b720dd18b7cfd3d2b05e821","remite":"verify-report.8"} -->
**Evidencia `verify-report.5` retirada** · remite a `verify-report.8` · sha256 `5cd206c174ae`

<!-- evidencia:retirado {"v":1,"id":"verify-report.6","sha256":"f571b39d96d0d9a8cef81f3dc214924b87201b723b6dec1610c55507ecd34000","remite":"verify-report.8"} -->
**Evidencia `verify-report.6` retirada** · remite a `verify-report.8` · sha256 `f571b39d96d0`

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["bash","-c","/usr/bin/grep -n \"preference\" log-atm-web-astro/src/components/sections/CTASection.astro; /usr/bin/grep -n \"Inicio\" log-atm-web-astro/src/layouts/BaseLayout.astro; echo \"exit grep: $?\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:33-03:00","exit":0,"sha256":"b5863b4b8466853ae18a188312cdbb2492db56dcac6a11be0247d15588f17457","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 2 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
bash -c '/usr/bin/grep -n "preference" log-atm-web-astro/src/components/sections/CTASection.astro; /usr/bin/grep -n "Inicio" log-atm-web-astro/src/layouts/BaseLayout.astro; echo "exit grep: $?"'
```

```text
347:            payload.preference = "Email";
exit grep: 1
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro\necho \"-- literales de idioma en astro.config.mjs y validate-i18n.ts\"\n/usr/bin/grep -nE \"['\\\"](es|en|pt)['\\\"]\" astro.config.mjs scripts/validate-i18n.ts\necho \"exit grep: $?\"\necho \"-- respaldos ?? con texto no vacio en CTASection y WhyVideoSection\"\n/usr/bin/grep -nE \"\\?\\? *['\\\"\\`][^'\\\"\\`]\" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro\necho \"exit grep: $?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:28:44-03:00","exit":0,"sha256":"81a895f81398d8c2a2fc9e741232bd99d569a2b7b98f99b3e6af40ad5373055b","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 4 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:28:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro
echo "-- literales de idioma en astro.config.mjs y validate-i18n.ts"
/usr/bin/grep -nE "['\"](es|en|pt)['\"]" astro.config.mjs scripts/validate-i18n.ts
echo "exit grep: $?"
echo "-- respaldos ?? con texto no vacio en CTASection y WhyVideoSection"
/usr/bin/grep -nE "\?\? *['\"\`][^'\"\`]" src/components/sections/CTASection.astro src/components/sections/WhyVideoSection.astro
echo "exit grep: $?"
```

```text
-- literales de idioma en astro.config.mjs y validate-i18n.ts
exit grep: 1
-- respaldos ?? con texto no vacio en CTASection y WhyVideoSection
exit grep: 1
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"for v in base head; do echo \"== build $v\"; /usr/bin/grep -E 'i18n\\]|prerender\\]|\\[build\\] Complete' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/build-$v.log | sed -E 's/^[0-9:]+ //'; cat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/build-$v.exit; done\necho \"== HEAD de cada copia\"; ls /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client | head -0\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:30:56-03:00","exit":0,"sha256":"1a4d5df9b5f4e44175f13bcda50b80083b330f2f173c4d6b517c10c1c0fbff5b","lineas":15,"omitidas":0,"no_recomprobable":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.9`** · exit 0 · 15 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:30:56-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
for v in base head; do echo "== build $v"; /usr/bin/grep -E 'i18n\]|prerender\]|\[build\] Complete' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/build-$v.log | sed -E 's/^[0-9:]+ //'; cat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/build-$v.exit; done
echo "== HEAD de cada copia"; ls /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client | head -0
```

```text
== build base
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
[log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
[build] Complete!
base exit 0
== build head
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
[log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
[build] Complete!
head exit 0
== HEAD de cada copia
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/clasificar.py","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:30:57-03:00","exit":0,"sha256":"988139243f429fb14fdce1617fad1efb1692ac8c68bbb252a2cbb759ef764347","lineas":21,"omitidas":0,"no_recomprobable":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.10`** · exit 0 · 21 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:30:57-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/clasificar.py /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client
```

```text
solo en base: ['_astro/404.vAxf7dwO.css', '_astro/Footer.DfMq3qCd.css']
solo en HEAD: ['_astro/404.DfkEAfJC.css', '_astro/Footer.CS1UNo26.css']
renombres de hash: {'404.vAxf7dwO.css': '404.DfkEAfJC.css', 'Footer.DfMq3qCd.css': 'Footer.CS1UNo26.css'}
archivos comunes no HTML distintos: []
CSS 404.vAxf7dwO.css -> 404.DfkEAfJC.css: reglas RTL en base: 1; reglas RTL en HEAD: 0
   regla RTL quitada: [data-astro-cid-o5wx45wj][dir=rtl] .nav-drawer__panel[data-astro-cid-o5wx45wj],.nav-drawer[data-astro-cid-o5wx45wj].is-rtl .nav-drawer__panel[data-astro-cid-o5wx45wj]{inset-inline-end:auto;inset-inline-start:0;--drawer-offset: -100%;box-shadow:8px 0 48px #0f1e372e}
   igual tras quitar regla RTL: False
   ocurrencias de la sustitucion de --drawer-offset en base: 1 | igual tras regla RTL + sustitucion: True
   --drawer-offset en HEAD: 0
CSS Footer.DfMq3qCd.css -> Footer.CS1UNo26.css: reglas RTL en base: 1; reglas RTL en HEAD: 0
   regla RTL quitada: [data-astro-cid-o5wx45wj][dir=rtl] .nav-drawer__panel[data-astro-cid-o5wx45wj],.nav-drawer[data-astro-cid-o5wx45wj].is-rtl .nav-drawer__panel[data-astro-cid-o5wx45wj]{inset-inline-end:auto;inset-inline-start:0;--drawer-offset: -100%;box-shadow:8px 0 48px #0f1e372e}
   igual tras quitar regla RTL: False
   ocurrencias de la sustitucion de --drawer-offset en base: 1 | igual tras regla RTL + sustitucion: True
   --drawer-offset en HEAD: 0
HTML base: 18 HEAD: 18 misma lista: True
migas:en 6 paginas: 6
migas:pt 6 paginas: 6
script-cliente:CTASection 12 paginas: 12
script-cliente:WhyVideoSection 3 paginas: 3
diferencias fuera de la lista cerrada: 0
paginas con migas distintas: 12 ['en/contacto/index.html', 'en/cotizar/index.html', 'en/index.html', 'en/industrias/index.html', 'en/nosotros/index.html', 'en/servicios/index.html', 'pt/contacto/index.html', 'pt/cotizar/index.html', 'pt/index.html', 'pt/industrias/index.html', 'pt/nosotros/index.html', 'pt/servicios/index.html']
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"B=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client; H=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client\nfor f in sitemap-index.xml sitemap-0.xml; do cmp $B/$f $H/$f && echo \"$f: byte a byte identico\"; done\necho \"URLs en sitemap-0.xml (HEAD): $(/usr/bin/grep -o '<loc\u003e' $H/sitemap-0.xml | wc -l)\"\necho \"URLs de 404 en sitemap: $(/usr/bin/grep -c '404' $H/sitemap-0.xml)\"\necho \"HTML con dir=ltr en <html\u003e (HEAD): $(find $H -name '*.html' | xargs /usr/bin/grep -l '<html lang=\\\"[a-zA-Z-]*\\\" dir=\\\"ltr\\\"\u003e' | wc -l) de $(find $H -name '*.html' | wc -l)\"\necho \"HTML con dir distinto de ltr: $(find $H -name '*.html' | xargs /usr/bin/grep -lE 'dir=\\\"rtl\\\"' | wc -l)\"\necho \"archivos 404*.html en dist/client: $(find $H -name '404*.html' | wc -l)\"\necho \"diff de dist/server (lista de archivos, nombres de hash normalizados):\"\n(cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/server && find . -type f | sed -E 's/\\.[A-Za-z0-9_-]{8}\\./.H./' | sort) \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-b.txt\n(cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/server && find . -type f | sed -E 's/\\.[A-Za-z0-9_-]{8}\\./.H./' | sort) \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-h.txt\ndiff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-b.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-h.txt && echo \"dist/server: misma lista de archivos\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:30:57-03:00","exit":1,"sha256":"291a5ea63340ca2bfca7eec5b9997a9626117820dd8babb7ef483c3c60de9b99","lineas":30,"omitidas":0,"no_recomprobable":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.11`** · exit 1 · 30 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:30:57-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
B=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client; H=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client
for f in sitemap-index.xml sitemap-0.xml; do cmp $B/$f $H/$f && echo "$f: byte a byte identico"; done
echo "URLs en sitemap-0.xml (HEAD): $(/usr/bin/grep -o '<loc>' $H/sitemap-0.xml | wc -l)"
echo "URLs de 404 en sitemap: $(/usr/bin/grep -c '404' $H/sitemap-0.xml)"
echo "HTML con dir=ltr en <html> (HEAD): $(find $H -name '*.html' | xargs /usr/bin/grep -l '<html lang=\"[a-zA-Z-]*\" dir=\"ltr\">' | wc -l) de $(find $H -name '*.html' | wc -l)"
echo "HTML con dir distinto de ltr: $(find $H -name '*.html' | xargs /usr/bin/grep -lE 'dir=\"rtl\"' | wc -l)"
echo "archivos 404*.html en dist/client: $(find $H -name '404*.html' | wc -l)"
echo "diff de dist/server (lista de archivos, nombres de hash normalizados):"
(cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/server && find . -type f | sed -E 's/\.[A-Za-z0-9_-]{8}\./.H./' | sort) > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-b.txt
(cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/server && find . -type f | sed -E 's/\.[A-Za-z0-9_-]{8}\./.H./' | sort) > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-h.txt
diff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-b.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/srv-h.txt && echo "dist/server: misma lista de archivos"
```

```text
sitemap-index.xml: byte a byte identico
sitemap-0.xml: byte a byte identico
URLs en sitemap-0.xml (HEAD): 18
URLs de 404 en sitemap: 0
HTML con dir=ltr en <html> (HEAD): 18 de 18
HTML con dir distinto de ltr: 0
archivos 404*.html en dist/client: 0
diff de dist/server (lista de archivos, nombres de hash normalizados):
1,2c1,2
< ./chunks/404_DCS-lUYw.mjs
< ./chunks/astro-component_C8OHT2I1.mjs
---
> ./chunks/404_Dwk-Re1W.mjs
> ./chunks/astro-component_CcMwHqoG.mjs
7,8c7,8
< ./chunks/image-passthrough-endpoint_D0xuW_z5.mjs
< ./chunks/image-service-workerd_Cij26q8t.mjs
---
> ./chunks/image-passthrough-endpoint_BOrRsHyB.mjs
> ./chunks/image-service-workerd_Bm6OZMj4.mjs
13c13
< ./chunks/worker-entry_Cxu_0-39.mjs
---
> ./chunks/worker-entry_DQqah0qH.mjs
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro\nset -o pipefail\nnpm run check 2\u003e&1 | sed -E 's/\\x1b\\[[0-9;]*m//g' | tail -n 25\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:31:16-03:00","exit":0,"sha256":"74ca0949ef6bf8d6a5a48f0720f400e10adda921f182ab563bfe882fa25967cf","lineas":13,"omitidas":0,"no_recomprobable":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.12`** · exit 0 · 13 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:31:16-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro`
No re-comprobable: corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro
set -o pipefail
npm run check 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g' | tail -n 25
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

20:31:11 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
20:31:11 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
20:31:12 [types] Generated 1.33s
20:31:12 [check] Getting diagnostics for Astro files in /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro...
Result (53 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro\nset -o pipefail\nnpm run validate-i18n 2\u003e&1 | sed -E 's/\\x1b\\[[0-9;]*m//g' | tail -n 25\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:31:17-03:00","exit":0,"sha256":"00b9e7a520ec37193c9a6ead0655e90e876ce13220b31be0eb255b64d15913f4","lineas":6,"omitidas":0,"no_recomprobable":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.13`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:31:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro`
No re-comprobable: corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro
set -o pipefail
npm run validate-i18n 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g' | tail -n 25
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro\nset -o pipefail\nnpm run check-i18n-links 2\u003e&1 | sed -E 's/\\x1b\\[[0-9;]*m//g' | tail -n 25\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:31:17-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.14`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:31:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro`
No re-comprobable: corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro
set -o pipefail
npm run check-i18n-links 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g' | tail -n 25
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro\nset -o pipefail\nnpm run measure:images 2\u003e&1 | sed -E 's/\\x1b\\[[0-9;]*m//g' | tail -n 25\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:31:17-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.15`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:31:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro`
No re-comprobable: corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro
set -o pipefail
npm run measure:images 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g' | tail -n 25
```

```text

> log-atm-web-astro@0.0.1 measure:images
> node scripts/measure-home-image-weight.mjs

escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro\nset -o pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnpm run a11y 2\u003e&1 | sed -E 's/\\x1b\\[[0-9;]*m//g' | tail -n 30\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro","head":null,"fecha":"2026-10-08T20:31:47-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.16`** · exit 0 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:31:47-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro`
No re-comprobable: corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro
set -o pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
npm run a11y 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g' | tail -n 30
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/p404.py"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:32:22-03:00","exit":0,"sha256":"3b2a3f8bf5f7a342e78fc27c433b4f8082ff5e9fda42ec189358bd4ed9f27b3a","lineas":3,"omitidas":0,"no_recomprobable":"pide la 404 a dos astro preview (base y HEAD) levantados en copias aisladas del directorio de temporales, que se bajan al terminar"} -->
**Evidencia `verify-report.17`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:32:22-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: pide la 404 a dos astro preview (base y HEAD) levantados en copias aisladas del directorio de temporales, que se bajan al terminar

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/p404.py
```

```text
/__nada__/ base 404 head 404 | html: <html lang="es-CL" dir="ltr"> | señales en HEAD: {'canonical': 0, 'og:url': 0, 'link-rel-alternate': 0, 'BreadcrumbList': 0} | HTML 404 identico a la base (hash CSS normalizado): True
/en/__nada__/ base 404 head 404 | html: <html lang="en-US" dir="ltr"> | señales en HEAD: {'canonical': 0, 'og:url': 0, 'link-rel-alternate': 0, 'BreadcrumbList': 0} | HTML 404 identico a la base (hash CSS normalizado): True
/pt/__nada__/ base 404 head 404 | html: <html lang="pt-BR" dir="ltr"> | señales en HEAD: {'canonical': 0, 'og:url': 0, 'link-rel-alternate': 0, 'BreadcrumbList': 0} | HTML 404 identico a la base (hash CSS normalizado): True
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/drawer.mjs /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/capturas.0dJplown 2\u003e&1 | cut -c1-900\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:37:11-03:00","exit":0,"sha256":"dae1684981dea5d129b40f78931a15d1202709369959863176ca741d6bd3306d","lineas":31,"omitidas":0,"no_recomprobable":"mide en Chrome real sobre dos astro preview (base y HEAD) en copias aisladas del directorio de temporales, que se bajan al terminar; las capturas de página completa varían entre corridas por animaciones de la página"} -->
**Evidencia `verify-report.18`** · exit 0 · 31 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:37:11-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: mide en Chrome real sobre dos astro preview (base y HEAD) en copias aisladas del directorio de temporales, que se bajan al terminar; las capturas de página completa varían entre corridas por animaciones de la página

```bash
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/drawer.mjs /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/capturas.0dJplown 2>&1 | cut -c1-900
```

```text
/ no-preference | medicion base == head: true
/ reduce | medicion base == head: true
/pt/ no-preference | medicion base == head: true
/pt/ reduce | medicion base == head: true
HEAD / no-preference abrir: animaciones [{"type":"CSSTransition","prop":"transform","duration":250,"easing":"cubic-bezier(0.32, 0.72, 0, 1)","keyframes":[{"offset":0,"transform":"translate(100%)"},{"offset":1,"transform":"translate(0px)"}]}]
HEAD / no-preference abrir: x del panel a 0/25/50/75/100 % {"0":390,"1":70,"0.25":140.68,"0.5":84.46,"0.75":72.45}
HEAD / no-preference cerrar: x del panel a 0/25/50/75/100 % {"0":70,"1":390,"0.25":319.32,"0.5":375.54,"0.75":387.55}
BASE / no-preference abrir: x del panel a 0/25/50/75/100 % {"0":390,"1":70,"0.25":140.68,"0.5":84.46,"0.75":72.45}
BASE / no-preference cerrar: x del panel a 0/25/50/75/100 % {"0":70,"1":390,"0.25":319.32,"0.5":375.54,"0.75":387.55}
HEAD / reduce: animaciones al abrir [] | al cerrar []
HEAD / reduce: cerrado {"ariaHidden":"true","visibility":"hidden","panelX":390,"panelW":320,"transform":"matrix(1, 0, 0, 1, 320, 0)","transition":"none|1e-05s|ease","insetInlineStart":"70px","right":"0px","left":"70px","boxShadow":"rgba(15, 30, 55, 0.18) -8px 0px 48px 0px","backdropOpacity":"0"}
HEAD / reduce: abierto {"ariaHidden":"false","visibility":"visible","panelX":70,"panelW":320,"transform":"matrix(1, 0, 0, 1, 0, 0)","transition":"none|1e-05s|ease","insetInlineStart":"70px","right":"0px","left":"70px","boxShadow":"rgba(15, 30, 55, 0.18) -8px 0px 48px 0px","backdropOpacity":"1"}
HEAD / no-preference: transform cerrado matrix(1, 0, 0, 1, 320, 0) | abierto matrix(1, 0, 0, 1, 0, 0) | cerrado despues matrix(1, 0, 0, 1, 320, 0)
cierre por Escape (HEAD, base): true true | por backdrop: true true
captura _ no-preference 1cerrado | base vs HEAD: DISTINTA | control base vs base (otra corrida): DISTINTA
captura _ no-preference 2abierto | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _ no-preference 2abierto-panel | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _ no-preference 3cerrado-despues | base vs HEAD: DISTINTA | control base vs base (otra corrida): DISTINTA
captura _ reduce 1cerrado | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _ reduce 2abierto | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _ reduce 2abierto-panel | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _ reduce 3cerrado-despues | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ no-preference 1cerrado | base vs HEAD: DISTINTA | control base vs base (otra corrida): DISTINTA
captura _pt_ no-preference 2abierto | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ no-preference 2abierto-panel | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ no-preference 3cerrado-despues | base vs HEAD: DISTINTA | control base vs base (otra corrida): DISTINTA
captura _pt_ reduce 1cerrado | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ reduce 2abierto | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ reduce 2abierto-panel | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
captura _pt_ reduce 3cerrado-despues | base vs HEAD: IGUAL | control base vs base (otra corrida): IGUAL
resultado: sin diferencias de medicion entre base y HEAD
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"archivo","argv":null,"texto":"set -u\nD=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/ssot.RxPcSr2O\n[ \"$(realpath $D | /usr/bin/grep -c '^/tmp/sdd-temporales-kapridoo')\" = 1 ] && echo \"copia aislada fuera del repo y de todo worktree: si\"\ngit -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C $D\nln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules $D/log-atm-web-astro/node_modules\ncd $D/log-atm-web-astro\npython3 -I - <<'PY'\nimport re\np='src/i18n/config.ts'; s=open(p).read()\ns=s.replace(\"['es', 'en', 'pt']\",\"['es', 'en', 'pt', 'xx']\")\ns=s.replace(\"  pt: 'PT',\\n\",\"  pt: 'PT',\\n  xx: 'XX',\\n\").replace(\"  pt: 'Português',\\n\",\"  pt: 'Português',\\n  xx: 'Xxxx',\\n\").replace(\"  pt: 'pt-BR',\\n\",\"  pt: 'pt-BR',\\n  xx: 'xx-XX',\\n\").replace(\"  pt: 'pt_BR',\\n\",\"  pt: 'pt_BR',\\n  xx: 'xx_XX',\\n\")\nopen(p,'w').write(s)\nPY\necho \"archivos distintos del worktree (sin node_modules, dist ni .astro/.wrangler):\"\ndiff -rq --exclude=node_modules --exclude=dist --exclude=.astro --exclude=.wrangler /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro $D/log-atm-web-astro\ncmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/astro.config.mjs astro.config.mjs && cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/scripts/validate-i18n.ts scripts/validate-i18n.ts && echo \"astro.config.mjs y validate-i18n.ts: identicos al worktree\"\nnpm run validate-i18n \u003e ../v1.log 2\u003e&1; echo \"validate-i18n sin xx.json: exit $?\"; /usr/bin/grep -oE \"ENOENT[^']*'[^']*xx\\.json'\" ../v1.log | sed -E 's#/tmp/[^ ]*/src/#src/#'\ncp src/i18n/translations/en.json src/i18n/translations/xx.json\nnpm run build \u003e ../b1.log 2\u003e&1; echo \"build con xx.json: exit $?\"\n/usr/bin/grep -E \"i18n\\] (en|pt|xx)|prerender\\]\" ../b1.log | sed -E 's/^[0-9:]+ //'\necho \"HTML en dist/client/xx: $(find dist/client/xx -name index.html | wc -l)\"\necho \"URLs xx en sitemap: $(/usr/bin/grep -o '<loc\u003ehttps://www.logatm.com/xx/[^<]*</loc\u003e' dist/client/sitemap-0.xml | wc -l) de $(/usr/bin/grep -o '<loc\u003e' dist/client/sitemap-0.xml | wc -l)\"\necho \"alternativas hreflang=xx-XX en sitemap: $(/usr/bin/grep -o 'hreflang=\\\"xx-XX\\\"' dist/client/sitemap-0.xml | wc -l)\"\n/usr/bin/grep -o '<html lang=\"[^\"]*\" dir=\"ltr\"\u003e' dist/client/xx/index.html\necho \"git del worktree sin cambios de codigo: $(git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales status --porcelain -- log-atm-web-astro | wc -l) entradas\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:37:46-03:00","exit":0,"sha256":"691c9b71bb3a20ae0d8526cdb08301a266b09b02db39b0d44595996583704fc4","lineas":18,"omitidas":0,"no_recomprobable":"corre en copias aisladas de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.19`** · exit 0 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:37:46-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre en copias aisladas de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
set -u
D=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/ssot.RxPcSr2O
[ "$(realpath $D | /usr/bin/grep -c '^/tmp/sdd-temporales-kapridoo')" = 1 ] && echo "copia aislada fuera del repo y de todo worktree: si"
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C $D
ln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules $D/log-atm-web-astro/node_modules
cd $D/log-atm-web-astro
python3 -I - <<'PY'
import re
p='src/i18n/config.ts'; s=open(p).read()
s=s.replace("['es', 'en', 'pt']","['es', 'en', 'pt', 'xx']")
s=s.replace("  pt: 'PT',\n","  pt: 'PT',\n  xx: 'XX',\n").replace("  pt: 'Português',\n","  pt: 'Português',\n  xx: 'Xxxx',\n").replace("  pt: 'pt-BR',\n","  pt: 'pt-BR',\n  xx: 'xx-XX',\n").replace("  pt: 'pt_BR',\n","  pt: 'pt_BR',\n  xx: 'xx_XX',\n")
open(p,'w').write(s)
PY
echo "archivos distintos del worktree (sin node_modules, dist ni .astro/.wrangler):"
diff -rq --exclude=node_modules --exclude=dist --exclude=.astro --exclude=.wrangler /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro $D/log-atm-web-astro
cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/astro.config.mjs astro.config.mjs && cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/scripts/validate-i18n.ts scripts/validate-i18n.ts && echo "astro.config.mjs y validate-i18n.ts: identicos al worktree"
npm run validate-i18n > ../v1.log 2>&1; echo "validate-i18n sin xx.json: exit $?"; /usr/bin/grep -oE "ENOENT[^']*'[^']*xx\.json'" ../v1.log | sed -E 's#/tmp/[^ ]*/src/#src/#'
cp src/i18n/translations/en.json src/i18n/translations/xx.json
npm run build > ../b1.log 2>&1; echo "build con xx.json: exit $?"
/usr/bin/grep -E "i18n\] (en|pt|xx)|prerender\]" ../b1.log | sed -E 's/^[0-9:]+ //'
echo "HTML en dist/client/xx: $(find dist/client/xx -name index.html | wc -l)"
echo "URLs xx en sitemap: $(/usr/bin/grep -o '<loc>https://www.logatm.com/xx/[^<]*</loc>' dist/client/sitemap-0.xml | wc -l) de $(/usr/bin/grep -o '<loc>' dist/client/sitemap-0.xml | wc -l)"
echo "alternativas hreflang=xx-XX en sitemap: $(/usr/bin/grep -o 'hreflang=\"xx-XX\"' dist/client/sitemap-0.xml | wc -l)"
/usr/bin/grep -o '<html lang="[^"]*" dir="ltr">' dist/client/xx/index.html
echo "git del worktree sin cambios de codigo: $(git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales status --porcelain -- log-atm-web-astro | wc -l) entradas"
```

```text
copia aislada fuera del repo y de todo worktree: si
archivos distintos del worktree (sin node_modules, dist ni .astro/.wrangler):
Files /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/src/i18n/config.ts and /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/ssot.RxPcSr2O/log-atm-web-astro/src/i18n/config.ts differ
astro.config.mjs y validate-i18n.ts: identicos al worktree
validate-i18n sin xx.json: exit 1
ENOENT: no such file or directory, open 'src/i18n/translations/xx.json'
build con xx.json: exit 0
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
[i18n] xx: OK (535 claves)
[log-atm:prerender-output-guard] [prerender] 24 páginas prerenderizadas con HTML válido
HTML en dist/client/xx: 6
URLs xx en sitemap: 6 de 24
alternativas hreflang=xx-XX en sitemap: 24
<html lang="xx-XX" dir="ltr">
git del worktree sin cambios de codigo: 0 entradas
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"archivo","argv":null,"texto":"D=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE\ngit -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C $D\nln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules $D/log-atm-web-astro/node_modules\ncd $D/log-atm-web-astro\npython3 -I - <<'PY'\nimport json\np='src/i18n/translations/pt.json'; d=json.load(open(p,encoding='utf-8')); del d['common']['breadcrumbHome']; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)\nPY\nnpm run validate-i18n \u003e ../v2.log 2\u003e&1; echo \"validate-i18n con clave faltante en pt.json: exit $?\"; /usr/bin/grep -E \"\\[i18n\\]\" ../v2.log | cut -c1-160\nnpm run build \u003e ../b2.log 2\u003e&1; echo \"build con clave faltante: exit $?\"\n/usr/bin/grep -E \"\\[i18n\\]|prerender\\]|Complete\" ../b2.log | sed -E 's/^[0-9:]+ //' | cut -c1-160\necho \"dist/client existe tras el build fallido: $([ -d dist/client ] && echo si || echo no)\"\ncp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/src/i18n/translations/pt.json src/i18n/translations/pt.json\npython3 -I - <<'PY'\nimport json\np='src/i18n/translations/en.json'; d=json.load(open(p,encoding='utf-8')); d['common']['claveSobrante']='x'; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)\nPY\nnpm run validate-i18n \u003e ../v3.log 2\u003e&1; echo \"validate-i18n con clave sobrante en en.json: exit $?\"; /usr/bin/grep -E \"\\[i18n\\]\" ../v3.log | cut -c1-160\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:37:58-03:00","exit":0,"sha256":"75c1c368a71846e260152f1a59b2a2589b902095738ef90aaed9c602c143a599","lineas":12,"omitidas":0,"no_recomprobable":"corre en copias aisladas de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"} -->
**Evidencia `verify-report.20`** · exit 0 · 12 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:37:58-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre en copias aisladas de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste

```bash
D=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C $D
ln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules $D/log-atm-web-astro/node_modules
cd $D/log-atm-web-astro
python3 -I - <<'PY'
import json
p='src/i18n/translations/pt.json'; d=json.load(open(p,encoding='utf-8')); del d['common']['breadcrumbHome']; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)
PY
npm run validate-i18n > ../v2.log 2>&1; echo "validate-i18n con clave faltante en pt.json: exit $?"; /usr/bin/grep -E "\[i18n\]" ../v2.log | cut -c1-160
npm run build > ../b2.log 2>&1; echo "build con clave faltante: exit $?"
/usr/bin/grep -E "\[i18n\]|prerender\]|Complete" ../b2.log | sed -E 's/^[0-9:]+ //' | cut -c1-160
echo "dist/client existe tras el build fallido: $([ -d dist/client ] && echo si || echo no)"
cp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/src/i18n/translations/pt.json src/i18n/translations/pt.json
python3 -I - <<'PY'
import json
p='src/i18n/translations/en.json'; d=json.load(open(p,encoding='utf-8')); d['common']['claveSobrante']='x'; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)
PY
npm run validate-i18n > ../v3.log 2>&1; echo "validate-i18n con clave sobrante en en.json: exit $?"; /usr/bin/grep -E "\[i18n\]" ../v3.log | cut -c1-160
```

```text
validate-i18n con clave faltante en pt.json: exit 1
[i18n] en: OK (535 claves)
[i18n] pt: FAIL
build con clave faltante: exit 1
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: FAIL
[i18n] Paridad de claves rota entre traducciones (exit 1). Ver detalles arriba.
dist/client existe tras el build fallido: no
validate-i18n con clave sobrante en en.json: exit 1
[i18n] en: FAIL
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:retirado {"v":1,"id":"verify-report.21","sha256":"6c8c7222089bbe7f717d6db7f8e7a4657a4000a44ce80493c468f0f511f9911c","remite":"verify-report.22"} -->
**Evidencia `verify-report.21` retirada** · remite a `verify-report.22` · sha256 `6c8c7222089b`

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"archivo","argv":null,"texto":"echo \"== reporte con clave faltante en pt.json\"; /usr/bin/grep -vE '^\u003e|^$' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE/v2.log | sed -E 's/\\x1b\\[[0-9;]*m//g' | cut -c1-160\necho \"== reporte con clave sobrante en en.json\"; /usr/bin/grep -vE '^\u003e|^$' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE/v3.log | sed -E 's/\\x1b\\[[0-9;]*m//g' | cut -c1-160\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:38:10-03:00","exit":0,"sha256":"fa016b767cc28841366bedb86415b4b5b998f14dfd5c9d8e607ccdac8997b874","lineas":8,"omitidas":0,"no_recomprobable":"lee los logs de la copia aislada de paridad bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `verify-report.22`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:38:10-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: lee los logs de la copia aislada de paridad bajo el directorio de temporales del despacho, que no persiste

```bash
echo "== reporte con clave faltante en pt.json"; /usr/bin/grep -vE '^>|^$' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE/v2.log | sed -E 's/\x1b\[[0-9;]*m//g' | cut -c1-160
echo "== reporte con clave sobrante en en.json"; /usr/bin/grep -vE '^>|^$' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/paridad.bpgQ1LoE/v3.log | sed -E 's/\x1b\[[0-9;]*m//g' | cut -c1-160
```

```text
== reporte con clave faltante en pt.json
[i18n] en: OK (535 claves)
[i18n] pt: FAIL
  - missing: common.breadcrumbHome
== reporte con clave sobrante en en.json
[i18n] en: FAIL
  - extra:   common.claveSobrante
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin verify-report.22 -->

<!-- evidencia:retirado {"v":1,"id":"verify-report.23","sha256":"b90da12b1038df14bd084ab8ecf47ccb610bbc2c826e3648c4da204103b389f7","remite":"verify-report.30"} -->
**Evidencia `verify-report.23` retirada** · remite a `verify-report.30` · sha256 `b90da12b1038`

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro && npx tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/probe-core.ts 2\u003e&1 | cut -c1-500\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:39:06-03:00","exit":0,"sha256":"4fb0b901d8728e2b2e4f7e9b72a0e60919929463644160b27c14c9fed8b62cf1","lineas":8,"omitidas":0,"no_recomprobable":"importa los módulos i18n de la copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `verify-report.24`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:39:06-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: importa los módulos i18n de la copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro && npx tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/probe-core.ts 2>&1 | cut -c1-500
```

```text
home.es | Inicio | html lang es-CL | og es_CL
home.en | Home | html lang en-US | og en_US
home.pt | Início | html lang pt-BR | og pt_BR
LOCALES ["es","en","pt"] DEFAULT es NON_DEFAULT ["en","pt"]
exports RTL en config/utils: []
clave inexistente -> "no.existe.xyz" | avisos: 1 [i18n] Clave faltante: "no.existe.xyz" (lang=pt)
prefijos: en pt es
alternates /servicios/: [{"hreflang":"es-CL","href":"/servicios/"},{"hreflang":"en-US","href":"/en/servicios/"},{"hreflang":"pt-BR","href":"/pt/servicios/"},{"hreflang":"x-default","href":"/servicios/"}]
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"archivo","argv":null,"texto":"python3 /home/kapridoo/.claude/skills/_shared/scripts/spec_graph.py grafo /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory debt-i18n-three-locales | python3 -I -c 'import json,sys; d=json.load(sys.stdin); [print(h[\"severidad\"], h[\"regla\"], h[\"spec\"], \"-\u003e\", h[\"destino\"], \"univoca=\" + str(h[\"univoca\"])) for h in d[\"hallazgos\"]]; print(\"hallazgos:\", len(d[\"hallazgos\"]))'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:39:06-03:00","exit":0,"sha256":"df9b7790a80538bd0f2c74534050f95a7e2930c1feb851b01f639d39fdfda0f6","lineas":6,"omitidas":0,"no_recomprobable":"registra el estado del grafo previo a la corrección automática de metadata de este despacho"} -->
**Evidencia `verify-report.25`** · exit 0 · 6 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:39:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`
No re-comprobable: registra el estado del grafo previo a la corrección automática de metadata de este despacho

```bash
python3 /home/kapridoo/.claude/skills/_shared/scripts/spec_graph.py grafo /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory debt-i18n-three-locales | python3 -I -c 'import json,sys; d=json.load(sys.stdin); [print(h["severidad"], h["regla"], h["spec"], "->", h["destino"], "univoca=" + str(h["univoca"])) for h in d["hallazgos"]]; print("hallazgos:", len(d["hallazgos"]))'
```

```text
WARN adrs-asimetrico i18n-core-three-locales-single-source -> 0002-i18n-routing-pages-lang-folder univoca=True
WARN adrs-asimetrico i18n-routing-pages-and-language-selector -> 0002-i18n-routing-pages-lang-folder univoca=True
WARN adrs-asimetrico i18n-routing-pages-and-language-selector -> 0007-not-found-page-on-demand-single univoca=True
WARN adrs-asimetrico i18n-seo-alternates-sitemap-and-breadcrumbs -> 0007-not-found-page-on-demand-single univoca=True
WARN adrs-asimetrico i18n-translations-parity-and-build-validation -> 0003-i18n-key-validation-build-hook univoca=True
hallazgos: 5
```
<!-- evidencia:fin verify-report.25 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.26","forma":"archivo","argv":null,"texto":"git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr\nln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr/log-atm-web-astro/node_modules\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr/log-atm-web-astro\npython3 -I - <<'PY'\nimport json\nfor l in ('pt','en'):\n    p='src/i18n/translations/%s.json'%l; d=json.load(open(p,encoding='utf-8')); del d['common']['breadcrumbHome']; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)\nPY\nnpx tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/probe-fallback.ts 2\u003e&1 | cut -c1-300\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:39:27-03:00","exit":0,"sha256":"e49ba3cd420b00e4a2e3b40d1c0e11d28d1cb61f875d24d6c14b688f0ea0dc35","lineas":4,"omitidas":0,"no_recomprobable":"corre en una copia aislada de HEAD con claves borradas, bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `verify-report.26`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:39:27-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: corre en una copia aislada de HEAD con claves borradas, bajo el directorio de temporales del despacho, que no persiste

```bash
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales archive HEAD log-atm-web-astro | tar -x -C /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr
ln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/node_modules /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr/log-atm-web-astro/node_modules
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/fallback.Lwvf2cJr/log-atm-web-astro
python3 -I - <<'PY'
import json
for l in ('pt','en'):
    p='src/i18n/translations/%s.json'%l; d=json.load(open(p,encoding='utf-8')); del d['common']['breadcrumbHome']; json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2)
PY
npx tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/scripts/probe-fallback.ts 2>&1 | cut -c1-300
```

```text
pt, clave solo en es (common.breadcrumbHome borrada de pt.json): "Inicio" | avisos: 0
en, clave solo en es: "Inicio"
interpolacion en: "© 2026 LOG ATM · All rights reserved"
interpolacion pt: "© 2026 LOG ATM · Todos os direitos reservados"
```
<!-- evidencia:fin verify-report.26 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.27","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales\necho \"== lineas anadidas/borradas por ADR (numstat 1c70406..HEAD)\"\ngit diff --numstat 1c70406 HEAD -- memory/adrs\necho \"== ADR-0002: nota fechada, idiomas, paginas y referencia a ADR-0007\"\nsed -n '/^## Nota de actualización — 2026-10-08/,$p' memory/adrs/0002-i18n-routing-pages-lang-folder.md | /usr/bin/grep -oE \"tres idiomas|seis páginas prerenderizadas|18 HTML|\\[\\[0007-not-found-page-on-demand-single\\]\\]|bajo demanda\" | sort | uniq -c\necho \"== ADR-0003: nota fechada, prebuild y hook\"\nsed -n '/^## Nota de actualización — 2026-10-08/,$p' memory/adrs/0003-i18n-key-validation-build-hook.md | /usr/bin/grep -oE \"nunca existió|astro:build:start|mecanismo único\" | sort | uniq -c\necho \"== diccionarios de traduccion cambiados por el cambio\"\ngit diff --stat 1c70406 HEAD -- log-atm-web-astro/src/i18n/translations | wc -l\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:40:06-03:00","exit":0,"sha256":"5e20cfd586c5450bb50d4ef03d99ee67d2a30e0d070877c11d9a67cf180e7f2a","lineas":15,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.27`** · exit 0 · 15 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:40:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
echo "== lineas anadidas/borradas por ADR (numstat 1c70406..HEAD)"
git diff --numstat 1c70406 HEAD -- memory/adrs
echo "== ADR-0002: nota fechada, idiomas, paginas y referencia a ADR-0007"
sed -n '/^## Nota de actualización — 2026-10-08/,$p' memory/adrs/0002-i18n-routing-pages-lang-folder.md | /usr/bin/grep -oE "tres idiomas|seis páginas prerenderizadas|18 HTML|\[\[0007-not-found-page-on-demand-single\]\]|bajo demanda" | sort | uniq -c
echo "== ADR-0003: nota fechada, prebuild y hook"
sed -n '/^## Nota de actualización — 2026-10-08/,$p' memory/adrs/0003-i18n-key-validation-build-hook.md | /usr/bin/grep -oE "nunca existió|astro:build:start|mecanismo único" | sort | uniq -c
echo "== diccionarios de traduccion cambiados por el cambio"
git diff --stat 1c70406 HEAD -- log-atm-web-astro/src/i18n/translations | wc -l
```

```text
== lineas anadidas/borradas por ADR (numstat 1c70406..HEAD)
4	0	memory/adrs/0002-i18n-routing-pages-lang-folder.md
4	0	memory/adrs/0003-i18n-key-validation-build-hook.md
== ADR-0002: nota fechada, idiomas, paginas y referencia a ADR-0007
      1 [[0007-not-found-page-on-demand-single]]
      1 18 HTML
      1 bajo demanda
      1 seis páginas prerenderizadas
      1 tres idiomas
== ADR-0003: nota fechada, prebuild y hook
      1 astro:build:start
      1 mecanismo único
      1 nunca existió
== diccionarios de traduccion cambiados por el cambio
0
```
<!-- evidencia:fin verify-report.27 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.28","forma":"archivo","argv":null,"texto":"H=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client\nB=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client\necho \"== por pagina: link rel=alternate hreflang (3 idiomas + x-default) y og:locale/og:locale:alternate, base vs HEAD\"\nbad=0; n=0\nfor f in $(cd $H && find . -name '*.html' | sort); do\n  n=$((n+1))\n  a=$(/usr/bin/grep -o '<link[^\u003e]*rel=\"alternate\"[^\u003e]*hreflang=\"[^\"]*\"[^\u003e]*\u003e' $H/$f | wc -l); og=$(/usr/bin/grep -o 'property=\"og:locale[^\"]*\"' $H/$f | wc -l)\n  ab=$(/usr/bin/grep -o '<link[^\u003e]*rel=\"alternate\"[^\u003e]*hreflang=\"[^\"]*\"[^\u003e]*\u003e' $B/$f | wc -l)\n  [ \"$a\" = 4 ] && [ \"$og\" = 3 ] && [ \"$a\" = \"$ab\" ] || { bad=$((bad+1)); echo \"ANOMALIA $f alternates=$a og=$og base=$ab\"; }\ndone\necho \"paginas revisadas: $n; con anomalia: $bad\"\necho \"== selector de idioma (HEAD): opciones y aria-current en /, /en/ y /pt/\"\nfor f in index.html en/index.html pt/index.html; do echo \"$f: opciones=$(/usr/bin/grep -o 'class=\\\"lang-selector__option[^\\\"]*\\\"' $H/$f | wc -l) aria-current=$(/usr/bin/grep -o 'lang-selector__option is-active\\\"[^\u003e]*aria-current=\\\"page\\\"' $H/$f | wc -l)\"; done\necho \"== destinos del selector en /en/servicios/\"\n/usr/bin/grep -o '<a href=\"[^\"]*\" class=\"lang-selector__option[^\"]*\" hreflang=\"[a-z]*\"' $H/en/servicios/index.html | sed -E 's/ class=\"[^\"]*\"//' | sort -u\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl","head":null,"fecha":"2026-10-08T20:40:06-03:00","exit":0,"sha256":"b7ba22fe161a1c5c018d24a6c1cb14da46307d675dcf0d5c735810d83dece140","lineas":25,"omitidas":0,"no_recomprobable":"lee las copias aisladas (base y HEAD) del directorio de temporales del despacho, que no persiste"} -->
**Evidencia `verify-report.28`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:40:06-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl`
No re-comprobable: lee las copias aisladas (base y HEAD) del directorio de temporales del despacho, que no persiste

```bash
H=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/head.JUhuBbs0/log-atm-web-astro/dist/client
B=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-verify-dxgb9kdl/base.wOsBnXEm/log-atm-web-astro/dist/client
echo "== por pagina: link rel=alternate hreflang (3 idiomas + x-default) y og:locale/og:locale:alternate, base vs HEAD"
bad=0; n=0
for f in $(cd $H && find . -name '*.html' | sort); do
  n=$((n+1))
  a=$(/usr/bin/grep -o '<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>' $H/$f | wc -l); og=$(/usr/bin/grep -o 'property="og:locale[^"]*"' $H/$f | wc -l)
  ab=$(/usr/bin/grep -o '<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>' $B/$f | wc -l)
  [ "$a" = 4 ] && [ "$og" = 3 ] && [ "$a" = "$ab" ] || { bad=$((bad+1)); echo "ANOMALIA $f alternates=$a og=$og base=$ab"; }
done
echo "paginas revisadas: $n; con anomalia: $bad"
echo "== selector de idioma (HEAD): opciones y aria-current en /, /en/ y /pt/"
for f in index.html en/index.html pt/index.html; do echo "$f: opciones=$(/usr/bin/grep -o 'class=\"lang-selector__option[^\"]*\"' $H/$f | wc -l) aria-current=$(/usr/bin/grep -o 'lang-selector__option is-active\"[^>]*aria-current=\"page\"' $H/$f | wc -l)"; done
echo "== destinos del selector en /en/servicios/"
/usr/bin/grep -o '<a href="[^"]*" class="lang-selector__option[^"]*" hreflang="[a-z]*"' $H/en/servicios/index.html | sed -E 's/ class="[^"]*"//' | sort -u
```

```text
== por pagina: link rel=alternate hreflang (3 idiomas + x-default) y og:locale/og:locale:alternate, base vs HEAD
paginas revisadas: 18; con anomalia: 0
== selector de idioma (HEAD): opciones y aria-current en /, /en/ y /pt/
index.html: opciones=6 aria-current=2
en/index.html: opciones=6 aria-current=2
pt/index.html: opciones=6 aria-current=2
== destinos del selector en /en/servicios/
<a href="/en/servicios/" hreflang="en"
<a href="/pt/servicios/" hreflang="pt"
<a href="/servicios/" hreflang="es"
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
/usr/bin/grep: warning: stray \ before "
```
<!-- evidencia:fin verify-report.28 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.29","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales\nP=log-atm-web-astro/src/components/ui/Navbar.astro\nif diff <(git show 1c70406:$P | sed -n '/^<script\u003e/,/^<\\/script\u003e/p') <(git show HEAD:$P | sed -n '/^<script\u003e/,/^<\\/script\u003e/p') \u003e /dev/null; then echo \"script del Navbar (inert, focus-trap, Escape, backdrop): identico a main@1c70406\"; else echo \"script del Navbar: DISTINTO\"; fi\necho \"reglas prefers-reduced-motion del drawer en HEAD: $(sed -n '/<style\u003e/,/<\\/style\u003e/p' $P | /usr/bin/grep -c 'prefers-reduced-motion: reduce')\"\necho \"transicion del panel en HEAD:\"; /usr/bin/grep -n \"transition: transform\\|translateX(100%)\" $P\necho \"== diff de Navbar.astro fuera del script: lineas +/- (sin cabeceras)\"\ngit diff -U0 1c70406 HEAD -- $P | /usr/bin/grep -E '^[+-][^+-]' | cut -c1-140\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:40:13-03:00","exit":0,"sha256":"b96f975bcf5c19224130aad9144c00ef6f8a2841a0db3a3f11071ddaaf6c7ff9","lineas":24,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.29`** · exit 0 · 24 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:40:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
P=log-atm-web-astro/src/components/ui/Navbar.astro
if diff <(git show 1c70406:$P | sed -n '/^<script>/,/^<\/script>/p') <(git show HEAD:$P | sed -n '/^<script>/,/^<\/script>/p') > /dev/null; then echo "script del Navbar (inert, focus-trap, Escape, backdrop): identico a main@1c70406"; else echo "script del Navbar: DISTINTO"; fi
echo "reglas prefers-reduced-motion del drawer en HEAD: $(sed -n '/<style>/,/<\/style>/p' $P | /usr/bin/grep -c 'prefers-reduced-motion: reduce')"
echo "transicion del panel en HEAD:"; /usr/bin/grep -n "transition: transform\|translateX(100%)" $P
echo "== diff de Navbar.astro fuera del script: lineas +/- (sin cabeceras)"
git diff -U0 1c70406 HEAD -- $P | /usr/bin/grep -E '^[+-][^+-]' | cut -c1-140
```

```text
script del Navbar (inert, focus-trap, Escape, backdrop): identico a main@1c70406
reglas prefers-reduced-motion del drawer en HEAD: 2
transicion del panel en HEAD:
233:    transition: transform 250ms ease, opacity 250ms ease;
279:    transform: translateX(100%);
280:    transition: transform 250ms cubic-bezier(0.32, 0.72, 0, 1);
== diff de Navbar.astro fuera del script: lineas +/- (sin cabeceras)
-import { useTranslations, getLangFromUrl, stripLocaleFromPath, buildLocaleUrl, isRTL } from '../../i18n/utils';
+import { useTranslations, getLangFromUrl, stripLocaleFromPath, buildLocaleUrl } from '../../i18n/utils';
-const rtl = isRTL(currentLang);
-<div class:list={['nav-drawer', { 'is-rtl': rtl }]} id="nav-drawer" aria-hidden="true">
+<div class="nav-drawer" id="nav-drawer" aria-hidden="true">
-    /* `--drawer-offset` permite invertir el origen del slide en RTL */
-    --drawer-offset: 100%;
-    transform: translateX(var(--drawer-offset));
+    transform: translateX(100%);
-  /* En RTL el drawer entra desde el inicio lógico (izquierda visual). */
-  [dir="rtl"] .nav-drawer__panel,
-  .nav-drawer.is-rtl .nav-drawer__panel {
-    inset-inline-end: auto;
-    inset-inline-start: 0;
-    --drawer-offset: -100%;
-    box-shadow: 8px 0 48px rgb(15 30 55 / 0.18);
-  }
```
<!-- evidencia:fin verify-report.29 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.30","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/specs\necho \"== superseded_by y status de las specs afectadas\"\nfor f in i18n-core/i18n-core-translation-helpers i18n-routing/i18n-routing-locale-prefixes i18n-ui-selector/i18n-ui-selector-navbar i18n-seo-hreflang/i18n-seo-hreflang i18n-translations/i18n-translations-json-structure i18n-translations/i18n-translations-build-validation i18n-rtl-support/i18n-rtl-support-arabic; do\n  printf '%s | ' \"$(basename $f)\"; /usr/bin/grep -E '^(superseded_by|status):' $f.md | tr '\\n' ' '; echo\ndone\necho \"== specs vigentes de i18n-routing que mencionan zh, hi o ar como codigo de idioma\"\nfor f in i18n-routing/*.md; do sb=$(/usr/bin/grep -E '^superseded_by:' $f); case \"$sb\" in *null*) /usr/bin/grep -nE '(/|`|\"|\\b)(zh|hi|ar)(/|`|\"|\\b)' $f | /usr/bin/grep -vE 'hreflang|\\bar\\b *(de|la|el)' | sed \"s#^#$f: #\";; esac; done\necho \"exit barrido: ok\"\necho \"== specs de 404 y enlaces sin cambios frente a 1c70406\"\ngit -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales diff --stat 1c70406 HEAD -- memory/specs/i18n-routing/i18n-not-found-localized.md memory/specs/i18n-routing/i18n-not-found-navigation-and-seo-signals.md memory/specs/i18n-routing/i18n-internal-links-keep-language.md | wc -l\nls i18n-routing\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:40:36-03:00","exit":0,"sha256":"7d25e03baf4936f57f2ee4d2d2971aaca294d334837aa086dd30128d42e776ab","lineas":19,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.30`** · exit 0 · 19 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:40:36-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/specs
echo "== superseded_by y status de las specs afectadas"
for f in i18n-core/i18n-core-translation-helpers i18n-routing/i18n-routing-locale-prefixes i18n-ui-selector/i18n-ui-selector-navbar i18n-seo-hreflang/i18n-seo-hreflang i18n-translations/i18n-translations-json-structure i18n-translations/i18n-translations-build-validation i18n-rtl-support/i18n-rtl-support-arabic; do
  printf '%s | ' "$(basename $f)"; /usr/bin/grep -E '^(superseded_by|status):' $f.md | tr '\n' ' '; echo
done
echo "== specs vigentes de i18n-routing que mencionan zh, hi o ar como codigo de idioma"
for f in i18n-routing/*.md; do sb=$(/usr/bin/grep -E '^superseded_by:' $f); case "$sb" in *null*) /usr/bin/grep -nE '(/|`|"|\b)(zh|hi|ar)(/|`|"|\b)' $f | /usr/bin/grep -vE 'hreflang|\bar\b *(de|la|el)' | sed "s#^#$f: #";; esac; done
echo "exit barrido: ok"
echo "== specs de 404 y enlaces sin cambios frente a 1c70406"
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales diff --stat 1c70406 HEAD -- memory/specs/i18n-routing/i18n-not-found-localized.md memory/specs/i18n-routing/i18n-not-found-navigation-and-seo-signals.md memory/specs/i18n-routing/i18n-internal-links-keep-language.md | wc -l
ls i18n-routing
```

```text
== superseded_by y status de las specs afectadas
i18n-core-translation-helpers | superseded_by: "[[i18n-core-three-locales-single-source]]" status: completed 
i18n-routing-locale-prefixes | superseded_by: "[[i18n-routing-pages-and-language-selector]]" status: completed 
i18n-ui-selector-navbar | superseded_by: "[[i18n-routing-pages-and-language-selector]]" status: completed 
i18n-seo-hreflang | superseded_by: "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]" status: completed 
i18n-translations-json-structure | superseded_by: "[[i18n-translations-parity-and-build-validation]]" status: completed 
i18n-translations-build-validation | superseded_by: "[[i18n-translations-parity-and-build-validation]]" status: completed 
i18n-rtl-support-arabic | superseded_by: null status: cancelled 
== specs vigentes de i18n-routing que mencionan zh, hi o ar como codigo de idioma
i18n-routing/i18n-routing-pages-and-language-selector.md: 27:  - "[x] Ninguna spec vigente de esta capability menciona `zh`, `hi` ni `ar`, y las specs [[i18n-not-found-localized]], [[i18n-not-found-navigation-and-seo-signals]] y [[i18n-internal-links-keep-language]] conservan su contenido y estado."
i18n-routing/i18n-routing-pages-and-language-selector.md: 136:- [x] Ninguna spec vigente de esta capability menciona `zh`, `hi` ni `ar`, y las specs [[i18n-not-found-localized]], [[i18n-not-found-navigation-and-seo-signals]] y [[i18n-internal-links-keep-language]] conservan su contenido y estado.
exit barrido: ok
== specs de 404 y enlaces sin cambios frente a 1c70406
0
i18n-internal-links-keep-language.md
i18n-not-found-localized.md
i18n-not-found-navigation-and-seo-signals.md
i18n-routing-locale-prefixes.md
i18n-routing-pages-and-language-selector.md
```
<!-- evidencia:fin verify-report.30 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.31","forma":"argv","argv":["python3","-I","-c","import subprocess,json,sys; r=subprocess.run([\"python3\",\"/home/kapridoo/.claude/skills/_shared/scripts/spec_graph.py\",\"grafo\",\"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory\",\"debt-i18n-three-locales\"],capture_output=True,text=True); d=json.loads(r.stdout); print(\"exit spec_graph:\",r.returncode); print(\"specs:\",[s[\"slug\"] for s in d[\"specs\"]]); print(\"hallazgos:\",len(d[\"hallazgos\"]),d[\"hallazgos\"])"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:40:37-03:00","exit":0,"sha256":"280377b6f2b0aed467df8424d9f9e2829e3114d98bc52a3473dbbb808508a564","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.31`** · exit 0 · 3 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:40:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
python3 -I -c 'import subprocess,json,sys; r=subprocess.run(["python3","/home/kapridoo/.claude/skills/_shared/scripts/spec_graph.py","grafo","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory","debt-i18n-three-locales"],capture_output=True,text=True); d=json.loads(r.stdout); print("exit spec_graph:",r.returncode); print("specs:",[s["slug"] for s in d["specs"]]); print("hallazgos:",len(d["hallazgos"]),d["hallazgos"])'
```

```text
exit spec_graph: 0
specs: ['i18n-core-three-locales-single-source', 'i18n-routing-pages-and-language-selector', 'i18n-seo-alternates-sitemap-and-breadcrumbs', 'i18n-translations-parity-and-build-validation']
hallazgos: 0 []
```
<!-- evidencia:fin verify-report.31 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.32","forma":"argv","argv":["/home/kapridoo/.pyenv/versions/3.12.10/bin/python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:41:13-03:00","exit":0,"sha256":"4a6c6a5bdb373352c3c92b4d980ed554ecf58a8b36b6995e9a21f5ef72d9cd2d","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volvería a comprobar este informe"} -->
**Evidencia `verify-report.32`** · exit 0 · 1 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:41:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales`
No re-comprobable: comprobar sobre verify-report.md volvería a comprobar este informe

```text
/home/kapridoo/.pyenv/versions/3.12.10/bin/python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/apply-evidence.md","bloques":29,"comprobados":17,"calzan":["apply-evidence.1","apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.5","apply-evidence.6","apply-evidence.7","apply-evidence.8","apply-evidence.9","apply-evidence.10","apply-evidence.11","apply-evidence.16","apply-evidence.20","apply-evidence.21","apply-evidence.23","apply-evidence.24","apply-evidence.25"],"no_calzan":[],"omitidos":[{"id":"apply-evidence.12","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.13","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.14","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.15","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.17","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.18","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.19","motivo":"corre en la copia aislada bajo el directorio de temporales del despacho, que se borra al terminar la prueba"},{"id":"apply-evidence.26","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.27","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.28","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.29","motivo":"verify corre la suite completa sobre e…(+242 caracteres)
```
<!-- evidencia:fin verify-report.32 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.33","forma":"argv","argv":["/home/kapridoo/.pyenv/versions/3.12.10/bin/python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales","head":"960703569ef4b681ff21b82141f4f1e15b5aba6d","fecha":"2026-10-08T20:41:14-03:00","exit":0,"sha256":"277eb16625bd5aef56b5924bd42fcba60a84b573a59061345f290e4e2fee41da","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría el informe a sí mismo"} -->
**Evidencia `verify-report.33`** · exit 0 · 1 líneas, 0 omitidas · HEAD `960703569ef4` · 2026-10-08T20:41:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales`
No re-comprobable: re-ejecutarlo comprobaría el informe a sí mismo

```text
/home/kapridoo/.pyenv/versions/3.12.10/bin/python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/memory/changes/debt-i18n-three-locales/verify-report.md","bloques":27,"comprobados":10,"calzan":["verify-report.1","verify-report.2","verify-report.3","verify-report.4","verify-report.7","verify-report.8","verify-report.27","verify-report.29","verify-report.30","verify-report.31"],"no_calzan":[],"omitidos":[{"id":"verify-report.9","motivo":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.10","motivo":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.11","motivo":"corre sobre copias aisladas (base y HEAD) bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.12","motivo":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.13","motivo":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.14","motivo":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.15","motivo":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.16","motivo":"corre en la copia aislada de HEAD bajo el directorio de temporales del despacho de sdd-verify, que no persiste"},{"id":"verify-report.17","motivo":"pide la 404 a dos astro preview (base y HEAD) levantados en copias aisladas del directorio de temporales, que se bajan al terminar"},{"id":"verify-report.18","motivo":"mide en Chrome real sobre dos astro preview (base y HEAD) en copias aisladas del directorio de temporales, que se bajan al terminar; las capturas de p\u00e1gina completa var\u00edan …(+1316 caracteres)
```
<!-- evidencia:fin verify-report.33 -->
