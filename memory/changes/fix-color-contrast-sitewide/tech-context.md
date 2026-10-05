# Tech context: fix-color-contrast-sitewide

**Librerías consultadas**: Tailwind CSS 4.2.2 (`tailwindcss`, `@tailwindcss/vite`) — Context7 `/tailwindlabs/tailwindcss.com`
**Fecha de consulta**: 2026-10-05

## Tailwind CSS v4 — `@theme`, capas y variables

### Orden de capas que inyecta `@import "tailwindcss"`

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

Consecuencias para este cambio:

- Las variables de `@theme` se emiten como custom properties en `:root` dentro de `@layer theme`.
- `tokens.css` declara su bloque `:root` dentro de `@layer base`, que va después de `theme`: para un mismo nombre de variable, el valor de `:root` (capa `base`) gana en runtime. El valor de `@theme` registra la utilidad (`bg-*`, `text-*`) y queda como respaldo solo si `:root` no declara ese nombre.
- Reglas sin capa (las hojas `styles/pages/*.css`, `styles/sections/*.css` y los `<style>` scoped de Astro) ganan a toda regla en capa (`base`, `components`) sin importar la especificidad. Una regla de `@layer components` como `.btn--cta:hover` pierde ante una regla sin capa como `.cta-final .btn--cta` en cualquier estado.

### `@theme` con referencias a otras variables

- Sin `inline`, la utilidad emite `var(--color-x)` y la variable se resuelve donde se define, lo que puede dar valores inesperados si referencia variables declaradas más abajo en el árbol.
- Con `@theme inline { --color-x: var(--y); }` la utilidad emite directamente `var(--y)`.
- El proyecto declara en `@theme` valores literales (hex resueltos), no referencias; los tokens nuevos siguen ese patrón, por lo que `inline` no aplica.

### Uso de variables de tema en CSS propio

- Dentro de `@layer components` o en CSS sin capa se consumen con `var(--color-*)`; es el patrón que usa todo el proyecto (no hay utilidades de color de Tailwind en el markup).
