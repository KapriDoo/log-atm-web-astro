# Tasks: centralizar-estilos

## Orden de ejecución

1. **Tokens**: Primero consolidar tokens.css, luego crear tokens semánticos funcionales. Esto es requisito para todo lo demás.
2. **Secciones y Componentes**: Una vez creados los tokens, migrar estilos de sections y components en cualquier orden (no tienen dependencias entre sí).
3. **Datos**: Evaluar colores de industrias al final, ya que depende de tener el sistema de tokens completo.

---

## Spec: Consolidar tokens de diseño en tokens.css

### Tarea 1: Auditar tokens duplicados entre global.css y tokens.css

- **Archivos**: `src/styles/global.css`, `src/styles/tokens.css`
- **Qué hacer**: Identificar todas las definiciones `@theme` y variables `:root` duplicadas entre ambos archivos
- **Criterio de completado**: Lista documentada de tokens duplicados encontrados
- **Modo**: No TDD

- [x] Comparar definiciones `@theme` en ambos archivos
- [x] Comparar variables CSS en `:root` en ambos archivos
- [x] Documentar duplicados encontrados

### Tarea 2: Consolidar todos los tokens en tokens.css

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Expandir tokens.css para que sea la única fuente de verdad con TODOS los tokens (colores, tipografía, espaciados, etc.)
- **Criterio de completado**: tokens.css contiene la definición completa de todos los tokens del sistema
- **Modo**: No TDD

- [x] Migrar definiciones `@theme` desde global.css a tokens.css
- [x] Migrar variables CSS `:root` desde global.css a tokens.css
- [x] Asegurar que no se pierda ningún valor

### Tarea 3: Limpiar global.css

- **Archivos**: `src/styles/global.css`
- **Qué hacer**: Convertir global.css a un archivo de importación puro con clases utilitarias globales, sin redefinir tokens
- **Criterio de completado**: global.css importa tokens.css sin redefinir tokens del tema
- **Modo**: No TDD

- [x] Eliminar definiciones `@theme` duplicadas
- [x] Eliminar variables CSS duplicadas en `:root`
- [x] Mantener `@import './tokens.css'` al inicio
- [x] Preservar clases utilitarias globales (si existen)

### Tarea 4: Validar build tras consolidación

- **Archivos**: `src/styles/global.css`, `src/styles/tokens.css`
- **Qué hacer**: Ejecutar build de Astro/Tailwind para verificar que la consolidación no rompe nada
- **Criterio de completado**: Build de desarrollo y producción compilan sin errores
- **Modo**: No TDD

- [x] Ejecutar `npm run dev` o build de desarrollo
- [x] Ejecutar build de producción
- [x] Verificar que no hay errores de CSS o Tailwind
- [x] Verificar Lighthouse score >= 95

---

## Spec: Crear tokens semánticos funcionales

### Tarea 5: Crear tokens de opacidad

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Definir tokens CSS para opacidades usadas en overlays y efectos (0.10, 0.14, 0.15, 0.18, 0.25, 0.40, 0.92)
- **Criterio de completado**: Tokens de opacidad definidos para todos los valores literales del proyecto
- **Modo**: No TDD

- [x] Definir `--opacity-overlay-light` (0.10-0.18)
- [x] Definir `--opacity-overlay-medium` (0.25)
- [x] Definir `--opacity-overlay-heavy` (0.92)
- [x] Definir `--opacity-shadow` (0.14)
- [x] Definir `--opacity-cta-shadow` (0.40)
- [x] Documentar uso previsto en comentarios

### Tarea 6: Crear tokens de sombra

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Definir tokens CSS para sombras usadas en cards, secciones y overlays usando `color-mix()` con tokens base
- **Criterio de completado**: Tokens de sombra definidos para todos los box-shadow hardcodeados
- **Modo**: No TDD

- [x] Definir `--shadow-card` (reemplaza rgba(74,123,181,0.14))
- [x] Definir `--shadow-why` (reemplaza rgba(74,123,181,0.18))
- [x] Definir `--shadow-cta` (reemplaza rgba(62,185,120,0.40))
- [x] Definir `--shadow-navbar` (reemplaza rgba(74,123,181,0.10))
- [x] Documentar uso previsto en comentarios

### Tarea 7: Crear tokens de border-radius

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Definir tokens CSS para border-radius repetidos (ej: 24px)
- **Criterio de completado**: Tokens de border-radius definidos para valores repetidos
- **Modo**: No TDD

- [x] Definir `--radius-card` o similar (24px)
- [x] Documentar uso previsto en comentarios

