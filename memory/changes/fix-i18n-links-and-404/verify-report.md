---
verdict: PASS
---

# Verify Report: fix-i18n-links-and-404

**Fecha**: 2026-10-02

El proyecto no tiene suite de tests ni instrumento de cobertura; la verificación se hace con `astro build`, el barrido `check-i18n-links`, `astro preview` (adaptador Cloudflare, workerd) y Chrome headless, según `design.md § Estrategia de Testing`. Cada afirmación remite al bloque de evidencia que la respalda, registrado al final de este informe.

## Resultados por Spec

### Los enlaces internos conservan el idioma de la página (`i18n-internal-links-keep-language`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Todo enlace interno de navegación de las páginas en y pt lleva a la versión del mismo idioma | ✅ | `verify-report.3`: el barrido sobre el build del cambio sale con exit 0 y cero violaciones. `verify-report.6` es la contraprueba: el mismo script contra el build de `main` sale con exit 1 y detecta violaciones por `/`, `/servicios`, `/cotizar` y `/contacto`, de modo que el barrido sí discrimina |
| Tarjetas de servicios (home y catálogo), CTA de servicios e industrias, migaja «Inicio» de las cinco páginas internas y «volver al inicio» de cotizar conservan el idioma | ✅ | `verify-report.4` y `verify-report.5` muestran, por página y por idioma, los hrefs `/`, `/en/`, `/pt/` en la migaja, `/contacto/`, `/en/contacto/`, `/pt/contacto/` en los CTA, `/servicios/` localizado en las tarjetas de la home y el botón de cotizar apuntando a la home del idioma; `verify-report.5` confirma además que las fuentes ya no contienen los literales `href="/"` ni `href="/contacto"` |
| Revisión automatizada y repetible sin enlaces fuera de idioma, excluyendo el selector | ✅ | Script `scripts/check-i18n-links.ts` registrado en `package.json`; ejecutado en `verify-report.3` |
| Las páginas en español mantienen URLs sin prefijo | ✅ | Los hrefs `/`, `/contacto/`, `/cotizar/`, `/servicios/` de `verify-report.4` y `verify-report.5` no llevan prefijo; la regla de idioma del barrido (`verify-report.3`) también la cubre |

**Scenarios verificados**: 7/7 (home en, cotizar pt, industrias en, migaja pt, fin de cotización en, español sin prefijo por HTML estático; selector de idioma sin cambios por `verify-report.12`).

### Las tarjetas del catálogo no enlazan a la propia página (`services-catalog-no-self-link`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Ninguna tarjeta del catálogo enlaza al propio catálogo en es, en y pt | ✅ | `verify-report.4`: en las tres versiones de `/servicios/` la única `a.svc-card` es la de cotizar |
| Las tarjetas sin destino propio no muestran affordance de enlace | ✅ | `verify-report.4` las lista como `div.svc-card--static`; `verify-report.11` muestra que esa clase fija `cursor: default` y anula el hover |
| Consultoría conserva su enlace a cotizar en el idioma de la página | ✅ | `verify-report.4`: `/cotizar/`, `/en/cotizar/`, `/pt/cotizar/` |
| Las tarjetas de la home siguen enlazando al catálogo en el idioma de la página | ✅ | `verify-report.4`: `/servicios/`, `/en/servicios/`, `/pt/servicios/` en la home de cada idioma; las tarjetas sin destino siguen estáticas |

**Scenarios verificados**: 3/3.

### La página 404 se muestra en el idioma del prefijo de la URL (`i18n-not-found-localized`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| `/en/` inexistente responde 404 en inglés, a cualquier profundidad y con o sin barra final | ✅ | `verify-report.7`: `/en/no-existe`, `/en/no-existe/` y `/en/foo/bar/baz/` responden 404 con `html lang` `en-US` y título en inglés |
| `/pt/` inexistente responde 404 en portugués | ✅ | `verify-report.7`: `/pt/a/b/c` responde 404 con `pt-BR` |
| URL inexistente sin prefijo responde 404 en español | ✅ | `verify-report.7`: `/no-existe` responde 404 con `es-CL` |
| La 404 declara el idioma del prefijo y `noindex, nofollow` | ✅ | `verify-report.7`: campos `html_lang` y `robots` de todas las rutas |
| `/en/404/` y `/pt/404/` responden 404 | ✅ | `verify-report.7`; además `verify-report.4` muestra que `dist/client` ya no contiene `404.html`, `en/404`, `pt/404` ni existe `src/pages/[lang]/404.astro` (definición única) |
| Páginas existentes y servicio del formulario sin cambios | ✅ | `verify-report.7`: rutas existentes con 200 y `<head>` idéntico al build de `main`; `verify-report.10`: `/api/contacto` responde igual en `main` y en el cambio para las tres peticiones |
| Rebote del «404» y movimiento reducido en es, en y pt | ✅ | `verify-report.9`: con `no-preference` la opacidad mínima muestreada es menor que 1 y la final es 1; con `reduce` no hay estilo inline ni animación; sin excepciones de página. `verify-report.8` queda retirado (ver Hallazgos) |
| Verificación en vista previa local que reproduce el entorno de ejecución | ✅ | `astro preview` con el adaptador de Cloudflare (`verify-report.7`, `verify-report.9`). El criterio de producción se declara en el MR (`clarifications.md`) y no se verifica en esta fase |

**Scenarios verificados**: 6/6.

