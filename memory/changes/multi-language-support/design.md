# Design: multi-language-support

## Decisiones Técnicas

---

### Decisión 1: Estructura de carpetas de routing — `src/pages/[lang]/` vs `[...lang]`

**Contexto**: Las páginas actuales viven en `src/pages/` (rutas planas). El i18n nativo de Astro 6 soporta dos patrones para generar rutas multi-locale en output estático: (a) carpeta única con parámetro `[lang]`, que duplica la estructura de páginas para cada locale no-default, o (b) catch-all `[...lang]` que captura el prefijo y la ruta juntos en un solo archivo por página.

**Decisión**: Usar **`src/pages/[lang]/`** como prefijo explícito de carpeta, sin catch-all. Las páginas españolas (default) permanecen en su ubicación actual (`src/pages/index.astro`, `src/pages/servicios.astro`, etc.). Las páginas de los 5 locales no-default se ubican en `src/pages/[lang]/index.astro`, `src/pages/[lang]/servicios.astro`, etc. Cada archivo de locale no-default implementa `getStaticPaths()` que itera los locales `['en', 'zh', 'hi', 'ar', 'pt']`.

**Justificación**: El patrón `[...lang]` en un solo archivo por página es más compacto, pero obliga a distinguir en runtime si `params.lang` es undefined (español) o un código de locale, y el archivo español ya en raíz entra en conflicto. Con `[lang]/`, la separación es explícita: las rutas españolas nunca tocan `[lang]/`, el prefijo aparece literalmente en la URL según `prefixDefaultLocale: false`, y `Astro.currentLocale` devuelve el locale correcto sin lógica adicional. Es más legible para colaboradores futuros. Ver ADR-0002.

**Alternativas descartadas**:
- `src/pages/[...lang]/` (catch-all por página): Una sola copia de cada página que maneja todos los idiomas. Descartada porque produce conflictos con los archivos españoles en raíz (Astro resuelve `index.astro` y `[...lang]/index.astro` en el mismo nivel), requiere lógica extra de branching, y la ambigüedad complica el tipado TypeScript.
- Carpetas estáticas por idioma (`src/pages/en/index.astro`, `src/pages/zh/index.astro`, …): Viola DRY — 5 × 9 páginas = 45 archivos casi idénticos. Descartada.

**ADR**: [[0002-i18n-routing-pages-lang-folder]]

---

### Decisión 2: Patrón `getStaticPaths()` por página

**Contexto**: Las páginas en `src/pages/[lang]/` necesitan `getStaticPaths()` para que Astro genere rutas estáticas en build time.

**Decisión**: Cada página de locale no-default exporta `getStaticPaths()` usando los locales centralizados desde `src/i18n/config.ts`:

```typescript
// src/i18n/config.ts
export const LOCALES = ['es', 'en', 'zh', 'hi', 'ar', 'pt'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'es';
export const NON_DEFAULT_LOCALES = LOCALES.filter(l => l !== DEFAULT_LOCALE);
// ['en', 'zh', 'hi', 'ar', 'pt']

// En cada src/pages/[lang]/index.astro:
export function getStaticPaths() {
  return NON_DEFAULT_LOCALES.map(lang => ({ params: { lang } }));
}
```

`Astro.currentLocale` (API nativa de Astro 6, inyectada automáticamente por la config `i18n`) se usa en el frontmatter de la página para obtener el locale activo, sin necesidad de leer `params.lang` manualmente:

```typescript
const lang = (Astro.currentLocale ?? 'es') as Locale;
```

---

### Decisión 3: Schema de los JSONs de traducción

**Contexto**: Las ~500+ strings del sitio deben organizarse de forma que sean accesibles por clave tipada, soporte interpolación simple, y sean mantenibles por editores de contenido.