### Tarea 8: Crear tokens de color semánticos

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Definir tokens semánticos para colores específicos de avatars, WhatsApp, SVGs, y fallback de industrias
- **Criterio de completado**: Tokens de color semánticos definidos para todos los colores hardcodeados identificados
- **Modo**: No TDD

- [x] Definir `--color-avatar-*` para colores de avatars en HeroSection
- [x] Definir `--color-whatsapp` y `--color-whatsapp-hover`
- [x] Definir `--color-industry-fallback`
- [x] Definir `--color-svg-*` para colores SVG en WhySection
- [x] Documentar uso previsto en comentarios

### Tarea 9: Validar tokens semánticos con Tailwind v4

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: Verificar que Tailwind v4 reconoce correctamente los nuevos tokens en `@theme`
- **Criterio de completado**: Tailwind v4 resuelve los tokens en build sin errores
- **Modo**: No TDD

- [x] Ejecutar build y verificar que no hay errores de Tailwind
- [x] Verificar que los tokens se aplican correctamente

---

## Spec: Centralizar estilos de Hero section

### Tarea 10: Reemplazar rgba en hero.css

- **Archivos**: `src/styles/sections/hero.css`
- **Qué hacer**: Reemplazar todos los valores `rgba(255,255,255,0.x)` por tokens de opacidad
- **Criterio de completado**: No hay valores rgba literales en hero.css
- **Modo**: No TDD
- **Requiere**: Tarea 5 (tokens de opacidad)

- [x] Identificar todos los rgba literales en hero.css
- [x] Reemplazar por `color-mix()` con tokens de opacidad
- [x] Verificar visualmente que los overlays se ven idénticos

### Tarea 11: Reemplazar colores inline en HeroSection.astro

- **Archivos**: `src/components/sections/HeroSection.astro`
- **Qué hacer**: Reemplazar colores inline de avatars (`#658fc3`, `#3b6497`, `#4A7BB5`) por tokens de color
- **Criterio de completado**: No hay colores hex literales en estilos de HeroSection.astro
- **Modo**: No TDD
- **Requiere**: Tarea 8 (tokens de color semánticos)

- [x] Identificar colores inline en el componente
- [x] Reemplazar por tokens CSS
- [x] Verificar visualmente que los avatars mantienen sus colores

---

## Spec: Centralizar estilos de Services section

### Tarea 12: Reemplazar rgba en services.css

- **Archivos**: `src/styles/sections/services.css`
- **Qué hacer**: Reemplazar `rgba(74,123,181,0.14)` en sombras y `rgba(74,123,181,0.92)` / `rgba(204,118,20,0.92)` en gradient overlays por tokens
- **Criterio de completado**: No hay rgba literales en services.css
- **Modo**: No TDD
- **Requiere**: Tarea 5 (tokens de opacidad), Tarea 6 (tokens de sombra)

- [x] Reemplazar sombra de cards por token de sombra
- [x] Reemplazar gradient overlays por `color-mix()` con tokens
- [x] Verificar visualmente que cards y overlays se ven idénticos

---

## Spec: Centralizar estilos de CTA section

### Tarea 13: Reemplazar rgba en cta.css

- **Archivos**: `src/styles/sections/cta.css`
- **Qué hacer**: Reemplazar `rgba(62,185,120,0.40)` en sombras por token de sombra
- **Criterio de completado**: No hay rgba literales en cta.css
- **Modo**: No TDD
- **Requiere**: Tarea 6 (tokens de sombra)

- [x] Identificar rgba literales en cta.css
- [x] Reemplazar por token de sombra
- [x] Verificar visualmente que la sección CTA se ve idéntica

---

## Spec: Centralizar estilos de Why section

### Tarea 14: Reemplazar rgba y border-radius en why.css

- **Archivos**: `src/styles/sections/why.css`
- **Qué hacer**: Reemplazar `rgba(74,123,181,0.18)`, `rgba(0,0,0,0.10)` y `border-radius: 24px` por tokens
- **Criterio de completado**: No hay rgba literales ni border-radius fijos en why.css
- **Modo**: No TDD
- **Requiere**: Tarea 5 (tokens de opacidad), Tarea 6 (tokens de sombra), Tarea 7 (tokens de border-radius)

- [x] Reemplazar rgba literales por tokens
- [x] Reemplazar border-radius fijo por token
- [x] Verificar visualmente que los elementos se ven idénticos

### Tarea 15: Reemplazar colores SVG en WhySection.astro

- **Archivos**: `src/components/sections/WhySection.astro`
- **Qué hacer**: Reemplazar colores SVG inline (`#aec7e5`, `#2b4e78`) por tokens de color
- **Criterio de completado**: No hay colores hex literales en WhySection.astro
- **Modo**: No TDD
- **Requiere**: Tarea 8 (tokens de color semánticos)