### La página 404 ofrece salidas útiles y no emite señales SEO a la URL inexistente (`i18n-not-found-navigation-and-seo-signals`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| El selector de idioma de la 404 ofrece las homes de cada idioma y ninguna URL derivada de la inexistente | ✅ | `verify-report.7`: `selector_hrefs` es `/`, `/en/`, `/pt/` en todas las rutas 404, y el idioma activo lleva `aria-current` y `is-active`; ningún `nav__link` queda con `aria-current="page"` |
| La 404 no emite canonical, og:url, hreflang alternates ni BreadcrumbList | ✅ | `verify-report.7`: los cuatro indicadores son `false` o 0 en todas las rutas 404 |
| Páginas existentes mantienen selector y señales SEO | ✅ | `verify-report.7`: señales y `<head>` completo idénticos al build de `main` en `/`, `/en/servicios/` y `/pt/contacto/`; `verify-report.12`: la región Navbar/selector del HTML estático es idéntica a `main` en las páginas comparadas |

**Scenarios verificados**: 3/3.

### Tests

No existe suite de tests automatizada en el proyecto (`_profile.md`); la corrida completa que declara el perfil es `npm run build` más las validaciones `validate-i18n` y `check-i18n-links`:

- `verify-report.1`: `npm run build` (corrida completa, sin repetición); terminó con exit 0 y prerenderizó las rutas estáticas sin generar rutas 404 estáticas.
- `verify-report.2`: `npm run validate-i18n`.
- `verify-report.3`: `npm run check-i18n-links`.
- `verify-report.4` a `verify-report.12`: comprobaciones sobre el HTML estático, `astro preview`, Chrome headless, la contraprueba contra `main` (`verify-report.6`) y los archivos prohibidos o sin cambio del PR #33 (`verify-report.11`, que muestra cero modificaciones y la lista de archivos tocados, todos dentro del alcance declarado de las specs).

**Cobertura**: no hay instrumento de cobertura en el proyecto.

## Observaciones

- `design.md` espera que `POST /api/contacto` vacío responda 400; `verify-report.10` muestra que un POST sin `content-type` responde 403 y con `content-type: application/json` responde 400, idéntico en `main` y en el cambio. El comportamiento del servicio no cambió; la expectativa del diseño es imprecisa respecto del cuerpo sin `content-type`.
- La verificación en el entorno de producción (`/en/no-existe` en el dominio real) queda declarada para el MR; esta fase solo la cubre en `astro preview`.
- `memory/observations.md` aparece modificado y sin commit en el worktree (anotaciones de fases previas); no pertenece al código del cambio.

## Hallazgos de Seguridad (si aplica)

No aplica: el dominio es `fix`. Sin hallazgos de seguridad.

## Coherencia de Grafo de Specs

Las cuatro specs de `spec_refs` declaran `depends_on: []`, `affects: []` y `adrs: []`; no hay aristas que validar ni inconsistencias.

## Correcciones de Metadata

Ninguna. Con validación principal PASS se marcaron los acceptance criteria cumplidos y se fijó `verified_at: "2026-10-02"` en las cuatro specs.

## Hallazgos de la comprobación de evidencia

- `verify-report.13` (`comprobar` sobre `apply-evidence.md`) lista en `no_calzan` los bloques `apply-evidence.11` y `apply-evidence.12`: ambos son `git diff --name-status` entre el HEAD de aquel momento y `main`/`b8f4cb3`, y su salida cambió porque el HEAD avanzó (merge de `main` y commits de evidencia posteriores). Son hallazgos de obsolescencia, no de comportamiento: la comprobación vigente de archivos prohibidos y sin cambio está en `verify-report.11`. Que los demás bloques de `apply-evidence.md` calcen no cumple ningún criterio; cada criterio se verificó con evidencia propia arriba.
- `verify-report.14` (`comprobar` sobre este informe) lista `no_calzan` vacío y sin `error`.
- Bloque retirado: `verify-report.8` (Chrome headless) falló en la ruta `/no-existe` por la ventana de muestreo del script, que leyó el estado antes de que el módulo GSAP arrancara en la carga en frío; lo reemplaza `verify-report.9`, con muestreo continuo corregido. Ninguna conclusión del informe se apoya en `verify-report.8`.
- Bloque retirado en su segunda parte: en `verify-report.11` la sección de comparación de cabecera (`header`) no encontró el elemento en las páginas distintas de la home, por lo que no es evidencia; la comparación del Navbar y del selector vigente es `verify-report.12`.

## Acciones Requeridas

Ninguna. Verdict PASS.

## Evidencia

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:36:35-03:00","exit":0,"sha256":"1da73a906147c1f0b910728d7096fd866b53de5031b80545659e27e554d4f4ef","lineas":143,"omitidas":103,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 143 líneas, 103 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:36:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

22:36:23 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:36:23 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:36:26 [types] Generated 2.18s
22:36:26 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
22:36:26 [build] output: "static"
22:36:26 [build] mode: "server"
22:36:26 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro/dist/
22:36:26 [build] adapter: @astrojs/cloudflare
22:36:26 [build] Collecting build info...
22:36:26 [build] ✓ Completed in 2.82s.
22:36:26 [build] Building server entrypoints...
22:36:30 [vite] ✓ built in 3.36s
22:36:32 [vite] ✓ built in 2.27s
22:36:33 [vite] ✓ built in 1.18s

 prerendering static routes 
