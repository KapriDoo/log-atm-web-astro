/**
 * Augmentación de tipos para globals expuestos en window por scripts de páginas.
 * Nota: __stepper* se accede con casteos inline en wizard.ts y gsap-stepper.ts
 * para evitar acoplamiento global; no se declaran aquí.
 */
declare global {
  interface Window {
    __indDirectoryOnRender?: (idx: number) => void;
  }
}

export {};