- [x] Identificar colores SVG inline
- [x] Reemplazar por tokens CSS
- [x] Verificar visualmente que los SVGs mantienen sus colores

---

## Spec: Centralizar estilos de Industries section

### Tarea 16: Reemplazar fallback en industries.css

- **Archivos**: `src/styles/sections/industries.css`
- **Qué hacer**: Reemplazar `#4A7BB5` fallback en `color-mix()` por token de color
- **Criterio de completado**: No hay colores hex literales en industries.css
- **Modo**: No TDD
- **Requiere**: Tarea 8 (tokens de color semánticos)

- [x] Identificar color fallback en industries.css
- [x] Reemplazar por token de color
- [x] Verificar visualmente que las tarjetas se ven idénticas

---

## Spec: Centralizar estilos de Navbar

### Tarea 17: Reemplazar rgba y px fijos en Navbar.astro

- **Archivos**: `src/components/ui/Navbar.astro`
- **Qué hacer**: Reemplazar `rgba(255,255,255,0.92)`, `rgba(74,123,181,0.10)` y tamaños fijos en px por tokens
- **Criterio de completado**: No hay rgba literales ni px fijos innecesarios en Navbar.astro
- **Modo**: No TDD
- **Requiere**: Tarea 5 (tokens de opacidad), Tarea 6 (tokens de sombra)

- [x] Reemplazar rgba literales por tokens de opacidad
- [x] Reemplazar tamaños fijos por tokens de espaciado
- [x] Verificar visualmente y funcionalmente (scroll, responsive)

---

## Spec: Centralizar estilos de Footer

### Tarea 18: Reemplazar colores WhatsApp en Footer.astro

- **Archivos**: `src/components/ui/Footer.astro`
- **Qué hacer**: Reemplazar `#128C7E` y `#1da851` por tokens semánticos `--color-whatsapp` y `--color-whatsapp-hover`
- **Criterio de completado**: No hay colores hex literales de WhatsApp en Footer.astro
- **Modo**: No TDD
- **Requiere**: Tarea 8 (tokens de color semánticos)

- [x] Reemplazar color WhatsApp por token
- [x] Reemplazar color hover WhatsApp por token
- [x] Verificar visualmente que el botón se ve idéntico

---

## Spec: Evaluar y migrar colores de industrias

### Tarea 19: Evaluar naturaleza de colores de industrias

- **Archivos**: `src/lib/constants.ts`
- **Qué hacer**: Analizar si los colores del array `INDUSTRIES` son datos puros o tokens visuales
- **Criterio de completado**: Decisión documentada sobre ubicación de colores
- **Modo**: No TDD
- **Requiere**: Tarea 8 (tokens de color semánticos)

- [x] Revisar array INDUSTRIES y uso de colores
- [x] Evaluar si son datos (cada industria tiene color propio) o tokens visuales
- [x] Decidir: (a) mantener en constants.ts con referencias CSS, (b) crear tokens, o (c) mantener como está

### Tarea 20: Implementar decisión de colores de industrias

- **Archivos**: `src/lib/constants.ts`, posiblemente `src/styles/tokens.css`
- **Qué hacer**: Aplicar la decisión tomada en Tarea 19
- **Criterio de completado**: Implementación según decisión documentada, sin regresiones
- **Modo**: No TDD
- **Requiere**: Tarea 19

- [x] Si se migran: crear tokens o referencias CSS
- [x] Si se mantienen: agregar comentario explicando por qué
- [x] Verificar que la sección Industries se ve idéntica

---

## Tareas finales

### Tarea 21: Revisión visual completa

- **Archivos**: Todos los archivos modificados
- **Qué hacer**: Revisar visualmente todas las secciones y componentes para confirmar que no hay regresiones
- **Criterio de completado**: No hay diferencias visuales entre antes y después
- **Modo**: No TDD

- [x] Revisar Hero section
- [x] Revisar Services section
- [x] Revisar CTA section
- [x] Revisar Why section
- [x] Revisar Industries section
- [x] Revisar Navbar (estados, scroll)
- [x] Revisar Footer (botón WhatsApp)
- [x] Ejecutar Lighthouse y verificar score >= 95

### Tarea 22: Documentar convención anti-hardcodeo

- **Archivos**: `src/styles/tokens.css` o archivo de convenciones
- **Qué hacer**: Añadir comentarios/documentación sobre la convención de no hardcodear valores
- **Criterio de completado**: Convención documentada en el código
- **Modo**: No TDD

- [x] Añadir comentario en tokens.css explicando que es la fuente de verdad
- [x] Añadir nota sobre no hardcodear colores/rgba/opacidades
- [x] Considerar añadir nota en README o guía de contribución
