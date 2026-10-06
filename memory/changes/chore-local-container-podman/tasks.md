# Tasks: chore-local-container-podman

Rutas relativas a la raíz del repo git. La app vive en `log-atm-web-astro/`; `memory/`,
`.gitattributes`, `docker-compose.yml` y `fix-wsl2-port.bat` viven en la raíz. Los comandos `npm`
se ejecutan desde `log-atm-web-astro/` del worktree. Todo fixture, copia aislada (`git archive`) o
`.dev.vars` falso se crea bajo el directorio de temporales del despacho de `sdd-apply`, nunca en el
worktree. El proyecto no tiene framework de tests: la evidencia es la ejecución de cada comando.

## Orden de ejecución

1. **Tarea 1 y 2 primero** (prioridad del brief): `.gitattributes` con `memory/observations.md merge=union`
   en un commit propio (Tarea 1), verificado en un repo de prueba (Tarea 2). No depende de nada.
2. **Auditoría a11y** (Tareas 3–7): dependencias y script (3) → reescritura de `axe-audit.mjs` (4) →
   verificación de cobertura (5) → portabilidad (6) → estado final / contraste de portadas (7).
   Requiere `npm ci` en el worktree y un Chrome provisto vía `CHROME_PATH`.
3. **Type-check** (Tareas 8–12): dependencias y script (8) → corrección de los 4 errores (9) →
   verificación (10) → perfil `## Stack` (11, requiere 3 y 8) → independencia del build (12).
   Las Tareas 3 y 8 editan ambas `package.json` y `package-lock.json`: se ejecutan en orden, no en paralelo.
4. **Contenedor** (Tareas 13–18): `Containerfile` (13) y `.containerignore` (14) → scripts npm (15) →
   verificación de paridad con producción (16) → aislamiento de secretos (17) → comandos y reconstrucción (18).
5. **Documentación y referencias** (Tareas 19–21): menciones a Cloudflare Pages (19) → README de despliegue y
   contenedor (20) → README de exactitud del proyecto (21). Las Tareas 20 y 21 editan el mismo archivo: en orden.
6. **Retiro del camino Docker + nginx** (Tareas 22–23): requiere 18 y 21 (el README ya no referencia lo retirado).
7. **Perfil** (Tarea 24): `## Build & Deploy` de `memory/_profile.md`; requiere 4, 8 y 15.

Si la auditoría (Tarea 5 o 7) halla violaciones existentes del sitio, `sdd-apply` no corrige el sitio:
las agrega como deuda al final de `memory/observations.md` (solo agregado) y las reporta al orquestador.

---

## Spec: [[observations-log-merge]] — Fusión sin conflicto del registro de observaciones

### Tarea 1: Crear `.gitattributes` con `merge=union` para `observations.md`

- **Archivos**: `.gitattributes` (raíz del repo, archivo nuevo)
- **Qué hacer**: crear el archivo con un comentario en español que explique que el registro es append-only y la línea `memory/observations.md merge=union`. Ningún otro patrón (D10). Se confirma en un commit propio, sin otros archivos.
- **Criterio de completado**: `git check-attr merge memory/observations.md` → `union`; `git check-attr merge memory/_profile.md` → `unspecified`; el commit contiene únicamente `.gitattributes`.
- **Modo**: no TDD (archivo de configuración).

- [x] Crear `.gitattributes` en la raíz del repo con el comentario en español y la línea `memory/observations.md merge=union`
- [x] Ejecutar `git -C <worktree> check-attr merge memory/observations.md` y confirmar `union`
- [x] Ejecutar `git -C <worktree> check-attr merge memory/_profile.md` y confirmar `unspecified`
- [x] Confirmar un commit propio (`chore(repo): ...`, en inglés, Conventional Commits) que solo incluye `.gitattributes`

### Tarea 2: Verificar la fusión de `observations.md` en un repo de prueba

- **Archivos**: ninguno del repo (fixture bajo el directorio de temporales del despacho)
- **Qué hacer**: en un repo git nuevo creado con `mktemp -d` bajo el directorio de temporales, copiar `.gitattributes` y un `memory/observations.md` y una spec de ejemplo; demostrar los dos comportamientos y que no hay configuración local.
- **Criterio de completado**: fusión sin conflicto con ambas entradas conservadas en `observations.md`; conflicto en la misma línea de una spec; el repo de prueba no tiene `merge.union` ni ningún `merge.*` en su configuración local.
- **Requiere**: Tarea 1
- **Modo**: no TDD (evidencia por ejecución)

- [x] Crear el repo de prueba en un directorio nuevo de `mktemp -d` y commitear `.gitattributes`, `memory/observations.md` y `memory/specs/x/y.md`
- [x] Crear dos ramas que agregan entradas distintas al final de `memory/observations.md` y fusionarlas: sin conflicto, ambas entradas presentes
- [x] Crear dos ramas que editan la misma línea de `memory/specs/x/y.md` y fusionarlas: conflicto de contenido
- [x] Ejecutar `git config --local --get-regexp '^merge\.'` en el repo de prueba y confirmar salida vacía
- [x] Borrar el repo de prueba

