---
type: proposal
change_name: "content-cleanup-mensajes"
status: approved
domain: feature
fast_path: full
effort: L
created: "2026-07-05"
risks:
  - id: R1
    descripcion: "Desalineación de arrays por merge por índice (CONST.map((x,i)=>{...tList[i]})) al acortar bullets/pasos sin sincronizar ambos lados y los 3 JSON."
    probabilidad: Media
    impacto: Alto
    mitigacion: "Editar contenido solo en el/los mismos índices en los 3 JSON; no reordenar; validador i18n build-time cubre paridad de claves, no de longitud de listas → revisar visual en verify."
  - id: R2
    descripcion: "Borrado asimétrico de claves i18n entre es/en/pt rompe el build (validate-i18n.ts exige paridad de claves)."
    probabilidad: Media
    impacto: Alto
    mitigacion: "Todo borrado/renombrado de claves debe aplicarse idéntico en los 3 archivos; correr build tras cada bloque de borrado."
  - id: R3
    descripcion: "404 al eliminar páginas de detalle si SERVICES[0].href / SERVICES[1].href siguen apuntando a /servicios/carga-aerea|maritima."
    probabilidad: Alta
    impacto: Medio
    mitigacion: "Redirigir ambos hrefs (ver clarifications (a)); dejar cero rutas colgantes; claves i18n huérfanas de esas páginas se borran."
  - id: R4
    descripcion: "Inconsistencia narrativa 'Desde 2023' + '20+ años' si solo se cambia la ocurrencia de Nosotros (hay 5+ ocurrencias más)."
    probabilidad: Alta
    impacto: Bajo
    mitigacion: "Resolver alcance en clarifications (b) antes de spec; recomendación: revisar todas para coherencia."
---

# Propuesta — content-cleanup-mensajes

## Intent
Aplicar una limpieza de contenido transversal en las páginas Servicios, Home, Industrias, Nosotros y Contacto, en los 3 idiomas (es/en/pt), cuidando ortografía y redacción. Eliminar todo compromiso de tiempo finito (48h/24h/SLA), menciones "OEA"/"B2B" y cifras de clientes (300+/98%/12 industrias); retirar los CTA "Conocer más" y las páginas de detalle de servicios; eliminar las secciones FAQ, Trayectoria, Certificaciones y Sector destacado; corregir textos/bullets puntuales de cada servicio; reemplazar teléfono y email globales; y corregir el bug de contraste "texto negro sobre fondo negro" en "Cómo trabajamos" de /servicios.

## Scope (preciso)
- **Copy traducible (SSOT real)**: editar `src/i18n/translations/{es,en,pt}.json` para todos los textos de servicios, home, industrias, nosotros y contacto/cotizar. Todo borrado o renombrado de claves se hace **simétrico en los 3 archivos**.
- **Literales hardcodeados en `.astro`** (1 edición, igual en 3 idiomas): `OEA` (`servicios.astro` L58, `nosotros.astro` L50), `B2B` (`nosotros.astro` L51), `300+` (`industrias.astro` L53), `98%` (`industrias.astro` L55).
- **Arrays vivos de `constants.ts`**: `SERVICES[0].tag` (48h), `LIVE_ROUTES[3]` Hong Kong→Iquique ⇒ Manzanillo→Valparaíso, `SITE` teléfono/email; redirección de `SERVICES[0].href`/`SERVICES[1].href`.
- **Borrado de 4 páginas de detalle**: `src/pages/servicios/carga-{aerea,maritima}.astro` y `src/pages/[lang]/servicios/carga-{aerea,maritima}.astro`, más sus claves i18n huérfanas (`meta.carga*`, `servicios.carga.{aerea,maritima}.*`).
- **Eliminación de 4 secciones** (markup + claves i18n vivas simétricas + CSS/script asociados): FAQ (`servicios.astro` + `servicios.faq.*` + `.faq-*`), Trayectoria (`nosotros.astro` + `nosotros.timeline.*` + `gsap-timeline-reveal.ts` y su uso + `.timeline*`), Certificaciones (`nosotros.astro` + `nosotros.certs.*` + `.certs`), Sector destacado (`industrias.astro` + `industrias.spotlight.*` + `.ind-spotlight*`).
- **Fix de contraste**: color claro explícito a `.process-step__title` (/servicios), venciendo `h1..h6{color:--color-neutral-900}`.
- **Reemplazo global**: `+56 9 4216 2739`⇒`+56 9 8270 8492` y `mpazrivera@logatm.com`⇒`contacto@logatm.com` en `SITE`, en el **JSON-LD hardcodeado de `BaseLayout.astro` L74-75** (violación DRY: no importa SITE), `README.md` L119 y `docs/project-brief.md` L17.

