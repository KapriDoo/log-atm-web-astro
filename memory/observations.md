# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>
---
title: Observaciones — optimize-images-webp
created_at: 2026-05-28
status: active
---

## Contexto del Proyecto

**log-atm-web-astro** es un sitio estático Astro 6.1.5 con optimización de performance como requisito crítico (Lighthouse ≥95).

### Stack Relevante para Imágenes

- **Framework:** Astro 6.1.5 (SSG, output: static)
- **Image Tools:** `sharp@^0.34.5` (ya en devDeps)
- **SVG Optimization:** `svgo@^4.0.1`
- **Build Target:** Cloudflare Pages (workers + static assets)
- **Performance Requirement:** Lighthouse ≥95 (todas las páginas)

### Infraestructura Existente

1. **sharp ya está instalado** — dev dependency disponible para image processing
2. **astro.config.mjs existente** — sin integraciones de imagen aún; oportunidad de agregar astro:assets
3. **i18n activa** — 3 locales (es, en, pt); imágenes pueden ser locale-agnostic o con variantes
4. **Vite SSR override** — `noExternal: ['worker-mailer']`; importante para bundling final

## Descubrimientos Iniciales

### Estructuras de Assets

El proyecto define típicamente:
- `src/assets/` — Assets optimizables (images, svgs)
- `public/` — Assets estáticos (favicons, manifest.json; no optimizables vía Astro:assets)
- `src/components/` — Componentes React que puede que usen `<img>` vs. `<Image>`

### Oportunidades de Optimización

1. **WebP/AVIF:** Reducción típica 30-50% en raster vs PNG/JPG
2. **astro:assets:** Soporte nativo en Astro 6 para format negotiation sin plugin externo
3. **<Image /> component:** Lazy loading, responsive sizes, srcset automático
4. **LCP Impact:** Hero images optimizadas → mejora inmediata de Core Web Vitals

### Riesgos Identificados

1. **Breaking Changes:** Si hay rutas hardcoded a assets, migración requiere QA cuidadosa
2. **Navegador Compatibility:** WebP ≥95% en navegadores modernos; AVIF aún en marcha
3. **Build Performance:** sharp + WebP encoding puede agregar 10-30s a build time
4. **i18n Variants:** Si hay imágenes con texto (e.g., banners), puede haber versiones por locale

## Próximos Pasos

1. **sdd-explore:** Auditoría completa de assets, medición de baseline, identificación de críticos
2. **sdd-spec:** Especificación de comportamiento esperado (formatos, fallbacks, responsive)
3. **sdd-design:** Arquitectura de solución (integración astro:assets, componentes wrapper)
4. **sdd-tasks:** Plan de migración incremental (críticos primero, validación per-step)
5. **sdd-apply:** Implementación + QA de formato negotiation y visual parity


## 2026-05-28 | debt-candidate | Assets de industrias sin uso en src/assets (10.5 MB)
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `src/assets/industries/*.jpg` (14 archivos) + `src/lib/industryImages.ts`
**Descripción**: `INDUSTRY_IMAGES` se exporta pero nunca se importa/consume en ningún archivo de `src/`. Los 14 jpg (10.5 MB) duplican las industrias que sí se sirven desde `public/images/industries/`. Inflan el repositorio sin aportar valor.
**Promoción sugerida**: `sdd new cleanup-dead-industry-assets --domain debt`
**Estado**: resuelto por `e6ade3a` (borró los 14 jpg de `src/assets/industries/` y `src/lib/industryImages.ts`).

## 2026-05-28 | debt-candidate | logo.svg duplicado/sin uso en src/assets
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `src/assets/logo.svg`
**Descripción**: No referenciado en `src/`. El logo activo es `public/logo.svg` / `public/logo.png`. Generado por `scripts/png-to-svg.mjs` (one-shot) y aparentemente huérfano.
**Promoción sugerida**: `sdd new cleanup-orphan-logo-svg --domain debt`
**Estado**: resuelto por `e6ade3a` (borró `src/assets/logo.svg`); `debt-assets-weight` retiró además `scripts/png-to-svg.mjs` y la dependencia `potrace`.

