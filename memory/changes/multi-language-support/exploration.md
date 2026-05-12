# Exploración: multi-language-support

## Estado Actual

El sitio LOG ATM es un proyecto **Astro 6.1.5** con output estático, sin ningún soporte i18n configurado. Toda la interfaz está en español (es_CL) hardcodeado en componentes `.astro` y en el archivo central de constantes `src/lib/constants.ts`. No existe routing por idioma, no hay archivos de traducción, no hay selector de idioma, y no hay hreflang tags. El `<html lang="es">` está fijo en el layout base.

[fuente: código /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support/log-atm-web-astro/src/layouts/BaseLayout.astro]

---

## Configuración Astro Actual

- **Archivo**: `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support/log-atm-web-astro/astro.config.mjs`
- **Versión**: Astro 6.1.5 (soporta `i18n` nativo desde Astro 4.0)
- **Output mode**: estático (default, sin `output: 'server'`)
- **Integrations**: `@astrojs/react`, `@astrojs/sitemap`, `@tailwindcss/vite`, `astro-icon`
- **Sin `i18n` configurado** en `astro.config.mjs` — el bloque de configuración no tiene ninguna clave `i18n`
- **Site URL**: `https://logatm.com`

[fuente: código /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support/log-atm-web-astro/astro.config.mjs]

---

## Estructura de Páginas

```
src/pages/
  index.astro           ← Home (6 secciones: Hero, Stats, Services, Why, Industries, CTA)
  servicios.astro       ← Página de todos los servicios (texto largo inline)
  nosotros.astro        ← Página About
  contacto.astro        ← Formulario de contacto
  cotizar.astro         ← Formulario de cotización
  industrias.astro      ← Industrias (datos inline + INDUSTRY_IMAGES)
  404.astro             ← Página de error (texto hardcoded en español)
  servicios/
    carga-aerea.astro   ← Detalle servicio (schema JSON-LD hardcodeado en es)
    carga-maritima.astro← Detalle servicio
```

Rutas actuales: todas estáticas, sin `getStaticPaths`, sin parámetros dinámicos de idioma.
Routing multi-idioma objetivo: `/` (es, default), `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`

