# LOG ATM — Sitio web corporativo

> **Logística a tu medida** — Sitio web institucional de LOG ATM, empresa chilena de logística aérea y marítima con sede en Santiago.

Producción: [https://logatm.com](https://logatm.com)

---

## Sobre el proyecto

Sitio estático construido con Astro, orientado a presentar los servicios de LOG ATM, captar cotizaciones y comunicar la propuesta de valor de la marca: soluciones logísticas personalizadas con cercanía latinoamericana.

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
| Framework | [Astro](https://astro.build) 6.1.5 (SSG) |
| UI islands | React 19 |
| Estilos | Tailwind CSS v4 + design tokens (CSS variables) |
| Animaciones | GSAP 3.14, Motion (Framer Motion) 12 |
| Iconos | Lucide vía `astro-icon` |
| Imágenes | Sharp (optimización), Potrace (PNG → SVG) |
| Tipografías | Inter + Outfit (`@fontsource`) |
| Lenguaje | TypeScript (modo `strict`) |
| Deploy | Docker + nginx con Brotli |

**Node.js:** `>=22.12.0`

---

## Comandos

Ejecutar desde la raíz del proyecto (`log-atm-web-astro/`).

| Comando | Acción |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `http://localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Sirve el build localmente para verificación |
| `npm run astro -- --help` | CLI de Astro |

### Con Docker

Desde la raíz del repositorio:

```bash
docker compose up --build
```

Sirve el sitio compilado en `http://localhost:4321` (nginx + Brotli).

---

## Estructura

```
log-atm-web-astro/
├── public/                  Activos estáticos (favicons, manifest, sitemap)
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
├── scripts/                 Utilidades de build (png-to-svg)
├── Dockerfile               Build multi-stage (Astro → nginx + Brotli)
├── nginx.conf               Configuración del servidor
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
- **Tokens únicos** — cero colores ni espaciados hardcodeados; todo vive en `src/styles/tokens.css`

---

## Contacto

**LOG ATM** · Av. Pdte. Kennedy 5600, Of. 507, Vitacura, Santiago, Chile
[contacto@logatm.com](mailto:contacto@logatm.com) · +56 9 8270 8492