**Decisión**: Un archivo JSON plano por locale, con namespacing por punto (dot-notation). `es.json` es el master. Todos los demás JSONs deben tener exactamente las mismas claves. Interpolación con `{variable}` (llaves, sin prefijos). Los JSONs no-español llevan un campo `_status` en cada namespace que marca el estado de revisión.

**Schema de namespaces**:

```
nav.*          — labels de navegación y aria-labels
hero.*         — eyebrow, h1, lead, CTA labels, rutas frecuentes
services.*     — eyebrow, h2, desc, labels de servicios (1-11), "Conocer más"
industries.*   — eyebrow, h2, desc, nombres de industrias (1-12)
why.*          — eyebrow, h2, desc, items (1-4)
stats.*        — labels (1-4)
cta.*          — h2, lead, form labels, select options, submit
footer.*       — headings de columnas, descripción, copyright, links
seo.*          — defaultTitle, defaultDescription, og locale por locale
forms.*        — labels, placeholders, errores compartidos entre contacto/cotizar
pages.*        — textos extensos por página (servicios, nosotros, contacto, cotizar, industrias, 404)
schema.*       — slogan, description (para JSON-LD)
```

**Convención de interpolación**:

```json
{ "hero.greeting": "Bienvenido a {company}, líderes en {service}" }
```

El helper `t()` reemplaza `{variable}` por el valor de `vars[variable]`:

```typescript
t('hero.greeting', { company: 'LOG ATM', service: 'logística' })
// → "Bienvenido a LOG ATM, líderes en logística"
```

**Marca de revisión pendiente**: campo `_reviewStatus` al tope de cada archivo no-español:

```json
{ "_reviewStatus": "AI_GENERATED — pending native review" }
```

---

### Decisión 4: API del helper i18n (`src/i18n/utils.ts`)

**Contexto**: Los componentes necesitan acceder a traducciones de forma tipada y consistente. El locale debe inferirse de la URL o de `Astro.currentLocale`. Se necesita generar enlaces alternos para hreflang y detectar RTL.

**Decisión**: Helper puro en TypeScript, sin dependencias externas, importado en cada componente/página. Tipado generado desde `es.json`.

**Contratos de la API**:

```typescript
// Inferir locale desde la URL (para uso fuera de contexto Astro, ej. scripts)
function getLangFromUrl(url: URL): Locale

// Retorna la función t() cerrada sobre el locale activo
function useTranslations(lang: Locale): (key: TranslationKey, vars?: Record<string, string>) => string

// Alias de uso directo cuando ya se tiene lang
// t = useTranslations(lang)
// t('nav.services')             → "Servicios"
// t('hero.greeting', { name }) → string interpolado

// Genera los links <link rel="alternate"> para una ruta dada
function getAlternateLinks(currentPath: string): Array<{ lang: string; href: string }>
// currentPath: la parte de la URL sin prefijo de locale (/servicios, /nosotros, etc.)
// Retorna un entry por locale + uno con lang='x-default' → URL española

// Detecta si el locale requiere layout RTL
function isRTL(lang: Locale): boolean
// Solo true para 'ar'

// Mapea locale → código BCP-47 para atributo lang de <html>
function getHtmlLang(lang: Locale): string
// 'es' → 'es', 'en' → 'en', 'zh' → 'zh-Hans', 'hi' → 'hi', 'ar' → 'ar', 'pt' → 'pt'

// Mapea locale → og:locale
function getOgLocale(lang: Locale): string
// 'es' → 'es_CL', 'en' → 'en_US', 'zh' → 'zh_CN', 'hi' → 'hi_IN', 'ar' → 'ar_SA', 'pt' → 'pt_BR'
```

**Tipado de claves**: `TranslationKey` se genera como unión literal de todas las claves de `es.json` aplanadas (dot-notation). Se usa un script de build o tipo manual (`keyof typeof esTranslations` aplanado) para garantizar que el uso de `t('clave.inexistente')` sea error de compilación.

