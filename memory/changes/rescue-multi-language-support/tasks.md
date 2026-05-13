---
type: tasks
change_name: "rescue-multi-language-support"
created: "2026-05-12"
---

# Tasks: rescue-multi-language-support

## Orden de ejecución

Ruta crítica: T1 (core + 6 JSONs en paridad + validator + hook) → T2 (LanguageSelector + Navbar) → T3 (BaseLayout: lang/dir/hreflang/og) → T4 (páginas raíz usan `t()` y `Astro.currentLocale`) → T5 (`src/pages/[lang]/*`) → T6 (RTL drawer) → T7 (sitemap + astro.config i18n) → T8 (smoke build + a11y).

T1 es bloqueante: hasta que los 6 JSONs tengan paridad estructural y el validator esté activo, ningún commit debe llegar a CI. T4 y T5 pueden iterarse página por página sin romper el build mientras `es.json` mantenga las claves usadas.

Referencias de copia/inspiración (worktree `preview-i18n`):
- `log-atm-web-astro/src/i18n/{config.ts,types.ts,utils.ts}`
- `log-atm-web-astro/src/i18n/translations/*.json` (solo como mapa de keys; valores se regeneran)
- `log-atm-web-astro/src/components/ui/LanguageSelector.astro`
- `log-atm-web-astro/scripts/validate-i18n.ts`
- `log-atm-web-astro/astro.config.mjs` (bloque i18n + hook)

---

## Spec: [[i18n-core-translation-helpers]]

### Tarea 1: Portar el núcleo i18n y los 6 diccionarios con paridad inicial

- **Archivos**:
  - `log-atm-web-astro/src/i18n/config.ts` (nuevo)
  - `log-atm-web-astro/src/i18n/types.ts` (nuevo)
  - `log-atm-web-astro/src/i18n/utils.ts` (nuevo)
  - `log-atm-web-astro/src/i18n/translations/es.json` (nuevo — generado desde main)
  - `log-atm-web-astro/src/i18n/translations/en.json` (nuevo)
  - `log-atm-web-astro/src/i18n/translations/zh.json` (nuevo)
  - `log-atm-web-astro/src/i18n/translations/hi.json` (nuevo)
  - `log-atm-web-astro/src/i18n/translations/ar.json` (nuevo)
  - `log-atm-web-astro/src/i18n/translations/pt.json` (nuevo)
- **Qué hacer**:
  - Copiar `config.ts` y `types.ts` literal del worktree referencia.
  - Copiar `utils.ts` literal del worktree referencia (`useTranslations`, `getLangFromUrl`, `stripLocaleFromPath`, `buildLocaleUrl`, `getAlternateLinks`, `isRTL`, `getHtmlLang`, `getOgLocale`).
  - Construir `es.json` extrayendo strings reales de los `.astro` actuales de main (Navbar, Footer, secciones home, páginas) bajo los namespaces definidos en `design.md` D7: `meta.*`, `nav.*`, `footer.*`, `home.*`, `servicios.*` (con `servicios.carga.aerea.*` y `servicios.carga.maritima.*`), `industrias.*`, `nosotros.*`, `contacto.*`, `cotizar.*`, `common.*`, `a11y.*`.
  - Generar los otros 5 JSONs clonando la estructura de `es.json` con valores provisionales marcados (p. ej. `"[en] {valor en español}"`). Mantener paridad estructural exacta.
- **Criterio de completado**: los 6 JSONs existen, tienen el mismo conjunto exacto de keys, `astro check` no reporta errores de tipo en `i18n/`.
- **Modo**: estándar

- [ ] Copiar `config.ts`, `types.ts`, `utils.ts` desde el worktree referencia
- [ ] Crear `translations/es.json` con todos los strings actuales del UI agrupados por namespace
- [ ] Generar `translations/{en,zh,hi,ar,pt}.json` con paridad estructural y valores provisionales
- [ ] Verificar con `astro check` que `useTranslations` y `Locale` compilan