## Approach recomendado — B acotado
Editar en cada fuente autoritativa (los 3 JSON + literales `.astro` + arrays vivos), borrar páginas/secciones con sus claves i18n simétricas y CSS/script asociados, y **eliminar únicamente los arrays muertos de las secciones que se borran** (`FAQ`, `TIMELINE`, `CERTS`) para evitar confusión futura; se dejan intactos los demás arrays muertos (fuera de alcance). No se refactoriza la arquitectura de merge por índice ni el resto de dead code.

**Alternativas descartadas**: Approach A (dejar todo el dead code) — deja `FAQ`/`TIMELINE`/`CERTS` como trampas para futuros editores tras borrar sus secciones. Refactor completo del dead code / DRY del JSON-LD — fuera del intent (YAGNI), aumenta superficie de riesgo.

## Trade-offs
- **A favor**: cambios concentrados en las fuentes reales; sin rutas 404; build i18n protege la paridad de claves; dead code borrado acotado a lo que se elimina.
- **En contra**: volumen alto (×3 idiomas + borrado de páginas/secciones) ⇒ superficie de edición amplia. El merge por índice obliga a sincronizar longitudes de listas manualmente (no cubierto por el validador). La violación DRY del JSON-LD se corrige por sustitución, no por refactor (queda deuda menor conocida). Coherencia narrativa de "20+ años"/"Desde 2023" depende de resolver clarification (b).

## Esfuerzo estimado
**L** — decenas de ediciones de copy en 3 idiomas, borrado de 4 páginas y 4 secciones con limpieza de i18n/CSS/script, más redirecciones y fix de contraste. Sin lógica nueva, pero alto volumen y riesgo de asimetría.

## Ambigüedades
6 puntos abiertos (a)-(f) documentados en `clarifications.md`; **resueltos por la usuaria** el 2026-07-05 (ver sección siguiente).

## Decisiones resueltas (HITL 2026-07-05)
- **(a) hrefs de las cards de servicio**: **cards NO-clicables** — quitar `SERVICES[0].href`/`SERVICES[1].href` (o su consumo) y el afford visual de enlace en las cards de servicio (Home `ServicesSection.astro` y catálogo `servicios.astro`). Sin redirección a otra ruta. Cero rutas 404.
- **(b) "20+ años"**: **armonizar todas** las ocurrencias para coherencia con "Desde 2023" (hero home, footer, meta, título de Nosotros, etc.). No dejar contradicción "2023 + 20+ años".
- **(c) SLA email**: **incluido en alcance** — reemplazar "responder antes de 24 h hábiles" (`email-templates.ts` L301) por término general sin compromiso finito (ej. "a la brevedad" / "lo antes posible").
- **(d) dead code**: **Approach B acotado** — borrar solo `FAQ`, `TIMELINE`, `CERTS` de `constants.ts` (secciones eliminadas); dejar el resto del dead code intacto.
- **(e) "FCL/LCL"**: **aplicar** en el bullet de detalle `servicios.details.items[1].features[0]` → resultado "FCL/FCL, LCL/LCL".
- **(f) contraste**: **solo `/servicios`** (`.process-step__title`); verificar `/nosotros` visualmente en sdd-verify sin fix especulativo.
