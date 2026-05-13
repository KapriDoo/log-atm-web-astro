---
type: design
change_name: "rescue-multi-language-support"
created: "2026-05-12"
tags: [design, i18n]
---

# Design: rescue-multi-language-support

## Decisiones Técnicas

### D1: Reutilizar `[[0002-i18n-routing-pages-lang-folder]]` y `[[0003-i18n-key-validation-build-hook]]`

**Contexto**: el feature antiguo ya tomó decisiones arquitectónicas robustas y documentadas.
**Decisión**: NO crear ADRs nuevos para routing ni para validación de claves. Reutilizar literalmente los ADRs 0002 y 0003 (copiados a `memory/adrs/` de este cambio).
**Justificación**: el contexto técnico no ha cambiado (Astro 6, mismos 6 locales). Re-discutir las decisiones agregaría coste sin valor.
**Alternativas descartadas**: Astro i18n nativo (`i18n.routing` en config) — descartada por ADR-0002 (RTL handling y control granular sobre `[lang]`).

### D2: Regenerar `translations/es.json` desde el código main actual

**Contexto**: el `es.json` del feature antiguo antecede la pasada UX writing del PR #12 (b255a35). Si se importa tal cual, el sitio retrocede en microcopy.
**Decisión**: extraer strings del código main vigente (Navbar, Footer, Hero, Services, Industries, Why, CTA, Stats, páginas) y poblar un `es.json` nuevo desde cero. El `es.json` del feature queda como referencia de **keys** que ya existían (para no reinventar el namespace tree), pero no como fuente de **valores**.
**Justificación**: el delta crítico identificado en exploración es exactamente "microcopy refinado en main" — la mitigación natural es que main sea la fuente de verdad.
**Alternativas descartadas**:
- Importar `es.json` antiguo + diff manual contra main: alto riesgo de strings olvidados.
- Tomar `es.json` antiguo como base y sobrescribir solo lo cambiado: requiere conocer exactamente qué cambió PR #12 string-por-string.

### D3: NO reescribir Navbar — integración por composición