### Tarea 2: Activar el validador de paridad como hook de build

- **Archivos**:
  - `log-atm-web-astro/scripts/validate-i18n.ts` (nuevo — copiar del worktree referencia)
  - `log-atm-web-astro/astro.config.mjs` (modificar)
  - `log-atm-web-astro/package.json` (modificar)
- **Qué hacer**:
  - Copiar `scripts/validate-i18n.ts` del worktree referencia.
  - Añadir script `"validate-i18n": "tsx scripts/validate-i18n.ts"` y devDependency `tsx` si falta.
  - Registrar hook `astro:build:start` en `astro.config.mjs` que invoca el validador.
- **Criterio de completado**: `npm run validate-i18n` corre stand-alone y reporta OK; `npm run build` falla si se introduce una key de prueba en `en.json` y no en los demás (revertir tras probar).
- **Requiere**: Tarea 1.

- [ ] Copiar el script del worktree referencia
- [ ] Añadir entrada `validate-i18n` en `package.json` (+ `tsx` si falta)
- [ ] Registrar el hook en `astro.config.mjs`
- [ ] Probar `npm run validate-i18n` y verificar fallo inducido

---

## Spec: [[i18n-ui-selector-navbar]]

### Tarea 3: Portar `LanguageSelector` e integrarlo en el Navbar actual

- **Archivos**:
  - `log-atm-web-astro/src/components/ui/LanguageSelector.astro` (nuevo — copiar del worktree referencia, ajustar tokens/classes si difieren)
  - `log-atm-web-astro/src/components/ui/Navbar.astro` (modificar — NO reescribir)
- **Qué hacer**:
  - Copiar `LanguageSelector.astro` del worktree referencia y compararlo con los design tokens y clases utilitarias actuales de main; ajustar solo lo necesario para que herede el look de la Navbar actual.
  - En `Navbar.astro`: importar `useTranslations`, `getLangFromUrl`, `stripLocaleFromPath`, `isRTL`, `LanguageSelector`.
  - Resolver `currentLang = getLangFromUrl(Astro.url)` y `currentPath = stripLocaleFromPath(Astro.url.pathname)`.
  - Reemplazar cada string literal del Navbar (NAV_LINKS, tagline, aria-labels, CTA) por `t('nav.*')` / `t('a11y.*')`.
  - Montar `<LanguageSelector variant="desktop" currentLang currentPath />` junto al CTA desktop.
  - Montar `<LanguageSelector variant="mobile" currentLang currentPath />` dentro del drawer móvil existente.
  - Añadir clase condicional `class:list={['drawer', { 'is-rtl': isRTL(currentLang) }]}` en el drawer.
- **Criterio de completado**: Navbar renderiza idéntico en español (visual, a11y) y muestra el selector; Lighthouse a11y ≥ 95 en home.
- **Requiere**: Tarea 1.
- **Modo**: estándar

- [ ] Copiar `LanguageSelector.astro` y reconciliar clases con el design system actual
- [ ] Modificar `Navbar.astro`: imports + resolución de `currentLang`/`currentPath`
- [ ] Sustituir strings de Navbar por `t()` (incluye aria-labels)
- [ ] Montar selector en desktop y dentro del drawer mobile
- [ ] Añadir clase `is-rtl` condicional al drawer
- [ ] Verificar visualmente la home y validar Lighthouse a11y ≥ 95

---

## Spec: [[i18n-seo-hreflang]]

### Tarea 4: Inyectar `lang`, `dir`, `hreflang` y `og:locale` en `BaseLayout`

- **Archivos**:
  - `log-atm-web-astro/src/layouts/BaseLayout.astro` (modificar; ajustar nombre si difiere)
