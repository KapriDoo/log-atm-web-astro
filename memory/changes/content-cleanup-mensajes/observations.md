# Observations — content-cleanup-mensajes

## sdd-explore (2026-07-05)

- Arquitectura de contenido híbrida: `constants.ts` (visual/estructural + datos no
  traducibles) + `i18n/translations/{es,en,pt}.json` (copy traducible, master = es,
  fallback silencioso por clave). Merge por índice `CONST.map((x,i) => ({...x,
  ...tList(...)[i]}))` en varias páginas — riesgo de desalineación si se acortan
  arrays sin sincronizar ambos lados.
- Hallazgo crítico: `FAQ`, `PROCESS_STEPS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`,
  `TIMELINE`, `CERTS`, `STATS`, `NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY` en
  `constants.ts` son código muerto (cero imports) — el contenido real y editable de
  esas secciones vive solo en los JSON de i18n. Editar solo `constants.ts` para
  FAQ/proceso/timeline/certs no tendría ningún efecto visible.
- Las specs `memory/specs/content/content-{services,industries,stats}.md` están
  stale (describen 14 industrias, StatsSection con 4 stats — no coincide con el
  código actual de 12 industrias / STATS muerto / WHY_ITEMS en vivo). No usables
  como fuente de verdad; toda la exploración se basó en lectura directa del código.
