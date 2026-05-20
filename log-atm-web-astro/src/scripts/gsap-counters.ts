/**
 * gsap-counters.ts — Animación de contadores numéricos con GSAP ScrollTrigger
 *
 * Se importa solo donde se necesita (HeroSection), no en el bundle global.
 * Anima un objeto { val } y reescribe textContent en cada frame — evita
 * TextPlugin para mantener el bundle más pequeño.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scroll-animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima contadores numéricos al entrar en el viewport.
 * Parsea el textContent del elemento con regex para extraer número y sufijo.
 * Si el texto no comienza con número, lo ignora silenciosamente.
 */
export function initCounters(selector: string = '[data-counter]'): void {
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach((el) => {
    const raw = (el.textContent ?? '').trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    // Si el sufijo empieza con ':' es un ratio (ej. "1:1"); no animar.
    if (match[2].startsWith(':')) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isInt = !match[1].includes('.');
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power1.out',
          snap: isInt ? { val: 1 } : undefined,
          onUpdate: () => {
            const display = isInt ? Math.round(obj.val) : obj.val.toFixed(1);
            el.textContent = `${display}${suffix}`;
          },
        });
      },
    });
  });
}
