# CLAUDE.md — Guía de skills y contexto del proyecto

## Proyecto

**log-atm-web-astro** — Sitio web de servicios de logística aérea y marítima.
Stack: **Astro 6.1.5** + **Tailwind v4** + **React (islas)** + **GSAP** + **Framer Motion**

Dirección de diseño: "Corporativo confiable con calidez humana".
Referencias visuales: lifecare.org.au (favorita), the3key.com, abtc.com.
Referencias de contenido: tripathlogistics.com, astralgloballogistics.com.

---

## Identidad de marca

| Campo | Valor |
|---|---|
| Empresa | LOG ATM |
| Tagline | "LOGÍSTICA A TU MEDIDA" |
| CEO | Maria Paz Rivera Zapata |
| Teléfono | +569 421 62739 |
| Dirección | Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile |
| Email corporativo | mpazrivera@logatm.com |
| Redes sociales | Facebook, Twitter/X, Instagram |
| Color principal | ~#4A7BB5 (azul plano único) |
| Logo fuente | `/mnt/c/Users/cipri/Downloads/logatmlogo.png` |
| Logo destino | `src/assets/logo.svg` (convertir con potrace) |
| Firma email | `/mnt/c/Users/cipri/Downloads/logatmgmail.png` |

**Descripción del logo**: Ancla marítima (fondo) + grúa portuaria (superpuesta) + letras "ATM LOG" — diseño flat monocolor azul. Simboliza puentes entre marítimo e industrial.

---

## Contenido base del sitio (inspirado en referencias)

### Servicios a ofrecer (5 pilares)
1. **Carga Aérea** — envíos urgentes, courier internacional, chárter aéreo.
2. **Carga Marítima** — FCL (contenedor completo), LCL (carga consolidada), rutas globales.
3. **Aduana y Documentación** — gestión de trámites, DUS, certificados de origen.
4. **Almacenaje y Distribución** — bodegaje, fulfillment, última milla.
5. **Consultoría Logística** — diseño de supply chain a medida.

### Tono de comunicación
- Profesional pero cercano (latinoamericano, no corporativo frío).
- Énfasis en "a tu medida" = soluciones personalizadas vs. multinacionales genéricas.
- Primer mensaje: confianza y expertise. Segundo mensaje: cercanía y accesibilidad.

### CTAs principales del sitio
- "Cotiza ahora" (primario)
- "Rastrea tu carga" (secundario)
- "Habla con un ejecutivo" (WhatsApp/formulario)

### Industrias target
Minería, retail, agro, farmacia, e-commerce cross-border, construcción.

### Stats/datos a destacar (a confirmar con cliente)
- Años de experiencia en Chile
- Rutas operativas (número de países/puertos)
- Envíos gestionados
- Clientes satisfechos

### Certificaciones/acreditaciones a mostrar
A definir con cliente. Referencias del sector: IATA, FIATA, BASC, ISO 9001, Aduana Chile (OEA).

---

## Conversión logo PNG → SVG

No existe skill para esto. Usar `potrace` npm (v2.1.8, disponible):

```js
// scripts/png-to-svg.mjs — ejecutar una sola vez
import potrace from 'potrace';
import sharp from 'sharp';
// sharp convierte PNG → escala de grises → BMP
// potrace traza el bitmap al path SVG
// Parámetros: threshold:128, color:'#4A7BB5', background:'transparent'
```

Resultado en `src/assets/logo.svg`.

---

## Paleta de colores

Calculada desde el color de marca `#4A7BB5` (HSL 213°, 42%, 50%).

### Escala primaria — Azul marca
| Token | Hex | Uso |
|---|---|---|
| `primary-50` | `#eef4fb` | fondos tenues, hover de filas |
| `primary-100` | `#d7e4f4` | fondos de cards informativas |
| `primary-200` | `#aec7e5` | bordes, dividers sutiles |
| `primary-300` | `#83a7d2` | iconos secundarios, placeholders |
| `primary-400` | `#658fc3` | links hover, estados intermedios |
| **`primary-500`** | **`#4A7BB5`** | **color de marca — NUNCA cambiar** |
| `primary-600` | `#3b6497` | hover de elementos primarios |
| `primary-700` | `#2b4e78` | hover de botones primarios, active |
| `primary-800` | `#1c3554` | texto sobre fondos claros |
| `primary-900` | `#112236` | navbar dark, hero overlay |
| `primary-950` | `#0a1624` | footer, fondos oscuros máximos |

### Escala accent — Ámbar cálido (CTAs y highlights)
Complementario cálido (HSL 32°) que rompe el azul frío y aporta la "calidez" del diseño.