```typescript
// src/i18n/types.ts — generado o mantenido manualmente
import type esJSON from './translations/es.json';
export type TranslationKey = DotPaths<typeof esJSON>;
// DotPaths<T>: utility type que aplana el objeto a unión de dot-paths
```

**Implementación de fallback**: Si la clave no existe en el JSON del locale activo, se retorna el valor del JSON español (importado estáticamente en `utils.ts`). Si tampoco existe en español, se retorna la propia clave (fail visible para el desarrollador, nunca error en producción).

---

### Decisión 5: Validación de claves de traducción (build hook vs CI test)

**Contexto**: Los JSONs de locale deben tener exactamente las mismas claves que `es.json`. Si un desarrollador añade una clave en español y olvida los otros JSONs, el fallback oculta el problema en desarrollo pero las demás traducciones quedan huérfanas.

**Decisión**: **Script de validación en `package.json` como paso previo al build** (no como test de Jest/Vitest). Se invoca como `astro:build:before` hook o como script separado `npm run validate-i18n`. Ver ADR-0003.

El script (`scripts/validate-i18n.ts`) realiza:
1. Leer `es.json` y extraer todas las claves (dot-notation aplanada, excluyendo `_reviewStatus`).
2. Para cada locale no-español: cargar el JSON y extraer sus claves.
3. Comparar conjuntos: reportar claves presentes en es.json pero ausentes en el locale (`missing`) y claves en el locale no presentes en es.json (`extra`).
4. Si hay `missing` o `extra`: salir con código 1 (el build falla).
5. Si solo hay diferencias de valor (traducciones pendientes de revisión): permitir pasar (la calidad del contenido no es responsabilidad del build).

El script se integra en `astro.config.mjs` como integración inline con hook `astro:build:start`, y también como script NPM independiente para uso en CI y durante desarrollo.

**ADR**: [[0003-i18n-key-validation-build-hook]]

---

### Decisión 6: Refactor RTL del Navbar — overrides CSS con logical properties

**Contexto**: El Navbar drawer usa `top: 0; right: 0` para posicionarse, y la animación `slideIn` usa `translateX(100%)` que asume LTR. En RTL (`/ar/`) el drawer debe aparecer desde el borde izquierdo.

**Decisión**: Usar CSS logical properties y el selector `[dir="rtl"]` para los overrides. Se modifican únicamente las propiedades direccionales explícitas en `.drawer__panel`, `.drawer__group-links` y las animaciones. El resto del Navbar funciona correctamente con logical properties ya presentes (los `padding-inline-*` ya son correctos).

**Lista concreta de overrides CSS a aplicar**:

1. **`.drawer__panel`** — Posicionamiento:
   - Eliminar: `top: 0; right: 0;`
   - Reemplazar con: `inset-block-start: 0; inset-inline-end: 0;`
   - Esto reposiciona automáticamente el panel a la derecha en LTR y a la izquierda en RTL.

2. **`.drawer__panel`** — Sombra (dirección de sombra expuesta):
   - Actual: `box-shadow: -8px 0 48px ...`
   - Con logical: `box-shadow: 0 0 48px ...` (sombra simétrica, sin dirección) — alternativa: mantener el valor y añadir override `[dir="rtl"] .drawer__panel { box-shadow: 8px 0 48px ... }`.

3. **`@keyframes slideIn`** — Animación de entrada:
   - Actual: `from { transform: translateX(100%) }` (entra desde la derecha)
   - RTL override: `[dir="rtl"] .drawer__panel { animation-name: slideInRTL; }` + nuevo keyframe `slideInRTL { from { transform: translateX(-100%) } to { transform: translateX(0) } }`

4. **`.drawer__group-links`** — Indentación:
   - Actual: `padding-left: 0.5rem;`
   - Reemplazar con: `padding-inline-start: 0.5rem;`

5. **`.skip-link`** — Posicionamiento del skip link:
   - Actual: `left: 0;`
   - Reemplazar con: `inset-inline-start: 0;`

