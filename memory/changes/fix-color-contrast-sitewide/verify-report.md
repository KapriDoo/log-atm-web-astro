---
verdict: PASS
---

# Verify Report: fix-color-contrast-sitewide

**Fecha**: 2026-10-06

Verificación posterior a la corrección de los residuales de la iteración 2 de la revisión adversarial (margen de iteración agotado), sobre el HEAD `ac7d10a`, que integra `main` con #34 y #35. Cada cifra y salida de este reporte vive en un bloque `verify-report.N` (sección `## Evidencia`) y la prosa lo cita por id. No se usó `apply-evidence.md` para dar por cumplido ningún criterio y `scripts/axe-audit.mjs` no se usó. La app se sirvió con `astro preview` (puerto 4331) y Chrome 148 de `log-atm-web-astro/chrome/` vía `playwright-core`; el preview se bajó al terminar. Los scripts de medición viven en el directorio de temporales del despacho y no se escribió ningún archivo del repo principal.

El proyecto no declara test runner ni instrumento de cobertura: la «suite» es el conjunto de comandos del perfil (`.1` paridad i18n, `.2` enlaces i18n, `.3` build, `.4` peso de imágenes) más las comprobaciones por script de esta fase. Entre el commit revisado por el juicio (`6d9dba7`) y este HEAD solo cambian `DESIGN.md`, el ADR-0008, `design.md`, las specs y los artefactos del cambio; el código de `src/` no cambia.

Mapa de bloques: `.5` residual C1 (diseño, ADR-0008 y spec); `.6` residual SA1 y AC 6 (ratios y hex de `DESIGN.md`, botones descritos contra el CSS); `.7` axe `color-contrast` sobre 21 URL × 2 anchos × 2 preferencias de movimiento; `.8` estados de reposo, cursor, foco y presionado en es/en/pt (incluye el cajón móvil); `.9` peor píxel de textos sobre fotos y degradados (visor de industrias, aviso de la sección final, migas de pan); `.10` anillo de foco con Tab real en las 21 URL; `.11` y `.18` mensajes de estado del formulario de contacto y viñeta de pasos completados (`.18` es el vigente: el script se extendió con la luminancia del texto; `.11` es su versión previa); `.12` y `.17` títulos h1-h6 (`.12` queda obsoleto: su clasificación confundía texto claro sobre foto con texto oscuro, y `.17` lo reemplaza); `.13` botones de los tres correos renderizados; `.14` reglas estáticas; `.15` barrido de literales de color contra `main`; `.16` y `.19` coherencia del grafo (`.16` queda obsoleto: se registró antes de marcar el AC 6, y `.19` lo reemplaza); `.20` y `.21` salidas de `comprobar`; `.22` código 404, subrayado de la página actual, borde de campos enfocados y respuesta al cursor de los filtros.

## Residuales de la iteración 2

### C1: diseño y ADR-0008 reflejan el botón «Responder por email»: resuelto

`.5` muestra que `design.md` cita la spec `forms-email/email-reply-button-contrast` y la constante `emailBtnColors`, que ya no clasifica el botón como fuera del alcance y que deja como deuda solo el texto SLA y el enlace `mailto`. El apartado «Referencias → Specs» del ADR-0008 lista la spec del botón. El scenario «Equipo revisa los estilos tras el cambio» de `contrast-token-single-source` nombra los dos botones de los correos como excepción. `.5` confirma en el código que las dos ramas consumen `emailBtnColors` y que ningún botón conserva `#4A7BB5` como fondo; `.13` renderiza el botón en los tres builders con el par esperado.

### SA1: `DESIGN.md` sin tonos limitados a texto grande asignados a texto normal: resuelto

`.6` contrasta `DESIGN.md` contra `tokens.css` y el código: los hex de la paleta coinciden con los tokens, y cada ratio que el documento declara (tonos primary-300/400, neutral-300/400/500, colores semánticos, `info`, `--color-brand`, `btn-ghost`, la tabla de pares completa y los anillos de foco) coincide con el medido, sin ninguna diferencia. Las cuatro líneas señaladas por el juicio ya no incumplen: `primary-400` se describe como borde en hover y estado no textual (el código lo usa solo como `border-color` en `.mode-tile`, `.chip-multi`, `.value-card` y `.channel`), `info` se declara no apto para texto normal, `.btn-outline` desapareció del documento y no existe en `src/`, y `.btn-ghost` se describe con `--color-text-muted` y hover `--color-text`, que son los tokens reales (`.6`). Los botones descritos existen en el CSS con los tokens indicados: `.btn--brand`, `.skip-link`, `.cta-final__btn`, `.cta-final .btn--cta`, `.btn--cta`, `.btn--wa`, `.channel--wa`, `.btn--ghost` y `.btn-ghost` (`.6`). La excepción vigente del anillo (`.why__video-toggle`) coincide con el código, y los seis contextos oscuros declarados fijan `--focus-ring-color` inverso (`.14`). Con esto el AC 6 de `contrast-token-single-source` queda cumplido y se marcó `[x]` en el frontmatter y en el cuerpo.

## Resultados por Spec

Umbrales: 4.5:1 texto normal, 3:1 texto grande y gráficos (los fija cada spec).

### Botón CTA verde legible en todos sus estados (`cta-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto azul marino sobre verde ≥ 4.5:1 en reposo, cursor, foco y presionado | ✅ | `.8` (`cta-hero`, `drawer-cta`, `svc-tag-cta`, `form-submit`, `404-cta`, `btn-primary-lg`) sin fila bajo el umbral en los tres idiomas |
| Cursor ≥ 5:1 | ✅ | `.8` en el hover de `cta-hero`, `404-cta` y `drawer-cta` |
| Etiqueta de servicios, envío de contacto y botón 404 ≥ 4.5:1 en todos los estados | ✅ | `.8`; el botón de envío conserva el par tras el envío exitoso (`.18`) |
| Marca de selección, sello de éxito y pin de oficina ≥ 3:1 | ✅ | El CSS de `.mode-tile__check`, `.quote-success__seal`, `.office-card__pin` y su punto consume el par CTA (lectura de `cotizar.css` y `shared.css`); el ratio del par lo mide `.6` |
| El fondo verde no cambia | ✅ | `.14`: `--color-cta` y `accent-500` conservan el valor en `:root` y `@theme`; el hex del documento coincide (`.6`) |
| La marca `✓` de cada paso completado usa el texto oscuro del CTA y cumple ≥ 4.5:1 | ✅ | `.18`: con la clase de paso completado aplicada, la viñeta de los tres idiomas toma el par CTA; `.14` confirma la regla en el CSS |

**Scenarios verificados**: 7/7

