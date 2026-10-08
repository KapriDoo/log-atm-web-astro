---
type: baseline
change_name: "debt-i18n-three-locales"
created: "2026-10-08"
updated: "2026-10-08"
---

# Línea base: debt-i18n-three-locales

Medición de `dist/client` construido con el código de `main@1c70406`, antes de cualquier edición de código del cambio. El worktree está en `f882dc2`, que solo agrega los artefactos SDD del cambio sobre `1c70406`: el bloque `baseline.1` muestra que el árbol `log-atm-web-astro/` de ambos commits es el mismo. El build (`npm run build`) termina con exit 0, la validación i18n reporta `en` y `pt` en OK y la guarda de prerender (ADR-0012) reporta 18 páginas prerenderizadas con HTML válido.

La copia de `dist/client` vive bajo el directorio de temporales del despacho de `sdd-apply`, que no persiste: los bloques que la leen llevan la marca de no re-comprobables.

## Árbol de código medido

<!-- evidencia:inicio {"v":1,"id":"baseline.1","forma":"argv","argv":["git","rev-parse","1c70406:log-atm-web-astro","f882dc2:log-atm-web-astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales","head":"f882dc2b544af7de3a9091de51842c74e45ffa52","fecha":"2026-10-08T20:14:26-03:00","exit":0,"sha256":"f04e21a063a7342eeeafcd3a53d78a1531baaabdb60309b7f580e44ab95132fb","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `baseline.1`** · exit 0 · 2 líneas, 0 omitidas · HEAD `f882dc2b544a` · 2026-10-08T20:14:26-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales`

```text
git rev-parse 1c70406:log-atm-web-astro f882dc2:log-atm-web-astro
```

```text
9b1d1d62edcc0533278145186ae8db3399f04e3f
9b1d1d62edcc0533278145186ae8db3399f04e3f
```
<!-- evidencia:fin baseline.1 -->

## Build de la línea base

Extracto del log de `npm run build` sobre el código sin modificar (el build escribe `dist/`, así que se registra su log y no el comando).

<!-- evidencia:inicio {"v":1,"id":"baseline.2","forma":"argv","argv":["/usr/bin/grep","-E","i18n\\]|prerender\\]|Complete!","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/build-baseline.log"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:14:30-03:00","exit":0,"sha256":"d3e8c1774fef18c082491889cef72c92e2ca9d08d6bbc03b26f8f8e3a5d51db8","lineas":5,"omitidas":0,"no_recomprobable":"lee el log del build de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.2`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:14:30-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: lee el log del build de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
/usr/bin/grep -E 'i18n\]|prerender\]|Complete!' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/build-baseline.log
```

```text
20:12:01 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
20:13:39 [log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
20:13:39 [build] Complete!
```
<!-- evidencia:fin baseline.2 -->

## HTML de `dist/client`

Una línea por HTML, la cuenta total, la cuenta por idioma (6 rutas prerenderizadas por idioma) y la presencia de una 404 (la 404 se genera bajo demanda y no figura en `dist/client`).

<!-- evidencia:inicio {"v":1,"id":"baseline.3","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py","html","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:14:38-03:00","exit":0,"sha256":"565ba1df101c6daf4b2c1ac24dcb48b9e786e11f5dad35cfc98b8213c4ea193a","lineas":23,"omitidas":0,"no_recomprobable":"mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.3`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:14:38-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py html /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client
```

```text
contacto/index.html
cotizar/index.html
en/contacto/index.html
en/cotizar/index.html
en/index.html
en/industrias/index.html
en/nosotros/index.html
en/servicios/index.html
index.html
industrias/index.html
nosotros/index.html
pt/contacto/index.html
pt/cotizar/index.html
pt/index.html
pt/industrias/index.html
pt/nosotros/index.html
pt/servicios/index.html
servicios/index.html
total: 18
es: 6
en: 6
pt: 6
404 presente: False
```
<!-- evidencia:fin baseline.3 -->

## Sitemap

Archivos `sitemap-*.xml`, una línea por URL de `sitemap-0.xml` con sus enlaces alternativos, la cuenta de URLs y la presencia de una 404.

<!-- evidencia:inicio {"v":1,"id":"baseline.4","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py","sitemap","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:14:38-03:00","exit":0,"sha256":"9560f2906ce2ff1d932e7b053221a19ba2bd5beafe87202927431863b94ea5c9","lineas":22,"omitidas":0,"no_recomprobable":"mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.4`** · exit 0 · 22 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:14:38-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py sitemap /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client
```

```text
archivo: sitemap-0.xml
archivo: sitemap-index.xml
https://www.logatm.com/ | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/
https://www.logatm.com/contacto/ | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/
https://www.logatm.com/cotizar/ | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/
https://www.logatm.com/en/ | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/
https://www.logatm.com/en/contacto/ | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/
https://www.logatm.com/en/cotizar/ | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/
https://www.logatm.com/en/industrias/ | en-US=https://www.logatm.com/en/industrias/ es-CL=https://www.logatm.com/industrias/ pt-BR=https://www.logatm.com/pt/industrias/
https://www.logatm.com/en/nosotros/ | en-US=https://www.logatm.com/en/nosotros/ es-CL=https://www.logatm.com/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/
https://www.logatm.com/en/servicios/ | en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ es-CL=https://www.logatm.com/servicios/
https://www.logatm.com/industrias/ | en-US=https://www.logatm.com/en/industrias/ es-CL=https://www.logatm.com/industrias/ pt-BR=https://www.logatm.com/pt/industrias/
https://www.logatm.com/nosotros/ | en-US=https://www.logatm.com/en/nosotros/ es-CL=https://www.logatm.com/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/
https://www.logatm.com/pt/ | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/
https://www.logatm.com/pt/contacto/ | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/
https://www.logatm.com/pt/cotizar/ | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/
https://www.logatm.com/pt/industrias/ | en-US=https://www.logatm.com/en/industrias/ es-CL=https://www.logatm.com/industrias/ pt-BR=https://www.logatm.com/pt/industrias/
https://www.logatm.com/pt/nosotros/ | en-US=https://www.logatm.com/en/nosotros/ es-CL=https://www.logatm.com/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/
https://www.logatm.com/pt/servicios/ | en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ es-CL=https://www.logatm.com/servicios/
https://www.logatm.com/servicios/ | en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ es-CL=https://www.logatm.com/servicios/
urls: 18
404 en sitemap: False
```
<!-- evidencia:fin baseline.4 -->

## `hreflang`, `<html>` y `og:locale` por página

Una línea por HTML: el elemento `<html>` (con `lang` y `dir`), los `<link rel="alternate" hreflang>` y los `og:locale` (el primero es `og:locale`, los siguientes `og:locale:alternate`).

<!-- evidencia:inicio {"v":1,"id":"baseline.5","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py","seo","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:14:38-03:00","exit":0,"sha256":"50b5542dd6af8405080fbada33889de12a0c7a6f9b77e5abacf4650ac40fcbb9","lineas":18,"omitidas":0,"no_recomprobable":"mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.5`** · exit 0 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:14:38-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py seo /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client
```

```text
contacto/index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/ x-default=https://www.logatm.com/contacto/ | og: es_CL,en_US,pt_BR
cotizar/index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/ x-default=https://www.logatm.com/cotizar/ | og: es_CL,en_US,pt_BR
en/contacto/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/ x-default=https://www.logatm.com/contacto/ | og: en_US,es_CL,pt_BR
en/cotizar/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/ x-default=https://www.logatm.com/cotizar/ | og: en_US,es_CL,pt_BR
en/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/ x-default=https://www.logatm.com/ | og: en_US,es_CL,pt_BR
en/industrias/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/industrias/ en-US=https://www.logatm.com/en/industrias/ pt-BR=https://www.logatm.com/pt/industrias/ x-default=https://www.logatm.com/industrias/ | og: en_US,es_CL,pt_BR
en/nosotros/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/nosotros/ en-US=https://www.logatm.com/en/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/ x-default=https://www.logatm.com/nosotros/ | og: en_US,es_CL,pt_BR
en/servicios/index.html | <html lang="en-US" dir="ltr"> | es-CL=https://www.logatm.com/servicios/ en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ x-default=https://www.logatm.com/servicios/ | og: en_US,es_CL,pt_BR
index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/ x-default=https://www.logatm.com/ | og: es_CL,en_US,pt_BR
industrias/index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/industrias/ en-US=https://www.logatm.com/en/industrias/ pt-BR=https://www.logatm.com/pt/industrias/ x-default=https://www.logatm.com/industrias/ | og: es_CL,en_US,pt_BR
nosotros/index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/nosotros/ en-US=https://www.logatm.com/en/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/ x-default=https://www.logatm.com/nosotros/ | og: es_CL,en_US,pt_BR
pt/contacto/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/contacto/ en-US=https://www.logatm.com/en/contacto/ pt-BR=https://www.logatm.com/pt/contacto/ x-default=https://www.logatm.com/contacto/ | og: pt_BR,es_CL,en_US
pt/cotizar/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/cotizar/ en-US=https://www.logatm.com/en/cotizar/ pt-BR=https://www.logatm.com/pt/cotizar/ x-default=https://www.logatm.com/cotizar/ | og: pt_BR,es_CL,en_US
pt/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/ en-US=https://www.logatm.com/en/ pt-BR=https://www.logatm.com/pt/ x-default=https://www.logatm.com/ | og: pt_BR,es_CL,en_US
pt/industrias/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/industrias/ en-US=https://www.logatm.com/en/industrias/ pt-BR=https://www.logatm.com/pt/industrias/ x-default=https://www.logatm.com/industrias/ | og: pt_BR,es_CL,en_US
pt/nosotros/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/nosotros/ en-US=https://www.logatm.com/en/nosotros/ pt-BR=https://www.logatm.com/pt/nosotros/ x-default=https://www.logatm.com/nosotros/ | og: pt_BR,es_CL,en_US
pt/servicios/index.html | <html lang="pt-BR" dir="ltr"> | es-CL=https://www.logatm.com/servicios/ en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ x-default=https://www.logatm.com/servicios/ | og: pt_BR,es_CL,en_US
servicios/index.html | <html lang="es-CL" dir="ltr"> | es-CL=https://www.logatm.com/servicios/ en-US=https://www.logatm.com/en/servicios/ pt-BR=https://www.logatm.com/pt/servicios/ x-default=https://www.logatm.com/servicios/ | og: es_CL,en_US,pt_BR
```
<!-- evidencia:fin baseline.5 -->

## Primer ítem del `BreadcrumbList`

`name` del primer ítem del `BreadcrumbList` de cada página que lo emite.

<!-- evidencia:inicio {"v":1,"id":"baseline.6","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py","migas","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:14:39-03:00","exit":0,"sha256":"546671f3e00e56db102863abe17e0dd2ebdc8dd4c8e35b5f1138f08ac716d208","lineas":18,"omitidas":0,"no_recomprobable":"mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.6`** · exit 0 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:14:39-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: mide la copia de dist/client de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py migas /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client
```

```text
contacto/index.html | Inicio
cotizar/index.html | Inicio
en/contacto/index.html | Inicio
en/cotizar/index.html | Inicio
en/index.html | Inicio
en/industrias/index.html | Inicio
en/nosotros/index.html | Inicio
en/servicios/index.html | Inicio
index.html | (sin BreadcrumbList)
industrias/index.html | Inicio
nosotros/index.html | Inicio
pt/contacto/index.html | Inicio
pt/cotizar/index.html | Inicio
pt/index.html | Inicio
pt/industrias/index.html | Inicio
pt/nosotros/index.html | Inicio
pt/servicios/index.html | Inicio
servicios/index.html | Inicio
```
<!-- evidencia:fin baseline.6 -->

## Lectura de la línea base

- `baseline.3`: 18 HTML, 6 por idioma, sin 404 (la 404 se genera bajo demanda y queda fuera de la cuenta).
- `baseline.4`: `sitemap-index.xml` remite a `sitemap-0.xml`, con 18 URLs, cada una con sus tres alternativas `es-CL`, `en-US` y `pt-BR`, y sin la 404.
- `baseline.5`: las 18 páginas declaran `dir="ltr"`, `lang` con el tag BCP-47 de su idioma, tres `hreflang` de idioma más `x-default` hacia la versión en español, y `og:locale` del idioma activo seguido de los otros dos como `og:locale:alternate`.
- `baseline.6`: 17 páginas emiten `BreadcrumbList` (todas salvo la home en español, `index.html`); en las 17 el primer ítem se llama «Inicio», también en `en/` y `pt/`, incluidas sus homes (`en/index.html` y `pt/index.html`).

## Resultado del diff (Tarea 6)

Build con el código final (HEAD `9fbbd95`, que contiene las Tareas 2, 3, 10 y 12) y comparación de su `dist/client` contra la copia de la línea base.

<!-- evidencia:inicio {"v":1,"id":"baseline.7","forma":"argv","argv":["/usr/bin/grep","-E","i18n\\]|prerender\\]|Complete!","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/build-final.log"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:21:00-03:00","exit":0,"sha256":"b638d41750beaf6fcae892c3239b4a86cdcfc0f207146e52526bdaa6d2073233","lineas":5,"omitidas":0,"no_recomprobable":"lee el log del build final bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.7`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:21:00-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: lee el log del build final bajo el directorio de temporales del despacho, que no persiste

```text
/usr/bin/grep -E 'i18n\]|prerender\]|Complete!' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/build-final.log
```

```text
20:18:37 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
20:18:42 [log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
20:18:42 [build] Complete!
```
<!-- evidencia:fin baseline.7 -->

<!-- evidencia:inicio {"v":1,"id":"baseline.8","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/comparar.py","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:21:00-03:00","exit":0,"sha256":"32fd234a858f580ded187a2d27301a3d2a804582bf9642a5c8d2c53d075c31d2","lineas":11,"omitidas":0,"no_recomprobable":"compara contra la copia de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.8`** · exit 0 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:21:00-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: compara contra la copia de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/comparar.py /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client
```

```text
HTML: base 18, nuevo 18, misma lista: True
assets renombrados: 2 (_astro/404.vAxf7dwO.css -> 404.DfkEAfJC.css, _astro/Footer.DfMq3qCd.css -> Footer.CS1UNo26.css)
archivos sin pareja: ninguno
archivos comunes no HTML distintos: ninguno
CSS _astro/404.css: reglas RTL quitadas de la base 1; igual tras quitarlas: False; igual tras quitarlas y reemplazar `--drawer-offset: 100%;transform:translate(var(--drawer-offset))` por `transform:translate(100%)` (1 vez): True
CSS _astro/Footer.css: reglas RTL quitadas de la base 1; igual tras quitarlas: False; igual tras quitarlas y reemplazar `--drawer-offset: 100%;transform:translate(var(--drawer-offset))` por `transform:translate(100%)` (1 vez): True
migas: primer ítem «Home» en 6 páginas {'en': 6}
migas: primer ítem «Inicio» en 5 páginas {'es': 5}
migas: primer ítem «Início» en 6 páginas {'pt': 6}
scripts de cliente distintos antes de normalizar: 15 {'CTASection': 12, 'WhyVideoSection': 3}; respaldos quitados de la base: 114
HTML con residuo tras normalizar: 0
```
<!-- evidencia:fin baseline.8 -->

<!-- evidencia:inicio {"v":1,"id":"baseline.9","forma":"argv","argv":["bash","-c","for s in html sitemap seo; do if diff <(python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py $s /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client) <(python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py $s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client) \u003e/dev/null; then echo \"$s: idéntico a la línea base\"; else echo \"$s: DISTINTO\"; fi; done; python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py migas /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv","head":null,"fecha":"2026-10-08T20:21:01-03:00","exit":0,"sha256":"b9544374fe6bbb84136915366595bdcd495a48819f3f88c7eb97327fe79e1794","lineas":21,"omitidas":0,"no_recomprobable":"compara contra la copia de la línea base bajo el directorio de temporales del despacho, que no persiste"} -->
**Evidencia `baseline.9`** · exit 0 · 21 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T20:21:01-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv`
No re-comprobable: compara contra la copia de la línea base bajo el directorio de temporales del despacho, que no persiste

```text
bash -c 'for s in html sitemap seo; do if diff <(python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py $s /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/baseline.h7CwnTCE/dist-client) <(python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py $s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client) >/dev/null; then echo "$s: idéntico a la línea base"; else echo "$s: DISTINTO"; fi; done; python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-i18n-three-locales/sdd-apply-3cx_uwvv/scripts.u7QPcGqZ/medir.py migas /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/dist/client'
```

```text
html: idéntico a la línea base
sitemap: idéntico a la línea base
seo: idéntico a la línea base
contacto/index.html | Inicio
cotizar/index.html | Inicio
en/contacto/index.html | Home
en/cotizar/index.html | Home
en/index.html | Home
en/industrias/index.html | Home
en/nosotros/index.html | Home
en/servicios/index.html | Home
index.html | (sin BreadcrumbList)
industrias/index.html | Inicio
nosotros/index.html | Inicio
pt/contacto/index.html | Início
pt/cotizar/index.html | Início
pt/index.html | Início
pt/industrias/index.html | Início
pt/nosotros/index.html | Início
pt/servicios/index.html | Início
servicios/index.html | Inicio
```
<!-- evidencia:fin baseline.9 -->

### Lectura del diff

- `baseline.7`: `npm run build` sobre el código final valida `en` y `pt` en OK y la guarda de prerender reporta 18 páginas prerenderizadas con HTML válido; el build termina con `Complete!` (exit 0).
- `baseline.9`: la lista de HTML (18, sin 404), el sitemap (18 URLs con sus alternativas, sin 404) y la línea de `<html lang dir="ltr">`, `hreflang` y `og:locale` de cada página son idénticos a la línea base. El primer ítem del `BreadcrumbList` es «Inicio» en las 5 páginas en español que lo emiten, «Home» en las 6 de `en/` e «Início» en las 6 de `pt/`.
- `baseline.8` clasifica el diff completo de `dist/client`:
  - **Admitida (1), migas**: el `name` del primer ítem del `BreadcrumbList` en `en/` y `pt/`. Las homes `en/index.html` y `pt/index.html` también emiten `BreadcrumbList` (ya en la línea base, `baseline.6`), así que son 12 páginas con nombre localizado y no las 10 internas.
  - **Admitida (2), scripts de cliente**: 15 scripts inline distintos, 12 de `CTASection` y 3 de `WhyVideoSection`; quitando de la base los 114 respaldos `dataset.msg*/label* ?? "<texto>"` (9 por cada uno de los 12 scripts de `CTASection` y 2 por cada uno de los 3 de `WhyVideoSection`) y renombrando los identificadores libres que el minificador elige, cada HTML es idéntico al nuevo (0 residuos).
  - **Admitida por la decisión de pipeline de `clarifications.md`, reglas RTL del drawer**: los dos CSS que llevan los estilos del `Navbar` (`Footer.*.css`, que enlazan las páginas, y `404.*.css`, de la 404 bajo demanda) cambian de nombre con hash. Sin otros archivos distintos ni sin pareja.
  - **Hallazgo fuera de la lista cerrada, CSS del panel del drawer**: en esos dos CSS, quitar la regla `[dir=rtl] .nav-drawer__panel, .nav-drawer.is-rtl .nav-drawer__panel` no basta para igualar la base con el nuevo; además cambia la declaración del panel: `--drawer-offset: 100%;transform:translate(var(--drawer-offset))` pasa a `transform:translate(100%)`. Es el reemplazo de la variable que pide la Tarea 2 (la variable existía solo para invertir el slide en RTL); el valor computado de `transform` es el mismo (`translate(100%)`), pero la condición de `clarifications.md` («el CSS normalizado de la base, sin esas reglas, es idéntico al nuevo») no se cumple al pie de la letra. Queda registrado en `observations.md` con tag `[hallazgo]` y en los riesgos del envelope para la decisión de `sdd-verify`.

## Comandos de cierre (Tarea 7)

Registrados en `apply-evidence.md`, bloques `apply-evidence.26` a `apply-evidence.30`: `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links`, `npm run a11y` y `npm run measure:images` terminan con exit 0 sobre el árbol final y este build, cuya guarda de prerender queda en verde (`baseline.7`).