- **Qué hacer**:
  - Resolver `currentLang` desde `Astro.currentLocale ?? 'es'`.
  - Setear `<html lang={getHtmlLang(currentLang)} dir={isRTL(currentLang) ? 'rtl' : 'ltr'}>`.
  - Generar `<link rel="alternate" hreflang>` para los 6 idiomas + `x-default` usando `getAlternateLinks(stripLocaleFromPath(Astro.url.pathname))`.
  - Añadir `<meta property="og:locale" content={getOgLocale(currentLang)} />` y `<meta property="og:locale:alternate">` para los otros 5.
- **Criterio de completado**: el HTML generado de cualquier página contiene los 5 alternate + 1 x-default y `og:locale` correcto.
- **Requiere**: Tarea 1.

- [ ] Resolver `currentLang` en el frontmatter del layout
- [ ] Setear `<html lang dir>`
- [ ] Generar bloque de `<link rel="alternate" hreflang>` + `x-default`
- [ ] Generar `og:locale` + `og:locale:alternate`
- [ ] Inspeccionar HTML de `astro build` para confirmar el `<head>`

---

## Spec: [[i18n-routing-locale-prefixes]]

### Tarea 5: Convertir páginas raíz al patrón i18n y crear `src/pages/[lang]/`

- **Archivos**:
  - Páginas raíz (modificar): `src/pages/{index,servicios,industrias,nosotros,contacto,cotizar,404}.astro`, `src/pages/servicios/{carga-aerea,carga-maritima}.astro`
  - Páginas `[lang]` (nuevas): `src/pages/[lang]/{index,servicios,industrias,nosotros,contacto,cotizar,404}.astro`, `src/pages/[lang]/servicios/{carga-aerea,carga-maritima}.astro`
- **Qué hacer**:
  - En cada página raíz:
    - `const lang = (Astro.currentLocale ?? 'es') as Locale;`
    - `const t = useTranslations(lang);`
    - Reemplazar cada string literal por `t('namespace.key')`.
    - Validar que las strings nuevas que requiera la página (p. ej. labels del form en `cotizar`, `contacto`) están en `es.json` y los otros 5 JSONs (añadir si faltan, manteniendo paridad).
  - En cada `[lang]/*.astro`: exportar `getStaticPaths()` con `NON_DEFAULT_LOCALES.map(lang => ({ params: { lang } }))` y delegar al markup raíz. Si la delegación por `import` falla, extraer el cuerpo a `src/components/pages/{Name}Page.astro` y renderizar `<NamePage />` desde ambas rutas.
  - Iterar página por página: completar una, ejecutar `npm run validate-i18n`, seguir.
- **Criterio de completado**: `astro build` genera ≥ 54 HTML; cada página raíz y cada `[lang]/` muestra contenido coherente; `npm run validate-i18n` pasa.
- **Requiere**: Tareas 1, 3, 4.

- [ ] Migrar `src/pages/index.astro` a usar `t()`
- [ ] Migrar `src/pages/servicios.astro` y subrutas `servicios/carga-{aerea,maritima}.astro`
- [ ] Migrar `src/pages/industrias.astro`, `nosotros.astro`, `contacto.astro`, `cotizar.astro`, `404.astro`
- [ ] Reemplazar strings en `src/components/Footer.astro` y en `src/components/home/*.astro` (Hero, Services, Industries, Why, CTA, Stats)
- [ ] Crear cada `src/pages/[lang]/*.astro` con `getStaticPaths()` + delegación
- [ ] Confirmar conteo de HTML generado en `dist/` (≥ 54)

---

## Spec: [[i18n-rtl-support-arabic]]

### Tarea 6: Hacer el drawer móvil RTL-aware con propiedades lógicas

- **Archivos**:
  - `log-atm-web-astro/src/components/ui/Navbar.astro` (modificar — estilos del drawer)
  - `log-atm-web-astro/src/styles/` si existen estilos globales del drawer (modificar)