### Botones azul de marca y enlace de salto (`brand-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones azul, enlace de salto y sección final ≥ 4.5:1 en los cuatro estados | ✅ | `.8` (`brand-nav`, `brand-servicios`, `skip-link`, `cta-final-*`); los estados de cursor y presionado de los botones de la sección final no se aplicaron en cada fila de `.8` (ver hallazgo 4), por lo que su hover se cubre con la regla del CSS leída en `.6` |
| CTA de la sección final azul con texto claro en portada, servicios, industrias y nosotros | ✅ | `.8` (`cta-final-cta`, `-servicios`, `-industrias`, `-nosotros`) y `.6` (`.cta-final .btn--cta` fija el par azul en todo estado) |
| Ningún botón de la sección final con texto oscuro sobre azul | ✅ | `.8`: el contraste del texto de todos los botones de la sección es el del par azul con texto claro |

**Scenarios verificados**: 4/4

### Botones WhatsApp legibles (`whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones de WhatsApp ≥ 4.5:1 en los cuatro estados | ✅ | `.8` (`drawer-wa`, `cta-final-wa`, `channel-wa`) |
| Bloque del canal con fondo uniforme y texto ≥ 4.5:1 en toda su superficie | ✅ | `.8` (`channel-wa` y su valor) y `.6` (`.channel--wa` con el token sólido, sin degradado) |
| El verde de fondo sigue siendo el verde reconocible de la plataforma | ✅ | `.14`: `--color-whatsapp` coincide en `:root` y `@theme` con el verde de WhatsApp |

**Scenarios verificados**: 3/3

### Botón WhatsApp del correo (`email-whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto casi negro sobre verde de WhatsApp ≥ 4.5:1 | ✅ | `.13`: renderizado en Chrome en los tres builders |
| Mismo par que el botón del sitio | ✅ | `.14`: par `#111b21` / `#25D366` del correo igual al de `tokens.css` |
| Conserva condición de aparición y enlace | ✅ | `.13`: sin teléfono no hay botón WhatsApp en ninguna variante |

**Scenarios verificados**: 2/2

### Botón «Responder por email» del correo (`email-reply-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto blanco sobre azul de marca ≥ 4.5:1 | ✅ | `.13`: renderizado en los tres builders, a 15px/700, por lo que aplica 4.5:1 |
| Mismo par que el botón azul sólido del sitio | ✅ | `.5` y `.14`: la constante espeja `--color-brand-solid` / `--color-brand-solid-text` y las dos ramas la consumen |
| Conserva condición de aparición, enlace y color azul corporativo | ✅ | `.13`: aparece solo con email y no en `solo-tel` ni `ninguno`; `.14`: el `mailto:` conserva `escapeHtml` y `encodeURIComponent`; `.5`: ningún botón conserva `#4A7BB5` de fondo |

**Scenarios verificados**: 2/2

### Estados de los enlaces de navegación (`nav-link-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Menú principal ≥ 4.5:1 con cursor, foco, presionado y página actual | ✅ | `.8` (`nav-link`, `nav-link-activo`) |
| Menú móvil ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.8` (`movil drawer-link` con el cajón abierto); axe con el cajón abierto no se repitió en esta pasada |
| La página actual se distingue sin depender del color | ✅ | `.22`: el enlace activo tiene subrayado de 2px y `aria-current="page"` en los tres idiomas; el inactivo no |

**Scenarios verificados**: 3/3

### Textos de acento verde (`accent-text-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Rótulos de sección ≥ 4.5:1, incluido el gris alterno | ✅ | `.8` (`eyebrow`) y `.7` |
| Número de paso, etiqueta del formulario y plazo ≥ 4.5:1 | ✅ | `.8` (`quote-step-num`, `contact-pill`, `quote-sla`) |
| Un único tono de acento oscuro en la paleta | ✅ | `.14`: `--color-accent-800` presente en `:root` y `@theme`, igual en ambos |

**Scenarios verificados**: 3/3

### Títulos sobre fondos oscuros y fotografías (`dark-surface-heading-legibility`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Nombre de cada industria ≥ 4.5:1 sobre su foto | ✅ | `.9`: las 12 industrias, cinco anchos (390 a 1440 px) y tres idiomas, sin fila bajo el umbral en el peor píxel |
| Título del resumen de cotización ≥ 4.5:1 | ✅ | `.8` (`quote-title`) |
| Ningún título sobre fondo oscuro con color oscuro heredado | ✅ | `.17`: ningún título visible de las 21 URL y dos anchos tiene texto oscuro bajo el umbral; los títulos de texto claro que el ancestro opaco no resuelve se miden por píxeles: los de los heroes internos y del cotizador quedan sobre el umbral y el título de la portada es la deuda declarada (hallazgo 2) |

**Scenarios verificados**: 2/2

### Valores pendientes del resumen (`quote-summary-empty-values-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| «Por definir» ≥ 4.5:1 sobre blanco | ✅ | `.8` (`quote-empty`) |
| Un valor pendiente se distingue de uno completado | ✅ | El estilo `.v.empty` conserva cursiva y peso 400 frente al valor normal (lectura de `cotizar.css`); la distinción es visual y no se midió con instrumento |

**Scenarios verificados**: 1/1

### Textos de apoyo sobre superficies oscuras (`secondary-text-dark-surface-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Aviso y mensaje de error de la sección final ≥ 4.5:1 | ✅ | `.9` (aviso, por píxeles en las cuatro páginas con sección final); el mensaje de error de la sección usa `--color-error-light` en `cta.css` (lectura del CSS) y no se disparó en esta pasada |
| Números y total del directorio de industrias ≥ 4.5:1 | ✅ | `.9` (contador y subtítulo del visor por píxeles) |
| Etiqueta de paso de «Cómo trabajamos» ≥ 4.5:1 | ✅ | `.7`: sin violaciones axe en `/nosotros/` ni en sus versiones en y pt |
| Migas de pan de los heroes internos ≥ 4.5:1 | ✅ | `.9`: servicios, industrias, nosotros y contacto, tres idiomas, dos anchos, peor píxel contra el fondo real del hero |
| El contador se muestra sobre una pastilla ajustada a su contenido | ✅ | La regla `align-self: flex-start` está en `shared.css`; `.9` mide el contador por píxeles dentro de la pastilla en todas las configuraciones |

**Scenarios verificados**: 4/4

### Código decorativo de la página 404 (`error-page-code-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| ≥ 3:1 en los tres idiomas | ✅ | `.8` (`404-codigo`) |
| Tamaño calculado ≥ 24 px en todos los anchos | ✅ | `.22`: 320 a 1920 px, tres idiomas |
| Sigue siendo decorativo para lectores de pantalla | ✅ | `.22`: `aria-hidden="true"` |

**Scenarios verificados**: 2/2

### Filtro activo de servicios (`services-filter-active-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Filtro activo ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.8` (`svc-filter-activo`) |
| Los filtros inactivos conservan su respuesta al cursor | ✅ | `.22`: el color cambia entre reposo y cursor y el contraste con cursor supera el umbral |

