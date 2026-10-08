---
type: external-input
domain: debt
change_name: debt-copy-tokens-ssot
fast_path: spec-first
priority: P3
depends_on: [fix-i18n-links-and-404]
source: validacion-auditoria-2026-10-02
---
# Brief 07 — SSOT de copy y datos del sitio, tokens huérfanos y "Última milla"

**Despacho:** `sdd new debt-copy-tokens-ssot --domain debt --path spec-first --integration-target main --input-file .sdd/briefs/auditoria-2026-10/07-debt-copy-tokens-ssot.md`

> Rutas `src/...` relativas a `log-atm-web-astro/`; `memory/...` relativa a la raíz del repo. Origen: validación de auditoría (D3, D4, D6, D9, D12). **Despachar después de `fix-i18n-links-and-404`** (ambos tocan `SERVICES` y sus consumidores).

> **Revalidado contra `main` @ `e9d68ae` (2026-10-08)**, tras los PR #34–#39: los números de línea pueden haberse corrido — ubicar por contenido. Cambios respecto de la versión original de este brief: (a) el patrón de fallback está en **10 sitios**, no 4; (b) de los tokens de WhatsApp solo `--color-whatsapp-hover-dark` sigue sin uso (el PR #36 conectó los demás); (c) el PR #36 creó `memory/specs/ui-contrast/contrast-token-single-source.md`, que la política de color debe **extender**, no duplicar.

## Decisiones del usuario (2026-10-02)

- **"Última milla" no se ofrece** como extra en cotizar → eliminarla.
- **Tokens de WhatsApp:** eliminar los que no se usan. Si el brief 11 (contraste) ya creó/usó un token de WhatsApp, ese se conserva: solo se eliminan los que sigan sin consumidores.
- **No** migrar los ~71 valores de color literales a tokens: se ajusta la regla de `tokens.css` a la realidad (YAGNI).

## Para deuda técnica

- **Estado actual**:
  1. **Copy duplicado en `src/lib/constants.ts`.** Las constantes contienen copy en español que se usa como fallback con el patrón `copy[i] ?? constante` en **10 sitios** (verificado en `main` @ `e9d68ae`): `src/components/sections/ServicesSection.astro` (`SERVICES`), `src/pages/servicios.astro` (`SERVICES`), `src/pages/nosotros.astro` (`VALUES`), `src/pages/cotizar.astro` (`QUOTE_MODES` y `QUOTE_STEPS`), `src/components/sections/WhyVideoSection.astro` (`whyCopy`), `src/components/sections/IndustriesSection.astro` (`INDUSTRIES`), `src/components/sections/HeroSection.astro` (`stripLabels` / `HERO_STRIP_STATS`) y `src/components/sections/CTASection.astro` (`QUICK_QUOTE_MODES` y `QUICK_QUOTE_VOLUMES`). Cuatro de esos textos **contradicen** el copy vigente del i18n: `SERVICES[0]` "…tiempos garantizados" + tag `'Express · 48h'` (`:76-77`), `SERVICES[3]` "Bodegaje, fulfillment y última milla" (`:109`), `VALUES[3]` "KPIs medibles y revisión trimestral" (`:278`), `QUOTE_MODES` aéreo "Express 48h–7d" (`:292`). Hoy no se renderizan (0 apariciones en `dist/`), pero si una lista del i18n pierde un ítem, el texto obsoleto en español aparecería en los 3 idiomas. `scripts/validate-i18n.ts` exige paridad de claves entre idiomas pero no compara contra las constantes.
  2. **SSOT parcial de datos del sitio.** `src/layouts/BaseLayout.astro:26-27` redefine `SITE_NAME`/`SITE_URL`; el JSON-LD tiene dirección, `sameAs` y slogan hardcodeados (`:79-98`); `SEO` se exporta sin consumidores (`constants.ts:54`); `whatsappUrl` repite el número de teléfono (`constants.ts:46`); la dirección está hardcodeada en `src/lib/email-templates.ts:116`.
  3. **Tokens huérfanos en `src/styles/tokens.css`.** 18 `--opacity-*` sin ningún consumidor (`:89-106`, duplicados en `@theme` `:213-230`); tokens de WhatsApp: tras el PR #36, `--color-whatsapp`, `--color-whatsapp-hover` y `--color-whatsapp-text` están en uso (7 consumidores `var(--color-whatsapp…)`); **solo `--color-whatsapp-hover-dark` (`#0d6b61`) sigue sin consumidores** (en `:root` y en `@theme`). La regla auto-declarada de `tokens.css:6-7` ("nunca colores hardcodeados") no se cumple: 141 literales `rgb/rgba/#hex` en CSS fuera de `tokens.css` (71 valores distintos) + 16 en `.astro`. Los hex de `email-templates.ts` son una excepción legítima (los emails exigen estilos inline).
  4. **Comentario de decisión de colores de industrias eliminado** por `223147a`; los 12 hex de `constants.ts:222-233` (6 coinciden con tokens, 6 sin token) quedaron sin la justificación que exige el AC de `memory/specs/data/industries-colors.md`.
  5. **"Última milla"** sigue como extra en `cotizar.extras[3]` en `src/i18n/translations/{es,en,pt}.json` (`:497`). Consumidores: `src/pages/cotizar.astro:31` (`tList`), `src/scripts/wizard.ts` (`state.extras` → payload `services` → API `/api/cotizacion` → plantilla de correo).
  6. **6 specs "centralizar estilos"** (`memory/specs/sections/{cta,hero,services,why}-styles.md`, `memory/specs/components/{navbar,footer}-styles.md`) quedaron obsoletas: el redesign reintrodujo literales (cta.css 17, hero.css 11, Navbar.astro 5, why.css 4, services.css 5); `footer-styles` es obsoleta por otra razón (el footer ya no tiene botón WhatsApp). `sections/industries-styles.md` sobrevive solo porque su AC prohíbe hex (tiene 6 `rgba`).
