# Tasks: multi-language-support

## Orden de ejecución

Las tareas siguen una **secuencia de fundamentos primero → casos de uso → validación**:

1. **Infraestructura i18n** (Tareas 1–4): Configurar Astro, definir tipos, helpers y JSONs de traducción. Estas tareas son prerrequisito de todas las demás.
2. **Validación** (Tarea 5): Script de validación de claves — se ejecuta pero no bloquea las tareas anteriores.
3. **Layouts y componentes base** (Tareas 6–7): Modificar `BaseLayout` y `Navbar` para recibir `lang` y aplicar `dir`, hreflang. Tarea 6 es prerrequisito de Tarea 7 (Navbar necesita props que BaseLayout define).
4. **RTL** (Tarea 8): Refactor CSS del drawer — depende de que Navbar esté preparada.
5. **Selector de idioma** (Tarea 9): Componente `LanguageSelector` — puede ejecutarse en paralelo a Tarea 8, pero ambas dependen de Tareas 6–7.
6. **Tipografía** (Tarea 10): CSS de font stacks — independiente, puede ejecutarse después de Tarea 1.
7. **Migraciones de contenido** (Tareas 11–13): Reemplazar strings hardcodeados en constantes y componentes con calls a `t()` — dependen de Tareas 1–4.
8. **Páginas en [lang]** (Tarea 14): Duplicar páginas españolas a `src/pages/[lang]/` con `getStaticPaths` — depende de Tareas 1–4.
9. **Sitemap y PWA** (Tareas 15–16): Configurar sitemap i18n y actualizar manifest — dependen de que el routing esté funcional.

---

## Spec: i18n-routing-locale-prefixes

### Tarea 1: Configurar Astro i18n en `astro.config.mjs`

- **Archivos**: `astro.config.mjs`
- **Qué hacer**: Añadir bloque `i18n` en la config de Astro con `defaultLocale: 'es'`, `locales: { es: 'es', en: 'en', zh: 'zh', hi: 'hi', ar: 'ar', pt: 'pt' }`, `routing: { prefixDefaultLocale: false }`, y `fallback: { en: 'es', ... }` para todos los locales. Actualizar integración `@astrojs/sitemap` con config i18n.
- **Criterio de completado**: Astro soporta `Astro.currentLocale` en páginas dinámicas; no hay errores de config al ejecutar `astro build`.
- **Modo**: [TDD] — escribir test que verifique que `astro build` completa sin errores.

- [ ] Leer configuración actual de `astro.config.mjs`
- [ ] Añadir `i18n: { defaultLocale: 'es', locales: [...], routing: { prefixDefaultLocale: false }, fallback: {...} }`
- [ ] Actualizar integración `sitemap` con config i18n
- [ ] Ejecutar `astro build` localmente; verificar no hay errores de config ni warnings
- [ ] Confirmar que `Astro.currentLocale` está disponible en templates

---

### Tarea 2: Crear helpers i18n (`src/i18n/config.ts`, `src/i18n/types.ts`, `src/i18n/utils.ts`)

- **Archivos**: `src/i18n/config.ts`, `src/i18n/types.ts`, `src/i18n/utils.ts`
- **Qué hacer**: (1) Exportar constantes `LOCALES`, `DEFAULT_LOCALE`, `NON_DEFAULT_LOCALES` en `config.ts`. (2) Crear utility type `DotPaths<T>` y tipo `TranslationKey` en `types.ts` basado en `es.json`. (3) Implementar en `utils.ts`: `getLangFromUrl(url)`, `useTranslations(lang)` con fallback a es.json, `getAlternateLinks(currentPath)`, `isRTL(lang)`, `getHtmlLang(lang)`, `getOgLocale(lang)`, y helpers de mapeo `LOCALE_LABELS` y `LOCALE_NAMES`.
- **Criterio de completado**: Tipado completo y funcional; `t('key')` retorna string sin errores; tests verifican fallback a español.
- **Modo**: [TDD] — escribir tests para cada función antes de implementar.

