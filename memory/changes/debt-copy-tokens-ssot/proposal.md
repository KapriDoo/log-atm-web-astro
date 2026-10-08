---
type: proposal
change_name: "debt-copy-tokens-ssot"
domain: "debt"
status: approved
iteration: 2
effort: M
risks:
  - descripcion: "La refactorización de los 12 sitios de fusión datos+copy o de SITE altera texto visible, atributos o JSON-LD del HTML generado"
    probabilidad: Media
    mitigacion: "Build antes/después y diff del texto visible, los meta y el JSON-LD de dist/client en las 7 páginas × 3 idiomas; únicas diferencias admitidas: las declaradas en Scope"
  - descripcion: "Al supersedear tokens/create-functional-tokens se pierden sus requisitos vigentes de sombras y radios"
    probabilidad: Media
    mitigacion: "El delta de política de color reenuncia esos requisitos (tokens de sombra y radio en tokens.css, disponibles en @theme)"
  - descripcion: "Quitar --opacity-* de @theme cambia el CSS que genera Tailwind v4"
    probabilidad: Baja
    mitigacion: "0 consumidores verificados (var() y clases); comparar el CSS construido antes/después, sin diferencias fuera de las declaraciones eliminadas"
  - descripcion: "La aserción estricta de longitudes rompe el build con un desalineamiento ya existente"
    probabilidad: Baja
    mitigacion: "Verificado: las 13 listas coinciden con sus datos en es/en/pt; npm run build y check en verde antes de cerrar"
  - descripcion: "El import de src/lib/site.ts desde astro.config.mjs falla en el build de Cloudflare Workers Builds"
    probabilidad: Baja
    mitigacion: "Verificado en astro 6.3.1 (loadConfigWithVite): ante un fallo del import nativo, Astro recarga el config con el runner de Vite, que transpila TS; site.ts sin imports; npm run build en verde y revisión del primer build de Workers Builds tras el merge"
  - descripcion: "El cambio de host canónico apex→www altera las señales SEO (canonical, hreflang, sitemap)"
    probabilidad: Baja
    mitigacion: "Producción ya responde 301 apex→www: las señales pasan a apuntar a la URL servida; verificar en dist/client que canonical, hreflang, og:url, sitemap y robots usan www sin restos del apex"
created: "2026-10-07"
updated: "2026-10-07"
tags: [proposal]
---

# Propuesta: debt-copy-tokens-ssot

## Intent

Que cada dato tenga una sola fuente: el copy, solo en el i18n; los datos no textuales, en `constants.ts`; la identidad del sitio (host canónico incluido), en `SITE`; y la política de color, en una spec que refleje la realidad. Hoy un ítem que falte en el i18n hace reaparecer, sin aviso y en los tres idiomas, copy en español obsoleto; y canonical, `hreflang` y sitemap apuntan al apex, que producción redirige (301) a `www`.

## Scope

**Incluye:**
- **Copy → i18n (12 sitios).** Los 10 del brief más `HOW_WE_WORK` (`nosotros.astro`) e `INDUSTRIES` (`industrias.astro`). Se eliminan de `constants.ts` los campos de copy de `SERVICES`, `HERO_STRIP_STATS`, `WHY_ITEMS`, `INDUSTRIES`, `VALUES`, `HOW_WE_WORK`, `QUOTE_MODES` y `QUOTE_STEPS`, junto con `SEO` (sin consumidores). La etiqueta de la opción «Otro» de `QUOTE_ORIGINS` pasa al i18n (es «Otro», en «Other», pt «Outro»); el `value="Otro"` del payload al operador no cambia.
- **Mecanismo de fallo:** un helper en `src/i18n/utils.ts`, junto a `tList`, que recibe la clave y la lista de datos, lanza un `Error` (clave, idioma y las dos longitudes) si difieren y, si coinciden, retorna el copy. Los 12 sitios lo usan y fusionan sin `??`. Como las páginas se prerenderizan, el error rompe `astro build`. Si se quita un ítem en un solo idioma, falla `validate-i18n` (la paridad aplanada incluye los índices); si se quita en los tres, falla el build por el helper.
- **`SITE` como SSOT**, en `src/lib/site.ts`, sin imports. Contiene `name`, `url` (`https://www.logatm.com`), `phone`, `phoneDisplay`, `email` (`contacto@logatm.com`, sin cambio), `address` estructurada (`street`, `locality`, `city`, `region`, `country`, `countryCode`), `geo` y `social`; **no** contiene slogan. De ahí se derivan `whatsappUrl`, la línea de dirección del footer y contacto, la del correo y el JSON-LD. `BaseLayout` deja de redefinir `SITE_NAME`/`SITE_URL`; el título por defecto pasa a `t('meta.defaultTitle')` (ninguna página llega hoy a ese fallback).
- **Slogan, una sola fuente: `meta.tagline` del i18n.** El JSON-LD (`slogan`) usa el del idioma de la página; `email-templates.ts` importa `es.json` y usa su `meta.tagline` (correos en español para el operador), además del nombre y la dirección de `SITE`. Si al especificar aparece un motivo para fijar el slogan español en el JSON-LD, la spec lo documenta.
- **Host canónico `www` desde `SITE.url`.** `astro.config.mjs` importa `SITE` de `./src/lib/site.ts` para `site` (verificado: Astro 6.3.1 carga el config con import nativo y, si falla, con el runner de Vite, que transpila TS). `public/robots.txt` se reemplaza por el endpoint prerenderizado `src/pages/robots.txt.ts`, que arma la línea `Sitemap:` desde `SITE.url`. `public/manifest.json` no cambia: no contiene host (`start_url: "/"`); la iteración 1 lo suponía. Cloudflare no se toca.
- **Tokens y política de color.** Se eliminan los 18 `--opacity-*` y `--color-whatsapp-hover-dark` en `:root` y en `@theme`. La cabecera de `tokens.css` y el «Don't» de `DESIGN.md` dicen lo mismo: colores de marca, semánticos y pares validados solo vía tokens; no se introducen literales nuevos fuera de `tokens.css`, salvo en las plantillas de correo; los literales existentes son legado tolerado, que no se migra.
- **Comentario de una línea** con la decisión de colores de `INDUSTRIES` (AC de `data/industries-colors`).
- **«Última milla» / «Last mile» / «Última milha»** se quita de `cotizar.extras`; `api/cotizacion.ts` no cambia (`normServices` acepta cualquier string).
- **Specs.** Un delta `ADD` sobre `ui-contrast/contrast-token-single-source` formaliza la política; le apuntan con `superseded_by` las 7 specs de estilos y `tokens/create-functional-tokens` (su requisito de tokens de opacidad contradice la eliminación), cuyos requisitos de sombras y radios se reenuncian en el delta. Specs nuevas: alineación datos↔copy y fuente única de datos del sitio (host canónico y slogan incluidos).
- **Diferencias intencionales del diff de regresión** (únicas admitidas): «Última milla» ausente; «Other»/«Outro» en `/en` y `/pt` de cotizar; host `www` en canonical, `hreflang`, `og:url`, `og:image`, sitemap, robots y JSON-LD; `slogan` del JSON-LD localizado en `/en` y `/pt`.

