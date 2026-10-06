---
verdict: PASS
---

# Verify Report: fix-color-contrast-sitewide

**Fecha**: 2026-10-06

Verificación sobre el HEAD integrado con `main` (merge que trae #34 y #35), con evidencia propia: cada cifra y cada salida de este reporte vive en un bloque `verify-report.N` (sección `## Evidencia`) y la prosa los cita por id. La corrida axe sobre las 42 combinaciones se hizo sobre el build de este HEAD (`verify-report.3`), servido con `astro preview` y Chrome 148 vía `playwright-core`; el preview se bajó al terminar. `scripts/axe-audit.mjs` no se usó como evidencia. El proyecto no tiene suite de tests: la «suite» es el conjunto de comandos del perfil (`verify-report.1`, `.2`, `.3`, `.4`), más las comprobaciones por script de esta fase.

## Resultados por Spec

Umbrales: 4.5:1 texto normal, 3:1 texto grande y gráficos (los fija cada spec). Bloques de referencia: `.5` axe sobre 21 URL × 2 anchos × 2 preferencias de movimiento; `.9` axe sobre estados expuestos; `.11` estados forzados por CDP (reposo, cursor, foco, presionado) en es/en/pt; `.24`/`.25` anillo de foco con teclado real y muestreo de píxeles; `.15`/`.19`/`.26` muestreo de píxeles sobre fotos y degradados; `.6` reglas estáticas; `.7` código 404; `.8` comportamiento; `.10` correo.

### Botón CTA verde legible en todos sus estados (`cta-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Todo botón CTA, texto azul marino sobre verde de marca ≥ 4.5:1 en reposo, cursor, foco y presionado | ✅ | `.11` (`cta-hero`, `drawer-cta`, `svc-tag-cta`, `form-submit`, `404-cta`, `btn-primary-lg`): ningún estado bajo el umbral, en los tres idiomas |
| Contraste con el cursor encima ≥ 5:1 | ✅ | `.11` filas `cta-hero-hover>=5` y `404-cta-hover>=5` |
| Etiqueta CTA de servicios, envío de contacto y botón 404 ≥ 4.5:1 en todos los estados | ✅ | `.11` |
| Marca de selección, sello de éxito y pin de oficina ≥ 3:1 | ✅ | `.11` (`mode-check` con un modo seleccionado, `exito-seal`, `pin-oficina`) |
| El fondo verde de los botones CTA no cambia | ✅ | `.6` sección 8: `--color-cta` y `accent-500` idénticos a `main` |

**Scenarios verificados**: 6/6

### Botones azul de marca y enlace de salto (`brand-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones azul, enlace de salto y botones de la sección final ≥ 4.5:1 en reposo, cursor, foco y presionado | ✅ | `.11` (`brand-nav`, `brand-servicios`, `skip-link`, `cta-final-btn*`, `exito-btn-brand`) |
| CTA de la sección final azul con texto claro en portada, servicios, industrias y nosotros | ✅ | `.8` (4 páginas × 3 idiomas × reposo, cursor, foco, presionado) y `.15` (píxeles) |
| Ningún botón de la sección final con texto oscuro sobre azul | ✅ | `.8`; el override `.cta-final .btn--cta` fija fondo y texto en todos los estados |

**Scenarios verificados**: 4/4

### Botones WhatsApp legibles (`whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Botones de WhatsApp ≥ 4.5:1 en reposo, cursor, foco y presionado | ✅ | `.11` (`drawer-wa`, `cta-final-btn-wa`, `exito-btn-wa`) |
| Bloque del canal con fondo uniforme y texto ≥ 4.5:1 en toda su superficie | ✅ | `.11` (`channel-wa`) y `.15` (píxeles sobre todo el texto del bloque); el fondo es sólido por construcción (`shared.css`, `.channel--wa { background: var(--color-whatsapp) }`) |
| El verde de fondo sigue siendo el verde reconocible de la plataforma | ✅ | `.6` sección 6: `--color-whatsapp` coincide en `:root` y `@theme` y `.10` lo compara con el correo |

**Scenarios verificados**: 3/3

### Botón WhatsApp del correo (`email-whatsapp-button-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Texto casi negro sobre verde de WhatsApp ≥ 4.5:1 | ✅ | `.10` en los tres builders con teléfono |
| Mismo par que el botón del sitio | ✅ | `.10` compara contra `tokens.css` |
| Conserva condición de aparición y enlace | ✅ | `.10`: sin teléfono no hay botón; con teléfono el enlace `wa.me` conserva el número |

**Scenarios verificados**: 2/2

### Estados de los enlaces de navegación (`nav-link-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Menú principal ≥ 4.5:1 con cursor, foco, presionado y página actual | ✅ | `.11` (`nav-link`, `nav-link-activo`) |
| Menú móvil ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.11` (`drawer-link`, con el drawer abierto) y `.9` (axe con drawer abierto) |
| La página actual se distingue sin depender del color | ✅ | `.8`: subrayado solo en `.is-active` |

**Scenarios verificados**: 3/3

### Textos de acento verde (`accent-text-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Rótulos de sección ≥ 4.5:1, incluido el gris alterno | ✅ | `.11` (`eyebrow`, `eyebrow-why`) y `.5` |
| Número de paso, etiqueta del formulario y plazo de respuesta ≥ 4.5:1 | ✅ | `.11` (`quote-step-num`, `contact-pill`, `quote-sla`) |
| Un único tono de acento oscuro en la paleta | ✅ | `.6`: solo `--color-accent-800` se agrega, en `:root` y en `@theme` |

**Scenarios verificados**: 3/3

### Títulos sobre fondos oscuros y fotografías (`dark-surface-heading-legibility`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Nombre de cada industria del directorio ≥ 4.5:1 sobre su fotografía | ✅ | `.19`: las 12 diapositivas en 4 anchos y 3 idiomas; `.16` muestra que sin el overlay oscuro de ≤ 960px el criterio no se cumpliría en 390px |
| Título del resumen de cotización ≥ 4.5:1 | ✅ | `.11` (`quote-title`) |
| Ningún título sobre fondo oscuro con color oscuro heredado | ✅ | `.26`: el grupo de títulos con color oscuro cumple 4.5:1 sobre todos sus píxeles de fondo en 7 páginas × 3 idiomas × 2 anchos |

**Scenarios verificados**: 2/2

### Valores pendientes del resumen (`quote-summary-empty-values-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| «Por definir» ≥ 4.5:1 sobre blanco | ✅ | `.11` (`quote-empty`) |
| Valor pendiente distinguible de uno completado | ✅ | `.8`: cambian color y estilo (itálica) |

**Scenarios verificados**: 1/1

### Textos secundarios sobre superficies oscuras (`secondary-text-dark-surface-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Aviso y mensaje de error de la sección final ≥ 4.5:1 | ✅ | `.11` (`cta-final-hint`, `cta-final-status-error`), `.9` (axe con el estado forzado) y `.15` |
| Números de ítem y total del directorio ≥ 4.5:1 | ✅ | `.11` (`ind-item-num`) y `.19` (contador) |
| Etiqueta de paso de «Cómo trabajamos» ≥ 4.5:1 | ✅ | `.11` (`howwork-step`) |
| Migas de pan de los heroes internos ≥ 4.5:1 | ✅ | `.15` (píxeles sobre el fondo real del hero) |

**Scenarios verificados**: 4/4

### Código de la página 404 (`error-page-code-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Código ≥ 3:1 en los tres idiomas | ✅ | `.7`: color y fondo medidos en `/xx-nope/`, `/en/xx-nope/`, `/pt/xx-nope/` |
| Tamaño calculado ≥ 24 px (o 18.66 px en negrita) en todos los tamaños de pantalla | ✅ | `.7`: 13 anchos de 320 a 1920 px en los tres idiomas; el tamaño computado es de texto grande en todos y el peso es 900 |
| Sigue siendo decorativo para lectores de pantalla | ✅ | `.7`: `aria-hidden="true"` en los tres idiomas |

**Scenarios verificados**: 2/2

### Filtro activo de servicios (`services-filter-active-state-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Filtro activo ≥ 4.5:1 con cursor, foco y presionado | ✅ | `.11` (`svc-filter-activo`) |
| Filtros inactivos conservan su respuesta al cursor | ✅ | `.8` y `.11` (`svc-filter-inactivo`) |

**Scenarios verificados**: 2/2

### Indicador de foco (`focus-indicator-contrast`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Anillo ≥ 3:1 en superficies claras y oscuras | ✅ | `.24` (escritorio, 21 páginas) y `.25` (móvil): todas las paradas de Tab medidas por píxeles contra el fondo adyacente; sin falla |
| Opciones del selector de idioma con indicador visible | ✅ | `.8` (teclado real sobre el desplegable abierto, en los tres idiomas) |
| Campos enfocados ≥ 3:1 contra su estado sin foco | ✅ | `.8` (borde y anillo) |
| Ningún control elimina el contorno sin alternativa | ✅ | `.6` sección 3 (sin `outline: none` ni `0` en `src/`) y `.24`/`.25` («SIN ANILLO» vacío) |

**Scenarios verificados**: 4/4

### Pares de contraste en una única fuente (`contrast-token-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Cada par figura una vez en la fuente de tokens y el sitio construye | ✅ | `.3` (build sin error) y `.6` sección 6 (tokens nuevos en `:root` y en `@theme`, `--color-brand-hover` retirado) |
| Sin colores literales nuevos fuera de la fuente, salvo correos | ✅ | `.6` secciones 1 y 4 (ningún hex nuevo fuera de `tokens.css`; en el correo solo el par declarado). Ver hallazgo 3 sobre `rgba()` |
| La documentación declara la excepción de correos | ✅ | `.6` sección 5 |
| Ratios de la tabla de `DESIGN.md` coinciden con los medidos | ✅ | `.6` sección 7 (cada fila recalculada desde `tokens.css`) |
| Tokens de WhatsApp con el verde visible | ✅ | `.6` sección 6 y `.10` |

**Scenarios verificados**: 3/3

### Contraste verificado en todo el sitio (`sitewide-contrast-verification`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 0 violaciones axe en las 42 combinaciones página × idioma × tamaño | ✅ | `.5` (21 URL × escritorio/móvil, sobre el build de este HEAD; las 3 páginas 404 localizadas de #34 incluidas) |
| Estados interactivos ≥ 4.5:1 (texto) y ≥ 3:1 (grande/gráficos) | ✅ | `.11`, `.8`, `.24`, `.25`; `.9` cubre menú móvil abierto, pasos y éxito del asistente y estados de la sección final con axe |
| El resultado se mantiene con movimiento reducido | ✅ | `.5` repite las 42 combinaciones con `prefers-reduced-motion: reduce`; `.9` y las demás comprobaciones interactivas corren con esa preferencia |
| La revisión visual de industrias y contacto no encuentra textos ilegibles | ✅ | `.19`, `.15`, más inspección visual de capturas de `/industrias/` y `/contacto/` en esta fase |
| Sección final legible en portada, servicios, industrias y nosotros | ✅ | `.15` (textos y botones, 3 idiomas) y `.8` |

**Scenarios verificados**: 3/3

### Tests

Comandos del perfil sobre el HEAD integrado: `.1` (paridad i18n), `.2` (enlaces i18n, que incluye las rutas localizadas de #34), `.3` (build) y `.4` (peso de imágenes del inicio, que toca el visor de industrias): los cuatro terminan con exit 0 y el presupuesto de 2 MB se cumple en ambos escenarios. El escenario móvil queda cerca del presupuesto; esa holgura la fija #35 y este cambio no modifica imágenes. El proyecto no declara test runner ni cobertura: no hay instrumento de cobertura que medir.

Bloques obsoletos, sustituidos por una versión corregida del mismo script: `.12`, `.13`, `.17`, `.18`, `.21` y `.22` (anillo de foco: las primeras versiones medían mal los enlaces en línea con salto de línea o con hijos de bloque) por `.24` y `.25`; `.14` (contador del directorio: tomaba las esquinas curvas de la pastilla fuera de los glifos) por `.19`; `.20` y `.23` por `.26` (la versión vigente separa los títulos por color de texto y lista páginas y clases). Su contenido no debe leerse como resultado de la fase.

## Hallazgos de Seguridad

Sin aplicar: el dominio del cambio es `fix`.

## Hallazgos

1. **Decisión de apply no contemplada en `design.md`: overlay del visor de industrias más oscuro en ≤ 960px (`3bc419b`, `[pre-adr]` en `observations.md`)** — no contradice ninguna spec. Se contrastó contra `dark-surface-heading-legibility` (el criterio exige nombre ≥ 4.5:1 sobre su fotografía), `industries-selector-interaction` (solo regula el crossfade GSAP, no el degradado), `contrast-token-single-source` (el criterio se limita a hex) y ADR-0008. El bloque `.16` revierte el degradado solo en el navegador y muestra que sin él el nombre, el eyebrow y el sub quedan bajo 4.5:1 en 390px, mientras `.19` muestra que con él todo el viewer cumple en los cuatro anchos; el escritorio queda sin cambio. Reconciliación pendiente de documentación: `design.md` D8 asume el 92 % de oscurecimiento bajo el nombre y no recoge el degradado de ≤ 960px; conviene registrarlo en `design.md` o en un ADR al archivar.
2. **Deuda declarada y abierta (no bloquea): texto claro sobre fotos y video.** `.26` muestra títulos de texto claro bajo 4.5:1 en `.svc-card__title`, `.ind-card__name` y `.hero-b__title`, solo en `/` y `/servicios/`. La clarificación 1 y la propuesta los difieren a un cambio aparte (requieren rediseñar overlays y degradados); ninguna spec de este cambio los cubre y `/industrias/` queda sin títulos bajo el umbral. Es la porción real detrás de los `incomplete` de axe (`.5` los cuenta por combinación). Observación visual sin bloque: en `/pt/servicios/` el título «Desconsolidação» se corta en el borde de su tarjeta; es previa al cambio y ajena al contraste.
3. **`rgba()` nuevos en el diff**: el degradado de ≤ 960px (hallazgo 1) agrega un literal `rgba(15,28,46,…)`, el mismo color base del degradado de escritorio ya existente. El criterio, el diseño y el ADR acotan «sin colores literales nuevos» a hex y `.6` sección 1 lo cumple; tokenizar ese color queda como limpieza opcional.
4. **`apply-evidence.md` vía `comprobar` (`verify-report.27`)**: `apply-evidence.3` y `apply-evidence.14` no calzan porque su base `git merge-base` cambió con la integración de `main` (el recuento de líneas del diff y la base difieren); la conclusión de ambos (0 hex fuera de las excepciones) se reproduce en `.6`. Los demás bloques recomprobables calzan y el resto está marcado como no recomprobable. Ningún criterio se da por cumplido por esos bloques: cada uno se verificó con evidencia propia.
5. **`comprobar` sobre este informe (`verify-report.28`)**: sin `no_calzan` ni `error`.
6. Los nodos `incomplete` de axe (`.5` los lista por combinación; son informativos) no cuentan como violaciones; los resueltos por muestreo de píxeles y comprobaciones interactivas son `.11`, `.15`, `.19` y `.26`, y el resto es la deuda del hallazgo 2.

## Coherencia de Grafo de Specs

Sin inconsistencias en `depends_on`, `affects` ni `adrs[]` de las 14 specs de `spec_refs`: `sitewide-contrast-verification` depende de las otras 13 y cada una declara `affects` hacia ella; ninguna declara `adrs[]`. No hay specs `MODIFY`, por lo que no aplica `## Contraste de bases`.

## Correcciones de Metadata

Ninguna. Sí se marcan los criterios de aceptación como cumplidos y se fija `verified_at: "2026-10-06"` en las 14 specs de `spec_refs` (validación principal PASS).

## Acciones Requeridas

Ninguna para archivar. Recomendaciones sin bloqueo: (1) registrar la decisión del overlay de ≤ 960px en `design.md` o ADR (hallazgo 1); (2) abrir un cambio aparte para el texto claro sobre fotos y video (hallazgo 2).

## Evidencia


<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T11:57:40-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.1`** · exit 0 · 6 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T11:57:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T11:57:40-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 5 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T11:57:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T11:58:46-03:00","exit":0,"sha256":"aba91849acd9652eeef49568aa3686dc3eee5c8899a3d8039ae7671b5ba2a033","lineas":527,"omitidas":487,"no_recomprobable":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"} -->
**Evidencia `verify-report.3`** · exit 0 · 527 líneas, 487 omitidas · HEAD `d92da75b0744` · 2026-10-06T11:58:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

11:57:46 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
11:57:46 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
11:57:48 [types] Generated 1.61s
11:57:48 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
11:57:48 [build] output: "static"
11:57:48 [build] mode: "server"
11:57:48 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
11:57:48 [build] adapter: @astrojs/cloudflare
11:57:48 [build] Collecting build info...
11:57:48 [build] ✓ Completed in 2.25s.
11:57:48 [build] Building server entrypoints...
11:57:50 [vite] ✓ built in 2.15s
11:57:52 [vite] ✓ built in 1.45s
11:57:53 [vite] ✓ built in 708ms

 prerendering static routes 
11:57:53   ├─ /contacto/index.html (+22ms) 
11:57:53   ├─ /cotizar/index.html (+12ms) 
11:57:53   ├─ /industrias/index.html (+22ms) 
11:57:53   ├─ /nosotros/index.html (+15ms) 
11:57:53   ├─ /servicios/index.html (+23ms) 
11:57:53   ├─ /en/contacto/index.html (+9ms) 
11:57:53   ├─ /pt/contacto/index.html (+9ms) 
11:57:53   ├─ /en/cotizar/index.html (+9ms) 
11:57:53   ├─ /pt/cotizar/index.html (+9ms) 
11:57:53   ├─ /en/industrias/index.html (+12ms) 
11:57:53   ├─ /pt/industrias/index.html (+11ms) 
11:57:53   ├─ /en/nosotros/index.html (+9ms) 
11:57:53   ├─ /pt/nosotros/index.html (+10ms) 
11:57:53   ├─ /en/servicios/index.html (+14ms) 
11:57:53   ├─ /pt/servicios/index.html (+13ms) 
11:57:53   ├─ /en/index.html (+15ms) 
11:57:53   ├─ /pt/index.html (+13ms) 
11:57:53   ├─ /index.html (+18ms) 
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["npm","run","measure:images"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T11:58:49-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T11:58:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/axe_sweep.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:10:38-03:00","exit":0,"sha256":"ca78e5e2c61d9891cd7391182b0e372fad74a70e3c5a6462122ce593d17b19d3","lineas":22,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.5`** · exit 0 · 22 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:10:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/axe_sweep.mjs
```

```text
/ desk=0/96 mob=0/91 rm-desk=0/95 rm-mob=0/90
/servicios/ desk=0/86 mob=0/82 rm-desk=0/86 rm-mob=0/82
/industrias/ desk=0/73 mob=0/70 rm-desk=0/73 rm-mob=0/69
/nosotros/ desk=0/43 mob=0/39 rm-desk=0/43 rm-mob=0/39
/contacto/ desk=0/16 mob=0/15 rm-desk=0/16 rm-mob=0/15
/cotizar/ desk=0/12 mob=0/12 rm-desk=0/12 rm-mob=0/12
/xx-nope/ desk=0/0 mob=0/2 rm-desk=0/0 rm-mob=0/2
/en/ desk=0/96 mob=0/91 rm-desk=0/95 rm-mob=0/90
/en/servicios/ desk=0/86 mob=0/82 rm-desk=0/86 rm-mob=0/82
/en/industrias/ desk=0/73 mob=0/70 rm-desk=0/73 rm-mob=0/69
/en/nosotros/ desk=0/43 mob=0/39 rm-desk=0/43 rm-mob=0/39
/en/contacto/ desk=0/16 mob=0/15 rm-desk=0/16 rm-mob=0/15
/en/cotizar/ desk=0/12 mob=0/12 rm-desk=0/12 rm-mob=0/12
/en/xx-nope/ desk=0/0 mob=0/1 rm-desk=0/0 rm-mob=0/1
/pt/ desk=0/96 mob=0/91 rm-desk=0/95 rm-mob=0/90
/pt/servicios/ desk=0/86 mob=0/82 rm-desk=0/86 rm-mob=0/82
/pt/industrias/ desk=0/73 mob=0/70 rm-desk=0/73 rm-mob=0/69
/pt/nosotros/ desk=0/43 mob=0/39 rm-desk=0/43 rm-mob=0/39
/pt/contacto/ desk=0/16 mob=0/15 rm-desk=0/16 rm-mob=0/15
/pt/cotizar/ desk=0/12 mob=0/12 rm-desk=0/12 rm-mob=0/12
/pt/xx-nope/ desk=0/0 mob=0/1 rm-desk=0/0 rm-mob=0/1
combinaciones=84 violaciones_totales=0 incompletos_totales=3809 (celda = violaciones/incompletos)
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["bash","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/static_checks.sh"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:29:27-03:00","exit":0,"sha256":"530a1d7961d8b6165f7ca5048104eb8f2ca094353772752699f677aaed74f129","lineas":22,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 22 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:29:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
bash /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/static_checks.sh
```

```text
# 1. hex de color agregados en src/ fuera de tokens.css y email-templates.ts
lineas_con_hex=0
# 2. --color-brand-hover en src/
ocurrencias=0
# 3. outline none/0 en src/
ocurrencias=0
# 4. hex sin tokenizar en el diff de email-templates.ts (excepción declarada)
      1 #111b21       1 #25D366 
# 5. excepción de correo declarada en DESIGN.md
menciones=1
# 6. tokens y pares (tokens.css)
brand-hover en :root: False
ERRORES: 0
# 7. tabla de DESIGN.md vs ratios calculados
filas=17 ratios_comparados=28 diferencias=0
# 8. fondo verde CTA, azul de marca y hover de WhatsApp sin cambio respecto a main
igual  --color-accent-500 -> --color-accent-500: #3EB978; 
igual  --color-cta -> --color-cta: var(--color-accent-500);
igual  --color-cta-hover -> --color-cta-hover: var(--color-accent-600);
igual  --color-brand -> --color-brand: var(--color-primary-500);
igual  --color-primary-500 -> --color-primary-500: #4A7BB5; 
igual  --color-whatsapp-hover -> --color-whatsapp-hover: #1da851;
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/error_code.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:29:54-03:00","exit":0,"sha256":"893429e6e3e1b351b58df434f76a20a921cd657cf105c76156b0f448dac96b80","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.7`** · exit 0 · 4 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:29:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/error_code.mjs
```

```text
/xx-nope/ 320:96px/w900 360:96px/w900 390:96px/w900 480:96px/w900 600:96px/w900 768:115.2px/w900 820:123px/w900 960:144px/w900 961:144.15px/w900 1024:153.6px/w900 1280:160px/w900 1440:160px/w900 [color rgb(74, 123, 181) sobre rgb(248, 247, 246) = 4.10:1; aria-hidden=true; texto=404; html lang=es-CL] 1920:160px/w900
/en/xx-nope/ 320:96px/w900 360:96px/w900 390:96px/w900 480:96px/w900 600:96px/w900 768:115.2px/w900 820:123px/w900 960:144px/w900 961:144.15px/w900 1024:153.6px/w900 1280:160px/w900 1440:160px/w900 [color rgb(74, 123, 181) sobre rgb(248, 247, 246) = 4.10:1; aria-hidden=true; texto=404; html lang=en-US] 1920:160px/w900
/pt/xx-nope/ 320:96px/w900 360:96px/w900 390:96px/w900 480:96px/w900 600:96px/w900 768:115.2px/w900 820:123px/w900 960:144px/w900 961:144.15px/w900 1024:153.6px/w900 1280:160px/w900 1440:160px/w900 [color rgb(74, 123, 181) sobre rgb(248, 247, 246) = 4.10:1; aria-hidden=true; texto=404; html lang=pt-BR] 1920:160px/w900
mediciones=39 incumplimientos=0
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/misc.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:30:54-03:00","exit":0,"sha256":"759e2f618e446a15a0ee8c58193ef35775be1bfa43567b0fc76ad3a1edb6403d","lineas":28,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.8`** · exit 0 · 28 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:30:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/misc.mjs
```

```text
OK  /es nav: activo=underline; inactivos=none
OK  /es filtro inactivo responde al cursor (reposo rgb(255, 255, 255)/rgb(110, 105, 99) -> hover rgb(255, 255, 255)/rgb(33, 31, 28))
OK  /es pendiente rgb(110, 105, 99) italic vs completado rgb(33, 31, 28) normal (4 pendientes)
OK  /es/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /es/servicios/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /es/industrias/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /es/nosotros/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /es selector de idioma: opciones enfocadas=3, peor anillo=5.49 (solid 3px off -3 rgb(59, 100, 151): anillo/interior=5.49)
OK  /es campo INPUT: borde rgb(59, 100, 151) vs sin foco rgb(225, 222, 219) = 4.54:1; outline solid 3px rgb(59, 100, 151)
OK  /en nav: activo=underline; inactivos=none
OK  /en filtro inactivo responde al cursor (reposo rgb(255, 255, 255)/rgb(110, 105, 99) -> hover rgb(255, 255, 255)/rgb(33, 31, 28))
OK  /en pendiente rgb(110, 105, 99) italic vs completado rgb(33, 31, 28) normal (4 pendientes)
OK  /en/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /en/servicios/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /en/industrias/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /en/nosotros/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /en selector de idioma: opciones enfocadas=3, peor anillo=5.49 (solid 3px off -3 rgb(59, 100, 151): anillo/interior=5.49)
OK  /en campo INPUT: borde rgb(59, 100, 151) vs sin foco rgb(225, 222, 219) = 4.54:1; outline solid 3px rgb(59, 100, 151)
OK  /pt nav: activo=underline; inactivos=none
OK  /pt filtro inactivo responde al cursor (reposo rgb(255, 255, 255)/rgb(110, 105, 99) -> hover rgb(255, 255, 255)/rgb(33, 31, 28))
OK  /pt pendiente rgb(110, 105, 99) italic vs completado rgb(33, 31, 28) normal (4 pendientes)
OK  /pt/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /pt/servicios/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /pt/industrias/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /pt/nosotros/ cta-final botones azul/texto claro en reposo, hover, foco, presionado (2 botones, 8 estados; ej rgb(59, 100, 151) / rgb(255, 255, 255), hover rgb(43, 78, 120) / rgb(255, 255, 255))
OK  /pt selector de idioma: opciones enfocadas=3, peor anillo=5.49 (solid 3px off -3 rgb(59, 100, 151): anillo/interior=5.49)
OK  /pt campo INPUT: borde rgb(59, 100, 151) vs sin foco rgb(225, 222, 219) = 4.54:1; outline solid 3px rgb(59, 100, 151)
comprobaciones=27 fallas=0
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/axe_states.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:31:46-03:00","exit":0,"sha256":"5012aa5b179b69f7307f934803d69f7428adab2481f41544f502d4700e026a46","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.9`** · exit 0 · 4 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:31:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/axe_states.mjs
```

```text
/es desk-paso0=0 desk-paso1=0 desk-paso2=0 desk-paso3=0 desk-pasoexito=0 mob-paso0=0 mob-paso1=0 mob-paso2=0 mob-paso3=0 mob-pasoexito=0 drawer(abierto=true)=0 status-error=0 status-success=0
/en desk-paso0=0 desk-paso1=0 desk-paso2=0 desk-paso3=0 desk-pasoexito=0 mob-paso0=0 mob-paso1=0 mob-paso2=0 mob-paso3=0 mob-pasoexito=0 drawer(abierto=true)=0 status-error=0 status-success=0
/pt desk-paso0=0 desk-paso1=0 desk-paso2=0 desk-paso3=0 desk-pasoexito=0 mob-paso0=0 mob-paso1=0 mob-paso2=0 mob-paso3=0 mob-pasoexito=0 drawer(abierto=true)=0 status-error=0 status-success=0
ejecuciones=39 violaciones_totales=0
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["bash","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/email_run.sh"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:31:46-03:00","exit":0,"sha256":"045f3e067f35f97475a2eab2def999f275b9ab249e1006089948dc7f8a176e6b","lineas":8,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.10`** · exit 0 · 8 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:31:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
bash /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/email_run.sh
```

```text
sitio: fondo #25d366 texto #111b21 ratio 8.80
OK  contacto con teléfono: #111b21 sobre #25d366 = 8.80:1; coincide con sitio=true; href=https://wa.me/56912345678?text=H…
OK  cotizacion-rapida con teléfono: #111b21 sobre #25d366 = 8.80:1; coincide con sitio=true; href=https://wa.me/56912345678?text=H…
OK  cotizacion-4 con teléfono: #111b21 sobre #25d366 = 8.80:1; coincide con sitio=true; href=https://wa.me/56912345678?text=H…
OK  contacto sin teléfono: botón ausente=true
OK  cotizacion-rapida sin teléfono: botón ausente=true
OK  cotizacion-4 sin teléfono: botón ausente=true
errores=0
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/states.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:36:40-03:00","exit":0,"sha256":"3effd9a54c6b52040442c7bcc4f2a1cb71876e94d46c860d54a0158d315bf232","lineas":41,"omitidas":1,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.11`** · exit 0 · 41 líneas, 1 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:36:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/states.mjs
```

```text
cta-hero                   umbral 4.5  peor=5.10
cta-hero-hover>=5          umbral 5  peor=5.10
brand-nav                  umbral 4.5  peor=6.08
brand-servicios            umbral 4.5  peor=6.08
svc-tag-cta                umbral 4.5  peor=6.44
drawer-cta                 umbral 4.5  peor=5.10
drawer-wa                  umbral 4.5  peor=5.63
drawer-link                umbral 4.5  peor=7.70
nav-link                   umbral 4.5  peor=7.30
nav-link-activo            umbral 4.5  peor=7.30
skip-link                  umbral 4.5  peor=6.08
form-submit                umbral 4.5  peor=6.44
channel-wa                 umbral 4.5  peor=8.80
pin-oficina                umbral 3  peor=6.44
404-cta                    umbral 4.5  peor=5.10
404-cta-hover>=5           umbral 5  peor=5.10
cta-final-btn              umbral 4.5  peor=6.08
cta-final-btn-cta          umbral 4.5  peor=6.08
cta-final-btn-wa           umbral 4.5  peor=5.63
svc-filter-activo          umbral 4.5  peor=16.08
svc-filter-inactivo        umbral 4.5  peor=5.44
btn-primary-lg             umbral 4.5  peor=6.44
mode-check                 umbral 3  peor=6.44
quote-step-num             umbral 4.5  peor=6.91
quote-empty                umbral 4.5  peor=5.44
quote-sla                  umbral 4.5  peor=5.80
quote-title                umbral 4.5  peor=16.08
exito-seal                 umbral 3  peor=6.44
exito-step-n               umbral 4.5  peor=6.46
exito-btn-brand            umbral 4.5  peor=6.08
exito-btn-wa               umbral 4.5  peor=5.63
eyebrow                    umbral 4.5  peor=5.91
eyebrow-why                umbral 4.5  peor=6.46
contact-pill               umbral 4.5  peor=5.80
cta-final-hint             umbral 4.5  peor=9.30
cta-final-status-error     umbral 4.5  peor=8.51
cta-final-status-ok        umbral 4.5  peor=9.21
howwork-step               umbral 4.5  peor=8.45
ind-item-num               umbral 4.5  peor=9.27

```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:39:50-03:00","exit":0,"sha256":"0c7bfcd062a4416fe6b39ff27882b3a1199e915e2226cbc2cd94d9961be57dc7","lineas":25,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.12`** · exit 0 · 25 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:39:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
desk /es/ paradas=43/43 peor=5.68
desk /es/servicios/ paradas=37/37 peor=5.68
desk /es/industrias/ paradas=48/48 peor=5.69
desk /es/nosotros/ paradas=24/24 peor=5.69
desk /es/contacto/ paradas=26/26 peor=5.68
desk /es/cotizar/ paradas=18/18 peor=5.10
desk /es/xx-nope/ paradas=14/14 peor=5.68
desk /en/ paradas=43/43 peor=5.68
desk /en/servicios/ paradas=37/37 peor=5.68
desk /en/industrias/ paradas=48/48 peor=5.69
desk /en/nosotros/ paradas=24/24 peor=5.69
desk /en/contacto/ paradas=26/26 peor=5.68
desk /en/cotizar/ paradas=18/18 peor=5.09
desk /en/xx-nope/ paradas=14/14 peor=5.68
desk /pt/ paradas=43/43 peor=5.68
desk /pt/servicios/ paradas=37/37 peor=5.68
desk /pt/industrias/ paradas=48/48 peor=5.69
desk /pt/nosotros/ paradas=24/24 peor=5.69
desk /pt/contacto/ paradas=26/26 peor=5.68
desk /pt/cotizar/ paradas=18/18 peor=5.10
desk /pt/xx-nope/ paradas=14/14 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 0

paradas_totales=630
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:40:28-03:00","exit":1,"sha256":"92e20437188240db7ea383611b922bc956971ce793b66c3b9c50c605f0558e1b","lineas":11,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.13`** · exit 1 · 11 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:40:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
mob /es/ paradas=38/38 peor=5.68
mob /es/servicios/ paradas=32/32 peor=5.68
mob /es/industrias/ paradas=43/43 peor=5.69
mob /es/nosotros/ paradas=19/19 peor=5.69
mob /es/contacto/ paradas=21/21 peor=1.25
mob /es/cotizar/ paradas=13/13 peor=5.69
mob /es/xx-nope/ paradas=9/9 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 1
/es/contacto/ a ratio=1.25 ring=rgb(59, 100, 151) w=3 off=2
paradas_totales=175
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:46:11-03:00","exit":0,"sha256":"33272cf0991dd584121931b941f381a71028ced67f12a503f04fad61ac7bacbd","lineas":6,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.14`** · exit 0 · 6 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:46:11-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
OK   ind nombre                                 n=144 peor=5.94 en /es d1024 slide 5 «E-commerce» fg=rgb(255, 255, 255)
OK   ind eyebrow                                n=144 peor=4.73 en /es d1024 slide 8 «Sector · 08» fg=rgb(216, 241, 230)
OK   ind sub                                    n=144 peor=5.95 en /es d1024 slide 2 «Moda, consumo, tem» fg=rgba(255, 255, 255, 0.78)
OK   ind tags                                   n=396 peor=7.88 en /es m390 slide 8 «Industrial» fg=rgb(255, 255, 255)
BAJO ind contador                               n=144 peor=1.32 en /es d1024 slide 3 «03 / 12» fg=rgb(255, 255, 255)
grupos=5 grupos_bajo_4.5=1
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=contacto,heroes,ctafinal node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:47:45-03:00","exit":0,"sha256":"94e625a935df0c964a18034eb76981895ca672f3962efca5d7b7b45d83aca0f9","lineas":7,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.15`** · exit 0 · 7 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:47:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=contacto,heroes,ctafinal node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
OK   contacto canal WA (nombre/valor)           n= 12 peor=8.80 en /es d1440 «WhatsApp · respues» fg=rgb(17, 27, 33)
OK   contacto otros canales                     n= 24 peor=5.44 en /es d1440 «Teléfono» fg=rgb(110, 105, 99)
OK   migas de pan (a)                           n= 30 peor=6.53 en /es d1440 cotizar «Inicio» fg=rgb(215, 228, 244)
OK   hero h1                                    n= 30 peor=7.32 en /es d1440 cotizar «Cotiza en 4 pasos.» fg=rgb(255, 255, 255)
OK   cta-final textos                           n=156 peor=8.83 en /es / «Cotización rápida » fg=rgb(174, 199, 229)
OK   cta-final botones                          n= 36 peor=6.08 en /es / «Cotiza ahora» fg=rgb(255, 255, 255)
grupos=6 grupos_bajo_4.5=0
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"#!/bin/bash\n# Contrafactual: mismo muestreo con el degradado del overlay revertido al de escritorio en todos los anchos\nREVERT_OVERLAY=1 ONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:53:28-03:00","exit":0,"sha256":"80bb5f257e8465485831651990d4db86360643851ca2922104ef4faf10ebae1a","lineas":6,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase; contrafactual: revierte el overlay solo en el navegador y no escribe en el repo"} -->
**Evidencia `verify-report.16`** · exit 0 · 6 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:53:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase; contrafactual: revierte el overlay solo en el navegador y no escribe en el repo

```bash
#!/bin/bash
# Contrafactual: mismo muestreo con el degradado del overlay revertido al de escritorio en todos los anchos
REVERT_OVERLAY=1 ONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
BAJO ind nombre                                 n=144 peor=2.44 en /es m390 slide 8 «Iluminarias» fg=rgb(255, 255, 255)
BAJO ind eyebrow                                n=144 peor=1.77 en /es m390 slide 8 «Sector · 08» fg=rgb(216, 241, 230)
BAJO ind sub                                    n=144 peor=3.07 en /es m390 slide 8 «LED e industrial» fg=rgba(255, 255, 255, 0.78)
OK   ind tags                                   n=396 peor=5.07 en /es m390 slide 8 «Industrial» fg=rgb(255, 255, 255)
BAJO ind contador                               n=144 peor=1.32 en /es d1024 slide 3 «03 / 12» fg=rgb(255, 255, 255)
grupos=5 grupos_bajo_4.5=4
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:56:43-03:00","exit":0,"sha256":"e26f407c3295feee134605d4c646b1c011651afa9cc438d7713d379262fa798b","lineas":25,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.17`** · exit 0 · 25 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:56:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
desk /es/ paradas=42/43 peor=5.68
desk /es/servicios/ paradas=36/37 peor=5.68
desk /es/industrias/ paradas=47/48 peor=5.69
desk /es/nosotros/ paradas=23/24 peor=5.69
desk /es/contacto/ paradas=25/26 peor=5.68
desk /es/cotizar/ paradas=17/18 peor=5.10
desk /es/xx-nope/ paradas=13/14 peor=5.68
desk /en/ paradas=42/43 peor=5.68
desk /en/servicios/ paradas=36/37 peor=5.68
desk /en/industrias/ paradas=47/48 peor=5.69
desk /en/nosotros/ paradas=23/24 peor=5.69
desk /en/contacto/ paradas=25/26 peor=5.68
desk /en/cotizar/ paradas=17/18 peor=5.09
desk /en/xx-nope/ paradas=13/14 peor=5.68
desk /pt/ paradas=42/43 peor=5.68
desk /pt/servicios/ paradas=36/37 peor=5.68
desk /pt/industrias/ paradas=47/48 peor=5.69
desk /pt/nosotros/ paradas=23/24 peor=5.69
desk /pt/contacto/ paradas=25/26 peor=5.68
desk /pt/cotizar/ paradas=17/18 peor=5.10
desk /pt/xx-nope/ paradas=13/14 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 0

paradas_totales=609
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T12:57:20-03:00","exit":0,"sha256":"5a6962ba5bfe3454dac38d909a2ff6a2525c48b022a51f07fb4a002e1988df73","lineas":11,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.18`** · exit 0 · 11 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T12:57:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
mob /es/ paradas=37/38 peor=5.68
mob /es/servicios/ paradas=31/32 peor=5.68
mob /es/industrias/ paradas=42/43 peor=5.69
mob /es/nosotros/ paradas=18/19 peor=5.69
mob /es/contacto/ paradas=20/21 peor=5.68
mob /es/cotizar/ paradas=12/13 peor=5.69
mob /es/xx-nope/ paradas=8/9 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 0

paradas_totales=168
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:03:03-03:00","exit":0,"sha256":"7dad69a4be1ae340b867ee7bc0e8451fde7d21e3a7e8e8b484ffbe21a40bd202","lineas":6,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.19`** · exit 0 · 6 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:03:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=ind node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
OK   ind nombre                                 n=144 peor=5.94 en /es d1024 slide 5 «E-commerce» fg=rgb(255, 255, 255)
OK   ind eyebrow                                n=144 peor=4.73 en /es d1024 slide 8 «Sector · 08» fg=rgb(216, 241, 230)
OK   ind sub                                    n=144 peor=5.95 en /es d1024 slide 2 «Moda, consumo, tem» fg=rgba(255, 255, 255, 0.78)
OK   ind tags                                   n=396 peor=7.88 en /es m390 slide 8 «Industrial» fg=rgb(255, 255, 255)
OK   ind contador                               n=144 peor=6.77 en /es d1024 slide 3 «03 / 12» fg=rgb(255, 255, 255)
grupos=5 grupos_bajo_4.5=0
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:09:03-03:00","exit":0,"sha256":"53ebde14e9679d251041d74bf91e1fb86bf4342c98d97da5136b1cce28626a4b","lineas":2,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.20`** · exit 0 · 2 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:09:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
BAJO titulos h1-h6                              n=576 peor=1.05 en /es d1440 / «Consultoría Logíst» fg=rgb(255, 255, 255)
grupos=1 grupos_bajo_4.5=1
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:19:31-03:00","exit":1,"sha256":"2ac81fe4b16316f2c8fdb38c3ba84e1df3abb8b77247f65bf4a5655f6ff726ed","lineas":38,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.21`** · exit 1 · 38 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:19:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
desk /es/ paradas=43/43 peor=1.70
desk /es/servicios/ paradas=37/37 peor=1.70
desk /es/industrias/ paradas=48/48 peor=1.70
desk /es/nosotros/ paradas=24/24 peor=1.70
desk /es/contacto/ paradas=26/26 peor=1.70
desk /es/cotizar/ paradas=18/18 peor=1.70
desk /es/xx-nope/ paradas=14/14 peor=1.70
desk /en/ paradas=43/43 peor=1.00
desk /en/servicios/ paradas=37/37 peor=1.00
desk /en/industrias/ paradas=48/48 peor=1.00
desk /en/nosotros/ paradas=24/24 peor=1.00
desk /en/contacto/ paradas=26/26 peor=1.00
desk /en/cotizar/ paradas=18/18 peor=1.00
desk /en/xx-nope/ paradas=14/14 peor=1.00
desk /pt/ paradas=43/43 peor=4.44
desk /pt/servicios/ paradas=37/37 peor=4.44
desk /pt/industrias/ paradas=48/48 peor=4.44
desk /pt/nosotros/ paradas=24/24 peor=4.44
desk /pt/contacto/ paradas=26/26 peor=4.44
desk /pt/cotizar/ paradas=18/18 peor=4.44
desk /pt/xx-nope/ paradas=14/14 peor=4.44
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 14
/es/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/servicios/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/industrias/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/nosotros/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/contacto/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/cotizar/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/xx-nope/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/en/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/servicios/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/industrias/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/nosotros/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/contacto/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/cotizar/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
/en/xx-nope/ a.nav__brand.nav__brand--footer ratio=1.00 ring=rgb(135, 211, 176) w=3 off=2
paradas_totales=630
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:20:09-03:00","exit":1,"sha256":"73661c93066e0e855f49dea7849e79dae93db1ca2145db531b1b15a87849b2c4","lineas":17,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.22`** · exit 1 · 17 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:20:09-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
mob /es/ paradas=38/38 peor=1.70
mob /es/servicios/ paradas=32/32 peor=1.70
mob /es/industrias/ paradas=43/43 peor=1.70
mob /es/nosotros/ paradas=19/19 peor=1.70
mob /es/contacto/ paradas=21/21 peor=1.70
mob /es/cotizar/ paradas=13/13 peor=1.70
mob /es/xx-nope/ paradas=9/9 peor=1.70
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 7
/es/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/servicios/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/industrias/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/nosotros/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/contacto/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/cotizar/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
/es/xx-nope/ a.nav__brand.nav__brand--footer ratio=1.70 ring=rgb(135, 211, 176) w=3 off=2
paradas_totales=175
```
<!-- evidencia:fin verify-report.22 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:26:02-03:00","exit":0,"sha256":"bed89cf2d1645e51d66fbe2a3e023feded32d56763b0bf2f06934b21bb0b166f","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.23`** · exit 0 · 4 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:26:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
BAJO titulos h1-h6 (texto claro)                n=294 peor=1.05 en /es d1440 / «Consultoría Logíst» fg=rgb(255, 255, 255)
     <4.5 en 100 de 294; clases: svc-card__title=79 ind-card__name=15 hero-b__title=6
OK   titulos h1-h6 (texto oscuro)               n=282 peor=5.11 en /es d1440 / «Nosotros» fg=rgb(137, 133, 128)
grupos=2 grupos_bajo_4.5=1
```
<!-- evidencia:fin verify-report.23 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:30:23-03:00","exit":0,"sha256":"0c7bfcd062a4416fe6b39ff27882b3a1199e915e2226cbc2cd94d9961be57dc7","lineas":25,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.24`** · exit 0 · 25 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:30:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=desk LANGS=,/en,/pt node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
desk /es/ paradas=43/43 peor=5.68
desk /es/servicios/ paradas=37/37 peor=5.68
desk /es/industrias/ paradas=48/48 peor=5.69
desk /es/nosotros/ paradas=24/24 peor=5.69
desk /es/contacto/ paradas=26/26 peor=5.68
desk /es/cotizar/ paradas=18/18 peor=5.10
desk /es/xx-nope/ paradas=14/14 peor=5.68
desk /en/ paradas=43/43 peor=5.68
desk /en/servicios/ paradas=37/37 peor=5.68
desk /en/industrias/ paradas=48/48 peor=5.69
desk /en/nosotros/ paradas=24/24 peor=5.69
desk /en/contacto/ paradas=26/26 peor=5.68
desk /en/cotizar/ paradas=18/18 peor=5.09
desk /en/xx-nope/ paradas=14/14 peor=5.68
desk /pt/ paradas=43/43 peor=5.68
desk /pt/servicios/ paradas=37/37 peor=5.68
desk /pt/industrias/ paradas=48/48 peor=5.69
desk /pt/nosotros/ paradas=24/24 peor=5.69
desk /pt/contacto/ paradas=26/26 peor=5.68
desk /pt/cotizar/ paradas=18/18 peor=5.10
desk /pt/xx-nope/ paradas=14/14 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 0

paradas_totales=630
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"archivo","argv":null,"texto":"#!/bin/bash\nVPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:31:01-03:00","exit":0,"sha256":"473216a5df13bbbcce82f0baba4a9c6048b58537fc4af249609c470ad46e85be","lineas":11,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.25`** · exit 0 · 11 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
VPS=mob LANGS= node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/ring.mjs
```

```text
mob /es/ paradas=38/38 peor=5.68
mob /es/servicios/ paradas=32/32 peor=5.68
mob /es/industrias/ paradas=43/43 peor=5.69
mob /es/nosotros/ paradas=19/19 peor=5.69
mob /es/contacto/ paradas=21/21 peor=5.68
mob /es/cotizar/ paradas=13/13 peor=5.69
mob /es/xx-nope/ paradas=9/9 peor=5.68
SIN ANILLO (outline none/0): 0 
FALLAS <3:1: 0

paradas_totales=175
```
<!-- evidencia:fin verify-report.25 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.26","forma":"archivo","argv":null,"texto":"#!/bin/bash\nONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:36:54-03:00","exit":0,"sha256":"c5625e56c46620f99fddf7c1b6177fde2a233b253d8d853ae1a80dbc00e5fee8","lineas":4,"omitidas":0,"no_recomprobable":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"} -->
**Evidencia `verify-report.26`** · exit 0 · 4 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:36:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase

```bash
#!/bin/bash
ONLY=titles node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-verify-l2juug5t/pixels.mjs
```

```text
BAJO titulos h1-h6 (texto claro)                n=294 peor=1.05 en /es d1440 / «Consultoría Logíst» fg=rgb(255, 255, 255)
     <4.5 en 100 de 294; clases: svc-card__title=79 ind-card__name=15 hero-b__title=6; páginas: /=48 /servicios/=52
OK   titulos h1-h6 (texto oscuro)               n=282 peor=5.11 en /es d1440 / «Nosotros» fg=rgb(137, 133, 128)
grupos=2 grupos_bajo_4.5=1
```
<!-- evidencia:fin verify-report.26 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.27","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:37:18-03:00","exit":1,"sha256":"b2b00ec8476b0bb9ab56ca7e394ce53f183ea22d220d0237c624a7fbd34f6729","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volvería a comprobar este informe"} -->
**Evidencia `verify-report.27`** · exit 1 · 1 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:37:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: comprobar sobre verify-report.md volvería a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/apply-evidence.md","bloques":22,"comprobados":9,"calzan":["apply-evidence.1","apply-evidence.4","apply-evidence.5","apply-evidence.19","apply-evidence.20","apply-evidence.21","apply-evidence.22"],"no_calzan":[{"id":"apply-evidence.3","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.14","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.2","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.6","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.7","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.8","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.9","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.10","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.11","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.12","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.13","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence.15","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.16","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-evidence.17","motivo":"requiere astro preview en ejecuci\u00f3n y Chrome/puppeteer fuera del repo"},{"id":"apply-e…(+113 caracteres)
```
<!-- evidencia:fin verify-report.27 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.28","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"d92da75b074425add83fb8f26efa4e0c45c30d80","fecha":"2026-10-06T13:37:32-03:00","exit":0,"sha256":"4a1ee44a2603ad7a868f675369708e5e4f94c5d852f57db068c824424655ac25","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría el informe a sí mismo"} -->
**Evidencia `verify-report.28`** · exit 0 · 1 líneas, 0 omitidas · HEAD `d92da75b0744` · 2026-10-06T13:37:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaría el informe a sí mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/memory/changes/fix-color-contrast-sitewide/verify-report.md","bloques":27,"comprobados":4,"calzan":["verify-report.1","verify-report.2","verify-report.4","verify-report.6"],"no_calzan":[],"omitidos":[{"id":"verify-report.3","motivo":"el build reescribe dist/ (ignorado por git) y su salida lleva tiempos; repetirlo con el preview en marcha provoca 500"},{"id":"verify-report.5","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.7","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.8","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.9","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.10","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.11","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.12","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.13","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.14","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.15","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.16","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase; contrafactual: revierte el overlay solo en el navegador y no escribe en el repo"},{"id":"verify-report.17","motivo":"requiere astro preview en 127.0.0.1:4399 y Chrome levantados solo durante la fase"},{"id":"verify-report.18","motivo":"req…(+1156 caracteres)
```
<!-- evidencia:fin verify-report.28 -->