- [ ] Crear `src/i18n/config.ts` con exports de constantes
- [ ] Crear `src/i18n/types.ts` con `DotPaths<T>` y `TranslationKey`
- [ ] Implementar `getLangFromUrl()` en `utils.ts`
- [ ] Implementar `useTranslations()` con fallback a es.json
- [ ] Implementar `getAlternateLinks()` para hreflang
- [ ] Implementar `isRTL()`, `getHtmlLang()`, `getOgLocale()`
- [ ] Exportar `LOCALE_LABELS` y `LOCALE_NAMES` en `config.ts`
- [ ] Ejecutar tests locales; verificar todos pasan

---

### Tarea 3: Crear archivos JSON de traducción (`src/i18n/translations/*.json`)

- **Archivos**: `src/i18n/translations/es.json`, `en.json`, `zh.json`, `hi.json`, `ar.json`, `pt.json`
- **Qué hacer**: Crear `es.json` como master con namespaces (nav, hero, services, industries, why, stats, cta, footer, seo, forms, pages, schema) e interpolación `{variable}`. Generar IA los otros 5 JSONs con estructura idéntica y campo `_reviewStatus` marcando como "AI_GENERATED — pending native review". Todas las claves deben estar presentes en todos los JSONs.
- **Criterio de completado**: Todos los JSONs tienen paridad de claves; es.json contiene ~600–700 strings; no hay campos vacíos. Tipado se resuelve correctamente en `ts`.
- **Modo**: [TDD] — test de paridad de claves antes de finalizar.

- [ ] Extraer strings actuales del código y `constants.ts` del repo
- [ ] Crear `es.json` con todos los namespaces y claves
- [ ] Generar IA los JSONs para en, zh, hi, ar, pt con estructura idéntica
- [ ] Añadir campo `_reviewStatus` en JSONs no-español
- [ ] Ejecutar validación de paridad; confirmar todas las claves coinciden
- [ ] Verificar tipado en TypeScript; `TranslationKey` enumera todas las claves

---

### Tarea 4: Crear script de validación de claves (`scripts/validate-i18n.ts`)

- **Archivos**: `scripts/validate-i18n.ts`
- **Qué hacer**: Script que compara claves de `es.json` (aplanadas con dot-notation) con cada locale, reporta `missing` y `extra`, y sale con código 1 si hay discrepancias (excluyendo `_reviewStatus` y otros campos de metadata). Integrar como hook `astro:build:start` en `astro.config.mjs` y como script npm separado.
- **Criterio de completado**: Script detecta drift de claves; build falla si hay `missing` o `extra`; se ejecuta en CI antes de `astro build`.
- **Modo**: [TDD] — crear test que valida detección de drift simulado.

- [ ] Crear `scripts/validate-i18n.ts` con lógica de comparación de claves
- [ ] Integrar como hook `astro:build:start` en config
- [ ] Crear script npm `validate-i18n` en `package.json`
- [ ] Test: modificar un JSON (agregar/remover clave), ejecutar script, verificar falla
- [ ] Ejecutar script en flujo de build local; confirma funciona

---

## Spec: i18n-translations-json-structure

### Tarea 5: Migrar strings desde `src/lib/constants.ts` a JSONs

- **Archivos**: `src/lib/constants.ts`, `src/i18n/translations/*.json`
- **Qué hacer**: Identificar todos los strings traducibles en `constants.ts` (nombres de servicios, industrias, labels, descripciones) y migrarlos a las claves correspondientes en los JSONs. Eliminar esos strings de `constants.ts`; mantener URLs, IDs, números, colores y datos estructurales.
- **Criterio de completado**: No hay strings en `constants.ts` que se dupliquen en JSONs; componentes que usan `constants.ts` obtienen strings de `t()` en su lugar.

