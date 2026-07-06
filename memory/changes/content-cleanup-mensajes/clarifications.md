---
type: clarifications
change_name: "content-cleanup-mensajes"
status: resolved
created: "2026-07-05"
resolved: "2026-07-05"
count: 6
decisions:
  a: "cards-no-clicables"
  b: "armonizar-todas-20-anos"
  c: "incluir-sla-email-termino-general"
  d: "approach-b-acotado"
  e: "aplicar-fcl-fcl-lcl-lcl-en-bullet-detalle"
  f: "fix-contraste-solo-servicios"
---

# Clarifications — content-cleanup-mensajes

Seis ambigüedades detectadas en exploración que la lógica del pipeline no resuelve por sí sola. Cada una con opciones y recomendación explícita. Requieren decisión de la usuaria antes de sdd-spec.

## (a) Destino de los hrefs tras borrar las páginas de detalle de servicios
Al eliminar `/servicios/carga-aerea` y `/servicios/carga-maritima`, los campos `SERVICES[0].href` (constants L114) y `SERVICES[1].href` (L125) alimentan cards clicables en Home y en el catálogo /servicios → quedarían apuntando a un 404.
- **Opción 1**: redirigir ambos hrefs a `/cotizar`.
- **Opción 2**: apuntar a `/servicios` (anchor a la card del propio servicio; no-op de navegación).
- **Opción 3**: hacer las cards no-clicables (quitar href y el afford visual de enlace).
- **Recomendación**: Opción 1 (`/cotizar`) o, si se prefiere no empujar a cotizar, Opción 2. Evitar 404 en cualquier caso. Las 4 cargas de páginas se borran junto con sus claves i18n huérfanas.

## (b) Alcance de "20+ años" / coherencia con "Desde 2023"
El intent solo pide cambiar "Desde 2003"→"Desde 2023" y el título de Nosotros. Pero "20+ años" aparece en 5+ ubicaciones (home hero, footer, meta, título de timeline). Cambiar a "Desde 2023" deja la contradicción "2023 + 20+ años de experiencia".
- **Opción 1**: cambiar solo las 2 ocurrencias que pide el intent (queda contradicción narrativa visible).
- **Opción 2**: revisar y armonizar todas las ocurrencias de "20+ años"/años de experiencia para coherencia con "Desde 2023".
- **Recomendación**: Opción 2 (armonizar todas). El intent dice "cuando se indique quitar menciones, revisar todos los apartados" — aplica el mismo criterio de coherencia. Nota: la sección Trayectoria se elimina, lo que resuelve una de las ocurrencias automáticamente.

## (c) SLA "24 h hábiles" en email-templates.ts
`src/lib/email-templates.ts` L301 contiene "responder antes de 24 h hábiles" — un compromiso de tiempo finito en un template de correo, no una página. El intent dice "sin compromisos de tiempo" de forma global.
- **Opción 1**: incluirlo en alcance; reemplazar por término general (p. ej. "a la brevedad" / "lo antes posible").
- **Opción 2**: dejarlo fuera (solo cubrir páginas visibles).
- **Recomendación**: Opción 1. El intent es explícito en "sin compromisos de tiempo"; un SLA por correo es un compromiso finito equivalente a los de la web.

## (d) Dead code en constants.ts
Los arrays `FAQ`, `TIMELINE`, `CERTS` (entre otros) son código muerto. Sus secciones se eliminan en este cambio.
- **Opción A**: dejar todo el dead code intacto (no tocar constants más allá de lo vivo).
- **Opción B (acotado)**: borrar únicamente `FAQ`, `TIMELINE`, `CERTS` (los de las secciones que se eliminan); dejar el resto del dead code.
- **Recomendación**: Opción B. Borrar los arrays muertos de las secciones eliminadas evita que queden como trampa para futuros editores; el resto del dead code queda fuera de alcance (YAGNI). Esta es la recomendación adoptada en la propuesta.

## (e) Corrección "FCL/LCL" en Carga Marítima
El intent pide corregir "FCL/LCL" por "FCL/FCL" "LCL/LCL". En el código el texto visible real es "FCL y LCL"; el literal exacto "FCL/LCL" solo aparece en `servicios.details.items[1].features[0]` (bullet de detalle).
- **Opción 1**: aplicar la corrección al bullet de detalle `servicios.details.items[1].features[0]` (único literal "FCL/LCL").
- **Opción 2**: no aplicar (el texto principal ya dice "FCL y LCL", que es correcto).
- **Recomendación**: Opción 1 — aplicar en el bullet de detalle, que es donde existe el literal exacto que el intent quiere corregir. Confirmar con la usuaria el resultado deseado exacto ("FCL/FCL, LCL/LCL").

## (f) Contraste en "Cómo trabajamos" de /nosotros
El bug de contraste está confirmado en /servicios (`.process-step__title`, 6 pasos). La sección homónima de /nosotros (`.howwork-card__title`, 4 pasos, fondo claro) probablemente no lo comparte.
- **Opción 1**: aplicar el fix solo a /servicios y verificar /nosotros visualmente en sdd-verify.
- **Opción 2**: aplicar fix preventivo a ambas.
- **Recomendación**: Opción 1. El intent (pasos 03/05/06, textos citados) corresponde inequívocamente a /servicios; /nosotros tiene fondo claro y no presenta el patrón token-como-texto-y-fondo. Verificar /nosotros en verify sin fix especulativo (KISS/YAGNI).
