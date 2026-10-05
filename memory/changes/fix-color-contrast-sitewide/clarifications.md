## Iteración 1 — Preguntas (2026-10-03)

1. **Texto blanco sobre fotos y video** (`.svc-card__num/__desc/__title`, `.ind-card__index/__sub`, `.hero-b__*`, `.btn--ghost-light` sobre el hero). Axe los deja como `incomplete`, no como violaciones. El muestreo de píxeles da una mediana aceptable, pero el p5 baja hasta entre 1.0 y 4.5:1 donde el degradado no cubre el texto. Opciones: (a) diferirlos a un cambio posterior que rediseñe el overlay; es lo que asume la propuesta. (b) Incluirlos en este cambio reforzando el degradado o el overlay de cada tarjeta y del hero, lo que suma diseño visual y una revisión manual.
2. **Botón WhatsApp de los correos** (`src/lib/email-templates.ts:283,295`, `#fff` sobre `#25D366` = 1.98:1). El HTML de correo usa estilos inline y no puede consumir los tokens de `tokens.css`. Si se corrige, aparece un hex nuevo (`#111b21`) fuera de `tokens.css`, en contra de la decisión «sin hex nuevos fuera de tokens.css». Opciones: (a) dejarlo fuera de este cambio y registrarlo como deuda; es lo que asume la propuesta. (b) Incluirlo con `#111b21` inline, como excepción explícita a esa regla para el canal de correo.

## Iteración 1 — Respuestas (2026-10-04)

1. **Texto blanco sobre fotos y video** → **(a) diferir.** Corregirlo exige rediseñar overlays y degradados (decisión visual no tomada, verificación manual y heurística) y agrandaría un cambio que ya es L. Queda registrado aparte como pendiente que requiere decisión de diseño.
2. **Botón WhatsApp de los correos** → **(b) incluir**, con `#111b21` inline sobre `#25D366` en `src/lib/email-templates.ts:283,295` (8.80:1), aplicando la misma decisión de marca que el botón del sitio. Los hex de `lib/email-templates.ts` son una excepción a «sin hex nuevos fuera de `tokens.css`», porque los clientes de correo exigen estilos inline. Según el coordinador, esa excepción ya fue aceptada en la validación de la auditoría; la propuesta debe dejarla declarada de forma explícita.

Resto de la propuesta sin cambios. Se confirman `--color-accent-800` (declarado en `:root` y `@theme`) en lugar de un token por sección, `.channel--wa` con fondo sólido, la corrección de `DESIGN.md:77-83` y el alcance ampliado. Punto a verificar en design/verify: `.error-page__code` con primary-500 (4.10:1) solo cumple como texto grande, así que hay que confirmar que mide ≥ 24px (o ≥ 18.66px en bold) en todos los breakpoints.

## Para el MR

- **Cambio visual de marca**: el texto de los botones CTA pasa a azul marino oscuro sobre el verde de marca, y el de los botones de WhatsApp (sitio y correos) a casi negro sobre el verde de WhatsApp. Los rótulos de sección adoptan un verde de acento más oscuro (`--color-accent-800`) y `.channel--wa` pasa a fondo sólido.
- **Tabla antes/después**: el PR incluye la tabla antes/después de cada color modificado, con ratio de contraste.
- **Excepción a «sin hex nuevos fuera de `tokens.css`»**: el hex inline `#111b21` del botón WhatsApp en `src/lib/email-templates.ts` (los clientes de correo exigen estilos inline). Queda declarada en `DESIGN.md`.
- **Deuda declarada**: el texto blanco sobre fotos y video (`.svc-card__*`, `.ind-card__*`, `.hero-b__*`, `.btn--ghost-light`) queda fuera de este cambio y requiere una decisión de diseño sobre overlays y degradados; las páginas con fotos pueden seguir con `incomplete` reales en axe.