## 2026-05-28 | debt-candidate | Videos posiblemente duplicados en public/videos (3.76 MB c/u)
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`
**Descripción**: Ambos archivos pesan exactamente 3,756,542 bytes; posible duplicado. Solo `log-atm-intro.mp4` se referencia (WhyVideoSection). Verificar y eliminar el huérfano para reducir peso del deploy.
**Promoción sugerida**: `sdd new dedupe-public-videos --domain debt`
**Estado**: cerrado por `debt-assets-weight`: se confirmaron 3 MP4 con el mismo md5 (`public/video/intro.mp4`, `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`) y se dejó solo `public/videos/log-atm-intro.mp4`.

## 2026-05-28 | architecture | `<Picture>` multi-formato como estándar de imágenes de contenido (optimize-images-webp)
Se adopta `astro:assets` con `<Picture formats={['avif','webp']}>` + fallback JPEG para todas las imágenes de contenido (services/industries/process), moviéndolas a `src/assets/images/` y portando `ImageMetadata` en `src/lib/constants.ts` (campo `img` pasa de `string` a `ImageMetadata` vía imports estáticos directos, sin mapa auxiliar). Hero LCP con `priority`; poster de `<video>` vía `getImage()` (WebP). Extiende ADR-0001 (no lo supersede). Ver ADR-0006.

## 2026-05-28 | observation | Inventario real difiere de la propuesta (optimize-images-webp)
`public/images/` tiene **27** JPEG (no 28): services 11, industries 12, process 4 — coincide con los 27 campos `img:` en `constants.ts` (SERVICES 11, INDUSTRIES 12, HOW_WE_WORK 4). Las páginas `src/pages/[lang]/*.astro` son wrappers (`import RootPage` + `<RootPage lang=...>`), no declaran `<img>` propias → migrar canónicas + secciones cubre es/en/pt. Subrutas `servicios/carga-aerea|carga-maritima.astro` no tienen imágenes.

## 2026-05-28 — optimize-images-webp / sdd-apply

- **Layout del worktree**: el proyecto Astro vive en el subdirectorio anidado `log-atm-web-astro/` dentro del worktree, no en la raíz. Build/npm e imports se ejecutan desde `.../optimize-images-webp/log-atm-web-astro/`. `node_modules` no venía instalado → `npm install` (442 paquetes) antes del primer build.
- **[pre-adr] imageService:'compile' obligatorio con adapter Cloudflare**: design.md §28 asumía que `output:'static'` + Cloudflare adapter emite AVIF/WebP estáticos en build-time automáticamente. NO es así: el adapter Cloudflare por defecto usa `imageService:'cloudflare-binding'` (servicio workerd on-demand), que emite URLs `/_image?href=...&f=avif` resueltas en runtime — NO archivos estáticos. El bloque `image.service` (Sharp) de astro.config queda overrideado por el adapter. Para honrar el diseño (optimización build-time, coste runtime cero, AC de T8 "dist/_astro contiene *.avif/*.webp"), se añadió `imageService:'compile'` al adapter. Verificado: tras el cambio el build emite 32 AVIF + 33 WebP estáticos y las URLs apuntan a `/_astro/*.avif|webp`. Decisión aplicada con default razonable (no había ADR que la cubriera); candidata a documentarse en ADR-0006.
- **`logo.svg` real**: tasks/design indicaban `src/assets/logo.svg`, pero git lo rastreaba en `src/assets/industries/logo.svg`. Eliminado junto con `git rm -r src/assets/industries/`. Ningún `logo.svg` permanece bajo `src/`.
  - **Corrección (`debt-assets-weight`)**: el historial git muestra que `e6ade3a` eliminó `src/assets/logo.svg`; `src/assets/industries/logo.svg` no existía en el árbol previo a ese commit.
- **Decisión `alt` en cards home**: el markup original de ServicesSection/IndustriesSection usaba `alt=""` (decorativo; el enlace de la card ya nombra el servicio/industria). tasks.md sugería `alt={s.title}`/`alt={ind.name}`. Se preservó `alt=""` en las secciones home para no alterar la semántica de accesibilidad existente. En las páginas (servicios/nosotros/industrias) el original ya tenía `alt` con texto y se respetó.
- **`as const` + ImageMetadata (R1)**: NO se materializó. Los arrays SERVICES/INDUSTRIES/HOW_WE_WORK con `as const` aceptan objetos `ImageMetadata` sin retipar. Build TS verde.
- **Peso (evidencia LCP)**: hero `svc-maritima` original 937 KB JPEG → variante 768w ~64 KB WebP / ~93 KB AVIF (el navegador descarga solo la variante que matchea el viewport, un único formato). Fuentes totales 22 MB → variantes generadas AVIF 4.9 MB + WebP 3.8 MB (por todos los breakpoints; servidas selectivamente).
- **Sin suite de tests**: el proyecto no tiene tests unitarios; la única validación automatizada es el hook `validate-i18n.ts` (corre en build) — pasó verde en ambos builds.
- **WARN pre-existente**: `industrias.astro is dynamically imported ... but also statically imported` — no relacionado con este cambio (wrappers `[lang]`).
- **sdd-init (content-cleanup-mensajes)**: sin drift de stack detectado — versiones en package.json (astro@^6.1.5, react@^19.2.5, tailwindcss@^4.2.2, etc.) coinciden exactamente con `_profile.md` (updated 2026-05-28); no se refrescó. Se creó `changes/content-cleanup-mensajes/state.md` con intent literal (cambios de copy multi-idioma es/en/pt, eliminación de páginas de detalle de servicios, ajuste de contactos globales); fast_path=full, siguiente fase sdd-explore.

## 2026-07-05 — content-cleanup-mensajes / sdd-design

- **Sin ADR nuevo**: cards-sin-detalle (D1/D2) y sustitución de literal en JSON-LD (D13) son cambios locales; routing y paridad i18n ya cubiertos por ADR-0002/ADR-0003. Fix de contraste (D7) es CSS local. Se referencian ADR-0004/0005 para contexto del email (D14) sin modificarlos.
- **[pre-adr] Deuda DRY conocida (JSON-LD)**: `BaseLayout.astro` L74-75 duplica `SITE.phone/email` en el schema.org en vez de importar `SITE`. Se decidió **sustituir el literal** (no refactorizar) para acotar riesgo en el layout raíz. Deuda documentada; candidata a refactor futuro (importar SITE en el objeto schema).
- **Merge por-`n` vs por-índice**: `servicios.details.items` se matchea por campo `n` (`.find`), NO por índice ⇒ las `features[]` de Aérea (4→5), Marítima (4→3), Aduana (4→3), Almacenaje (4→3), Consultoría (4→3) y Medio Oriente (4→2) cambian de longitud sin riesgo de desalineación. `servicios.list`↔`SERVICES` y `nosotros.values`↔`VALUES` sí son por índice (mantener longitud). El validador i18n solo valida paridad de claves-índice, así que acortar arrays exige simetría es/en/pt en el nº de ítems.
- **`const spotlight = industries[0]` (industrias.astro L32) NO se borra** al eliminar la sección Sector Destacado: se reusa en el bloque directorio (L124-127). Solo se quita el `<section>` L61-94.
- **`.process-strip` solo vive en /servicios**: el comentario "used in servicios + nosotros" (shared.css L499) es stale; /nosotros usa `.howwork-grid`. Por eso el fix de contraste (D7) es seguro y acotado a /servicios.
- **[pre-adr] Ocurrencias de tiempo finito fuera de spec dedicada incluidas por intent GLOBAL**: `home.cta.lead` ("24 horas") no tiene spec content-home; `cotizar.modes.1.desc` ("Express 48h–7d") no está en la spec contact-no-time (es transit, no SLA). Se **incluyen** en el plan (D12) para no dejar contradicción con "quitar 48h/24h de toda la página". Excluidos por ser legítimos: `cotizar.modes.0.desc` ("FCL/LCL" modalidad), `cotizar.extras.3` ("Última milla" opción del wizard), `industrias.desc`/`home.industries.desc` ("12 industrias" factual).
- **Claves label huérfanas a borrar (simétrico)** tras quitar meta-items hardcodeados: `servicios.metaCustoms`, `nosotros.metaCert`, `nosotros.metaFocus`, `industrias.metaClients`, `industrias.metaRetention`, más `common.learnMore` (tras retirar "Conocer más").
- **project-brief.md tiene el teléfono en 2 formatos**: L15 `+569 421 62739` (no matchea el grep `4216 2739`) y L17 email. Ambos se actualizan. `SITE.whatsappUrl` (constants L46) también contiene el nº viejo → se actualiza.
- **Fallbacks muertos en constants.ts** (`SERVICES[i].desc`, `VALUES[3].desc` "KPIs", `IND_TAGS_MAP`/`SERVICES_PER_IND` con OEA/última milla, `FOOTER_SERVICES` con rutas de detalle borradas): nunca renderizan (JSON master gana; arrays no importados). Se dejan por decisión d (borrado acotado a FAQ/TIMELINE/CERTS) — la spec exige ausencia en lo renderizado, no en fallbacks.

## 2026-07-05 — content-cleanup-mensajes / sdd-apply

- **Desvío 1 — meta-item "OEA" en hero de `/servicios` sin task explícita**: design.md §D8 pide explícitamente borrar el `page-hero__meta-item` "OEA" de `servicios.astro` (L58) y su clave huérfana `servicios.metaCustoms`, pero `tasks.md` (Grupo 1 y Grupo 5) no lo enumeró como task propio (sí enumeró los equivalentes de `/nosotros` en T6.2/T6.3 y `/industrias` en T5.1/T5.2). Se implementó de todas formas, agrupado al commit de Grupo 1, porque: (a) D8 lo pide literalmente con ubicación exacta, (b) dejarlo hubiera hecho fallar el barrido final T11.2 (`grep -riE '\bOEA\b' dist/` debe dar cero), (c) es el mismo patrón ya aplicado a nosotros/industrias. Clave `servicios.metaCustoms` borrada simétrica en es/en/pt.
- **Desvío 2 — meta-item hardcodeado "24h" en hero de `/contacto` sin task explícita**: `contacto.astro` L37 tenía `<span class="v">24<em>h</em></span><span class="k">{t('contacto.metaResponse')}</span>` — un compromiso de tiempo finito hardcodeado en el markup, no cubierto por ninguna task de Grupo 7 (que solo lista `contacto.lead/heroEyebrow/heroLead/form.sub`) ni por la spec `content-contact/contact-no-time-commitment` explícitamente. Se eliminó el meta-item completo (mismo patrón que D8: eliminar el bloque en vez de reescribirlo) y se borró la clave huérfana `contacto.metaResponse` simétrica en es/en/pt, porque de lo contrario el "24h" hubiera quedado visible en `/contacto` contradiciendo directamente el intent GLOBAL del cambio y la spec de esa misma página. Se conservan `metaExec` (1:1), `metaSupport` (24/7 — horario operativo, no promesa de plazo) y `metaOffice` (CL).
- **Término elegido para "sin compromiso de tiempo finito"**: se usó consistentemente "a la brevedad" (es) / "as soon as possible" (en) / "o mais breve possível" (pt) en `/contacto`, `/cotizar`, `home.cta.lead` y el SLA de `email-templates.ts` (es, literal no-i18n del template de correo).
- **Build**: se corrió `npm run build` tras cada grupo (11 veces en total); todos verdes, sin error de paridad i18n ni TypeScript. Barrido final (`grep -riE '48h|24 ?h|\bOEA\b|300\+|98%|Negociación de tarifas|Conocer más|carga-aerea|carga-maritima' dist/`) da **cero** coincidencias (mejor que el mínimo esperado: no quedó ninguna de las excepciones documentadas en design.md porque ninguna era necesaria retener literal salvo las ya excluidas explícitamente: "FCL/LCL" en `cotizar.modes.0.desc`, "Última milla" en `cotizar.extras.3`, "12 industrias" factual — todas verificadas intactas).
- **Sin tests unitarios**: verificación end-to-end fue build + greps sobre `dist/` + spot-checks de contenido renderizado en es/en/pt (hero de nosotros, ausencia de "24h" en contacto, badge de aduana). Revisión visual completa en navegador (T11.6) queda para `sdd-verify`.

## 2026-07-05 | observation | fix-content-followups | sdd-init sin drift de stack detectado
Versiones en `package.json` (astro@^6.1.5, react@^19.2.5, tailwindcss@^4.2.2, @astrojs/cloudflare@^13.5.0) coinciden con `_profile.md` (updated 2026-05-28) — no se refrescó. `changes/fix-content-followups/state.md` creado con intent literal (5 ítems de contraste, contenido y deuda DRY post PR #28); fast_path=apply-only, siguiente fase sdd-apply.

## 2026-07-05 — fix-content-followups / sdd-apply

- **`node_modules` no venía instalado** en este worktree (igual que en `optimize-images-webp`) → `npm install` (442 paquetes) antes del primer build.
- **T1 (contraste)**: `.process-strip__title` recibió `color: var(--color-text-inverse)` explícito, mismo patrón que `.process-step__title` (comentario inline análogo).
- **T3 (DRY JSON-LD)**: confirmado `SITE.phone === '+56982708492'` (formato correcto para `telephone` de schema.org, sin transformación necesaria) y `SITE.email === 'contacto@logatm.com'` en `src/lib/constants.ts`. Import agregado; JSON-LD renderizado sigue emitiendo los mismos valores literales, ahora vía SSOT.
- **T4/T5 (reencuadre "20+ años")**: etiqueta final "Años de experiencia del equipo" / "Years of team experience" / "Anos de experiência da equipe" aplicada de forma idéntica en `nosotros.metaYears`, `home.hero.stripStats[0]`, `industrias.metaExpertise` (es/en/pt) y `HERO_STRIP_STATS[0].label` (constants.ts). `STATS[0].label` (dead code) no se tocó, según instrucción explícita.
- **Verificación**: `npm run build` verde (exit 0) tras todas las ediciones — valida paridad i18n (validador build-time) sin errores. Greps de barrido (`OEA`, "Años/Years/Anos de operación", "expertise", literales de teléfono/email en BaseLayout) devuelven cero coincidencias.
- **4 commits atómicos**: `docs: remove OEA mention...` (b87f943), `fix(a11y): fix process-strip section title contrast` (03d077c), `refactor(seo): source JSON-LD contact from SITE constant (DRY)` (5e1d2a4), `content(nosotros,home,industrias): reframe "20+ years" stat as team experience` (a19596f).

## 2026-07-05 — fix-content-followups / sdd-apply (T7 — dead code)

- **T7 (limpieza de `constants.ts`)**: se removieron 11 `export const` confirmados como dead code — `NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY`, `STATS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `PROCESS_STEPS`, `IND_TAGS_MAP`, `SERVICES_PER_IND`, `QUOTE_CARGO_TYPES`, `QUOTE_EXTRAS` — tras reconfirmar con `grep -rnw "<NOMBRE>" src/` (excluyendo `constants.ts`) cero usos para cada uno, uno por uno, antes de borrar.
- **`HERO_STRIP_STATS` no se tocó** (lo consume `HeroSection.astro`), tal como indicaba la task.
- **Sin imports huérfanos**: los 11 arrays removidos no consumían ningún `import` de imagen/ícono exclusivo suyo; los 15 imports de `svc-*`/`ind-*`/`how-0*` en la cabecera de `constants.ts` siguen usados por `SERVICES`, `INDUSTRIES` y `HOW_WE_WORK` (arrays vivos) — verificado por lectura completa del archivo tras el borrado, no quedó ninguna línea `import` sin consumidor.
- **Verificación**: `npm run build` verde (exit 0), validador de paridad i18n sin errores. `npx astro check` no está instalado en este worktree (`@astrojs/check` ausente) y no se instaló por estar fuera de alcance de T7; el build de Astro ya ejercita el TS de `constants.ts` (import/uso real en `.astro`) sin señalar errores.
- **Commit atómico**: `refactor(constants): remove dead code arrays no longer referenced` (de3b0d2).
- **tasks.md**: checklist de T7 marcado `[x]` (los 3 ítems de Acceptance).

## 2026-07-05 — fix-content-followups / sdd-verify

- **Veredicto: PASS.** `npm run build` exit 0 con validador i18n build-time confirmando paridad (`en: OK 536 claves`, `pt: OK 536 claves` vs. `es`).
- Verificados por CSS/grep estático los 7 ítems de `tasks.md` (T1-T5, T7; T6 es la verificación integral): contraste `.process-strip__title` (T1), ausencia de "OEA" en `docs/project-brief.md` (T2), `SITE.phone`/`SITE.email` como SSOT del JSON-LD en `BaseLayout.astro` (T3), reencuadre "20+ años" → "experiencia del equipo" consistente en `nosotros.metaYears`/`home.hero.stripStats[0]`/`HERO_STRIP_STATS[0].label` (T4) e `industrias.metaExpertise` (T5), y remoción limpia de los 11 `export const` dead code sin imports huérfanos ni referencias colgantes en el repo (T7).
- **Hallazgo no bloqueante**: `SERVICES[2].tag` en `constants.ts:99` conserva el literal `'OEA Chile'` (badge de UI, no copy renderizado como texto de marketing en `docs/project-brief.md`). T2 apuntaba explícitamente al doc interno; este valor queda fuera de alcance — se documenta para visibilidad, no bloquea el archive.
- Artefacto: `changes/fix-content-followups/verify-report.md`. `state.md` actualizado: `phases_completed: [sdd-init, sdd-apply, sdd-verify]`, `current_phase: ""`.

## 2026-07-05 — fix-content-followups / sdd-apply (follow-up post-verify)

- **Cierre del hallazgo no bloqueante de sdd-verify**: `SERVICES[2].tag` en `constants.ts:99` cambiado de `'OEA Chile'` a `'Aduana Chile'` (consistente con `servicios.list[2].tag` i18n, que ya gana en el merge). Era la única mención "OEA" restante en `src/` o `docs/`.
- **Verificación**: `grep -rn "OEA" src/ docs/` → cero resultados en todo el proyecto. `npm run build` → exit 0, paridad i18n intacta.
- **Commit atómico**: `content(services): drop residual OEA label from services fallback tag`.

## 2026-07-05 — fix-content-followups / sdd-verify (re-verificación final)

- **Veredicto: PASS.** Re-confirmado tras el follow-up del hallazgo no bloqueante: `npm run build` exit 0, validador i18n build-time `en: OK (536 claves)` / `pt: OK (536 claves)` vs. `es`.
- `grep -rn "OEA" src/ docs/` → cero resultados en todo el proyecto (confirma commit `0bc3d3e`; `SERVICES[2].tag` ahora `'Aduana Chile'`).
- Barridos "Años/Years/Anos de operación" y "de expertise" (es/en/pt) → cero resultados en `src/`.
- Dead code (T7): los 11 `export const` (`NAV_LINKS`, `FOOTER_SERVICES`, `FOOTER_COMPANY`, `STATS`, `SERVICE_DETAILS`, `SERVICE_FILTERS`, `PROCESS_STEPS`, `IND_TAGS_MAP`, `SERVICES_PER_IND`, `QUOTE_CARGO_TYPES`, `QUOTE_EXTRAS`) siguen ausentes de `constants.ts` y sin referencias colgantes en `src/`.
- T1/T3 reconfirmados estáticamente: `.process-strip__title` fija `color: var(--color-text-inverse)` (`#ffffff` en `tokens.css:76`) sobre fondo `--color-neutral-900`; `BaseLayout.astro` importa `SITE` y el JSON-LD usa `SITE.phone`/`SITE.email` (sin literales).
- Sin hallazgos pendientes. `verify-report.md` actualizado a PASS final. Ruteo: `sdd-archive`.
## 2026-10-02 | measure | fix-email-reply-to | preflight sdd-init INICIO 19:10:45 outcome=ready

## 2026-10-02 | measure | fix-email-reply-to | post-dispatch sdd-init FIN 19:11:42 outcome=advance

## 2026-10-02 | measure | fix-email-reply-to | preflight sdd-apply INICIO 19:12:09 outcome=ready

## 2026-10-02 | env-quirk | fix-email-reply-to | el proyecto no trae typescript; tsc --noEmit tiene 4 errores previos al cambio

`sdd-apply` instaló `typescript@5` con `npm install --no-save` en el worktree para verificar T1. Errores previos ajenos al cambio: `cloudflare:workers` sin tipos (`mailer.ts:2`), `platformProxy` y `logger` implícito en `astro.config.mjs`, `Timeout` en `gsap-ind-directory.ts:90`. Un gate de type-check (brief 10) debe partir de esa línea base.

## 2026-10-02 | measure | fix-email-reply-to | post-dispatch sdd-apply FIN 19:18:51 outcome=advance

## 2026-10-02 | measure | fix-email-reply-to | preflight sdd-verify INICIO 19:18:56 outcome=ready

## 2026-10-02 | measure | fix-email-reply-to | post-dispatch sdd-verify FIN 19:21:41 outcome=advance

## 2026-10-02 | measure | fix-email-reply-to | preflight sdd-archive INICIO 19:21:44 outcome=ready

## 2026-10-02 | measure | fix-industries-directory | preflight sdd-init INICIO 19:48:17 outcome=ready

## 2026-10-02 | measure | fix-industries-directory | post-dispatch sdd-init FIN 19:48:55 outcome=advance

## 2026-10-02 | measure | fix-industries-directory | preflight sdd-apply INICIO 19:49:46 outcome=ready

## 2026-10-02 | decision | fix-industries-directory | sdd-apply: spec interactive-component-transitions queda en review, no completed

`tasks.md` (T3) pedía pasar la spec de `draft` a `completed`; §D del protocolo reserva `completed` a `sdd-archive`, así que `sdd-apply` la deja en `review`. El cambio es `apply-only` con `spec_refs: []`: para que el cierre la marque `completed`, la spec debe entrar en `spec_refs` o el cierre debe tratarla explícitamente.

## 2026-10-02 | pattern | fix-industries-directory | gsap.set inline anula el estado CSS de .is-active

En `gsap-ind-directory.ts`, cualquier `gsap.set` de opacidad sobre un slide deja estilo inline que prevalece sobre `.ind-directory__slide.is-active`; la rama de `prefers-reduced-motion` fija también saliente y entrante inline para no dejar el activo invisible.

## 2026-10-02 | measure | fix-industries-directory | post-dispatch sdd-apply FIN 19:59:37 outcome=advance

## 2026-10-02 | measure | fix-industries-directory | preflight sdd-verify INICIO 19:59:42 outcome=ready


## 2026-10-02 | decision | fix-industries-directory | sdd-verify: verdict PASS; ACs de la spec marcados sin tocar status ni verified_at

Verificación empírica en es/en/pt (30 comprobaciones PASS). Se marcaron `[x]` los AC de `interactive-component-transitions` que la fase midió (A2 AC4, A3 completo, A4 AC1-2). `spec_refs` vacío: no se actualizó `verified_at`; la spec sigue en `review` y, con `spec_refs: []`, `sdd-archive` no la marcará `completed` salvo que el orquestador la trate explícitamente.
## 2026-10-02 | measure | fix-industries-directory | post-dispatch sdd-verify FIN 20:04:51 outcome=advance

## 2026-10-02 | measure | fix-industries-directory | preflight sdd-archive INICIO 20:05:05 outcome=ready

## 2026-10-02 | measure | fix-internal-heroes-animation | preflight sdd-init INICIO 20:11:08 outcome=ready

## 2026-10-02 | measure | fix-internal-heroes-animation | post-dispatch sdd-init FIN 20:11:42 outcome=advance

## 2026-10-02 | measure | fix-internal-heroes-animation | preflight sdd-apply INICIO 20:12:25 outcome=ready

## 2026-10-02 | decision | fix-internal-heroes-animation | sdd-apply: specs en review y registradas en spec_refs

`tasks.md` T5 pide `status: completed` para `internal-page-heroes/spec.md`; la fase escribe `review` (§D del protocolo: `completed` lo escribe `sdd-archive`). Para que el cierre la marque, `spec_refs` registra `[[internal-page-heroes/spec]]` y la delta nueva `[[scroll-animations/scroll-inner-pages-real-coverage]]` (MODIFY sobre `scroll-inner-pages`, que queda con `superseded_by`).

## 2026-10-02 | debt | fix-internal-heroes-animation | /cotizar/ bajo Lighthouse performance 95 antes y después del cambio

Medición móvil (Lighthouse 13.3.0, 5 corridas, `astro preview`): la mediana de performance de `/cotizar/` queda bajo 95 con el código previo y con el cambio, sin diferencia material (`apply-evidence.2` y `apply-evidence.6`). El requisito del perfil "Lighthouse ≥ 95 en todas las páginas" no se cumple hoy en `/cotizar/`; queda fuera del alcance de este fix.

## 2026-10-02 | pattern | fix-internal-heroes-animation | gsap.from en heroes: primer pintado visible antes del tween

El script global es un módulo diferido: el hero se pinta visible antes de que `gsap.from` lo lleve a opacidad 0 y lo haga entrar. Por eso el LCP no se retrasa (el candidato LCP ya se pintó), pero en dispositivos lentos puede notarse un parpadeo visible → oculto → entrada. Es el patrón D7 (contenido visible sin JS) y lo comparte el hero del home.

## 2026-10-02 | env-quirk | fix-internal-heroes-animation | Lighthouse 13 publica el elemento LCP en lcp-breakdown-insight

El audit `largest-contentful-paint-element` ya no existe en Lighthouse 13; el nodo LCP y el `elementRenderDelay` se leen de `audits["lcp-breakdown-insight"].details.items` (ítem `type: node` y tabla de subpartes).

## 2026-10-02 | env-quirk | fix-internal-heroes-animation | Lighthouse en WSL deja perfiles de Chrome en el cwd

`chrome-launcher` detecta WSL y arma el `user-data-dir` con una ruta Windows (`\\wsl.localhost\...\AppData\Local\lighthouse.NNNN`) que en Linux se crea como directorio relativo al cwd: cada corrida deja uno sin trackear dentro de `log-atm-web-astro/`. Tras medir hay que borrarlos (sdd-apply borró los 26 que generó) o correr Lighthouse con cwd en un directorio temporal.

## 2026-10-02 | measure | fix-internal-heroes-animation | post-dispatch sdd-apply FIN 20:27:33 outcome=advance

## 2026-10-02 | measure | fix-internal-heroes-animation | preflight sdd-verify INICIO 20:27:38 outcome=ready


## 2026-10-02 | finding | fix-internal-heroes-animation | /cotizar/ queda bajo Lighthouse 95 antes y después del cambio

Verify midió `/cotizar/` en performance 90 (mediana de 5 corridas, CLS 0.137 en Lighthouse) frente a 91 de la línea base; `/servicios/` e `/industrias/` dan 97. El CLS medido con puppeteer es 0.000 con y sin la animación, así que el cambio no lo introduce. Deuda preexistente del requisito Lighthouse >= 95, fuera del alcance de este cambio.

## 2026-10-02 | finding | fix-internal-heroes-animation | WARN de metadata: scroll-entrance-utility no declara la delta scroll-inner-pages-real-coverage

`scroll-inner-pages-real-coverage` declara `depends_on: [[scroll-entrance-utility]]`, pero `scroll-entrance-utility` no la lista en `related` ni en `affects` (su `affects` contiene rutas de archivo, no slugs). La corrección requiere decidir entre `affects` y `related`, así que sdd-verify no la aplicó.
## 2026-10-02 | measure | fix-internal-heroes-animation | post-dispatch sdd-verify FIN 20:38:21 outcome=advance

## 2026-10-02 | measure | fix-internal-heroes-animation | preflight sdd-archive INICIO 20:38:24 outcome=ready

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-init INICIO 20:40:04 outcome=ready

## 2026-10-02 | measure | fix-a11y-and-icons | post-dispatch sdd-init FIN 20:40:46 outcome=advance

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-apply INICIO 20:41:08 outcome=ready

## 2026-10-02 | bug | fix-a11y-and-icons | color-contrast preexistente en el selector de idioma (WCAG 1.4.3)

axe-core en Chrome real, acotado al selector, reporta `color-contrast` en desktop (opción activa/hover y trigger expandido: primary-500 sobre primary-50 / neutral-50) y en el drawer móvil (encabezado neutral-500 sobre blanco), en es/en/pt. Es anterior a este cambio (las reglas CSS no se tocaron) y su corrección no está en `tasks.md`; queda como decisión de alcance. Detalle y razones de contraste: `changes/fix-a11y-and-icons/apply-evidence.md` (§T4, bloques 9, 11-13).

## 2026-10-02 | bug | fix-a11y-and-icons | scripts/axe-audit.mjs sale con exit 1 aunque no haya violaciones

La última línea, `dom?.window.close?.()`, referencia `dom` fuera del bloque `for` donde está declarado y lanza `ReferenceError` después del resumen, así que el exit code del script no refleja el umbral `totalWeight > 30`. Además, sus rutas fijas `dist/<página>/index.html` no calzan con la salida del adaptador de Cloudflare (`dist/client/`), sus dependencias `jsdom` y `axe-core` no están en `package.json`, y en jsdom no detecta `color-contrast`.

## 2026-10-02 | measure | fix-a11y-and-icons | post-dispatch sdd-apply FIN 20:50:08 outcome=blocked

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-apply INICIO 20:50:59 outcome=ready


## 2026-10-02 | bug | fix-a11y-and-icons | mismos pares de contraste del selector fuera de él (solo registro, T5)

T5 corrigió el selector con `--color-brand-dark` / `--color-text-muted`. Los mismos pares de texto aparecen fuera de su alcance y quedan sin tocar:
- `log-atm-web-astro/src/components/ui/Navbar.astro:315` — `.nav-drawer__link:hover`: `--color-brand` (primary-500) sobre `--color-primary-50` (3.95:1), en el drawer móvil; estado hover, que axe estático no detecta.
- `log-atm-web-astro/src/components/ui/Navbar.astro:171-175` — `.nav__link:hover, .nav__link.is-active`: `--color-brand` sobre `--color-surface-alt` (neutral-100 `#efedeb`), 3.75:1; no es el par exacto (fondo neutral-100, no neutral-50), pero axe-core en Chrome lo marca en el enlace activo de la navbar (`/servicios/`, `/contacto/`).
- `--color-neutral-500` sobre blanco no aparece fuera del selector: sus otros usos (`Footer.astro:83,105,152`, `styles/pages/shared.css:758`) van sobre fondo oscuro o rayado.

## 2026-10-02 | bug | fix-a11y-and-icons | otras violaciones color-contrast del sitio (fuera de alcance)

Barrido de axe-core `color-contrast` en Chrome (6 páginas `es`, desktop y drawer móvil, build con T5): 43 nodos fuera del selector. Pares: blanco sobre `--color-brand` 4.38:1 (`.btn--brand`, `.skip-link`, `.cta-final__btn`, `.btn--cta` del hero); blanco sobre CTA `#3eb978` 2.49:1 (`.btn--cta`, `.svc-card__tag--cta`, `.form-submit__label`); blanco sobre WhatsApp `#25d366` 1.98:1 (`.btn--wa`); `.eyebrow` / `.quote-step__num` `#339965` sobre `#f8f7f6`/`#ffffff`/`#efedeb` (3.05–3.56:1); `#aaa6a1` sobre blanco 2.41:1 (`#sum-*` en `/cotizar/`); `.quote-summary__title` 1.02:1; `.contact-form-card__pill` y `.quote-summary__sla` 4.41:1. Afecta el criterio WCAG AA del perfil; candidato a un cambio propio.

## 2026-10-02 | bug | fix-a11y-and-icons | opciones del selector con outline: none en :focus-visible

`LanguageSelector.astro` (`.lang-selector__option:focus-visible`) quita el `outline` y marca el foco solo con fondo `--color-primary-50` sobre `--color-surface` (diferencia de fondo muy baja) más el cambio de color del texto. Cumple 2.4.7 de forma débil; no está en el alcance de T5 (solo tokens de color de texto).
## 2026-10-02 | measure | fix-a11y-and-icons | post-dispatch sdd-apply FIN 20:57:52 outcome=advance

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-verify INICIO 20:57:56 outcome=ready

## 2026-10-02 | measure | fix-a11y-and-icons | post-dispatch sdd-verify FIN 21:06:00 outcome=advance

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-archive INICIO 21:06:01 outcome=ready

## 2026-10-02 | measure | fix-a11y-and-icons | preflight sdd-archive INICIO 21:07:11 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-init INICIO 21:10:28 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-init FIN 21:11:07 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-explore INICIO 21:11:08 outcome=ready


## 2026-10-02 | debt-candidate | fix-i18n-links-and-404 | JSON-LD BreadcrumbList con "Inicio" fijo en todos los idiomas
**Detectado por**: sdd-explore en `fix-i18n-links-and-404`
**Ubicación**: `log-atm-web-astro/src/layouts/BaseLayout.astro:115-122`
**Descripción**: el `BreadcrumbList` usa `name: 'Inicio'` y `item: SITE_URL` en es/en/pt; en `/en` y `/pt` el primer elemento no está traducido ni apunta a la home localizada.
**Promoción sugerida**: `sdd new fix-breadcrumb-jsonld-i18n --domain debt`
## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-explore FIN 21:16:20 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-propose INICIO 21:16:20 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-propose FIN 21:17:56 outcome=paused

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-spec INICIO 22:12:44 outcome=ready


## 2026-10-02 | decision | fix-i18n-links-and-404 | sdd-spec: specs ADD en lugar de delta sobre specs vigentes
`i18n-routing-locale-prefixes` ya exige devolver la 404 en el idioma del prefijo, pero abarca seis idiomas y el desfase corresponde al brief 08; `services-catalog-cta-and-detail-pages` trata otro comportamiento (sin CTA de detalle). Se crearon 4 specs `ADD` con `related` hacia ellas, sin editarlas. Las specs nuevas se limitan a es/en/pt, los idiomas vigentes del sitio. Las verificaciones post-deploy y los datos para el MR quedaron en `## Para el MR` de `clarifications.md`.
## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-spec FIN 22:14:51 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-design INICIO 22:14:52 outcome=ready


## 2026-10-02 | pre-adr | fix-i18n-links-and-404 | Página 404 única renderizada bajo demanda, fuera del patrón [lang]/
`404.astro` con `prerender = false` deriva el locale de `Astro.url`; se elimina `[lang]/404.astro`. El manejador de error de Astro resuelve siempre `/404` sin locale y, prerenderizada, la sirve desde `ASSETS`; bajo demanda conserva el path real. Registrado en ADR-0007 (extiende ADR-0002 sin supersederlo). Regla asociada: `BaseLayout` omite canonical/hreflang/og:url/BreadcrumbList con `noindex`.

## 2026-10-02 | decision | fix-i18n-links-and-404 | sdd-design: barrido de links como script tsx manual que importa config.ts
`scripts/check-i18n-links.ts` (`npm run check-i18n-links`) importa los locales desde `src/i18n/config.ts` en lugar de duplicarlos; recorre todo `dist/client` (es incluido) y además exige barra final. `scripts/validate-i18n.ts` mantiene hoy su propia lista `LOCALES` hardcodeada (desvío SSOT preexistente, fuera de alcance).
## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-design FIN 22:19:29 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-tasks INICIO 22:19:29 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-tasks FIN 22:20:48 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-apply INICIO 22:20:48 outcome=ready


## 2026-10-02 | env-quirk | fix-i18n-links-and-404 | sdd-apply: POST /api/contacto sin content-type responde 403, no 400
En `astro preview`, un `POST` sin `content-type` lo corta el chequeo de origen de Astro (`security.checkOrigin`) con 403 antes del handler; el 400 del plan corresponde a `content-type: application/json` con cuerpo vacío (`invalid-json`). Idéntico en `main` y en el cambio (apply-evidence.9). Las verificaciones del endpoint deben enviar el content-type JSON.

## 2026-10-02 | env-quirk | fix-i18n-links-and-404 | sdd-apply: Chrome headless `--dump-dom` se cuelga contra astro preview en WSL
`chrome --headless=new --dump-dom` (con `--virtual-time-budget` o `--timeout`) no retorna contra la 404 de `astro preview`. Funciona lanzar Chrome con `--remote-debugging-port=0` y manejarlo por CDP con el `WebSocket` nativo de Node 24 (leer el puerto de `DevToolsActivePort` del `user-data-dir`), emulando `prefers-reduced-motion` con `Emulation.setEmulatedMedia`.

## 2026-10-02 | risk | fix-i18n-links-and-404 | sdd-apply: main avanzó con el PR #33 durante la fase; merge con conflicto solo en observations.md
`main` pasó a `78b6b73` (merge del PR #33: `LanguageSelector.astro`, `wizard.ts`, `generate-favicons.mjs`, `apple-touch-icon.png`, `observations.md`). Los archivos de código no se solapan con el cambio; `git merge-tree` reporta conflicto únicamente en `memory/observations.md`, que no tiene `merge=union` (no existe `.gitattributes` en el repo). La sincronización previa a `sdd-verify` debe resolverlo.

## 2026-10-02 | debt | fix-i18n-links-and-404 | sdd-apply: tarjetas estáticas del catálogo conservan el zoom de imagen en hover
`.svc-card--static` anula el lift (`transform`/`box-shadow`) y el cursor, pero `.svc-card:hover .svc-card__media img { transform: scale(1.04) }` (`services.css:69`) sigue aplicando a toda tarjeta. design.md D6 fija «sin CSS nuevo»; las 10 tarjetas estáticas del catálogo (incluidas Aérea/Marítima, preexistentes) muestran ese zoom sutil. Si se considera parte del «efecto de hover de tarjeta-enlace», basta `.svc-card--static:hover .svc-card__media img { transform: none; }`.
## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-apply FIN 22:35:19 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-verify INICIO 22:35:19 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-verify INICIO 22:35:47 outcome=ready

## 2026-10-02 | measure | fix-i18n-links-and-404 | post-dispatch sdd-verify FIN 22:41:27 outcome=advance

## 2026-10-02 | measure | fix-i18n-links-and-404 | preflight sdd-archive INICIO 22:41:31 outcome=ready

## 2026-10-02 | measure | debt-assets-weight | preflight sdd-init INICIO 22:44:22 outcome=ready

## 2026-10-02 | measure | debt-assets-weight | post-dispatch sdd-init FIN 22:44:59 outcome=advance

## 2026-10-02 | measure | debt-assets-weight | preflight sdd-propose INICIO 22:45:00 outcome=ready

## 2026-10-02 | measure | debt-assets-weight | post-dispatch sdd-propose FIN 22:47:04 outcome=paused

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-spec INICIO 00:10:51 outcome=ready

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-spec FIN 00:12:33 outcome=advance

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-tasks INICIO 00:12:33 outcome=ready

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-tasks FIN 00:14:07 outcome=advance

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-apply INICIO 00:14:07 outcome=ready

## 2026-10-03 | pre-adr | debt-assets-weight | Cards altas de industrias del inicio quedan blandas en móvil DPR ≥ 2 por el presupuesto de 2 MB
Las cards del bento pintan la foto 16:9 con `object-fit: cover` en recuadros más altos que 16:9; las 4 cards altas de industrias (2 filas, ~167×370px a 390px) pintan la foto a ~665px de ancho. En móvil DPR 3, darles una variante a su altura (~1376w) lleva el inicio sobre 2 MB, así que reciben 450–600w y se ven borrosas a DPR 2 y 3. Escritorio queda nítido. Resolverlo pide una decisión de diseño (proporción de esas cards en móvil, o `sizes` por card alta/baja) fuera del alcance del cambio. Evidencia: `apply-evidence.18` y `apply-evidence.21`.

## 2026-10-03 | env-quirk | debt-assets-weight | `astro preview` (adapter Cloudflare) responde 500 a todo tras un `npm run build` posterior a su arranque
El servidor de preview queda apuntando al build anterior: hay que detenerlo y relanzarlo después de cada build para verificar en navegador.

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-apply FIN 00:41:10 outcome=advance

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-verify INICIO 00:41:10 outcome=ready

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-verify INICIO 00:41:42 outcome=ready

## 2026-10-03 | gotcha | debt-assets-weight | verify confirma en navegador la blandura de las cards altas de industrias en móvil DPR 2
Una captura Chrome 390×844 DPR 2 del bento de industrias muestra Minería y Farma blandas frente a Retail. El presupuesto no está agotado según la definición de la spec (solo AVIF), así que `sdd-apply` puede probar una variante intermedia para esas 4 cards y re-medir con `npm run measure:images`. Detalle en `verify-report.md` (H-1).

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-verify FIN 00:58:51 outcome=verify-retry

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-apply INICIO 00:58:54 outcome=ready

## 2026-10-03 | decision | debt-assets-weight | Cards altas de industrias del inicio: `sizes` por ancho pintado y quality 55 para entrar en el presupuesto móvil
Las 4 cards altas declaran `sizes="665px"` (ancho pintado de la foto, fijo por el alto de 2 filas) y reciben 1376w a DPR 2 y 3; con quality 80 el móvil DPR 3 supera 2 MB, y quality 55 solo en esas cards es el paso más alto que entra. El margen móvil queda estrecho (~20 KB bajo el límite que aplica `npm run measure:images` sobre el total): cualquier imagen nueva o más pesada en el inicio puede superar el presupuesto. Las posiciones altas viven en `IndustriesSection.astro` (`ind-card--tall`). Evidencia: `apply-evidence.28` a `apply-evidence.33`.

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-apply FIN 01:13:24 outcome=advance

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-verify INICIO 01:13:24 outcome=ready

## 2026-10-03 | measure | debt-assets-weight | post-dispatch sdd-verify FIN 01:41:09 outcome=advance

## 2026-10-03 | measure | debt-assets-weight | preflight sdd-archive INICIO 01:41:13 outcome=ready

## 2026-10-03 | measure | fix-color-contrast-sitewide | preflight sdd-init INICIO 01:44:10 outcome=ready

## 2026-10-03 | measure | fix-color-contrast-sitewide | post-dispatch sdd-init FIN 01:44:51 outcome=advance

## 2026-10-03 | measure | fix-color-contrast-sitewide | preflight sdd-explore INICIO 01:44:51 outcome=ready


## 2026-10-03 | debt-candidate | fix-color-contrast-sitewide | DESIGN.md con ratios de contraste erróneos
**Detectado por**: sdd-explore en `fix-color-contrast-sitewide`
**Ubicación**: log-atm-web-astro/DESIGN.md:77-83
**Descripción**: "Pares de contraste validados" declara #fff sobre primary-500 ~4.8:1 (real 4.38), accent-500 sobre blanco ~3.1:1 (real 2.50) y #fff sobre accent-600 ~4.5:1 (real 3.56); guía decisiones de diseño con datos falsos.
**Promoción sugerida**: se corrige dentro de `fix-color-contrast-sitewide`; si se difiere, `sdd new fix-design-md-contrast-pairs --domain debt`

## 2026-10-03 | debt-candidate | fix-color-contrast-sitewide | Color de heading heredado invisible sobre fondos oscuros
**Detectado por**: sdd-explore en `fix-color-contrast-sitewide`
**Ubicación**: log-atm-web-astro/src/styles/pages/shared.css:110 (`.ind-directory__name`), log-atm-web-astro/src/styles/pages/cotizar.css:309 (`.quote-summary__title`)
**Descripción**: los h3 sin `color` explícito toman neutral-900 de la regla global de headings y quedan ilegibles sobre fondo oscuro (1.0-1.02:1); axe lo marca solo en `.quote-summary__title`, el de `/industrias/` queda como `incomplete` por estar sobre foto.
**Promoción sugerida**: se aborda en `fix-color-contrast-sitewide`; alternativa `sdd new fix-heading-color-inheritance --domain fix`

## 2026-10-03 | debt-candidate | fix-color-contrast-sitewide | Hex literales fuera de tokens.css y tokens WhatsApp huérfanos
**Detectado por**: sdd-explore en `fix-color-contrast-sitewide`
**Ubicación**: log-atm-web-astro/src/styles/global.css:158-162, shared.css:864, tokens.css:53-55 y 185-187, src/lib/email-templates.ts:283,295
**Descripción**: ~34 declaraciones con hex literal fuera de `tokens.css`; `--color-whatsapp*` (#128C7E) no se usa y difiere del verde mostrado (#25D366); `:root` y `@theme` duplican la paleta; el botón WhatsApp de los correos usa #fff sobre #25D366 (1.98:1).
**Promoción sugerida**: `sdd new tokens-hex-cleanup --domain debt`
## 2026-10-03 | measure | fix-color-contrast-sitewide | post-dispatch sdd-explore FIN 02:20:03 outcome=advance

## 2026-10-03 | measure | fix-color-contrast-sitewide | preflight sdd-propose INICIO 02:20:03 outcome=ready

## 2026-10-03 | measure | fix-color-contrast-sitewide | post-dispatch sdd-propose FIN 02:22:05 outcome=paused

## 2026-10-04 | measure | fix-color-contrast-sitewide | preflight sdd-propose INICIO 23:45:49 outcome=ready

## 2026-10-04 | measure | fix-color-contrast-sitewide | post-dispatch sdd-propose FIN 23:46:47 outcome=paused

## 2026-10-04 | measure | fix-color-contrast-sitewide | preflight sdd-spec INICIO 23:47:49 outcome=ready

## 2026-10-04 | measure | fix-color-contrast-sitewide | preflight sdd-spec INICIO 23:49:16 outcome=ready

## 2026-10-04 | measure | fix-color-contrast-sitewide | post-dispatch sdd-spec FIN 23:52:35 outcome=advance

## 2026-10-04 | measure | fix-color-contrast-sitewide | preflight sdd-design INICIO 23:52:37 outcome=ready


## 2026-10-05 | pre-adr | fix-color-contrast-sitewide | Pares de contraste como tokens funcionales y anillo de foco por contexto
Cada par texto/fondo validado AA se declara como tokens funcionales de rol en `tokens.css` (`:root` + `@theme`) y los componentes consumen el token del par; el anillo de foco usa `var(--focus-ring-color, var(--color-focus-ring))` y cada superficie oscura con controles enfocables declara `--focus-ring-color: var(--color-focus-ring-inverse)` junto a su fondo, porque ningún color único cumple 3:1 sobre blanco y sobre `primary-700/800`. `email-templates.ts` es la única excepción de hex fuera de `tokens.css`. Registrado en [[0008-contrast-pair-tokens-and-contextual-focus-ring]].

## 2026-10-05 | debt-candidate | fix-color-contrast-sitewide | Contraste del botón de email y del SLA en las plantillas de correo
**Detectado por**: sdd-design en `fix-color-contrast-sitewide`
**Ubicación**: log-atm-web-astro/src/lib/email-templates.ts:280,290 (`#ffffff` sobre `#4A7BB5`, 4.38:1) y :301 (`#898580` sobre blanco, ~3.6:1)
**Descripción**: el botón «Responder por email» y el texto SLA de la sección de CTAs del correo no cumplen AA; ninguna spec de este cambio los cubre (solo el botón WhatsApp). La corrección natural replica el par brand-solid (`#3b6497`, 6.08:1) y `neutral-600` para el SLA, bajo la excepción de hex inline de ADR-0008.
**Promoción sugerida**: `sdd new fix-email-cta-contrast --domain fix`

## 2026-10-05 | finding | fix-color-contrast-sitewide | extended_context.py no resuelve wikilinks `related[]` con forma `capability/slug`
**Detectado por**: sdd-design en `fix-color-contrast-sitewide`
**Descripción**: el modo `reader` reporta «wikilink de `related[]` sin resolver» para los 15 `related[]` de las specs del cambio (p. ej. `[[tokens/consolidate-tokens]]`, `[[ui-contrast/brand-button-contrast]]`), aunque todas existen en `memory/specs/{capability}/{slug}.md`. El resolutor espera `[[slug]]`; las specs emitidas por `sdd-spec` usan `[[capability/slug]]`. La fase leyó las relacionadas por pull.
## 2026-10-05 | measure | fix-color-contrast-sitewide | post-dispatch sdd-design FIN 00:02:52 outcome=advance

## 2026-10-05 | measure | fix-color-contrast-sitewide | preflight sdd-tasks INICIO 00:02:54 outcome=ready

## 2026-10-05 | measure | fix-color-contrast-sitewide | post-dispatch sdd-tasks FIN 00:05:05 outcome=advance

## 2026-10-05 | measure | fix-color-contrast-sitewide | preflight sdd-apply INICIO 00:05:07 outcome=ready


## 2026-10-05 | pre-adr | fix-color-contrast-sitewide | Overlay del visor de industrias más oscuro en pantallas ≤ 960px
**Detectado por**: sdd-apply (Tarea 28, muestreo de píxeles) en `fix-color-contrast-sitewide`
**Descripción**: `design.md` asume que el nombre de industria cae en la «zona inferior del overlay (92 % oscuro)»; en visores ≤ 960px (alto fijo 420px) el nombre ocupa el 55–74 % de la altura, donde el degradado solo oscurece 38–49 %, y tres diapositivas quedaban bajo 4.5:1 en 390px. Se aplicó el mismo criterio de D9 (oscurecimiento determinista detrás del texto): en `@media (max-width: 960px)` el overlay pasa a `0.10 0% · 0.20 25% · 0.72 50% · 0.92 100%` (commit `3bc419b`). Desktop no cambia. Decisión de diseño tomada en apply sin HITL; revisar en verify/archive si se prefiere otra variante (scrim tras el caption).

## 2026-10-05 | finding | fix-color-contrast-sitewide | Herramientas de verificación de contraste en Chrome real
**Detectado por**: sdd-apply en `fix-color-contrast-sitewide`
**Descripción**: con `puppeteer-core`, `page.screenshot({clip})` espera coordenadas de documento; `boundingBox()`/`getBoundingClientRect()` devuelven coordenadas de viewport, así que el muestreo de píxeles tras un scroll debe sumar `scrollX/scrollY`. En `/industrias/` desktop, centrar un elemento tras el click desplaza el listado bajo el cursor y su `mouseenter` cambia la diapositiva activa: mover el cursor fuera antes de medir. Scripts de referencia en `apply-evidence.md` (bloques embebidos).
## 2026-10-05 | measure | fix-color-contrast-sitewide | post-dispatch sdd-apply FIN 00:54:48 outcome=advance

## 2026-10-05 | measure | fix-color-contrast-sitewide | preflight sdd-verify INICIO 00:54:53 outcome=ready

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-verify INICIO 11:55:43 outcome=ready


## 2026-10-06 | finding | fix-color-contrast-sitewide | Overlay ≤ 960px del visor de industrias verificado contra las specs
**Detectado por**: sdd-verify en `fix-color-contrast-sitewide`
**Descripción**: la decisión de apply (`3bc419b`) no contradice ninguna spec y cumple `dark-surface-heading-legibility`: el contrafactual con el degradado de escritorio en 390px deja nombre, eyebrow y sub bajo 4.5:1, y con el degradado actual el muestreo de píxeles cumple en las 12 diapositivas, 4 anchos y 3 idiomas (`verify-report.16` y `.19`). `design.md` D8 no recoge el degradado de ≤ 960px; conviene registrarlo en `design.md` o en un ADR al archivar. El `rgba(15,28,46,…)` nuevo repite el color base del degradado de escritorio; el criterio de tokens se limita a hex.

## 2026-10-06 | finding | fix-color-contrast-sitewide | Texto claro sobre fotos y video sigue bajo 4.5:1 (deuda declarada)
**Detectado por**: sdd-verify en `fix-color-contrast-sitewide`
**Descripción**: el muestreo de píxeles de títulos h1–h6 (`verify-report.26`) marca texto claro bajo 4.5:1 en `.svc-card__title`, `.ind-card__name` y `.hero-b__title`, solo en `/` y `/servicios/`; los títulos de color oscuro cumplen en todas las páginas. Es la deuda que la clarificación 1 difirió (overlays y degradados de fotos y video); candidato a cambio aparte. En `/pt/servicios/` el título «Desconsolidação» se corta en el borde de su tarjeta (observación visual, previa y ajena al contraste).
## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-verify FIN 13:39:32 outcome=advance

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-judgment INICIO 13:39:35 outcome=ready


## 2026-10-06 | finding | fix-color-contrast-sitewide | axe no cubre glifos ni estados inyectados por JS: dos MUST bajo umbral pasaron verify
**Detectado por**: sdd-judgment en `fix-color-contrast-sitewide`
**Descripción**: la viñeta `✓` de paso completado del asistente (`cotizar.css:77`, 2.50:1) y el mensaje de éxito del formulario de contacto (`contacto.astro:221`, `#2d9b6f` inline por JS, 3.48:1) incumplen `sitewide-contrast-verification` a pesar de las 0 violaciones de axe. axe omite el texto de un único glifo de símbolo, y el color de éxito se asigna por JS en un estado que la verificación no expuso. Además, el chequeo estático de colores literales solo buscaba `#hex` y dejó pasar `rgba(...)`. En próximos barridos de contraste conviene buscar todo consumidor de fondos de marca con texto (`grep` del tono de paleta, no solo del token), además de todo `style.color` asignado por JS, y extender el chequeo de literales a `rgb()/rgba()/hsl()`.
## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-judgment FIN 13:51:49 outcome=judgment-retry

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-apply INICIO 13:51:52 outcome=ready

## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-apply FIN 14:05:54 outcome=advance

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-verify INICIO 14:05:58 outcome=ready


## 2026-10-06 | observation | fix-color-contrast-sitewide | sdd-verify: etiqueta «SECTOR · 01» del visor de industrias (accent-300 sobre foto) queda marginalmente bajo 4.5:1 en su peor píxel a 1024 px; es texto claro sobre foto, deuda diferida (clarificación 1), candidata al cambio aparte junto con los títulos de svc-card, ind-card y hero-b. Enlace mailto y texto SLA del correo siguen en #4A7BB5/#898580 inline (candidato de deuda de design.md).
## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-verify FIN 15:20:14 outcome=advance

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-judgment INICIO 15:20:18 outcome=ready


## 2026-10-06 | finding | fix-color-contrast-sitewide | Deuda latente de contraste fuera del alcance de la ronda (triage de judgment iteración 2)
**Detectado por**: sdd-judgment en `fix-color-contrast-sitewide`
**Descripción**: dos defectos latentes previos al cambio, sin consumidor visible que falle hoy, quedan fuera del veredicto. (1) `src/scripts/wizard.ts:336`: la rama `success` de `setQuoteStatus` conserva `#2d9b6f` (3.48:1 sobre blanco). Hoy es inalcanzable; si se reutiliza, conviene `var(--color-text-accent)` o quitar la rama. (2) `src/styles/global.css:84`: la regla base `a { color: var(--color-brand) }` da 4.38:1 a todo enlace sin clase propia. Un enlace nuevo sin estilo fallaría AA; candidato a apuntarla a `--color-brand-solid`. Además, en barridos de documentación conviene revisar todo `DESIGN.md` (paleta, semánticos y botones) contra la tabla de pares, no solo el token afectado: los AC de coherencia documental se marcaron con una corrección parcial.
## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-judgment FIN 15:26:17 outcome=judgment-residual-fix

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-apply INICIO 15:26:21 outcome=ready


## 2026-10-06 | observation | fix-color-contrast-sitewide | sdd-apply (redespacho 2): el placeholder de `.cta-final__input` (`--color-text-inverse` al 50 % sobre el campo translúcido de la sección final) mide ~4.8:1 sobre `primary-950` puro y ~4.0:1 donde lo alcanzan los degradados radiales de la sección; axe no evalúa `::placeholder`. Deuda preexistente fuera de los residuales C1/SA1; `DESIGN.md` no lo presenta como par válido.
## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-apply FIN 15:31:23 outcome=advance

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-verify INICIO 15:31:27 outcome=ready

## 2026-10-06 | measure | fix-color-contrast-sitewide | post-dispatch sdd-verify FIN 16:38:44 outcome=advance

## 2026-10-06 | measure | fix-color-contrast-sitewide | preflight sdd-archive INICIO 16:38:47 outcome=ready

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-init INICIO 18:05:28 outcome=ready

## 2026-10-06 | pre-adr | chore-local-container-podman | Hallazgo de init: `docker-compose.yml` y `fix-wsl2-port.bat` existen en la raíz del repo (fuera de `log-atm-web-astro/`), y `docker-compose.yml` referencia `Dockerfile`; el brief afirma que no hay compose. Explore/design deben decidir su retiro junto con Dockerfile/nginx.
## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-init FIN 18:06:13 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-explore INICIO 18:06:16 outcome=ready


## 2026-10-06 | pre-adr | chore-local-container-podman | Despliegue vigente = Workers Builds (git) y datos pendientes del dashboard
**Detectado por**: sdd-explore en `chore-local-container-podman`
**Descripción**: el check `Workers Builds: log-atm-web` y el bot `cloudflare-workers-and-pages` aparecen en el PR #36 y en `main`; no hay `wrangler deploy` manual, así que el brief no necesita script `deploy`. No es determinable desde el repo el comando de build/deploy del dashboard, el directorio raíz ni la reconciliación entre el `name: log-atm-web-astro` del `wrangler.json` generado y el Worker `log-atm-web`. Decide si `astro check` se encadena a `npm run build` (puede bloquear producción).

## 2026-10-06 | pre-adr | chore-local-container-podman | Contenedor: secretos, ignore, bind IPv6 y pin de typescript
**Detectado por**: sdd-explore en `chore-local-container-podman`
**Descripción**: (1) `--env-file` solo no inyecta bindings; funciona montando `.dev.vars` en `dist/server/.dev.vars` o con `CLOUDFLARE_INCLUDE_PROCESS_ENV=true`. (2) Sin `.containerignore`, `COPY . .` copia `.dev.vars` a la imagen (reproducido). (3) En este WSL2 `localhost` resuelve a `::1`; `astro preview --host ::` sirve en `localhost`, con `0.0.0.0` no. (4) `npm i -D typescript` instala 7.x, fuera del peer de `@astrojs/check`; fijar `^6`. (5) El 500 tras rebuild persiste en `astro preview` y en `wrangler dev` (404); el contenedor lo evita porque no reconstruye con el servidor activo.

## 2026-10-06 | debt-candidate | chore-local-container-podman | Opción `platformProxy` muerta en el adapter v13 y errores de tipos preexistentes
**Detectado por**: sdd-explore en `chore-local-container-podman`
**Ubicación**: `log-atm-web-astro/astro.config.mjs:51`, `astro.config.mjs:21`, `src/scripts/gsap-ind-directory.ts:99`
**Descripción**: `platformProxy` ya no existe en `Options` de `@astrojs/cloudflare@13.5.0` (TS2353) y se ignora; `logger` sin tipo (TS7031); `window.setInterval` asignado a `ReturnType<typeof setInterval>` (TS2322). Junto con `cloudflare:workers` (TS2307) son los 4 errores de `astro check`.
**Promoción sugerida**: `sdd new fix-typecheck-errors --domain debt`

## 2026-10-06 | debt-candidate | chore-local-container-podman | Referencias obsoletas a Cloudflare Pages y README desfasado
**Detectado por**: sdd-explore en `chore-local-container-podman`
**Ubicación**: `log-atm-web-astro/astro.config.mjs:14`, `log-atm-web-astro/.dev.vars.example:3`, `memory/_profile.md` (Deploy Target), `log-atm-web-astro/README.md` (astro-icon, Astro 6.1.5 "SSG", Potrace, Docker/nginx)
**Descripción**: el deploy es Cloudflare Workers desde 2026-05-13 (`11008c2`); varios textos aún dicen Pages, y el README conserva `astro-icon` (reemplazado en `70d86db`) y la versión 6.1.5.
**Promoción sugerida**: cubierto por este cambio salvo `memory/_profile.md` (lo actualiza `sdd-init` en el próximo cambio)
## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-explore FIN 18:22:00 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-propose INICIO 18:22:03 outcome=ready

## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-propose FIN 18:23:31 outcome=paused

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-spec INICIO 18:28:34 outcome=ready

## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-spec FIN 18:32:21 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-design INICIO 18:32:21 outcome=ready


## 2026-10-06 | pre-adr | chore-local-container-podman | ADR-0009: contenedor local Podman con workerd y secretos montados en ejecución
Un stage `node:22-slim` que compila y ejecuta `astro preview --host :: --port 4321`; `.dev.vars` se monta `:ro` en `/app/dist/server/.dev.vars` desde `"$PWD/.dev.vars"` (npm fija el cwd en la raíz del paquete); `.containerignore` excluye credenciales, dependencias, builds y `chrome/`. Único camino verificado con API y 404 reales.

## 2026-10-06 | pre-adr | chore-local-container-podman | ADR-0010: auditoría a11y en navegador real contra un `astro preview` propio
La 404 es bajo demanda (ADR-0007) y no existe en `dist/client`, así que un servidor estático no puede auditarla: el script lanza su propio `astro preview` en un puerto libre tras el build (inmune al quirk del 500), deriva las URLs de `dist/client` + prefijos `hreflang`, audita escritorio y móvil con `reducedMotion: 'reduce'` y resuelve el navegador por `CHROME_PATH` → `./chrome` → error.

## 2026-10-06 | pre-adr | chore-local-container-podman | ADR-0011: type-check separado del build y declaración local de `cloudflare:workers`
`npm run check` independiente de `npm run build` (el comando de build de Workers Builds no está verificado); `typescript@^6`; 4 errores corregidos en origen; `src/types/cloudflare-workers.d.ts` ambient en lugar de `wrangler types` (rompe `lib.dom`). `memory/_profile.md` lo edita `sdd-apply` en este cambio (nota b de clarifications), no `sdd-init` en el próximo.

## 2026-10-06 | debt-candidate | chore-local-container-podman | `npm run preview` en el host no lee el `.dev.vars` de la raíz de la app
**Detectado por**: sdd-design en `chore-local-container-podman`
**Ubicación**: `log-atm-web-astro/` (`astro preview` con `@astrojs/cloudflare` 13)
**Descripción**: exploración mostró que el adapter busca `.dev.vars` junto al config redirigido `dist/server/wrangler.json`; por inferencia, la vista previa local fuera del contenedor no carga las credenciales de `log-atm-web-astro/.dev.vars` (`astro dev` sí). No afecta a este cambio (el contenedor monta el archivo en esa ruta y la auditoría a11y no usa la API); no verificado en el host.
**Promoción sugerida**: verificar y, si se confirma, documentarlo en el README en un cambio posterior
## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-design FIN 18:40:50 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-tasks INICIO 18:40:54 outcome=ready

## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-tasks FIN 18:44:16 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-apply INICIO 18:44:16 outcome=ready


## 2026-10-06 | debt-candidate | chore-local-container-podman | Violación existente `label-content-name-mismatch` (WCAG 2.5.3) en el encabezado de todas las páginas
**Detectado por**: sdd-apply en `chore-local-container-podman` (primera corrida de `npm run a11y`, 42 auditorías)
**Ubicación**: `log-atm-web-astro/src/components/ui/Navbar.astro:38` (enlace de marca `.nav__brand`, `aria-label={t('a11y.brandHome')}`) y `log-atm-web-astro/src/components/ui/LanguageSelector.astro:55` (`#lang-trigger`)
**Descripción**: axe-core informa 63 nodos `label-content-name-mismatch` (serious): el enlace de marca en las 21 URLs × escritorio y móvil, y `#lang-trigger` en las 21 URLs solo en escritorio. El nombre accesible no contiene el texto visible del elemento. Es la única regla con violaciones; `color-contrast` informa 0 en todas las páginas, incluidas las portadas es/en/pt. Este cambio no corrige el sitio (tasks.md), así que `npm run a11y` termina hoy con exit 1.
**Promoción sugerida**: cambio `fix` que alinee el `aria-label` de ambos elementos con su texto visible y deje `npm run a11y` en exit 0

## 2026-10-06 | discovery | chore-local-container-podman | La imagen del contenedor local pesa 964 MB, no ~866 MB
**Detectado por**: sdd-apply en `chore-local-container-podman`
**Ubicación**: `memory/specs/deployment-docs/readme-deployment-and-local-container.md` (requisito del tamaño), `memory/changes/chore-local-container-podman/design.md` (D7), `log-atm-web-astro/README.md`
**Descripción**: `podman images` informa 964 MB para `localhost/log-atm-web` construida desde el árbol final. La cifra ~866 MB de la spec y del diseño viene de la exploración, anterior a las devDependencies que agrega este cambio (`typescript`, `@astrojs/check`, `playwright-core`, `axe-core`), que la imagen instala con `npm ci`. El README declara el valor medido («alrededor de 960 MB»).
**Promoción sugerida**: `sdd-verify` decide si la cifra de la spec requiere un delta o si el criterio de aceptación (aviso del tamaño aproximado) basta
## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-apply FIN 19:15:11 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-verify INICIO 19:15:21 outcome=ready

## 2026-10-06 | measure | chore-local-container-podman | post-dispatch sdd-verify FIN 19:33:19 outcome=advance

## 2026-10-06 | measure | chore-local-container-podman | preflight sdd-archive INICIO 19:33:30 outcome=ready

## 2026-10-06 | measure | chore-deploy-config | preflight sdd-init INICIO 22:06:52 outcome=ready

## 2026-10-06 | measure | chore-deploy-config | post-dispatch sdd-init FIN 22:07:32 outcome=advance

## 2026-10-06 | measure | chore-deploy-config | preflight sdd-apply INICIO 22:07:56 outcome=ready

## 2026-10-06 | debt-candidate | chore-deploy-config | Menciones de `node:22-slim` fuera del alcance de tasks.md
**Detectado por**: sdd-apply en `chore-deploy-config` (T2)
**Ubicación**: `memory/adrs/0009-local-container-podman-workerd.md` (Decisión, «un stage sobre `docker.io/library/node:22-slim`») y `memory/_profile.md` (línea **Container** de Build & Deploy)
**Descripción**: el `Containerfile` pasa a `node:24-slim` (Node 24, fijado en `.node-version`), pero ambos documentos siguen nombrando `node:22-slim`. `tasks.md` no los incluye, así que `sdd-apply` no los modifica. El perfil tampoco menciona `.node-version` ni `build:ci`.
**Promoción sugerida**: actualizar el perfil en el cierre del cambio (Container con `node:24-slim`, `.node-version`, `build:ci`) y corregir la mención de ADR-0009

## 2026-10-06 | measure | chore-deploy-config | `npm run a11y` mantiene la deuda `label-content-name-mismatch`
**Detectado por**: sdd-apply en `chore-deploy-config` (corrida completa de cierre)
**Descripción**: la auditoría a11y sobre el árbol del cambio da los mismos 63 nodos de la regla `label-content-name-mismatch` registrados por `chore-local-container-podman` (exit 1); el cambio no toca `src/`. `check`, `validate-i18n` y `check-i18n-links` terminan con exit 0.

## 2026-10-06 | measure | chore-deploy-config | post-dispatch sdd-apply FIN 22:21:16 outcome=advance

## 2026-10-06 | measure | chore-deploy-config | preflight sdd-verify INICIO 22:21:19 outcome=ready
## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-init INICIO 21:20:24 outcome=ready

## 2026-10-06 | measure | fix-contrast-followups | sdd-init: _profile.md unchanged (profile_status=unchanged); observations.md supera 500 líneas (613), considerar rotación manual

## 2026-10-06 | measure | fix-contrast-followups | post-dispatch sdd-init FIN 21:20:58 outcome=advance

## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-apply INICIO 21:21:43 outcome=ready

## 2026-10-06 | decision | fix-contrast-followups | sdd-apply: el barrido de pares texto/fondo de los correos encontró el kicker del hero en accent-600 (#339965, 3.57:1); se llevó a #22663f (espejo de --color-text-accent) para cumplir el criterio «todos los textos ≥ 4.5:1» del brief, aunque la tarea solo nombraba #898580 y #4A7BB5

## 2026-10-06 | discovery | fix-contrast-followups | sdd-apply: `hyphens: auto` + `overflow-wrap: anywhere` en `.svc-card__title` también parte con guion títulos es/en/pt de las tarjetas angostas (span 2) a 1280/1440px que antes invadían el padding derecho («Documentación», «Desconsolidado», «Deconsolidation»); ningún título desborda ahora

## 2026-10-06 | discovery | fix-contrast-followups | sdd-apply: `#2D9B6F` (mayúsculas) sigue en src/lib/constants.ts como color decorativo de la industria «Agroindustria» (--ind-color); fuera del alcance del brief 13, que solo pedía la rama success del wizard

## 2026-10-06 | measure | fix-contrast-followups | post-dispatch sdd-apply FIN 21:39:09 outcome=advance

## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-verify INICIO 21:39:13 outcome=ready


## 2026-10-06 | discovery | fix-contrast-followups | sdd-verify: la regla nueva `a:hover` (primary-700, @layer base) gana a `.skip-link` (misma capa, menor especificidad) y deja el skip link con hover en ~1.4:1; axe no evalúa hover, por eso `npm run a11y` sigue en exit 0; verdict PARTIAL hasta fijar `.skip-link:hover`
## 2026-10-06 | measure | fix-contrast-followups | post-dispatch sdd-verify FIN 21:49:49 outcome=verify-retry

## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-apply INICIO 21:49:52 outcome=ready


## 2026-10-06 | pattern | fix-contrast-followups | sdd-apply (redespacho H1): toda regla de color de enlace declarada en `@layer base` con selector de clase (hoy solo `.skip-link`) pierde contra `a:hover` (0,1,1) y necesita su propio `:hover`; las reglas de componente o sin capa no tienen el problema porque ganan a la capa base
## 2026-10-06 | measure | fix-contrast-followups | post-dispatch sdd-apply FIN 21:54:00 outcome=advance

## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-verify INICIO 21:54:03 outcome=ready

## 2026-10-06 | measure | fix-contrast-followups | post-dispatch sdd-verify FIN 22:05:07 outcome=advance

## 2026-10-06 | measure | fix-contrast-followups | preflight sdd-archive INICIO 22:05:10 outcome=ready

## 2026-10-06 | measure | chore-deploy-config | post-dispatch sdd-verify FIN 22:30:53 outcome=advance

## 2026-10-06 | measure | chore-deploy-config | preflight sdd-archive INICIO 22:30:56 outcome=ready