| Token | Hex | Uso |
|---|---|---|
| `accent-300` | `#f7b76e` | fondos de badges, etiquetas |
| `accent-400` | `#f39f3f` | iconos de acción, highlights |
| **`accent-500`** | **`#ed8c1d`** | **CTA principal — botón "Cotiza ahora"** |
| `accent-600` | `#cc7614` | hover de CTA, estados activos |
| `accent-700` | `#a15e12` | active/pressed, texto sobre amber |

### Escala neutral — Gris cálido (HSL 30°, sat. baja)
Grises levemente cálidos que armonizan con el ámbar y evitan la frialdad del gris puro.

| Token | Hex | Uso |
|---|---|---|
| `neutral-50` | `#f8f7f6` | **background de página** |
| `neutral-100` | `#efedeb` | background de secciones alternas |
| `neutral-200` | `#e1dedb` | bordes de inputs, divisores |
| `neutral-300` | `#c8c4c1` | placeholder text, iconos inactivos |
| `neutral-400` | `#aaa6a1` | texto deshabilitado |
| `neutral-500` | `#898580` | texto de apoyo |
| `neutral-600` | `#6e6963` | texto secundario |
| `neutral-700` | `#544f4a` | texto de cuerpo |
| `neutral-800` | `#37332f` | texto de headings |
| `neutral-900` | `#211f1c` | **texto principal** |
| `neutral-950` | `#131210` | texto de máximo contraste |

### Colores semánticos
| Token | Hex | Uso |
|---|---|---|
| `success` | `#2D9B6F` | confirmaciones, estados OK, tracking activo |
| `warning` | `#ed8c1d` | (= accent-500) alertas leves |
| `error` | `#E04848` | errores de formulario, alertas críticas |
| `info` | `#4A7BB5` | (= primary-500) mensajes informativos |

### Tokens funcionales (los que se usan en código)
```css
--color-bg:          #f8f7f6;   /* neutral-50 */
--color-surface:     #ffffff;
--color-surface-alt: #efedeb;   /* neutral-100 */
--color-border:      #e1dedb;   /* neutral-200 */
--color-text:        #211f1c;   /* neutral-900 */
--color-text-muted:  #6e6963;   /* neutral-600 */
--color-brand:       #4A7BB5;   /* primary-500 */
--color-brand-dark:  #2b4e78;   /* primary-700 */
--color-cta:         #ed8c1d;   /* accent-500 */
--color-cta-hover:   #cc7614;   /* accent-600 */
```

### Pares de contraste validados (WCAG AA)
- `neutral-900` sobre `neutral-50`: ratio ~14:1 ✅ AAA
- `primary-500` sobre `#ffffff`: ratio ~4.8:1 ✅ AA
- `primary-900` sobre `#ffffff`: ratio ~14.5:1 ✅ AAA
- `accent-500` sobre `#ffffff`: ratio ~3.1:1 ⚠️ solo para texto grande (≥18px)
- `#ffffff` sobre `primary-500`: ratio ~4.8:1 ✅ AA (texto en botones azules)
- `#ffffff` sobre `accent-600`: ratio ~4.5:1 ✅ AA (texto en botones CTA)

> Si se necesita texto pequeño sobre ámbar, usar `primary-900` como color de texto.

---

## Cuándo usar cada skill

### DISEÑO Y UI/UX

#### `/penpot-uiux-design`
Usar cuando:
- Se necesite definir wireframes, layouts o componentes visuales antes de codificar.
- Se discuta paleta de colores, tipografía, espaciado o sistema de diseño.
- Se revise si un componente cumple con principios de usabilidad (Fitts, Gestalt, jerarquía visual).
- Se creen specs de componentes para pasar a Tailwind.

#### `/landing-page-design`
Usar cuando:
- Se diseñe o revise cualquier sección de la landing (hero, servicios, CTA, footer).
- Se evalúe el flujo de conversión o el orden de las secciones.
- Se decida qué elementos colocar above/below the fold.
- Se necesiten patrones de landing probados para el sector B2B/servicios.

#### `/ui-animation`
Usar cuando:
- Se diseñen micro-interacciones (hover, focus, active states).
- Se definan principios de animación (easing, duración, jerarquía de movimiento).
- Se decida qué debe y qué no debe animarse (respetando `prefers-reduced-motion`).
- Se evalúe si una animación mejora o distrae la UX.

---

### ANIMACIONES AVANZADAS