**Contexto**: Navbar actual de main usa `<nav id="navbar">` con drawer móvil que aplica `inert`, focus-trap y `prefers-reduced-motion`. El feature antiguo trae un Navbar con `<header role="banner">` distinto.
**Decisión**: mantener el markup actual de `Navbar.astro` intacto. Las modificaciones son:
1. Reemplazar cada string literal por `t('nav.*')` o `t('a11y.*')`.
2. Importar `LanguageSelector` y montarlo en dos puntos (variante desktop + variante mobile dentro del drawer existente).
3. Propagar `currentLang` y `currentPath` como props.
4. Añadir clase condicional `is-rtl` al drawer cuando `isRTL(lang)`.
**Justificación**: preservar a11y/UX writing es el invariante crítico del cambio (PR #11, PR #12).
**Alternativas descartadas**: copiar Navbar del feature — descartada en propuesta (riesgo de regresión a11y).

### D4: RTL en el drawer móvil vía CSS logical properties + clase condicional

**Contexto**: el drawer móvil actual asume LTR (entra desde la derecha con `translateX(100%)`). En árabe debe entrar desde la izquierda.
**Decisión**:
1. Reemplazar `right`/`left`/`translateX` por **logical properties** donde sea posible (`inset-inline-end`, `transform: translateX(var(--drawer-offset))` con `--drawer-offset: 100%` en LTR y `-100%` en RTL definido por `[dir="rtl"]`).
2. El layout raíz pone `dir="rtl"` en `<html>` cuando `isRTL(lang) === true`.
3. El selector de idioma y los iconos del navbar mantienen tamaño y posición — solo cambia el origen del drawer.
**Justificación**: con `[dir="rtl"]` cascading desde `<html>`, no hace falta JS adicional. Cumple `[[i18n-rtl-support-arabic]]`.
**Alternativas descartadas**: JS que detecta `lang === 'ar'` y aplica clases — duplica el trabajo de CSS attribute selectors.

### D5: Plantilla `[lang]/` minimalista — delega en el componente raíz

**Contexto**: ADR-0002 admite duplicación de archivos bajo `[lang]/`, pero queremos mantener DRY.
**Decisión**: cada `src/pages/[lang]/*.astro` exporta `getStaticPaths()` con `NON_DEFAULT_LOCALES` y delega al **mismo componente de página** que la versión raíz. La página raíz (`src/pages/index.astro`) acepta el locale desde `Astro.currentLocale` y carga `t(lang)` internamente — no hay lógica condicional por idioma en su markup.

Estructura mínima de `src/pages/[lang]/index.astro`:

```astro
---
import { NON_DEFAULT_LOCALES } from '~/i18n/config';
import IndexPage from '~/pages/index.astro';

export function getStaticPaths() {
  return NON_DEFAULT_LOCALES.map(lang => ({ params: { lang } }));
}
---
<IndexPage />
```

Si el patrón de delegar a `index.astro` directo no funciona en Astro 6 (porque las páginas no se pueden importar como componentes), fallback: extraer el contenido a `src/components/pages/IndexPage.astro` y que ambas rutas (raíz y `[lang]/`) lo rendericen.

**Justificación**: minimiza duplicación. Las 9 páginas raíz son la única fuente del markup; `[lang]/*.astro` solo declara `getStaticPaths()`.

**Alternativas descartadas**: duplicar el markup completo en `[lang]/*.astro` — 9 archivos de mantenimiento doble.

### D6: Build-hook activable solo cuando los 6 JSONs tengan paridad

**Contexto**: el riesgo de proposal "build CI rompe por hook antes de tener todos los JSONs listos" sugiere activación condicional.
**Decisión**: implementar el hook desde el primer commit, pero generar los 6 JSONs con paridad estructural completa en el commit donde se crea `src/i18n/`. Las traducciones provisionales se generan via script idempotente (paso T3 en tasks) que clona la estructura de `es.json` con valores `"[en] ..."`, `"[zh] ..."`, etc. para que el validator pase.
**Justificación**: paridad estructural ≠ paridad semántica. El validator solo exige la primera. Traducciones reales son trabajo de contenido posterior.
**Alternativas descartadas**: desactivar hook hasta el último commit — añade fragilidad (alguien podría no reactivarlo).

### D7: Convención de namespaces en JSON

**Decisión**: namespaces principales (top-level keys):
- `meta.*` — título, descripción, og
- `nav.*` — items de navegación
- `footer.*` — columnas, copyright, contacto
- `home.*` — hero, why, services teaser, industries teaser, stats, cta
- `servicios.*` (raíz y `carga.aerea.*`, `carga.maritima.*`)
- `industrias.*`
- `nosotros.*`
- `contacto.*` — form labels, placeholders, validaciones, success/error
- `cotizar.*` — idem
- `common.*` — botones genéricos (ver más, contactar, enviar, cerrar, etc.)
- `a11y.*` — aria-labels, sr-only

**Justificación**: alinea con la estructura de páginas para que `cmd-f "home.hero.title"` localice cada string sin ambigüedad.

---

## Arquitectura

```mermaid
flowchart LR
  subgraph "src/i18n/"
    cfg[config.ts<br/>LOCALES, RTL_LOCALES, HTML_LANG]
    types[types.ts<br/>Translations, TranslationKey]
    utils[utils.ts<br/>useTranslations, getLangFromUrl,<br/>buildLocaleUrl, getAlternateLinks, isRTL]
    tx[translations/<br/>es.json, en.json, zh.json,<br/>hi.json, ar.json, pt.json]
  end

  subgraph "src/pages/"
    root["*.astro (es)"]
    lang["[lang]/*.astro<br/>getStaticPaths()"]
  end

  subgraph "src/components/"
    nav[Navbar.astro<br/>(actual main, intacto + t())]
    sel[LanguageSelector.astro<br/>(portado)]
    foot[Footer.astro<br/>(actual main + t())]
    home[home/*.astro<br/>(actual main + t())]
  end

  layout[BaseLayout.astro<br/>lang, dir, hreflang, og:locale]
  hook[scripts/validate-i18n.ts<br/>astro:build:start hook]

  root --> layout
  lang --> root
  nav --> sel
  layout --> utils
  nav --> utils
  foot --> utils
  home --> utils
  utils --> tx
  utils --> cfg
  hook -.valida.-> tx
```

Flujo en build:
1. `astro build` dispara hook `validate-i18n` antes de cualquier output.
2. El hook compara claves de `es.json` (master) contra los otros 5 JSONs. Si hay missing/extra → falla.
3. `getStaticPaths()` en `src/pages/[lang]/*.astro` genera 5 variantes por página.
4. Cada página resuelve `lang = Astro.currentLocale ?? 'es'` y llama `t = useTranslations(lang)`.
5. `BaseLayout` recibe `lang`, setea `<html lang dir>` y genera `<link rel="alternate" hreflang>` con `getAlternateLinks(pathname)`.

## Output Expected

Archivos a crear:
- `log-atm-web-astro/src/i18n/config.ts` — copia literal del feature antiguo (LOCALES, NON_DEFAULT_LOCALES, RTL_LOCALES, LOCALE_LABELS, LOCALE_NAMES, HTML_LANG, OG_LOCALE).
- `log-atm-web-astro/src/i18n/types.ts` — `Locale`, `Translations`, `TranslationKey` (generado desde es.json).
- `log-atm-web-astro/src/i18n/utils.ts` — `useTranslations`, `getLangFromUrl`, `stripLocaleFromPath`, `buildLocaleUrl`, `getAlternateLinks`, `isRTL`, `getHtmlLang`, `getOgLocale`.
- `log-atm-web-astro/src/i18n/translations/es.json` — **regenerado desde main actual** (no copiado del feature).
- `log-atm-web-astro/src/i18n/translations/{en,zh,hi,ar,pt}.json` — derivados de `es.json` (paridad estructural; valores provisionales).
- `log-atm-web-astro/src/components/ui/LanguageSelector.astro` — copia del feature, con ajustes mínimos si las clases/tokens difieren.
- `log-atm-web-astro/src/pages/[lang]/index.astro` — getStaticPaths + delegación.
- `log-atm-web-astro/src/pages/[lang]/servicios.astro`
- `log-atm-web-astro/src/pages/[lang]/industrias.astro`
- `log-atm-web-astro/src/pages/[lang]/nosotros.astro`
- `log-atm-web-astro/src/pages/[lang]/contacto.astro`
- `log-atm-web-astro/src/pages/[lang]/cotizar.astro`
- `log-atm-web-astro/src/pages/[lang]/404.astro`
- `log-atm-web-astro/src/pages/[lang]/servicios/carga-aerea.astro`
- `log-atm-web-astro/src/pages/[lang]/servicios/carga-maritima.astro`
- `log-atm-web-astro/scripts/validate-i18n.ts` — copia del feature; valida paridad de claves.

Archivos a modificar:
- `log-atm-web-astro/astro.config.mjs` — añadir bloque `i18n: { defaultLocale: 'es', locales: [...], routing: { prefixDefaultLocale: false } }`, sitemap multilingüe, hook `astro:build:start`.
- `log-atm-web-astro/package.json` — añadir script `"validate-i18n": "tsx scripts/validate-i18n.ts"` y dev dep `tsx` si no existe.
- `log-atm-web-astro/src/layouts/BaseLayout.astro` (o equivalente) — inyectar `lang`, `dir`, `<link rel="alternate">`, `og:locale`.
- `log-atm-web-astro/src/components/ui/Navbar.astro` — reemplazar strings por `t()`, montar `LanguageSelector` (desktop + mobile drawer), clase `is-rtl` condicional.
- `log-atm-web-astro/src/components/Footer.astro` — reemplazar strings por `t()`.
- `log-atm-web-astro/src/components/home/{HeroSection,ServicesSection,IndustriesSection,WhyVideoSection,CTASection,StatsSection}.astro` — reemplazar strings por `t()` (los nombres exactos los confirma sdd-apply al leer el directorio).
- Cada `log-atm-web-astro/src/pages/*.astro` raíz — resolver `lang` desde `Astro.currentLocale`, instanciar `t = useTranslations(lang)`, sustituir strings.

Archivos a eliminar: ninguno.

## Contratos de Componentes

**`useTranslations(lang: Locale): (key: string, params?: Record<string, string|number>) => string`**
- Resuelve `key` (dot-notation) en el diccionario del `lang`. Si falta → fallback a `es`. Si tampoco existe → retorna la propia `key` y loguea warning.
- Soporta interpolación `{name}` → `params.name`.

**`getLangFromUrl(url: URL | string): Locale`** — primer segmento del path; default `'es'`.

**`stripLocaleFromPath(pathname: string): string`** — `/en/servicios` → `/servicios`.

**`buildLocaleUrl(lang: Locale, cleanPath: string): string`** — para `lang='es'` retorna `cleanPath`; para otros, prefija `/${lang}`.

**`getAlternateLinks(cleanPath: string): Array<{ lang: string; href: string }>`** — un link por locale; `lang` es el tag BCP-47 (`HTML_LANG`).

**`isRTL(lang: Locale): boolean`** — true si `RTL_LOCALES.includes(lang)`.

**`getHtmlLang(lang: Locale): string`** — `HTML_LANG[lang]`.

**`getOgLocale(lang: Locale): string`** — `OG_LOCALE[lang]`.

**`LanguageSelector` props**:
```typescript
interface Props {
  currentLang: Locale;
  currentPath: string;        // path sin prefijo de locale
  variant: 'desktop' | 'mobile';
}
```

## Estrategia de Testing

El proyecto no tiene test runner declarado (ver `_profile.md`). La verificación de este cambio se apoya en:

1. **Build hook `validate-i18n`** — falla local si los 6 JSONs divergen en estructura. Ejecuta automáticamente con `astro build`.
2. **`astro check`** — valida tipos `Locale`, `TranslationKey` y que `t(key)` recibe keys válidas.
3. **Smoke build local** — `npm run build` debe producir las páginas esperadas (validar conteo: 9 raíz + 9 × 5 locales = 54 HTML files).
4. **Navegación manual en `astro preview`** —
   - Cambio de idioma vía selector en todas las páginas (preserva path actual).
   - `lang=ar` activa `dir="rtl"` y drawer entra desde la izquierda.
   - Lighthouse a11y ≥ 95 en home (es) y home (`/ar/`).
   - Sitemap incluye URLs de los 6 locales.
   - `<link rel="alternate" hreflang>` presente en `<head>` de todas las páginas.
5. **Diff de keys** — `git diff` del `es.json` muestra solo claves nuevas alineadas con el código vigente (no remueve strings de UX writing del PR #12).
6. **Verificación de accesibilidad** — `axe` / Lighthouse en al menos `/`, `/en/`, `/ar/`, `/cotizar`, `/en/cotizar`.

La fase `sdd-verify` ejecuta lo necesario y registra el reporte.