---

## Spec: [[a11y-audit-real-browser-coverage]] — Auditoría a11y en navegador real sobre todo el sitio compilado

### Tarea 3: Declarar dependencias y script de la auditoría

- **Archivos**: `log-atm-web-astro/package.json`, `log-atm-web-astro/package-lock.json`
- **Qué hacer**: instalar `playwright-core@^1.63.0` y `axe-core@^4.14.0` como devDependencies y agregar el script `"a11y": "node scripts/axe-audit.mjs"` (D6). `build` no cambia.
- **Criterio de completado**: ambas dependencias figuran en `devDependencies` con esos rangos; `npm run a11y` existe como script; el lockfile está actualizado.
- **Modo**: no TDD

- [x] Ejecutar `npm ci` en `log-atm-web-astro/` del worktree para tener `node_modules`
- [x] Ejecutar `npm install -D playwright-core@^1.63.0 axe-core@^4.14.0`
- [x] Agregar el script `a11y` con el valor exacto `node scripts/axe-audit.mjs` en `package.json`
- [x] Confirmar que `jsdom` no queda declarado ni importado por ningún archivo de `scripts/` tras la Tarea 4

### Tarea 4: Reescribir `scripts/axe-audit.mjs`

- **Archivos**: `log-atm-web-astro/scripts/axe-audit.mjs`
- **Qué hacer**: reescribir el script completo según el contrato de D6 y la tabla «Contratos de Componentes» del diseño: precondición de build (`dist/client/index.html` y `.wrangler/deploy/config.json`, exit 2 con «Compilá el sitio primero: npm run build»); resolución del navegador (`CHROME_PATH`, luego `chrome/*/chrome-linux64/chrome` de versión mayor, luego error exit 2 que nombra `CHROME_PATH` y el comando de instalación); servidor propio `astro preview --host 127.0.0.1 --port <libre>` con grupo de procesos propio, sondeo de `GET /` cada 250 ms con límite de 30 s y terminación del grupo al salir o con `SIGINT`; lista de URLs derivada de `dist/client` (`*.html` → 200) y sondas `{prefijo}__a11y-404__/` por prefijo hreflang de `index.html` (→ 404); dos contextos (escritorio 1280×800; móvil 390×844 `isMobile` `hasTouch`) ambos con `reducedMotion: 'reduce'`; `page.goto` con `waitUntil: 'load'`, inyección de `axe.min.js` con `addScriptTag` y `axe.run` con las etiquetas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`; informe `[viewport] url rule-id (impact) help → selector` por nodo, resumen con totales; exit 0 / 1 / 2. Sin `jsdom`.
- **Criterio de completado**: el script cumple cada fila del contrato; no importa `jsdom`; no contiene lista fija de rutas; tras ejecutarlo no quedan procesos `astro preview`/`workerd`.
- **Requiere**: Tarea 3
- **Modo**: no TDD (la evidencia por ejecución está en la Tarea 5)

- [x] Reemplazar el contenido de `scripts/axe-audit.mjs` por la nueva implementación, con comentarios en español
- [x] Implementar precondición de build y resolución de navegador con los mensajes y exit codes del contrato
- [x] Implementar el ciclo de vida del servidor propio (puerto libre por `net`, sondeo, volcado de salida si falla, terminación del grupo de procesos en éxito, error y `SIGINT`)
- [x] Implementar la derivación de URLs desde `dist/client` y de las sondas 404 desde los `hreflang` de `index.html`
- [x] Implementar los dos contextos con `reducedMotion: 'reduce'`, la auditoría por página, la verificación del estado HTTP esperado y el informe con totales
- [x] Confirmar con búsqueda de texto que `jsdom` ya no se importa en `scripts/`

### Tarea 5: Verificar cobertura, informe y exit codes de la auditoría

- **Archivos**: ninguno (evidencia por ejecución; fixtures en copia aislada); `memory/observations.md` solo si hay deuda por agregar al final
- **Qué hacer**: ejecutar `npm run build` y luego `CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y` en el worktree; obtener el árbol de un commit con `git -C <worktree> archive <sha> | tar -x -C <DEST>` (con la comprobación de `realpath` de `sdd-phase-common.md`) para las pruebas de mutación.
- **Criterio de completado**: resumen con 21 URLs × 2 tamaños = 42 auditorías (18 páginas + 3 sondas 404); cada violación del informe nombra página, tamaño y selector; exit 0 sin violaciones o exit 1 con la lista; en la copia aislada, un texto de bajo contraste inyectado produce exit 1 y se reporta como `color-contrast`, y una página nueva aparece en el resumen sin tocar el script; `pgrep` sin `workerd`/`astro preview` huérfanos.
- **Requiere**: Tarea 4
- **Modo**: no TDD

- [x] Ejecutar `npm run build` en el worktree y confirmar exit 0
- [x] Ejecutar `npm run a11y` con `CHROME_PATH` y confirmar el resumen de 42 auditorías sobre 21 URLs
- [x] Revisar que las líneas de hallazgo traen viewport, URL, regla, impacto, ayuda y selector
- [x] En una copia aislada (`${DEST}` nuevo bajo el directorio de temporales): inyectar texto de bajo contraste en una página, compilar y auditar; confirmar exit 1 y violación `color-contrast` con página, tamaño y selector
- [x] En la copia aislada: agregar una página nueva, compilar y auditar; confirmar que entra en el resumen sin editar el script
- [x] Ejecutar `pgrep -af "workerd|astro preview"` y confirmar que no quedan procesos huérfanos
- [x] Si hay violaciones existentes del sitio, agregarlas como deuda al final de `memory/observations.md` (solo agregado) y registrarlas en `Riesgos` del envelope

---

## Spec: [[a11y-audit-browser-portability]] — Navegador y dependencias de la auditoría portables

### Tarea 6: Verificar errores de entorno y dependencias declaradas

- **Archivos**: ninguno (evidencia por ejecución; `log-atm-web-astro/scripts/axe-audit.mjs` solo si falta ajustar un mensaje)
- **Qué hacer**: comprobar los tres caminos de error del script y que una instalación limpia basta. La documentación en el README (`CHROME_PATH` / `./chrome`) la cubre la Tarea 21.
- **Criterio de completado**: con `CHROME_PATH` apuntando a un archivo inexistente → error y exit 2 que nombra la variable; sin `CHROME_PATH` y sin `chrome/` → exit 2 con el mensaje que nombra `CHROME_PATH` y el comando `npx @puppeteer/browsers install chrome@stable`; sin `dist/` → exit 2 con «npm run build»; `npm ci` desde cero deja `playwright-core` y `axe-core` instalados sin más pasos.
- **Requiere**: Tarea 4
- **Modo**: no TDD

- [x] En una copia aislada sin `chrome/`, ejecutar `npm run a11y` sin `CHROME_PATH` y confirmar exit 2 con el mensaje esperado
- [x] Ejecutar con `CHROME_PATH=/ruta/inexistente` y confirmar exit 2 con mensaje que nombra la variable
- [x] En una copia aislada sin `dist/`, ejecutar `npm run a11y` y confirmar exit 2 con «npm run build»
- [x] En una copia aislada, ejecutar `npm ci` y confirmar que `node_modules/playwright-core` y `node_modules/axe-core` existen y el script arranca hasta la resolución del navegador

---

## Spec: [[a11y-audit-final-state-evaluation]] — Auditoría sobre el estado final de las páginas

### Tarea 7: Documentar el motivo del movimiento reducido y verificar el contraste de portadas

- **Archivos**: `log-atm-web-astro/scripts/axe-audit.mjs`
- **Qué hacer**: agregar al script un comentario de cabecera en español que explique que se audita el estado final de la página con `reducedMotion: 'reduce'` y que ese estado es el relevante para el contraste (las animaciones de entrada producen falsos positivos en estados intermedios). La documentación del README la cubre la Tarea 21.
- **Criterio de completado**: el comentario de cabecera existe; ambos contextos fijan `reducedMotion: 'reduce'` sin opción para desactivarlo; la auditoría de las portadas `/`, `/en/` y `/pt/` informa 0 violaciones `color-contrast` en escritorio y móvil.
- **Requiere**: Tarea 5
- **Modo**: no TDD

- [x] Agregar el comentario de cabecera en español sobre estado final y movimiento reducido
- [x] Confirmar por búsqueda de texto que `reducedMotion: 'reduce'` está en los dos contextos y no hay bandera que lo anule
- [x] Ejecutar `npm run a11y` y confirmar 0 violaciones `color-contrast` en las portadas de los tres idiomas
- [x] Si hay violaciones `color-contrast` en portadas, registrarlas como deuda en `memory/observations.md` (solo agregado) y marcarlas en `Riesgos`

---

## Spec: [[type-check-zero-errors]] — Verificación de tipos con 0 errores

### Tarea 8: Declarar la verificación de tipos y confirmar la base

- **Archivos**: `log-atm-web-astro/package.json`, `log-atm-web-astro/package-lock.json`
- **Qué hacer**: instalar `@astrojs/check@^0.9.10` y `typescript@^6.0.3` como devDependencies y agregar el script `"check": "astro check"` (D5). `build` permanece `astro build`.
- **Criterio de completado**: `npm ls typescript @astrojs/check` sin `invalid` ni advertencias de peer; `npm run check` termina con exit distinto de cero y 4 errores (la base de la Tarea 9).
- **Requiere**: Tarea 3 (se ejecutan en orden: ambas editan `package.json`)
- **Modo**: no TDD

- [x] Ejecutar `npm install -D @astrojs/check@^0.9.10 typescript@^6.0.3`
- [x] Agregar el script `check` con el valor exacto `astro check` en `package.json`
- [x] Ejecutar `npm ls typescript @astrojs/check` y confirmar ausencia de `invalid` y de advertencias de peer
- [x] Ejecutar `npm run check` y confirmar los 4 errores esperados (TS2307, TS2353, TS7031, TS2322)

### Tarea 9: Corregir los cuatro errores de tipos en su origen

- **Archivos**: `log-atm-web-astro/src/types/cloudflare-workers.d.ts` (nuevo), `log-atm-web-astro/src/lib/mailer.ts`, `log-atm-web-astro/astro.config.mjs`, `log-atm-web-astro/src/scripts/gsap-ind-directory.ts`
- **Qué hacer**: (1) archivo nuevo `src/types/cloudflare-workers.d.ts`, script ambient sin `import`/`export` de nivel superior, con la declaración del módulo `cloudflare:workers` que exporta `env: Record<string, unknown>` y comentario en español (D5); (2) eliminar `platformProxy: { enabled: true },` del adapter en `astro.config.mjs`; (3) anotar `i18nValidator` con JSDoc `@returns {import('astro').AstroIntegration}`; (4) declarar `timer` como `number | null` en `gsap-ind-directory.ts`; (5) actualizar el JSDoc de `resolveMailEnv` en `mailer.ts` para nombrar el plugin de Vite de Cloudflare que lee `.dev.vars` en `astro dev`, sin tocar el código de la función. Sin `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck` ni cambios en `tsconfig.json`.
- **Criterio de completado**: `npm run check` termina con `0 errors`; `tsconfig.json` y `src/types/globals.d.ts` sin cambios; ninguna supresión nueva.
- **Requiere**: Tarea 8
- **Modo**: [TDD] (el test es `npm run check`: rojo con 4 errores, verde con 0)

- [x] Ejecutar `npm run check` y confirmar el rojo de 4 errores (test)
- [x] Crear `src/types/cloudflare-workers.d.ts` como script ambient con la declaración de `cloudflare:workers`
- [x] Quitar `platformProxy: { enabled: true },` de `astro.config.mjs`
- [x] Agregar el JSDoc `AstroIntegration` a `i18nValidator` en `astro.config.mjs`
- [x] Cambiar la declaración de `timer` a `number | null` en `src/scripts/gsap-ind-directory.ts`
- [x] Actualizar el JSDoc de `resolveMailEnv` en `src/lib/mailer.ts` (solo el comentario)
- [x] Ejecutar `npm run check` y confirmar `0 errors`

### Tarea 10: Verificar el criterio de la verificación de tipos

- **Archivos**: ninguno (evidencia por ejecución; mutación en copia aislada)
- **Qué hacer**: comprobar los cinco criterios de la spec.
- **Criterio de completado**: `npm run check` → `0 errors`; sin nuevas apariciones de supresiones; `tsconfig.json` sin cambios (`git diff`); en una copia aislada, un error deliberado (asignar `string` a `number`) hace que `npm run check` termine con exit distinto de cero; `npm ci` desde cero sin `invalid` ni advertencias de peer.
- **Requiere**: Tarea 9
- **Modo**: no TDD

- [x] Ejecutar `grep -rn "@ts-ignore\|@ts-expect-error\|@ts-nocheck"` sobre `src/` y `astro.config.mjs` y comparar con la base: sin apariciones nuevas
- [x] Ejecutar `git -C <worktree> diff --stat -- log-atm-web-astro/tsconfig.json` y confirmar sin cambios
- [x] En una copia aislada, introducir el error deliberado y confirmar `npm run check` con exit distinto de cero
- [x] En una copia aislada, ejecutar `npm ci` y `npm ls typescript @astrojs/check` y confirmar sin incompatibilidad de versiones

### Tarea 11: Actualizar `## Stack` del perfil con las devDependencies nuevas