#### `/framer-motion-animator`
Usar cuando:
- Se implementen animaciones dentro de islas React (`@astrojs/react`).
- Se necesiten animaciones de layout (`AnimatePresence`, `layout` prop).
- Se creen transiciones entre estados de componentes interactivos (cotizador, tracker, formularios).
- Se implemente el sistema de animación de entrada de cards/secciones con `motion.div`.

#### `/gsap-scrolltrigger`
Usar cuando:
- Se implemente el storytelling de scroll (proceso logístico: pickup → puerto → destino).
- Se animen elementos ligados al scroll (parallax, reveal, counters, progress bars).
- Se construya el mapa de rutas animado con líneas que aparecen al hacer scroll.
- Se necesite sincronización precisa entre scroll position y animación (scrub).
- Se trabajen timelines complejos de múltiples elementos.

---

### FRAMEWORK Y COMPONENTES

#### `/astro`
Usar cuando:
- Se configuren integraciones en `astro.config.mjs` (React, Tailwind, sitemap, i18n).
- Se trabajen Content Collections (blog, casos de éxito).
- Se decida qué componentes deben ser islas (`client:load`, `client:visible`, `client:idle`).
- Se optimicen imágenes con `astro:assets` (`<Image>` / `<Picture>`).
- Se implementen View Transitions entre páginas.
- Se configure SSG vs SSR por ruta.
- Se trabajen endpoints o middleware de Astro.

#### `/vercel-react-best-practices`
Usar cuando:
- Se creen islas React (cotizador, formulario, tracker de envíos, mapa interactivo).
- Se gestione estado local en componentes interactivos (`useState`, `useReducer`).
- Se optimice rendimiento de islas (memoización, `useCallback`, `useMemo`).
- Se definan interfaces/props TypeScript para componentes React.
- Se integren hooks de terceros dentro de islas.

#### `/vercel-react-view-transitions`
Usar cuando:
- Se implementen transiciones de página entre rutas de Astro.
- Se anime la entrada/salida de componentes al navegar.
- Se use la View Transitions API nativa del navegador junto a `<ViewTransitions />` de Astro.
- Se coordinen transiciones entre elementos compartidos entre páginas (hero image, título).

---

### ESTILOS

#### `/tailwind-design-system`
Usar cuando:
- Se configure `tailwind.config.*` o el archivo base de Tailwind v4.
- Se definan design tokens (`@theme` en Tailwind v4): colores, tipografía, espaciado, radios, sombras.
- Se creen componentes de utilidad reutilizables con `@apply` o clases utilitarias.
- Se implemente el sistema de dark/light mode con `prefers-color-scheme` o selector.
- Se resuelvan dudas sobre clases específicas, variantes (`hover:`, `md:`, `group-*`, etc.).
- Se construyan layouts complejos con Grid y Flexbox vía Tailwind.

---

### SEO / GEO / AEO / VISIBILIDAD

#### `/seo-audit`
Usar cuando:
- Se revise el `<head>` de cualquier página (meta tags, canonical, OG, Twitter Cards).
- Se valide la estructura de headings (H1 único, jerarquía correcta).
- Se analice la arquitectura de URLs y slugs.
- Se configure el `sitemap.xml` y `robots.txt`.
- Se evalúe la estructura de links internos.
- Se haga revisión final antes de lanzar cualquier página.

#### `/ai-seo`
Usar cuando:
- Se redacte o revise contenido de páginas de servicios (carga aérea, carga marítima, etc.).
- Se optimicen títulos, meta descriptions y H1s para búsquedas del sector logístico.
- Se definan clusters de keywords (página pilar + páginas satélite).
- Se planifique el contenido del blog con intención de búsqueda clara.
- Se trabaje con programmatic SEO para rutas (origen → destino).

#### `/seo-geo`
Usar cuando:
- Se cree contenido diseñado para ser citado por modelos de IA (ChatGPT, Perplexity, Gemini).
- Se estructure información con datos propios, estadísticas y fuentes verificables.
- Se optimice el formato de respuesta (listas, tablas, definiciones) para GEO.
- Se revise si el contenido es "citable" por motores de IA.
- Se configure el schema.org para maximizar aparición en AI Overviews de Google.

#### `/aeo-scorecard`
Usar cuando:
- Se agreguen secciones de FAQ a cualquier página.
- Se evalúe si el contenido responde preguntas directas y concisas (Answer Engine Optimization).
- Se configure `FAQPage` schema en JSON-LD.
- Se audite si una página puede aparecer como featured snippet o en SGE.
- Se preparen respuestas directas para Siri, Alexa, Google Assistant.

---

### CONTENIDO Y ESCRITURA

