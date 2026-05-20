/**
 * gsap-timeline-reveal.ts — Animación scroll-triggered para la sección timeline de /nosotros
 *
 * Anima la línea horizontal (scaleX 0→1) y luego los items con stagger fade-up.
 * Se carga solo desde nosotros.astro — code splitting via Vite.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scroll-animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Inicializa la animación de reveal de la timeline.
 * @param rootSelector — selector del contenedor raíz (ej. '.timeline__track')
 */
export function initTimelineReveal(rootSelector: string): void {
  if (prefersReducedMotion) return;

  const root = document.querySelector(rootSelector);
  if (!root) return;

  const line = root.querySelector<HTMLElement>('.timeline__line');
  const items = Array.from(root.querySelectorAll<HTMLElement>('.timeline__item'));

  if (!line && items.length === 0) return;

  // ScrollTrigger con onEnter: el estado inicial solo se aplica cuando el trigger entra,
  // evitando que el usuario aterrice con la timeline ya en viewport y la vea invisible.
  ScrollTrigger.create({
    trigger: rootSelector,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(line, {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform',
        });
      }
      if (items.length > 0) {
        gsap.set(items, { opacity: 0, y: 20 });
        tl.to(
          items,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          },
          '-=0.2'
        );
      }
    },
  });
}