[fuente: código src/pages/**]

---

## Contenido Hardcodeado en Español

### 1. `src/lib/constants.ts` — Fuente central de texto estructurado
- **`NAV_LINKS`**: labels de navegación (`'Servicios'`, `'Industrias'`, `'Por qué LOG ATM'`, `'Contacto'`)
- **`SERVICES`**: 11 servicios con `title`, `desc`, `tag` en español
- **`WHY_ITEMS`**: 4 razones con `title`, `desc`, `metric`, `sub`
- **`INDUSTRIES`**: 12 industrias con `name`, `sub`
- **`STATS`**: 4 stats con `label` en español
- **`LIVE_ROUTES`**: nombres de puertos (internacionales, no requieren traducción)
- **`SITE.tagline`**: `'Logística a tu medida'`
- **`SEO.defaultDescription`**: texto en español
- **`FOOTER_SERVICES`** y **`FOOTER_COMPANY`**: labels de enlaces

[fuente: código /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support/log-atm-web-astro/src/lib/constants.ts]

### 2. `src/layouts/BaseLayout.astro` — SEO y metadatos
- `<html lang="es">` fijo (línea 92)
- `DEFAULT_DESC`: string en español (línea 14)
- `og:locale` hardcodeado a `es_CL` (línea 111)
- Schema JSON-LD `slogan: 'Logística a tu medida'` (línea 56)
- Schema breadcrumb `name: 'Inicio'` (línea 80)
- Skip link `'Saltar al contenido principal'` (línea 137)
- Sin `hreflang` alternate links

[fuente: código /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support/log-atm-web-astro/src/layouts/BaseLayout.astro]

### 3. Componentes de secciones — texto inline
| Componente | Texto hardcodeado clave |
|------------|------------------------|
| `HeroSection.astro` | eyebrow, h1, lead, CTA labels, "Rutas frecuentes", "Cobertura" |
| `CTASection.astro` | h2, lead, form labels, select options en español |
| `ServicesSection.astro` | eyebrow "Qué hacemos", h2, desc, "Conocer más" |
| `WhySection.astro` | eyebrow, h2, desc, "2 minutos para entender cómo trabajamos" |
| `IndustriesSection.astro` | eyebrow "Industrias", h2, desc |
| `StatsSection.astro` | sin texto directo (consume STATS de constants.ts) |
| `Footer.astro` | "Nosotros", headings de columnas, copyright, descripción de marca |
| `Navbar.astro` | "Cotiza ahora", aria-labels, "Abrir menú", "Cerrar menú" |

[fuente: código src/components/sections/*.astro, src/components/ui/*.astro]

### 4. Páginas con texto extenso inline (no en constants.ts)
- `servicios.astro`: array local `services[]` con 11 objetos (title, description, features) en español
- `nosotros.astro`: cards con textos completos, cita de CEO en español
- `contacto.astro`: labels de formulario, títulos de sección, placeholders
- `cotizar.astro`: labels de formulario completo en español
- `industrias.astro`: array local `industries[]` con 12 objetos (name, description, specialties)
- `servicios/carga-aerea.astro`: features inline array, schema JSON-LD en español
- `404.astro`: título y mensaje de error en español

---

## Componentes que Requieren Traducción

| Componente | Prioridad | Complejidad |
|------------|-----------|-------------|
| `BaseLayout.astro` | Crítica | Alta (lang attr, hreflang, og:locale, schema, skip link) |
| `Navbar.astro` | Crítica | Media (nav labels via constants, CTA hardcoded, aria-labels) |
| `HeroSection.astro` | Crítica | Media (texto mixto inline + constants) |
| `CTASection.astro` | Alta | Alta (form con select options hardcodeados) |
| `Footer.astro` | Alta | Media (headings, descripción, copyright) |
| `ServicesSection.astro` | Alta | Baja (solo eyebrow/h2/desc + "Conocer más" inline) |
| `WhySection.astro` | Alta | Baja (eyebrow/h2/desc inline) |
| `IndustriesSection.astro` | Alta | Baja (eyebrow/h2/desc inline) |
| `StatsSection.astro` | Media | Muy baja (consume STATS de constants) |
| `src/lib/constants.ts` | Crítica | Alta (fuente de datos de toda la UI) |

---

## Assets Dependientes de Idioma

- **`public/og-default.svg`**: OG image sin texto visible (seguro para todos los idiomas)
- **`public/manifest.json`**: `"lang": "es"`, `"dir": "ltr"` — requiere actualización o versiones por idioma
- **Imágenes de servicios e industrias** (`public/images/`): fotografías sin texto superpuesto — no requieren traducción
- **`public/logo.png`**, **`public/logo.svg`**: logos sin texto traducible
- **Schema JSON-LD** en `BaseLayout.astro` y `servicios/carga-aerea.astro`: `slogan`, `description`, breadcrumb names hardcodeados en español — deben parametrizarse

[fuente: código public/manifest.json, public/og-default.svg, src/layouts/BaseLayout.astro]

---

## Routing Actual vs Objetivo

### Actual
- Todas las páginas en raíz: `/`, `/servicios`, `/nosotros`, `/contacto`, `/cotizar`, `/industrias`
- Sub-rutas: `/servicios/carga-aerea`, `/servicios/carga-maritima`
- Sin parámetros dinámicos

### Objetivo con Astro i18n nativo (Astro 4+)
```
/                    → español (default, sin prefijo)
/en/                 → English
/zh/                 → 中文
/hi/                 → हिन्दी
/ar/                 → عربي (RTL)
/pt/                 → Português
```

Astro 6 soporta `i18n.defaultLocale` con `routing.prefixDefaultLocale: false` para mantener español en `/`.

[fuente: código astro.config.mjs]

---

## SEO Actual

- **`<html lang="es">`** fijo — necesita ser dinámico por ruta
- **No hay hreflang** — crítico para SEO multi-idioma
- **`og:locale`** hardcodeado a `es_CL` — necesita variantes por idioma
- **Sitemap**: `@astrojs/sitemap` instalado pero sin configuración i18n — generará solo rutas en español
- **robots.txt**: referencia `sitemap-index.xml` — compatible con multi-sitemap
- **Schema JSON-LD**: textos en español, sin traducción

[fuente: código src/layouts/BaseLayout.astro:92-111, public/robots.txt]

---

## Soporte RTL Existente

- **Tailwind CSS v4**: no hay plugin `@tailwindcss/rtl` instalado
- **CSS global** (`global.css`): sin reglas `[dir="rtl"]` ni `logical properties` (usa `margin-inline`, `padding-inline` — estas sí son logical)
- **`manifest.json`**: tiene `"dir": "ltr"` explícito
- **Navbar drawer**: usa `right: 0` para el panel — con RTL debería estar en `left: 0`
- **Conclusión**: no hay soporte RTL. Árabe requiere activación explícita via `<html dir="rtl">` + reglas CSS específicas para el drawer y componentes que usan posicionamiento absoluto

[fuente: código src/styles/global.css, src/components/ui/Navbar.astro:358, public/manifest.json]

---

## Dependencias Relevantes

### Instaladas
| Paquete | Versión | Relevancia i18n |
|---------|---------|-----------------|
| `astro` | ^6.1.5 | i18n nativo integrado (desde v4.0) |
| `@astrojs/sitemap` | ^3.7.2 | Soporta `i18n` de Astro automáticamente |
| `@astrojs/react` | ^5.0.3 | Islas React — si hay componentes React con texto, necesitan i18n también |

### No instaladas — candidatas
| Paquete | Propósito | Veredicto |
|---------|-----------|-----------|
| `astro-i18n-aut` | Routing automático | **INNECESARIO** — Astro 6 tiene i18n nativo |
| `i18next` | Runtime translations | **INNECESARIO** — sitio estático, archivos JSON son suficientes |
| `react-i18next` | React translations | Solo si hay islas React con texto |
| `@astrojs/i18n` | No existe como paquete separado | El i18n está en Astro core |

**Recomendación**: usar solo el i18n nativo de Astro 6 + archivos JSON de traducción. No añadir dependencias externas.

[fuente: código package.json]

---

## Approaches Posibles

### Approach A: i18n Nativo de Astro 6 + JSON planos (recomendado)
Configurar `i18n` en `astro.config.mjs` con `defaultLocale: 'es'` y `prefixDefaultLocale: false`. Crear `src/i18n/[locale].json` con todas las strings. Usar una función helper `t(key, locale)` en cada componente/página. Generar rutas dinámicas con `getStaticPaths()` para cada página.

- **Pros**:
  - Sin dependencias externas
  - Routing manejado nativamente (Astro genera `/en/`, `/zh/`, etc.)
  - `@astrojs/sitemap` genera hreflang automáticamente con la config i18n
  - TypeScript-friendly con types generados
  - Compatible con output estático
  - Mantenible: un archivo JSON por idioma
- **Contras**:
  - Requiere refactoring significativo: todas las páginas deben convertirse a rutas dinámicas `[...locale]/index.astro` o estructura de carpetas por idioma
  - Las páginas con mucho texto inline (servicios.astro, industrias.astro) requieren extracción a JSON
  - Sin interpolación avanzada ni pluralización nativa (se puede implementar manualmente)
- **Esfuerzo**: L

### Approach B: Estructura de carpetas por idioma
Duplicar la carpeta `src/pages/` como `src/pages/en/`, `src/pages/zh/`, etc., con cada página importando su traducción desde JSON.

- **Pros**:
  - Mínima abstracción — fácil de entender
  - Permite diferenciación visual por idioma si necesario
- **Contras**:
  - Duplicación masiva de archivos (7 páginas × 6 idiomas = 42 archivos)
  - Viola DRY: cambios en layout requieren tocar todos los idiomas
  - No escala
- **Esfuerzo**: XL (por mantenimiento a largo plazo)

### Approach C: Approach A + astro-i18n-aut (routing automático)
Paquete `astro-i18n-aut` genera automáticamente las rutas para cada idioma sin refactoring de carpetas.

- **Pros**: menos cambio estructural en pages
- **Contras**: dependencia extra, no necesaria para Astro 6 que ya tiene routing i18n nativo
- **Esfuerzo**: M

---

## Recomendación

**Approach recomendado**: A — i18n Nativo de Astro 6 + JSON planos

**Justificación**: Astro 6.1.5 tiene soporte i18n nativo completo. La arquitectura recomendada es:

1. Configurar `i18n` en `astro.config.mjs` con `defaultLocale: 'es'`, 6 locales, `prefixDefaultLocale: false`
2. Crear `src/i18n/translations/` con un JSON por idioma (`es.json`, `en.json`, `zh.json`, `hi.json`, `ar.json`, `pt.json`)
3. Crear helper `src/i18n/utils.ts` con función `t(locale, key)` y `getLangFromUrl(url)`
4. Migrar constantes de texto de `src/lib/constants.ts` a los JSONs
5. Convertir páginas a estructura dinámica compatible con i18n de Astro
6. Añadir `lang` y `dir` dinámicos en `BaseLayout.astro`
7. Añadir hreflang links en `<head>`
8. Implementar selector de idioma en Navbar
9. Para árabe: añadir `dir="rtl"` en `<html>` y reglas CSS `[dir="rtl"]` para Navbar drawer y elementos posicionados

---

## Riesgos Identificados

1. **Volumen de texto a traducir**: ~500+ strings en español distribuidas en 7 páginas + 4 secciones + constantes. La calidad de las traducciones (especialmente zh, hi, ar) requiere revisión nativa — las traducciones automáticas pueden dañar la marca.

2. **RTL para árabe**: el Navbar drawer usa `right: 0` y `slideIn` desde la derecha. Con RTL debe invertirse. También el layout hero-b tiene una grid LTR. Requiere QA específico en árabe.

3. **SEO durante migración**: cambiar la estructura de rutas rompe URLs existentes indexadas. Se necesitan redirects de `/servicios` → `/servicios` (es default, sin prefijo) durante la transición.

4. **Formularios en páginas .astro sin backend**: `contacto.astro` y `cotizar.astro` tienen `action="#"` — no hay backend real. Los placeholders y labels en árabe/chino/hindi requieren fuentes que soporten esos scripts (las fuentes actuales Inter/Outfit no cubren CJK ni Devanagari).

5. **`public/manifest.json`** con `"lang": "es"` fijo — si se sirve multi-idioma, el PWA manifest debería ser dinámico o tener una versión por idioma.

6. **Schema JSON-LD** bilingüe: el schema `FreightForwarder` en BaseLayout tiene `slogan` y `description` en español — recomendable parametrizar o mantener en español (idioma de la empresa).