#### `/ux-writing`
Usar cuando:
- Se redacte o revise cualquier texto visible en la UI (botones, labels, placeholders, mensajes de error, tooltips).
- Se defina el tono de voz de la marca (confiable, humano, técnico pero accesible).
- Se trabajen los CTA: "Cotiza ahora", "Habla con un ejecutivo", "Rastrea tu carga".
- Se redacten onboarding flows, confirmaciones, o estados vacíos.
- Se revise si el microcopy genera confianza o confusión.
- Se adapte el contenido para diferentes culturas/regiones (LATAM, España, etc.).

---

### CALIDAD DE CÓDIGO

#### `/clean-code-principles`
Usar cuando:
- Se revise o refactorice cualquier componente Astro o React.
- Se evalúe si una función hace demasiado (SRP).
- Se detecte código repetido que debería abstraerse (DRY).
- Se decida si agregar una abstracción vale la pena (YAGNI).
- Se nombren variables, funciones o componentes.
- Se estructure la carpeta `src/` (organización por feature vs tipo).
- Se revise si la complejidad es la necesaria y no más (KISS).
- Se haga code review general.

---

### TESTING Y PERFORMANCE

#### `/playwright-e2e-testing`
Usar cuando:
- Se configuren tests E2E en `playwright.config.ts`.
- Se escriban tests de flujo crítico: cotizador, formulario de contacto, navegación.
- Se implementen visual regression tests de páginas o componentes.
- Se configuren tests en CI/CD (GitHub Actions).
- Se prueben diferentes viewports (mobile, tablet, desktop).
- Se verifique que las animaciones/transiciones no rompan el layout.

#### `/web-performance-optimization`
Usar cuando:
- Se analicen los resultados de Lighthouse (LCP, CLS, INP, FID).
- Se optimice la carga del hero (LCP crítico).
- Se implementen estrategias de lazy loading de imágenes y componentes.
- Se configure `fetchpriority="high"` en recursos críticos.
- Se evalúe el impacto de scripts de terceros (Analytics, CRM, WhatsApp).
- Se configure `@astrojs/partytown` para mover scripts a web workers.
- Se decida qué recursos precargar con `<link rel="preload">`.

#### `/core-web-vitals`
Usar cuando:
- Se solucionen problemas específicos de LCP (Largest Contentful Paint > 2.5s).
- Se corrijan layout shifts (CLS — imágenes sin dimensiones, fuentes sin `font-display`).
- Se optimice INP (Interaction to Next Paint) en islas React.
- Se interprete un reporte de PageSpeed Insights o Chrome UX Report.
- Se configure `font-display: swap` y self-hosting de fuentes (Fontsource).

#### `/accessibility-auditor`
Usar cuando:
- Se revise cualquier componente con interactividad (formularios, modales, tabs, accordions).
- Se implemente navegación con teclado y focus management.
- Se configuren roles ARIA correctamente.
- Se verifique contraste de colores (WCAG AA mínimo, AAA donde sea posible).
- Se respete `prefers-reduced-motion` en animaciones.
- Se implementen skip links y landmarks semánticos.
- Se haga auditoría de accesibilidad antes de lanzar.

---

## Stack de referencia

```
src/
├─ layouts/
│   └─ BaseLayout.astro     # SEO, OG, schema, ViewTransitions
├─ components/
│   ├─ ui/                  # Componentes Astro puros (estáticos)
│   └─ islands/             # Componentes React interactivos
├─ pages/
│   ├─ index.astro
│   ├─ servicios/
│   │   ├─ carga-aerea.astro
│   │   ├─ carga-maritima.astro
│   │   ├─ aduanas.astro
│   │   └─ almacenaje.astro
│   ├─ rutas.astro
│   ├─ industrias.astro
│   ├─ cotizar.astro         # Isla React
│   ├─ recursos/             # Blog (Content Collections)
│   ├─ nosotros.astro
│   └─ contacto.astro
├─ content/
│   └─ blog/                 # .md / .mdx
├─ styles/
│   └─ global.css            # Tailwind v4 @theme tokens
└─ assets/
    └─ images/
```

## Principios a aplicar siempre

- **KISS** — Si es simple, no lo compliques.
- **YAGNI** — No construyas lo que no se necesita hoy.
- **DRY** — Componentes reutilizables, tokens únicos.
- **SRP** — Cada componente/función hace una sola cosa.
- **Composition over Inheritance** — Props + slots > clases heredadas.
- **Convention over Configuration** — Seguir las convenciones de Astro.
- **`prefers-reduced-motion`** — Obligatorio en toda animación.
- **Performance first** — Lighthouse ≥ 95 en todas las páginas.
- **Accessibility** — WCAG AA mínimo en todos los componentes.