- [ ] Auditar `constants.ts` para identificar strings traducibles vs. datos
- [ ] Migrar nombres de servicios (1–11) a `services.*` en JSONs
- [ ] Migrar nombres de industrias (1–12) a `industries.*` en JSONs
- [ ] Migrar otros labels y descripciones a sus namespaces respectivos
- [ ] Eliminar esos strings de `constants.ts`
- [ ] Verificar que componentes que usan `constants.ts` no rompieron

---

## Spec: i18n-ui-selector-navbar

### Tarea 6: Actualizar `BaseLayout.astro` con props `lang` y `currentPath`, hreflang y metadatos dinámicos

- **Archivos**: `src/layouts/BaseLayout.astro`, `src/i18n/utils.ts` (lectura)
- **Qué hacer**: Extender props de `BaseLayout` con `lang: Locale` y `currentPath: string`. Añadir atributo dinámico `lang` en `<html>` y `dir` (rtl si ar, ltr en otro caso). Generar loop de `<link rel="alternate">` con `getAlternateLinks(currentPath)`. Actualizar `og:locale` y schema JSON-LD de organización con strings de `t()`. Traducir `skip-link` y `canonical`.
- **Criterio de completado**: HTML generado tiene `<html lang="es" dir="ltr">` en `/` y `<html lang="ar" dir="rtl">` en `/ar/`. Hreflang loop genera 7 links (6 locales + x-default). No hay errores de props en TypeScript.
- **Modo**: [TDD] — verificar salida HTML esperada tras build.

- [ ] Leer definición actual de props en `BaseLayout`
- [ ] Añadir `lang: Locale` y `currentPath: string` como props obligatorias
- [ ] Implementar atributo dinámico `lang` y `dir` en `<html>`
- [ ] Implementar loop de `<link rel="alternate" hreflang>` con `getAlternateLinks()`
- [ ] Actualizar `og:locale` con `getOgLocale(lang)`
- [ ] Parametrizar schema JSON-LD (slogan, description) con `t()`
- [ ] Traducir `skip-link` usando `t('a11y.skipLink')`
- [ ] Ejecutar build y verificar en HTML: hreflang presente, lang/dir correctos

---

### Tarea 7: Actualizar `Navbar.astro` para recibir `lang` y `currentPath`, aplicar RTL CSS overrides

- **Archivos**: `src/components/ui/Navbar.astro`, `src/styles/global.css` (parcialmente)
- **Qué hacer**: Extender props del Navbar con `lang: Locale` y `currentPath: string`. Pasar ambas props al componente `LanguageSelector` (Tarea 9). Traducir labels del Navbar ("Cotiza ahora", aria-labels) usando `t()`. Preparar clases de CSS para RTL overrides (aplicadas en Tarea 8). Incluir en el Navbar la nueva instancia de `LanguageSelector`.
- **Criterio de completado**: Navbar renderiza correctamente en build; `LanguageSelector` recibe props esperadas. Todos los textos visibles son dinámicos vía `t()`.
- **Modo**: [TDD] — snapshot test de HTML esperado en `/` y `/en/`.

- [ ] Leer estructura actual de `Navbar.astro`
- [ ] Añadir props `lang` y `currentPath`
- [ ] Traducir "Cotiza ahora" y aria-labels usando `t()`
- [ ] Importar e incluir `<LanguageSelector currentLang={lang} currentPath={currentPath} variant="desktop" />`
- [ ] Pasar props equivalentes a segunda instancia en drawer (`variant="mobile"`)
- [ ] Verificar en build que Navbar renderiza sin errores
- [ ] Crear snapshot test de HTML esperado

---

### Tarea 8: Refactor RTL — CSS logical properties y animaciones en Navbar drawer