- **Qué hacer**:
  - Sustituir `right`/`left`/`translateX` físicos por propiedades lógicas (`inset-inline-end`, `inset-inline-start`, variables `--drawer-offset` con override en `[dir="rtl"]`).
  - Conservar el `inert`, focus-trap, animación con `prefers-reduced-motion` ya existentes.
  - Asegurar que la clase `is-rtl` aplicada en Tarea 3 no es necesaria si el selector `[dir="rtl"]` ya cubre el caso (preferir CSS estándar sobre clases custom).
- **Criterio de completado**: en `astro preview`, abrir `/ar/` en móvil; el drawer entra desde la izquierda, mantiene focus-trap e inert; las otras rutas no cambian comportamiento.
- **Requiere**: Tarea 3 + Tarea 4.

- [ ] Reemplazar reglas físicas por propiedades lógicas
- [ ] Validar drawer en `/ar/` y `/en/` (mobile)
- [ ] Validar focus-trap e `inert` siguen activos
- [ ] Validar `prefers-reduced-motion`

---

## Spec: [[i18n-routing-locale-prefixes]] + [[i18n-seo-hreflang]]

### Tarea 7: Configurar Astro i18n y sitemap multilingüe

- **Archivos**:
  - `log-atm-web-astro/astro.config.mjs` (modificar)
- **Qué hacer**:
  - Añadir bloque `i18n: { defaultLocale: 'es', locales: ['es','en','zh','hi','ar','pt'], routing: { prefixDefaultLocale: false } }`.
  - Configurar `@astrojs/sitemap` con `i18n: { defaultLocale: 'es', locales: HTML_LANG }` (mapa BCP-47 desde `src/i18n/config.ts`).
  - Mantener el hook `astro:build:start` agregado en Tarea 2.
- **Criterio de completado**: `dist/sitemap-index.xml` (o `sitemap-*.xml`) incluye URLs de los 6 idiomas; `astro build` no emite warnings sobre i18n config.
- **Requiere**: Tarea 5.

- [ ] Añadir bloque `i18n` en `astro.config.mjs`
- [ ] Configurar sitemap multilingüe
- [ ] Inspeccionar el sitemap generado

---

## Spec: todas

### Tarea 8: Smoke build + verificación manual de accesibilidad

- **Archivos**: ninguno (solo verificación).
- **Qué hacer**:
  - `npm run build` debe completar sin errores y generar ≥ 54 HTML.
  - Levantar `npm run preview` y validar manualmente:
    - Cambio de idioma desde selector preserva la ruta.
    - `/ar/` aplica `dir="rtl"` y drawer entra desde la izquierda.
    - `<head>` de cualquier página contiene 5 hreflang + x-default + og:locale.
  - Pasar Lighthouse a11y en `/`, `/en/`, `/ar/`, `/cotizar`, `/en/cotizar` (objetivo ≥ 95).
- **Criterio de completado**: todas las verificaciones manuales OK; reporte adjuntado al verify.
- **Requiere**: Tareas 1–7.

- [ ] `npm run build` sin errores
- [ ] Conteo de HTML en `dist/` ≥ 54
- [ ] Verificación manual de cambio de idioma en cada página
- [ ] Verificación de RTL en `/ar/`
- [ ] Verificación del `<head>` (hreflang + og:locale)
- [ ] Lighthouse a11y ≥ 95 en las rutas de muestra

---

## Notas para `sdd-apply`

- El microcopy de `es.json` debe extraerse del código main actual, NO del `es.json` del worktree referencia. El `es.json` antiguo sirve únicamente como mapa de keys/namespaces que ya estaban definidos.
- Si la delegación de páginas `[lang]` → raíz (`import IndexPage from '~/pages/index.astro'`) no compila en Astro 6, mover el cuerpo a `src/components/pages/*.astro` antes de continuar.
- Conservar a toda costa las mejoras de a11y de PR #11 (heading order, landmark nesting) y los refinamientos UX de PR #12 — todo override en español debe coincidir con el texto actual visible en main.
