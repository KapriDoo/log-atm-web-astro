---
status: accepted
date: 2026-05-12
deciders: sdd-design
consulted: exploration.md, astro-docs-i18n
informed: sdd-apply, sdd-verify
capability: i18n-routing
tags: [adr, i18n, routing, astro]
---

# ADR 0002: Routing i18n — carpeta `src/pages/[lang]/` como prefijo explícito

## Contexto

El sitio LOG ATM en Astro 6 necesita generar rutas estáticas para 6 locales (es, en, zh, hi, ar, pt). El español (default) no lleva prefijo en la URL (`/`, `/servicios`, etc.) según `prefixDefaultLocale: false`. Los 5 locales restantes se sirven bajo `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`.

Astro 6 soporta dos patrones estructurales para rutas dinámicas de locale:

1. **`src/pages/[lang]/`**: subcarpeta dinámica que duplica la estructura de páginas para locales no-default. Las páginas españolas permanecen en `src/pages/*.astro`. Las páginas de otros locales van en `src/pages/[lang]/*.astro` con `getStaticPaths()`.
2. **`src/pages/[...lang]/`**: catch-all por página que captura el prefijo y la ruta juntos. Un solo archivo maneja todos los idiomas incluyendo el default.

## Decisión

Usar el patrón **`src/pages/[lang]/`** (carpeta dinámica explícita con subcarpeta dedicada a locales no-default).

Las páginas españolas permanecen en su ubicación actual. Las páginas de los 5 locales no-default viven bajo `src/pages/[lang]/` y exportan `getStaticPaths()` iterando `NON_DEFAULT_LOCALES = ['en', 'zh', 'hi', 'ar', 'pt']`.

## Consecuencias

### Positivas

- **Separación clara**: las rutas españolas (sin prefijo) y las rutas de otros locales son físicamente distintas en el filesystem. No hay lógica de branching para distinguir el locale default del resto.
- **`Astro.currentLocale` funciona sin ambigüedad**: Astro inyecta el locale correcto para cada ruta generada por `getStaticPaths()`. Las páginas en raíz reciben `'es'` automáticamente.
- **Sin conflictos de rutas**: `src/pages/index.astro` (español) y `src/pages/[lang]/index.astro` (otros locales) no compiten porque el prefijo `[lang]` solo matchea segmentos de URL no vacíos.
- **Legibilidad para colaboradores**: la estructura de carpetas refleja la jerarquía de URLs directamente.
- **TypeScript limpio**: `params.lang` en los archivos de `[lang]/` siempre es uno de los 5 locales no-default; el español nunca pasa por ahí.

### Negativas

- **Duplicación de archivos de página**: cada página tiene dos versiones físicas (español en raíz, resto en `[lang]/`). Para 9 páginas son 9 archivos extra bajo `[lang]/`. Esto es DRY relativo — los archivos son casi idénticos, solo difieren en `getStaticPaths()`. El contenido real vive en los JSONs de traducción, no en las páginas.
- **Mantenimiento**: si se añade una nueva página, hay que crearla en ambos niveles. Mitigado con una plantilla base de página que se reutiliza.

## Alternativas descartadas

### Opción A: `src/pages/[...lang]/` (catch-all por página)

Un archivo único por página maneja todos los locales, incluyendo el default. `params.lang` es `undefined` para español o `'en'` etc. para otros.

**Descartada porque**:
- En output estático, Astro ya resuelve `index.astro` en raíz para la URL `/`. El catch-all `[...lang]/index.astro` genera conflicto si también queremos `params.lang = undefined` para `/`. El comportamiento depende del orden de resolución de Astro y no es explícito.
- Requiere `if (!params.lang || params.lang === 'es')` en `getStaticPaths()` para incluir el locale default, que es más propenso a errores.
- `Astro.currentLocale` puede comportarse de forma inesperada cuando el catch-all captura un path vacío como locale.
- La mezcla de lógica default/no-default en un solo archivo dificulta la lectura.

### Opción B: Carpetas estáticas por idioma (`src/pages/en/`, `src/pages/zh/`, …)

Crear una carpeta estática por idioma con todas las páginas duplicadas.

**Descartada porque**:
- 5 idiomas × 9 páginas = 45 archivos estáticos con contenido prácticamente idéntico.
- Viola DRY de forma extrema: cualquier cambio de layout o estructura requiere tocar los 45 archivos.
- No escala: añadir un 7º idioma implica crear 9 archivos nuevos.

## Notas de implementación

La fuente de los locales no-default se centraliza en `src/i18n/config.ts`:

```typescript
export const NON_DEFAULT_LOCALES = ['en', 'zh', 'hi', 'ar', 'pt'] as const;
```

Cada archivo en `src/pages/[lang]/` exporta:

```typescript
export function getStaticPaths() {
  return NON_DEFAULT_LOCALES.map(lang => ({ params: { lang } }));
}
```

El locale activo se obtiene en el frontmatter de cada página como:

```typescript
const lang = (Astro.currentLocale ?? 'es') as Locale;
```

## Estado

**Accepted** — 2026-05-12

No supersede ningún ADR previo. ADR 0001 cubre una decisión de assets, no relacionada.