- **Archivos**: `memory/_profile.md`
- **Qué hacer**: en `## Stack` → `### Dev Tools` de `_profile.md` agregar `@astrojs/check`, `typescript`, `playwright-core` y `axe-core` con los rangos de `package.json`, en el mismo formato de las entradas vigentes, sin historia del cambio y sin tocar `## Pipeline SDD` ni `## Build & Deploy` (esta última la edita la Tarea 24).
- **Criterio de completado**: las cuatro dependencias figuran con el rango que declara `package.json`; el resto del perfil, salvo lo que edita la Tarea 24, queda intacto.
- **Requiere**: Tarea 3, Tarea 8
- **Modo**: no TDD (solo prosa)

- [x] Leer los rangos de `@astrojs/check`, `typescript`, `playwright-core` y `axe-core` en `package.json`
- [x] Agregar las cuatro entradas a `### Dev Tools` en el formato vigente
- [x] Confirmar con `git diff` que solo cambió esa sección

---

## Spec: [[type-check-build-independence]] — Compilación independiente de la verificación de tipos

### Tarea 12: Verificar que la compilación no depende de la verificación de tipos

- **Archivos**: `log-atm-web-astro/package.json` (sin cambios esperados en `build`)
- **Qué hacer**: confirmar que `build` sigue siendo `astro build`, que `check` es un script propio y que el retiro de `platformProxy` no altera el resultado del build.
- **Criterio de completado**: `build` vale exactamente `astro build`; en una copia aislada con el error de tipos deliberado, `npm run build` termina con exit 0 y `npm run check` con exit distinto de cero; el build del worktree genera las mismas 18 páginas en `dist/client` y el Worker con la API de contacto y la 404 (ver verificación de la Tarea 16).
- **Requiere**: Tarea 9
- **Modo**: no TDD

