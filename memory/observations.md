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

## 2026-05-28 | debt-candidate | logo.svg duplicado/sin uso en src/assets
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `src/assets/logo.svg`
**Descripción**: No referenciado en `src/`. El logo activo es `public/logo.svg` / `public/logo.png`. Generado por `scripts/png-to-svg.mjs` (one-shot) y aparentemente huérfano.
**Promoción sugerida**: `sdd new cleanup-orphan-logo-svg --domain debt`

## 2026-05-28 | debt-candidate | Videos posiblemente duplicados en public/videos (3.76 MB c/u)
**Detectado por**: sdd-explore en `optimize-images-webp`
**Ubicación**: `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`
**Descripción**: Ambos archivos pesan exactamente 3,756,542 bytes; posible duplicado. Solo `log-atm-intro.mp4` se referencia (WhyVideoSection). Verificar y eliminar el huérfano para reducir peso del deploy.
**Promoción sugerida**: `sdd new dedupe-public-videos --domain debt`

## 2026-05-28 | architecture | `<Picture>` multi-formato como estándar de imágenes de contenido (optimize-images-webp)
Se adopta `astro:assets` con `<Picture formats={['avif','webp']}>` + fallback JPEG para todas las imágenes de contenido (services/industries/process), moviéndolas a `src/assets/images/` y portando `ImageMetadata` en `src/lib/constants.ts` (campo `img` pasa de `string` a `ImageMetadata` vía imports estáticos directos, sin mapa auxiliar). Hero LCP con `priority`; poster de `<video>` vía `getImage()` (WebP). Extiende ADR-0001 (no lo supersede). Ver ADR-0006.

## 2026-05-28 | observation | Inventario real difiere de la propuesta (optimize-images-webp)
`public/images/` tiene **27** JPEG (no 28): services 11, industries 12, process 4 — coincide con los 27 campos `img:` en `constants.ts` (SERVICES 11, INDUSTRIES 12, HOW_WE_WORK 4). Las páginas `src/pages/[lang]/*.astro` son wrappers (`import RootPage` + `<RootPage lang=...>`), no declaran `<img>` propias → migrar canónicas + secciones cubre es/en/pt. Subrutas `servicios/carga-aerea|carga-maritima.astro` no tienen imágenes.

## 2026-05-28 — optimize-images-webp / sdd-apply

- **Layout del worktree**: el proyecto Astro vive en el subdirectorio anidado `log-atm-web-astro/` dentro del worktree, no en la raíz. Build/npm e imports se ejecutan desde `.../optimize-images-webp/log-atm-web-astro/`. `node_modules` no venía instalado → `npm install` (442 paquetes) antes del primer build.
- **[pre-adr] imageService:'compile' obligatorio con adapter Cloudflare**: design.md §28 asumía que `output:'static'` + Cloudflare adapter emite AVIF/WebP estáticos en build-time automáticamente. NO es así: el adapter Cloudflare por defecto usa `imageService:'cloudflare-binding'` (servicio workerd on-demand), que emite URLs `/_image?href=...&f=avif` resueltas en runtime — NO archivos estáticos. El bloque `image.service` (Sharp) de astro.config queda overrideado por el adapter. Para honrar el diseño (optimización build-time, coste runtime cero, AC de T8 "dist/_astro contiene *.avif/*.webp"), se añadió `imageService:'compile'` al adapter. Verificado: tras el cambio el build emite 32 AVIF + 33 WebP estáticos y las URLs apuntan a `/_astro/*.avif|webp`. Decisión aplicada con default razonable (no había ADR que la cubriera); candidata a documentarse en ADR-0006.
- **`logo.svg` real**: tasks/design indicaban `src/assets/logo.svg`, pero git lo rastreaba en `src/assets/industries/logo.svg`. Eliminado junto con `git rm -r src/assets/industries/`. Ningún `logo.svg` permanece bajo `src/`.
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