- **Estado deseado**:
  1. `constants.ts` contiene solo datos no textuales (ids, `img`, `icon`, `size`, `href`, colores); todo el texto sale del i18n. Un desalineamiento entre datos y copy **falla en build** en vez de degradar en silencio (mecanismo a definir en diseño: p. ej. claves por id o chequeo de longitudes en `validate-i18n`).
  2. Nombre, URL, teléfono, email, dirección, redes y slogan del sitio viven solo en `SITE` (o equivalente único) y los consumen `BaseLayout` (meta + JSON-LD), `email-templates.ts` y `whatsappUrl`. `SEO` sin consumidores se elimina.
  3. Se eliminan los 18 tokens `--opacity-*` y `--color-whatsapp-hover-dark` (en `:root` y en `@theme`); los demás tokens de WhatsApp se conservan (están en uso). La regla de `tokens.css:6-7` se reescribe para reflejar la política real (p. ej.: colores de marca y semánticos solo vía tokens; literales permitidos para sombras/overlays puntuales y colores de terceros como WhatsApp).
  4. Comentario de una línea en `constants.ts:222-233` con la decisión de colores de industrias (cumple AC de `industries-colors`).
  5. El paso de extras del wizard ofrece 4 opciones (sin "Última milla") en es/en/pt; si la API valida una lista de servicios permitidos, se actualiza en consecuencia.
  6. La política de color del punto 3 se formaliza **extendiendo** `memory/specs/ui-contrast/contrast-token-single-source.md` (creada por el PR #36) o con un delta sobre ella — no una spec nueva paralela (DRY) — y las 6 specs de estilos + `industries-styles` quedan con `superseded_by` hacia esa spec.
- **Archivos/módulos afectados**: `src/lib/constants.ts`, `src/components/sections/ServicesSection.astro`, `src/pages/{servicios,nosotros,cotizar}.astro`, `src/layouts/BaseLayout.astro`, `src/lib/email-templates.ts`, `src/styles/tokens.css`, `src/i18n/translations/{es,en,pt}.json`, `scripts/validate-i18n.ts` (si se elige ese mecanismo), `src/pages/api/cotizacion.ts` (solo si valida extras), `memory/specs/tokens/`, `memory/specs/sections/*-styles.md`, `memory/specs/components/{navbar,footer}-styles.md`.
- **Justificación de prioridad**: riesgo latente (copy obsoleto que reaparece sin aviso) y violación de SSOT/DRY que encarece cada cambio de contenido; los tokens y specs huérfanos confunden a quien mantiene el sistema de diseño. Sin impacto visible hoy, por eso va después de los fixes.

## Criterios de aceptación

- [ ] `constants.ts` no contiene strings de copy visibles por el usuario; `/usr/bin/grep` de los 4 textos obsoletos en `src/` sin resultados.
- [ ] Quitar un ítem de una lista del i18n (prueba local) hace fallar el build o `npm run validate-i18n`.
- [ ] El HTML generado (`dist/client`) de home, servicios, nosotros y cotizar es idéntico en contenido visible al de antes del cambio, salvo la eliminación de "Última milla".
- [ ] Datos del sitio con una sola fuente: el JSON-LD, los meta, el correo y el link de WhatsApp leen de ella.
- [ ] `tokens.css` sin `--opacity-*` ni `--color-whatsapp-hover-dark`; tokens de WhatsApp en uso intactos; build sin cambios visuales; regla de cabecera actualizada.
- [ ] Wizard de cotizar con 4 extras en es/en/pt; `npm run validate-i18n` OK.
- [ ] Política de color formalizada en `ui-contrast/contrast-token-single-source` (extendida o con delta) y las 7 specs de estilos con `superseded_by` hacia ella.
- [ ] Los 10 sitios con fallback `copy[i] ?? constante` leen el texto solo del i18n.
- [ ] `npm run a11y`, `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links` y `npm run measure:images` en exit 0.

## Fuera de alcance

- Migrar los literales de color existentes a tokens (decisión YAGNI).
- Lista de locales repetida en `astro.config.mjs` / `validate-i18n.ts` → brief 08.