- [x] Confirmar por lectura de `package.json` que `build` es `astro build` y `check` es `astro check`
- [x] En una copia aislada con el error de tipos deliberado, ejecutar `npm run build` y confirmar exit 0
- [x] En la misma copia, ejecutar `npm run check` y confirmar exit distinto de cero
- [x] En el worktree, ejecutar `npm run build` y confirmar exit 0 y 18 archivos `*.html` bajo `dist/client`

---

## Spec: [[container-production-parity]] — Contenedor local con paridad con producción

### Tarea 13: Crear el `Containerfile`

- **Archivos**: `log-atm-web-astro/Containerfile` (nuevo)
- **Qué hacer**: imagen de un stage sobre `docker.io/library/node:22-slim`, exactamente según «Contratos de Componentes → Containerfile» de D1: `WORKDIR /app`, `COPY package.json package-lock.json ./`, `npm ci`, `COPY . .`, `npm run build`, `EXPOSE 4321` y `CMD` en forma exec `/app/node_modules/.bin/astro preview --host :: --port 4321`. Sin `USER`, sin multi-stage. Comentarios en español sobre Debian/glibc por `workerd`, secretos montados en ejecución en `/app/dist/server/.dev.vars` (nunca copiados) y `--host ::` por `localhost` → `::1`.
- **Criterio de completado**: el archivo existe con esas instrucciones y comentarios; no copia `.dev.vars` de forma explícita.
- **Modo**: no TDD