6. **`BaseLayout.astro`** — `dir` dinámico en `<html>`:
   - `<html lang={getHtmlLang(lang)} dir={isRTL(lang) ? 'rtl' : 'ltr'}>` (o simplemente omitir `dir` cuando LTR, ya que es el default del browser; se recomienda explicitarlo para evitar ambigüedad).

7. **Revisión adicional** en páginas con `text-left` / `text-right` de Tailwind: reemplazar con `text-start` / `text-end` para componentes en secciones Hero, Why, Services.

---

### Decisión 7: Selector de idioma — estructura del componente, props, persistencia URL

**Contexto**: El selector debe estar en Navbar desktop (a la derecha del CTA) y en el drawer mobile. Debe cambiar de idioma preservando la ruta actual y ser accesible por teclado.

**Decisión**: Componente Astro puro `src/components/ui/LanguageSelector.astro`. Sin JavaScript para estados hover (usa CSS `:focus-within` y `aria-expanded` con Alpine.js-style si se necesita, pero preferir solución CSS-only primero para KISS). La lista de idiomas se genera en build time desde `LOCALES`.

**Props del componente**:

```typescript
interface Props {
  currentLang: Locale;        // locale activo ('es', 'en', …)
  currentPath: string;        // ruta sin prefijo ('/servicios', '/', …)
  variant?: 'desktop' | 'mobile'; // controla el layout CSS
}
```

**Cálculo de la ruta en el nuevo locale**:

```typescript
// Normalizar currentPath: quitar el prefijo de locale si lo tiene
function buildLocaleUrl(targetLang: Locale, currentPath: string): string {
  const pathWithoutLocale = stripLocalePrefix(currentPath); // '/en/servicios' → '/servicios'
  if (targetLang === DEFAULT_LOCALE) return pathWithoutLocale; // '/servicios'
  return `/${targetLang}${pathWithoutLocale}`;               // '/zh/servicios'
}
```

**Labels de idioma**: se muestran en su forma abreviada nativa:

```typescript
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES', en: 'EN', zh: '中', hi: 'हि', ar: 'ع', pt: 'PT'
};
```

**Nombre largo** (para `aria-label` del selector y título del `<option>`):

```typescript
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español', en: 'English', zh: '中文', hi: 'हिन्दी', ar: 'عربي', pt: 'Português'
};
```

**Estructura HTML del componente** (dropdown accesible sin JS, CSS-only para desktop):

```html
<div class="lang-selector" role="navigation" aria-label="Seleccionar idioma">
  <button type="button" aria-haspopup="listbox" aria-expanded="false" class="lang-selector__trigger">
    <span aria-hidden="true">{LOCALE_LABELS[currentLang]}</span>
    <span class="sr-only">Idioma actual: {LOCALE_NAMES[currentLang]}. Cambiar idioma.</span>
    <svg aria-hidden="true"><!-- chevron --></svg>
  </button>
  <ul role="listbox" aria-label="Idiomas disponibles" class="lang-selector__menu">
    {LOCALES.map(lang => (
      <li role="option" aria-selected={lang === currentLang}>
        <a href={buildLocaleUrl(lang, currentPath)} hreflang={lang} lang={lang}>
          <span aria-hidden="true">{LOCALE_LABELS[lang]}</span>
          <span>{LOCALE_NAMES[lang]}</span>
        </a>
      </li>
    ))}
  </ul>
</div>
```

**Interactividad**: El toggle `aria-expanded` se maneja con un pequeño script inline (< 10 líneas) para keyboard navigation (Tab/Enter/Escape/ArrowUp/ArrowDown). Alternativa KISS: implementar como `<details>/<summary>` nativo para cero JS, con accessibility limitada pero funcional.

**Persistencia**: Solo en URL. Sin cookie, sin `localStorage`. El usuario que llega a `/` siempre ve español. En v2 se puede añadir detección de `Accept-Language` o cookie.

