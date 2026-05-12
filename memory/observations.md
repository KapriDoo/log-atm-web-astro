# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>

## 2026-05-10 | architecture | redesign-experiencia-sector | Astro Assets + Sharp para optimización de imágenes
Se decide usar `astro:assets` con Sharp para procesar las 14 imágenes de industrias en build time, generando WebP/AVIF y previniendo CLS. Las imágenes fuente van en `src/assets/industries/`, no en `public/`. Se crea ADR-0001 documentando la decisión y sus alternativas descartadas (public/ estático, CDN externo, lazy loading manual con Intersection Observer).

## 2026-05-12 | architecture | multi-language-support | Routing i18n con carpeta `src/pages/[lang]/` (ADR-0002)
Para el cambio multi-language-support se adopta la estructura `src/pages/[lang]/` con `getStaticPaths()` para los 5 locales no-default. Las páginas españolas permanecen en raíz sin prefijo. Se descarta el catch-all `[...lang]` por conflictos de resolución de rutas con Astro y ambigüedad en `Astro.currentLocale`.

## 2026-05-12 | architecture | multi-language-support | Validación de claves i18n como build hook npm `prebuild` (ADR-0003)
La paridad de claves entre `es.json` (master) y los 5 JSONs de locale se valida mediante script TypeScript standalone invocado en `prebuild`. Falla con exit 1 si hay claves missing o extra. Se descarta Vitest (sin framework de testing instalado, YAGNI) y CI-only check (feedback tardío). El tipo `TranslationKey` es complementario, no sustituto.

## 2026-05-12 | incident | multi-language-support | Conflicto de routing por `i18n.fallback` — fix en iteración correctiva de sdd-apply
La iteración inicial de sdd-apply configuró `astro.config.mjs` con `i18n.fallback: { en: 'es', ... }`. Astro v6 inspecciona ese campo y **auto-genera rutas fallback** (`/en/servicios`, `/ar/contacto`, …) derivadas de las páginas españolas en raíz. Esas rutas auto-generadas adquieren prioridad sobre las rutas dinámicas `src/pages/[lang]/*.astro`, bloqueando su renderizado y emitiendo 30 warnings `Could not render … as it conflicts with higher priority route`. El build completaba sin error pero `dist/en/servicios/index.html` (y todas las páginas no-default × no-index) quedaban sin generar. Fuente del problema verificada en `node_modules/astro/dist/core/routing/create-manifest.js` líneas 591-650 (`if (i18n.fallback) { ... }` registra rutas tipo `fallback` con prioridad alta). Fix: eliminar `i18n.fallback` del config. Tras el cambio, las 6 páginas × 6 locales se generan correctamente (44 HTML totales) sin warnings. El fallback de contenido se preserva a nivel de claves de traducción en `t()` (utils.ts: si la clave no existe en el locale activo, retorna el valor de es.json). El AC "redirige al contenido en español como fallback ante ruta no existente" se reinterpreta así: rutas inexistentes (`/fr/`, `/en/nonexistent`) sirven el 404 estándar (en español, desde `src/pages/404.astro`) y las claves faltantes en un JSON no-es muestran el valor español. Decisión documentada como inline comment en `astro.config.mjs`.