- [x] Crear `log-atm-web-astro/Containerfile` con las instrucciones del contrato
- [x] Agregar los tres comentarios en español (glibc/workerd, secretos montados, `--host ::`)
- [x] Confirmar que `CMD` está en forma exec y no invoca `npm`

### Tarea 14: Crear el `.containerignore`

- **Archivos**: `log-atm-web-astro/.containerignore` (nuevo)
- **Qué hacer**: excluir `node_modules`, `dist`, `.astro`, `.wrangler`, `chrome`, `.git`, `.env`, `.env.*`, `.dev.vars`, `.dev.vars.*` y re-incluir `!.dev.vars.example` (D2).
- **Criterio de completado**: el archivo contiene exactamente esas exclusiones y la re-inclusión; el `.dev.vars` local nunca entra en el contexto de build.
- **Requiere**: Tarea 13
- **Modo**: no TDD

- [x] Crear `log-atm-web-astro/.containerignore` con las diez exclusiones y la re-inclusión de `.dev.vars.example`
- [x] Agregar un comentario en español que explique que `.env*` se excluye por ser credenciales locales según `.gitignore`

### Tarea 15: Agregar los scripts `container:build` y `container:run`

- **Archivos**: `log-atm-web-astro/package.json`
- **Qué hacer**: agregar los dos scripts con el valor exacto de la tabla «Scripts npm» del diseño: `podman build -t log-atm-web -f Containerfile .` y `podman run --rm --init -p 4321:4321 -v "$PWD/.dev.vars:/app/dist/server/.dev.vars:ro" log-atm-web` (comillas internas escapadas como `\"` en JSON). Sin compose, sin script `deploy`, sin variantes.
- **Criterio de completado**: `package.json` es JSON válido; `npm run` lista ambos scripts con esos valores; `build` y los demás scripts no cambian.
- **Requiere**: Tarea 8 (ambas editan `package.json`)
- **Modo**: no TDD

- [x] Agregar `container:build` con el valor exacto del contrato
- [x] Agregar `container:run` con el valor exacto del contrato, con las comillas escapadas
- [x] Validar que `package.json` parsea como JSON (`node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"`)

### Tarea 16: Verificar la paridad del contenedor con producción

- **Archivos**: ninguno (evidencia por ejecución); `.dev.vars` de prueba solo en copia aislada o en un archivo temporal bajo el directorio de temporales
- **Qué hacer**: ejecutar los pasos 1, 4 y 7 de la «Estrategia de Testing → Contenedor» del diseño.
- **Criterio de completado**: `podman info --format '{{.Host.Security.Rootless}}'` → `true`; `npm run container:build` exit 0; con el contenedor en ejecución, `/`, `/en/`, `/pt/` → 200 en `127.0.0.1:4321` y `localhost:4321`; `/no-existe`, `/en/no-existe`, `/pt/no-existe` → 404 con la página de «no encontrado» (no la portada); `POST /api/contacto` con cuerpo inválido → 400 `application/json`; sin contenedores, imágenes de prueba ni puertos abiertos al terminar.
- **Requiere**: Tarea 13, Tarea 14, Tarea 15
- **Modo**: no TDD