- Bug de contraste "fuente negra sobre fondo negro" localizado con precisión: regla
  global `h1..h6 { color: var(--color-neutral-900) }` (global.css L77-81) vs.
  `.process-strip { background: var(--color-neutral-900) }` (shared.css L500-502) —
  mismo token `--color-neutral-900: #211f1c` usado como texto Y como fondo. Afecta
  solo `.process-step__title` (h3) en la sección de 6 pasos "Cómo trabajamos" de
  `/servicios`. Distinto del bug ya corregido en spec
  `internal-page-heroes/hero-title-contrast.md` (ese era el `<h1>` del hero, ya
  resuelto en PR #19).
- Ambigüedad detectada: existen DOS secciones llamadas "Cómo trabajamos" —
  `/servicios` (servicios.process, 6 pasos, con el bug de contraste) y `/nosotros`
  (nosotros.how, 4 pasos, howwork-grid). El intent (pasos 03/05/06, textos citados)
  corresponde inequívocamente a la de `/servicios`.
- "Trayectoria" y "Certificaciones" no son páginas separadas — son secciones dentro
  de `/nosotros`. El intent dice "eliminar del código sus páginas" pero no existen
  páginas dedicadas, solo markup + i18n keys + (para Trayectoria) un script GSAP
  dedicado (`gsap-timeline-reveal.ts`) que quedaría huérfano.
- `BaseLayout.astro` duplica teléfono/email hardcodeados en el JSON-LD
  (schemaLocalBusiness) en vez de importar `SITE` desde `constants.ts` — violación
  DRY preexistente; debe actualizarse en paralelo o corregirse la duplicación.
- Riesgos abiertos para propose/design: (1) destino de href de SERVICES[0]/[1] tras
  borrar páginas de detalle carga-aerea/carga-maritima, (2) alcance real de "20+
  años" (5+ ocurrencias fuera de Nosotros quedarían inconsistentes con "Desde
  2023"), (3) si el SLA "24h hábiles" en email-templates.ts entra en el alcance de
  "quitar compromisos de tiempo finito", (4) el texto real dice "FCL y LCL" (no
  "FCL/LCL" literal) salvo en un bullet de detalle de servicio.

## sdd-propose (2026-07-05)

- Propuesta creada recomendando **Approach B acotado**: editar los 3 JSON i18n (SSOT
  del copy) + literales hardcodeados en .astro + arrays vivos de constants.ts; borrar
  4 páginas de detalle con redirección de hrefs; eliminar 4 secciones
  (FAQ/Trayectoria/Certificaciones/Sector destacado) con claves i18n simétricas y
  CSS/script asociados; fix de contraste en .process-step__title de /servicios;
  reemplazo global teléfono/email incl. JSON-LD hardcodeado de BaseLayout. Solo se
  borran los arrays muertos de las secciones eliminadas (FAQ/TIMELINE/CERTS), no el
  resto del dead code.
- Esfuerzo estimado: **L** (alto volumen ×3 idiomas + borrado de páginas/secciones).
- Riesgos frontmatter: R1 desalineación de merge por índice (Media/Alto), R2 borrado
  asimétrico de claves i18n rompe build (Media/Alto), R3 404 por hrefs colgantes
  (Alta/Medio), R4 incoherencia "20+ años"/"Desde 2023" (Alta/Bajo).
- 6 ambigüedades (a)-(f) documentadas en clarifications.md con recomendación
  explícita; bloquean el avance a sdd-spec hasta decisión de la usuaria. Status: paused.

## sdd-spec (2026-07-05)

- 16 capability-specs nuevas creadas en `draft`, agrupadas en 7 capabilities:
  `content-services` (4), `content-home` (1), `content-industries` (1),
  `content-nosotros` (6), `content-contact` (1), `site-contact-info` (1),
  `ui-contrast` (1); más 1 spec adicional en la capability existente `forms-email`
  (`email-sla-no-finite-commitment`) para el SLA del correo transaccional
  (decisión HITL c).
- Deltas de supersesión aplicados a las 4 specs previas afectadas (dos
  escrituras cada una: `superseded_by` en la anterior + `supersedes` en la
  nueva):
  - `content/content-services` (stale, 11 servicios inexistentes) →
    `content-services/services-catalog-cta-and-detail-pages` (MODIFY).
  - `content/content-industries` (stale, 14 industrias) →
    `content-industries/industries-page-content` (MODIFY).
  - `content/content-stats` (stale, STATS muerto) →
    `content-nosotros/years-experience-narrative-consistency` (MODIFY) — es el
    match semántico más cercano (narrativa de años/trayectoria en home/footer).
  - `nosotros-timeline-reveal/spec` (anima la sección Trayectoria que este
    cambio elimina) → `content-nosotros/nosotros-no-timeline-section`
    (DEPRECATE).
- Decisión de diseño: no se creó una capability transversal única
  "messaging-no-time-commitment" para evitar una capa de indirección
  innecesaria (YAGNI) — el requisito "sin compromisos de tiempo finito" se
  distribuyó de forma local y no duplicada en 3 specs con scope disjunto:
  `content-services/services-how-we-work-process` (paso 03 del proceso),
  `content-contact/contact-no-time-commitment` (/contacto y /cotizar) y
  `forms-email/email-sla-no-finite-commitment` (correo transaccional). Cada
  una cubre una superficie distinta sin repetir la misma regla textual.
- `forms-email/email-cta-conditional` (spec existente, `status: completed`)
  NO se supersede: su requisito SHOULD sobre el texto de SLA es genérico
  ("recordatorio del tiempo de respuesta esperado") y sigue siendo válido con
  un término general — se referencia vía `related[]` en la spec nueva sin
  contradecirla.
- Pendiente para `sdd-design`/`sdd-tasks`: resolver el detalle de
  implementación de cada spec (edición exacta de claves i18n en los 3 JSON,
  arrays vivos de `constants.ts`, borrado de páginas/secciones/CSS/script,
  fix de contraste vía token o regla específica) — las specs describen el
  estado objetivo de negocio, no la implementación.
- `spec_refs` de `state.md` actualizado con las 16 specs nuevas.
  `current_phase` avanza a `sdd-design`.

## sdd-tasks (2026-07-05)

- `tasks.md` generado a partir de design.md (D1–D14 + tabla Output Expected),
  descompuesto en 11 grupos ordenados para commits atómicos: (1) borrado páginas
  detalle + cards no-clicables, (2) eliminación 4 secciones (FAQ/Trayectoria/
  Certificaciones/Sector destacado) con i18n+CSS+dead code, (3) copy servicios en 3
  JSON (D4/D5), (4) home rutas, (5) industrias meta+tags, (6) nosotros copy +
  armonización "20+ años", (7) contacto/cotizar sin plazo finito, (8) contacto
  global + JSON-LD + docs, (9) SLA email, (10) fix contraste CSS, (11) verificación
  integral final.
  Grupos 4, 7, 8, 9 son mutuamente independientes entre sí y respecto al resto —
  pueden aplicarse en cualquier orden relativo; el orden de la lista sigue la
  agrupación temática sugerida en el prompt. Grupo 5 y 6 dependen del Grupo 2 solo
  para evitar tocar el mismo archivo `.astro` dos veces en paralelo (no hay
  dependencia de datos real). Grupo 10 depende de Grupo 3 por la misma razón
  (mismo archivo/sección visual), no por dependencia técnica.
  Cada tarea que toca `src/i18n/translations/*.json` lleva la regla transversal de
  simetría es/en/pt + build de verificación al cierre del grupo. NO-TDD: sin lógica
  testeable unitariamente (contenido/CSS/i18n); verificación = `npm run build`
  (valida paridad i18n vía `validate-i18n.ts`, ADR-0003) + revisión visual final
  (T11.6).
  No se detectaron discrepancias entre design.md y los specs de `spec_refs`; las
  líneas exactas citadas en design.md se marcaron como "aprox." en tasks.md porque
  no se releyó el código fuente línea por línea en esta fase (design.md declara
  haberlas verificado en sdd-design) — si sdd-apply encuentra desvíos de línea, debe
  ubicar el bloque por contenido (selector CSS, nombre de sección/const), no por
  número de línea literal.

## sdd-verify (2026-07-05) — veredicto FAIL parcial

- Build limpio (`npm run build`, exit 0) con validador i18n confirmando paridad
  exacta (536 claves en es/en/pt). Cero 404 (páginas de detalle borradas, hrefs
  null), cero secciones huérfanas (FAQ/Trayectoria/Certificaciones/Sector
  destacado), contraste `.process-step__title` ≈16.5:1 (WCAG AA), contacto
  global (`+56 9 8270 8492` / `contacto@logatm.com`) consistente en
  SITE/JSON-LD/README/docs sin rastro de los valores anteriores.
- 15/16 specs en PASS. **1 spec en FAIL**:
  `content-nosotros/years-experience-narrative-consistency` —
  `nosotros.manifesto.p1Html` (es/en/pt) quedó sin tocar por `sdd-apply` y dice
  "Llevamos más de dos décadas operando en el mundo logístico chileno...",
  contradiciendo "Nosotros · Desde 2023" del hero de la misma página. Bug
  presente en el código desde antes del cambio, nunca detectado en
  explore/propose/spec/design/tasks (ninguno de esos artefactos menciona
  `p1Html` ni "dos décadas"); `design.md` D10 acotó la edición del manifiesto
  solo a `titleHtml`/`p3Html`, dejando fuera `p1Html` por alcance incompleto en
  el diseño. Es la única superficie del sitio que rompe el patrón de
  reencuadre "profesionales con 20+ años de experiencia" aplicado
  consistentemente en `home.hero.eyebrow`, `footer.brandDesc`,
  `meta.nosotros.description` y `nosotros.heroTitleHtml`.
- Términos "prohibidos" residuales (OEA, 48h/24h, 98%, KPI dashboard,
  negociación de tarifas, Última milla) confirmados como dead code en
  `constants.ts` (arrays `SERVICE_DETAILS`, `PROCESS_STEPS`, `STATS`,
  `IND_TAGS_MAP`/`SERVICES_PER_IND` — sin import vivo, JSON i18n master siempre
  gana el merge por índice) o fuera de alcance explícito (`cotizar.extras[3]`
  "Última milla" en el wizard, `docs/project-brief.md` OEA en referencias de
  certificaciones del brief interno). Ninguno visible para un visitante.
- Coherencia de grafo: todos los `depends_on` resuelven a specs existentes. 1
  WARN de metadata (no bloqueante, no auto-corregido porque la validación
  principal no es PASS): `forms-email/email-cta-conditional` (spec
  preexistente, `status: completed`, fuera de alcance de este cambio) no
  declara `affects`/`related` de vuelta hacia
  `forms-email/email-sla-no-finite-commitment` que la referencia en
  `depends_on`.
- Spec delta creada: `content-nosotros/nosotros-manifesto-founding-year-consistency`
  (`delta_type: MODIFY`, `supersedes: years-experience-narrative-consistency`)
  con el requirement exacto de reescribir `p1Html` en los 3 idiomas siguiendo
  el patrón "profesionales con 20+ años". `years-experience-narrative-consistency`
  actualizada con `superseded_by` apuntando a la nueva spec. Agregada a
  `spec_refs` de `state.md`.
- `verified_at` **no** se actualizó en ninguna de las 16 specs (el contrato
  solo lo permite en un ciclo PASS completo). `current_phase` vuelve a
  `sdd-apply` para que se aplique el fix puntual antes de re-verificar.

## sdd-apply (2026-07-05) — fix puntual del FAIL de sdd-verify

- Reescrito `nosotros.manifesto.p1Html` en `es.json`/`en.json`/`pt.json`: se
  reemplazó la voz de primera persona plural de la empresa ("Llevamos más de
  dos décadas operando"/"We have spent more than two decades
  operating"/"Operamos há mais de duas décadas") por una atribución explícita
  a la experiencia del equipo ("Somos profesionales con más de 20 años de
  experiencia"/"We are professionals with more than 20 years of
  experience"/"Somos profissionais com mais de 20 anos de experiência"),
  siguiendo el mismo patrón de reencuadre ya usado en `home.hero.eyebrow`,
  `footer.brandDesc`, `meta.nosotros.description` y `nosotros.heroTitleHtml`.
  Se conservó íntegro el resto del párrafo (`<em>las cargas no se mueven
  solas</em>` y la mención a las personas detrás de cada contenedor/AWB/DUS).
- Barrido de `décadas`/`decades` en los 3 JSON confirma que `p1Html` era la
  única ocurrencia; no se detectaron otras menciones equivalentes de
  antigüedad de la empresa que requirieran el mismo ajuste.
- `npm run build` verde: validador i18n confirma paridad exacta (536 claves
  en es/en/pt), sin errores TS.
- Commit `88c02a8` (`content(nosotros): reframe manifesto p1 as team
  experience, not company age`). Spec delta
  `content-nosotros/nosotros-manifesto-founding-year-consistency` actualizada
  a `status: review` con `commits: ["88c02a8"]` y sus 3 acceptance criteria
  marcados. `current_phase` avanza a `sdd-verify` para re-verificación del
  ciclo completo.
