---
type: clarifications
change_name: "fix-i18n-links-and-404"
created: "2026-10-02"
tags: [clarifications]
---

# Aclaraciones: fix-i18n-links-and-404

## Para el MR

- Verificación post-deploy (no se puede comprobar antes del archive, porque la vista previa local no reproduce Cloudflare): abrir `https://logatm.com/en/no-existe`, `https://logatm.com/pt/no-existe` y `https://logatm.com/no-existe`, y confirmar estado 404 con la página en inglés, portugués y español respectivamente.
- Cambio de comportamiento: la página 404 deja de ser un archivo estático y se genera bajo demanda; `/en/404/` y `/pt/404/` pasan de responder 200 a responder 404.
- Deuda declarada: el dato estructurado de migas de pan (`BreadcrumbList`) de las páginas indexables usa «Inicio» fijo en todos los idiomas y no apunta a la home localizada; fuera del alcance de este cambio.