- **Archivos**: `src/styles/global.css`, `src/components/ui/Navbar.astro` (parcialmente)
- **Qué hacer**: Reemplazar propiedades CSS direccionales explícitas en `.drawer__panel`, `.drawer__group-links` y animaciones con logical properties (`inset-inline-start`, `inset-inline-end`, `padding-inline-start`). Añadir override RTL: `[dir="rtl"] .drawer__panel { animation-name: slideInRTL; }` + nuevo keyframe `slideInRTL`. Actualizar `.skip-link` con `inset-inline-start`. Revisar componentes Hero, Why, Services y reemplazar `text-left`/`text-right` de Tailwind con `text-start`/`text-end`.
- **Criterio de completado**: En `/ar/`, el drawer aparece desde la izquierda; animación no tiene artefactos visuales. En `/en/`, el drawer sigue apareciendo desde la derecha. Ningún elemento con `left:` o `right:` queda desalineado.
- **Modo**: [TDD] — comparar snapshots visuales de `/ar/` drawer abierto vs `/en/` drawer abierto.

- [ ] Leer estilos actuales de `.drawer__panel` y `.drawer__group-links`
- [ ] Reemplazar `right: 0` con `inset-inline-end: 0` en `.drawer__panel`
- [ ] Reemplazar `box-shadow` direccional con override RTL `[dir="rtl"]`
- [ ] Crear nuevo keyframe `slideInRTL` con `translateX(-100%)`
- [ ] Añadir override `[dir="rtl"] .drawer__panel { animation-name: slideInRTL; }`
- [ ] Reemplazar `padding-left` con `padding-inline-start` en `.drawer__group-links`
- [ ] Reemplazar `left: 0` con `inset-inline-start: 0` en `.skip-link`
- [ ] Auditar componentes: Hero, Why, Services por `text-left`/`text-right`; reemplazar con `text-start`/`text-end`
- [ ] Visual test: abrir `/ar/` y `/en/` en navegador; verificar drawer desde lado correcto

---

### Tarea 9: Crear componente `LanguageSelector.astro`

- **Archivos**: `src/components/ui/LanguageSelector.astro`
- **Qué hacer**: Componente Astro que recibe `currentLang: Locale`, `currentPath: string`, `variant?: 'desktop' | 'mobile'`. Implementa estructura accesible con `role="navigation"`, botón con `aria-haspopup="listbox"` y lista con `role="listbox"`. Usa helper `buildLocaleUrl(lang, path)` para calcular enlaces. Mapea `LOCALES` para generar opciones. Marca `aria-selected={lang === currentLang}` en la opción activa. Integra keyboard handling (Tab, Enter, Escape) — puede ser CSS-only con `:focus-within` o pequeño script inline.
- **Criterio de completado**: Selector renderiza sin errores; links son correctos (`/pt/servicios` desde `/en/servicios`); accessible en teclado (focus, Enter para activar); idioma actual destaca visualmente.
- **Modo**: [TDD] — test de accesibilidad y generación de URLs correctas.

- [ ] Crear archivo `src/components/ui/LanguageSelector.astro`
- [ ] Definir props: `currentLang`, `currentPath`, `variant`
- [ ] Implementar `buildLocaleUrl(lang, path)` dentro del componente o en utils
- [ ] Crear estructura HTML con `role="navigation"`, botón, listbox
- [ ] Mapear `LOCALES` para opciones con `aria-selected`
- [ ] Implementar keyboard handler (CSS-only `:focus-within` o script)
- [ ] Verificar en build; probar con navegador y teclado
- [ ] Test: verificar URLs generadas para `/servicios` → `/pt/servicios`

---

## Spec: i18n-rtl-support-arabic

### Tarea 10: Aplicar font stacks en `global.css` para CJK, Devanagari y Árabe

- **Archivos**: `src/styles/global.css`
- **Qué hacer**: Añadir selectores `:root:lang(zh)`, `:root:lang(hi)`, `:root:lang(ar)` que overridean variable CSS `--font-sans` con stacks adecuados. Para `zh`: `Noto Sans CJK SC, PingFang SC, ...`. Para `hi`: `Noto Sans Devanagari, Kohinoor Devanagari, ...`. Para `ar`: `Noto Sans Arabic, Geeza Pro, ...`. Verificar que no se añaden `@import` de fuentes web; solo stacks del sistema.
- **Criterio de completado**: Build no descarga fuentes adicionales; Lighthouse performance no retrocede. Visual inspection: `/zh/`, `/hi/`, `/ar/` sin "tofu" (caracteres de reemplazo) en Chromium, Firefox, Safari.
- **Modo**: [TDD] — prueba visual (no test automatizado); captura de pantalla en 3 navegadores.