---

### Decisión 8: SEO — `<link hreflang>` en BaseLayout y configuración de sitemap

**Contexto**: Los motores de búsqueda necesitan conocer todas las variantes de idioma de cada página. El sitemap debe incluir entradas por locale.

**Decisión**:

**Hreflang en BaseLayout**: `BaseLayout.astro` recibe como prop `alternateLangs` (generado por `getAlternateLinks(currentPath)`) y los inyecta en `<head>`:

```astro
---
// Nuevas props de BaseLayout
interface Props {
  // … props existentes …
  lang: Locale;         // locale activo — determina <html lang> y og:locale
  currentPath: string;  // ruta sin prefijo — para calcular hreflang
}
const { lang = 'es', currentPath = '/', ...rest } = Astro.props;
const alternateLinks = getAlternateLinks(currentPath);
---

{alternateLinks.map(({ lang: hLang, href }) => (
  <link rel="alternate" hreflang={hLang} href={href} />
))}
```

`getAlternateLinks('/servicios')` retorna:
```
[
  { lang: 'es', href: 'https://logatm.com/servicios' },
  { lang: 'en', href: 'https://logatm.com/en/servicios' },
  { lang: 'zh', href: 'https://logatm.com/zh/servicios' },
  { lang: 'hi', href: 'https://logatm.com/hi/servicios' },
  { lang: 'ar', href: 'https://logatm.com/ar/servicios' },
  { lang: 'pt', href: 'https://logatm.com/pt/servicios' },
  { lang: 'x-default', href: 'https://logatm.com/servicios' }, // x-default → español
]
```

**Sitemap**: `@astrojs/sitemap` con la config `i18n` de Astro genera automáticamente entradas por locale. En `astro.config.mjs`:

```javascript
import sitemap from '@astrojs/sitemap';
// …
sitemap({
  i18n: {
    defaultLocale: 'es',
    locales: {
      es: 'es-CL',
      en: 'en-US',
      zh: 'zh-CN',
      hi: 'hi-IN',
      ar: 'ar-SA',
      pt: 'pt-BR',
    },
  },
}),
```

Esto genera un `sitemap-index.xml` que referencia sitemaps por locale con las relaciones `hreflang` correctas.

**Schema JSON-LD localizado**: `slogan`, `description`, y `breadcrumb name` (Inicio/Home/etc.) se obtienen del JSON de traducción activo vía `t('schema.slogan')`, `t('schema.description')`, `t('schema.breadcrumbHome')`.

---

### Decisión 9: Tipografía — font stacks CSS con `:lang()`

**Contexto**: Inter y Outfit no cubren CJK, Devanagari ni árabe. Las fuentes del sistema cubren estos scripts nativamente sin descargar bytes adicionales.

**Decisión**: Usar el selector CSS `:lang()` aplicado sobre `:root` para sobrescribir la variable `--font-sans` en los locales no-latinos. No se añaden Google Fonts ni `@font-face` externos.

**Implementación en `global.css`**:

```css
/* Stack de fuentes base (es, en, pt) — ya definido en tokens.css vía --font-sans */
/* Inter + Outfit quedan como están */

/* Chino Simplificado */
:root:lang(zh) {
  --font-sans: 'Noto Sans CJK SC', 'PingFang SC', 'Hiragino Sans GB',
               'Microsoft YaHei', 'WenQuanYi Zen Hei', sans-serif;
}

/* Hindi / Devanagari */
:root:lang(hi) {
  --font-sans: 'Noto Sans Devanagari', 'Kohinoor Devanagari', 'Devanagari MT',
               Mangal, sans-serif;
}

/* Árabe */
:root:lang(ar) {
  --font-sans: 'Noto Sans Arabic', 'Geeza Pro', 'Arial Unicode MS',
               'Tahoma', sans-serif;
}
```