22:36:34   ├─ /contacto/index.html (+33ms) 
22:36:34   ├─ /cotizar/index.html (+18ms) 
22:36:34   ├─ /industrias/index.html (+30ms) 
22:36:34   ├─ /nosotros/index.html (+20ms) 
22:36:34   ├─ /servicios/index.html (+27ms) 
22:36:34   ├─ /en/contacto/index.html (+19ms) 
22:36:34   ├─ /pt/contacto/index.html (+18ms) 
22:36:34   ├─ /en/cotizar/index.html (+16ms) 
22:36:34   ├─ /pt/cotizar/index.html (+17ms) 
22:36:34   ├─ /en/industrias/index.html (+24ms) 
22:36:34   ├─ /pt/industrias/index.html (+20ms) 
22:36:34   ├─ /en/nosotros/index.html (+16ms) 
22:36:34   ├─ /pt/nosotros/index.html (+15ms) 
22:36:34   ├─ /en/servicios/index.html (+19ms) 
22:36:34   ├─ /pt/servicios/index.html (+22ms) 
22:36:34   ├─ /en/index.html (+21ms) 
22:36:34   ├─ /pt/index.html (+21ms) 
22:36:34   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:36:38-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 6 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:36:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:36:39-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 5 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:36:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"archivo","argv":null,"texto":"# Estructura de dist/client y tarjetas del catálogo y de la home en el build del cambio\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro\nfor p in dist/client/404.html dist/client/en/404 dist/client/pt/404 'src/pages/[lang]/404.astro'; do\n  if [ -e \"$p\" ]; then echo \"PRESENTE $p\"; else echo \"ausente  $p\"; fi\ndone\nfor f in servicios en/servicios pt/servicios; do\n  echo \"== $f: a.svc-card hrefs\"\n  grep -o '<a[^\u003e]*class=\"[^\"]*svc-card[^\"]*\"[^\u003e]*\u003e' dist/client/$f/index.html | grep -o 'href=\"[^\"]*\"' | sort | uniq -c\n  echo \"   div.svc-card--static: $(grep -o '<div[^\u003e]*class=\"[^\"]*svc-card--static[^\"]*\"' dist/client/$f/index.html | wc -l)\"\ndone\nfor f in index.html en/index.html pt/index.html; do\n  echo \"== home $f: a.svc-card hrefs\"\n  grep -o '<a[^\u003e]*class=\"[^\"]*svc-card[^\"]*\"[^\u003e]*\u003e' dist/client/$f | grep -o 'href=\"[^\"]*\"' | sort | uniq -c\n  echo \"   div.svc-card--static: $(grep -o '<div[^\u003e]*class=\"[^\"]*svc-card--static[^\"]*\"' dist/client/$f | wc -l)\"\ndone\nfor f in servicios en/servicios pt/servicios industrias en/industrias pt/industrias contacto en/contacto pt/contacto nosotros en/nosotros pt/nosotros cotizar en/cotizar pt/cotizar; do\n  echo \"== $f breadcrumb/cta: $(grep -o '<a href=\"[^\"]*\"\u003e\\(Inicio\\|Home\\|Início\\)</a\u003e' dist/client/$f/index.html | head -1) | contacto: $(grep -o 'href=\"[^\"]*contacto/\\?\"' dist/client/$f/index.html | sort -u | tr '\\n' ' ')\"\ndone\necho \"== cotizar volver al inicio\"\nfor f in cotizar en/cotizar pt/cotizar; do grep -o '<a class=\"btn btn--brand\" href=\"[^\"]*\"' dist/client/$f/index.html; done\necho \"== literales href=\\\"/\\\" o href=\\\"/contacto\\\" en fuentes\"\ngrep -n 'href=\"/\"\\|href=\"/contacto\"' src/pages/*.astro src/components/sections/ServicesSection.astro || echo \"sin literales\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:36:54-03:00","exit":0,"sha256":"53ce5d9af2985fc6073f7ba45b6f791ba6065be12451d99150927a3a9a76aa3b","lineas":46,"omitidas":6,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 46 líneas, 6 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:36:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```bash
# Estructura de dist/client y tarjetas del catálogo y de la home en el build del cambio
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro
for p in dist/client/404.html dist/client/en/404 dist/client/pt/404 'src/pages/[lang]/404.astro'; do
  if [ -e "$p" ]; then echo "PRESENTE $p"; else echo "ausente  $p"; fi
done
for f in servicios en/servicios pt/servicios; do
  echo "== $f: a.svc-card hrefs"
  grep -o '<a[^>]*class="[^"]*svc-card[^"]*"[^>]*>' dist/client/$f/index.html | grep -o 'href="[^"]*"' | sort | uniq -c
  echo "   div.svc-card--static: $(grep -o '<div[^>]*class="[^"]*svc-card--static[^"]*"' dist/client/$f/index.html | wc -l)"
done
for f in index.html en/index.html pt/index.html; do
  echo "== home $f: a.svc-card hrefs"
  grep -o '<a[^>]*class="[^"]*svc-card[^"]*"[^>]*>' dist/client/$f | grep -o 'href="[^"]*"' | sort | uniq -c
  echo "   div.svc-card--static: $(grep -o '<div[^>]*class="[^"]*svc-card--static[^"]*"' dist/client/$f | wc -l)"
done
for f in servicios en/servicios pt/servicios industrias en/industrias pt/industrias contacto en/contacto pt/contacto nosotros en/nosotros pt/nosotros cotizar en/cotizar pt/cotizar; do
  echo "== $f breadcrumb/cta: $(grep -o '<a href="[^"]*">\(Inicio\|Home\|Início\)</a>' dist/client/$f/index.html | head -1) | contacto: $(grep -o 'href="[^"]*contacto/\?"' dist/client/$f/index.html | sort -u | tr '\n' ' ')"
done
echo "== cotizar volver al inicio"
for f in cotizar en/cotizar pt/cotizar; do grep -o '<a class="btn btn--brand" href="[^"]*"' dist/client/$f/index.html; done
echo "== literales href=\"/\" o href=\"/contacto\" en fuentes"
grep -n 'href="/"\|href="/contacto"' src/pages/*.astro src/components/sections/ServicesSection.astro || echo "sin literales"
```