- [ ] Leer tokens.css para ubicar variable `--font-sans` actual
- [ ] Añadir en `global.css`: `:root:lang(zh) { --font-sans: ... }`
- [ ] Añadir en `global.css`: `:root:lang(hi) { --font-sans: ... }`
- [ ] Añadir en `global.css`: `:root:lang(ar) { --font-sans: ... }`
- [ ] Verificar que body heredará `--font-sans` del :root dinámico
- [ ] Build y medir Lighthouse; confirmar no retrocede
- [ ] Abrir `/zh/`, `/hi/`, `/ar/` en Chromium, Firefox, Safari
- [ ] Inspeccionar visualmente: ningún carácter de reemplazo; textos legibles

---

## Spec: i18n-seo-hreflang

### Tarea 11: Configurar sitemap i18n en `astro.config.mjs`

- **Archivos**: `astro.config.mjs`
- **Qué hacer**: Actualizar integración `@astrojs/sitemap` con config `i18n: { defaultLocale: 'es', locales: { es: 'es-CL', en: 'en-US', ... } }`. Esto genera automáticamente `sitemap-index.xml` con referencias a sitemaps por locale y relaciones hreflang internas.
- **Criterio de completado**: `dist/sitemap-index.xml` contiene referencias a 6 sitemaps; cada sitemap de locale incluye entradas con hreflang a todos los otros locales. No hay errores de validación de sitemap.

- [ ] Leer config actual de `@astrojs/sitemap` en `astro.config.mjs`
- [ ] Actualizar con bloque `i18n: { defaultLocale: 'es', locales: {...} }`
- [ ] Ejecutar build; verificar generación de `sitemap-index.xml`
- [ ] Validar XML: sitemap-index referencia 6 sitemaps
- [ ] Validar que cada sitemap de locale tiene hreflang a otros locales
- [ ] Test: parser XML sobre los archivos generados

---

### Tarea 12: Actualizar `public/manifest.json` para lang correcto

- **Archivos**: `public/manifest.json`
- **Qué hacer**: Cambiar `"lang": "es"` por `"lang": "es-CL"` (identidad corporativa). Mantener `"dir": "ltr"` (la PWA instala una sola vez, reflejará identidad corporativa). Documentar decisión en notas del cambio.
- **Criterio de completado**: `manifest.json` válido; no errores en build; PWA puede instalarse.

- [ ] Leer `public/manifest.json` actual
- [ ] Actualizar `"lang"` de `"es"` a `"es-CL"`
- [ ] Verificar sintaxis JSON válida
- [ ] Build y verificar no hay warnings de manifest

---

### Tarea 13: Crear página 404 traducida en `src/pages/404.astro` (español) y `src/pages/[lang]/404.astro`

- **Archivos**: `src/pages/404.astro`, `src/pages/[lang]/404.astro`
- **Qué hacer**: Página 404 en español permanece en `src/pages/404.astro`. Crear clon en `src/pages/[lang]/404.astro` con `getStaticPaths()` para locales no-default. Mensaje de error obtenido de `t('pages.404message')`. Proporcionar link a home traducido con `t('pages.404backHome')`.
- **Criterio de completado**: Navegar a `/nonexistent` muestra 404 en español; `/en/nonexistent` muestra 404 en inglés (si existe); `/fr/nonexistent` redirige a `/404` (fallback).

- [ ] Leer estructura actual de `src/pages/404.astro`
- [ ] Actualizar texto para usar `t('pages.404message')` y `t('pages.404backHome')`
- [ ] Crear `src/pages/[lang]/404.astro` con `getStaticPaths()`
- [ ] Verificar que ambas páginas heredan de `BaseLayout` con props correctas
- [ ] Test: navegar a `/nonexistent` (español), `/en/nonexistent` (inglés), verificar idioma

