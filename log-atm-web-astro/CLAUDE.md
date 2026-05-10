# CLAUDE.md — Guía de contexto del proyecto

## Proyecto

**log-atm-web-astro** — Sitio web de servicios de logística aérea y marítima.
Stack: Astro 6.1.5 + Tailwind v4 + React (islas) + GSAP + Framer Motion

---

## Documentación clave (LEER ANTES DE CUALQUIER CAMBIO)

| Archivo | Qué contiene |
|---|---|
| `DESIGN.md` | Tokens de diseño, paleta de colores, componentes, reglas visuales y Do/Don'ts |
| `docs/project-brief.md` | Identidad de marca, servicios, tono de comunicación, CTAs |
| `memory/_profile.md` | Stack técnico, dependencias, convenciones del proyecto |

---

## Identidad (resumen)

- **Empresa**: LOG ATM — "LOGÍSTICA A TU MEDIDA"
- **CEO**: Maria Paz Rivera Zapata
- **Color marca**: #4A7BB5 | **CTA**: #3EB978
- **Tono**: Profesional cercano, latinoamericano
- **Diseño**: "Corporativo confiable con calidez humana"

---

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