**Scenarios verificados**: 2/2

### Indicador de foco (`focus-indicator-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Anillo ≥ 3:1 sobre superficies claras y oscuras | ✅ | `.10`: Tab real sobre todos los controles enfocables recorridos de las 21 URL, sin ninguno bajo 3:1 según la mediana del fondo contiguo (ver hallazgo 5 sobre el enlace de salto) |
| Opciones del selector de idioma con indicador visible | ✅ | Ninguna regla elimina el contorno (`.14`), de modo que las opciones heredan el anillo global; el recorrido de `.10` cubre los controles visibles y no abre el menú desplegable |
| Campos de formulario enfocados ≥ 3:1 contra su estado sin foco | ✅ | `.22`: el borde con foco frente al borde sin foco supera 3:1 en los cinco campos de contacto y conserva además el contorno global |
| Ningún control elimina el contorno sin alternativa | ✅ | `.14` (sin `outline: none` ni `outline: 0` en `src`) y `.10` (ningún control enfocado sin contorno) |

**Scenarios verificados**: 4/4

### Pares de contraste en una única fuente (`contrast-token-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Cada par validado figura una vez en la fuente de tokens y el sitio construye | ✅ | `.14` (paridad `:root`/`@theme` de todos los tokens comunes, sin consumidores huérfanos de `--color-brand-hover`) y `.3` |
| Sin colores literales nuevos fuera de la fuente de tokens (toda notación) | ✅ | `.15`: ningún literal neto nuevo entre `#hex`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, `oklch()` y colores con nombre en el diff contra `main`, salvo `tokens.css` y la plantilla de correo; el degradado de ≤ 960px usa `color-mix` con `--color-primary-950` (`.14`) |
| Documentación declara la excepción de los correos | ✅ | `DESIGN.md`, sección «Excepcion: plantillas de correo», nombra los dos botones y su origen; el comentario de origen está junto a cada par en el código (`.14`) |
| Ratios de la tabla coinciden con los medidos | ✅ | `.6` calcula todos los ratios de la tabla sobre `tokens.css` sin diferencia, y `.8` los confirma en el navegador (pares CTA, azul sólido, WhatsApp, acento) |
| Tokens de WhatsApp con el verde visible | ✅ | `.14` |
| `DESIGN.md` no describe como apto para texto normal un color bajo 4.5:1 y declara las excepciones del anillo | ✅ | `.6` y `.14`: ver residual SA1; el AC se marcó cumplido |

**Scenarios verificados**: 4/4

### Contraste AA verificado en todas las páginas y estados (`sitewide-contrast-verification`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 0 violaciones axe en las 42 combinaciones página × idioma × tamaño | ✅ | `.7`: las 84 corridas (42 combinaciones × 2 preferencias de movimiento) sin violaciones, con las tres páginas 404 incluidas |
| Estados interactivos ≥ 4.5:1 (texto) y ≥ 3:1 (grande/gráficos) | ✅ | `.8` (cursor, foco, presionado, cajón móvil), `.18` (mensajes del formulario y viñetas) |
| El resultado se mantiene con movimiento reducido | ✅ | `.7` y `.10` corren con `reduced-motion: reduce`; la fila `reduce` de cada URL en `.7` no reporta violaciones |
| Revisión visual de industrias y contacto sin textos ilegibles | ✅ | `.9`, `.17`, `.18`: ver hallazgo 1 sobre la etiqueta «SECTOR · 01» a 1024 px; no hay títulos invisibles |
| Sección final legible en portada, servicios, industrias y nosotros | ✅ | `.8` y `.9` |
| Mensaje de éxito del formulario ≥ 4.5:1 sobre la tarjeta | ✅ | `.18`: éxito, error de validación y error de servidor, tres idiomas |

**Scenarios verificados**: 4/4

### Tests

Comandos del perfil sobre el HEAD integrado: `.1`, `.2`, `.3` y `.4` terminan con exit 0; `.4` confirma que los dos escenarios de peso de imágenes del inicio quedan dentro del presupuesto de 2 MB (este cambio no modifica imágenes). El proyecto no declara test runner ni cobertura: no hay instrumento que medir.

## Hallazgos de Seguridad

Sin aplicar: el dominio del cambio es `fix`. Las interpolaciones del correo mantienen sus escapes (`.14`).

## Hallazgos

1. **Etiqueta «SECTOR · 01» del visor de industrias a 1024 px (observación, no bloquea)**: `.9` muestra que el peor píxel de `.ind-directory__eyebrow` queda marginalmente bajo 4.5:1 a 1024 px, mientras el nombre, el subtítulo y el contador cumplen en todas las configuraciones. La etiqueta no está en el alcance de las specs (`dark-surface-heading-legibility` exige el nombre de la industria) y su regla es previa al cambio. Pertenece a la deuda declarada de texto claro sobre fotos.
2. **Deuda declarada y abierta**: texto claro sobre fotos y video (títulos de servicios, de industrias y de la portada) queda diferido a un cambio aparte; `.17` mide el título de la portada con el peor píxel muy bajo y lista `svc-card__title` e `ind-card__name` entre los títulos claros que el ancestro opaco no resuelve. Ninguna spec de este cambio los cubre.
3. **Texto en el correo fuera de las specs**: el enlace `mailto:` de la tabla de datos y el texto SLA conservan `#4A7BB5` y `#898580` inline; `design.md` ya los registra como candidato de deuda y esta verificación no los mide.
4. **Medición**: en `.8` los estados de cursor y presionado de algunos botones de la sección final (`cta-final-btn`, `cta-final-cta-servicios`, `-industrias`, `-nosotros`) muestran el contraste del estado de reposo, por lo que el puntero no activó el hover en esa fila; el contraste del hover de esos botones se verifica con la regla del CSS (`.6`: hover con `--color-brand-solid-hover` y texto `--color-brand-solid-text`). La viñeta `✓` y las pantallas del asistente se verificaron por color calculado con la clase de estado aplicada (`.18`), no por navegación completa del asistente.
5. **Enlace de salto con el anillo sobre el encabezado (observación, no bloquea)**: `.10` lista el enlace de salto con el percentil 5 del fondo contiguo bajo 3:1 porque el anillo, al flotar sobre el encabezado, cruza el logo y el subtítulo de la marca; su mediana y el resto de los controles cumplen. El par del anillo contra la página es el de la tabla de `DESIGN.md` (`.6`).
6. **Descripción de navegación en `DESIGN.md` (observación, no bloquea)**: el apartado «Navigation» dice enlaces en `neutral-700` y peso 600 para la página actual, y el código usa `--color-text` y un peso distinto; es desajuste previo al cambio, sin efecto en el contraste, y `neutral-400` figura como «texto deshabilitado», uso exento de 4.5:1 y coherente con el apartado de inputs.
7. **`apply-evidence.md` vía `comprobar` (`.20`)**: `apply-evidence.3`, `.14` y `.30` no calzan (causa `distinto`): los dos primeros dependen de `git merge-base`, que cambió con la integración de `main`, y el tercero lee `DESIGN.md`, que la corrección posterior modificó. Los demás bloques recomprobables calzan. Ningún criterio se da por cumplido por esos bloques.
8. **`comprobar` sobre este informe (`.21`)**: el único `no_calzan` es `verify-report.16`, el bloque obsoleto de grafo que `.19` reemplaza tras marcar el AC 6; `.12` queda retirado en favor de `.17` y `.11` es equivalente a `.18`. Los bloques recomprobables restantes calzan y los que requieren preview y Chrome están marcados. El bloque `.22` se registró después de `comprobar` y está marcado no recomprobable, por lo que `comprobar` no lo habría ejecutado.

