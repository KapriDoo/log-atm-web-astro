/**
 * Augmentación de tipos para globals expuestos en window por scripts de páginas.
 * Permite acceder a window.__indDirectoryOnRender y window.__stepperState
 * sin errores de TypeScript.
 */
declare global {
  interface Window {
    __indDirectoryOnRender?: (idx: number) => void;
    __stepperState?: { isAnimating: boolean; step: number };
  }
}

export {};