- [x] Ejecutar `podman info --format '{{.Host.Security.Rootless}}'` y confirmar `true`
- [x] Ejecutar `npm run container:build` y confirmar exit 0
- [x] Preparar un `.dev.vars` de prueba y ejecutar `npm run container:run` desde un subdirectorio (p. ej. `src/`) para probar la ruta absoluta
- [x] Ejecutar `curl` a `/`, `/en/`, `/pt/` en `127.0.0.1:4321` y en `localhost:4321` y confirmar 200
- [x] Ejecutar `curl` a `/no-existe`, `/en/no-existe`, `/pt/no-existe` y confirmar 404 con la página de «no encontrado»
- [x] Ejecutar `POST /api/contacto` con cuerpo inválido y confirmar 400 con `Content-Type: application/json`
- [x] Detener el contenedor y confirmar con `podman ps -a` y `ss -ltn` que no quedan contenedores ni el puerto 4321 abierto

---

## Spec: [[container-secrets-isolation]] — Aislamiento de credenciales en el contenedor

### Tarea 17: Verificar el aislamiento de secretos

- **Archivos**: ninguno (evidencia por ejecución; fixture en copia aislada con `.dev.vars` falso)
- **Qué hacer**: ejecutar los pasos 2, 3, 4 (segunda parte), 5 y 7 de la «Estrategia de Testing → Contenedor»: en una copia aislada, crear un `.dev.vars` falso con `SMTP_HOST=127.0.0.1`, `SMTP_PORT=1`, `SMTP_PASS=FAKE_SECRET_<aleatorio>`, construir la imagen con ese archivo presente y barrerla.
- **Criterio de completado**: `podman history --no-trunc`, `podman inspect` y `podman run --rm --entrypoint grep <img> -rl FAKE_SECRET_<aleatorio> / --exclude-dir=proc --exclude-dir=sys --exclude-dir=dev` → 0 coincidencias; con el archivo montado `:ro`, un `POST /api/contacto` válido muestra en el log un intento de conexión a `127.0.0.1:1` y no `Missing env var: SMTP_PASS`; sin `.dev.vars`, `npm run container:run` termina con exit distinto de cero y error `statfs`, y `podman ps -a` no muestra contenedor creado; imágenes y contenedores de prueba eliminados.
- **Requiere**: Tarea 16
- **Modo**: no TDD

- [x] Crear la copia aislada y el `.dev.vars` falso con el valor aleatorio `FAKE_SECRET_<aleatorio>`
- [x] Construir la imagen de prueba con el archivo presente en la copia
- [x] Barrer `podman history --no-trunc`, `podman inspect` y el sistema de archivos de la imagen y confirmar 0 coincidencias en los tres
- [x] Ejecutar el contenedor con el montaje `:ro`, enviar un `POST /api/contacto` válido y confirmar en el log el intento a `127.0.0.1:1` y la ausencia de `Missing env var: SMTP_PASS`
- [x] Sin `.dev.vars`, ejecutar `npm run container:run` y confirmar exit distinto de cero con error `statfs` y sin contenedor en `podman ps -a`
- [x] Eliminar imágenes y contenedores de prueba y el directorio temporal

---

## Spec: [[container-build-run-commands]] — Un comando para construir y otro para ejecutar

### Tarea 18: Verificar los comandos y el ciclo de reconstrucción

- **Archivos**: ninguno (evidencia por ejecución en copia aislada)
- **Qué hacer**: ejecutar el paso 6 de la «Estrategia de Testing → Contenedor» y confirmar los criterios de un comando por paso y de ruta absoluta.
- **Criterio de completado**: `npm run container:build` y `npm run container:run` son los dos únicos comandos necesarios; `container:run` invocado desde un subdirectorio localiza `.dev.vars` por su ruta absoluta; tras un cambio trivial, `npm run container:build` y una nueva ejecución responden 200 con el cambio visible, sin pasos manuales; sin contenedores, imágenes de prueba ni puertos abiertos al terminar.
- **Requiere**: Tarea 16, Tarea 17
- **Modo**: no TDD

- [x] En una copia aislada con `.dev.vars` de prueba, ejecutar `npm run container:build` y `npm run container:run` desde `src/` y confirmar 200 en `/`
- [x] Aplicar un cambio trivial visible en la copia (texto de la portada), ejecutar `npm run container:build` y `npm run container:run` y confirmar 200 con el cambio visible
- [x] Confirmar que la segunda ejecución no requirió limpiar contenedores previos (`--rm`)
- [x] Eliminar imágenes, contenedores y el directorio temporal; confirmar el puerto 4321 libre

---

## Spec: [[deployment-target-references]] — Menciones a Cloudflare Workers como destino

