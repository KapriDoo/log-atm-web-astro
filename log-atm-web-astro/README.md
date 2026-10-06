# LOG ATM — Sitio web corporativo

> **Logística a tu medida** — Sitio web institucional de LOG ATM, empresa chilena de logística aérea y marítima con sede en Santiago.

Producción: [https://logatm.com](https://logatm.com)

---

## Sobre el proyecto

Sitio prerenderizado con Astro y servido por Cloudflare Workers, que ejecuta además la API de los formularios y la página de «no encontrado» de cada idioma. Está orientado a presentar los servicios de LOG ATM, captar cotizaciones y comunicar la propuesta de valor de la marca: soluciones logísticas personalizadas con cercanía latinoamericana.

### Servicios cubiertos

1. **Carga Aérea** — envíos urgentes, courier internacional, chárter aéreo
2. **Carga Marítima** — FCL, LCL, rutas globales
3. **Aduana y Documentación** — DUS, certificados de origen, gestión de trámites
4. **Almacenaje y Distribución** — bodegaje, fulfillment, última milla
5. **Consultoría Logística** — diseño de supply chain a medida

### Industrias objetivo

Minería · Retail · Agro · Farmacia · E-commerce cross-border · Construcción

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) 6 (versión exacta en `package.json`) |
| UI islands | React 19 |
| Estilos | Tailwind CSS v4 + design tokens (CSS variables) |
| Animaciones | GSAP 3.14, Motion (Framer Motion) 12 |
| Iconos | Lucide (`@iconify-json/lucide`) con el componente local `Icon.astro` |
| Imágenes | Sharp (optimización en build) |
| Tipografías | Inter + Outfit (`@fontsource`) |
| Lenguaje | TypeScript (modo `strict`) |
| Runtime | Cloudflare Workers (`@astrojs/cloudflare`) |
| Despliegue | Cloudflare Workers (producción) · Podman (local, opcional) |

**Node.js:** `>=22.12.0`

---

## Comandos

Ejecutar desde la raíz del proyecto (`log-atm-web-astro/`).

| Comando | Acción |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Build de producción en `./dist/` (no verifica tipos) |
| `npm run preview` | Sirve el build con workerd para verificarlo localmente |
| `npm run check` | Verifica los tipos del sitio completo (`astro check`) |
| `npm run a11y` | Audita la accesibilidad del sitio compilado en un navegador real |
| `npm run validate-i18n` | Comprueba la paridad de claves de traducción es/en/pt |
| `npm run check-i18n-links` | Busca en `dist/client` enlaces internos fuera del idioma de su página |
| `npm run measure:images` | Mide el peso de las imágenes de la portada frente a su presupuesto |
| `npm run container:build` | Construye la imagen del contenedor local (Podman) |
| `npm run container:run` | Ejecuta el contenedor local en `http://localhost:4321` |
| `npm run astro -- --help` | CLI de Astro |

### Verificaciones

- **`npm run check`** — verificación de tipos con `astro check`. Es un comando separado del
  build: `npm run build` no verifica tipos, así que un error de tipado no detiene el despliegue
  y se detecta con este comando.
- **`npm run a11y`** — auditoría de accesibilidad con axe-core (reglas WCAG 2.x A/AA) en un
  navegador real, que calcula el contraste de color sobre los estilos finales. Requiere
  compilar antes (`npm run build`) y un Chrome: se indica su ruta con la variable de entorno
  `CHROME_PATH` o se instala en `./chrome` con `npx @puppeteer/browsers install chrome@stable`.
  Recorre todas las páginas de `dist/client` y las páginas de «no encontrado» de cada idioma,
  en escritorio y en móvil, y termina con código distinto de cero ante cualquier violación.
  Audita con movimiento reducido (`prefers-reduced-motion: reduce`) porque el contraste
  relevante es el del estado final de la página: las animaciones de entrada parten de textos
  casi transparentes y medirlas a mitad de camino da falsos positivos que el visitante no ve.
- **`npm run measure:images`** — tras compilar, mide el peso de las imágenes que descarga la
  portada en escritorio y en móvil frente al presupuesto de 2 MB; se ejecuta en cada cambio que
  toque imágenes de la portada.
- **`npm run check-i18n-links`** — tras compilar, detecta enlaces internos que apuntan a un
  idioma distinto del de su página o que no terminan en `/`.