## Coherencia de Grafo de Specs

`.19`: sin inconsistencias en `depends_on`, `affects` ni `adrs[]` de las 15 specs de `spec_refs`. `sitewide-contrast-verification` depende de otras 13 de `ui-contrast`; cada una declara `affects` hacia ella; `email-reply-button-contrast` solo declara `related`. Ninguna declara `adrs[]`. No hay deltas `MODIFY`: no aplica `## Contraste de bases`.

## Correcciones de Metadata

Con la validación principal en PASS: se marca como cumplido el AC 6 de `contrast-token-single-source` (frontmatter y cuerpo) y las 15 specs de `spec_refs` conservan `verified_at: "2026-10-06"` (`.19` no muestra criterios abiertos).

## Acciones Requeridas

Ninguna para archivar. Recomendaciones sin bloqueo: (1) abrir el cambio aparte para el texto claro sobre fotos y video, que incluya la etiqueta del visor de industrias a 1024 px (hallazgos 1 y 2); (2) evaluar el enlace y el texto SLA del correo como deuda (hallazgo 3); (3) alinear la descripción de navegación de `DESIGN.md` con el código (hallazgo 6).

## Evidencia

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:32:25-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.1`** · exit 0 · 6 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:32:25-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:32:25-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 5 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:32:25-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:32:34-03:00","exit":0,"sha256":"2c4f009c7535923a18f7dc287460351e58f9c2174cfcb85527c364e24f0029b5","lineas":527,"omitidas":487,"no_recomprobable":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"} -->
**Evidencia `verify-report.3`** · exit 0 · 527 líneas, 487 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:32:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

15:32:27 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
15:32:27 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
15:32:28 [types] Generated 1.28s
15:32:28 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
15:32:29 [build] output: "static"
15:32:29 [build] mode: "server"
15:32:29 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
15:32:29 [build] adapter: @astrojs/cloudflare
15:32:29 [build] Collecting build info...
15:32:29 [build] ✓ Completed in 1.70s.
15:32:29 [build] Building server entrypoints...
15:32:31 [vite] ✓ built in 2.05s
15:32:32 [vite] ✓ built in 1.36s
15:32:33 [vite] ✓ built in 676ms

 prerendering static routes 
15:32:33   ├─ /contacto/index.html (+21ms) 
15:32:33   ├─ /cotizar/index.html (+11ms) 
15:32:33   ├─ /industrias/index.html (+20ms) 
15:32:33   ├─ /nosotros/index.html (+14ms) 
15:32:33   ├─ /servicios/index.html (+22ms) 
15:32:33   ├─ /en/contacto/index.html (+9ms) 
15:32:33   ├─ /pt/contacto/index.html (+9ms) 
15:32:33   ├─ /en/cotizar/index.html (+9ms) 
15:32:33   ├─ /pt/cotizar/index.html (+9ms) 
15:32:33   ├─ /en/industrias/index.html (+10ms) 
15:32:33   ├─ /pt/industrias/index.html (+11ms) 
15:32:33   ├─ /en/nosotros/index.html (+8ms) 
15:32:33   ├─ /pt/nosotros/index.html (+8ms) 
15:32:33   ├─ /en/servicios/index.html (+13ms) 
15:32:33   ├─ /pt/servicios/index.html (+13ms) 
15:32:33   ├─ /en/index.html (+15ms) 
15:32:33   ├─ /pt/index.html (+13ms) 
15:32:33   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["npm","run","measure:images"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:32:34-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:32:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"archivo","argv":null,"texto":"W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide\nM=$W/memory\necho \"== C1.a design.md: cita la spec y la constante\"\ngrep -n -o -E \"forms-email/email-reply-button-contrast|emailBtnColors|#3b6497. sobre|candidato de deuda\" $M/changes/fix-color-contrast-sitewide/design.md | sed -n 1,10p\necho \"== C1.a design.md: el boton ya no figura como fuera del alcance\"\ngrep -c -E \"Fuera del alcance de las specs, en el canal de correo\" $M/changes/fix-color-contrast-sitewide/design.md\ngrep -n \"Responder por email\" $M/changes/fix-color-contrast-sitewide/design.md | cut -c1-240\necho \"== C1.b ADR-0008: Referencias lista la spec\"\nsed -n '/^## Referencias/,$p' $M/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md\necho \"== C1.c spec: scenario revisa estilos\"\ngrep -n \"salvo los botones de los correos\" $M/specs/ui-contrast/contrast-token-single-source.md\necho \"== C1.d ADR-0008 frontmatter spec_refs\"\nsed -n '1,/^---$/p' $M/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md | sed -n '2,25p' | grep -n -E \"spec_refs|email|contrast\" \necho \"== C1.e constante en el codigo: dos ramas la consumen y el enlace mailto conserva escapes\"\ngrep -n -E \"emailBtnColors\" $W/log-atm-web-astro/src/lib/email-templates.ts | cut -c1-220\ngrep -c \"background:#4A7BB5\" $W/log-atm-web-astro/src/lib/email-templates.ts || true\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:36:32-03:00","exit":0,"sha256":"39d9fa993af0098063b268a2fef2417db84c51637119cb5486e48b96b085f70b","lineas":24,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 0 · 24 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:36:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```bash
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide
M=$W/memory
echo "== C1.a design.md: cita la spec y la constante"
grep -n -o -E "forms-email/email-reply-button-contrast|emailBtnColors|#3b6497. sobre|candidato de deuda" $M/changes/fix-color-contrast-sitewide/design.md | sed -n 1,10p
echo "== C1.a design.md: el boton ya no figura como fuera del alcance"
grep -c -E "Fuera del alcance de las specs, en el canal de correo" $M/changes/fix-color-contrast-sitewide/design.md
grep -n "Responder por email" $M/changes/fix-color-contrast-sitewide/design.md | cut -c1-240
echo "== C1.b ADR-0008: Referencias lista la spec"
sed -n '/^## Referencias/,$p' $M/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md
echo "== C1.c spec: scenario revisa estilos"
grep -n "salvo los botones de los correos" $M/specs/ui-contrast/contrast-token-single-source.md
echo "== C1.d ADR-0008 frontmatter spec_refs"
sed -n '1,/^---$/p' $M/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md | sed -n '2,25p' | grep -n -E "spec_refs|email|contrast" 
echo "== C1.e constante en el codigo: dos ramas la consumen y el enlace mailto conserva escapes"
grep -n -E "emailBtnColors" $W/log-atm-web-astro/src/lib/email-templates.ts | cut -c1-220
grep -c "background:#4A7BB5" $W/log-atm-web-astro/src/lib/email-templates.ts || true
```

```text
== C1.a design.md: cita la spec y la constante
191:forms-email/email-reply-button-contrast
191:emailBtnColors
191:candidato de deuda
== C1.a design.md: el boton ya no figura como fuera del alcance
0
191:- **Canal de correo**: el botón «Responder por email» queda cubierto por la spec `forms-email/email-reply-button-contrast`: sus dos ramas consumen la constante `emailBtnColors` (`#ffffff` sobre `#3b6497`, 6.08:1, espejo de `--color-bran
== C1.b ADR-0008: Referencias lista la spec
## Referencias

- [[0005-email-section-helpers-textual-logo]] — arquitectura de plantillas de correo con estilos inline.
- Specs: `ui-contrast/contrast-token-single-source`, `ui-contrast/focus-indicator-contrast`, `forms-email/email-whatsapp-button-contrast`, `forms-email/email-reply-button-contrast`.
== C1.c spec: scenario revisa estilos
79:**THEN** no encuentra ninguno fuera de la fuente de tokens, salvo los botones de los correos (WhatsApp y «Responder por email»), que figuran como excepción declarada
== C1.d ADR-0008 frontmatter spec_refs
4:consulted: exploration.md, proposal.md, clarifications.md, specs ui-contrast/*, forms-email/email-whatsapp-button-contrast, tech-context.md (Tailwind 4.2.2)
6:change_ref: "[[fix-color-contrast-sitewide]]"
7:capability: ui-contrast
8:tags: [adr, accessibility, wcag, contrast, tokens, focus]
== C1.e constante en el codigo: dos ramas la consumen y el enlace mailto conserva escapes
275:  const emailBtnColors = `background:#3b6497;color:#ffffff;`;
286:      `<a href="mailto:${escapeHtml(String(args.email))}?subject=${encodeURIComponent(args.mailSubject)}" style="${btnStyle}${emailBtnColors}">Responder por email</a>` +
296:      `<a href="mailto:${escapeHtml(String(args.email))}?subject=${encodeURIComponent(args.mailSubject)}" style="${btnStyle}${emailBtnColors}">Responder por email</a>`;
0
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/doc-check.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:36:52-03:00","exit":0,"sha256":"e1e33e0b520b4a3c701731e2d33f7c9332b0db1ca6bf990d9a755905f47ed8ed","lineas":32,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 32 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:36:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/doc-check.mjs
```

```text
FALLOS_DOC=0 | ratios documentados comprobados=39 | ratios que no coinciden=0
  primary-300/blanco 2.49/2.49 | primary-400/blanco 3.35/3.35 | neutral-300/blanco 1.73/1.73 | neutral-400/blanco (placeholder) 2.42/2.42
  neutral-500/primary-950 4.97/4.97 | neutral-500/blanco 3.66/3.66 | success/blanco 2.28/2.28 | warning/blanco 2.51/2.51
  error/blanco 4.05/4.05 | info=primary-500/blanco 4.38/4.38 | brand/blanco (comentario l.71) 4.38/4.38 | text-muted/blanco (btn-ghost) 5.44/5.44
  brand/neutral-50 (404) 4.10/4.1 | cta-text/cta 6.44/6.44 | cta-hover-text/cta-hover 5.10/5.1 | brand-solid 6.08/6.08
  brand-solid-hover 8.52/8.52 | wa 8.80/8.8 | wa-hover 5.63/5.63 | accent-800/blanco 6.91/6.91
  accent-800/neutral-50 6.46/6.46 | accent-800/neutral-100 5.91/5.91 | accent-800/accent-300 5.80/5.8 | primary-700/neutral-100 7.30/7.3
  primary-700/primary-50 7.70/7.7 | white/primary-900 16.08/16.08 | primary-200/primary-900 9.27/9.27 | primary-100/primary-800 9.66/9.66
  neutral-900/neutral-50 15.36/15.36 | focus-ring/#ffffff 6.08/6.08 | focus-ring/neutral-50 5.68/5.68 | focus-ring/neutral-100 5.20/5.2
  focus-ring/primary-50 5.49/5.49 | focus-ring/neutral-200 4.54/4.54 | focus-inverse/primary-950 10.38/10.38 | focus-inverse/primary-900 9.17/9.17
  focus-inverse/primary-800 7.10/7.1 | focus-inverse/primary-700 4.86/4.86 | focus-inverse/neutral-950 10.68/10.68
info badge default primary-700/primary-100: 6.61 (sin ratio documentado, >= 4.5: true)
hex de paleta documentados distintos de tokens.css: 0
ok  .btn--brand: .btn--brand { background: var(--color-brand-solid); color: var(--color-brand-solid-text); }
ok  .btn--brand:hover: .btn--brand:hover { background: var(--color-brand-solid-hover); }
ok  .skip-link: .skip-link { position: absolute; top: -40px; left: 0; background: var(--color-brand-solid); color: var(--color-brand-solid-text); padding: 8px 16px; z
ok  .cta-final__btn: .cta-final__btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; margin-top: 0.25rem; background: var(--color
ok  .cta-final .btn--cta: .cta-final .btn--cta { background: var(--color-brand-solid); color: var(--color-brand-solid-text); box-shadow: 0 4px 20px 0 rgb(74 123 181 / 0.3
ok  .btn--cta: .btn--cta { background: var(--color-cta); color: var(--color-cta-text); box-shadow: var(--shadow-cta); }
ok  .btn--cta:hover: .btn--cta:hover { background: var(--color-cta-hover); color: var(--color-cta-hover-text); box-shadow: 0 6px 28px rgb(62 185 120 / 0.45); }
ok  .btn--wa: .btn--wa { background: var(--color-whatsapp); color: var(--color-whatsapp-text); }
ok  .btn--wa:hover: .btn--wa:hover { background: var(--color-whatsapp-hover); color: var(--color-whatsapp-text); }
ok  .channel--wa: .channel--wa { background: var(--color-whatsapp); border-color: transparent; color: var(--color-whatsapp-text); }
ok  .btn--ghost: .btn--ghost { background: transparent; color: var(--color-text); border-color: var(--color-border); }
ok  .btn--ghost:hover: .btn--ghost:hover { background: var(--color-surface); border-color: var(--color-neutral-300); }
ok  .btn-ghost (cotizador): .btn-ghost { background: transparent; border: 0; font-family: var(--font-body); font-size: 0.95rem; font-weight: 500; color: var(--color-text-
ok  .btn-ghost:hover: .btn-ghost:hover { color: var(--color-text); }
.btn-outline en src: ausente (el DESIGN.md ya no lo describe: ok)
primary-400 en src: .mode-tile:hover .chip-multi:hover .value-card:hover .channel:hover
utilidades Tailwind text-<tono bajo umbral> en src: 0
lineas de DESIGN.md que aun asignan un tono bajo el umbral a texto sin salvedad: 0
DESIGN.md L122-123 'No validos para texto normal': presente
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/axe-run.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:39:40-03:00","exit":0,"sha256":"46be0da890a9db73e39651625d9a562706d00ec809529a956ce25da6ba5d1550","lineas":22,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.7`** · exit 0 · 22 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:39:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/axe-run.mjs
```

```text
TOTAL combinaciones=84 (21 URL x 2 anchos x 2 movimientos) violaciones_color-contrast=0 nodos_incompletos=2694
/                  1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/servicios/        1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/industrias/       1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/nosotros/         1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/contacto/         1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/cotizar/          1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/xx-nope/          1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/               1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/servicios/     1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/industrias/    1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/nosotros/      1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/contacto/      1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/cotizar/       1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/en/xx-nope/       1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/               1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/servicios/     1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/industrias/    1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/nosotros/      1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/contacto/      1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/cotizar/       1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
/pt/xx-nope/       1440/normal=0 390/normal=0 1440/reduce=0 390/reduce=0
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/states.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T15:48:01-03:00","exit":0,"sha256":"2c3ee1579b9b4351ca161fa70b71fd4c6e470918297c5f44f64c619fe6274595","lineas":32,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.8`** · exit 0 · 32 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T15:48:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/states.mjs
```

```text
FALLOS=0 (ausentes=0) elementos/estados evaluados=276 (peor de es/en/pt)
cta-hero: u4.5 repo=6.44 hove=5.10 foco=6.44 pres=5.10
brand-nav: u4.5 repo=6.08 hove=8.52 foco=6.08 pres=8.52
brand-servicios: u4.5 repo=6.08 hove=8.52 foco=6.08 pres=8.52
svc-tag-cta: u4.5 repo=6.44
nav-link: u4.5 repo=15.39 hove=7.30 foco=7.30 pres=7.30
nav-link-activo: u4.5 repo=7.30 hove=7.30 foco=7.30 pres=7.30
skip-link: u4.5 foco=6.08
cta-final-cta: u4.5 repo=6.08 hove=8.52 foco=6.08 pres=8.52
cta-final-wa: u4.5 repo=8.80 hove=5.63 foco=5.63 pres=5.63
cta-final-btn: u4.5 repo=6.08 hove=6.08 foco=8.52 pres=6.08
cta-final-cta-servicios: u4.5 repo=6.08 hove=6.08 foco=8.52 pres=6.08
cta-final-cta-industrias: u4.5 repo=6.08 hove=6.08 foco=8.52 pres=6.08
cta-final-cta-nosotros: u4.5 repo=6.08 hove=6.08 foco=6.08 pres=6.08
svc-filter-activo: u4.5 repo=16.08 hove=16.08 foco=16.08 pres=16.08
svc-filter-inactivo: u4.5 repo=5.44 hove=5.44 foco=5.44 pres=5.44
eyebrow: u4.5 repo=6.46
contact-pill: u4.5 repo=5.80
form-submit: u4.5 repo=6.44 hove=6.44 foco=6.44 pres=6.44
channel-wa: u4.5 repo=8.80 hove=8.80 foco=8.80 pres=8.80
channel-wa-valor: u4.5 repo=8.80
404-cta: u4.5 repo=6.44 hove=5.10 foco=5.10 pres=6.44
404-codigo(>=3): u3 repo=4.10
quote-step-num: u4.5 repo=6.91
quote-empty: u4.5 repo=5.44
quote-sla: u4.5 repo=5.80
quote-title: u4.5 repo=16.08
btn-primary-lg(habilitado): u4.5 repo=6.44 hove=6.44 foco=6.44 pres=6.44
btn-ghost: u4.5 repo=5.44 hove=16.44
movil drawer-link: u4.5 repo=8.09 hove=7.70 foco=8.09 pres=7.70
movil drawer-cta: u4.5 repo=6.44 hove=5.10 foco=6.44 pres=5.10
movil drawer-wa: u4.5 repo=8.80 hove=5.63 foco=8.80 pres=5.63
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/pixels.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:28:51-03:00","exit":0,"sha256":"e6b8c5c2efe4bb76877fdb9ff78c339585989f94349340684d9956bc4374c909","lineas":16,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.9`** · exit 0 · 16 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:28:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/pixels.mjs
```

```text
FALLOS_VISOR=0 (12 industrias x 5 anchos x 3 idiomas; peor pixel por elemento y ancho)
nombre     390px=7.94 768px=9.15 960px=9.02 1024px=6.14 1440px=6.56
subtitulo  390px=6.59 768px=7.27 960px=7.27 1024px=5.77 1440px=5.92
contador   390px=7.95 768px=7.08 960px=6.78 1024px=6.65 1440px=6.77
eyebrow    390px=6.17 768px=7.11 960px=6.88 1024px=4.48 1440px=4.74
FALLOS_SECCIONES=0
cta hint     /              peor pixel (es/en/pt, 1440 y 390 px)=8.72
cta hint     /servicios/    peor pixel (es/en/pt, 1440 y 390 px)=8.70
cta hint     /industrias/   peor pixel (es/en/pt, 1440 y 390 px)=8.70
cta hint     /nosotros/     peor pixel (es/en/pt, 1440 y 390 px)=8.70
miga enlace  /servicios/    peor pixel (es/en/pt, 1440 y 390 px)=8.51
miga actual  /servicios/    peor pixel (es/en/pt, 1440 y 390 px)=6.49
miga enlace  /industrias/   peor pixel (es/en/pt, 1440 y 390 px)=8.51
miga enlace  /nosotros/     peor pixel (es/en/pt, 1440 y 390 px)=9.00
miga enlace  /contacto/     peor pixel (es/en/pt, 1440 y 390 px)=8.51
miga actual  /industrias/   peor pixel (es/en/pt, 1440 y 390 px)=6.49
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/focus.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:30:02-03:00","exit":0,"sha256":"65fe36254fa1c1e4b4c1bc36b539a4c284a26b3182ff03f2ecaf3da1f0120510","lineas":14,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.10`** · exit 0 · 14 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:30:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/focus.mjs
```

```text
FOCOS=483 sin_contorno=0 bajo_3:1=0 peor_mediana_anillo_contiguo=4.94 (21 URL, 1440 px, Tab real; fondo contiguo por pixeles)
/:43/5.68  /servicios/:20/5.68  /industrias/:17/5.69  /nosotros/:24/5.69
/contacto/:26/5.68  /cotizar/:18/4.95  /xx-nope/:14/5.68  /en/:43/5.68
/en/servicios/:18/5.68  /en/industrias/:17/5.69  /en/nosotros/:24/5.69  /en/contacto/:26/5.68
/en/cotizar/:18/4.94  /en/xx-nope/:14/5.68  /pt/:43/5.68  /pt/servicios/:19/5.68
/pt/industrias/:17/5.69  /pt/nosotros/:24/5.69  /pt/contacto/:26/5.68  /pt/cotizar/:18/4.95
/pt/xx-nope/:14/5.68
informativo: controles con percentil 5 del anillo contiguo bajo 3:1 (texto o imagen vecina bajo el anillo): 21
  / A.skip-link# p5=1.35 mediana=5.69
  /servicios/ A.skip-link# p5=1.35 mediana=5.69
  /industrias/ A.skip-link# p5=1.35 mediana=5.69
  /nosotros/ A.skip-link# p5=1.35 mediana=5.69
  /contacto/ A.skip-link# p5=1.35 mediana=5.69
  /cotizar/ A.skip-link# p5=1.35 mediana=5.69
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/forms.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:30:33-03:00","exit":0,"sha256":"1dce4d4b6fe6ccc654c7bf52f46b8415bdb593fe5ce97a7503397b1bb2b3e54f","lineas":13,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.11`** · exit 0 · 13 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:30:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/forms.mjs
```

```text
FALLOS_FORM=0
/es  exito             mensaje=6.91 boton=6.44 texto=presente
/es  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/es  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/en  exito             mensaje=6.91 boton=6.44 texto=presente
/en  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/en  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/pt  exito             mensaje=6.91 boton=6.44 texto=presente
/pt  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/pt  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/es  vineta de paso completado (3 pasos) peor=5.44
/en  vineta de paso completado (3 pasos) peor=5.44
/pt  vineta de paso completado (3 pasos) peor=5.44
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/headings.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:31:00-03:00","exit":0,"sha256":"c108cab6a5e36b6c0b3946881f8b318c42ea77afa82da392c20cb679514ab233","lineas":5,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.12`** · exit 0 · 5 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:31:00-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/headings.mjs
```

```text
titulos evaluados=582 (21 URL x 2 anchos) | bajo 4.5:1 sobre fondo solido=174 | bajo 4.5:1 con foto o degradado detras (aproximacion por ancestro opaco)=30
  svc-card__title peor=1.00
  ind-card__name peor=1.00
  page-hero__title(foto/degradado) peor=1.07
  quote-hero__title(foto/degradado) peor=1.07
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/.bin/tsx","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/email.mts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:31:01-03:00","exit":0,"sha256":"a3de78cb18e82ced1a5f2db4f7b0de190544c32639cbec13fbf725827212f5a7","lineas":8,"omitidas":0,"no_recomprobable":"requiere Chrome de log-atm-web-astro/chrome y tsx; no se repite en comprobar"} -->
**Evidencia `verify-report.13`** · exit 0 · 8 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere Chrome de log-atm-web-astro/chrome y tsx; no se repite en comprobar

```text
/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/.bin/tsx /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/email.mts
```

```text
contacto email+tel   Responder por email=6.08 (15px/700) | WhatsApp=8.80 (15px/700)
contacto solo-email  Responder por email=6.08 (15px/700) | WhatsApp=ausente
rapida email+tel     Responder por email=6.08 (15px/700) | WhatsApp=8.80 (15px/700)
rapida solo-tel      Responder por email=ausente | WhatsApp=8.80 (15px/700)
rapida ninguno       Responder por email=ausente | WhatsApp=ausente
cot4 email+tel       Responder por email=6.08 (15px/700) | WhatsApp=8.80 (15px/700)
cot4 solo-email      Responder por email=6.08 (15px/700) | WhatsApp=ausente
FALLOS_CORREO=0
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/static.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:31:01-03:00","exit":0,"sha256":"9661ee9583f54d204b32565113f2f1abb9f8b17d4de3b3d51958af1454f6611a","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.14`** · exit 0 · 11 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/static.py
```

```text
paridad :root/@theme: tokens comunes=62 distintos=0 [] | tokens de pares ausentes en algun bloque=[]
whatsapp = #25D366 en ambos: #25d366 #25d366
outline none/0 en src: 0
consumidores de --color-brand-hover: 0
anillo global: :focus-visible {     outline: 3px solid var(--focus-ring-color, var(--color-focus-ring));
contextos oscuros que declaran --focus-ring-color inverso: {'tokens.css': 1, 'Footer.astro': 1, 'hero.css': 1, 'cta.css': 1, 'cotizar.css': 1, 'shared.css': 2}
degradado industrias <=960 usa color-mix primary-950: 5
mensaje exito contacto usa --color-text-accent: True
vineta de paso completado usa el par CTA: True
email: botones con #4A7BB5 de fondo: 0 | emailBtnColors usos: 2 | escapeHtml+encodeURIComponent en mailto: True
email: WA par #111b21/#25D366: True
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/literals.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:31:01-03:00","exit":0,"sha256":"64c8a920d07d0ebc192fb8d27cc1a7fb306ce03bf01f2cf79be941c5bc88bde5","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.15`** · exit 0 · 3 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/literals.py
```

```text
archivos con literales en el diff contra main: 5
literales netos nuevos fuera de tokens.css y email-templates.ts: 0
literales en lineas tocadas que ya existian en main (neto 0): 2
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/graph.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:31:01-03:00","exit":0,"sha256":"bc9d965d22a41205ae93adc2ad52f69070274b6d855a16a8c491b7ded9a6c788","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.16`** · exit 0 · 18 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/graph.py
```

```text
cta-button-contrast                        status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
brand-button-contrast                      status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
whatsapp-button-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
email-whatsapp-button-contrast             status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
nav-link-state-contrast                    status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
accent-text-contrast                       status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
dark-surface-heading-legibility            status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
quote-summary-empty-values-contrast        status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
secondary-text-dark-surface-contrast       status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
error-page-code-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
services-filter-active-state-contrast      status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
focus-indicator-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
AC abiertos en contrast-token-single-source: 2
contrast-token-single-source               status=review  deps=0 affects=1 adrs=0 AC[ ]=2 verified_at=2026-10-06
sitewide-contrast-verification             status=review  deps=13 affects=0 adrs=0 AC[ ]=0 verified_at=2026-10-06
email-reply-button-contrast                status=review  deps=0 affects=0 adrs=0 AC[ ]=0 verified_at=2026-10-06
specs=15 FALLA=0 WARN=0 criterios_abiertos=2 verified_at distinto de 2026-10-06: []
deltas MODIFY en spec_refs: 0
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/headings.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:34:42-03:00","exit":0,"sha256":"669ad248d6bd311a579da3afca7ff977c394c39a75306dd9339920bba48a59d8","lineas":8,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.17`** · exit 0 · 8 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:34:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/headings.mjs
```

```text
titulos evaluados=582 (21 URL x 2 anchos) | con texto OSCURO y contraste < 4.5:1 (oscuro sobre oscuro)=0
titulos de texto claro con contraste < 4.5:1 segun el ancestro opaco (fotos y degradados sin color de fondo; se miden por pixeles abajo): svc-card__title=102 ind-card__name=72 page-hero__title=24 quote-hero__title=6
  /servicios/ .page-hero__title peor pixel=8.41
  /industrias/ .page-hero__title peor pixel=8.41
  /nosotros/ .page-hero__title peor pixel=8.41
  /contacto/ .page-hero__title peor pixel=8.41
  /cotizar/ .quote-hero__title peor pixel=7.32
  / .hero-b__title peor pixel=1.19
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/forms.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:35:00-03:00","exit":0,"sha256":"1dce4d4b6fe6ccc654c7bf52f46b8415bdb593fe5ce97a7503397b1bb2b3e54f","lineas":13,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.18`** · exit 0 · 13 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:35:00-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/forms.mjs
```

```text
FALLOS_FORM=0
/es  exito             mensaje=6.91 boton=6.44 texto=presente
/es  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/es  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/en  exito             mensaje=6.91 boton=6.44 texto=presente
/en  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/en  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/pt  exito             mensaje=6.91 boton=6.44 texto=presente
/pt  error-validacion  mensaje=5.44 boton=6.44 texto=presente
/pt  error-servidor    mensaje=5.44 boton=6.44 texto=presente
/es  vineta de paso completado (3 pasos) peor=5.44
/en  vineta de paso completado (3 pasos) peor=5.44
/pt  vineta de paso completado (3 pasos) peor=5.44
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/graph.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:35:23-03:00","exit":0,"sha256":"3847698872d22f055777c84cdb88a4467e08a3ddf70814b8dc17d3a46e83f254","lineas":17,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.19`** · exit 0 · 17 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:35:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/graph.py
```

```text
cta-button-contrast                        status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
brand-button-contrast                      status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
whatsapp-button-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
email-whatsapp-button-contrast             status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
nav-link-state-contrast                    status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
accent-text-contrast                       status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
dark-surface-heading-legibility            status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
quote-summary-empty-values-contrast        status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
secondary-text-dark-surface-contrast       status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
error-page-code-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
services-filter-active-state-contrast      status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
focus-indicator-contrast                   status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
contrast-token-single-source               status=review  deps=0 affects=1 adrs=0 AC[ ]=0 verified_at=2026-10-06
sitewide-contrast-verification             status=review  deps=13 affects=0 adrs=0 AC[ ]=0 verified_at=2026-10-06
email-reply-button-contrast                status=review  deps=0 affects=0 adrs=0 AC[ ]=0 verified_at=2026-10-06
specs=15 FALLA=0 WARN=0 criterios_abiertos=0 verified_at distinto de 2026-10-06: []
deltas MODIFY en spec_refs: 0
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:35:32-03:00","exit":1,"sha256":"7437456768707cf429f6db7359a3c762765e8a8b0692287ee92999891f3fd9c2","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este informe"} -->
**Evidencia `verify-report.20`** · exit 1 · 1 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:35:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md","bloques":36,"comprobados":18,"calzan":["apply-evidence.1","apply-evidence.4","apply-evidence.5","apply-evidence.19","apply-evidence.20","apply-evidence.21","apply-evidence.22","apply-evidence.23","apply-evidence.25","apply-evidence.26","apply-evidence.31","apply-evidence.32","apply-evidence.33","apply-evidence.34","apply-evidence.35"],"no_calzan":[{"id":"apply-evidence.3","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.14","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.30","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.2","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.6","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.7","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.8","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.9","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.10","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.11","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.12","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.13","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.15","motivo":"requiere astro preview en…(+976 caracteres)
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:35:33-03:00","exit":1,"sha256":"cdc8566acbc5420d7a645e828916f3a4e1107b677fe150f12b34df39bafcb9b2","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.21`** · exit 1 · 1 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:35:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md","bloques":20,"comprobados":9,"calzan":["verify-report.1","verify-report.2","verify-report.4","verify-report.5","verify-report.6","verify-report.14","verify-report.15","verify-report.19"],"no_calzan":[{"id":"verify-report.16","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"verify-report.3","motivo":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"},{"id":"verify-report.7","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.8","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.9","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.10","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.11","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.12","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.13","motivo":"requiere Chrome de log-atm-web-astro/chrome y tsx; no se repite en comprobar"},{"id":"verify-report.17","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.18","motivo":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"},{"id":"verify-report.20","motivo":"comprobar sobre verify-report.md volveria a comprobar este informe"}],"error":null}
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/misc.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"ac7d10ac355106304d4b27822ef2e3b4bbf46032","fecha":"2026-10-06T16:36:53-03:00","exit":0,"sha256":"f33496f716a5d1f605096f3ec4a6dffdd6484c4519ec45359e81d1a9f85e3867","lineas":13,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.22`** · exit 0 · 13 líneas, 0 omitidas · HEAD `ac7d10ac3551` · 2026-10-06T16:36:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4331 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-05kbtu9h/misc.mjs
```

```text
FALLOS_MISC=0
404 /es  tamano minimo calculado=96px aria-hidden=true
404 /en  tamano minimo calculado=96px aria-hidden=true
404 /pt  tamano minimo calculado=96px aria-hidden=true
nav actual /es  activo=underline/2px/aria-current=page | inactivo=none
nav actual /en  activo=underline/2px/aria-current=page | inactivo=none
nav actual /pt  activo=underline/2px/aria-current=page | inactivo=none
campo contacto #cn    borde foco #3b6497 vs sin foco #e1dedb = 4.54; contorno global=solid
campo contacto #cm    borde foco #3b6497 vs sin foco #e1dedb = 4.54; contorno global=solid
campo contacto #cp    borde foco #3b6497 vs sin foco #e1dedb = 4.54; contorno global=solid
campo contacto #cs    borde foco #3b6497 vs sin foco #e1dedb = 4.54; contorno global=solid
campo contacto #cmsg  borde foco #3b6497 vs sin foco #e1dedb = 4.54; contorno global=solid
filtro inactivo reposo rgb(110, 105, 99) (5.44) -> cursor rgb(33, 31, 28) (16.44)
```
<!-- evidencia:fin verify-report.22 -->