Al estar `--font-sans` en el selector `body { font-family: var(--font-sans) }`, el cambio se propaga automáticamente a todos los componentes sin necesidad de modificarlos.

---

### Decisión 10: Tipado TypeScript desde `es.json` (master)

**Contexto**: El helper `t(key)` debe ser tipado para que el uso de claves inexistentes sea error de compilación.

**Decisión**: Utility type `DotPaths<T>` que aplana el JSON a unión de strings dot-notation:

```typescript
// src/i18n/types.ts
type DotPaths<T, Prefix extends string = ''> =
  T extends object
    ? { [K in keyof T & string]:
        T[K] extends object
          ? DotPaths<T[K], `${Prefix}${K}.`>
          : `${Prefix}${K}`
      }[keyof T & string]
    : Prefix;

import esTranslations from './translations/es.json';
export type TranslationKey = DotPaths<typeof esTranslations>;
// → 'nav.services' | 'nav.industries' | 'hero.eyebrow' | ...

// Firma de t():
type TFunction = (key: TranslationKey, vars?: Record<string, string>) => string;
```

El archivo `es.json` debe importarse con `import ... assert { type: 'json' }` (o la sintaxis de `tsconfig` con `resolveJsonModule: true`). El tsconfig actual en el worktree debe verificarse; Astro 6 lo configura por defecto.

---

### Decisión 11: `manifest.json` — decisión multi-locale vs dinámico

**Contexto**: `public/manifest.json` tiene `"lang": "es"` y `"dir": "ltr"` fijos. Servir el manifest desde `public/` lo hace estático — Astro no puede hacerlo dinámico en output estático sin un endpoint.

**Decisión**: **Mantener `manifest.json` en español** como idioma corporativo de la empresa. No crear versiones por locale del manifest en v1.

**Justificación**: El PWA manifest define la identidad de la aplicación instalada, no el idioma de navegación. Los navegadores no cambian el manifest instalado al cambiar de locale en la URL. Crear 6 manifests dinámicos requiere un endpoint `[lang]/manifest.json` que en output estático es factible pero añade complejidad sin beneficio tangible para los usuarios (la PWA instala una sola vez). La única actualización necesaria es mantener `"lang": "es"` (correcto para la empresa) y `"dir": "ltr"` (correcto para el idioma corporativo). En v2, si se detecta necesidad real (usuarios árabes instalando la PWA esperan dir RTL), se puede implementar el endpoint dinámico. Actualizar `"lang"` de `"es"` a `"es-CL"` como mejora menor de precisión.

---

## Arquitectura

### Flujo de renderizado por locale

```mermaid
flowchart TD
    A[Request URL] --> B{¿Tiene prefijo de locale?}
    B -- No → ruta raíz --> C[src/pages/*.astro\nlocale = 'es' default]
    B -- /en/ /zh/ /hi/ /ar/ /pt/ --> D[src/pages/[lang]/*.astro]
    D --> E[getStaticPaths\nitera NON_DEFAULT_LOCALES]
    E --> F[Astro.currentLocale → lang]
    C --> G[useTranslations lang]
    F --> G
    G --> H[t key → string del locale\nfallback a es.json si falta]
    H --> I[BaseLayout.astro\nlang=locale, dir=rtl si ar]
    I --> J{lang === ar?}
    J -- sí --> K[html dir=rtl\nCSS slideInRTL\nlogical properties activos]
    J -- no --> L[html dir=ltr\nCSS slideIn normal]
    K --> M[getAlternateLinks\nhreflang en head]
    L --> M
    M --> N[LanguageSelector\nURLs por locale]
    N --> O[HTML estático generado\nuna copia por locale × página]
```

### Estructura de archivos resultante