### Vista previa local

`npm run preview` sirve el build con workerd, el runtime de Cloudflare Workers. Si se vuelve a
compilar con la vista previa activa, responde con error 500 hasta reiniciarla: detenerla y
volver a ejecutar `npm run preview`, o usar el contenedor local, que compila antes de arrancar
el servidor y no presenta esta limitación.

---

## Contenedor local (Podman, opcional)

Ejecuta el sitio completo como en producción (páginas es/en/pt, API de contacto y 404 reales)
en un contenedor. Requisito: [Podman](https://podman.io) en modo rootless, sin privilegios de
administrador.

Desde `log-atm-web-astro/`:

```bash
cp .dev.vars.example .dev.vars   # completar las credenciales; sin este archivo la ejecución falla
npm run container:build          # construye la imagen log-atm-web
npm run container:run            # sirve el sitio en http://localhost:4321
```

- La credencial de correo de `.dev.vars` se monta en solo lectura al ejecutar el contenedor y
  nunca entra en la imagen.
- Tras cambiar el código, se vuelve a ejecutar `npm run container:build` y luego
  `npm run container:run`.
- La imagen pesa alrededor de 960 MB; es un tamaño aceptable para un uso local y opcional.
- WSL2: desde Windows basta abrir `http://localhost:4321`. Para abrir el sitio desde la red
  local o desde un móvil, se activa `networkingMode=mirrored` en el archivo `.wslconfig` de
  Windows.

---

## Despliegue

Producción corre en Cloudflare Workers mediante la integración git de Workers Builds: cada push
al repositorio dispara un build y la rama `main` es producción. La credencial `SMTP_PASS` vive
como Secret del Worker y las variables no secretas, en `wrangler.toml`.

---

## Estructura

```
log-atm-web-astro/
├── public/                  Activos estáticos (logo vectorial logo.svg, favicons, manifest, sitemap)
├── src/
│   ├── assets/              Imágenes optimizadas por Astro
│   ├── components/
│   │   ├── sections/        Hero, Servicios, Industrias, Stats, CTA, Why
│   │   └── ui/              Navbar, Footer
│   ├── layouts/             Plantilla base
│   ├── lib/                 Constantes, tipos, helpers
│   ├── pages/               Rutas (index, servicios/, industrias, nosotros, contacto, cotizar, 404)
│   ├── scripts/             Animaciones de scroll y utilidades cliente
│   └── styles/              tokens.css + estilos globales
├── docs/                    Brief de proyecto y documentación interna
├── scripts/                 Utilidades (favicons desde public/logo.svg, validación i18n, auditoría a11y)
├── Containerfile            Imagen del contenedor local (Podman)
├── .containerignore         Exclusiones del contexto de build del contenedor
├── wrangler.toml            Configuración del Worker de Cloudflare
├── astro.config.mjs         Integraciones y site URL
├── CLAUDE.md                Guía de contexto y principios
└── DESIGN.md                Sistema de diseño completo
```

---

## Documentación

Antes de proponer cambios, leer:

- **[CLAUDE.md](./CLAUDE.md)** — Identidad del proyecto, principios (KISS, YAGNI, DRY, SRP), reglas críticas (Lighthouse ≥ 95, WCAG AA, `prefers-reduced-motion`).
- **[DESIGN.md](./DESIGN.md)** — Tokens de diseño, paleta, tipografía, componentes, Do/Don'ts.
- **[docs/project-brief.md](./docs/project-brief.md)** — Identidad de marca, servicios, tono, CTAs e industrias objetivo.

---

## Principios

- **KISS · YAGNI · DRY · SRP** — disciplina sobre abstracciones prematuras
- **Composition over inheritance** — props + slots > clases heredadas
- **Convention over configuration** — seguir las convenciones de Astro
- **Performance first** — objetivo Lighthouse ≥ 95 en todas las páginas
- **Accesibilidad** — WCAG AA mínimo, `prefers-reduced-motion` obligatorio en animaciones
- **Tokens únicos** — cero colores ni espaciados hardcodeados; cada valor vive en `src/styles/tokens.css`

---

## Contacto

**LOG ATM** · Av. Pdte. Kennedy 5600, Of. 507, Vitacura, Santiago, Chile
[contacto@logatm.com](mailto:contacto@logatm.com) · +56 9 8270 8492
