# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>

## 2026-05-10 | architecture | redesign-experiencia-sector | Astro Assets + Sharp para optimización de imágenes
Se decide usar `astro:assets` con Sharp para procesar las 14 imágenes de industrias en build time, generando WebP/AVIF y previniendo CLS. Las imágenes fuente van en `src/assets/industries/`, no en `public/`. Se crea ADR-0001 documentando la decisión y sus alternativas descartadas (public/ estático, CDN externo, lazy loading manual con Intersection Observer).