---

## Spec: i18n-translations-json-structure (continuación: migraciones)

### Tarea 14: Migrar strings hardcodeados en componentes a `t()`

- **Archivos**: Múltiples (`src/components/**/*.astro`, `src/pages/*.astro`)
- **Qué hacer**: Auditar todos los componentes y páginas que contengan strings literales en español. Reemplazar con llamadas a `t(key)`. Ejemplos: Hero (eyebrow, h1, lead, CTA label), Services (descripción, "Conocer más"), Industries (nombres, descripciones), Why, Stats, Footer (headings, copyright, links), Forms (labels, placeholders, errores), Sections de contenido (textos largos en pages/nosotros, pages/contacto, etc.).
- **Criterio de completado**: No hay strings en español literales en templates; todos provienen de JSONs vía `t()`. Build SIN warnings de strings hardcodeados.
- **Modo**: [TDD] — linter o script que detecta strings literales; test que verifica componentes usan `t()`.

- [ ] Auditar `src/components/**/*.astro` por strings literales
- [ ] Reemplazar en Hero: eyebrow, h1, lead, CTA label
- [ ] Reemplazar en Services section: descripción, "Conocer más"
- [ ] Reemplazar en Industries section: nombres, descripciones
- [ ] Reemplazar en Why section: títulos, items
- [ ] Reemplazar en Stats: labels
- [ ] Reemplazar en CTA section: h2, lead, form labels
- [ ] Reemplazar en Footer: column headings, copyright, links
- [ ] Reemplazar en Forms section: labels, placeholders, error messages
- [ ] Verificar cada página (`index.astro`, `servicios.astro`, `nosotros.astro`, etc.): migrar strings
- [ ] Build y verificar no hay errores de claves faltantes

---

### Tarea 15: Migrar páginas de servicios anidados a `src/pages/[lang]/servicios/`

- **Archivos**: `src/pages/servicios/carga-aerea.astro`, `src/pages/servicios/carga-maritima.astro`, y sus clones en `src/pages/[lang]/servicios/`
- **Qué hacer**: Copiar páginas españolas de servicios anidados a `src/pages/[lang]/servicios/` con `getStaticPaths()` para cada página. Actualizar contenido para usar `t()` si aún hay strings hardcodeados. Mantener españoles originales en `src/pages/servicios/`.
- **Criterio de completado**: `/servicios/carga-aerea` y `/en/servicios/carga-aerea` sirven el mismo contenido en idiomas respectivos. URLs funcionales en build estático.

- [ ] Copiar `src/pages/servicios/carga-aerea.astro` a `src/pages/[lang]/servicios/carga-aerea.astro`
- [ ] Copiar `src/pages/servicios/carga-maritima.astro` a `src/pages/[lang]/servicios/carga-maritima.astro`
- [ ] Añadir `getStaticPaths()` en ambos archivos
- [ ] Verificar que heredan de `BaseLayout` con props `lang` y `currentPath`
- [ ] Migrar cualquier string hardcodeado a `t()`
- [ ] Build y verificar generación de archivos HTML para todas las combinaciones

---

## Spec: i18n-routing-locale-prefixes (continuación: duplicación de páginas)

### Tarea 16: Duplicar páginas españolas a `src/pages/[lang]/` con `getStaticPaths()`

- **Archivos**: `src/pages/[lang]/index.astro`, `src/pages/[lang]/servicios.astro`, `src/pages/[lang]/nosotros.astro`, `src/pages/[lang]/contacto.astro`, `src/pages/[lang]/cotizar.astro`, `src/pages/[lang]/industrias.astro`
- **Qué hacer**: Para cada página en `src/pages/*.astro`, crear clon en `src/pages/[lang]/*.astro` que: (1) Exporte `getStaticPaths()` retornando `NON_DEFAULT_LOCALES`. (2) Use `Astro.currentLocale ?? 'es'` como `lang`. (3) Pase `lang` y `currentPath` a componentes y layout. (4) Obtenga contenido traducido vía `t()`. Las páginas españolas originales permanecen sin cambios; el contenido es idéntico, solo el locale difiere.
- **Criterio de completado**: Build genera HTML en `dist/en/`, `dist/zh/`, etc. para todas las páginas. URLs funcionan en navegador. No hay errores de props en TypeScript.

