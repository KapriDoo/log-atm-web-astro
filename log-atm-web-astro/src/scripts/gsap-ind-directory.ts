/**
 * gsap-ind-directory.ts — Crossfade GSAP para el directorio de industrias
 *
 * Reemplaza las transiciones CSS de .ind-directory__slide con tweens GSAP controlados.
 * Incluye fix del bug de clearInterval en la autorotación.
 *
 * Se carga solo desde industrias.astro — code splitting via Vite.
 */

import { gsap } from 'gsap';
import { prefersReducedMotion } from './scroll-animations';

interface IndDirectoryOpts {
  /** Intervalo en ms para la autorotación (omitir o pasar 0 para desactivar) */
  intervalMs?: number;
  /** Callback invocado en cada render con el índice activo (para actualizar UI: counter, captions, etc.) */
  onRender?: (index: number) => void;
}

interface IndDirectoryInstance {
  destroy(): void;
}

/**
 * Inicializa el directorio de industrias con crossfade GSAP.
 *
 * @param rootSelector — selector del contenedor raíz (ej. '#ind-directory')
 * @param opts — opciones: intervalMs, onRender callback
 * @returns instancia con método destroy() para cleanup
 */
export function initIndDirectory(
  rootSelector: string,
  opts?: IndDirectoryOpts
): IndDirectoryInstance {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return { destroy: () => {} };

  const slides = Array.from(root.querySelectorAll<HTMLElement>('.ind-directory__slide'));
  const items = Array.from(root.querySelectorAll<HTMLElement>('.ind-directory__item'));

  if (slides.length === 0) return { destroy: () => {} };

  let active = 0;
  let paused = false;
  let timer: ReturnType<typeof setInterval> | null = null;

  function render(i: number): void {
    const previousSlide = slides.find((s) => s.classList.contains('is-active'));
    const newSlide = slides[i];
    if (!newSlide || previousSlide === newSlide) return;

    // Cancelar tweens pendientes para evitar acumulación
    gsap.killTweensOf(slides);

    if (!prefersReducedMotion) {
      // Animar salida del slide activo
      if (previousSlide) {
        gsap.to(previousSlide, {
          opacity: 0,
          scale: 1.06,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
      // Animar entrada del nuevo slide
      gsap.fromTo(
        newSlide,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Actualizar clases de estado (controlan el fallback sin JS)
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    items.forEach((it, idx) => it.classList.toggle('is-active', idx === i));

    active = i;

    // Invocar callback para que el componente actualice counter, captions y tags
    opts?.onRender?.(i);
  }

  function next(): void {
    render((active + 1) % slides.length);
  }

  function startAutoRotation(): void {
    // Fix bug: siempre limpiar el timer previo antes de crear uno nuevo
    if (timer) clearInterval(timer);
    timer = window.setInterval(() => {
      if (!paused) next();
    }, opts?.intervalMs ?? 3500);
  }

  // Listeners en items: mouseenter, focus y click
  items.forEach((it, idx) => {
    it.addEventListener('mouseenter', () => { active = idx; render(active); });
    it.addEventListener('focus', () => { active = idx; render(active); });
    it.addEventListener('click', () => { active = idx; render(active); });
  });

  // Pausa la autorotación cuando el usuario interactúa con el directorio.
  // focusin/focusout cubre WCAG 2.2.2 para usuarios de teclado.
  root.addEventListener('mouseenter', () => { paused = true; });
  root.addEventListener('mouseleave', () => { paused = false; });
  root.addEventListener('focusin', () => { paused = true; });
  root.addEventListener('focusout', () => { paused = false; });

  // Iniciar autorotación solo si se configuró y no hay preferencia de reducción de movimiento
  if (opts?.intervalMs && !prefersReducedMotion) {
    startAutoRotation();
  }

  function destroy(): void {
    if (timer) clearInterval(timer);
    gsap.killTweensOf(slides);
  }

  // Cleanup automático en navegación con View Transitions
  document.addEventListener('astro:before-swap', destroy, { once: true });

  return { destroy };
}