```text
ausente  dist/client/404.html
ausente  dist/client/en/404
ausente  dist/client/pt/404
ausente  src/pages/[lang]/404.astro
== servicios: a.svc-card hrefs
      1 href="/cotizar/"
   div.svc-card--static: 10
== en/servicios: a.svc-card hrefs
      1 href="/en/cotizar/"
   div.svc-card--static: 10
== pt/servicios: a.svc-card hrefs
      1 href="/pt/cotizar/"
   div.svc-card--static: 10
== home index.html: a.svc-card hrefs
      1 href="/cotizar/"
      3 href="/servicios/"
   div.svc-card--static: 2
== home en/index.html: a.svc-card hrefs
      1 href="/en/cotizar/"
      3 href="/en/servicios/"
   div.svc-card--static: 2
== home pt/index.html: a.svc-card hrefs
      1 href="/pt/cotizar/"
      3 href="/pt/servicios/"
   div.svc-card--static: 2
== servicios breadcrumb/cta: <a href="/">Inicio</a> | contacto: href="/contacto/" 
== en/servicios breadcrumb/cta: <a href="/en/">Home</a> | contacto: href="/en/contacto/" 
== pt/servicios breadcrumb/cta: <a href="/pt/">Início</a> | contacto: href="/pt/contacto/" 
== industrias breadcrumb/cta: <a href="/">Inicio</a> | contacto: href="/contacto/" 
== en/industrias breadcrumb/cta: <a href="/en/">Home</a> | contacto: href="/en/contacto/" 
== pt/industrias breadcrumb/cta: <a href="/pt/">Início</a> | contacto: href="/pt/contacto/" 
== contacto breadcrumb/cta: <a href="/">Inicio</a> | contacto: href="/contacto/" href="/en/contacto/" href="https://logatm.com/contacto/" href="https://logatm.com/en/contacto/" href="https://logatm.com/pt/contacto/" href="/pt/contacto/" 
== en/contacto breadcrumb/cta: <a href="/en/">Home</a> | contacto: href="/contacto/" href="/en/contacto/" href="https://logatm.com/contacto/" href="https://logatm.com/en/contacto/" href="https://logatm.com/pt/contacto/" href="/pt/contacto/" 
== pt/contacto breadcrumb/cta: <a href="/pt/">Início</a> | contacto: href="/contacto/" href="/en/contacto/" href="https://logatm.com/contacto/" href="https://logatm.com/en/contacto/" href="https://logatm.com/pt/contacto/" href="/pt/contacto/" 
== nosotros breadcrumb/cta: <a href="/">Inicio</a> | contacto: href="/contacto/" 
== en/nosotros breadcrumb/cta: <a href="/en/">Home</a> | contacto: href="/en/contacto/" 
== pt/nosotros breadcrumb/cta: <a href="/pt/">Início</a> | contacto: href="/pt/contacto/" 
== cotizar breadcrumb/cta: <a href="/">Inicio</a> | contacto: href="/contacto/" 
== en/cotizar breadcrumb/cta: <a href="/en/">Home</a> | contacto: href="/en/contacto/" 
== pt/cotizar breadcrumb/cta: <a href="/pt/">Início</a> | contacto: href="/pt/contacto/" 
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"archivo","argv":null,"texto":"# Botón «volver al inicio» de cotizar y ausencia de literales de href en las fuentes\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro\nfor f in cotizar en/cotizar pt/cotizar; do grep -o '<a class=\"btn btn--brand\" href=\"[^\"]*\"\u003e[^<]*' dist/client/$f/index.html; done\ngrep -n 'href=\"/\"\\|href=\"/contacto\"' src/pages/*.astro src/components/sections/ServicesSection.astro || echo \"sin literales\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:37:08-03:00","exit":0,"sha256":"76bea2d1040dd04a14e35e307d8280637a0a2a8415ab1e84d4fbfcb8e1e99a2d","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 0 · 4 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:37:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```bash
# Botón «volver al inicio» de cotizar y ausencia de literales de href en las fuentes
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro
for f in cotizar en/cotizar pt/cotizar; do grep -o '<a class="btn btn--brand" href="[^"]*">[^<]*' dist/client/$f/index.html; done
grep -n 'href="/"\|href="/contacto"' src/pages/*.astro src/components/sections/ServicesSection.astro || echo "sin literales"
```

```text
<a class="btn btn--brand" href="/">Volver al inicio
<a class="btn btn--brand" href="/en/">Back to home
<a class="btn btn--brand" href="/pt/">Voltar ao início
sin literales
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"archivo","argv":null,"texto":"# Contraprueba: el barrido del cambio contra el build de main (copia aislada) detecta las violaciones conocidas\nset -u\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_\nDEST=$(mktemp -d \"$T/main-base.XXXXXXXX\")\ncase \"$(realpath \"$DEST\")\" in \"$(realpath \"$W\")\"*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive main log-atm-web-astro | tar -x -C \"$DEST\"\nA=\"$DEST/log-atm-web-astro\"\nln -s \"$W/log-atm-web-astro/node_modules\" \"$A/node_modules\"\ncp \"$W/log-atm-web-astro/scripts/check-i18n-links.ts\" \"$A/scripts/check-i18n-links.ts\"\ncd \"$A\" && npx astro build \u003e \"$DEST/build.log\" 2\u003e&1; echo \"build main exit=$?\"\ntest -d \"$A/dist/client\" && echo \"dist/client de main presente\" \nnpx tsx scripts/check-i18n-links.ts \u003e \"$DEST/barrido.txt\"; echo \"barrido sobre main exit=$?\"\necho \"-- resumen\"; tail -1 \"$DEST/barrido.txt\"\necho \"-- violaciones por href y regla (href, cantidad)\"\ngrep ' — ' \"$DEST/barrido.txt\" | sed 's/^[^:]*: //' | sort | uniq -c | sort -rn\necho \"-- 404 en main\"; ls \"$A/dist/client\" | grep -c 404; ls \"$A/dist/client/en\" | grep 404\necho \"$DEST\" \u003e \"$T/main-base-path.txt\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:37:20-03:00","exit":0,"sha256":"9de2e43676e2ecad50f37b251664b58a30430714b09862e911a896da5c24a13b","lineas":20,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 20 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:37:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`

```bash
# Contraprueba: el barrido del cambio contra el build de main (copia aislada) detecta las violaciones conocidas
set -u
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_
DEST=$(mktemp -d "$T/main-base.XXXXXXXX")
case "$(realpath "$DEST")" in "$(realpath "$W")"*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive main log-atm-web-astro | tar -x -C "$DEST"
A="$DEST/log-atm-web-astro"
ln -s "$W/log-atm-web-astro/node_modules" "$A/node_modules"
cp "$W/log-atm-web-astro/scripts/check-i18n-links.ts" "$A/scripts/check-i18n-links.ts"
cd "$A" && npx astro build > "$DEST/build.log" 2>&1; echo "build main exit=$?"
test -d "$A/dist/client" && echo "dist/client de main presente" 
npx tsx scripts/check-i18n-links.ts > "$DEST/barrido.txt"; echo "barrido sobre main exit=$?"
echo "-- resumen"; tail -1 "$DEST/barrido.txt"
echo "-- violaciones por href y regla (href, cantidad)"
grep ' — ' "$DEST/barrido.txt" | sed 's/^[^:]*: //' | sort | uniq -c | sort -rn
echo "-- 404 en main"; ls "$A/dist/client" | grep -c 404; ls "$A/dist/client/en" | grep 404
echo "$DEST" > "$T/main-base-path.txt"
```

```text
build main exit=0
dist/client de main presente
barrido sobre main exit=1
-- resumen
[i18n-links] 21 páginas (es=7, en=7, pt=7), 483 enlaces internos evaluados, 167 violaciones
-- violaciones por href y regla (href, cantidad)
     54 /contacto — path sin barra final (redirección intermedia)
     33 /servicios — path sin barra final (redirección intermedia)
     18 /contacto — idioma del enlace (es) distinto al de la página (pt)
     18 /contacto — idioma del enlace (es) distinto al de la página (en)
     11 /servicios — idioma del enlace (es) distinto al de la página (pt)
     11 /servicios — idioma del enlace (es) distinto al de la página (en)
      6 / — idioma del enlace (es) distinto al de la página (pt)
      6 / — idioma del enlace (es) distinto al de la página (en)
      6 /cotizar — path sin barra final (redirección intermedia)
      2 /cotizar — idioma del enlace (es) distinto al de la página (pt)
      2 /cotizar — idioma del enlace (es) distinto al de la página (en)
-- 404 en main
1
404
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_/preview_checks.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:37:47-03:00","exit":0,"sha256":"57f84b4991256d4f821b77d98958e2ca9b7e4b2b76be9b514d59831569604732","lineas":18,"omitidas":0,"no_recomprobable":"depende de un servidor astro preview levantado por la fase durante la verificación"} -->
**Evidencia `verify-report.7`** · exit 0 · 18 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:37:47-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: depende de un servidor astro preview levantado por la fase durante la verificación

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_/preview_checks.py
```

```text
### 404 por prefijo
{"path": "/no-existe", "status": 404, "html_lang": "es-CL", "esperado": "es-CL", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Página no encontrada | LOG ATM"}
{"path": "/en/no-existe", "status": 404, "html_lang": "en-US", "esperado": "en-US", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Page not found | LOG ATM"}
{"path": "/en/no-existe/", "status": 404, "html_lang": "en-US", "esperado": "en-US", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Page not found | LOG ATM"}
{"path": "/pt/a/b/c", "status": 404, "html_lang": "pt-BR", "esperado": "pt-BR", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Página não encontrada | LOG ATM"}
{"path": "/en/404/", "status": 404, "html_lang": "en-US", "esperado": "en-US", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Page not found | LOG ATM"}
{"path": "/pt/404/", "status": 404, "html_lang": "pt-BR", "esperado": "pt-BR", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Página não encontrada | LOG ATM"}
{"path": "/en/foo/bar/baz/", "status": 404, "html_lang": "en-US", "esperado": "en-US", "robots": "noindex, nofollow", "canonical": false, "hreflang_head": 0, "og_url": false, "breadcrumb": false, "selector_hrefs": ["/", "/en/", "/pt/"], "nav_link_aria_current": 0, "script_module": true, "titulo": "Page not found | LOG ATM"}
### aria-current del selector en /en/no-existe
['<a href="/" class="lang-selector__option" hreflang="es" lang="es" data-astro-cid-vznm5czf>', '<a href="/en/" class="lang-selector__option is-active" hreflang="en" aria-current="page" lang="en" data-astro-cid-vznm5czf>', '<a href="/pt/" class="lang-selector__option" hreflang="pt" lang="pt" data-astro-cid-vznm5czf>', '<a href="/" class="lang-selector__option" hreflang="es" lang="es" data-astro-cid-vznm5czf>', '<a href="/en/" class="lang-selector__option is-active" hreflang="en" aria-current="page" lang="en" data-astro-cid-vznm5czf>', '<a href="/pt/" class="lang-selector__option" hreflang="pt" lang="pt" data-astro-cid-vznm5czf>']
### Rutas existentes: señales SEO del <head> servido vs build de main
{"path": "/", "status": 200, "senales_identicas": true, "n_canonical": 1, "n_alternate": 4, "n_og_url": 1, "n_breadcrumb": 0, "head_completo_identico_sin_hashes": true}
{"path": "/en/servicios/", "status": 200, "senales_identicas": true, "n_canonical": 1, "n_alternate": 4, "n_og_url": 1, "n_breadcrumb": 1, "head_completo_identico_sin_hashes": true}
{"path": "/pt/contacto/", "status": 200, "senales_identicas": true, "n_canonical": 1, "n_alternate": 4, "n_og_url": 1, "n_breadcrumb": 1, "head_completo_identico_sin_hashes": true}
### API /api/contacto
POST vacío: 403
POST {} json: 400
GET: 405
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"archivo","argv":null,"texto":"# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_ && timeout 90 node chrome404.mjs\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_","head":null,"fecha":"2026-10-02T22:38:23-03:00","exit":1,"sha256":"8283ac5ccf9dbb87523f49bf28af9936a7cb7d71bab1f92444a454603c30dcf9","lineas":7,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo"} -->
**Evidencia `verify-report.8`** · exit 1 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T22:38:23-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_`
No re-comprobable: requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo

```bash
# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_ && timeout 90 node chrome404.mjs
```

```text
/no-existe [no-preference] lang=es-CL opacidad_temprana=1 opacidad_final=1 style_temprano="null" excepciones=0 -> FALLO
/no-existe [reduce] lang=es-CL opacidad_temprana=1 opacidad_final=1 style_temprano="null" excepciones=0 -> OK
/en/no-existe [no-preference] lang=en-US opacidad_temprana=0.2694 opacidad_final=1 style_temprano="translate: none; rotate: none; scale: none; opacity: 0.2694; transform: translate3d(0px, 0px, 0px) rotate(-3.653deg) scale(0.6347, 0.6347);" excepciones=0 -> OK
/en/no-existe [reduce] lang=en-US opacidad_temprana=1 opacidad_final=1 style_temprano="null" excepciones=0 -> OK
/pt/a/b/c [no-preference] lang=pt-BR opacidad_temprana=0.3176 opacidad_final=1 style_temprano="translate: none; rotate: none; scale: none; opacity: 0.3176; transform: translate3d(0px, 0px, 0px) rotate(-3.4118deg) scale(0.6588, 0.6588);" excepciones=0 -> OK
/pt/a/b/c [reduce] lang=pt-BR opacidad_temprana=1 opacidad_final=1 style_temprano="null" excepciones=0 -> OK
resultado: 1 FALLOS
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_ && timeout 90 node chrome404.mjs\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_","head":null,"fecha":"2026-10-02T22:39:10-03:00","exit":0,"sha256":"294f8d4d0b714b18d0d795f7dbb38d500a025e749790cd06d2295bfe05f8c561","lineas":7,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo; vigente respecto de verify-report.8 (muestreo corregido)"} -->
**Evidencia `verify-report.9`** · exit 0 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T22:39:10-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_`
No re-comprobable: requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo; vigente respecto de verify-report.8 (muestreo corregido)

```bash
# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_ && timeout 90 node chrome404.mjs
```

```text
/no-existe [no-preference] lang=es-CL opacidad_minima=0.1407 opacidad_final=1 con-estilo-inline excepciones=0 -> OK
/no-existe [reduce] lang=es-CL opacidad_minima=1 opacidad_final=1 sin-estilo-inline excepciones=0 -> OK
/en/no-existe [no-preference] lang=en-US opacidad_minima=0.0578 opacidad_final=1 con-estilo-inline excepciones=0 -> OK
/en/no-existe [reduce] lang=en-US opacidad_minima=1 opacidad_final=1 sin-estilo-inline excepciones=0 -> OK
/pt/a/b/c [no-preference] lang=pt-BR opacidad_minima=0.0803 opacidad_final=1 con-estilo-inline excepciones=0 -> OK
/pt/a/b/c [reduce] lang=pt-BR opacidad_minima=1 opacidad_final=1 sin-estilo-inline excepciones=0 -> OK
resultado: OK
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"# /api/contacto en main (puerto 4392) y en el cambio (puerto 4391), mismas peticiones\nfor port in 4392 4391; do\n  echo \"puerto $port:\"\n  echo \"  POST sin cuerpo ni content-type -\u003e $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:$port/api/contacto)\"\n  echo \"  POST content-type JSON, cuerpo vacío -\u003e $(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'content-type: application/json' http://127.0.0.1:$port/api/contacto)\"\n  echo \"  GET -\u003e $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/api/contacto)\"\n  echo \"  GET /en/servicios/ -\u003e $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/en/servicios/)\"\ndone\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_","head":null,"fecha":"2026-10-02T22:39:18-03:00","exit":0,"sha256":"94cf4eb706eae8ed394fa6e39853790ee67a65d8923ac2e206df46a4afd2bfb2","lineas":10,"omitidas":0,"no_recomprobable":"requiere dos servidores astro preview levantados por la fase"} -->
**Evidencia `verify-report.10`** · exit 0 · 10 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T22:39:18-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_`
No re-comprobable: requiere dos servidores astro preview levantados por la fase

```bash
# /api/contacto en main (puerto 4392) y en el cambio (puerto 4391), mismas peticiones
for port in 4392 4391; do
  echo "puerto $port:"
  echo "  POST sin cuerpo ni content-type -> $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:$port/api/contacto)"
  echo "  POST content-type JSON, cuerpo vacío -> $(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'content-type: application/json' http://127.0.0.1:$port/api/contacto)"
  echo "  GET -> $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/api/contacto)"
  echo "  GET /en/servicios/ -> $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/en/servicios/)"
done
```

```text
puerto 4392:
  POST sin cuerpo ni content-type -> 403
  POST content-type JSON, cuerpo vacío -> 400
  GET -> 405
  GET /en/servicios/ -> 200
puerto 4391:
  POST sin cuerpo ni content-type -> 403
  POST content-type JSON, cuerpo vacío -> 400
  GET -> 405
  GET /en/servicios/ -> 200
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"# Archivos prohibidos y sin cambio del PR #33, selector/Navbar de páginas existentes vs main, estilo de tarjeta estática\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_\necho \"-- archivos prohibidos o sin cambio modificados respecto de main (esperado: ninguno)\"\ngit -C $W diff --name-only main...HEAD -- log-atm-web-astro/src/components/ui/LanguageSelector.astro log-atm-web-astro/src/scripts/wizard.ts log-atm-web-astro/scripts/generate-favicons.mjs log-atm-web-astro/public/apple-touch-icon.png log-atm-web-astro/src/lib/constants.ts log-atm-web-astro/src/i18n/utils.ts log-atm-web-astro/src/i18n/config.ts log-atm-web-astro/src/components/ui/Footer.astro log-atm-web-astro/astro.config.mjs log-atm-web-astro/wrangler.toml | wc -l\necho \"-- archivos de código tocados (todos bajo el alcance declarado)\"\ngit -C $W diff --name-only main...HEAD -- log-atm-web-astro\necho \"-- cabecera/Navbar y selector del HTML estático: cambio vs main (esperado: idénticos)\"\nMAIN=$(cat $T/main-base-path.txt)/log-atm-web-astro/dist/client\nfor f in index.html en/servicios/index.html pt/contacto/index.html nosotros/index.html; do\n  a=$(python3 - \"$W/log-atm-web-astro/dist/client/$f\" <<'PY'\nimport re,sys,hashlib\nh=open(sys.argv[1],encoding='utf-8').read()\nm=re.search(r'<header.*?</header\u003e',h,re.S)\nprint(hashlib.sha256(re.sub(r'/_astro/[^\"\\' )]*','X',m.group(0)).encode()).hexdigest()[:16] if m else 'sin-header')\nPY\n)\n  b=$(python3 - \"$MAIN/$f\" <<'PY'\nimport re,sys,hashlib\nh=open(sys.argv[1],encoding='utf-8').read()\nm=re.search(r'<header.*?</header\u003e',h,re.S)\nprint(hashlib.sha256(re.sub(r'/_astro/[^\"\\' )]*','X',m.group(0)).encode()).hexdigest()[:16] if m else 'sin-header')\nPY\n)\n  echo \"$f cambio=$a main=$b $([ \"$a\" = \"$b\" ] && echo IDENTICO || echo DIFIERE)\"\ndone\necho \"-- estilo svc-card--static\"\ngrep -n -B1 -A3 'svc-card--static' $W/log-atm-web-astro/src/styles/sections/services.css\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:39:33-03:00","exit":0,"sha256":"934468b5e400171d3b1dba00d5621f8588ed7438f89796043daa775c30eb9540","lineas":27,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.11`** · exit 0 · 27 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:39:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`

```bash
# Archivos prohibidos y sin cambio del PR #33, selector/Navbar de páginas existentes vs main, estilo de tarjeta estática
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_
echo "-- archivos prohibidos o sin cambio modificados respecto de main (esperado: ninguno)"
git -C $W diff --name-only main...HEAD -- log-atm-web-astro/src/components/ui/LanguageSelector.astro log-atm-web-astro/src/scripts/wizard.ts log-atm-web-astro/scripts/generate-favicons.mjs log-atm-web-astro/public/apple-touch-icon.png log-atm-web-astro/src/lib/constants.ts log-atm-web-astro/src/i18n/utils.ts log-atm-web-astro/src/i18n/config.ts log-atm-web-astro/src/components/ui/Footer.astro log-atm-web-astro/astro.config.mjs log-atm-web-astro/wrangler.toml | wc -l
echo "-- archivos de código tocados (todos bajo el alcance declarado)"
git -C $W diff --name-only main...HEAD -- log-atm-web-astro
echo "-- cabecera/Navbar y selector del HTML estático: cambio vs main (esperado: idénticos)"
MAIN=$(cat $T/main-base-path.txt)/log-atm-web-astro/dist/client
for f in index.html en/servicios/index.html pt/contacto/index.html nosotros/index.html; do
  a=$(python3 - "$W/log-atm-web-astro/dist/client/$f" <<'PY'
import re,sys,hashlib
h=open(sys.argv[1],encoding='utf-8').read()
m=re.search(r'<header.*?</header>',h,re.S)
print(hashlib.sha256(re.sub(r'/_astro/[^"\' )]*','X',m.group(0)).encode()).hexdigest()[:16] if m else 'sin-header')
PY
)
  b=$(python3 - "$MAIN/$f" <<'PY'
import re,sys,hashlib
h=open(sys.argv[1],encoding='utf-8').read()
m=re.search(r'<header.*?</header>',h,re.S)
print(hashlib.sha256(re.sub(r'/_astro/[^"\' )]*','X',m.group(0)).encode()).hexdigest()[:16] if m else 'sin-header')
PY
)
  echo "$f cambio=$a main=$b $([ "$a" = "$b" ] && echo IDENTICO || echo DIFIERE)"
done
echo "-- estilo svc-card--static"
grep -n -B1 -A3 'svc-card--static' $W/log-atm-web-astro/src/styles/sections/services.css
```

```text
-- archivos prohibidos o sin cambio modificados respecto de main (esperado: ninguno)
0
-- archivos de código tocados (todos bajo el alcance declarado)
log-atm-web-astro/package.json
log-atm-web-astro/scripts/check-i18n-links.ts
log-atm-web-astro/src/components/sections/ServicesSection.astro
log-atm-web-astro/src/components/ui/Navbar.astro
log-atm-web-astro/src/layouts/BaseLayout.astro
log-atm-web-astro/src/pages/404.astro
log-atm-web-astro/src/pages/[lang]/404.astro
log-atm-web-astro/src/pages/contacto.astro
log-atm-web-astro/src/pages/cotizar.astro
log-atm-web-astro/src/pages/industrias.astro
log-atm-web-astro/src/pages/nosotros.astro
log-atm-web-astro/src/pages/servicios.astro
-- cabecera/Navbar y selector del HTML estático: cambio vs main (esperado: idénticos)
index.html cambio=8be1bd50aa4c30ce main=8be1bd50aa4c30ce IDENTICO
en/servicios/index.html cambio=sin-header main=sin-header IDENTICO
pt/contacto/index.html cambio=sin-header main=sin-header IDENTICO
nosotros/index.html cambio=sin-header main=sin-header IDENTICO
-- estilo svc-card--static
34-/* Cards sin página de detalle (Aérea/Marítima): sin cursor de enlace ni hover lift */
35:.svc-card--static { cursor: default; }
36:.svc-card--static:hover { transform: none; box-shadow: none; }
37-
38-/* Bento (desktop 12-col): feature toma 2 filas verticales para crear el patrón target */
39-.svc-card--feature { grid-column: span 6; grid-row: span 2; }
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_/nav.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:39:45-03:00","exit":0,"sha256":"103634b63b961276ce71503cd5ea6be90dd88bd5855e380800f3b6b1c6e724e6","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.12`** · exit 0 · 11 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:39:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-verify-gdixy5n_/nav.py
```