### Tarea 19: Reemplazar las menciones a Cloudflare Pages

- **Archivos**: `log-atm-web-astro/astro.config.mjs`, `log-atm-web-astro/.dev.vars.example`
- **Qué hacer**: en `astro.config.mjs` (comentario de la línea 14) reemplazar «Cloudflare Pages build» por «(p. ej. el build alojado de Cloudflare Workers Builds)»; en `.dev.vars.example` (líneas 2-3) indicar que se copia a `.dev.vars` antes de `astro dev` o `npm run container:run` y que «En Cloudflare Workers (producción) estas variables se configuran en el dashboard del Worker» (D8). Solo comentarios, sin tocar valores.
- **Criterio de completado**: `grep -rn "Cloudflare Pages"` sobre `log-atm-web-astro/` (sin `node_modules`, `dist`) y sobre la raíz del repo (sin `memory/`, `.sdd/`) → 0 resultados; ambos archivos nombran Cloudflare Workers.
- **Requiere**: Tarea 9 (ambas editan `astro.config.mjs`)
- **Modo**: no TDD

- [x] Editar el comentario de `astro.config.mjs` con la redacción de D8
- [x] Editar los comentarios de las líneas 2-3 de `.dev.vars.example` con la redacción de D8
- [x] Ejecutar `grep -rn "Cloudflare Pages"` en los dos alcances y confirmar 0 resultados
- [x] Confirmar con `git diff` que `.dev.vars.example` conserva todas las claves y valores

---

## Spec: [[readme-deployment-and-local-container]] — README de despliegue y contenedor local

### Tarea 20: Documentar despliegue y contenedor local en el README

- **Archivos**: `log-atm-web-astro/README.md`
- **Qué hacer**: según D7: fila `Despliegue` → «Cloudflare Workers (producción) · Podman (local, opcional)»; sección *Despliegue* con la integración git de Workers Builds (cada push dispara un build, `main` es producción, `SMTP_PASS` como Secret del Worker y vars no secretas en `wrangler.toml`) sin comando de build/deploy, directorio raíz, nombre del Worker ni versión de Node; sección *Contenedor local (Podman, opcional)* con requisito Podman rootless, `cp .dev.vars.example .dev.vars` (sin el archivo la ejecución falla), `npm run container:build`, `npm run container:run`, `http://localhost:4321`, credencial montada en solo lectura y nunca en la imagen, imagen de ~866 MB aceptable para uso local opcional, y la nota WSL2 (desde Windows basta `localhost:4321`; para LAN o móvil, `networkingMode=mirrored` en `.wslconfig`); sección *Vista previa local* con la limitación de `npm run preview` (500 tras recompilar sin reiniciar) y que el contenedor la evita; reemplazar la sección «Con Docker». Retirar de *Estructura* las líneas de `Dockerfile` y `nginx.conf` y agregar `Containerfile`, `.containerignore` y `wrangler.toml`. Sin «Docker», «nginx», `docker compose`, «TODO» ni «a confirmar».
- **Criterio de completado**: cada criterio de la spec se cumple por lectura; `grep -niE "docker|nginx|TODO|a confirmar" README.md` → 0 resultados.
- **Requiere**: Tarea 15, Tarea 18
- **Modo**: no TDD (solo prosa)

- [x] Reemplazar la fila `Deploy` de la tabla de stack por `Despliegue` con el valor de la spec
- [x] Reemplazar la sección «Con Docker» por la sección del contenedor local con Podman y sus siete elementos
- [x] Agregar la sección de vista previa local con la limitación del 500 y la mención del contenedor
- [x] Agregar la sección de despliegue por Workers Builds, sin los datos del dashboard
- [x] Actualizar el bloque *Estructura* (sin `Dockerfile`/`nginx.conf`; con `Containerfile`, `.containerignore`, `wrangler.toml`)
- [x] Ejecutar `grep -niE "docker|nginx|TODO|a confirmar" README.md` y confirmar 0 resultados

---

## Spec: [[readme-project-accuracy]] — README fiel al proyecto

### Tarea 21: Corregir stack, comandos y verificaciones en el README

- **Archivos**: `log-atm-web-astro/README.md`
- **Qué hacer**: según D7: Framework `Astro 6` (mayor, con remisión a `package.json` como fuente única de la versión exacta); fila `Iconos` → Lucide (`@iconify-json/lucide`) con el componente local `Icon.astro`; fila `Imágenes` → Sharp (sin Potrace, sin `astro-icon`); tabla de comandos con `dev`, `build`, `preview`, `check`, `a11y`, `validate-i18n`, `check-i18n-links`, `measure:images`, `container:build`, `container:run`, cada uno con su finalidad; sección *Verificaciones* con `npm run check` (tipos, separado del build), `npm run a11y` (requiere build previo y un Chrome: `CHROME_PATH` o `./chrome` vía `npx @puppeteer/browsers install chrome@stable`; audita todas las páginas y las 404 en escritorio y móvil con movimiento reducido, porque el contraste relevante es el del estado final y no el de la animación de entrada), `measure:images` y `check-i18n-links`. Esta tarea cubre también la documentación que exigen [[a11y-audit-final-state-evaluation]] y [[a11y-audit-browser-portability]].
- **Criterio de completado**: el mayor de Astro del README coincide con el mayor del rango de `astro` en `package.json`; `grep -niE "potrace|astro-icon" README.md` → 0 resultados; los comandos documentados existen todos en `package.json`; el motivo del movimiento reducido y `CHROME_PATH` están documentados.
- **Requiere**: Tarea 20 (mismo archivo), Tarea 8, Tarea 3, Tarea 15
- **Modo**: no TDD (solo prosa)

