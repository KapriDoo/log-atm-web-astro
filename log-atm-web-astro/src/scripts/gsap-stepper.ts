/**
 * gsap-stepper.ts — Transiciones GSAP para el wizard de cotización
 *
 * Implementa el patrón OUT→hidden→IN coordinando tweens GSAP con el atributo hidden.
 * El módulo es agnóstico al mecanismo de visibilidad; usa el callback onMidpoint
 * para aplicar hidden/removeAttribute en el momento correcto.
 *
 * Se carga solo desde cotizar.astro — code splitting via Vite.
 */

import { gsap } from 'gsap';
import { prefersReducedMotion } from './scroll-animations';

export interface TransitionStepOpts {
  /** Paneles del stepper (todos los data-step-panel) */
  panels: HTMLElement[];
  /** Índice del paso saliente */
  fromIndex: number;
  /** Índice del paso entrante */
  toIndex: number;
  /** Llamado entre OUT y IN: aplica hidden al saliente y quita hidden al entrante */
  onMidpoint: () => void;
  /** Llamado al completar la animación de entrada */
  onComplete?: () => void;
}

// Flag de módulo: bloquea transiciones simultáneas
let isAnimating = false;

/**
 * Ejecuta la transición animada entre dos pasos del stepper.
 * Si isAnimating, retorna sin ejecutar (evita glitches por clicks rápidos).
 * Si prefersReducedMotion, invoca onMidpoint directamente sin tween.
 */
export function transitionStep(opts: TransitionStepOpts): void {
  if (isAnimating) return;

  if (prefersReducedMotion) {
    opts.onMidpoint();
    opts.onComplete?.();
    return;
  }

  isAnimating = true;

  const direction = opts.toIndex > opts.fromIndex ? 1 : -1;
  const outPanel = opts.panels[opts.fromIndex];
  const inPanel = opts.panels[opts.toIndex];

  // Cancelar tweens activos en todos los paneles
  gsap.killTweensOf(opts.panels);

  // Fase 1: animar salida del panel activo
  gsap.to(outPanel, {
    opacity: 0,
    x: direction * 40,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      // Midpoint: swap de visibilidad (hidden attribute)
      opts.onMidpoint();

      // Fase 2: animar entrada del nuevo panel
      gsap.fromTo(
        inPanel,
        { opacity: 0, x: -direction * 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          onComplete: () => {
            isAnimating = false;
            opts.onComplete?.();
          },
        }
      );
    },
  });
}

/**
 * Devuelve si hay una transición en curso.
 * Los handlers del stepper deben consultar este getter antes de modificar el estado,
 * para evitar desincronización entre state.step y el panel visible.
 */
export function isStepperAnimating(): boolean {
  return isAnimating;
}

/**
 * Resetea el flag isAnimating.
 * Útil para cleanup en casos donde la animación queda interrumpida.
 */
export function resetAnimatingFlag(): void {
  isAnimating = false;
}
