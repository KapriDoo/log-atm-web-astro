---
verdict: PASS
---

# Verify Report: fix-color-contrast-sitewide

**Fecha**: 2026-10-06

Verificación posterior a la primera corrección de la revisión adversarial, sobre el HEAD `6d9dba7` (integra `main` con #34 y #35), con evidencia propia: cada cifra y salida de este reporte vive en un bloque `verify-report.N` (sección `## Evidencia`) y la prosa los cita por id. No se usó `apply-evidence.md` para dar por cumplido ningún criterio y `scripts/axe-audit.mjs` no se usó. La app se sirvió con `astro preview` (puerto 4331) y Chrome 148 vía `playwright-core`; el preview se bajó al terminar. El proyecto no declara test runner ni instrumento de cobertura: la «suite» es el conjunto de comandos del perfil (`.1` paridad i18n, `.2` enlaces i18n, `.3` build, `.4` peso de imágenes), más las comprobaciones por script de esta fase.

Mapa de bloques: `.5` axe `color-contrast` sobre 21 URL × 2 anchos × 2 preferencias de movimiento; `.6` axe con menú móvil abierto, pasos del asistente, pantalla de éxito y mensajes del formulario de contacto; `.7` estados forzados por CDP (reposo, cursor, foco, presionado) en es/en/pt; `.8` viñeta `✓` del asistente y sello de éxito; `.9` mensaje de estado del formulario de contacto (envío, éxito, error de validación, error de servidor) y botón tras el envío; `.10` botones del correo en los tres builders; `.11` barrido de literales de color (`#hex`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, `oklch()`, colores con nombre); `.12` reglas estáticas (paridad de tokens, huérfanos, `outline: none`, presencia de las correcciones del juicio); `.13` coherencia del grafo; `.14` visor de industrias por píxeles en 9 configuraciones; `.15` muestreo de píxeles de textos sobre degradados; `.16` anillo de foco con teclado real en las 21 URL; `.17` opciones del selector de idioma (escritorio y móvil) y campos de formulario; `.18` código 404; `.19` pares del correo y fondo CTA contra `main`; `.20` CTA de la sección final en las 4 páginas y enlace de página actual; `.21` enlaces de migas de pan sobre el hero por píxeles; `.22` títulos `h1`-`h6` visibles de las 21 URL en dos anchos (texto oscuro heredado sobre fondo oscuro y títulos bajo el umbral); `.23` y `.24` salidas de `comprobar`.

## Resultados por Spec

Umbrales: 4.5:1 texto normal, 3:1 texto grande y gráficos (los fija cada spec).

### Botón CTA verde legible en todos sus estados (`cta-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto azul marino sobre verde ≥ 4.5:1 en reposo, cursor, foco y presionado | ✅ | `.7` (`cta-hero`, `drawer-cta`, `svc-tag-cta`, `form-submit`, `404-cta`, `btn-primary-lg`), sin fila bajo el umbral en los tres idiomas |
| Cursor ≥ 5:1 | ✅ | `.7` filas `cta-hero-hover>=5` y `404-cta-hover>=5` |
| Etiqueta de servicios, envío de contacto y botón 404 ≥ 4.5:1 en todos los estados | ✅ | `.7`; el botón de envío conserva el par también tras el envío exitoso (`.9`) |
| Marca de selección, sello de éxito y pin de oficina ≥ 3:1 | ✅ | `.7` (`mode-check`, `exito seal`, `pin-oficina`) y `.8` (sello) |
| El fondo verde no cambia | ✅ | `.19`: `--color-cta` y `accent-500` idénticos a `main` |
| La marca `✓` de cada paso completado usa el texto oscuro del CTA y cumple ≥ 4.5:1 | ✅ | `.8`: en los tres idiomas y con 1, 2 y 3 pasos completados, el color calculado de la viñeta es el par CTA; el muestreo de píxeles de su centro muestra un glifo oscuro sobre el verde (no blanco). La cifra del muestreo queda bajo la calculada porque el trazo fino se antialiasa: el criterio lo cumple el color calculado, y el muestreo confirma que el glifo es oscuro. `.6` (axe con 3 viñetas completadas) no reporta violaciones, aunque el glifo único queda como nodo `incomplete`, razón por la que se mide aparte |

**Scenarios verificados**: 7/7

### Botones azul de marca y enlace de salto (`brand-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones azul, enlace de salto y sección final ≥ 4.5:1 en los cuatro estados | ✅ | `.7` (`brand-nav`, `brand-servicios`, `skip-link`, `cta-final-btn-*`, `exito btn-brand`) y `.20` |
| CTA de la sección final azul con texto claro en portada, servicios, industrias y nosotros | ✅ | `.20`: 4 páginas × 3 idiomas × 4 estados; `.btn--cta` y `.cta-final__btn` con fondo azul de marca y texto blanco |
| Ningún botón de la sección final con texto oscuro sobre azul | ✅ | `.20` exige texto blanco sobre los dos azules del par, sin fila fallida |

**Scenarios verificados**: 4/4

### Botones WhatsApp legibles (`whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones de WhatsApp ≥ 4.5:1 en los cuatro estados | ✅ | `.7` (`drawer-wa`, `cta-final-btn-wa`, `exito btn-wa`) y `.20` (sección final en 4 páginas) |
| Bloque del canal con fondo uniforme y texto ≥ 4.5:1 en toda su superficie | ✅ | `.7` (`channel-wa` y sus textos) y `.15` (muestreo de píxeles sobre el nombre y el valor del canal); el fondo es el token sólido (`.12`/`.19`) |
| El verde de fondo sigue siendo el verde reconocible de la plataforma | ✅ | `.19` y `.12`: `--color-whatsapp` coincide en `:root` y `@theme` y es el que usa `.btn--wa` |

**Scenarios verificados**: 3/3

### Botón WhatsApp del correo (`email-whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto casi negro sobre verde de WhatsApp ≥ 4.5:1 | ✅ | `.10` en los tres builders |
| Mismo par que el botón del sitio | ✅ | `.19` compara contra `tokens.css` |
| Conserva condición de aparición y enlace | ✅ | `.10`: sin teléfono no hay botón WhatsApp; `.19`: sin cambios en los enlaces |

**Scenarios verificados**: 2/2

### Botón «Responder por email» del correo (`email-reply-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto blanco sobre azul de marca ≥ 4.5:1 | ✅ | `.10`: renderizado en Chrome, tres builders; el botón mide por encima del umbral, también por muestreo de píxeles del botón renderizado, y ya no es texto grande (15px/700), por lo que aplica 4.5:1 |
| Mismo par que el botón azul sólido del sitio | ✅ | `.19`: fondo y texto del correo idénticos a `--color-brand-solid` y `--color-brand-solid-text`; el comentario de origen nombra el token y la constante la consumen las dos ramas |
| Conserva condición de aparición, enlace y color azul corporativo | ✅ | `.10`: aparece solo con email (variantes `email+tel` y `solo-email`) y no en `solo-tel` ni `ninguno`; `.19`: el `mailto:` conserva `escapeHtml` y `encodeURIComponent`; `.12`: ningún botón conserva `#4A7BB5` como fondo |

**Scenarios verificados**: 2/2

### Estados de los enlaces de navegación (`nav-link-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Menú principal ≥ 4.5:1 con cursor, foco, presionado y página actual | ✅ | `.7` (`nav-link`, `nav-link-activo`) y `.20` (página actual en servicios, industrias y nosotros, tres idiomas) y `.7` (`nav-link-activo`) |
| Menú móvil ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.7` (`movil drawer-link`) y `.6` (axe con el menú abierto en las 21 URL) |
| La página actual se distingue sin depender del color | ✅ | ningún bloque lo mide con instrumento; el subrayado de `.nav__link.is-active` está en `Navbar.astro` (`text-decoration: underline`), leído en el diff del cambio |

**Scenarios verificados**: 3/3

### Textos de acento verde (`accent-text-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Rótulos de sección ≥ 4.5:1, incluido el gris alterno | ✅ | `.7` (`eyebrow`, `eyebrow-why`) y `.5` |
| Número de paso, etiqueta del formulario y plazo ≥ 4.5:1 | ✅ | `.7` (`quote-step-num`, `contact-pill`, `quote-sla`) y `.15` (etiqueta del formulario por píxeles) |
| Un único tono de acento oscuro en la paleta | ✅ | `.12`: `--color-accent-800` presente en `:root` y `@theme`, igual en ambos |

**Scenarios verificados**: 3/3

### Títulos sobre fondos oscuros y fotografías (`dark-surface-heading-legibility`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Nombre de cada industria ≥ 4.5:1 sobre su foto | ✅ | `.14`: las 12 industrias, nueve configuraciones (390 a 1440 px, es/en/pt); el nombre queda sobre el umbral en el peor píxel de todas |
| Título del resumen de cotización ≥ 4.5:1 | ✅ | `.7` (`quote-title`) y `.15` |
| Ningún título sobre fondo oscuro con color oscuro heredado | ✅ | `.22`: ningún título visible tiene texto oscuro sobre fondo oscuro en las 21 URL y dos anchos; los únicos títulos con algún píxel bajo 4.5:1 son de texto claro sobre fotos (`svc-card__title`, `ind-card__name`, `hero-b__title`, solo en `/` y `/servicios/`), deuda declarada fuera de este alcance (hallazgo 2) |

**Scenarios verificados**: 2/2

### Valores pendientes del resumen (`quote-summary-empty-values-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| «Por definir» ≥ 4.5:1 sobre blanco | ✅ | `.7` (`quote-empty`) y `.15` |
| Un valor pendiente se distingue de uno completado | ✅ | El estilo `.v.empty` conserva cursiva y peso 400 frente al valor normal (diff de `cotizar.css`); la distinción es visual y no se midió con un instrumento |

**Scenarios verificados**: 1/1

### Textos de apoyo sobre superficies oscuras (`secondary-text-dark-surface-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Aviso y mensaje de error de la sección final ≥ 4.5:1 | ✅ | `.7` y `.15` (aviso, error y éxito por píxeles, en 1440 y 390 px, tres idiomas) |
| Números y total del directorio de industrias ≥ 4.5:1 | ✅ | `.7` (`ind-item-num`), `.15` y `.14` (contador) |
| Etiqueta de paso de «Cómo trabajamos» ≥ 4.5:1 | ✅ | `.7` (`howwork-step`) |
| Migas de pan de los heroes internos ≥ 4.5:1 | ✅ | `.21`: servicios, industrias, nosotros y contacto, tres idiomas, 1440 y 390 px, peor píxel contra el fondo real del hero sin fallos; `.5` sin violaciones en esas páginas |
| El contador se muestra sobre una pastilla ajustada a su contenido | ✅ | `.14`: la pastilla mide una fracción del ancho del visor en todas las configuraciones y `align-self` es `flex-start` |

**Scenarios verificados**: 4/4

### Código decorativo de la página 404 (`error-page-code-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| ≥ 3:1 en los tres idiomas | ✅ | `.18` y `.7` |
| Tamaño calculado ≥ 24 px en todos los anchos | ✅ | `.18`: 320 a 1920 px, tres idiomas, mínimo 96px |
| Sigue siendo decorativo para lectores de pantalla | ✅ | `.18`: `aria-hidden="true"` |

**Scenarios verificados**: 2/2

### Filtro activo de servicios (`services-filter-active-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Filtro activo ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.7` (`svc-filter-activo`) |
| Los filtros inactivos conservan su respuesta al cursor | ✅ | `.7` (`svc-filter-inactivo`): el color y el contraste cambian entre reposo y cursor |

**Scenarios verificados**: 2/2

### Indicador de foco (`focus-indicator-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Anillo ≥ 3:1 sobre superficies claras y oscuras | ✅ | `.16`: Tab real sobre todos los controles enfocables de las 21 URL; sobre superficies con degradado se mide el píxel de fondo contiguo, y ninguno queda bajo 3:1 |
| Opciones del selector de idioma con indicador visible | ✅ | `.17`: escritorio y menú móvil, tres idiomas |
| Campos de formulario enfocados ≥ 3:1 contra su estado sin foco | ✅ | `.17` (borde con foco frente a borde sin foco) y `.16` |
| Ningún control elimina el contorno sin alternativa | ✅ | `.12` (sin `outline: none` ni `outline: 0` en `src`) y `.16` (sin controles sin indicador) |

**Scenarios verificados**: 4/4

### Pares de contraste en una única fuente (`contrast-token-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Cada par validado figura una vez en la fuente de tokens y el sitio construye | ✅ | `.12` (paridad `:root`/`@theme`, sin consumidores huérfanos de `--color-brand-hover`) y `.3` |
| Sin colores literales nuevos fuera de la fuente de tokens (toda notación) | ✅ | `.11`: cero literales netos nuevos entre `#hex`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, `oklch()` y colores con nombre, en el diff contra `main` salvo `tokens.css` y la plantilla de correo; el degradado de ≤ 960px usa `color-mix` con `--color-primary-950` (`.12`). Las dos filas «preexistente» de `.11` son líneas tocadas que ya traían ese literal en `main` |
| Documentación declara la excepción de los correos | ✅ | `DESIGN.md`, sección de correo, leída en el diff; el comentario de origen está junto a cada par (`.19`) |
| Ratios de la tabla coinciden con los medidos | ✅ | `.7`, `.8`, `.10`, `.16`: los ratios medidos en navegador coinciden con los de la tabla de `DESIGN.md` (p. ej. pares CTA, azul sólido, WhatsApp, acento y anillo) |
| Tokens de WhatsApp con el verde visible | ✅ | `.12`, `.19` |
| `DESIGN.md` coherente con sus pares y con las excepciones del anillo | ✅ | `.12` sección 4: `--color-brand` descrito como no apto para texto normal y excepción `.why__video-toggle:focus-visible` declarada |

**Scenarios verificados**: 4/4

### Contraste AA verificado en todas las páginas y estados (`sitewide-contrast-verification`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 0 violaciones axe en las 42 combinaciones página × idioma × tamaño | ✅ | `.5`: las 84 corridas (42 combinaciones × 2 preferencias de movimiento) sin violaciones, con las 3 páginas 404 incluidas |
| Estados interactivos ≥ 4.5:1 (texto) y ≥ 3:1 (grande/gráficos) | ✅ | `.7`, `.8`, `.9`, `.20`: cursor, foco, presionado, menú móvil abierto (`.6`), viñetas de pasos completados (`.8`), sello de éxito, mensajes de éxito y error del formulario (`.9`) |
| El resultado se mantiene con movimiento reducido | ✅ | `.5` y `.16` corren con `reduced-motion: reduce`; la fila `reduce` de cada URL en `.5` no reporta violaciones |
| Revisión visual de industrias y contacto sin textos ilegibles | ✅ | `.14`, `.15`, `.9`, `.22`: ver hallazgo 1 sobre la etiqueta «SECTOR · 01» a 1024 px, que se lee pero queda marginalmente bajo 4.5:1 en su peor píxel; no hay títulos invisibles |
| Sección final legible en portada, servicios, industrias y nosotros | ✅ | `.20`, `.15` |
| Mensaje de éxito del formulario ≥ 4.5:1 sobre la tarjeta | ✅ | `.9`: el estado `success` toma `var(--color-text-accent)`; tres idiomas, sobre blanco |

**Scenarios verificados**: 4/4

### Tests

Comandos del perfil sobre el HEAD integrado: `.1`, `.2`, `.3` y `.4` terminan con exit 0; `.4` confirma que ambos escenarios de peso de imágenes del inicio están dentro del presupuesto de 2 MB (este cambio no modifica imágenes). El proyecto no declara test runner ni cobertura: no hay instrumento que medir.

## Hallazgos de Seguridad

Sin aplicar: el dominio del cambio es `fix`. Las interpolaciones del correo mantienen sus escapes (`.19`).

## Hallazgos

1. **Etiqueta «SECTOR · 01» del visor de industrias a 1024 px (observación, no bloquea)**: `.14` marca `FALLA` en esa configuración porque el peor píxel de la etiqueta (`.ind-directory__eyebrow`, `accent-300` sobre la foto) queda marginalmente bajo 4.5:1, mientras el nombre, el subtítulo, el contador y las etiquetas cumplen en todas las configuraciones. La etiqueta no está en el alcance de las specs: `dark-surface-heading-legibility` exige el nombre de la industria, la regla de la etiqueta es previa al cambio y el degradado base de escritorio no se tocó. Pertenece a la deuda declarada de texto claro sobre fotos y video (clarificación 1 y propuesta). Axe no la reporta (`.5`).
2. **Deuda declarada y abierta**: texto claro sobre fotos y video (títulos de servicios, portada y hero) queda diferido a un cambio aparte; ninguna spec de este cambio lo cubre. `.22` lista exactamente esos títulos (`svc-card__title`, `ind-card__name`, `hero-b__title`, solo en `/` y `/servicios/`). Los nodos `incomplete` de axe (`.5`, `.6`; son informativos) provienen de esa deuda y de elementos con estado animado o glifos únicos (la viñeta `✓`, que `.8` mide aparte).
3. **Texto en el correo fuera de las specs**: el enlace `mailto:` de la tabla de datos y el texto SLA del correo conservan `#4A7BB5` y `#898580` inline; `design.md` ya los registra como candidato de deuda y esta verificación no los mide. `.10` filtra solo los botones de acción.
4. **Medición**: en `.7` las filas marcadas `(grad)` aproximan el fondo con el primer ancestro opaco (aviso y estados de la sección final, número de ítem del directorio); esos mismos elementos se midieron por píxeles reales en `.15`. El muestreo de glifos delgados subestima el contraste por antialiasing (`.8`), por lo que el criterio es el color calculado y el muestreo confirma el tono.
5. **`apply-evidence.md` vía `comprobar` (`.23`)**: `apply-evidence.3` y `apply-evidence.14` no calzan (causa `distinto`; su base `git merge-base` cambió con la integración de `main`). Los demás bloques recomprobables calzan y el resto está marcado como no recomprobable. Ningún criterio se da por cumplido por esos bloques: cada uno se verificó con evidencia propia arriba.
6. **`comprobar` sobre este informe (`.24`)**: sin `no_calzan` ni `error`; los bloques recomprobables (`.1`, `.2`, `.4`, `.11`, `.12`, `.13`, `.19`) calzan y los que requieren preview y Chrome están marcados.
7. **Correcciones del juicio verificadas**: C1 (`.8`, `.20`), C2 (`.11`, `.12`, `.14`), SA1 (`.9`, `.6`), SA2 (`.14`), SB1 (`.10`, `.19`) y SB2 (`.12`) se cumplen en el HEAD verificado; los literales `rgb()`, `rgba()` y `hsl()` quedan cubiertos por el barrido de `.11`.

## Coherencia de Grafo de Specs

`.13`: sin inconsistencias en `depends_on`, `affects` ni `adrs[]` de las 15 specs de `spec_refs`. `sitewide-contrast-verification` depende de las otras 13 de `ui-contrast` y cada una declara `affects` hacia ella; `email-reply-button-contrast` solo declara `related`. Ninguna declara `adrs[]`. No hay deltas `MODIFY`: no aplica `## Contraste de bases`.

## Correcciones de Metadata

Ninguna de grafo. Con la validación principal en PASS se marcan como cumplidos los criterios que el juicio había dejado abiertos (`cta-button-contrast`, `secondary-text-dark-surface-contrast`, `contrast-token-single-source`, `sitewide-contrast-verification` y los tres de `email-reply-button-contrast`) y se fija `verified_at: "2026-10-06"` en las 15 specs de `spec_refs`.

## Acciones Requeridas

Ninguna para archivar. Recomendaciones sin bloqueo: (1) abrir el cambio aparte para el texto claro sobre fotos y video, que incluya la etiqueta del visor de industrias a 1024 px (hallazgo 1); (2) evaluar el enlace y el texto SLA del correo como deuda (hallazgo 3).

## Evidencia

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:06:56-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.1`** · exit 0 · 6 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:06:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:06:56-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 5 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:06:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:07:04-03:00","exit":0,"sha256":"9ab8b5b9371f5ed87ea8fc4d64007b76881bd3eb6c190ecbb11a1321f610e8d6","lineas":527,"omitidas":487,"no_recomprobable":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"} -->
**Evidencia `verify-report.3`** · exit 0 · 527 líneas, 487 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:07:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

14:06:58 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
14:06:58 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
14:06:59 [types] Generated 1.27s
14:06:59 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
14:06:59 [build] output: "static"
14:06:59 [build] mode: "server"
14:06:59 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
14:06:59 [build] adapter: @astrojs/cloudflare
14:06:59 [build] Collecting build info...
14:06:59 [build] ✓ Completed in 1.69s.
14:06:59 [build] Building server entrypoints...
14:07:02 [vite] ✓ built in 2.04s
14:07:03 [vite] ✓ built in 1.36s
14:07:04 [vite] ✓ built in 655ms

 prerendering static routes 
14:07:04   ├─ /contacto/index.html (+20ms) 
14:07:04   ├─ /cotizar/index.html (+12ms) 
14:07:04   ├─ /industrias/index.html (+21ms) 
14:07:04   ├─ /nosotros/index.html (+14ms) 
14:07:04   ├─ /servicios/index.html (+22ms) 
14:07:04   ├─ /en/contacto/index.html (+9ms) 
14:07:04   ├─ /pt/contacto/index.html (+9ms) 
14:07:04   ├─ /en/cotizar/index.html (+9ms) 
14:07:04   ├─ /pt/cotizar/index.html (+9ms) 
14:07:04   ├─ /en/industrias/index.html (+11ms) 
14:07:04   ├─ /pt/industrias/index.html (+11ms) 
14:07:04   ├─ /en/nosotros/index.html (+9ms) 
14:07:04   ├─ /pt/nosotros/index.html (+8ms) 
14:07:04   ├─ /en/servicios/index.html (+13ms) 
14:07:04   ├─ /pt/servicios/index.html (+13ms) 
14:07:04   ├─ /en/index.html (+15ms) 
14:07:04   ├─ /pt/index.html (+13ms) 
14:07:04   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["npm","run","measure:images"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:07:08-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:07:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
npm run measure:images
```

```text

> log-atm-web-astro@0.0.1 measure:images
> node scripts/measure-home-image-weight.mjs

escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/axe-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:55:50-03:00","exit":0,"sha256":"07182d0beadc4b3499703c7ac07f703d043be74661ddc4832b65a4537b71f7c3","lineas":22,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.5`** · exit 0 · 22 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:55:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/axe-run.mjs
```

```text
TOTAL combinaciones=84 (21 URL x 2 anchos x 2 movimientos) violaciones_color-contrast=0 nodos_incompletos=2694
/                  violaciones por ancho/movimiento: 1440/normal=0(inc 5) 390/normal=0(inc 5) 1440/reduce=0(inc 88) 390/reduce=0(inc 88)
/servicios/        violaciones por ancho/movimiento: 1440/normal=0(inc 58) 390/normal=0(inc 58) 1440/reduce=0(inc 80) 390/reduce=0(inc 80)
/industrias/       violaciones por ancho/movimiento: 1440/normal=0(inc 45) 390/normal=0(inc 45) 1440/reduce=0(inc 67) 390/reduce=0(inc 67)
/nosotros/         violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 37) 390/reduce=0(inc 37)
/contacto/         violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 15) 390/reduce=0(inc 15)
/cotizar/          violaciones por ancho/movimiento: 1440/normal=0(inc 12) 390/normal=0(inc 12) 1440/reduce=0(inc 12) 390/reduce=0(inc 12)
/xx-nope/          violaciones por ancho/movimiento: 1440/normal=0(inc 0) 390/normal=0(inc 0) 1440/reduce=0(inc 0) 390/reduce=0(inc 0)
/en/               violaciones por ancho/movimiento: 1440/normal=0(inc 5) 390/normal=0(inc 5) 1440/reduce=0(inc 88) 390/reduce=0(inc 88)
/en/servicios/     violaciones por ancho/movimiento: 1440/normal=0(inc 58) 390/normal=0(inc 58) 1440/reduce=0(inc 80) 390/reduce=0(inc 80)
/en/industrias/    violaciones por ancho/movimiento: 1440/normal=0(inc 45) 390/normal=0(inc 45) 1440/reduce=0(inc 67) 390/reduce=0(inc 67)
/en/nosotros/      violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 37) 390/reduce=0(inc 37)
/en/contacto/      violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 15) 390/reduce=0(inc 15)
/en/cotizar/       violaciones por ancho/movimiento: 1440/normal=0(inc 12) 390/normal=0(inc 12) 1440/reduce=0(inc 12) 390/reduce=0(inc 12)
/en/xx-nope/       violaciones por ancho/movimiento: 1440/normal=0(inc 0) 390/normal=0(inc 0) 1440/reduce=0(inc 0) 390/reduce=0(inc 0)
/pt/               violaciones por ancho/movimiento: 1440/normal=0(inc 5) 390/normal=0(inc 5) 1440/reduce=0(inc 88) 390/reduce=0(inc 88)
/pt/servicios/     violaciones por ancho/movimiento: 1440/normal=0(inc 58) 390/normal=0(inc 58) 1440/reduce=0(inc 80) 390/reduce=0(inc 80)
/pt/industrias/    violaciones por ancho/movimiento: 1440/normal=0(inc 45) 390/normal=0(inc 45) 1440/reduce=0(inc 67) 390/reduce=0(inc 67)
/pt/nosotros/      violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 37) 390/reduce=0(inc 37)
/pt/contacto/      violaciones por ancho/movimiento: 1440/normal=0(inc 15) 390/normal=0(inc 15) 1440/reduce=0(inc 15) 390/reduce=0(inc 15)
/pt/cotizar/       violaciones por ancho/movimiento: 1440/normal=0(inc 12) 390/normal=0(inc 12) 1440/reduce=0(inc 12) 390/reduce=0(inc 12)
/pt/xx-nope/       violaciones por ancho/movimiento: 1440/normal=0(inc 0) 390/normal=0(inc 0) 1440/reduce=0(inc 0) 390/reduce=0(inc 0)
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/axe2-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T14:57:21-03:00","exit":0,"sha256":"c83a318e912a8bdaa38456fadfc923b8ab1f86ed8490349269e0c61b6cc4dc98","lineas":26,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.6`** · exit 0 · 26 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T14:57:21-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/axe2-run.mjs
```

```text
TOTAL estados=45 violaciones_color-contrast=0 nodos_incompletos=320
menu movil abierto (390px) violaciones por URL: /=0 /servicios/=0 /industrias/=0 /nosotros/=0 /contacto/=0 /cotizar/=0 /xx-nope/=0 /en/=0 /en/servicios/=0 /en/industrias/=0 /en/nosotros/=0 /en/contacto/=0 /en/cotizar/=0 /en/xx-nope/=0 /pt/=0 /pt/servicios/=0 /pt/industrias/=0 /pt/nosotros/=0 /pt/contacto/=0 /pt/cotizar/=0 /pt/xx-nope/=0
/es 1440 cotizar paso 1 con modo elegido             violaciones=0 incompletos=12
/es 1440 cotizar paso 4 (3 viñetas completadas)      violaciones=0 incompletos=11
/es 1440 cotizar pantalla de exito                   violaciones=0 incompletos=15
/es 390 cotizar paso 1 con modo elegido              violaciones=0 incompletos=12
/es 390 cotizar paso 4 (3 viñetas completadas)       violaciones=0 incompletos=11
/es 390 cotizar pantalla de exito                    violaciones=0 incompletos=11
/es contacto con mensaje de exito                    violaciones=0 incompletos=16
/es contacto con mensaje de error                    violaciones=0 incompletos=21
/en 1440 cotizar paso 1 con modo elegido             violaciones=0 incompletos=12
/en 1440 cotizar paso 4 (3 viñetas completadas)      violaciones=0 incompletos=11
/en 1440 cotizar pantalla de exito                   violaciones=0 incompletos=15
/en 390 cotizar paso 1 con modo elegido              violaciones=0 incompletos=12
/en 390 cotizar paso 4 (3 viñetas completadas)       violaciones=0 incompletos=11
/en 390 cotizar pantalla de exito                    violaciones=0 incompletos=11
/en contacto con mensaje de exito                    violaciones=0 incompletos=15
/en contacto con mensaje de error                    violaciones=0 incompletos=15
/pt 1440 cotizar paso 1 con modo elegido             violaciones=0 incompletos=12
/pt 1440 cotizar paso 4 (3 viñetas completadas)      violaciones=0 incompletos=11
/pt 1440 cotizar pantalla de exito                   violaciones=0 incompletos=15
/pt 390 cotizar paso 1 con modo elegido              violaciones=0 incompletos=12
/pt 390 cotizar paso 4 (3 viñetas completadas)       violaciones=0 incompletos=11
/pt 390 cotizar pantalla de exito                    violaciones=0 incompletos=11
/pt contacto con mensaje de exito                    violaciones=0 incompletos=15
/pt contacto con mensaje de error                    violaciones=0 incompletos=15
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/states.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:00:16-03:00","exit":0,"sha256":"6f54178e910bb3b56312a2bd5ae68a325457e5335485c99517ead31a20ca0b5f","lineas":22,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.7`** · exit 0 · 22 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:00:16-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/states.mjs
```

```text
FALLOS=0 elementos/estados evaluados=126 (agregados por elemento en es/en/pt: 42)
cta-hero: umbral 4.5 peor(es/en/pt)=5.1 [reposo=6.44 hover=5.1 foco=6.44 presionado=5.1]  ||  cta-hero-hover>=5: umbral 5 peor(es/en/pt)=5.1 [hover=5.1]
brand-nav: umbral 4.5 peor(es/en/pt)=6.08 [reposo=6.08 hover=8.52 foco=6.08 presionado=8.52]  ||  brand-servicios: umbral 4.5 peor(es/en/pt)=6.08 [reposo=6.08 hover=8.52 foco=6.08 presionado=8.52]
nav-link: umbral 4.5 peor(es/en/pt)=7.3 [reposo=15.36 hover=7.3 foco=7.3 presionado=7.3]  ||  skip-link: umbral 4.5 peor(es/en/pt)=6.08 [foco=6.08]
cta-final-btn-brand: umbral 4.5 peor(es/en/pt)=6.08 [reposo=6.08 hover=8.52 foco=6.08 presionado=8.52]  ||  cta-final-btn-cta: umbral 4.5 peor(es/en/pt)=6.08 [reposo=6.08 hover=8.52 foco=6.08 presionado=8.52]
cta-final-btn-wa: umbral 4.5 peor(es/en/pt)=5.63 [reposo=8.8 hover=5.63 foco=8.8 presionado=5.63]  ||  cta-final-hint: umbral 4.5 peor(es/en/pt)=9.3 [reposo=9.3(grad)]
cta-final-status-error: umbral 4.5 peor(es/en/pt)=8.51 [reposo=8.51(grad)]  ||  cta-final-status-ok: umbral 4.5 peor(es/en/pt)=9.21 [reposo=9.21(grad)]
eyebrow: umbral 4.5 peor(es/en/pt)=6.46 [reposo=6.46]  ||  eyebrow-why: umbral 4.5 peor(es/en/pt)=5.91 [reposo=5.91]
nav-link-activo: umbral 4.5 peor(es/en/pt)=7.3 [reposo=7.3 hover=7.3 foco=7.3 presionado=7.3]  ||  svc-tag-cta: umbral 4.5 peor(es/en/pt)=6.44 [reposo=6.44]
svc-filter-activo: umbral 4.5 peor(es/en/pt)=16.08 [reposo=16.08 hover=16.08 foco=16.08 presionado=16.08]  ||  svc-filter-inactivo: umbral 4.5 peor(es/en/pt)=5.44 [reposo=5.44 hover=16.44 foco=5.44 presionado=16.44]
ind-item-num: umbral 4.5 peor(es/en/pt)=13.51 [reposo=13.51(grad)]  ||  howwork-step: umbral 4.5 peor(es/en/pt)=8.45 [reposo=8.45]
form-submit: umbral 4.5 peor(es/en/pt)=6.44 [reposo=6.44 hover=6.44 foco=6.44 presionado=6.44]  ||  channel-wa: umbral 4.5 peor(es/en/pt)=8.8 [reposo=8.8 hover=8.8 foco=8.8 presionado=8.8]
channel-wa-nombre: umbral 4.5 peor(es/en/pt)=8.8 [reposo=8.8]  ||  channel-wa-valor: umbral 4.5 peor(es/en/pt)=8.8 [reposo=8.8]
contact-pill: umbral 4.5 peor(es/en/pt)=5.8 [reposo=5.8]  ||  pin-oficina(::after sobre pin): umbral 3 peor(es/en/pt)=6.59 [reposo=6.59]
404-cta: umbral 4.5 peor(es/en/pt)=5.1 [reposo=6.44 hover=5.1 foco=6.44 presionado=5.1]  ||  404-cta-hover>=5: umbral 5 peor(es/en/pt)=5.1 [hover=5.1]
404-codigo(>=3): umbral 3 peor(es/en/pt)=4.1 [reposo=4.1]  ||  quote-step-num: umbral 4.5 peor(es/en/pt)=6.91 [reposo=6.91]
quote-empty(Por definir): umbral 4.5 peor(es/en/pt)=5.44 [reposo=5.44]  ||  quote-sla: umbral 4.5 peor(es/en/pt)=5.8 [reposo=5.8]
quote-title: umbral 4.5 peor(es/en/pt)=16.08 [reposo=16.08]  ||  btn-primary-lg(habilitado): umbral 4.5 peor(es/en/pt)=6.44 [reposo=6.44 hover=6.44 foco=6.44 presionado=6.44]
mode-check(seleccionado): umbral 3 peor(es/en/pt)=6.44 [reposo=6.44]  ||  movil drawer-link: umbral 4.5 peor(es/en/pt)=7.7 [reposo=8.09 hover=7.7 foco=7.7 presionado=7.7]
movil drawer-cta: umbral 4.5 peor(es/en/pt)=5.1 [reposo=6.44 hover=5.1 foco=6.44 presionado=5.1]  ||  movil drawer-wa: umbral 4.5 peor(es/en/pt)=5.63 [reposo=8.8 hover=5.63 foco=8.8 presionado=5.63]
exito seal: umbral 3 peor(es/en/pt)=6.44 [reposo=6.44]  ||  exito step-n: umbral 4.5 peor(es/en/pt)=6.46 [reposo=6.46]
exito btn-brand: umbral 4.5 peor(es/en/pt)=6.08 [reposo=6.08 hover=8.52 foco=6.08 presionado=8.52]  ||  exito btn-wa: umbral 4.5 peor(es/en/pt)=5.63 [reposo=8.8 hover=5.63 foco=8.8 presionado=5.63]
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/wizard-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:00:36-03:00","exit":0,"sha256":"9d91a25059efa3db9af02e56956144639105fad092d142ea5ccfdc87e8024a46","lineas":19,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.8`** · exit 0 · 19 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:00:36-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/wizard-run.mjs
```

```text
/es  tras-paso-2(1 completado) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/es  tras-paso-2(1 completado) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/es  tras-paso-3(2 completados) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/es  tras-paso-3(2 completados) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/es  tras-paso-3(2 completados) bullet#3 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/es  sello de exito: color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) = 6.44:1 OK
/en  tras-paso-2(1 completado) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/en  tras-paso-2(1 completado) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/en  tras-paso-3(2 completados) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/en  tras-paso-3(2 completados) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/en  tras-paso-3(2 completados) bullet#3 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/en  sello de exito: color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) = 6.44:1 OK
/pt  tras-paso-2(1 completado) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/pt  tras-paso-2(1 completado) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/pt  tras-paso-3(2 completados) bullet#1 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/pt  tras-paso-3(2 completados) bullet#2 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/pt  tras-paso-3(2 completados) bullet#3 glifo="✓" 13.6px/w600 color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) borde=rgb(62, 185, 120) computado=6.44:1 pixeles(fondo rgb(62,185,120), glifo rgb(27,69,69))=4.24:1 OK
/pt  sello de exito: color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) = 6.44:1 OK
FALLOS=0
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/contact-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:01:03-03:00","exit":0,"sha256":"9dbc113f7aa214e6b51306373e8d43f46029478c9ea199934e5ccfbb2f7410aa","lineas":16,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.9`** · exit 0 · 16 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:01:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/contact-run.mjs
```

```text
/es  envio            "Enviando tu mensaje…" style.color="" computado=rgb(33, 31, 28) fondo=rgb(255, 255, 255) 14px/w400 = 16.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(32,30,27))=16.63:1
/es  exito            "✓ Recibido — te contactamos hoy." style.color="var(--color-text-accent)" computado=rgb(34, 102, 63) fondo=rgb(255, 255, 255) 14px/w400 = 6.91:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(33,101,62))=7.01:1
/es  boton tras exito "✓ Enviado" color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) disabled=true opacity=1 = 6.44:1 OK
/es  error-validacion "Revisa los datos: email invalido" style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(190,57,42))=5.51:1
/es  error-servidor   "No pudimos enviar tu mensaje. Reintenta " style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(191,56,42))=5.51:1
/en  envio            "Sending your message…" style.color="" computado=rgb(33, 31, 28) fondo=rgb(255, 255, 255) 14px/w400 = 16.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(32,30,27))=16.63:1
/en  exito            "✓ Received — we'll contact you today." style.color="var(--color-text-accent)" computado=rgb(34, 102, 63) fondo=rgb(255, 255, 255) 14px/w400 = 6.91:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(33,101,62))=7.01:1
/en  boton tras exito "✓ Sent" color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) disabled=true opacity=1 = 6.44:1 OK
/en  error-validacion "Please check: email invalido" style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(192,57,43))=5.44:1
/en  error-servidor   "We couldn't send your message. Try again" style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(191,56,42))=5.51:1
/pt  envio            "Enviando sua mensagem…" style.color="" computado=rgb(33, 31, 28) fondo=rgb(255, 255, 255) 14px/w400 = 16.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(32,30,27))=16.63:1
/pt  exito            "✓ Recebido — entramos em contato hoje." style.color="var(--color-text-accent)" computado=rgb(34, 102, 63) fondo=rgb(255, 255, 255) 14px/w400 = 6.91:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(34,102,63))=6.91:1
/pt  boton tras exito "✓ Enviado" color=rgb(17, 34, 54) fondo=rgb(62, 185, 120) disabled=true opacity=1 = 6.44:1 OK
/pt  error-validacion "Confira os dados: email invalido" style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(192,57,43))=5.44:1
/pt  error-servidor   "Não foi possível enviar sua mensagem. Te" style.color="rgb(192, 57, 43)" computado=rgb(192, 57, 43) fondo=rgb(255, 255, 255) 14px/w400 = 5.44:1 OK | pixeles(fondo rgb(255,255,255), glifo rgb(191,56,42))=5.51:1
FALLOS=0
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["npx","tsx","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/email-run.mts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:01:04-03:00","exit":0,"sha256":"b611c6998a051852b8618219f38d0af3052db93452d93efad2fe35fc41cfcfcf","lineas":14,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.10`** · exit 0 · 14 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:01:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
npx tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/email-run.mts
```

```text
tokens @theme: brand-solid=#3b6497 brand-solid-text=#ffffff whatsapp=#25D366 whatsapp-text=#111b21 brand=#4A7BB5
contacto           email+tel   botones=2 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false) | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
   pixeles boton «Responder por email» (contacto, email+tel): fondo=rgb(59,100,151) glifo=rgb(255,255,255) ratio=6.08:1
contacto           solo-email  botones=1 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false)
contacto           solo-tel    botones=1 | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
contacto           ninguno     botones=0
cotizacion-rapida  email+tel   botones=2 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false) | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
cotizacion-rapida  solo-email  botones=1 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false)
cotizacion-rapida  solo-tel    botones=1 | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
cotizacion-rapida  ninguno     botones=0
cotizacion-4       email+tel   botones=2 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false) | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
cotizacion-4       solo-email  botones=1 | "Responder por email" rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1 (15px/w700, texto grande=false)
cotizacion-4       solo-tel    botones=1 | "WhatsApp" rgb(17, 27, 33) sobre rgb(37, 211, 102) = 8.8:1 (15px/w700, texto grande=false)
cotizacion-4       ninguno     botones=0
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/literales.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:01:04-03:00","exit":0,"sha256":"ff67246b161fb2bad1d2c20055a4a22bc6a2c7ee9ebcaa043e238b46732f4b5b","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.11`** · exit 0 · 5 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:01:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/literales.py
```

```text
merge-base main/HEAD = 843d5f691efd
(preexistente, linea tocada)  log-atm-web-astro/src/pages/contacto.astro  #c0392b  x1
(preexistente, linea tocada)  log-atm-web-astro/src/styles/pages/shared.css  rgba(255,255,255,0.2)  x1
LITERALES NETOS NUEVOS (hex, rgb, rgba, hsl, hsla, oklch... fuera de tokens.css y email-templates.ts) = 0
COLORES CON NOMBRE AGREGADOS = 0
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/estaticas.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:01:05-03:00","exit":0,"sha256":"2047e6d4ab9376a7eb5cbacef7b06db109662cb2641ac828f3a4adbf12f77095","lineas":32,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.12`** · exit 0 · 32 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:01:05-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/estaticas.py
```

```text
== 1. Paridad :root / @theme de los tokens agregados o modificados por el cambio ==
  --color-accent-800                 :root=#22663f    @theme=#22663f    OK
  --color-error-light                :root=#fca5a5    @theme=#fca5a5    OK
  --color-whatsapp                   :root=#25d366    @theme=#25d366    OK
  --color-whatsapp-text              :root=#111b21    @theme=#111b21    OK
  --color-brand-solid                :root=#3b6497    @theme=#3b6497    OK
  --color-brand-solid-hover          :root=#2b4e78    @theme=#2b4e78    OK
  --color-brand-solid-text           :root=#ffffff    @theme=#ffffff    OK
  --color-cta                        :root=#3eb978    @theme=#3eb978    OK
  --color-cta-hover                  :root=#339965    @theme=#339965    OK
  --color-cta-text                   :root=#112236    @theme=#112236    OK
  --color-cta-hover-text             :root=#0a1624    @theme=#0a1624    OK
  --color-text-accent                :root=#22663f    @theme=#22663f    OK
  --color-focus-ring                 :root=#3b6497    @theme=#3b6497    OK
  --color-focus-ring-inverse         :root=#87d3b0    @theme=#87d3b0    OK
  tokens con diferencia = 0
== 2. Consumidores huerfanos de tokens retirados ==
  referencias a --color-brand-hover: 0
  referencias a color-brand-hover: 0
== 3. outline: none / 0 en src ==
  ocurrencias = 0
== 4. Correcciones del juicio presentes en el código ==
  C1 viñeta done usa par CTA                           PRESENTE
  C2 degradado ≤960px con primary-950 (sin rgba)       PRESENTE
  SA1 éxito contacto con token                         PRESENTE
  SA2 contador align-self                              PRESENTE
  SB1 botón email con constante de par                 PRESENTE
  SB2 DESIGN.md excepción .why__video-toggle           PRESENTE
  SB2 DESIGN.md --color-brand no apto texto normal     PRESENTE
  #4A7BB5 como fondo de botón en email-templates.ts: 0
== 5. Colores de texto blanco/#fff residuales sobre fondo --color-cta / accent-500 ==
  (fin del barrido)
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/grafo.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:01:05-03:00","exit":0,"sha256":"5ca0d8a42f9014141a345386f22d2cfe220acda1ccf0d1bcb82d7bab06e4844d","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.13`** · exit 0 · 18 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:01:05-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/grafo.py
```

```text
specs en spec_refs = 15
cta-button-contrast                      depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
brand-button-contrast                    depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
whatsapp-button-contrast                 depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
email-whatsapp-button-contrast           depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
nav-link-state-contrast                  depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
accent-text-contrast                     depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
dark-surface-heading-legibility          depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
quote-summary-empty-values-contrast      depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
secondary-text-dark-surface-contrast     depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
error-page-code-contrast                 depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
services-filter-active-state-contrast    depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
focus-indicator-contrast                 depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
contrast-token-single-source             depends_on=0 affects=['sitewide-contrast-verification'] adrs=[]
sitewide-contrast-verification           depends_on=13 affects=[] adrs=[]
email-reply-button-contrast              depends_on=0 affects=[] adrs=[]
deltas MODIFY = 0
inconsistencias = 0
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/industrias-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:03:59-03:00","exit":0,"sha256":"f70383e84b971fd0116620fe465ff441a6a0eedbfc6f167c65b061cc3088243c","lineas":10,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.14`** · exit 0 · 10 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:03:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/industrias-run.mjs
```

```text
/es  ancho=390  OK    industrias=12 peor(px, todas): nombre=7.94 eyebrow=6.17 sub=6.43 contador=7.95 tags=5.14 | pastilla=106px de 350px, align-self=flex-start
/es  ancho=600  OK    industrias=12 peor(px, todas): nombre=9.16 eyebrow=7.01 sub=7.15 contador=7.19 tags=5.48 | pastilla=106px de 540px, align-self=flex-start
/es  ancho=768  OK    industrias=12 peor(px, todas): nombre=9.05 eyebrow=7.01 sub=7.15 contador=7.08 tags=5.4 | pastilla=106px de 691px, align-self=flex-start
/es  ancho=960  OK    industrias=12 peor(px, todas): nombre=9 eyebrow=6.88 sub=7.26 contador=6.78 tags=5.32 | pastilla=106px de 880px, align-self=flex-start
/es  ancho=1024 FALLA industrias=12 peor(px, todas): nombre=6.14 eyebrow=4.46 sub=5.68 contador=6.76 tags=4.9 | pastilla=106px de 469px, align-self=flex-start
/es  ancho=1440 OK    industrias=12 peor(px, todas): nombre=6.48 eyebrow=4.69 sub=5.92 contador=6.86 tags=5.01 | pastilla=106px de 603px, align-self=flex-start
/en  ancho=390  OK    industrias=12 peor(px, todas): nombre=7.94 eyebrow=6.17 sub=6.43 contador=7.95 tags=5.14 | pastilla=106px de 350px, align-self=flex-start
/pt  ancho=390  OK    industrias=12 peor(px, todas): nombre=7.94 eyebrow=6.17 sub=6.43 contador=7.95 tags=5.14 | pastilla=106px de 350px, align-self=flex-start
/en  ancho=1440 OK    industrias=12 peor(px, todas): nombre=6.48 eyebrow=4.69 sub=5.92 contador=6.86 tags=5.01 | pastilla=106px de 603px, align-self=flex-start
FALLOS=1
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/pix-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:04:35-03:00","exit":0,"sha256":"c46c8c99c38709c0d63a3471da0f2641615292f3a96e8e5ddef57f4a1b2b974d","lineas":11,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.15`** · exit 0 · 11 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:04:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/pix-run.mjs
```

```text
FALLOS=0 mediciones=60 (es/en/pt x 1440 y 390)
cta-final aviso                    OK    umbral 4.5 peor-pixel(6 combinaciones)=8.72 texto rgb(174, 199, 229)
cta-final error                    OK    umbral 4.5 peor-pixel(6 combinaciones)=7.1 texto rgb(252, 165, 165)
cta-final exito                    OK    umbral 4.5 peor-pixel(6 combinaciones)=7.69 texto rgb(135, 211, 176)
cta-final eyebrow                  OK    umbral 4.5 peor-pixel(6 combinaciones)=10.49 texto rgb(174, 199, 229)
industrias numero de item          OK    umbral 4.5 peor-pixel(6 combinaciones)=11.1 texto rgb(216, 241, 230)
canal WhatsApp nombre              OK    umbral 4.5 peor-pixel(6 combinaciones)=8.8 texto rgb(17, 27, 33)
canal WhatsApp valor               OK    umbral 4.5 peor-pixel(6 combinaciones)=8.8 texto rgb(17, 27, 33)
etiqueta del formulario            OK    umbral 4.5 peor-pixel(6 combinaciones)=5.8 texto rgb(34, 102, 63)
titulo del resumen                 OK    umbral 4.5 peor-pixel(6 combinaciones)=16.08 texto rgb(255, 255, 255)
'Por definir' del resumen          OK    umbral 4.5 peor-pixel(6 combinaciones)=5.44 texto rgb(110, 105, 99)
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/foco-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:07:39-03:00","exit":0,"sha256":"3ff50ad45b5114b7f892db8a43c3cc4407132214cdd4a2e7fb2752c3903041c3","lineas":24,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.16`** · exit 0 · 24 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:07:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/foco-run.mjs
```

```text
/                  controles enfocables recorridos con Tab=31
/servicios/        controles enfocables recorridos con Tab=32
/industrias/       controles enfocables recorridos con Tab=37
/nosotros/         controles enfocables recorridos con Tab=24
/contacto/         controles enfocables recorridos con Tab=26
/cotizar/          controles enfocables recorridos con Tab=18
/xx-nope/          controles enfocables recorridos con Tab=14
/en/               controles enfocables recorridos con Tab=31
/en/servicios/     controles enfocables recorridos con Tab=32
/en/industrias/    controles enfocables recorridos con Tab=37
/en/nosotros/      controles enfocables recorridos con Tab=24
/en/contacto/      controles enfocables recorridos con Tab=26
/en/cotizar/       controles enfocables recorridos con Tab=18
/en/xx-nope/       controles enfocables recorridos con Tab=14
/pt/               controles enfocables recorridos con Tab=31
/pt/servicios/     controles enfocables recorridos con Tab=32
/pt/industrias/    controles enfocables recorridos con Tab=37
/pt/nosotros/      controles enfocables recorridos con Tab=24
/pt/contacto/      controles enfocables recorridos con Tab=26
/pt/cotizar/       controles enfocables recorridos con Tab=18
/pt/xx-nope/       controles enfocables recorridos con Tab=14
anillos < 3:1: 0
sin indicador visible: 0
TOTAL controles=546 FALLOS=0
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/foco2-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:08:03-03:00","exit":0,"sha256":"293dcc20a6817e8db08dc597b2d18ba305519f28b2a5e95e6cf94f8a47e3b677","lineas":23,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.17`** · exit 0 · 23 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:08:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/foco2-run.mjs
```

```text
/es selector de idioma opcion 1 OK    clase="lang-selector__option is-active" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=5.49
/es selector de idioma opcion 2 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=6.08
/es selector de idioma opcion 3 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=5.49
/en selector de idioma opcion 1 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=6.08
/en selector de idioma opcion 2 OK    clase="lang-selector__option is-active" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=5.49
/en selector de idioma opcion 3 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=6.08
/pt selector de idioma opcion 1 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=6.08
/pt selector de idioma opcion 2 OK    clase="lang-selector__option" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=6.08
/pt selector de idioma opcion 3 OK    clase="lang-selector__option is-active" outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste vs superficie=5.49
/es movil opcion de idioma "ESEspañol" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=5.49
/es movil opcion de idioma "ENEnglish" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/es movil opcion de idioma "PTPortuguês" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/en movil opcion de idioma "ESEspañol" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/en movil opcion de idioma "ENEnglish" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=5.49
/en movil opcion de idioma "PTPortuguês" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/pt movil opcion de idioma "ESEspañol" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/pt movil opcion de idioma "ENEnglish" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=6.08
/pt movil opcion de idioma "PTPortuguês" OK    outline=3px solid offset=-3px color=rgb(59, 100, 151) contraste=5.49
/contacto/ #cn OK    borde con foco=rgb(59, 100, 151) vs sin foco=rgb(225, 222, 219) = 4.54:1 ; contorno 3px solid rgb(59, 100, 151)
/contacto/ #ce OK    borde con foco=rgb(59, 100, 151) vs sin foco=rgb(225, 222, 219) = 4.54:1 ; contorno 3px solid rgb(59, 100, 151)
/contacto/ #cm OK    borde con foco=rgb(59, 100, 151) vs sin foco=rgb(225, 222, 219) = 4.54:1 ; contorno 3px solid rgb(59, 100, 151)
/contacto/ #cp OK    borde con foco=rgb(59, 100, 151) vs sin foco=rgb(225, 222, 219) = 4.54:1 ; contorno 3px solid rgb(59, 100, 151)
FALLOS=0
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/e404-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:08:12-03:00","exit":0,"sha256":"cbf6d67a0a0af71f663489c5856c88e6855bf29fad6ce45dfcd0b6ac2fdde205","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.18`** · exit 0 · 4 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:08:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/e404-run.mjs
```

```text
/es html lang=es-CL codigo="404" aria-hidden=true | ancho:tamaño/contraste 320:96px/4.1 360:96px/4.1 390:96px/4.1 480:96px/4.1 600:96px/4.1 768:115.2px/4.1 820:123px/4.1 960:144px/4.1 1024:153.6px/4.1 1280:160px/4.1 1440:160px/4.1 1920:160px/4.1 OK
/en html lang=en-US codigo="404" aria-hidden=true | ancho:tamaño/contraste 320:96px/4.1 360:96px/4.1 390:96px/4.1 480:96px/4.1 600:96px/4.1 768:115.2px/4.1 820:123px/4.1 960:144px/4.1 1024:153.6px/4.1 1280:160px/4.1 1440:160px/4.1 1920:160px/4.1 OK
/pt html lang=pt-BR codigo="404" aria-hidden=true | ancho:tamaño/contraste 320:96px/4.1 360:96px/4.1 390:96px/4.1 480:96px/4.1 600:96px/4.1 768:115.2px/4.1 820:123px/4.1 960:144px/4.1 1024:153.6px/4.1 1280:160px/4.1 1440:160px/4.1 1920:160px/4.1 OK
FALLOS=0
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/pares.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:08:12-03:00","exit":0,"sha256":"8a40bc5dd83acf9e5a4436ad47ed03193fcc2479c3037aafe7613440b647c3c2","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.19`** · exit 0 · 11 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:08:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/pares.py
```

```text
== Fondo verde de los botones CTA: main vs HEAD (@theme) ==
  --color-accent-500: main=#3eb978 HEAD=#3eb978 IGUAL
  --color-cta: main=#3eb978 HEAD=#3eb978 IGUAL
== Verde de WhatsApp: token vs botón del sitio ==
  .btn--wa usa var(--color-whatsapp): True
== Pares del correo vs tokens ==
  WhatsApp correo: fondo=#25d366 texto=#111b21 | tokens: #25d366 / #111b21 -> IGUAL
  Responder por email correo: fondo=#3b6497 texto=#ffffff | tokens: #3b6497 / #ffffff -> IGUAL
  comentario de origen junto al par de «Responder por email» nombra el token: True
  consumo de emailBtnColors en las dos ramas: 2 | consumo de waBtnColors: 2
  enlaces mailto de botón conservan escapeHtml/encodeURIComponent: True
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/extras-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:12:33-03:00","exit":0,"sha256":"34e873a6e1d1227760bf7b6e0811d6770e91f0e0a7c689e660d201fec212fa50","lineas":5,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.20`** · exit 0 · 5 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:12:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/extras-run.mjs
```

```text
FALLOS=0 elementos evaluados=45 (4 estados cada uno: reposo, cursor, foco, presionado)
CTA final .btn--cta (azul, texto claro): OK    paginas x idiomas=12 peor=6.08 (ejemplo en reposo reposo:rgb(255,255,255) sobre rgb(59,100,151)=6.08)
CTA final .cta-final__btn (azul, texto claro): OK    paginas x idiomas=12 peor=6.08 (ejemplo en reposo reposo:rgb(255,255,255) sobre rgb(59,100,151)=6.08)
CTA final .btn--wa (verde WhatsApp, texto casi negro): OK    paginas x idiomas=12 peor=5.63 (ejemplo en reposo reposo:rgb(17,27,33) sobre rgb(37,211,102)=8.8)
menu enlace de pagina actual: OK    paginas x idiomas=9 peor=7.3 (ejemplo en reposo reposo:rgb(43,78,120) sobre rgb(239,237,235)=7.3)
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/migas-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:17:27-03:00","exit":0,"sha256":"f871b9618e93992a1f4aa66907d099590cc14171b7f4d9dcb98689d468d08bc7","lineas":13,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.21`** · exit 0 · 13 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:17:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/migas-run.mjs
```

```text
FALLOS=0 enlaces de migas de pan medidos=24 (4 paginas internas x 3 idiomas x 1440 y 390 px, peor pixel contra el fondo real del hero)
/es/servicios/       peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/es/industrias/      peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/es/nosotros/        peor-pixel=9 color=rgb(215, 228, 244) opacidad=1
/es/contacto/        peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/en/servicios/       peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/en/industrias/      peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/en/nosotros/        peor-pixel=9 color=rgb(215, 228, 244) opacidad=1
/en/contacto/        peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/pt/servicios/       peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/pt/industrias/      peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
/pt/nosotros/        peor-pixel=9 color=rgb(215, 228, 244) opacidad=1
/pt/contacto/        peor-pixel=8.51 color=rgb(215, 228, 244) opacidad=1
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/titulos-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:19:19-03:00","exit":0,"sha256":"d1be352b8d452d0f4df8b2916dbf1e49ea99a45fb2b0c57a53603bf2c70e41f3","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.22`** · exit 0 · 4 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:19:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-ulmu8f0q/titulos-run.mjs
```

```text
TITULOS evaluados=582 (h1-h6 visibles, 21 URL x 1440 y 390 px) | oscuro-sobre-oscuro=0 | con algun pixel bajo 4.5:1=126
  bajo 4.5:1 (peor pixel): h3.svc-card__title x93 en paginas: / /servicios/
  bajo 4.5:1 (peor pixel): h3.ind-card__name x27 en paginas: /
  bajo 4.5:1 (peor pixel): h1.hero-b__title x6 en paginas: /
```
<!-- evidencia:fin verify-report.22 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:19:22-03:00","exit":1,"sha256":"a1e2c742c3f7dc86107349c8e04438969b3802c62ecb464b5514229158f01740","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volvería a comprobar este informe"} -->
**Evidencia `verify-report.23`** · exit 1 · 1 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:19:22-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: comprobar sobre verify-report.md volvería a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md","bloques":30,"comprobados":13,"calzan":["apply-evidence.1","apply-evidence.4","apply-evidence.5","apply-evidence.19","apply-evidence.20","apply-evidence.21","apply-evidence.22","apply-evidence.23","apply-evidence.25","apply-evidence.26","apply-evidence.30"],"no_calzan":[{"id":"apply-evidence.3","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.14","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.2","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.6","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.7","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.8","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.9","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.10","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.11","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.12","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.13","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.15","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.16","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.17","motivo":"requiere a…(+649 caracteres)
```
<!-- evidencia:fin verify-report.23 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"6d9dba7f4347936e575ea97e1f3f7deeb44b6d21","fecha":"2026-10-06T15:19:23-03:00","exit":0,"sha256":"669da018b895ae7b72908d6a076a5c92e272897576c923a3ef401d75baff304e","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría el informe a sí mismo"} -->
**Evidencia `verify-report.24`** · exit 0 · 1 líneas, 0 omitidas · HEAD `6d9dba7f4347` · 2026-10-06T15:19:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaría el informe a sí mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md","bloques":23,"comprobados":7,"calzan":["verify-report.1","verify-report.2","verify-report.4","verify-report.11","verify-report.12","verify-report.13","verify-report.19"],"no_calzan":[],"omitidos":[{"id":"verify-report.3","motivo":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"},{"id":"verify-report.5","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.6","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.7","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.8","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.9","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.10","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.14","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.15","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.16","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.17","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.18","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.20","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.21","motivo":"requiere astro preview en 1…(+299 caracteres)
```
<!-- evidencia:fin verify-report.24 -->
