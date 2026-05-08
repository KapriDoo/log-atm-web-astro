---
type: tasks
change_name: "alinear-contenido-notion"
created: "2026-05-08"
---

# Tasks — alinear-contenido-notion

## T1 — Extender array SERVICES

**File**: `src/lib/constants.ts`
**Líneas**: 67-108 (zona del array SERVICES)
**Acción**: Agregar 6 objetos de servicio nuevos al array SERVICES con n: '06' a '11', incluyendo icono lucide, título, descripción breve, href (anchor) y flag accent alternado.
**Justificación**: Contenido solicitado por usuaria en Notion.

**Acceptance**:
- [ ] SERVICES tiene longitud 11
- [ ] Los 6 nuevos servicios son: Courier internacional, Seguros de Carga, Desconsolidado, Servicio de Casillero USA, Asesoria en Compras Internacionales, Te conectamos con el Medio Oriente

## T2 — Extender array INDUSTRIES

**File**: `src/lib/constants.ts`
**Líneas**: 143-150 (zona del array INDUSTRIES)
**Acción**: Agregar 8 objetos de industria nuevos al array INDUSTRIES, cada uno con icono lucide, nombre, subtítulo descriptivo y color hex.
**Justificación**: Contenido solicitado por usuaria en Notion.

**Acceptance**:
- [ ] INDUSTRIES tiene longitud 14
- [ ] Las 8 nuevas industrias son: Chatarra Ferrosa, Iluminarias, Vehiculos Usados, Efectos Personales, Maquinaria, Repuestos Automotrices y de maquinaria Pesada, Textil, Proyectos

## T3 — Corregir array STATS

**File**: `src/lib/constants.ts`
**Líneas**: 59-64 (zona del array STATS)
**Acción**: Reemplazar el array STATS por 4 items con valores: 20+ años, 70+ países, 98% satisfacción, Atendemos de manera personalizada. Eliminar el item de 5.000+ envíos.
**Justificación**: Contenido solicitado por usuaria en Notion.

**Acceptance**:
- [ ] STATS tiene longitud 4
- [ ] No existe item con "5.000+" ni "Envíos por año"

## T4 — Implementar dropdown de navegación en Navbar.astro

**File**: `src/components/ui/Navbar.astro`
**Líneas**: 1-404 (componente completo)
**Acción**:
1. Modificar NAV_LINKS para estructura de dropdown (items con `children`)
2. Agregar markup de dropdown nativo en desktop (div.dropdown con ul)
3. Agregar CSS para dropdown (posición, animación, z-index)
4. Agregar JS vanilla para toggle, click-outside, Escape, foco
5. Adaptar drawer mobile para agrupar servicios e industrias
**Justificación**: 11 servicios y 14 industrias saturarían el navbar plano actual.

**Acceptance**:
- [ ] Navbar muestra triggers "Servicios" e "Industrias" en desktop
- [ ] Dropdown lista todos los items de cada categoría
- [ ] Click outside cierra dropdown
- [ ] Escape cierra dropdown y devuelve foco
- [ ] aria-expanded refleja estado
- [ ] Drawer mobile agrupa servicios e industrias
