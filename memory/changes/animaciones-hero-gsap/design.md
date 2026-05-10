# Design: animaciones-hero-gsap

## Decisiones Técnicas

### DT1: Patrón de integración de GSAP en Astro

**Contexto**: El proyecto usa Astro 6.1.5 sin islas React en components/. Se necesita ejecutar GSAP en el cliente para animar el Hero.
**Decisión**: Script inline `<script>` dentro de `HeroSection.astro`, siguiendo el patrón existente en `Navbar.astro` (líneas 467-581).
**Justificación**:
- Consistente con convención actual del proyecto
- Sin overhead de hidratación de React
- GSAP se carga solo donde se usa (home page)
- Acceso directo al DOM sin abstracciones intermedias

**Alternativas descartadas**:
- Isla React con `client:load`: rompe convención actual, introduce overhead de hidratación innecesario para animaciones decorativas
- Script `.ts` importado: requiere configurar `vite.ssr.noExternal` para GSAP, agrega complejidad de build para un solo componente

### DT2: Estrategia de animación de entrada (stagger)

**Contexto**: Los elementos de contenido del Hero deben aparecer secuencialmente con un efecto coordinado.
**Decisión**: Usar `gsap.timeline()` con `stagger` para encadenar las animaciones de entrada en orden fijo.
**Justificación**:
- Timeline garantiza orden determinístico: badge → título → lead → CTAs → trust indicators
- Stagger reduce boilerplate vs. múltiples `.to()` encadenados manualmente
- Facilita control global de la secuencia (pausa, reverse, timeScale)

**Secuencia de animación**:
| Elemento | Delay | Easing | Transform |
|----------|-------|--------|-----------|
| Badge | 0.0s | `power2.out` | `y: 20 → 0`, `opacity: 0 → 1` |
| Título | +0.15s | `power2.out` | `y: 30 → 0`, `opacity: 0 → 1` |
| Lead | +0.15s | `power2.out` | `y: 20 → 0`, `opacity: 0 → 1` |
| CTAs | +0.15s | `power2.out` | `y: 15 → 0`, `opacity: 0 → 1` |
| Trust | +0.15s | `power2.out` | `y: 10 → 0`, `opacity: 0 → 1` |

**Duración total**: ~1.2s ( dentro del límite de 1.5s de la spec).

### DT3: Animaciones ambientales continuas

**Contexto**: Cards, blobs, grid lines y wave requieren animación continua post-entrada.
**Decisión**: Usar `gsap.to()` con `repeat: -1` y `yoyo: true` para cada elemento decorativo, en timelines separadas e independientes.
**Justificación**:
- timelines separadas evitan que una animación lenta afecte a las demás
- `yoyo: true` produce movimiento suave de ida y vuelta sin necesidad de keyframes manuales
- Facilita detener/reanudar animaciones individuales si se requiere en el futuro

**Parámetros por elemento**:
| Elemento | Propiedad | Valor inicio | Valor fin | Duración | Easing |
|----------|-----------|--------------|-----------|----------|--------|
| Card 1 | `y` | 0 | -12px | 3s | `sine.inOut` |
| Card 2 | `y` | 0 | -15px | 3.5s | `sine.inOut` |
| Card 3 | `y` | 0 | -10px | 2.8s | `sine.inOut` |
| Blob 1 | `scale` | 1 | 1.08 | 4s | `sine.inOut` |
| Blob 2 | `scale` | 1 | 1.05 | 5s | `sine.inOut` |
| Grid lines | `opacity` | 0 | 0.15 | 2s | `power1.out` |
| Wave SVG | `attr.d` | path A | path B | 4s | `sine.inOut` |

### DT4: Respeto a `prefers-reduced-motion`

**Contexto**: Requisito de accesibilidad obligatorio en ambas specs.
**Decisión**: Detectar `window.matchMedia('(prefers-reduced-motion: reduce)')` antes de registrar cualquier tween. Si está activo, usar `gsap.set()` para colocar todos los elementos en su estado final sin animación.
**Justificación**:
- GSAP no tiene detección automática de prefers-reduced-motion
- `gsap.set()` es inmediato y no crea animaciones, evitando cualquier cálculo de frames innecesario
- Consistente con el approach del `global.css` que ya tiene media query base

