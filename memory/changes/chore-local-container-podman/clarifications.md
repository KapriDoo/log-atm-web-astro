## Iteración 1 — Preguntas (2026-10-06)

Cada pregunta trae la recomendación por defecto que aplica la propuesta si no hay respuesta.

1. ¿Qué comando de build y qué comando de deploy tiene configurados Workers Builds para el Worker `log-atm-web`? Si el build es `npm run build`, encadenar `astro check` ahí bloquearía el despliegue a producción ante un error de tipos.
   **Default**: suponer `npm run build` + `npx wrangler deploy`; `npm run check` queda separado del build y el README marca estos comandos como "a confirmar en el dashboard".
2. ¿Qué directorio raíz tiene configurado Workers Builds (la app vive en `log-atm-web-astro/` dentro del repo)?
   **Default**: documentar `log-atm-web-astro/` como directorio raíz, marcado "a confirmar".
3. ¿Cómo se concilia el nombre `log-atm-web-astro` del `dist/server/wrangler.json` generado con el Worker `log-atm-web` del dashboard (override en el comando de deploy, o se acepta tal cual)?
   **Default**: documentar la discrepancia como observada, sin cambiar `package.json` ni `wrangler.toml`.
4. ¿Qué versión de Node usa el entorno de build de Workers Builds?
   **Default**: documentar `>=22.12.0` (campo `engines`) y alinear el contenedor a `node:22-slim`.
5. `docker-compose.yml` (raíz del repo) depende de `Dockerfile` y del puerto 80 de nginx: ¿se elimina? (Nota: el brief indicaba que no existía compose; sí existe y es el que cita `README.md:62`.)
   **Default**: eliminarlo; Podman con un solo servicio no necesita compose (KISS).
6. `fix-wsl2-port.bat` (raíz del repo) configura `netsh portproxy` hacia WSL2 en el puerto 4321 y fija la distro `Ubuntu` (el entorno actual es `arch-wsl`): ¿se conserva (parametrizando la distro y documentándolo) o se retira?
   **Default**: retirarlo; no lo menciona ningún documento, no funciona con la distro actual y no se pudo demostrar que siga haciendo falta con Podman rootless (YAGNI).
7. Para inyectar `SMTP_PASS` en el contenedor, `--env-file .dev.vars` (criterio del brief) no basta: las variables de proceso no llegan como bindings. ¿Se acepta montar el archivo (`-v ./.dev.vars:/app/dist/server/.dev.vars:ro`) y ajustar el criterio de aceptación?
   **Default**: sí, montaje de solo lectura; la alternativa `--env-file` + `CLOUDFLARE_INCLUDE_PROCESS_ENV=true` expone todo el entorno del proceso como bindings y no respeta comillas en los valores.

## Iteración 1 — Respuestas (2026-10-06)

Decisión del usuario: **[A] Aprobar**, incorporando las notas de la sesión consultora (`bigger-consultor`), que no cambian el alcance y se llevan a spec/design.

- **P1–P4 (datos del dashboard)**: el usuario no los tiene ahora. **No** se escriben como "a confirmar"/TODO en el README: quedan como **residual explícito del PR** (comando de build y deploy, directorio raíz, nombre del Worker `log-atm-web` frente a `log-atm-web-astro` del `wrangler.json` generado —el más relevante: un `wrangler deploy` manual desplegaría a otro Worker— y versión de Node). El README documenta solo lo verificado: Workers Builds con integración git.
- **P5**: eliminar `docker-compose.yml` (forma parte del camino Docker+nginx que se retira).
- **P6**: retirar `fix-wsl2-port.bat` (roto: distro `Ubuntu` fija). Windows alcanza `localhost:4321` de WSL2 por `localhostForwarding`; el README agrega una línea: para acceso desde la LAN o el móvil, `networkingMode=mirrored` en `.wslconfig`.
- **P7**: se acepta el montaje `:ro` en vez de `--env-file` (ajusta el criterio del brief, cuya intención —el secreto nunca entra en la imagen— se mantiene). Para design: `container:run` usa la ruta absoluta `"$PWD/.dev.vars"`; el README documenta el prerequisito `cp .dev.vars.example .dev.vars` (sin el archivo, el bind mount falla).
- **Nota a (a11y)**: la lista de URLs se deriva de `dist/client` (o del sitemap), no fija. Hoy son unas 21: 7 rutas × es/en/pt, más las 404. Cubre viewport de escritorio y móvil. `reducedMotion: 'reduce'` por defecto se mantiene porque evalúa el estado final, que es el relevante para el contraste; el motivo se documenta.
- **Nota b (perfil)**: agregar `npm run check` y `npm run a11y` a los comandos de verificación de `memory/_profile.md`, para que `sdd-verify` los ejecute en cada cambio (no hay CI; `check` está separado del build).
- **Nota d (imagen)**: la imagen de unos 866 MB es aceptable para uso local opcional (multi-stage sería YAGNI); se menciona en el README.

## Para el MR

1. Datos del dashboard de Cloudflare sin confirmar (el README documenta solo lo verificado: Workers Builds con integración git): comando de build y comando de deploy configurados, directorio raíz de la app dentro del repositorio, y versión de Node del entorno de build.
2. Nombre del Worker: el dashboard usa `log-atm-web`, mientras el `wrangler.json` que genera el adapter usa `log-atm-web-astro`. Un `wrangler deploy` manual desplegaría a otro Worker; el despliegue vigente es por Workers Builds y este cambio no modifica `package.json` ni `wrangler.toml` al respecto.
3. `npm run check` queda separado del build: no se encadena hasta confirmar el comando de build de Workers Builds.
4. El criterio de secretos del brief (`--env-file`) se reemplaza por el montaje de solo lectura de `.dev.vars` en el contenedor: `--env-file` no crea bindings en workerd; la intención (el secreto nunca entra en la imagen) se mantiene.
5. Versiones probadas: Podman 6.1.2 rootless, `node:22-slim`, Astro 6.3.1, `@astrojs/cloudflare` 13.5.0, `typescript@^6`.
6. Eliminados: `Dockerfile`, `nginx.conf`, `default.conf`, `docker-compose.yml` y `fix-wsl2-port.bat`; el contenedor local pasa de servir estáticos con nginx a ejecutar workerd (con API y 404 reales).
7. Imagen local de unos 866 MB (incluye devDependencies), aceptada para uso opcional.
