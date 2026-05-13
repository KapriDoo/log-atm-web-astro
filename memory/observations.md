# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>

## 2026-05-10 | architecture | redesign-experiencia-sector | Astro Assets + Sharp para optimización de imágenes
Se decide usar `astro:assets` con Sharp para procesar las 14 imágenes de industrias en build time, generando WebP/AVIF y previniendo CLS. Las imágenes fuente van en `src/assets/industries/`, no en `public/`. Se crea ADR-0001 documentando la decisión y sus alternativas descartadas (public/ estático, CDN externo, lazy loading manual con Intersection Observer).

## 2026-05-12 | follow-up | rescue-multi-language-support | nginx 404 multilingüe decorativo
**Detectado por**: sdd-judgment (Juez 2) en `rescue-multi-language-support`
**Ubicación**: `log-atm-web-astro/default.conf`, `log-atm-web-astro/nginx.conf`
**Descripción**: las páginas `/[lang]/404.astro` se generan estáticamente, pero la regla nginx actual `try_files $uri $uri/index.html /index.html` redirige cualquier URL inexistente al index español con status 200, produciendo soft-404 para URLs `/en/foo`, `/ar/bar`, etc. Las páginas 404 multilingües nunca se sirven.
**Promoción sugerida**: `sdd new fix-nginx-404-per-locale --domain fix` — añadir `error_page 404 /[lang]/404.html` por bloque location y propagar `try_files` con fallback al 404 del locale.