- [x] Corregir las filas `Framework`, `Iconos` e `Imágenes` de la tabla de stack
- [x] Ampliar la tabla de comandos con los diez comandos y su finalidad
- [x] Agregar la sección *Verificaciones* con los cuatro comandos y el detalle de `npm run a11y`
- [x] Comparar el mayor de Astro del README con el rango de `astro` en `package.json`
- [x] Verificar que cada comando documentado existe como script en `package.json`
- [x] Ejecutar `grep -niE "potrace|astro-icon|docker|nginx|TODO|a confirmar" README.md` y confirmar 0 resultados

---

## Spec: [[static-server-container-removal]] — Retiro del camino Docker + nginx

### Tarea 22: Eliminar los cinco archivos del camino retirado

- **Archivos**: `log-atm-web-astro/Dockerfile`, `log-atm-web-astro/nginx.conf`, `log-atm-web-astro/default.conf`, `docker-compose.yml`, `fix-wsl2-port.bat`
- **Qué hacer**: eliminarlos del repo con `git rm` (D4).
- **Criterio de completado**: `git ls-files` no lista ninguno de los cinco.
- **Requiere**: Tarea 18, Tarea 21
- **Modo**: no TDD

- [x] Ejecutar `git -C <worktree> rm` sobre los cinco archivos
- [x] Confirmar con `git -C <worktree> ls-files` que ninguno figura

### Tarea 23: Verificar que ningún archivo referencia lo retirado

- **Archivos**: ninguno (evidencia por ejecución)
- **Qué hacer**: búsqueda de referencias sobre el árbol versionado excluyendo `memory/` y `.sdd/` (alcance de D4: `memory/` es el vault y sus specs declaran esos paths).
- **Criterio de completado**: `grep -rnIE "Dockerfile|nginx|default\.conf|docker-compose|docker compose|fix-wsl2-port|Cloudflare Pages"` sobre el repo excluyendo `memory/`, `.sdd/`, `node_modules/`, `dist/` y `package-lock.json` → 0 resultados.
- **Requiere**: Tarea 22, Tarea 19
- **Modo**: no TDD

- [x] Ejecutar la búsqueda de referencias con las exclusiones indicadas
- [x] Si hay resultados, corregir el archivo que referencia (no `memory/` ni `.sdd/`) y repetir hasta 0

---

## Spec: [[profile-verification-commands]] — Comandos de verificación en el perfil

### Tarea 24: Editar `## Build & Deploy` del perfil

- **Archivos**: `memory/_profile.md`
- **Qué hacer**: según D9, en `## Build & Deploy`: `Deploy Target` → Cloudflare Workers mediante Workers Builds (integración git); `Container` → `Containerfile` (Podman rootless, `node:22-slim`, `astro preview` con workerd), comandos `npm run container:build` / `npm run container:run`, sin Docker ni nginx; `Type-check` → `npm run check` (`astro check`), separado de `npm run build`; línea nueva `Verification Commands` con `npm run check`, `npm run a11y` (requiere `npm run build` y Chrome vía `CHROME_PATH` o `./chrome`), `npm run validate-i18n`, `npm run check-i18n-links`; `CI` → sin integración continua, las verificaciones las ejecuta quien desarrolla y `sdd-verify`; `updated:` del frontmatter a la fecha de edición. No tocar `## Pipeline SDD` ni el resto del perfil (la sección `## Stack` la edita la Tarea 11).
- **Criterio de completado**: los cuatro criterios de la spec se cumplen por lectura; el perfil no menciona Docker ni nginx como contenedor vigente.
- **Requiere**: Tarea 4, Tarea 8, Tarea 11, Tarea 15
- **Modo**: no TDD (solo prosa)

- [x] Reescribir las líneas `Deploy Target`, `Container (actual)` y `Type-check` de `## Build & Deploy`
- [x] Agregar la línea `Verification Commands` con los cuatro comandos y el requisito del `a11y`
- [x] Reescribir la línea `CI` con la declaración de ausencia de integración continua
- [x] Actualizar `updated:` del frontmatter
- [x] Verificar contra los cuatro criterios de la spec y con `git diff` que solo cambió `## Build & Deploy` y el frontmatter respecto de la Tarea 11