```text
index.html: region_nav_len=6910 IDENTICA aria-current-en-selector=2
en/index.html: region_nav_len=6916 IDENTICA aria-current-en-selector=2
pt/index.html: region_nav_len=6937 IDENTICA aria-current-en-selector=2
servicios/index.html: region_nav_len=7000 IDENTICA aria-current-en-selector=3
en/servicios/index.html: region_nav_len=7006 IDENTICA aria-current-en-selector=3
pt/servicios/index.html: region_nav_len=7027 IDENTICA aria-current-en-selector=3
contacto/index.html: region_nav_len=6994 IDENTICA aria-current-en-selector=3
pt/contacto/index.html: region_nav_len=7021 IDENTICA aria-current-en-selector=3
en/nosotros/index.html: region_nav_len=7000 IDENTICA aria-current-en-selector=3
cotizar/index.html: region_nav_len=6958 IDENTICA aria-current-en-selector=2
resultado: OK
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:39:54-03:00","exit":1,"sha256":"110e83a121ce0092b1ebed00d44d74e5bac6186155337c55c4b420339d1e49db","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volvería a comprobar ese informe"} -->
**Evidencia `verify-report.13`** · exit 1 · 1 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:39:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`
No re-comprobable: comprobar sobre verify-report.md volvería a comprobar ese informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/apply-evidence.md","bloques":12,"comprobados":5,"calzan":["apply-evidence.3","apply-evidence.4","apply-evidence.5"],"no_calzan":[{"id":"apply-evidence.11","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.12","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.1","motivo":"estado previo al primer build: dist/client existe en el \u00e1rbol final tras la verificaci\u00f3n"},{"id":"apply-evidence.2","motivo":"l\u00ednea base sobre una copia aislada de main en el directorio de temporales del despacho"},{"id":"apply-evidence.6","motivo":"compara contra el build de main en una copia aislada del directorio de temporales del despacho"},{"id":"apply-evidence.7","motivo":"requiere el servidor astro preview que la fase levanta y detiene"},{"id":"apply-evidence.8","motivo":"requiere el servidor astro preview que la fase levanta y detiene"},{"id":"apply-evidence.9","motivo":"requiere los servidores astro preview de main y del cambio que la fase levanta y detiene"},{"id":"apply-evidence.10","motivo":"requiere el servidor astro preview y el script de navegador del directorio de temporales del despacho; los valores intermedios dependen del tiempo"}],"error":null}
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"bd533a40d59b59ea0b83c241415eae8ebe314f0e","fecha":"2026-10-02T22:40:12-03:00","exit":0,"sha256":"4e1310ac56ac8e2b278207e4a3caaddb290b0bb102595a4d0bbe0202c4828eac","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría el informe a sí mismo"} -->
**Evidencia `verify-report.14`** · exit 0 · 1 líneas, 0 omitidas · HEAD `bd533a40d59b` · 2026-10-02T22:40:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`
No re-comprobable: re-ejecutarlo comprobaría el informe a sí mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/memory/changes/fix-i18n-links-and-404/verify-report.md","bloques":13,"comprobados":7,"calzan":["verify-report.2","verify-report.3","verify-report.4","verify-report.5","verify-report.6","verify-report.11","verify-report.12"],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.7","motivo":"depende de un servidor astro preview levantado por la fase durante la verificaci\u00f3n"},{"id":"verify-report.8","motivo":"requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo"},{"id":"verify-report.9","motivo":"requiere el servidor astro preview y un navegador; los valores intermedios dependen del tiempo; vigente respecto de verify-report.8 (muestreo corregido)"},{"id":"verify-report.10","motivo":"requiere dos servidores astro preview levantados por la fase"},{"id":"verify-report.13","motivo":"comprobar sobre verify-report.md volver\u00eda a comprobar ese informe"}],"error":null}
```
<!-- evidencia:fin verify-report.14 -->