**Excluye explícitamente:**
- La migración de los ~71 literales de color (YAGNI, decisión del usuario).
- Los topónimos (`LIVE_ROUTES`, orígenes/destinos de `QUOTE_*`/`QUICK_QUOTE_*`) y los valores de `QUICK_QUOTE_MODES`/`VOLUMES`: nombres propios o valores del payload; sus etiquetas visibles salen solo del i18n.
- El texto prellenado de WhatsApp, las menciones textuales «logatm.com» del copy de correos (no son URLs) y los campos muertos `eta`/`status` de `LIVE_ROUTES`.
- El `name` de `manifest.json` (repite el slogan español; archivo estático no localizado), el `name: 'Inicio'` fijo del `BreadcrumbList`, el `README.md` y la lista de locales (brief 08).

## Approach Propuesto

Por capas, con un build por capa. (1) Se crean `site.ts`, el helper y `robots.txt.ts`; se migran los 12 sitios, los consumidores de `SITE`, el slogan y `astro.config.mjs`. (2) Se depura `constants.ts`. (3) Se ajustan `tokens.css`, `DESIGN.md` y el i18n (extras y «Otro»). (4) Se compara `dist/client` antes/después (texto visible, meta, JSON-LD, sitemap y robots de home, servicios, nosotros, cotizar, industrias y contacto en es/en/pt) contra la lista de diferencias intencionales. (5) Corren `a11y`, `check`, `validate-i18n`, `check-i18n-links` y `measure:images`. Las specs las escribe `sdd-spec` antes del código.

**Alternativas descartadas.** (a) Que `validate-i18n` compare contra `constants.ts`: sus 27 `.jpeg` no cargan en `tsx`; habría que partir el módulo o duplicar longitudes. (b) i18n por id: reestructura 13 listas × 3 idiomas y necesita la misma aserción. (c) `SITE` en `constants.ts`: el worker de correo arrastraría los imports de imágenes. (d) «Literales permitidos en overlays»: contradice `contrast-token-single-source` (PR #36). (e) `SITE.tagline`: duplica `meta.tagline` (DRY). (f) Editar el literal de `public/robots.txt`: deja una segunda fuente del host.

## Esfuerzo Estimado

Unos 22 archivos con cambios mecánicos pero repartidos (12 sitios, 8 importadores de `SITE`, config, endpoint de robots, 3 JSON y CSS), 3 o 4 specs y la verificación por diff de 21 páginas. La única lógica nueva es el helper y un endpoint mínimo.

## Riesgos

- Regresión de contenido: el diff de `dist/client` contra la lista de diferencias intencionales es criterio de cierre.
- Requisitos de sombras y radios: el delta los reenuncia.
- CSS de Tailwind: se compara el CSS construido.
- Aserción de longitudes: hoy todas coinciden (verificado).
- Import de `site.ts` en el config: el fallback de Vite lo cubre; se revisa el primer build de Workers Builds.
- Host canónico: alinea las señales con la URL que producción ya sirve.

## Trade-offs

- **A favor**: un dato, un lugar (host y slogan incluidos); el desalineamiento falla en build nombrando la clave; `SITE` importable desde config, worker y endpoint sin assets; las señales SEO dejan de apuntar a una redirección.
- **En contra**: la aserción estricta obliga a editar datos e i18n en el mismo commit; `email-templates.ts` incorpora `es.json` al bundle del worker; el JSON-LD de `/en` y `/pt` deja de publicar el slogan oficial en español; `robots.txt` pasa de archivo estático a endpoint; 8 imports cambian de módulo.