### DT5: Estado inicial de elementos animados

**Contexto**: Para que las animaciones de entrada funcionen, los elementos deben comenzar en un estado oculto.
**Decisión**: Aplicar `opacity: 0` y `transform: translateY(Npx)` vía CSS en `hero.css` usando una clase `.animate-on-load`. El script de GSAP remueve/override estos estados al animar.
**Justificación**:
- Si GSAP falla o se bloquea, los elementos permanecen invisibles → **mitigación**: fallback con `@media (scripting: none)` o timeout
- Alternativa: `opacity: 1` por defecto y GSAP hace fade-out-in rápido → riesgo de flash visual
- Compromiso: usar `opacity: 0` en CSS + `gsap.set()` inmediato al cargar script como fallback de visibilidad

## Arquitectura

```
HeroSection.astro
├── Markup existente (sin cambios estructurales)
├── Estilos en hero.css (clases .animate-on-load)
└── Script inline <script>
    ├── Detección prefers-reduced-motion
    ├── gsap.timeline() — entrada escalonada
    ├── gsap.to() × N — animaciones ambientales
    └── Cleanup en beforeunload
```

## Output Expected

### Archivos a modificar

- `src/components/sections/HeroSection.astro`
  - Añadir `<script>` inline al final del componente (antes del `</section>` o al final del template)
  - El script importa GSAP desde `'gsap'`
  - Registra timeline de entrada + tweens ambientales
  - Implementa detección de `prefers-reduced-motion`

- `src/styles/sections/hero.css`
  - Añadir clase `.animate-on-load` con `opacity: 0` y `transform: translateY(20px)`
  - Añadir `@media (prefers-reduced-motion: reduce)` que fuerce `opacity: 1` y `transform: none`
  - Asegurar que los elementos sin JS (scripting: none) sean visibles

### Archivos sin cambios

- `src/pages/index.astro` — no requiere modificaciones
- `src/styles/global.css` — ya tiene media query base, no requiere cambios
- `package.json` — GSAP ya está instalado

## Contratos de Componentes

No se introducen nuevos componentes ni interfaces TypeScript en esta fase. El contrato implícito es:

- El script inline espera selectores DOM estables dentro de HeroSection
- Selectores a usar (data-attributes preferidos sobre clases para robustez):
  - `[data-hero-badge]`
  - `[data-hero-title]`
  - `[data-hero-lead]`
  - `[data-hero-ctas]`
  - `[data-hero-trust]`
  - `[data-hero-card]` (3 elementos)
  - `[data-hero-blob]` (2 elementos)
  - `[data-hero-grid]`
  - `[data-hero-wave]`

## Estrategia de Testing

- **Visual/manual**: Verificar secuencia de entrada en Chrome DevTools con throttling lento
- **Accessibility**: Activar `prefers-reduced-motion` en DevTools → verificar elementos estáticos
- **Performance**: Usar Chrome DevTools Performance tab → confirmar 60fps, sin layout thrashing
- **SSR**: Verificar que el HTML estático renderiza correctamente sin el script (view-source)

## Decisiones de implementación adicionales

### Wave SVG: morphing vs. path alternado

Dado que `MorphSVGPlugin` es premium y no está disponible, se usará la técnica de **atributo `d` alternado** con dos paths predefinidos interpolados por GSAP vía `gsap.to(waveElement, { attr: { d: pathB }, duration: 4, repeat: -1, yoyo: true })`. Esto requiere que el `<path>` del wave tenga ambos estados definidos o se genere pathB como variante de pathA.

### Grid lines reveal

Las grid lines son un pseudo-elemento `::before` en el contenedor del Hero. Como los pseudo-elementos no son seleccionables por JS, se animará la `opacity` del contenedor padre o se moverá el background-position. Decisión: animar `opacity` del contenedor `.hero-grid-container` de 0 a su valor final.
