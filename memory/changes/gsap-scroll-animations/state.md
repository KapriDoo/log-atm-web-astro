---
type: change-state
change_name: "gsap-scroll-animations"
domain: "feature"
status: completed
fast_path: "full"
current_phase: ""
phases_completed: [sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify, sdd-archive]
spec_refs: ["[[scroll-entrance-utility]]", "[[scroll-stats-counters]]", "[[scroll-why-reveal]]", "[[scroll-cta-blobs]]", "[[scroll-404-effect]]", "[[scroll-inner-pages]]"]
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
integration_target: "main"
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/6"
mr_status: created
mr_error: ""
created: "2026-05-10"
updated: "2026-05-10"
tasks_ref: "[[tasks]]"
design_ref: "[[design]]"

tags: [change]
---

## Intent

Implementar animaciones GSAP con ScrollTrigger en todas las secciones y páginas del sitio LOG ATM: entradas scroll-triggered para secciones del homepage (Stats, Services, Why, Industries, CTA), contadores animados en Stats, reveal de imagen con clip-path en Why, scroll-triggered batch para páginas internas (servicios, industrias, nosotros, cotizar, contacto, carga-aerea, carga-maritima), blobs animados en CTA, efecto bounce/glitch en 404. Crear utilidad reutilizable de scroll-triggered entrance con data-attributes.