- [ ] Crear `src/pages/[lang]/index.astro` con `getStaticPaths()`
- [ ] Crear `src/pages/[lang]/servicios.astro` con `getStaticPaths()`
- [ ] Crear `src/pages/[lang]/nosotros.astro` con `getStaticPaths()`
- [ ] Crear `src/pages/[lang]/contacto.astro` con `getStaticPaths()`
- [ ] Crear `src/pages/[lang]/cotizar.astro` con `getStaticPaths()`
- [ ] Crear `src/pages/[lang]/industrias.astro` con `getStaticPaths()`
- [ ] En cada página: usar `Astro.currentLocale ?? 'es'` para lang
- [ ] En cada página: pasar `lang` y `currentPath` a componentes y layout
- [ ] Verificar que el contenido es dinámico vía `t()`; no hay strings hardcodeados
- [ ] Build y verificar `dist/en/`, `dist/zh/`, etc. tienen archivos HTML
- [ ] Test de navegación: acceder a `/en/servicios`, `/zh/industrias`, etc.

---

## Resumen de dependencias y orden parallelizable

```
Tarea 1 (Config i18n) → Tarea 2 (Helpers) → Tarea 3 (JSONs) → Tarea 4 (Validación)
                                                    ↓
                                          (Parallelizable)
                                                    ↓
Tarea 5 (Migrar constants) ← Tarea 3
Tarea 6 (BaseLayout) → Tarea 7 (Navbar) → Tarea 9 (LanguageSelector)
                                    ↓
                            Tarea 8 (RTL CSS) ← (Parallelizable con Tarea 9)
Tarea 10 (Font stacks) ← Tarea 1
Tarea 11 (Sitemap) ← Tarea 1
Tarea 12 (Manifest) ← (Independiente, cualquier momento)
Tarea 13 (404) ← Tarea 6 + Tarea 3
Tarea 14 (Migrar strings componentes) ← Tarea 3 + Tarea 6
Tarea 15 (Servicios anidados) ← Tarea 3 + Tarea 14
Tarea 16 (Duplicar páginas) ← Tarea 1 + Tarea 3 + Tarea 6 + Tarea 14
```

**Orden de ejecución recomendado (secuencial con paralelización donde sea posible)**:

1. Tareas 1–4 (infraestructura i18n) — **bloqueante**
2. Tarea 5 en paralelo con Tareas 6–7
3. Tareas 8–9 en paralelo
4. Tarea 10
5. Tarea 11
6. Tarea 12
7. Tarea 13
8. Tarea 14
9. Tareas 15–16 en paralelo (ambas dependen de tareas anteriores)

---

## Notas de implementación

- **Astro currentLocale**: Disponible directamente en templates tras config i18n. No necesita acceso a `params.lang` manualmente en `src/pages/[lang]/`.
- **Fallback automático**: El helper `t()` cheque primero el JSON del locale activo; si la clave no existe, retorna el valor de `es.json`. Si tampoco existe en español, retorna la clave misma (fail visible para el desarrollador).
- **TDD para Tareas 2, 4, 9**: Escribir tests antes de la implementación. Para visual (Tarea 10), usar screenshots en múltiples navegadores.
- **Build profiling**: Ejecutar `astro build --verbose` tras completar Tareas 1–4 para diagnosticar cualquier issue temprano.
- **Accessibility**: Todas las migraciones (Tareas 5, 14) deben preservar ARIA labels actuales; traducir `aria-label` y `title` vía `t()`.
