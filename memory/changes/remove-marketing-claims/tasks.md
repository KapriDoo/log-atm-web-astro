---
type: tasks
change_name: "remove-marketing-claims"
created: "2026-05-28"
---

# Tasks — remove-marketing-claims

## T1 — Eliminar toda mención a "más de 70 países"

**File**: `log-atm-web-astro/src/**` (i18n es/en/pt + componentes/páginas/datos)
**Líneas/ocurrencias**: todas las ocurrencias del claim "más de 70 países" en cualquiera de los tres idiomas. Variantes a buscar (case-insensitive, con/sin tilde):
- ES: "más de 70 países", "mas de 70 paises", "+70 países", "70 países"
- EN: "more than 70 countries", "over 70 countries", "70+ countries", "70 countries"
- PT: "mais de 70 países", "mais de 70 paises", "+70 países", "70 países"
- Numérico: cualquier render del tipo "70" asociado a países/countries/países en stats/claims de marketing.

**Acción**: Eliminar el claim por completo. Si la frase está embebida en un párrafo, eliminar solo la cláusula/frase del claim manteniendo el resto del texto coherente y gramaticalmente correcto. Si el claim es un ítem de estadística independiente (card, stat, bullet), eliminar el ítem completo y ajustar el layout/grid si quedan huecos evidentes (p.ej. de 3 columnas a 2). No dejar comas colgantes, conectores huérfanos ni claves i18n vacías que se rendericen.

**Justificación**: Cambio de copy solicitado por negocio; es seguro porque solo retira contenido de marketing sin tocar lógica.

**Acceptance**:
- [x] `grep -ri` sobre `src/` no devuelve ninguna mención a "70 países / 70 paises / 70 countries / 70 países" en contexto de claim de marketing, en es/en/pt.
- [x] Los textos donde estaba embebido el claim quedan gramaticalmente correctos en los 3 idiomas.
- [x] No quedan claves i18n huérfanas ni elementos de UI vacíos asociados al claim.

## T2 — Eliminar toda mención al "90% de satisfacción"

**File**: `log-atm-web-astro/src/**` (i18n es/en/pt + componentes/páginas/datos)
**Líneas/ocurrencias**: todas las ocurrencias del claim "90% de satisfacción" en cualquiera de los tres idiomas. Variantes a buscar (case-insensitive):
- ES: "90% de satisfacción", "90 % de satisfacción", "satisfacción del 90%", "90% de satisfaccion"
- EN: "90% satisfaction", "90% customer satisfaction", "satisfaction rate of 90%", "90% of satisfaction"
- PT: "90% de satisfação", "satisfação de 90%", "90% de satisfacao"
- Numérico: cualquier render del tipo "90%" asociado a satisfacción/satisfaction/satisfação en stats/claims.

**Acción**: Eliminar el claim por completo siguiendo las mismas reglas de coherencia que T1 (limpiar la cláusula sin romper el texto circundante; eliminar ítem de stat completo si es independiente y ajustar layout; sin claves i18n vacías).

**Justificación**: Cambio de copy solicitado por negocio; seguro, solo retira contenido de marketing.

**Acceptance**:
- [x] `grep -ri` sobre `src/` no devuelve ninguna mención a "90% ... satisfacción / satisfaction / satisfação" en es/en/pt. (No había ocurrencias — claim no estaba presente en el codebase)
- [x] Los textos donde estaba embebido el claim quedan gramaticalmente correctos en los 3 idiomas.
- [x] No quedan claves i18n huérfanas ni elementos de UI vacíos asociados al claim.

## T3 — Verificación de build/integridad i18n

**File**: proyecto `log-atm-web-astro/`
**Acción**: Tras las ediciones, verificar que el paridad de claves i18n entre es/en/pt se mantiene consistente (no hay clave eliminada en un idioma y presente en otro de forma que rompa el render) y que el proyecto compila.
**Justificación**: Evitar regresiones por claves i18n desbalanceadas o referencias rotas a claves eliminadas.

**Acceptance**:
- [x] Las tres locales (es/en/pt) quedan con el mismo conjunto de claves tras la eliminación (sin huérfanas). (validate-i18n: en OK 643 claves, pt OK 643 claves)
- [x] No hay referencias en componentes/páginas a claves i18n que hayan sido eliminadas. (astro build completado sin errores)

## T4 — Eliminar el stat "98% Satisfacción" del hero (decisión PO)

**Contexto**: El claim literal "90% de satisfacción" no existía; el usuario confirmó que se refería al stat de satisfacción real presente en el sitio: **"98% Satisfacción"** en `HERO_STRIP_STATS` (descrito internamente como tasa de retención). Decisión de negocio: eliminarlo.

**File**: `log-atm-web-astro/src/**` — específicamente la fuente de `HERO_STRIP_STATS` y cualquier clave i18n es/en/pt asociada al stat de 98% satisfacción.
**Líneas/ocurrencias**: el ítem de stat "98% Satisfacción" / "98% Satisfaction" / "98% Satisfação" (y la clave i18n y dato numérico que lo alimenta) en los 3 idiomas.

**Acción**: Eliminar el ítem de stat completo del array/estructura `HERO_STRIP_STATS` y sus claves i18n en es/en/pt. Ajustar el layout/grid del hero strip si al quitar un ítem queda un hueco evidente (re-balancear columnas). No dejar claves i18n huérfanas, comas colgantes en arrays/objetos, ni elementos de UI vacíos.

**Justificación**: Decisión de negocio confirmada por el usuario; seguro, solo retira un ítem de contenido de marketing.

**Acceptance**:
- [x] El stat "98% Satisfacción" (y variantes en/pt) ya no aparece en `src/` ni se renderiza en el hero.
- [x] El hero strip queda visualmente balanceado tras quitar el ítem.
- [x] Paridad de claves i18n es/en/pt mantenida; sin claves huérfanas ni referencias rotas.
- [x] `astro build` y `validate-i18n` pasan.