```
src/
  i18n/
    config.ts            — LOCALES, DEFAULT_LOCALE, NON_DEFAULT_LOCALES
    types.ts             — TranslationKey, DotPaths<T>, Locale
    utils.ts             — getLangFromUrl, useTranslations, getAlternateLinks, isRTL, getHtmlLang, getOgLocale
    translations/
      es.json            — master / fuente canónica (600~700 claves)
      en.json            — pendiente revisión nativa
      zh.json            — pendiente revisión nativa
      hi.json            — pendiente revisión nativa
      ar.json            — pendiente revisión nativa
      pt.json            — pendiente revisión nativa
  components/
    ui/
      Navbar.astro       — recibe lang + currentPath; incluye LanguageSelector
      LanguageSelector.astro — nuevo componente
  layouts/
    BaseLayout.astro     — props ampliadas: lang, currentPath; hreflang, dir, lang attr
  pages/
    index.astro          — español (sin cambio de ruta)
    servicios.astro      — español
    nosotros.astro       — español
    contacto.astro       — español
    cotizar.astro        — español
    industrias.astro     — español
    404.astro            — español
    servicios/
      carga-aerea.astro  — español
      carga-maritima.astro — español
    [lang]/
      index.astro        — en/zh/hi/ar/pt
      servicios.astro    — en/zh/hi/ar/pt
      nosotros.astro     — en/zh/hi/ar/pt
      contacto.astro     — en/zh/hi/ar/pt
      cotizar.astro      — en/zh/hi/ar/pt
      industrias.astro   — en/zh/hi/ar/pt
      404.astro          — en/zh/hi/ar/pt
      servicios/
        carga-aerea.astro     — en/zh/hi/ar/pt
        carga-maritima.astro  — en/zh/hi/ar/pt
  styles/
    global.css           — añadir :lang() overrides para CJK/Devanagari/Arabic
  lib/
    constants.ts         — conservar datos no-traducibles (URLs, IDs, números, nombres de puertos)
scripts/
  validate-i18n.ts       — script de validación de paridad de claves
astro.config.mjs         — añadir bloque i18n + sitemap i18n config
```

---

## Output Expected

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `astro.config.mjs` | Modificar | Añadir bloque `i18n` con defaultLocale, locales, routing.prefixDefaultLocale: false, fallback; actualizar `sitemap()` con config i18n |
| `src/i18n/config.ts` | Crear | Constantes de locales exportadas |
| `src/i18n/types.ts` | Crear | `TranslationKey`, `DotPaths<T>`, `Locale` |
| `src/i18n/utils.ts` | Crear | Todas las funciones helper i18n |
| `src/i18n/translations/es.json` | Crear | Master JSON con ~600-700 claves en español |
| `src/i18n/translations/en.json` | Crear | Traducción inglés (IA, marcada para revisión) |
| `src/i18n/translations/zh.json` | Crear | Traducción chino simplificado (IA, marcada) |
| `src/i18n/translations/hi.json` | Crear | Traducción hindi (IA, marcada) |
| `src/i18n/translations/ar.json` | Crear | Traducción árabe (IA, marcada) |
| `src/i18n/translations/pt.json` | Crear | Traducción portugués (IA, marcada) |
| `src/layouts/BaseLayout.astro` | Modificar | Props lang/currentPath; html lang/dir dinámico; hreflang loop; og:locale dinámico; schema JSON-LD localizado; skip-link traducido |
| `src/components/ui/Navbar.astro` | Modificar | Recibir lang+currentPath como props; RTL CSS overrides (slideInRTL, inset-inline-end, padding-inline-start); incluir LanguageSelector; traducir "Cotiza ahora" y aria-labels vía t() |
| `src/components/ui/LanguageSelector.astro` | Crear | Dropdown accesible de idiomas |
| `src/styles/global.css` | Modificar | Añadir `:root:lang(zh/hi/ar)` font stacks; `inset-inline-start: 0` para skip-link |
| `src/pages/index.astro` | Modificar | Usar t() para todos los strings; pasar lang a layout/componentes |
| `src/pages/servicios.astro` | Modificar | Migrar array local de servicios a t(); pasar lang |
| `src/pages/nosotros.astro` | Modificar | Migrar strings inline a t() |
| `src/pages/contacto.astro` | Modificar | Migrar labels/placeholders a t() |
| `src/pages/cotizar.astro` | Modificar | Migrar labels/placeholders a t() |
| `src/pages/industrias.astro` | Modificar | Migrar array local de industrias a t() |
| `src/pages/404.astro` | Modificar | Migrar mensaje a t() |
| `src/pages/servicios/carga-aerea.astro` | Modificar | Migrar features y schema JSON-LD a t() |
| `src/pages/servicios/carga-maritima.astro` | Modificar | Migrar features a t() |
| `src/pages/[lang]/index.astro` | Crear | Clon de pages/index.astro con getStaticPaths |
| `src/pages/[lang]/servicios.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/nosotros.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/contacto.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/cotizar.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/industrias.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/404.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/servicios/carga-aerea.astro` | Crear | Clon con getStaticPaths |
| `src/pages/[lang]/servicios/carga-maritima.astro` | Crear | Clon con getStaticPaths |
| `src/lib/constants.ts` | Modificar | Eliminar todos los strings traducibles; conservar datos estructurales (hrefs, IDs, números, LIVE_ROUTES, INDUSTRY_IMAGES) |
| `scripts/validate-i18n.ts` | Crear | Script de validación de paridad de claves |
| `public/manifest.json` | Modificar | Actualizar "lang" de "es" a "es-CL"; mantener dir ltr |

