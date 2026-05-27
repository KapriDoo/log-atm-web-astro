---
type: clarifications
change_name: redesign-email-templates-v2
status: resolved
created: "2026-05-26"
updated: "2026-05-26"
---

# Clarifications — redesign-email-templates-v2

> **Resuelto (2026-05-26)**: el usuario aprobó la propuesta **con todas las recomendaciones por defecto**. Logo confirmado **textual** (1:1 con la referencia). Las 5 decisiones quedan fijadas en sus defaults.

Decisiones de diseño que requieren confirmación del usuario antes de implementar. Cada una incluye la recomendación por defecto; si el usuario no objeta, se aplica la recomendación.

## 1. Logo en el header
¿Logo **textual** ("A" + "LOG ATM" en tipografía, como la referencia) o **imagen** (`logo-white.svg`/`logo.png` vía URL pública)?
- **Recomendación por defecto: textual.** Máxima compatibilidad cross-client, sin riesgo de bloqueo de imágenes externas ni clipping de Gmail. Es lo que usa la referencia.

## 2. Sección ROUTE VISUAL en el formulario de contacto
El form de contacto tiene `route` como **texto libre** (no par origen→destino). ¿Mostrarlo como **caja visual** con el texto, como **fila plana** en el data grid, u **omitir** la sección de ruta para contacto?
- **Recomendación por defecto: caja visual con el texto libre completo.** Mantiene la identidad visual de la referencia sin inventar un split origen/destino artificial. Si `route` está vacío, se omite la sección.

## 3. Compatibilidad con Outlook Windows
`border-radius`, `box-shadow` y `overflow:hidden` no se renderizan en Outlook Win/Classic (motor Word). ¿Aceptar **degradación graceful** (contenedor sin redondear/sombra, esquinas del header sin clip) o invertir esfuerzo en hacks VML/MSO?
- **Recomendación por defecto: aceptar la degradación graceful.** El contenido queda íntegro y legible; los hacks añaden complejidad desproporcionada.

## 4. Botones CTA condicionales (Email / WhatsApp)
¿Mostrar siempre ambos botones, o **condicionarlos** a la presencia del dato (omitir "Responder por email" si no hay email; omitir "WhatsApp" si no hay teléfono)?
- **Recomendación por defecto: condicionar ambos botones.** Evita enlaces `mailto:`/`wa.me` vacíos o inválidos. El teléfono se sanitiza con `cleanPhone()` antes de construir `wa.me`.

## 5. Pills de color por tipo de formulario
La referencia sugiere un pill/badge de color distinto por plantilla. ¿Adoptar **azul (contacto) · verde (cotización rápida) · ámbar (cotización 4 pasos)**?
- **Recomendación por defecto: sí, adoptar azul/verde/ámbar.** Coincide con la nota de la referencia y diferencia visualmente el origen del lead en bandeja.
