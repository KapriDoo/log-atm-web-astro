---
type: change-state
change_name: "content-cleanup-mensajes"
domain: feature
fast_path: full
status: active
current_phase: sdd-archive
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify, sdd-judgment]
spec_refs:
  - "[[content-services/services-catalog-cta-and-detail-pages]]"
  - "[[content-services/services-descriptions-bullets]]"
  - "[[content-services/services-how-we-work-process]]"
  - "[[content-services/services-no-faq-section]]"
  - "[[content-home/home-frequent-routes]]"
  - "[[content-industries/industries-page-content]]"
  - "[[content-nosotros/nosotros-hero-identity]]"
  - "[[content-nosotros/years-experience-narrative-consistency]]"
  - "[[content-nosotros/nosotros-manifesto-founding-year-consistency]]"
  - "[[content-nosotros/nosotros-manifesto-messaging]]"
  - "[[content-nosotros/nosotros-no-timeline-section]]"
  - "[[content-nosotros/nosotros-values-feedback]]"
  - "[[content-nosotros/nosotros-no-certifications-section]]"
  - "[[content-contact/contact-no-time-commitment]]"
  - "[[site-contact-info/site-global-contact-details]]"
  - "[[ui-contrast/services-process-step-title-contrast]]"
  - "[[forms-email/email-sla-no-finite-commitment]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes"
feature_branch: "feature/content-cleanup-mensajes"
integration_target: "main"
created: "2026-07-05"
updated: "2026-07-05"
tasks_ref: "[[changes/content-cleanup-mensajes/tasks]]"
effort: L
design_ref: "[[changes/content-cleanup-mensajes/design]]"
require_judgment: false
skip_judgment: false
---

## Intent

Aplicar cambios de contenido en todas las páginas y en los 3 idiomas (es, en, pt), cuidando ortografía y redacción. Cuando se indique quitar menciones, revisar todos los apartados (no solo el mencionado):

QUITAR de toda la página menciones tipo "OEA", "48h", "24h" (sin compromisos de tiempo) y número determinado de clientes.

SERVICIOS:
- Quitar botones/enlaces "Conocer más" y eliminar las páginas de detalle de servicios (ej. /servicios/carga-aerea/).
- Carga Aérea: descripción → "courier internacional y chárter aéreo, carga general, vuelo pasajero". Bullets exactos: Courier internacional; Chárter aéreo; Cadena de frío y dangerous goods; Carga general; Vuelo pasajero. Quitar los demás bullets.
- Carga Marítima: corregir "FCL/LCL" por "FCL/FCL" "LCL/LCL"; corregir bullet "Reefer y open-top disponibles" por "Carga general, Reefer y open-top disponibles"; quitar "Negociación de tarifas por contrato".
- Aduana y Documentación: quitar toda mención a "OEA"; corregir bullet "DUS, certificados de origen, fumigación" por "DUS, DIN, certificados de origen, fumigación"; quitar bullet "Operador Económico Autorizado".
- Almacenaje: descripción → "Bodegaje de carga general"; bullets solo: Bodegaje, Desconsolidado, Consolidado de contenedores; quitar lo demás.
- Consultoría Logística: quitar "KPI dashboard mensual".
- Ruta Medio Oriente: eliminar todos los bullets y añadir: "Llevamos tu negocio al medio oriente", "Servicio Broker".
- Cómo trabajamos: quitar toda mención "KPI", "OEA" y compromisos de tiempo finito. Paso 03: quitar "24h". Paso 05: quitar "OEA". Paso 06: "Entrega de carga en bodega y cierre documental del proceso aduanero". Ajustar colores (hay fuentes negras sobre fondo negro).
- Quitar apartado "Preguntas frecuentes".

HOME:
- En "Rutas frecuentes" reemplazar "Hong Kong → Iquique" por "Manzanillo → Valparaíso".

INDUSTRIAS:
- Quitar "300+ clientes activos", "98% retención".
- Quitar y eliminar del código sección "Sector destacado".
- "Qué movemos en cada sector": quitar menciones "OEA", "Última milla".

NOSOTROS:
- Corregir "Nosotros · Desde 2003" → "Nosotros · Desde 2023".
- Corregir "20+ años de experiencia" → "Profesionales 20+ años de experiencia".
- Quitar "OEA", "B2B".
- Ajustar la descripción de "La logística es una relación, no un commodity." acorde a las correcciones.
- Quitar "Hoy operamos con clientes en 12 industrias y una retención del 98%..." y reemplazar por algo tipo "Nuestro objetivo: que el cliente sienta que esta operación es suya, ofreciendo una logística hecha a medida" (redactar mejor).
- Quitar por completo apartado "Trayectoria" y eliminar del código sus páginas.
- 4 valores: "KPIs medibles y revisión trimestral con cada cliente." → algo como "Nos preocupamos del feedback de nuestros clientes".
- Certificaciones: quitar apartado completo.

CONTACTO:
- Reemplazar tiempos (ej. "24h") por término general ("rápido" según quede mejor).

GLOBAL:
- Reemplazar teléfono "+56 9 4216 2739" → "+56 9 8270 8492".
- Reemplazar email "mpazrivera@logatm.com" → "contacto@logatm.com".