---

## Contratos de Componentes

### `BaseLayout.astro` — Props ampliadas

```typescript
interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  lang: Locale;         // NUEVO — obligatorio
  currentPath: string;  // NUEVO — ruta sin prefijo, para hreflang y selector
}
```

Todas las páginas (españolas y de locale) deben pasar `lang` y `currentPath` a `BaseLayout`.

### `Navbar.astro` — Props nuevas

```typescript
interface Props {
  lang: Locale;
  currentPath: string;
}
```

Las páginas pasan estas props al incluir `<Navbar lang={lang} currentPath={currentPath} />`. El Navbar pasa `lang` y `currentPath` al `LanguageSelector`.

### `LanguageSelector.astro` — Props

```typescript
interface Props {
  currentLang: Locale;
  currentPath: string;
  variant?: 'desktop' | 'mobile'; // default: 'desktop'
}
```

### `useTranslations(lang)` — Retorna

```typescript
type TFunction = (key: TranslationKey, vars?: Record<string, string>) => string;
```

---

## Estrategia de Testing

1. **Validación de claves (pre-build)**: `scripts/validate-i18n.ts` ejecutado como parte de `npm run build`. En CI como paso previo. Falla si hay drift entre `es.json` y cualquier otro JSON.

2. **Build estático completo**: `astro build` debe completarse sin errores TypeScript ni de Astro. Se verifica la generación de archivos en `dist/` para todas las rutas × locales (9 páginas × 6 locales = 54 rutas HTML mínimas + sub-rutas de servicios).

3. **Verificación de hreflang**: inspección manual o script de `grep` sobre el HTML de `dist/index.html` y `dist/en/index.html` para confirmar presencia de las 7 etiquetas `<link rel="alternate">`.

4. **RTL visual**: inspección manual de `dist/ar/index.html` abierto en browser para verificar que el drawer aparece desde la izquierda y los textos fluyen RTL.

5. **Fuentes no-latinas**: verificación visual en Chromium/Firefox/Safari de `/zh/`, `/hi/`, `/ar/` — ausencia de "tofu".

6. **Sitemap**: verificar `dist/sitemap-index.xml` y los sitemaps por locale incluyen entradas para todos los locales con las relaciones `hreflang`.

7. **TypeScript**: `astro check` debe pasar sin errores (tipado de `TranslationKey` valida el uso correcto de t()).
