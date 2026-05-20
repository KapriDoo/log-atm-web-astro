/**
 * scroll-animations.ts — Utilidad genérica de animaciones scroll con GSAP ScrollTrigger
 *
 * Descubre y anima elementos marcados con data-scroll-* attributes.
 * Se carga globalmente desde BaseLayout.astro.
 *
 * API de data attributes:
 *   data-scroll-animate — marca elemento para animación de entrada
 *   data-scroll-type    — fade-up (default), fade-left, fade-right, scale-in, fade-in
 *   data-scroll-delay   — delay en segundos
 *   data-scroll-duration — duración en segundos
 *   data-scroll-batch   — en el CONTENEDOR padre para batch mode
 *
 * Funciones exportadas:
 *   animatePageHero(rootSelector, opts?) — anima elementos [data-hero-animate] al cargar
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger una sola vez (AD-01)
gsap.registerPlugin(ScrollTrigger);

// --- Accesibilidad (AD-02) ---
export const prefersReducedMotion: boolean =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Constantes de animación ---
const DEFAULTS = {
  duration: 0.8,
  ease: 'power2.out',
  y: 30,
  x: 40,
  staggerBatch: 0.15,
  triggerStart: 'top 85%',
} as const;

// --- Tipos de animación ---
type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'fade-in';

function getFromVars(type: AnimationType): gsap.TweenVars {
  switch (type) {
    case 'fade-up':
      return { opacity: 0, y: DEFAULTS.y };
    case 'fade-left':
      return { opacity: 0, x: -DEFAULTS.x };
    case 'fade-right':
      return { opacity: 0, x: DEFAULTS.x };
    case 'scale-in':
      return { opacity: 0, scale: 0.9 };
    case 'fade-in':
      return { opacity: 0 };
  }
}

function getToVars(_type: AnimationType): gsap.TweenVars {
  return { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform,opacity' };
}

// --- Animación hero above-the-fold (D7: gsap.from para evitar ocultamiento si JS falla) ---
export function animatePageHero(
  rootSelector: string,
  opts?: { stagger?: number; y?: number; duration?: number }
): void {
  if (prefersReducedMotion) return;
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const elements = root.querySelectorAll<HTMLElement>('[data-hero-animate]');
  if (elements.length === 0) return;
  gsap.from(elements, {
    opacity: 0,
    y: opts?.y ?? 24,
    stagger: opts?.stagger ?? 0.12,
    duration: opts?.duration ?? 0.6,
    ease: 'power2.out',
    clearProps: 'transform,opacity',
  });
}

// --- Inicialización ---
function init(): void {
  if (prefersReducedMotion) return;

  initBatchContainers();
  initIndividualElements();
}

function initBatchContainers(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-scroll-batch]');

  containers.forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('[data-scroll-animate]');
    if (items.length === 0) return;

    const type = (items[0].dataset.scrollType as AnimationType) || 'fade-up';
    const fromVars = getFromVars(type);

    // Estado inicial oculto vía JS, no CSS (AD-03)
    gsap.set(items, fromVars);

    ScrollTrigger.batch(items, {
      start: DEFAULTS.triggerStart,
      onEnter: (batch) => {
        gsap.to(batch, {
          ...getToVars(type),
          duration: DEFAULTS.duration,
          ease: DEFAULTS.ease,
          stagger: DEFAULTS.staggerBatch,
        });
      },
      once: true,
    });
  });
}

function initIndividualElements(): void {
  const allAnimated = document.querySelectorAll<HTMLElement>('[data-scroll-animate]');

  allAnimated.forEach((el) => {
    // Omitir si ya está dentro de un batch container
    if (el.closest('[data-scroll-batch]')) return;

    const type = (el.dataset.scrollType as AnimationType) || 'fade-up';
    const delay = parseFloat(el.dataset.scrollDelay || '0');
    const duration = parseFloat(el.dataset.scrollDuration || String(DEFAULTS.duration));
    const fromVars = getFromVars(type);

    // Estado inicial oculto vía JS (AD-03)
    gsap.set(el, fromVars);

    gsap.fromTo(el, fromVars, {
      ...getToVars(type),
      duration,
      delay,
      ease: DEFAULTS.ease,
      scrollTrigger: {
        trigger: el,
        start: DEFAULTS.triggerStart,
        once: true,
      },
    });
  });
}

// Ejecutar al cargar
init();
