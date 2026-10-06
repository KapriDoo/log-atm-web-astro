---
verdict: PASS
---

# Verify Report: chore-local-container-podman

**Fecha**: 2026-10-06

Las cifras y salidas de comandos viven en los bloques de `## Evidencia de comandos` (ids `verify-report.N`); esta sección los cita e interpreta. Todas las pruebas de mutación (error de tipos, bajo contraste, página nueva, aria-label retirados, sin navegador, sin `dist/`, credencial canary) se hicieron en copias aisladas (`git archive` de HEAD) bajo el directorio de temporales del despacho; el worktree no recibió código de prueba. Cada criterio se verificó con evidencia propia, incluidos los del brief original ajustados por `clarifications.md` (el montaje `:ro` de `.dev.vars` reemplaza a `--env-file`).

## Resultados por Spec

### Contenedor local que se comporta como producción ([[container-production-parity]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Portada 200 en es/en/pt por 127.0.0.1 y `localhost` | ✅ | `verify-report.17` (también `[::1]`); imagen reconstruida sin caché en `verify-report.13` |
| Ruta inexistente es/en/pt → 404 y no la portada | ✅ | `verify-report.17`: títulos «no encontrado» localizados, distintos del título de portada |
| Contacto inválido → validación estructurada, no HTML | ✅ | `verify-report.17`: JSON `validation`, `content-type: application/json` |
| Sin privilegios de administrador | ✅ | `verify-report.12` y `verify-report.17`: Podman rootless, usuario `kapridoo` |

**Scenarios verificados**: 4/4. Node de la imagen alineado con `engines` (`verify-report.20`).

### Credenciales fuera de la imagen ([[container-secrets-isolation]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Build con `.dev.vars` canary presente no deja el valor en historial, metadatos ni sistema de archivos | ✅ | `verify-report.12` (contexto con el archivo) y `verify-report.13` (sin caché); `verify-report.15` con control positivo y barrido de capas y blobs OCI sin coincidencias. El bloque `verify-report.14` rotula erróneamente un exit de `head`; la conclusión vigente es la de `verify-report.15` |
| Con el archivo montado `:ro` el servicio recibe la credencial | ✅ | `verify-report.17` (montaje `rw=false`), `verify-report.18` y `verify-report.19`: un SMTP falso dentro del contenedor recibe `AUTH PLAIN` con el usuario y la contraseña canary |
| Sin el archivo local falla visiblemente y no deja sitio | ✅ | `verify-report.16`: error visible de montaje, sin contenedor ni puerto ocupado |

**Scenarios verificados**: 3/3.

### Comandos de construcción y ejecución ([[container-build-run-commands]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Un comando construye y otro ejecuta y publica 4321 | ✅ | `verify-report.12` (`npm run container:build`), `verify-report.17` (`npm run container:run`) |
| El archivo de credenciales se localiza sin depender del directorio de invocación | ✅ | `verify-report.17`: ejecutado desde `src/`; npm fija el cwd en la raíz del paquete y monta la ruta absoluta |
| Tras reconstruir y ejecutar, el sitio responde sin pasos manuales | ✅ | `verify-report.13` (reconstrucción sin caché) seguido de `verify-report.17` |

**Scenarios verificados**: 2/2.

### Retiro del servidor estático ([[static-server-container-removal]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Sin definición de imagen, servidor estático ni orquestación que sirva estáticos | ✅ | `verify-report.2`: solo `Containerfile` y `.containerignore` |
| Sin el script de redirección de puertos de Windows | ✅ | `verify-report.2` |
| Sin referencias a lo retirado | ✅ | `verify-report.2`: las únicas coincidencias son el host del registro `docker.io` en el `FROM` y `is-docker` transitivo en el lockfile, ninguna referencia a los archivos retirados |

**Scenarios verificados**: 2/2.

### README de despliegue y contenedor ([[readme-deployment-and-local-container]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Destino «Cloudflare Workers (producción) · Podman (local, opcional)» y Workers Builds | ✅ | `verify-report.3` |
| Comandos, prerequisito `cp .dev.vars.example` y aviso del tamaño | ✅ | `verify-report.3`; el tamaño medido de la imagen figura en `verify-report.12` y `verify-report.13`, coherente con el aviso del README |
| Limitación del 500 de la vista previa y que el contenedor la evita | ✅ | `verify-report.3` |
| Acceso desde LAN/móvil en WSL2 (`networkingMode=mirrored`) | ✅ | `verify-report.3` |
| Sin datos del dashboard pendientes ni marcadores de tarea | ✅ | `verify-report.3`: búsqueda de `TODO`, `a confirmar`, `pendiente`, `dashboard` sin resultados |
| Sin Docker, nginx ni `docker compose` | ✅ | `verify-report.3` y `verify-report.2` |

**Scenarios verificados**: 4/4.

### README exacto ([[readme-project-accuracy]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Comandos de tipos, a11y, imágenes y enlaces i18n documentados con su finalidad | ✅ | `verify-report.3` |
| Sin Potrace ni dependencias no usadas | ✅ | `verify-report.3` y `verify-report.4`; las entradas del stack existen en `package.json` |
| Versión de Astro coincide | ✅ | `verify-report.4`: el README declara la versión mayor y remite a `package.json`, que declara el mismo mayor |

**Scenarios verificados**: 2/2.

### Destino de despliegue en referencias ([[deployment-target-references]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Sin Cloudflare Pages en comentarios ni configuración | ✅ | `verify-report.2` |
| `.dev.vars.example` y `astro.config.mjs` nombran Workers | ✅ | `verify-report.2` |

**Scenarios verificados**: 2/2.

### Verificación de tipos sin errores ([[type-check-zero-errors]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Comando único de verificación de tipos | ✅ | `verify-report.5` (`npm run check`) |
| 0 errores sobre el repositorio | ✅ | `verify-report.5` |
| Los cuatro errores corregidos en origen, sin supresiones ni exclusiones | ✅ | Lectura del commit `69df563`: cambios en `astro.config.mjs`, `mailer.ts`, `gsap-ind-directory.ts` y una declaración ambient nueva; `tsconfig.json` sin cambios y sin `@ts-ignore`/`@ts-expect-error`; confirmado también por `verify-report.5` sobre 0 errores |
| Un error deliberado hace salir con código distinto de cero | ✅ | `verify-report.23`: reintroducción del bug original `reply`→`replyTo`, error con ubicación y exit 1 |
| Instalación limpia sin incompatibilidades de versión | ✅ | `verify-report.21` y `verify-report.22`: `npm ci` sin advertencias peer, `typescript` resuelto dentro del rango de la herramienta |

**Scenarios verificados**: 3/3.

### Verificación de tipos independiente del build ([[type-check-build-independence]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| `build` no ejecuta la verificación de tipos | ✅ | `verify-report.23` (script `astro build`) |
| Comando independiente | ✅ | `verify-report.5` |
| Build con error de tipos deliberado termina con éxito | ✅ | `verify-report.23` |

**Scenarios verificados**: 2/2.

### Auditoría a11y en navegador real ([[a11y-audit-real-browser-coverage]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Comando único en navegador real | ✅ | `verify-report.10` |
| Páginas derivadas del contenido compilado: tres idiomas más 404 | ✅ | `verify-report.10`, `verify-report.11` (páginas más sondas 404 por idioma); sin lista fija de rutas en el script (`verify-report.27`) |
| Escritorio y móvil | ✅ | `verify-report.11`: ambos tamaños en el informe |
| Exit distinto de cero ante violación y 0 cuando no hay ninguna | ✅ | exit 1 en `verify-report.10`, `verify-report.24`; exit 0 en `verify-report.25` (copia sin los dos `aria-label` defectuosos) |
| Informe con página, tamaño y elemento | ✅ | `verify-report.10`, `verify-report.24` |
| Detecta contraste | ✅ | `verify-report.24`: texto #bbb sobre #fff reportado como `color-contrast` con selector |
| Página nueva entra sin tocar la herramienta | ✅ | `verify-report.24`: `/prueba-nueva/` aparece en el resumen y el informe |
| Única herramienta de a11y del proyecto | ✅ | `verify-report.27`: sin `jsdom`, `pa11y`, Lighthouse ni otra |

**Scenarios verificados**: 4/4.

### Estado final en la auditoría ([[a11y-audit-final-state-evaluation]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| `reducedMotion: 'reduce'` por defecto | ✅ | `verify-report.27` (ambos contextos) |
| 0 violaciones de contraste en las portadas es/en/pt sobre el sitio vigente | ✅ | `verify-report.11`: ninguna línea `color-contrast`; las únicas líneas de portadas son de otra regla |
| La documentación explica el motivo | ✅ | `verify-report.3` (línea del estado final en el README) |

**Scenarios verificados**: 2/2.

### Portabilidad del navegador y dependencias ([[a11y-audit-browser-portability]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Ubicación vía variable de entorno | ✅ | `verify-report.10` (`CHROME_PATH`) |
| Sin navegador: error explicativo, exit ≠ 0 | ✅ | `verify-report.26` casos 1 y 2: exit 2 que nombra `CHROME_PATH` y el comando de instalación |
| Sin compilar: error que indica compilar | ✅ | `verify-report.26` caso 3 |
| Dependencias declaradas; instalación limpia basta | ✅ | `verify-report.21` y `verify-report.22`: la auditoría posterior (`verify-report.24`, `verify-report.25`) corrió sobre un `npm ci` limpio |

**Scenarios verificados**: 3/3.

### Perfil con comandos de verificación ([[profile-verification-commands]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| `check` y `a11y` entre los comandos de verificación | ✅ | `verify-report.27` |
| Verificación de tipos separada del build | ✅ | `verify-report.27` |
| Sin integración continua | ✅ | `verify-report.27` |
| Contenedor Podman y Workers como destino | ✅ | `verify-report.27` |

**Scenarios verificados**: 2/2.

### Fusión del registro de observaciones ([[observations-log-merge]])

| Criterion | Status | Notas |
|-----------|--------|-------|
| Dos ramas que agregan entradas se fusionan sin conflicto conservando ambas | ✅ | `verify-report.1` |
| La regla aplica solo a `observations.md` | ✅ | `verify-report.1` y `verify-report.27` (`unspecified` para el perfil y `state.md`); conflicto real en una spec en `verify-report.1` |
| La regla vive en el repositorio, sin configuración local | ✅ | `verify-report.1` (repo sin `merge.*` local y con configuración global/sistema anuladas); `.gitattributes` versionado en `verify-report.27` |

**Scenarios verificados**: 3/3.

### Tests

El proyecto no tiene framework de tests; la suite completa de verificación del perfil son `npm run check` (`verify-report.5`), `npm run validate-i18n` (`verify-report.7`), `npm run build` (`verify-report.8`), `npm run check-i18n-links` (`verify-report.9`; `verify-report.6` es una corrida previa sobre el `dist/` heredado) y `npm run a11y` (`verify-report.10`). Cuatro pasan con exit 0; `npm run a11y` termina con exit 1 por violaciones preexistentes de una regla que no es de contraste (ver Hallazgos), reproducidas en `verify-report.11`.

**Cobertura**: sin instrumento de cobertura en el proyecto.

## Criterios del brief original (`input.md` ajustado por `clarifications.md`)

| Criterio del brief | Status | Evidencia |
|---|---|---|
| `podman build` rootless funciona | ✅ | `verify-report.12`, `verify-report.13` |
| Contenedor sirve en 4321: `/`, `/en/`, `/pt/` → 200; POST inválido → 400 JSON; ruta inexistente → 404 | ✅ | `verify-report.17`; el `--env-file` del brief se reemplaza por el montaje `:ro` (P7 de `clarifications.md`) |
| Historial e inspección de la imagen sin `SMTP_PASS` ni contenido de `.dev.vars` | ✅ | `verify-report.14`, `verify-report.15` |
| Sin `nginx.conf`, `default.conf`, `Dockerfile`; README sin Docker/nginx | ✅ | `verify-report.2`, `verify-report.3` |
| README documenta Cloudflare vigente y Podman opcional | ✅ | `verify-report.3` |
| `npm run check` existe y termina con 0 errores | ✅ | `verify-report.5` |
| `npm run a11y` audita `dist/client` en navegador real, detecta contraste y termina con exit 0 o lista las violaciones existentes | ✅ | `verify-report.10`, `verify-report.24`, `verify-report.25` (lista las violaciones existentes) |
| `.gitattributes` con `memory/observations.md merge=union` versionado | ✅ | `verify-report.1`, `verify-report.27` |

## Hallazgos de Seguridad

Domain `migration`: sin análisis de vulnerabilidades obligatorio. Verificación de secretos realizada de todos modos: la credencial canary no aparece en historial, metadatos, capas ni blobs de la imagen (`verify-report.14`, `verify-report.15`), el montaje es de solo lectura (`verify-report.17`) y `.dev.vars` no existe en el worktree (`verify-report.31`). Sin hallazgos de seguridad.

## Hallazgos

1. **Cifra de tamaño de imagen en la spec desactualizada (corregida en su lugar).** `readme-deployment-and-local-container` fijaba «aproximadamente 866 MB», cifra de la exploración anterior a las devDependencies del cambio. La imagen reconstruida sin caché mide otra cosa (`verify-report.13`) y el README ya declara el valor medido; el criterio de aceptación (aviso del tamaño aproximado) se cumple. Por ser una spec del cambio en curso (`status: review`), el requisito se corrigió en su lugar a «aproximadamente 960 MB». `design.md` (D7) conserva la cifra anterior en su prosa; no es un artefacto que escriba esta fase.
2. **Violación preexistente `label-content-name-mismatch` (WCAG 2.5.3, serious)** en el enlace de marca (todas las URLs y tamaños) y en `#lang-trigger` (escritorio), reportada por la auditoría nueva (`verify-report.10`, `verify-report.11`). Es la única regla con violaciones; `color-contrast` no informa ninguna. `sdd-apply` la registró como `debt-candidate` en `memory/observations.md`. El brief admite este desenlace («o lista las violaciones existentes»); la corrección de sitio queda fuera del alcance del cambio. `verify-report.25` demuestra que, retirados los dos `aria-label` en una copia aislada, la auditoría termina con exit 0 y 0 violaciones.
3. **Bloques de `apply-evidence.md` que ya no calzan**: `apply-evidence.10` y `apply-evidence.11` (`verify-report.32`). Ambos son corridas de la auditoría cuya salida depende del instante (`apply-evidence.10` es anterior al commit `6e64c26`, que hizo esperar al servidor). Su conteo de «1 proceso» corresponde a la línea de comando del shell que los ejecutaba, no a un huérfano: `verify-report.33` lo demuestra con listado de procesos tras `SIGINT`. Ningún criterio se apoya en esos bloques.
4. **Bloques de este reporte superados por uno vigente**: `verify-report.14` (rotula mal un exit de `head`; vigente `verify-report.15`), `verify-report.17` (salida acotada a 40 líneas; la parte final está en `verify-report.18` y `verify-report.19`), `verify-report.21` (su paso final `npm ls` usó una variable no definida; vigente `verify-report.22`), `verify-report.28` (el script del grafo falló por un ADR sin campo `spec_refs`; vigentes `verify-report.29` y `verify-report.30`) y `verify-report.6` (corrida sobre el `dist/` heredado; vigente `verify-report.9`). `verify-report.34` no lista ningún bloque en `no_calzan` ni errores.
5. **Observación sobre documentación del dashboard**: sigue sin confirmarse el nombre del Worker (`log-atm-web` en el dashboard frente a `log-atm-web-astro` en el `wrangler.json` generado) y los datos de Workers Builds; por decisión de `clarifications.md` quedan como residual del MR y no en el README.

## Coherencia de Grafo de Specs

Recorrido sobre las 14 specs de `spec_refs` (`verify-report.29`, antes de corregir; `verify-report.30`, después). Sin FAIL: toda spec requerida en `depends_on` existe.

| Slug | Campo | Descripción |
|------|-------|-------------|
| 13 specs (todas las que declaran `depends_on`) | `depends_on` | La spec destino no declaraba `affects: [[slug]]` de la dependiente (WARN, metadata) |
| [[container-production-parity]] | `adrs` | `[[0007-not-found-page-on-demand-single]]` no declaraba `spec_refs: [[container-production-parity]]` (WARN, metadata) |

## Correcciones de Metadata

Aplicadas con la validación principal superada, de forma unívoca y solo en metadata:

- `affects` completado en [[container-production-parity]], [[container-secrets-isolation]], [[container-build-run-commands]], [[type-check-zero-errors]] y [[a11y-audit-real-browser-coverage]] con las specs dependientes que los declaran en `depends_on` (orden alfabético, sin duplicados).
- `spec_refs: [[container-production-parity]]` y `updated: "2026-10-06"` agregados al frontmatter de `memory/adrs/0007-not-found-page-on-demand-single.md`.
- `verified_at: "2026-10-06"` y criterios de aceptación marcados `[x]` (frontmatter y cuerpo) en las 14 specs.
- Corrección de contenido (no de grafo) en [[readme-deployment-and-local-container]]: la cifra del requisito de tamaño (ver Hallazgos, punto 1).

## Contraste de bases

Sin deltas `MODIFY` en `spec_refs`: no hay bases que contrastar.

## Acciones Requeridas

Ninguna para el archive. Residuales para el MR: (a) la deuda `label-content-name-mismatch` del encabezado, con `npm run a11y` en exit 1 sobre el sitio vigente; (b) los datos del dashboard de Cloudflare sin confirmar y la discrepancia de nombre del Worker (`clarifications.md`, «Para el MR»); (c) `design.md` D7 conserva la cifra de tamaño anterior.

## Evidencia de comandos

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"archivo","argv":null,"texto":"set -u\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman\nR=$(mktemp -d \"$T/mergerepo.XXXXXXXX\")\ncd \"$R\" || exit 9\nexport GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null GIT_AUTHOR_NAME=t GIT_AUTHOR_EMAIL=t@t GIT_COMMITTER_NAME=t GIT_COMMITTER_EMAIL=t@t\ngit init -q -b main .\ngit -C \"$W\" show HEAD:.gitattributes \u003e .gitattributes\nmkdir -p memory/specs/x\nprintf 'a\\nb\\n' \u003e memory/observations.md\nprintf 'linea1\\nlinea2\\n' \u003e memory/specs/x/y.md\ngit add -A; git commit -q -m base\ngit checkout -q -b r1; printf 'entrada-r1\\n' \u003e\u003e memory/observations.md; git commit -qam r1\ngit checkout -q main; git checkout -q -b r2; printf 'entrada-r2\\n' \u003e\u003e memory/observations.md; git commit -qam r2\ngit checkout -q main; git merge -q r1 \u003e/dev/null; echo \"merge r1 -\u003e main exit=$?\"\ngit merge -q r2 -m m2 \u003e/dev/null; echo \"merge r2 -\u003e main (observations) exit=$?\"\necho \"--- observations.md tras fusion\"; cat memory/observations.md\ngit checkout -q -b s1 HEAD~0; sed -i 's/linea1/cambio-s1/' memory/specs/x/y.md; git commit -qam s1\ngit checkout -q main; git checkout -q -b s2; sed -i 's/linea1/cambio-s2/' memory/specs/x/y.md; git commit -qam s2\ngit checkout -q main; git merge -q s1 \u003e/dev/null; echo \"merge s1 -\u003e main exit=$?\"\ngit merge -q s2 -m m3 2\u003e&1 | head -3; echo \"merge s2 (spec misma linea) exit=${PIPESTATUS[0]}\"\ngit status --short\necho \"--- config local merge.*\"; git config --local --get-regexp '^merge\\.' ; echo \"exit config=$?\"\necho \"--- check-attr\"\ngit check-attr merge memory/observations.md memory/specs/x/y.md\ncd \"$T\" && rm -rf \"$R\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:16:42-03:00","exit":0,"sha256":"d500bfed77f898bb652d22049aa382ff4a6bd9e4539adfaf7d444ba4a3675202","lineas":18,"omitidas":0,"no_recomprobable":"fixture efimero en directorio de temporales; recrear no aporta"} -->
**Evidencia `verify-report.1`** · exit 0 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:16:42-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: fixture efimero en directorio de temporales; recrear no aporta

```bash
set -u
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman
R=$(mktemp -d "$T/mergerepo.XXXXXXXX")
cd "$R" || exit 9
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null GIT_AUTHOR_NAME=t GIT_AUTHOR_EMAIL=t@t GIT_COMMITTER_NAME=t GIT_COMMITTER_EMAIL=t@t
git init -q -b main .
git -C "$W" show HEAD:.gitattributes > .gitattributes
mkdir -p memory/specs/x
printf 'a\nb\n' > memory/observations.md
printf 'linea1\nlinea2\n' > memory/specs/x/y.md
git add -A; git commit -q -m base
git checkout -q -b r1; printf 'entrada-r1\n' >> memory/observations.md; git commit -qam r1
git checkout -q main; git checkout -q -b r2; printf 'entrada-r2\n' >> memory/observations.md; git commit -qam r2
git checkout -q main; git merge -q r1 >/dev/null; echo "merge r1 -> main exit=$?"
git merge -q r2 -m m2 >/dev/null; echo "merge r2 -> main (observations) exit=$?"
echo "--- observations.md tras fusion"; cat memory/observations.md
git checkout -q -b s1 HEAD~0; sed -i 's/linea1/cambio-s1/' memory/specs/x/y.md; git commit -qam s1
git checkout -q main; git checkout -q -b s2; sed -i 's/linea1/cambio-s2/' memory/specs/x/y.md; git commit -qam s2
git checkout -q main; git merge -q s1 >/dev/null; echo "merge s1 -> main exit=$?"
git merge -q s2 -m m3 2>&1 | head -3; echo "merge s2 (spec misma linea) exit=${PIPESTATUS[0]}"
git status --short
echo "--- config local merge.*"; git config --local --get-regexp '^merge\.' ; echo "exit config=$?"
echo "--- check-attr"
git check-attr merge memory/observations.md memory/specs/x/y.md
cd "$T" && rm -rf "$R"
```

```text
merge r1 -> main exit=0
merge r2 -> main (observations) exit=0
--- observations.md tras fusion
a
b
entrada-r1
entrada-r2
merge s1 -> main exit=0
Auto-merging memory/specs/x/y.md
CONFLICT (content): Merge conflict in memory/specs/x/y.md
Automatic merge failed; fix conflicts and then commit the result.
merge s2 (spec misma linea) exit=1
UU memory/specs/x/y.md
--- config local merge.*
exit config=1
--- check-attr
memory/observations.md: merge: union
memory/specs/x/y.md: merge: unspecified
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman || exit 9\necho \"--- archivos versionados retirados (esperado: ninguno)\"\ngit ls-files | /usr/bin/grep -Ei '(^|/)(Dockerfile|nginx\\.conf|default\\.conf|docker-compose[^/]*|fix-wsl2-port\\.bat|compose\\.ya?ml)$'; echo \"exit=$?  (1 = ninguno)\"\necho \"--- existencia en disco\"\nfor f in log-atm-web-astro/Dockerfile log-atm-web-astro/nginx.conf log-atm-web-astro/default.conf docker-compose.yml fix-wsl2-port.bat; do [ -e \"$f\" ] && echo \"EXISTE $f\" || echo \"ausente $f\"; done\necho \"--- definiciones de contenedor / orquestacion versionadas\"\ngit ls-files | /usr/bin/grep -Ei 'containerfile|dockerfile|compose|containerignore|dockerignore'\necho \"--- referencias a lo retirado en archivos versionados fuera de memory/ (excluye historial SDD)\"\ngit grep -nEi 'nginx|docker|fix-wsl2-port|default\\.conf|netsh' -- . ':!memory' ':!skills-lock.json' ':!.agents'; echo \"exit=$?  (1 = ninguna)\"\necho \"--- misma busqueda dentro de memory/specs y _profile.md (spec vigente, no historial)\"\ngit grep -nEi 'nginx|dockerfile|docker-compose|fix-wsl2-port' -- memory/_profile.md | head\necho \"--- Cloudflare Pages en comentarios/config (excluye memory/ y package-lock)\"\ngit grep -nEi 'cloudflare pages|pages\\.dev|wrangler pages' -- . ':!memory' ':!**/package-lock.json' ':!.agents'; echo \"exit=$?  (1 = ninguna)\"\necho \"--- .dev.vars.example y astro.config.mjs nombran Workers\"\ngit grep -nEi 'workers' -- log-atm-web-astro/.dev.vars.example log-atm-web-astro/astro.config.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:16:51-03:00","exit":0,"sha256":"6b802654fcf1f607ec820984a285d032a720b15f5ac0846eb7ed4c350d842166","lineas":29,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 29 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:16:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman || exit 9
echo "--- archivos versionados retirados (esperado: ninguno)"
git ls-files | /usr/bin/grep -Ei '(^|/)(Dockerfile|nginx\.conf|default\.conf|docker-compose[^/]*|fix-wsl2-port\.bat|compose\.ya?ml)$'; echo "exit=$?  (1 = ninguno)"
echo "--- existencia en disco"
for f in log-atm-web-astro/Dockerfile log-atm-web-astro/nginx.conf log-atm-web-astro/default.conf docker-compose.yml fix-wsl2-port.bat; do [ -e "$f" ] && echo "EXISTE $f" || echo "ausente $f"; done
echo "--- definiciones de contenedor / orquestacion versionadas"
git ls-files | /usr/bin/grep -Ei 'containerfile|dockerfile|compose|containerignore|dockerignore'
echo "--- referencias a lo retirado en archivos versionados fuera de memory/ (excluye historial SDD)"
git grep -nEi 'nginx|docker|fix-wsl2-port|default\.conf|netsh' -- . ':!memory' ':!skills-lock.json' ':!.agents'; echo "exit=$?  (1 = ninguna)"
echo "--- misma busqueda dentro de memory/specs y _profile.md (spec vigente, no historial)"
git grep -nEi 'nginx|dockerfile|docker-compose|fix-wsl2-port' -- memory/_profile.md | head
echo "--- Cloudflare Pages en comentarios/config (excluye memory/ y package-lock)"
git grep -nEi 'cloudflare pages|pages\.dev|wrangler pages' -- . ':!memory' ':!**/package-lock.json' ':!.agents'; echo "exit=$?  (1 = ninguna)"
echo "--- .dev.vars.example y astro.config.mjs nombran Workers"
git grep -nEi 'workers' -- log-atm-web-astro/.dev.vars.example log-atm-web-astro/astro.config.mjs
```

```text
--- archivos versionados retirados (esperado: ninguno)
exit=1  (1 = ninguno)
--- existencia en disco
ausente log-atm-web-astro/Dockerfile
ausente log-atm-web-astro/nginx.conf
ausente log-atm-web-astro/default.conf
ausente docker-compose.yml
ausente fix-wsl2-port.bat
--- definiciones de contenedor / orquestacion versionadas
log-atm-web-astro/.containerignore
log-atm-web-astro/Containerfile
--- referencias a lo retirado en archivos versionados fuera de memory/ (excluye historial SDD)
log-atm-web-astro/Containerfile:6:FROM docker.io/library/node:22-slim
log-atm-web-astro/package-lock.json:279:        "is-docker": "^4.0.0",
log-atm-web-astro/package-lock.json:4298:    "node_modules/is-docker": {
log-atm-web-astro/package-lock.json:4300:      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-4.0.0.tgz",
log-atm-web-astro/package-lock.json:4304:        "is-docker": "cli.js"
log-atm-web-astro/package-lock.json:4319:        "is-docker": "^3.0.0"
log-atm-web-astro/package-lock.json:4331:    "node_modules/is-inside-container/node_modules/is-docker": {
log-atm-web-astro/package-lock.json:4333:      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
log-atm-web-astro/package-lock.json:4337:        "is-docker": "cli.js"
exit=0  (1 = ninguna)
--- misma busqueda dentro de memory/specs y _profile.md (spec vigente, no historial)
--- Cloudflare Pages en comentarios/config (excluye memory/ y package-lock)
exit=1  (1 = ninguna)
--- .dev.vars.example y astro.config.mjs nombran Workers
log-atm-web-astro/.dev.vars.example:3:# En Cloudflare Workers (producción) estas variables se configuran en el dashboard del Worker.
log-atm-web-astro/astro.config.mjs:14: * entornos sin loader TS en runtime (p. ej. el build alojado de Cloudflare Workers Builds), donde
log-atm-web-astro/astro.config.mjs:86:      // ESM para que no se cargue el index.js (CJS) en el runtime de Workers.
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\nR=README.md\necho \"--- fila de despliegue\"; /usr/bin/grep -n 'Cloudflare Workers (producción) · Podman (local, opcional)' $R\necho \"--- Workers Builds\"; /usr/bin/grep -n 'Workers Builds' $R\necho \"--- comandos container y prerequisito .dev.vars.example\"; /usr/bin/grep -nE 'container:(build|run)|cp \\.dev\\.vars\\.example' $R\necho \"--- tamano imagen\"; /usr/bin/grep -nE '[0-9]+ ?MB' $R\necho \"--- error 500 / preview\"; /usr/bin/grep -nE '500|reiniciarla' $R\necho \"--- WSL2 mirrored\"; /usr/bin/grep -nE 'WSL2|mirrored' $R\necho \"--- prohibidos (esperado: ninguno)\"; /usr/bin/grep -niE 'docker|nginx|compose|potrace|TODO|a confirmar|pendiente|dashboard' $R; echo \"exit=$? (1 = ninguno)\"\necho \"--- comandos de verificacion documentados\"; /usr/bin/grep -nE 'npm run (check|a11y|measure:images|check-i18n-links)' $R\necho \"--- estado final / reduced motion\"; /usr/bin/grep -nE 'reduced-motion|estado final' $R\necho \"--- CHROME_PATH\"; /usr/bin/grep -n 'CHROME_PATH' $R\necho \"--- version Astro: README vs package.json\"; /usr/bin/grep -n 'Astro\\](https' $R; /usr/bin/grep -n '\"astro\":' package.json; node -p \"require('./node_modules/astro/package.json').version\"\necho \"--- dependencias declaradas del stack tabla (existen en package.json)\"; for d in react gsap motion tailwindcss sharp @fontsource/inter @fontsource/outfit @iconify-json/lucide @astrojs/cloudflare; do /usr/bin/grep -q \"\\\"$d\\\"\" package.json && echo \"ok $d\" || echo \"FALTA $d\"; done\necho \"--- Icon.astro existe\"; ls src/components/ui/Icon.astro src/components/**/Icon.astro 2\u003e&1 | head -2\necho \"--- tsconfig strict\"; cat tsconfig.json\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:11-03:00","exit":0,"sha256":"8e0e9b3570c632ba55ccfda2b4c7b399ca3cc9dc05739592d1c22457c6188061","lineas":62,"omitidas":22,"no_recomprobable":"ninguna: lectura estatica del README, idempotente"} -->
**Evidencia `verify-report.3`** · exit 0 · 62 líneas, 22 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:11-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`
No re-comprobable: ninguna: lectura estatica del README, idempotente

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
R=README.md
echo "--- fila de despliegue"; /usr/bin/grep -n 'Cloudflare Workers (producción) · Podman (local, opcional)' $R
echo "--- Workers Builds"; /usr/bin/grep -n 'Workers Builds' $R
echo "--- comandos container y prerequisito .dev.vars.example"; /usr/bin/grep -nE 'container:(build|run)|cp \.dev\.vars\.example' $R
echo "--- tamano imagen"; /usr/bin/grep -nE '[0-9]+ ?MB' $R
echo "--- error 500 / preview"; /usr/bin/grep -nE '500|reiniciarla' $R
echo "--- WSL2 mirrored"; /usr/bin/grep -nE 'WSL2|mirrored' $R
echo "--- prohibidos (esperado: ninguno)"; /usr/bin/grep -niE 'docker|nginx|compose|potrace|TODO|a confirmar|pendiente|dashboard' $R; echo "exit=$? (1 = ninguno)"
echo "--- comandos de verificacion documentados"; /usr/bin/grep -nE 'npm run (check|a11y|measure:images|check-i18n-links)' $R
echo "--- estado final / reduced motion"; /usr/bin/grep -nE 'reduced-motion|estado final' $R
echo "--- CHROME_PATH"; /usr/bin/grep -n 'CHROME_PATH' $R
echo "--- version Astro: README vs package.json"; /usr/bin/grep -n 'Astro\](https' $R; /usr/bin/grep -n '"astro":' package.json; node -p "require('./node_modules/astro/package.json').version"
echo "--- dependencias declaradas del stack tabla (existen en package.json)"; for d in react gsap motion tailwindcss sharp @fontsource/inter @fontsource/outfit @iconify-json/lucide @astrojs/cloudflare; do /usr/bin/grep -q "\"$d\"" package.json && echo "ok $d" || echo "FALTA $d"; done
echo "--- Icon.astro existe"; ls src/components/ui/Icon.astro src/components/**/Icon.astro 2>&1 | head -2
echo "--- tsconfig strict"; cat tsconfig.json
```

```text
--- fila de despliegue
40:| Despliegue | Cloudflare Workers (producción) · Podman (local, opcional) |
--- Workers Builds
121:Producción corre en Cloudflare Workers mediante la integración git de Workers Builds: cada push
--- comandos container y prerequisito .dev.vars.example
61:| `npm run container:build` | Construye la imagen del contenedor local (Podman) |
62:| `npm run container:run` | Ejecuta el contenedor local en `http://localhost:4321` |
103:cp .dev.vars.example .dev.vars   # completar las credenciales; sin este archivo la ejecución falla
104:npm run container:build          # construye la imagen log-atm-web
105:npm run container:run            # sirve el sitio en http://localhost:4321
110:- Tras cambiar el código, se vuelve a ejecutar `npm run container:build` y luego
111:  `npm run container:run`.
--- tamano imagen
80:  portada en escritorio y en móvil frente al presupuesto de 2 MB; se ejecuta en cada cambio que
112:- La imagen pesa alrededor de 960 MB; es un tamaño aceptable para un uso local y opcional.
--- error 500 / preview
88:compilar con la vista previa activa, responde con error 500 hasta reiniciarla: detenerla y
--- WSL2 mirrored
113:- WSL2: desde Windows basta abrir `http://localhost:4321`. Para abrir el sitio desde la red
114:  local o desde un móvil, se activa `networkingMode=mirrored` en el archivo `.wslconfig` de
--- prohibidos (esperado: ninguno)
exit=1 (1 = ninguno)
--- comandos de verificacion documentados
56:| `npm run check` | Verifica los tipos del sitio completo (`astro check`) |
57:| `npm run a11y` | Audita la accesibilidad del sitio compilado en un navegador real |
59:| `npm run check-i18n-links` | Busca en `dist/client` enlaces internos fuera del idioma de su página |
60:| `npm run measure:images` | Mide el peso de las imágenes de la portada frente a su presupuesto |
67:- **`npm run check`** — verificación de tipos con `astro check`. Es un comando separado del
70:- **`npm run a11y`** — auditoría de accesibilidad con axe-core (reglas WCAG 2.x A/AA) en un
79:- **`npm run measure:images`** — tras compilar, mide el peso de las imágenes que descarga la
82:- **`npm run check-i18n-links`** — tras compilar, detecta enlaces internos que apuntan a un
--- estado final / reduced motion
76:  Audita con movimiento reducido (`prefers-reduced-motion: reduce`) porque el contraste
77:  relevante es el del estado final de la página: las animaciones de entrada parten de textos
158:- **[CLAUDE.md](./CLAUDE.md)** — Identidad del proyecto, principios (KISS, YAGNI, DRY, SRP), reglas críticas (Lighthouse ≥ 95, WCAG AA, `prefers-reduced-motion`).
170:- **Accesibilidad** — WCAG AA mínimo, `prefers-reduced-motion` obligatorio en animaciones
--- CHROME_PATH
73:  `CHROME_PATH` o se instala en `./chrome` con `npx @puppeteer/browsers install chrome@stable`.
--- version Astro: README vs package.json
31:| Framework | [Astro](https://astro.build) 6 (versión exacta en `package.json`) |
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\necho \"--- version Astro: package.json y instalada\"; /usr/bin/grep -n '\"astro\":' package.json; node -p \"require('./node_modules/astro/package.json').version\"\necho \"--- dependencias del stack del README existen\"; for d in react gsap motion tailwindcss sharp @fontsource/inter @fontsource/outfit @iconify-json/lucide @astrojs/cloudflare; do /usr/bin/grep -q \"\\\"$d\\\"\" package.json && echo \"ok $d\" || echo \"FALTA $d\"; done\necho \"--- Icon.astro\"; find src -name 'Icon.astro'\necho \"--- tsconfig\"; cat tsconfig.json\necho \"--- potrace en package.json/scripts\"; /usr/bin/grep -rniE 'potrace' package.json scripts README.md; echo \"exit=$? (1 = ninguna)\"\necho \"--- jsdom en scripts/package.json\"; /usr/bin/grep -rniE 'jsdom' package.json scripts; echo \"exit=$? (1 = ninguna)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:17-03:00","exit":0,"sha256":"7a07311feb89e3c1aac9966b23a3d563a4753434ab0bb37748d4fa15d61dd580","lineas":26,"omitidas":0,"no_recomprobable":"ninguna: lectura estatica, idempotente"} -->
**Evidencia `verify-report.4`** · exit 0 · 26 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:17-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`
No re-comprobable: ninguna: lectura estatica, idempotente

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
echo "--- version Astro: package.json y instalada"; /usr/bin/grep -n '"astro":' package.json; node -p "require('./node_modules/astro/package.json').version"
echo "--- dependencias del stack del README existen"; for d in react gsap motion tailwindcss sharp @fontsource/inter @fontsource/outfit @iconify-json/lucide @astrojs/cloudflare; do /usr/bin/grep -q "\"$d\"" package.json && echo "ok $d" || echo "FALTA $d"; done
echo "--- Icon.astro"; find src -name 'Icon.astro'
echo "--- tsconfig"; cat tsconfig.json
echo "--- potrace en package.json/scripts"; /usr/bin/grep -rniE 'potrace' package.json scripts README.md; echo "exit=$? (1 = ninguna)"
echo "--- jsdom en scripts/package.json"; /usr/bin/grep -rniE 'jsdom' package.json scripts; echo "exit=$? (1 = ninguna)"
```

```text
--- version Astro: package.json y instalada
16:    "astro": "astro",
28:    "astro": "^6.1.5",
6.3.1
--- dependencias del stack del README existen
ok react
ok gsap
ok motion
ok tailwindcss
ok sharp
ok @fontsource/inter
ok @fontsource/outfit
ok @iconify-json/lucide
ok @astrojs/cloudflare
--- Icon.astro
src/components/ui/Icon.astro
--- tsconfig
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
--- potrace en package.json/scripts
exit=1 (1 = ninguna)
--- jsdom en scripts/package.json
exit=1 (1 = ninguna)
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:29-03:00","exit":0,"sha256":"93a2fce5aa597556c33b9d1e36760b6d198969057b2436706bd5daf001ae3cbc","lineas":13,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.5`** · exit 0 · 13 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

19:17:24 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
19:17:24 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
19:17:25 [types] Generated 1.30s
19:17:25 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:41-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.6`** · exit 0 · 5 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:47-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.7`** · exit 0 · 6 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:47-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:55-03:00","exit":0,"sha256":"80ad7ecb61ea63fefd7b645f149de576d073a658729c19d547b05f09204b6c7f","lineas":527,"omitidas":487,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.8`** · exit 0 · 527 líneas, 487 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

19:17:48 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
19:17:48 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
19:17:50 [types] Generated 1.34s
19:17:50 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
19:17:50 [build] output: "static"
19:17:50 [build] mode: "server"
19:17:50 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro/dist/
19:17:50 [build] adapter: @astrojs/cloudflare
19:17:50 [build] Collecting build info...
19:17:50 [build] ✓ Completed in 1.77s.
19:17:50 [build] Building server entrypoints...
19:17:52 [vite] ✓ built in 2.13s
19:17:54 [vite] ✓ built in 1.46s
19:17:55 [vite] ✓ built in 687ms

 prerendering static routes 
19:17:55   ├─ /contacto/index.html (+21ms) 
19:17:55   ├─ /cotizar/index.html (+11ms) 
19:17:55   ├─ /industrias/index.html (+20ms) 
19:17:55   ├─ /nosotros/index.html (+14ms) 
19:17:55   ├─ /servicios/index.html (+23ms) 
19:17:55   ├─ /en/contacto/index.html (+10ms) 
19:17:55   ├─ /pt/contacto/index.html (+10ms) 
19:17:55   ├─ /en/cotizar/index.html (+10ms) 
19:17:55   ├─ /pt/cotizar/index.html (+9ms) 
19:17:55   ├─ /en/industrias/index.html (+11ms) 
19:17:55   ├─ /pt/industrias/index.html (+12ms) 
19:17:55   ├─ /en/nosotros/index.html (+9ms) 
19:17:55   ├─ /pt/nosotros/index.html (+9ms) 
19:17:55   ├─ /en/servicios/index.html (+13ms) 
19:17:55   ├─ /pt/servicios/index.html (+13ms) 
19:17:55   ├─ /en/index.html (+15ms) 
19:17:55   ├─ /pt/index.html (+13ms) 
19:17:55   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:17:56-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.9`** · exit 0 · 5 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:17:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnpm run a11y 2\u003e&1 | tail -30\necho \"exit npm run a11y=${PIPESTATUS[0]}\"\necho \"--- procesos huerfanos tras la auditoria\"; pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo \"pgrep exit=$? (1 = ninguno)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:18:23-03:00","exit":0,"sha256":"4a5cc779404e64f6f79f7c74cb550e799ab9b5fe8760c0f24451e033525b03c5","lineas":33,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.10`** · exit 0 · 33 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:18:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
npm run a11y 2>&1 | tail -30
echo "exit npm run a11y=${PIPESTATUS[0]}"
echo "--- procesos huerfanos tras la auditoria"; pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo "pgrep exit=$? (1 = ninguno)"
```

```text
[escritorio] /servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[móvil] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /en/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /en/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /en/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /en/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /en/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /pt/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /pt/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /pt/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /pt/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /pt/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[móvil] /servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /en/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /pt/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
exit npm run a11y=1
--- procesos huerfanos tras la auditoria
pgrep exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nOUT=$(mktemp)\nnpm run a11y \u003e \"$OUT\" 2\u003e&1; echo \"exit npm run a11y=$?\"\necho \"--- violaciones por regla\"; /usr/bin/grep -oE '^\\[(escritorio|móvil)\\] [^ ]+ [a-z0-9-]+' \"$OUT\" | awk '{print $3}' | sort | uniq -c\necho \"--- lineas con color-contrast\"; /usr/bin/grep -c 'color-contrast' \"$OUT\"\necho \"--- violaciones por viewport\"; /usr/bin/grep -oE '^\\[(escritorio|móvil)\\]' \"$OUT\" | sort | uniq -c\necho \"--- portadas (/, /en/, /pt/)\"; /usr/bin/grep -E '^\\[[^]]+\\] (/|/en/|/pt/) ' \"$OUT\" | cut -c1-110\necho \"--- resumen\"; /usr/bin/grep 'Resumen' \"$OUT\"\nrm -f \"$OUT\"\npgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo \"procesos huerfanos pgrep exit=$? (1 = ninguno)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:18:56-03:00","exit":0,"sha256":"c0b47271d2ed2a041cd3c24e2a4de4a0dcb01968ad5e228474e0d4f48ae4981c","lineas":21,"omitidas":0,"no_recomprobable":"segunda corrida de la auditoria solo para resumir por regla; la salida es la de verify-report.10"} -->
**Evidencia `verify-report.11`** · exit 0 · 21 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:18:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: segunda corrida de la auditoria solo para resumir por regla; la salida es la de verify-report.10

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
OUT=$(mktemp)
npm run a11y > "$OUT" 2>&1; echo "exit npm run a11y=$?"
echo "--- violaciones por regla"; /usr/bin/grep -oE '^\[(escritorio|móvil)\] [^ ]+ [a-z0-9-]+' "$OUT" | awk '{print $3}' | sort | uniq -c
echo "--- lineas con color-contrast"; /usr/bin/grep -c 'color-contrast' "$OUT"
echo "--- violaciones por viewport"; /usr/bin/grep -oE '^\[(escritorio|móvil)\]' "$OUT" | sort | uniq -c
echo "--- portadas (/, /en/, /pt/)"; /usr/bin/grep -E '^\[[^]]+\] (/|/en/|/pt/) ' "$OUT" | cut -c1-110
echo "--- resumen"; /usr/bin/grep 'Resumen' "$OUT"
rm -f "$OUT"
pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo "procesos huerfanos pgrep exit=$? (1 = ninguno)"
```

```text
exit npm run a11y=1
--- violaciones por regla
     63 label-content-name-mismatch
--- lineas con color-contrast
0
--- violaciones por viewport
     42 [escritorio]
     21 [móvil]
--- portadas (/, /en/, /pt/)
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their ac
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their ac
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their
[móvil] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessi
[móvil] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their acce
[móvil] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their acce
--- resumen
Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
procesos huerfanos pgrep exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\necho \"--- usuario: $(id -un) uid=$(id -u) (no root); podman rootless: $(podman info --format '{{.Host.Security.Rootless}}')\"\necho \"--- .dev.vars canary presente en el contexto: $(ls .dev.vars)\"\nOUT=$(mktemp)\nnpm run container:build \u003e \"$OUT\" 2\u003e&1; RC=$?\nhead -8 \"$OUT\"; echo \"[...]\"; tail -6 \"$OUT\"\nrm -f \"$OUT\"\necho \"exit npm run container:build=$RC\"\npodman images --format '{{.Repository}}:{{.Tag}} {{.Size}} {{.VirtualSize}}' log-atm-web\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:19:26-03:00","exit":0,"sha256":"f65f4c7c22f42e043c2427451f143209baa9e250af8c9670759c68cb53d88082","lineas":19,"omitidas":0,"no_recomprobable":"la construccion con la credencial canary corre una sola vez"} -->
**Evidencia `verify-report.12`** · exit 0 · 19 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:19:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: la construccion con la credencial canary corre una sola vez

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
echo "--- usuario: $(id -un) uid=$(id -u) (no root); podman rootless: $(podman info --format '{{.Host.Security.Rootless}}')"
echo "--- .dev.vars canary presente en el contexto: $(ls .dev.vars)"
OUT=$(mktemp)
npm run container:build > "$OUT" 2>&1; RC=$?
head -8 "$OUT"; echo "[...]"; tail -6 "$OUT"
rm -f "$OUT"
echo "exit npm run container:build=$RC"
podman images --format '{{.Repository}}:{{.Tag}} {{.Size}} {{.VirtualSize}}' log-atm-web
```

```text
--- usuario: kapridoo uid=1000 (no root); podman rootless: true
--- .dev.vars canary presente en el contexto: .dev.vars

> log-atm-web-astro@0.0.1 container:build
> podman build -t log-atm-web -f Containerfile .

STEP 1/8: FROM docker.io/library/node:22-slim
STEP 2/8: WORKDIR /app
--> Using cache 031d6cce642e449a5eca50881a339b3ea77485d5437340a4da6d959dc6868940
--> 031d6cce642e
[...]
STEP 8/8: CMD ["/app/node_modules/.bin/astro", "preview", "--host", "::", "--port", "4321"]
--> Using cache 41f36f67ee6cf118a259c512429dc599d7a015788314e096d44134552ff3c7cd
COMMIT log-atm-web
--> 41f36f67ee6c
Successfully tagged localhost/log-atm-web:latest
41f36f67ee6cf118a259c512429dc599d7a015788314e096d44134552ff3c7cd
exit npm run container:build=0
localhost/log-atm-web:latest 964 MB 964243895
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\nOUT=$(mktemp)\npodman build --no-cache -t log-atm-web -f Containerfile . \u003e \"$OUT\" 2\u003e&1; RC=$?\n/usr/bin/grep -E '^STEP|Successfully|added [0-9]+ packages|built in|Complete|error|Error' \"$OUT\" | head -30\nrm -f \"$OUT\"\necho \"exit podman build --no-cache=$RC\"\npodman images --format '{{.Repository}}:{{.Tag}} {{.ID}} {{.Size}}' log-atm-web\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:21:42-03:00","exit":0,"sha256":"251b0185d95e5c67857b3d6a1cfe5c77d803a78f21a10165a927a88687fec9b8","lineas":21,"omitidas":0,"no_recomprobable":"construccion sin cache de una sola vez; consume minutos de red"} -->
**Evidencia `verify-report.13`** · exit 0 · 21 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:21:42-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: construccion sin cache de una sola vez; consume minutos de red

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
OUT=$(mktemp)
podman build --no-cache -t log-atm-web -f Containerfile . > "$OUT" 2>&1; RC=$?
/usr/bin/grep -E '^STEP|Successfully|added [0-9]+ packages|built in|Complete|error|Error' "$OUT" | head -30
rm -f "$OUT"
echo "exit podman build --no-cache=$RC"
podman images --format '{{.Repository}}:{{.Tag}} {{.ID}} {{.Size}}' log-atm-web
```

```text
STEP 1/8: FROM docker.io/library/node:22-slim
STEP 2/8: WORKDIR /app
STEP 3/8: COPY package.json package-lock.json ./
STEP 4/8: RUN npm ci
added 448 packages, and audited 449 packages in 14s
STEP 5/8: COPY . .
STEP 6/8: RUN npm run build
22:20:04 [build] ✓ Completed in 2.90s.
22:20:06 [vite] ✓ built in 2.26s
22:20:08 [vite] ✓ built in 1.55s
22:20:09 [vite] ✓ built in 735ms
22:20:09 ✓ Completed in 644ms.
22:21:40 ✓ Completed in 90.17s.
22:21:40 [build] ✓ Completed in 95.45s.
22:21:40 [build] Server built in 98.36s
22:21:40 [build] Complete!
STEP 7/8: EXPOSE 4321
STEP 8/8: CMD ["/app/node_modules/.bin/astro", "preview", "--host", "::", "--port", "4321"]
Successfully tagged localhost/log-atm-web:latest
exit podman build --no-cache=0
localhost/log-atm-web:latest fe950e37a3c4 964 MB
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nD=$(mktemp -d \"$T/imgsave.XXXXXXXX\")\necho \"--- history --no-trunc: ocurrencias de canary / SMTP_PASS / .dev.vars\"\npodman history --no-trunc log-atm-web \u003e \"$D/history.txt\"; /usr/bin/grep -ciE 'CANARY|s3cr3t|SMTP_PASS|\\.dev\\.vars' \"$D/history.txt\"\npodman history --no-trunc log-atm-web | /usr/bin/grep -iE 'dev\\.vars|SMTP' ; echo \"(grep exit=$?)\"\necho \"--- inspect: ocurrencias\"; podman inspect log-atm-web \u003e \"$D/inspect.json\"; /usr/bin/grep -ciE 'CANARY|s3cr3t|SMTP_PASS|dev\\.vars' \"$D/inspect.json\"\necho \"--- contenido de capas (podman save + extraccion): busqueda del valor canary\"\npodman save --format oci-dir -o \"$D/oci\" log-atm-web \u003e/dev/null 2\u003e&1 || podman save -o \"$D/img.tar\" log-atm-web\nmkdir -p \"$D/x\"; [ -d \"$D/oci\" ] && for b in \"$D\"/oci/blobs/sha256/*; do tar -xf \"$b\" -C \"$D/x\" 2\u003e/dev/null; done\n[ -f \"$D/img.tar\" ] && tar -xf \"$D/img.tar\" -C \"$D/x\" && for b in \"$D\"/x/*.tar; do [ -f \"$b\" ] && tar -xf \"$b\" -C \"$D/x\" 2\u003e/dev/null; done\necho \"archivos extraidos: $(find \"$D/x\" -type f | wc -l)\"\n/usr/bin/grep -rIl 'CANARY-s3cr3t-7f3a9c21' \"$D/x\" | head; echo \"grep canary en capas exit=$? (1 = no encontrado)\"\necho \"archivos llamados .dev.vars en la imagen:\"; find \"$D/x\" -name '.dev.vars' | head; echo \"(find: lineas arriba; vacio = ninguno)\"\necho \".dev.vars.example en la imagen (esperado: puede existir, sin valores reales):\"; find \"$D/x\" -name '.dev.vars.example' | head -3\necho \"--- dentro de la imagen sin montar nada\"\npodman run --rm --entrypoint /bin/sh log-atm-web -c 'ls -la /app/.dev.vars /app/dist/server/.dev.vars 2\u003e&1; env | /usr/bin/grep -ci \"smtp\\|canary\" ; ls -a /app | head -30'\ncd \"$T\" && rm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:22:00-03:00","exit":0,"sha256":"746ccc01b1b1ec3b07a13a5285597068a47be2df912dd9f0f98c308cd51169b0","lineas":39,"omitidas":0,"no_recomprobable":"inspeccion de imagen una sola vez; escribe y borra temporales"} -->
**Evidencia `verify-report.14`** · exit 0 · 39 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:22:00-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: inspeccion de imagen una sola vez; escribe y borra temporales

```bash
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
D=$(mktemp -d "$T/imgsave.XXXXXXXX")
echo "--- history --no-trunc: ocurrencias de canary / SMTP_PASS / .dev.vars"
podman history --no-trunc log-atm-web > "$D/history.txt"; /usr/bin/grep -ciE 'CANARY|s3cr3t|SMTP_PASS|\.dev\.vars' "$D/history.txt"
podman history --no-trunc log-atm-web | /usr/bin/grep -iE 'dev\.vars|SMTP' ; echo "(grep exit=$?)"
echo "--- inspect: ocurrencias"; podman inspect log-atm-web > "$D/inspect.json"; /usr/bin/grep -ciE 'CANARY|s3cr3t|SMTP_PASS|dev\.vars' "$D/inspect.json"
echo "--- contenido de capas (podman save + extraccion): busqueda del valor canary"
podman save --format oci-dir -o "$D/oci" log-atm-web >/dev/null 2>&1 || podman save -o "$D/img.tar" log-atm-web
mkdir -p "$D/x"; [ -d "$D/oci" ] && for b in "$D"/oci/blobs/sha256/*; do tar -xf "$b" -C "$D/x" 2>/dev/null; done
[ -f "$D/img.tar" ] && tar -xf "$D/img.tar" -C "$D/x" && for b in "$D"/x/*.tar; do [ -f "$b" ] && tar -xf "$b" -C "$D/x" 2>/dev/null; done
echo "archivos extraidos: $(find "$D/x" -type f | wc -l)"
/usr/bin/grep -rIl 'CANARY-s3cr3t-7f3a9c21' "$D/x" | head; echo "grep canary en capas exit=$? (1 = no encontrado)"
echo "archivos llamados .dev.vars en la imagen:"; find "$D/x" -name '.dev.vars' | head; echo "(find: lineas arriba; vacio = ninguno)"
echo ".dev.vars.example en la imagen (esperado: puede existir, sin valores reales):"; find "$D/x" -name '.dev.vars.example' | head -3
echo "--- dentro de la imagen sin montar nada"
podman run --rm --entrypoint /bin/sh log-atm-web -c 'ls -la /app/.dev.vars /app/dist/server/.dev.vars 2>&1; env | /usr/bin/grep -ci "smtp\|canary" ; ls -a /app | head -30'
cd "$T" && rm -rf "$D"
```

```text
--- history --no-trunc: ocurrencias de canary / SMTP_PASS / .dev.vars
0
(grep exit=1)
--- inspect: ocurrencias
0
--- contenido de capas (podman save + extraccion): busqueda del valor canary
archivos extraidos: 29197
grep canary en capas exit=0 (1 = no encontrado)
archivos llamados .dev.vars en la imagen:
(find: lineas arriba; vacio = ninguno)
.dev.vars.example en la imagen (esperado: puede existir, sin valores reales):
/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/imgsave.eHDvDIHv/x/app/.dev.vars.example
--- dentro de la imagen sin montar nada
ls: cannot access '/app/.dev.vars': No such file or directory
ls: cannot access '/app/dist/server/.dev.vars': No such file or directory
0
.
..
.astro
.containerignore
.dev.vars.example
.gitignore
.vscode
.wrangler
CLAUDE.md
Containerfile
DESIGN.md
README.md
astro.config.mjs
dist
docs
node_modules
package-lock.json
package.json
public
scripts
src
tsconfig.json
wrangler.toml
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nD=$(mktemp -d \"$T/imgsave.XXXXXXXX\")\npodman save --format oci-dir -o \"$D/oci\" log-atm-web \u003e/dev/null 2\u003e&1\nmkdir -p \"$D/x\"; for b in \"$D\"/oci/blobs/sha256/*; do tar -xf \"$b\" -C \"$D/x\" 2\u003e/dev/null; done\necho \"archivos extraidos: $(find \"$D/x\" -type f | wc -l)\"\necho \"--- control positivo: valor presente en la imagen (wrangler.toml MAIL_TO)\"\n/usr/bin/grep -rl --binary-files=text 'contacto@logatm.com' \"$D/x/app/wrangler.toml\"; echo \"exit=$? (0 = la busqueda funciona)\"\necho \"--- valor canary (completo y parcial) en todos los archivos, incluidos binarios\"\n/usr/bin/grep -rl --binary-files=text -e 'CANARY-s3cr3t' -e '7f3a9c21' -e 'canary-user@example.test' \"$D/x\" \u003e \"$D/hits.txt\"; echo \"exit=$? (1 = ningun archivo contiene el valor)\"; wc -l < \"$D/hits.txt\"\necho \"--- los manifiestos/config de capa tampoco (oci blobs sin extraer)\"\n/usr/bin/grep -rl --binary-files=text -e 'CANARY-s3cr3t' \"$D/oci\" ; echo \"exit=$? (1 = ninguno)\"\ncd \"$T\" && rm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:22:17-03:00","exit":0,"sha256":"fedb3c63a238a82e27767aa33daee0665dad0afcf54300e3717bd31ef488f3b2","lineas":9,"omitidas":0,"no_recomprobable":"inspeccion de imagen una sola vez; escribe y borra temporales"} -->
**Evidencia `verify-report.15`** · exit 0 · 9 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:22:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: inspeccion de imagen una sola vez; escribe y borra temporales

```bash
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
D=$(mktemp -d "$T/imgsave.XXXXXXXX")
podman save --format oci-dir -o "$D/oci" log-atm-web >/dev/null 2>&1
mkdir -p "$D/x"; for b in "$D"/oci/blobs/sha256/*; do tar -xf "$b" -C "$D/x" 2>/dev/null; done
echo "archivos extraidos: $(find "$D/x" -type f | wc -l)"
echo "--- control positivo: valor presente en la imagen (wrangler.toml MAIL_TO)"
/usr/bin/grep -rl --binary-files=text 'contacto@logatm.com' "$D/x/app/wrangler.toml"; echo "exit=$? (0 = la busqueda funciona)"
echo "--- valor canary (completo y parcial) en todos los archivos, incluidos binarios"
/usr/bin/grep -rl --binary-files=text -e 'CANARY-s3cr3t' -e '7f3a9c21' -e 'canary-user@example.test' "$D/x" > "$D/hits.txt"; echo "exit=$? (1 = ningun archivo contiene el valor)"; wc -l < "$D/hits.txt"
echo "--- los manifiestos/config de capa tampoco (oci blobs sin extraer)"
/usr/bin/grep -rl --binary-files=text -e 'CANARY-s3cr3t' "$D/oci" ; echo "exit=$? (1 = ninguno)"
cd "$T" && rm -rf "$D"
```

```text
archivos extraidos: 29197
--- control positivo: valor presente en la imagen (wrangler.toml MAIL_TO)
/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/imgsave.H9JnsD9V/x/app/wrangler.toml
exit=0 (0 = la busqueda funciona)
--- valor canary (completo y parcial) en todos los archivos, incluidos binarios
exit=1 (1 = ningun archivo contiene el valor)
0
--- los manifiestos/config de capa tampoco (oci blobs sin extraer)
exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\necho \"--- sin .dev.vars en el directorio: $(ls .dev.vars 2\u003e&1)\"\ntimeout 60 npm run container:run 2\u003e&1 | tail -8\necho \"exit npm run container:run=${PIPESTATUS[0]}\"\necho \"--- contenedores tras el intento\"; podman ps -a --format '{{.ID}} {{.Names}} {{.Status}}'; echo \"(vacio = ninguno)\"\necho \"--- puerto 4321\"; ss -ltn | /usr/bin/grep ':4321'; echo \"grep exit=$? (1 = puerto libre)\"\necho \"--- git status del repo (el intento no debe crear .dev.vars versionable)\"; git status --short -- . | head -5; ls .dev.vars 2\u003e&1\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:22:24-03:00","exit":2,"sha256":"4fa312ceaa67e2d4bdbf7ae6991e408d87595863ad8af2276441f048aa23c614","lineas":13,"omitidas":0,"no_recomprobable":"intento unico de ejecucion sin credenciales"} -->
**Evidencia `verify-report.16`** · exit 2 · 13 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:22:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: intento unico de ejecucion sin credenciales

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
echo "--- sin .dev.vars en el directorio: $(ls .dev.vars 2>&1)"
timeout 60 npm run container:run 2>&1 | tail -8
echo "exit npm run container:run=${PIPESTATUS[0]}"
echo "--- contenedores tras el intento"; podman ps -a --format '{{.ID}} {{.Names}} {{.Status}}'; echo "(vacio = ninguno)"
echo "--- puerto 4321"; ss -ltn | /usr/bin/grep ':4321'; echo "grep exit=$? (1 = puerto libre)"
echo "--- git status del repo (el intento no debe crear .dev.vars versionable)"; git status --short -- . | head -5; ls .dev.vars 2>&1
```

```text
--- sin .dev.vars en el directorio: ls: cannot access '.dev.vars': No such file or directory

> log-atm-web-astro@0.0.1 container:run
> podman run --rm --init -p 4321:4321 -v "$PWD/.dev.vars:/app/dist/server/.dev.vars:ro" log-atm-web

Error: statfs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro/.dev.vars: no such file or directory
exit npm run container:run=125
--- contenedores tras el intento
(vacio = ninguno)
--- puerto 4321
grep exit=1 (1 = puerto libre)
--- git status del repo (el intento no debe crear .dev.vars versionable)
ls: cannot access '.dev.vars': No such file or directory
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nISO=$T/iso.JBmJ3XfH\nLOG=$(mktemp \"$T/run.XXXXXXXX.log\")\ncd \"$ISO/log-atm-web-astro/src\" || exit 9\necho \"--- invocado desde: $PWD (subdirectorio, no la raiz del paquete)\"\nnpm run container:run \u003e \"$LOG\" 2\u003e&1 &\nNPID=$!\nfor i in $(seq 1 60); do curl -s -o /dev/null --max-time 2 http://127.0.0.1:4321/ && break; sleep 1; done\nCID=$(podman ps -q | head -1); echo \"contenedor en ejecucion: $(podman ps --format '{{.Image}} {{.Ports}}')\"\necho \"--- usuario del proceso en el contenedor / ejecucion rootless\"\npodman exec \"$CID\" id -un; echo \"podman rootless=$(podman info --format '{{.Host.Security.Rootless}}'); sudo no usado\"\necho \"--- montaje de .dev.vars\"; podman inspect \"$CID\" --format '{{range .Mounts}}{{.Source}} -\u003e {{.Destination}} rw={{.RW}}{{end}}'\necho \"--- 200 en portadas por 127.0.0.1, localhost e IPv6\"\nfor h in 127.0.0.1:4321 localhost:4321 '[::1]:4321'; do for p in / /en/ /pt/; do printf '%s%s -\u003e ' \"$h\" \"$p\"; curl -s -o /dev/null -w '%{http_code}\\n' --max-time 10 \"http://$h$p\"; done; done\necho \"--- rutas inexistentes: 404 y no la portada\"\nfor p in /no-existe /en/no-existe /pt/no-existe /es/no-existe/profundo; do printf '%s -\u003e ' \"$p\"; curl -s -o \"$LOG.body\" -w '%{http_code} ' \"http://localhost:4321$p\"; /usr/bin/grep -o '<title\u003e[^<]*</title\u003e' \"$LOG.body\" | head -1; done\nprintf 'titulo portada: '; curl -s http://localhost:4321/ | /usr/bin/grep -o '<title\u003e[^<]*</title\u003e' | head -1\necho \"--- API: datos invalidos -\u003e 400 JSON\"\ncurl -s -i -X POST -H 'content-type: application/json' -d '{}' http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^content-type|^\\{'\ncurl -s -i -X POST -H 'content-type: application/json' -d '{\"name\":\"x\",\"email\":\"no-es-email\"}' http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^content-type|^\\{'\necho \"--- API: GET -\u003e 405 JSON; cotizacion-rapida invalida\"\ncurl -s -i http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\\{'\ncurl -s -i -X POST -H 'content-type: application/json' -d '{}' http://localhost:4321/api/cotizacion-rapida | /usr/bin/grep -iE '^HTTP|^\\{' | cut -c1-120\necho \"--- credencial llega al servicio: SMTP falso dentro del contenedor y POST valido\"\npodman cp \"$T/fake-smtp.cjs\" \"$CID:/tmp/fake-smtp.cjs\"\npodman exec -d \"$CID\" node /tmp/fake-smtp.cjs; sleep 2\ncurl -s -i -X POST -H 'content-type: application/json' -d '{\"name\":\"Prueba\",\"email\":\"prueba@example.test\",\"message\":\"hola\"}' --max-time 30 http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\\{'\nsleep 2\necho \"--- registro SMTP (lineas del cliente; base64 decodificado)\"\npodman exec \"$CID\" cat /tmp/smtp.log | head -20 | while IFS= read -r l; do echo \"$l\"; t=${l#C: }; if [[ \"$l\" == C:\\ * && \"$t\" =~ ^[A-Za-z0-9+/=]{12,}$ ]]; then echo \"   b64 -\u003e $(printf '%s' \"$t\" | base64 -d 2\u003e/dev/null | tr '\\0' '|')\"; fi; done\necho \"--- detener y limpiar\"\npodman stop -t 5 \"$CID\" \u003e/dev/null; wait \"$NPID\" 2\u003e/dev/null; echo \"npm run container:run termino con exit=$?\"\nrm -f \"$LOG\" \"$LOG.body\"\necho \"contenedores restantes: $(podman ps -aq | wc -l)\"; ss -ltn | /usr/bin/grep ':4321'; echo \"puerto 4321 grep exit=$? (1 = libre)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:23:01-03:00","exit":0,"sha256":"5387237989a52f0b35c76a5ddae95aab93cbc80fb9b05a9bb4878cd46c97f127","lineas":64,"omitidas":24,"no_recomprobable":"ejecucion unica del contenedor con credencial canary; efimero"} -->
**Evidencia `verify-report.17`** · exit 0 · 64 líneas, 24 omitidas · HEAD `sin-git` · 2026-10-06T19:23:01-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: ejecucion unica del contenedor con credencial canary; efimero

```bash
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
ISO=$T/iso.JBmJ3XfH
LOG=$(mktemp "$T/run.XXXXXXXX.log")
cd "$ISO/log-atm-web-astro/src" || exit 9
echo "--- invocado desde: $PWD (subdirectorio, no la raiz del paquete)"
npm run container:run > "$LOG" 2>&1 &
NPID=$!
for i in $(seq 1 60); do curl -s -o /dev/null --max-time 2 http://127.0.0.1:4321/ && break; sleep 1; done
CID=$(podman ps -q | head -1); echo "contenedor en ejecucion: $(podman ps --format '{{.Image}} {{.Ports}}')"
echo "--- usuario del proceso en el contenedor / ejecucion rootless"
podman exec "$CID" id -un; echo "podman rootless=$(podman info --format '{{.Host.Security.Rootless}}'); sudo no usado"
echo "--- montaje de .dev.vars"; podman inspect "$CID" --format '{{range .Mounts}}{{.Source}} -> {{.Destination}} rw={{.RW}}{{end}}'
echo "--- 200 en portadas por 127.0.0.1, localhost e IPv6"
for h in 127.0.0.1:4321 localhost:4321 '[::1]:4321'; do for p in / /en/ /pt/; do printf '%s%s -> ' "$h" "$p"; curl -s -o /dev/null -w '%{http_code}\n' --max-time 10 "http://$h$p"; done; done
echo "--- rutas inexistentes: 404 y no la portada"
for p in /no-existe /en/no-existe /pt/no-existe /es/no-existe/profundo; do printf '%s -> ' "$p"; curl -s -o "$LOG.body" -w '%{http_code} ' "http://localhost:4321$p"; /usr/bin/grep -o '<title>[^<]*</title>' "$LOG.body" | head -1; done
printf 'titulo portada: '; curl -s http://localhost:4321/ | /usr/bin/grep -o '<title>[^<]*</title>' | head -1
echo "--- API: datos invalidos -> 400 JSON"
curl -s -i -X POST -H 'content-type: application/json' -d '{}' http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^content-type|^\{'
curl -s -i -X POST -H 'content-type: application/json' -d '{"name":"x","email":"no-es-email"}' http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^content-type|^\{'
echo "--- API: GET -> 405 JSON; cotizacion-rapida invalida"
curl -s -i http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\{'
curl -s -i -X POST -H 'content-type: application/json' -d '{}' http://localhost:4321/api/cotizacion-rapida | /usr/bin/grep -iE '^HTTP|^\{' | cut -c1-120
echo "--- credencial llega al servicio: SMTP falso dentro del contenedor y POST valido"
podman cp "$T/fake-smtp.cjs" "$CID:/tmp/fake-smtp.cjs"
podman exec -d "$CID" node /tmp/fake-smtp.cjs; sleep 2
curl -s -i -X POST -H 'content-type: application/json' -d '{"name":"Prueba","email":"prueba@example.test","message":"hola"}' --max-time 30 http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\{'
sleep 2
echo "--- registro SMTP (lineas del cliente; base64 decodificado)"
podman exec "$CID" cat /tmp/smtp.log | head -20 | while IFS= read -r l; do echo "$l"; t=${l#C: }; if [[ "$l" == C:\ * && "$t" =~ ^[A-Za-z0-9+/=]{12,}$ ]]; then echo "   b64 -> $(printf '%s' "$t" | base64 -d 2>/dev/null | tr '\0' '|')"; fi; done
echo "--- detener y limpiar"
podman stop -t 5 "$CID" >/dev/null; wait "$NPID" 2>/dev/null; echo "npm run container:run termino con exit=$?"
rm -f "$LOG" "$LOG.body"
echo "contenedores restantes: $(podman ps -aq | wc -l)"; ss -ltn | /usr/bin/grep ':4321'; echo "puerto 4321 grep exit=$? (1 = libre)"
```

```text
--- invocado desde: /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro/src (subdirectorio, no la raiz del paquete)
contenedor en ejecucion: localhost/log-atm-web:latest 0.0.0.0:4321->4321/tcp
--- usuario del proceso en el contenedor / ejecucion rootless
root
podman rootless=true; sudo no usado
--- montaje de .dev.vars
/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro/.dev.vars -> /app/dist/server/.dev.vars rw=false
--- 200 en portadas por 127.0.0.1, localhost e IPv6
127.0.0.1:4321/ -> 200
127.0.0.1:4321/en/ -> 200
127.0.0.1:4321/pt/ -> 200
localhost:4321/ -> 200
localhost:4321/en/ -> 200
localhost:4321/pt/ -> 200
[::1]:4321/ -> 200
[::1]:4321/en/ -> 200
[::1]:4321/pt/ -> 200
--- rutas inexistentes: 404 y no la portada
/no-existe -> 404 <title>Página no encontrada | LOG ATM</title>
/en/no-existe -> 404 <title>Page not found | LOG ATM</title>
/pt/no-existe -> 404 <title>Página não encontrada | LOG ATM</title>
/es/no-existe/profundo -> 404 <title>Página no encontrada | LOG ATM</title>
titulo portada: <title>Logística Aérea y Marítima | LOG ATM</title>
--- API: datos invalidos -> 400 JSON
HTTP/1.1 400 Bad Request�
content-type: application/json; charset=utf-8�
{"ok":false,"error":"validation","fields":{"name":"Requerido.","email":"Requerido."}}
HTTP/1.1 400 Bad Request�
content-type: application/json; charset=utf-8�
{"ok":false,"error":"validation","fields":{"email":"Formato inválido."}}
--- API: GET -> 405 JSON; cotizacion-rapida invalida
HTTP/1.1 405 Method Not Allowed�
{"ok":false,"error":"method"}
HTTP/1.1 400 Bad Request�
{"ok":false,"error":"validation","fields":{"email":"Indica email o teléfono.","phone":"Indica email o teléfono."}}
--- credencial llega al servicio: SMTP falso dentro del contenedor y POST valido
c732b18506e1ae95a802dd0ceb284b2ed8a0e21dd5bca5b16918628f416b59dc
HTTP/1.1 200 OK�
{"ok":true}
--- registro SMTP (lineas del cliente; base64 decodificado)
```
<!-- evidencia:fin verify-report.17 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nLOG=$(mktemp \"$T/run.XXXXXXXX.log\")\ncd \"$T/iso.JBmJ3XfH/log-atm-web-astro\" || exit 9\nnpm run container:run \u003e \"$LOG\" 2\u003e&1 &\nNPID=$!\nfor i in $(seq 1 60); do curl -s -o /dev/null --max-time 2 http://127.0.0.1:4321/ && break; sleep 1; done\nCID=$(podman ps -q | head -1)\npodman cp \"$T/fake-smtp.cjs\" \"$CID:/tmp/fake-smtp.cjs\"; podman exec -d \"$CID\" node /tmp/fake-smtp.cjs; sleep 2\necho \"--- POST valido a /api/contacto con el SMTP falso en 127.0.0.1:2525 del contenedor\"\ncurl -s -i -X POST -H 'content-type: application/json' -d '{\"name\":\"Prueba\",\"email\":\"prueba@example.test\",\"message\":\"hola\"}' --max-time 30 http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\\{' | cut -c1-80\nsleep 2\necho \"--- lineas AUTH del cliente SMTP y su decodificacion\"\npodman exec \"$CID\" cat /tmp/smtp.log | /usr/bin/grep -vE '^C: (DATA|QUIT|MAIL|RCPT|From|To|Subject|Date|Message|MIME|Content|Reply|X-|--|$)' | head -12 | cut -c1-100 \u003e \"$LOG.smtp\"\nwhile IFS= read -r l; do echo \"$l\"; t=${l#C: }; if [[ \"$t\" =~ ^[A-Za-z0-9+/=]{12,}$ ]]; then echo \"   b64 -\u003e $(printf '%s' \"$t\" | base64 -d 2\u003e/dev/null | tr '\\0' '|')\"; fi; done < \"$LOG.smtp\"\necho \"--- detener y limpiar\"\npodman stop -t 5 \"$CID\" \u003e/dev/null; wait \"$NPID\" 2\u003e/dev/null; echo \"npm run container:run exit=$?\"\nrm -f \"$LOG\" \"$LOG.smtp\"\necho \"contenedores restantes: $(podman ps -aq | wc -l)\"; ss -ltn | /usr/bin/grep ':4321'; echo \"puerto 4321 grep exit=$? (1 = libre)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:23:17-03:00","exit":0,"sha256":"9f7854050355ebe11fa666d02a4a772f7be2ae1eb4997f233c71a9fe0c06d3f9","lineas":21,"omitidas":0,"no_recomprobable":"ejecucion unica del contenedor con credencial canary; efimero"} -->
**Evidencia `verify-report.18`** · exit 0 · 21 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:23:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: ejecucion unica del contenedor con credencial canary; efimero

```bash
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
LOG=$(mktemp "$T/run.XXXXXXXX.log")
cd "$T/iso.JBmJ3XfH/log-atm-web-astro" || exit 9
npm run container:run > "$LOG" 2>&1 &
NPID=$!
for i in $(seq 1 60); do curl -s -o /dev/null --max-time 2 http://127.0.0.1:4321/ && break; sleep 1; done
CID=$(podman ps -q | head -1)
podman cp "$T/fake-smtp.cjs" "$CID:/tmp/fake-smtp.cjs"; podman exec -d "$CID" node /tmp/fake-smtp.cjs; sleep 2
echo "--- POST valido a /api/contacto con el SMTP falso en 127.0.0.1:2525 del contenedor"
curl -s -i -X POST -H 'content-type: application/json' -d '{"name":"Prueba","email":"prueba@example.test","message":"hola"}' --max-time 30 http://localhost:4321/api/contacto | /usr/bin/grep -iE '^HTTP|^\{' | cut -c1-80
sleep 2
echo "--- lineas AUTH del cliente SMTP y su decodificacion"
podman exec "$CID" cat /tmp/smtp.log | /usr/bin/grep -vE '^C: (DATA|QUIT|MAIL|RCPT|From|To|Subject|Date|Message|MIME|Content|Reply|X-|--|$)' | head -12 | cut -c1-100 > "$LOG.smtp"
while IFS= read -r l; do echo "$l"; t=${l#C: }; if [[ "$t" =~ ^[A-Za-z0-9+/=]{12,}$ ]]; then echo "   b64 -> $(printf '%s' "$t" | base64 -d 2>/dev/null | tr '\0' '|')"; fi; done < "$LOG.smtp"
echo "--- detener y limpiar"
podman stop -t 5 "$CID" >/dev/null; wait "$NPID" 2>/dev/null; echo "npm run container:run exit=$?"
rm -f "$LOG" "$LOG.smtp"
echo "contenedores restantes: $(podman ps -aq | wc -l)"; ss -ltn | /usr/bin/grep ':4321'; echo "puerto 4321 grep exit=$? (1 = libre)"
```

```text
58a8a29d3c16fc1c9969b46309c3c938b3fa43b0486a87ada695aa4c1d356d2e
--- POST valido a /api/contacto con el SMTP falso en 127.0.0.1:2525 del contenedor
HTTP/1.1 200 OK�
{"ok":true}
--- lineas AUTH del cliente SMTP y su decodificacion
LISTENING
C: EHLO 127.0.0.1
C: AUTH PLAIN AGNhbmFyeS11c2VyQGV4YW1wbGUudGVzdABDQU5BUlktczNjcjN0LTdmM2E5YzIx
C: [Web =C2=B7 Contacto] Prueba =E2=80=94 sin servicio
C: Nuevo mensaje desde el formulario de contacto
C: =E2=80=94 Datos del contacto =E2=80=94
C: Nombre: Prueba
C: Email: prueba@example.test
C: =E2=80=94 Mensaje =E2=80=94
C: hola
C: =E2=80=94 Metadatos =E2=80=94
C: Formulario: Contacto
--- detener y limpiar
npm run container:run exit=0
contenedores restantes: 0
puerto 4321 grep exit=1 (1 = libre)
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"argv","argv":["python3","-c","import base64;print(base64.b64decode('AGNhbmFyeS11c2VyQGV4YW1wbGUudGVzdABDQU5BUlktczNjcjN0LTdmM2E5YzIx').replace(b'\\0',b'|').decode())"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:23:25-03:00","exit":0,"sha256":"c81feff1011ecb2c8e874ae5b0bf10dbced3801eb23a0b4e9c31a645e8bdc68f","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.19`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:23:25-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`

```text
python3 -c 'import base64;print(base64.b64decode('"'"'AGNhbmFyeS11c2VyQGV4YW1wbGUudGVzdABDQU5BUlktczNjcjN0LTdmM2E5YzIx'"'"').replace(b'"'"'\0'"'"',b'"'"'|'"'"').decode())'
```

```text
|canary-user@example.test|CANARY-s3cr3t-7f3a9c21
```
<!-- evidencia:fin verify-report.19 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"argv","argv":["podman","run","--rm","--entrypoint","node","log-atm-web","--version"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:23:34-03:00","exit":0,"sha256":"33e26f35db6e57ce0c486ddc815fe966867e4f649e418eaf323f75f4720eb8e9","lineas":1,"omitidas":0,"no_recomprobable":"version de la imagen; sin interes en repetir"} -->
**Evidencia `verify-report.20`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:23:34-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: version de la imagen; sin interes en repetir

```text
podman run --rm --entrypoint node log-atm-web --version
```

```text
v22.23.3
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\necho \"node_modules antes: $(ls -d node_modules 2\u003e&1)\"\nOUT=$(mktemp)\nnpm ci \u003e \"$OUT\" 2\u003e&1; echo \"exit npm ci=$?\"\ntail -8 \"$OUT\"\necho \"--- advertencias de incompatibilidad de versiones (peer / ERESOLVE / EBADENGINE)\"\n/usr/bin/grep -ciE 'ERESOLVE|peer dep|EBADENGINE|could not resolve|conflicting peer' \"$OUT\"\nrm -f \"$OUT\"\necho \"--- typescript y @astrojs/check resueltos\"; npm ls typescript @astrojs/check 2\u003e&1 | head -12\necho \"--- npm ls sin errores de peer\"; npm ls \u003e/dev/null 2\u003e\"$T/npmls.err\"; echo \"exit npm ls=$?\"; head -5 \"$T/npmls.err\"; rm -f \"$T/npmls.err\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:23:41-03:00","exit":0,"sha256":"ff17cfa2a79d32181b679485e6464519efdd21c1a1e624f351c4e3f43d9518a9","lineas":25,"omitidas":0,"no_recomprobable":"instalacion limpia de una sola vez en copia aislada"} -->
**Evidencia `verify-report.21`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:23:41-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: instalacion limpia de una sola vez en copia aislada

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
echo "node_modules antes: $(ls -d node_modules 2>&1)"
OUT=$(mktemp)
npm ci > "$OUT" 2>&1; echo "exit npm ci=$?"
tail -8 "$OUT"
echo "--- advertencias de incompatibilidad de versiones (peer / ERESOLVE / EBADENGINE)"
/usr/bin/grep -ciE 'ERESOLVE|peer dep|EBADENGINE|could not resolve|conflicting peer' "$OUT"
rm -f "$OUT"
echo "--- typescript y @astrojs/check resueltos"; npm ls typescript @astrojs/check 2>&1 | head -12
echo "--- npm ls sin errores de peer"; npm ls >/dev/null 2>"$T/npmls.err"; echo "exit npm ls=$?"; head -5 "$T/npmls.err"; rm -f "$T/npmls.err"
```

```text
node_modules antes: ls: cannot access 'node_modules': No such file or directory
exit npm ci=0

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
--- advertencias de incompatibilidad de versiones (peer / ERESOLVE / EBADENGINE)
0
--- typescript y @astrojs/check resueltos
log-atm-web-astro@0.0.1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro
├─┬ @astrojs/check@0.9.10
│ ├─┬ @astrojs/language-server@2.17.1
│ │ └─┬ @volar/kit@2.4.28
│ │   └── typescript@6.0.3 deduped
│ └── typescript@6.0.3 deduped
└── typescript@6.0.3

--- npm ls sin errores de peer
exit npm ls=1
/dev/fd/3: line 10: /npmls.err: Permission denied
head: cannot open '/npmls.err' for reading: No such file or directory
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"argv","argv":["npm","ls","--depth=0"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:23:45-03:00","exit":0,"sha256":"dd8c59ab70e9fda75bfe930f44e27bb97b6172b894c2a6dcfd85b83ef04685a7","lineas":26,"omitidas":0,"no_recomprobable":"ls en copia aislada"} -->
**Evidencia `verify-report.22`** · exit 0 · 26 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:23:45-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro`
No re-comprobable: ls en copia aislada

```text
npm ls --depth=0
```

```text
log-atm-web-astro@0.0.1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro
├── @astrojs/check@0.9.10
├── @astrojs/cloudflare@13.5.0
├── @astrojs/react@5.0.3
├── @astrojs/sitemap@3.7.2
├── @fontsource/inter@5.2.8
├── @fontsource/jetbrains-mono@5.2.8
├── @fontsource/outfit@5.2.8
├── @iconify-json/lucide@1.2.102
├── @tailwindcss/vite@4.2.2
├── @types/react-dom@19.2.3
├── @types/react@19.2.14
├── astro@6.3.1
├── axe-core@4.14.0
├── gsap@3.14.2
├── motion@12.38.0
├── playwright-core@1.63.0
├── react-dom@19.2.5
├── react@19.2.5
├── sharp@0.34.5
├── svgo@4.0.1
├── tailwindcss@4.2.2
├── tsx@4.21.0
├── typescript@6.0.3
└── worker-mailer@1.2.1

```
<!-- evidencia:fin verify-report.22 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\necho \"--- mutacion en copia aislada: el bug original reply -\u003e replyTo en mailer.ts\"\nsed -i 's/^      reply: opts.replyTo,/      replyTo: opts.replyTo,/' src/lib/mailer.ts\n/usr/bin/grep -n 'replyTo: opts.replyTo' src/lib/mailer.ts\nnpm run check 2\u003e&1 | /usr/bin/grep -E 'error|Result|errors|mailer' | head -8\necho \"exit npm run check (con error)=${PIPESTATUS[0]}\"\necho \"--- el build con el error de tipos termina con exito\"\nnpm run build \u003e /dev/null 2\u003e&1; echo \"exit npm run build (con error de tipos)=$?\"\necho \"--- el script build no invoca check\"; node -p \"require('./package.json').scripts.build\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:25:37-03:00","exit":0,"sha256":"9e4186a522038f54c7d2027a9aec890c9a3596d764885bea95ab162b0898cd17","lineas":10,"omitidas":0,"no_recomprobable":"mutacion en copia aislada; una sola vez"} -->
**Evidencia `verify-report.23`** · exit 0 · 10 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:25:37-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: mutacion en copia aislada; una sola vez

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
echo "--- mutacion en copia aislada: el bug original reply -> replyTo en mailer.ts"
sed -i 's/^      reply: opts.replyTo,/      replyTo: opts.replyTo,/' src/lib/mailer.ts
/usr/bin/grep -n 'replyTo: opts.replyTo' src/lib/mailer.ts
npm run check 2>&1 | /usr/bin/grep -E 'error|Result|errors|mailer' | head -8
echo "exit npm run check (con error)=${PIPESTATUS[0]}"
echo "--- el build con el error de tipos termina con exito"
npm run build > /dev/null 2>&1; echo "exit npm run build (con error de tipos)=$?"
echo "--- el script build no invoca check"; node -p "require('./package.json').scripts.build"
```

```text
--- mutacion en copia aislada: el bug original reply -> replyTo en mailer.ts
59:      replyTo: opts.replyTo,
�[96msrc/lib/mailer.ts�[0m:�[93m59�[0m:�[93m7�[0m - �[91merror�[0m�[90m ts(2561): �[0mObject literal may only specify known properties, but 'replyTo' does not exist in type 'EmailOptions'. Did you mean to write 'reply'?
Result (51 files): 
- 1 error
exit npm run check (con error)=1
--- el build con el error de tipos termina con exito
exit npm run build (con error de tipos)=0
--- el script build no invoca check
astro build
```
<!-- evidencia:fin verify-report.23 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\necho \"--- copia aislada: parrafo de bajo contraste (#bbb sobre #fff) antes de </body\u003e de BaseLayout y pagina nueva /prueba-nueva/\"\nsed -i 's#^  </body\u003e#<p id=\"mut-contraste\" style=\"color:\\#bbbbbb;background:\\#ffffff;margin:0;padding:8px\"\u003eTexto de bajo contraste de prueba</p\u003e\\n  </body\u003e#' src/layouts/BaseLayout.astro\n/usr/bin/grep -n 'mut-contraste' src/layouts/BaseLayout.astro | cut -c1-80\ncp src/pages/industrias.astro src/pages/prueba-nueva.astro\nnpm run build \u003e /dev/null 2\u003e&1; echo \"exit build=$?\"\nOUT=$(mktemp); npm run a11y \u003e \"$OUT\" 2\u003e&1; echo \"exit npm run a11y=$?\"\n/usr/bin/grep 'Resumen' \"$OUT\"\necho \"--- violaciones por regla\"; /usr/bin/grep -oE '^\\[(escritorio|móvil)\\] [^ ]+ [a-z0-9-]+' \"$OUT\" | awk '{print $3}' | sort | uniq -c\necho \"--- ejemplo color-contrast (viewport, pagina, selector)\"; /usr/bin/grep 'color-contrast' \"$OUT\" | head -3 | cut -c1-230\necho \"--- la pagina nueva aparece en el informe sin editar el script\"; /usr/bin/grep -c '/prueba-nueva/' \"$OUT\"; /usr/bin/grep '/prueba-nueva/' \"$OUT\" | head -2 | cut -c1-120\nrm -f \"$OUT\"\npgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo \"procesos huerfanos pgrep exit=$? (1 = ninguno)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:26:33-03:00","exit":0,"sha256":"b34692046c1c988920f5dc5274788fee05b7a86ffe933fc79386b43c280b525a","lineas":17,"omitidas":0,"no_recomprobable":"mutacion en copia aislada; una sola vez"} -->
**Evidencia `verify-report.24`** · exit 0 · 17 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:26:33-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: mutacion en copia aislada; una sola vez

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
echo "--- copia aislada: parrafo de bajo contraste (#bbb sobre #fff) antes de </body> de BaseLayout y pagina nueva /prueba-nueva/"
sed -i 's#^  </body>#<p id="mut-contraste" style="color:\#bbbbbb;background:\#ffffff;margin:0;padding:8px">Texto de bajo contraste de prueba</p>\n  </body>#' src/layouts/BaseLayout.astro
/usr/bin/grep -n 'mut-contraste' src/layouts/BaseLayout.astro | cut -c1-80
cp src/pages/industrias.astro src/pages/prueba-nueva.astro
npm run build > /dev/null 2>&1; echo "exit build=$?"
OUT=$(mktemp); npm run a11y > "$OUT" 2>&1; echo "exit npm run a11y=$?"
/usr/bin/grep 'Resumen' "$OUT"
echo "--- violaciones por regla"; /usr/bin/grep -oE '^\[(escritorio|móvil)\] [^ ]+ [a-z0-9-]+' "$OUT" | awk '{print $3}' | sort | uniq -c
echo "--- ejemplo color-contrast (viewport, pagina, selector)"; /usr/bin/grep 'color-contrast' "$OUT" | head -3 | cut -c1-230
echo "--- la pagina nueva aparece en el informe sin editar el script"; /usr/bin/grep -c '/prueba-nueva/' "$OUT"; /usr/bin/grep '/prueba-nueva/' "$OUT" | head -2 | cut -c1-120
rm -f "$OUT"
pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo "procesos huerfanos pgrep exit=$? (1 = ninguno)"
```

```text
--- copia aislada: parrafo de bajo contraste (#bbb sobre #fff) antes de </body> de BaseLayout y pagina nueva /prueba-nueva/
199:<p id="mut-contraste" style="color:#bbbbbb;background:#ffffff;margin:0;paddi
exit build=0
exit npm run a11y=1
Resumen: 44 auditorías (22 URLs × 2 tamaños: 19 páginas, 3 sondas 404) · 110 violaciones en 2 reglas · 0 estados HTTP inesperados
--- violaciones por regla
     44 color-contrast
     66 label-content-name-mismatch
--- ejemplo color-contrast (viewport, pagina, selector)
[escritorio] / color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mut-contraste
[escritorio] /contacto/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mut-contraste
[escritorio] /cotizar/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mut-contraste
--- la pagina nueva aparece en el informe sin editar el script
5
[escritorio] /prueba-nueva/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mut-c
[escritorio] /prueba-nueva/ label-content-name-mismatch (serious) Elements must have their visible text as part of their
procesos huerfanos pgrep exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"archivo","argv":null,"texto":"cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\necho \"--- copia aislada: se retira la mutacion y se quitan los dos aria-label que causan label-content-name-mismatch\"\nsed -i '/id=\"mut-contraste\"/d' src/layouts/BaseLayout.astro\nrm -f src/pages/prueba-nueva.astro\nsed -i \"s# aria-label={t('a11y.brandHome')}##\" src/components/ui/Navbar.astro\nsed -i \"/^      aria-label={t('a11y.languageCurrent', { lang: currentName })}\\$/d\" src/components/ui/LanguageSelector.astro\n/usr/bin/grep -c \"brandHome\" src/components/ui/Navbar.astro; /usr/bin/grep -c \"languageCurrent\" src/components/ui/LanguageSelector.astro\nnpm run build \u003e /dev/null 2\u003e&1; echo \"exit build=$?\"\nOUT=$(mktemp); npm run a11y \u003e \"$OUT\" 2\u003e&1; echo \"exit npm run a11y=$?\"\ntail -4 \"$OUT\" | cut -c1-200\nrm -f \"$OUT\"\npgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo \"procesos huerfanos pgrep exit=$? (1 = ninguno)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:27:12-03:00","exit":0,"sha256":"00742bb6d4ed75fc20214b48410b1a32f5684c43c370a3e6db770739a5c29401","lineas":10,"omitidas":0,"no_recomprobable":"mutacion en copia aislada; una sola vez"} -->
**Evidencia `verify-report.25`** · exit 0 · 10 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:27:12-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: mutacion en copia aislada; una sola vez

```bash
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro || exit 9
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
echo "--- copia aislada: se retira la mutacion y se quitan los dos aria-label que causan label-content-name-mismatch"
sed -i '/id="mut-contraste"/d' src/layouts/BaseLayout.astro
rm -f src/pages/prueba-nueva.astro
sed -i "s# aria-label={t('a11y.brandHome')}##" src/components/ui/Navbar.astro
sed -i "/^      aria-label={t('a11y.languageCurrent', { lang: currentName })}\$/d" src/components/ui/LanguageSelector.astro
/usr/bin/grep -c "brandHome" src/components/ui/Navbar.astro; /usr/bin/grep -c "languageCurrent" src/components/ui/LanguageSelector.astro
npm run build > /dev/null 2>&1; echo "exit build=$?"
OUT=$(mktemp); npm run a11y > "$OUT" 2>&1; echo "exit npm run a11y=$?"
tail -4 "$OUT" | cut -c1-200
rm -f "$OUT"
pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo "procesos huerfanos pgrep exit=$? (1 = ninguno)"
```

```text
--- copia aislada: se retira la mutacion y se quitan los dos aria-label que causan label-content-name-mismatch
0
0
exit build=0
exit npm run a11y=0

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
procesos huerfanos pgrep exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.25 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.26","forma":"archivo","argv":null,"texto":"T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey\nISO=$T/iso.JBmJ3XfH/log-atm-web-astro\nISO2=$(cat $T/iso2.path)/log-atm-web-astro\necho \"--- 1) sin CHROME_PATH y sin ./chrome (dist presente)\"; ls -d $ISO/chrome 2\u003e&1 | head -1\ncd \"$ISO\" && env -u CHROME_PATH npm run a11y 2\u003e&1 | tail -4; echo \"exit=${PIPESTATUS[0]}\"\necho \"--- 2) CHROME_PATH apunta a un archivo inexistente\"\ncd \"$ISO\" && CHROME_PATH=/ruta/inexistente/chrome npm run a11y 2\u003e&1 | tail -3; echo \"exit=${PIPESTATUS[0]}\"\necho \"--- 3) sin dist/ (copia sin compilar), con CHROME_PATH valido\"; ls -d $ISO2/dist 2\u003e&1 | head -1\ncd \"$ISO2\" && CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y 2\u003e&1 | tail -3; echo \"exit=${PIPESTATUS[0]}\"\necho \"--- procesos\"; pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo \"pgrep exit=$? (1 = ninguno)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:27:24-03:00","exit":0,"sha256":"175f9529eda08d76b2c3459a349f1a69a92a25aa8013dc90d393c11e8cb8239e","lineas":20,"omitidas":0,"no_recomprobable":"errores de entorno en copia aislada; una sola vez"} -->
**Evidencia `verify-report.26`** · exit 0 · 20 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:27:24-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: errores de entorno en copia aislada; una sola vez

```bash
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey
ISO=$T/iso.JBmJ3XfH/log-atm-web-astro
ISO2=$(cat $T/iso2.path)/log-atm-web-astro
echo "--- 1) sin CHROME_PATH y sin ./chrome (dist presente)"; ls -d $ISO/chrome 2>&1 | head -1
cd "$ISO" && env -u CHROME_PATH npm run a11y 2>&1 | tail -4; echo "exit=${PIPESTATUS[0]}"
echo "--- 2) CHROME_PATH apunta a un archivo inexistente"
cd "$ISO" && CHROME_PATH=/ruta/inexistente/chrome npm run a11y 2>&1 | tail -3; echo "exit=${PIPESTATUS[0]}"
echo "--- 3) sin dist/ (copia sin compilar), con CHROME_PATH valido"; ls -d $ISO2/dist 2>&1 | head -1
cd "$ISO2" && CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y 2>&1 | tail -3; echo "exit=${PIPESTATUS[0]}"
echo "--- procesos"; pgrep -af 'workerd|astro preview' | /usr/bin/grep -v pgrep; echo "pgrep exit=$? (1 = ninguno)"
```

```text
--- 1) sin CHROME_PATH y sin ./chrome (dist presente)
ls: cannot access '/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso.JBmJ3XfH/log-atm-web-astro/chrome': No such file or directory
> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Error: no se encontró un navegador para la auditoría. Indicá su ruta con la variable de entorno CHROME_PATH o instalá Chrome en ./chrome con: npx @puppeteer/browsers install chrome@stable
exit=2
--- 2) CHROME_PATH apunta a un archivo inexistente
> node scripts/axe-audit.mjs

Error: CHROME_PATH apunta a un archivo inexistente: /ruta/inexistente/chrome
exit=2
--- 3) sin dist/ (copia sin compilar), con CHROME_PATH valido
ls: cannot access '/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/iso2.Qee0lB1T/log-atm-web-astro/dist': No such file or directory
> node scripts/axe-audit.mjs

Error: no hay contenido compilado del sitio. Compilá el sitio primero: npm run build
exit=2
--- procesos
pgrep exit=1 (1 = ninguno)
```
<!-- evidencia:fin verify-report.26 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.27","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman || exit 9\nS=log-atm-web-astro/scripts/axe-audit.mjs\necho \"--- axe-audit.mjs: movimiento reducido, etiquetas WCAG, viewports, derivacion de URLs\"\n/usr/bin/grep -nE \"reducedMotion|wcag2|isMobile|width: ?1280|width: ?390|readdir|walk|__a11y-404__|hreflang|CHROME_PATH\" $S | cut -c1-150\necho \"--- lista fija de rutas (esperado: ninguna)\"; /usr/bin/grep -nE \"'/(servicios|contacto|nosotros|cotizar|industrias)/?'\" $S; echo \"exit=$? (1 = ninguna)\"\necho \"--- otras herramientas de auditoria a11y en el proyecto (jsdom, pa11y, lighthouse, axe-playwright)\"\n/usr/bin/grep -nEi 'jsdom|pa11y|lighthouse|axe-playwright|puppeteer\"' log-atm-web-astro/package.json; echo \"exit=$? (1 = ninguna)\"\nls log-atm-web-astro/scripts\necho \"--- .gitattributes versionado\"; git ls-files .gitattributes; git check-attr merge memory/observations.md memory/_profile.md memory/changes/chore-local-container-podman/state.md\necho \"--- perfil: comandos y secciones\"; /usr/bin/grep -nE 'Verification Commands|Type-check|CI:|Container:|Deploy Target|Build Scripts' memory/_profile.md | cut -c1-400\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:27:33-03:00","exit":0,"sha256":"4c4de04eafa398404334d66ba6b3bc8bdf9bacb7c348150229f03e63107fbf21","lineas":39,"omitidas":0,"no_recomprobable":"lectura estatica idempotente"} -->
**Evidencia `verify-report.27`** · exit 0 · 39 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:27:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`
No re-comprobable: lectura estatica idempotente

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman || exit 9
S=log-atm-web-astro/scripts/axe-audit.mjs
echo "--- axe-audit.mjs: movimiento reducido, etiquetas WCAG, viewports, derivacion de URLs"
/usr/bin/grep -nE "reducedMotion|wcag2|isMobile|width: ?1280|width: ?390|readdir|walk|__a11y-404__|hreflang|CHROME_PATH" $S | cut -c1-150
echo "--- lista fija de rutas (esperado: ninguna)"; /usr/bin/grep -nE "'/(servicios|contacto|nosotros|cotizar|industrias)/?'" $S; echo "exit=$? (1 = ninguna)"
echo "--- otras herramientas de auditoria a11y en el proyecto (jsdom, pa11y, lighthouse, axe-playwright)"
/usr/bin/grep -nEi 'jsdom|pa11y|lighthouse|axe-playwright|puppeteer"' log-atm-web-astro/package.json; echo "exit=$? (1 = ninguna)"
ls log-atm-web-astro/scripts
echo "--- .gitattributes versionado"; git ls-files .gitattributes; git check-attr merge memory/observations.md memory/_profile.md memory/changes/chore-local-container-podman/state.md
echo "--- perfil: comandos y secciones"; /usr/bin/grep -nE 'Verification Commands|Type-check|CI:|Container:|Deploy Target|Build Scripts' memory/_profile.md | cut -c1-400
```

```text
--- axe-audit.mjs: movimiento reducido, etiquetas WCAG, viewports, derivacion de URLs
4: * Uso: `npm run build` y luego `npm run a11y` (opcional: `CHROME_PATH=/ruta/a/chrome`).
10: *   responder 200) y una sonda inexistente por prefijo de idioma declarado en los `hreflang`
14: * - Ambos contextos fijan `reducedMotion: 'reduce'`: se audita el estado final de cada página.
24:import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
33:const PROBE_SEGMENT = '__a11y-404__/';
34:const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
40:  { label: 'escritorio', options: { viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' } },
43:    options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
75:/** `CHROME_PATH` si está definida; si no, el Chrome de versión mayor bajo `./chrome`. */
77:  const fromEnv = process.env.CHROME_PATH;
80:      fail(`CHROME_PATH apunta a un archivo inexistente: ${fromEnv}`);
87:    ? readdirSync(chromeDir)
95:        `CHROME_PATH o instalá Chrome en ./chrome con: ${INSTALL_HINT}`,
106:  for (const entry of readdirSync(dir, { withFileTypes: true })) {
117:/** Una sonda inexistente por prefijo de idioma de los `hreflang` de la portada, más `/`. */
123:    const hreflang = attr('hreflang');
125:    if (attr('rel') !== 'alternate' || !hreflang || !href || hreflang === 'x-default') continue;
--- lista fija de rutas (esperado: ninguna)
exit=1 (1 = ninguna)
--- otras herramientas de auditoria a11y en el proyecto (jsdom, pa11y, lighthouse, axe-playwright)
exit=1 (1 = ninguna)
axe-audit.mjs
check-i18n-links.ts
generate-favicons.mjs
measure-home-image-weight.mjs
validate-i18n.ts
--- .gitattributes versionado
.gitattributes
memory/observations.md: merge: union
memory/_profile.md: merge: unspecified
memory/changes/chore-local-container-podman/state.md: merge: unspecified
--- perfil: comandos y secciones
66:- **Deploy Target:** Cloudflare Workers mediante Workers Builds (integración git: cada push dispara un build; `main` es producción)
67:- **Build Scripts:** `npm run build` (`astro build`, sin type-check); `npm run validate-i18n` (validador i18n vía tsx, ejecución separada); `npm run check-i18n-links` (chequeo de links i18n vía tsx, ejecución separada)
69:- **Container:** `log-atm-web-astro/Containerfile` (Podman rootless, un stage `node:22-slim`, `astro preview` con workerd en el puerto 4321; `.dev.vars` montado en solo lectura al ejecutar); comandos `npm run container:build` / `npm run container:run`
70:- **Type-check:** `npm run check` (`astro check`), separado de `npm run build`, que no verifica tipos
71:- **Verification Commands:** `npm run check`; `npm run a11y` (requiere `npm run build` y Chrome vía `CHROME_PATH` o `./chrome`); `npm run validate-i18n`; `npm run check-i18n-links`
72:- **CI:** sin integración continua; las verificaciones las ejecuta quien desarrolla y `sdd-verify`
```
<!-- evidencia:fin verify-report.27 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.28","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph.py"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:27:49-03:00","exit":1,"sha256":"5d98428663b65a985bfc0f744903cf6f7471d154e704e328ecc88b71f9437267","lineas":5,"omitidas":0,"no_recomprobable":"lectura estatica idempotente; el estado se modifica despues"} -->
**Evidencia `verify-report.28`** · exit 1 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:27:49-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: lectura estatica idempotente; el estado se modifica despues

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph.py
```

```text
Traceback (most recent call last):
  File "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph.py", line 37, in <module>
    if s not in [slug(x) for x in ad["spec_refs"]]: print(f"WARN {s}: ADR {a} no declara spec_refs [[{s}]]"); warns += 1
                                  ~~^^^^^^^^^^^^^
TypeError: 'NoneType' object is not iterable
```
<!-- evidencia:fin verify-report.28 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.29","forma":"archivo","argv":null,"texto":"python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph2.py\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:28:12-03:00","exit":0,"sha256":"959ff15d5b3bab5f75b5cbf1047fa74e60c2c8c249bc81d9efdf32b862c6c59d","lineas":29,"omitidas":0,"no_recomprobable":"el resultado cambia tras la correccion de metadata registrada en el reporte"} -->
**Evidencia `verify-report.29`** · exit 0 · 29 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:28:12-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: el resultado cambia tras la correccion de metadata registrada en el reporte

```bash
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph2.py
```

```text
WARN container-production-parity: ADR 0007-not-found-page-on-demand-single no declara spec_refs [[container-production-parity]]
WARN container-secrets-isolation: depends_on [[container-production-parity]] pero container-production-parity no declara affects/related [[container-secrets-isolation]]
WARN container-build-run-commands: depends_on [[container-production-parity]] pero container-production-parity no declara affects/related [[container-build-run-commands]]
WARN container-build-run-commands: depends_on [[container-secrets-isolation]] pero container-secrets-isolation no declara affects/related [[container-build-run-commands]]
WARN static-server-container-removal: depends_on [[container-build-run-commands]] pero container-build-run-commands no declara affects/related [[static-server-container-removal]]
WARN readme-deployment-and-local-container: depends_on [[container-build-run-commands]] pero container-build-run-commands no declara affects/related [[readme-deployment-and-local-container]]
WARN readme-deployment-and-local-container: depends_on [[container-secrets-isolation]] pero container-secrets-isolation no declara affects/related [[readme-deployment-and-local-container]]
WARN readme-project-accuracy: depends_on [[type-check-zero-errors]] pero type-check-zero-errors no declara affects/related [[readme-project-accuracy]]
WARN readme-project-accuracy: depends_on [[a11y-audit-real-browser-coverage]] pero a11y-audit-real-browser-coverage no declara affects/related [[readme-project-accuracy]]
WARN type-check-build-independence: depends_on [[type-check-zero-errors]] pero type-check-zero-errors no declara affects/related [[type-check-build-independence]]
WARN a11y-audit-final-state-evaluation: depends_on [[a11y-audit-real-browser-coverage]] pero a11y-audit-real-browser-coverage no declara affects/related [[a11y-audit-final-state-evaluation]]
WARN a11y-audit-browser-portability: depends_on [[a11y-audit-real-browser-coverage]] pero a11y-audit-real-browser-coverage no declara affects/related [[a11y-audit-browser-portability]]
WARN profile-verification-commands: depends_on [[type-check-zero-errors]] pero type-check-zero-errors no declara affects/related [[profile-verification-commands]]
WARN profile-verification-commands: depends_on [[a11y-audit-real-browser-coverage]] pero a11y-audit-real-browser-coverage no declara affects/related [[profile-verification-commands]]
specs en spec_refs: 14 | FAIL=0 WARN=14
container-production-parity: status=review verified_at=null deps=0 affects=0 adrs=1
container-secrets-isolation: status=review verified_at=null deps=1 affects=0 adrs=0
container-build-run-commands: status=review verified_at=null deps=2 affects=0 adrs=0
static-server-container-removal: status=review verified_at=null deps=1 affects=0 adrs=0
readme-deployment-and-local-container: status=review verified_at=null deps=2 affects=0 adrs=0
readme-project-accuracy: status=review verified_at=null deps=2 affects=0 adrs=0
deployment-target-references: status=review verified_at=null deps=0 affects=0 adrs=0
type-check-zero-errors: status=review verified_at=null deps=0 affects=0 adrs=0
type-check-build-independence: status=review verified_at=null deps=1 affects=0 adrs=0
a11y-audit-real-browser-coverage: status=review verified_at=null deps=0 affects=0 adrs=0
a11y-audit-final-state-evaluation: status=review verified_at=null deps=1 affects=0 adrs=0
a11y-audit-browser-portability: status=review verified_at=null deps=1 affects=0 adrs=0
profile-verification-commands: status=review verified_at=null deps=2 affects=0 adrs=0
observations-log-merge: status=review verified_at=null deps=0 affects=0 adrs=0
```
<!-- evidencia:fin verify-report.29 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.30","forma":"archivo","argv":null,"texto":"python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph2.py\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:28:40-03:00","exit":0,"sha256":"f69cb239f2726ac8740efbf31ce117440c43ef08c9de7fddd6d1e2f9a9dbb2f9","lineas":15,"omitidas":0,"no_recomprobable":"estado posterior a la correccion de metadata; depende del estado de las specs"} -->
**Evidencia `verify-report.30`** · exit 0 · 15 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:28:40-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: estado posterior a la correccion de metadata; depende del estado de las specs

```bash
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey/graph2.py
```

```text
specs en spec_refs: 14 | FAIL=0 WARN=0
container-production-parity: status=review verified_at=null deps=0 affects=2 adrs=1
container-secrets-isolation: status=review verified_at=null deps=1 affects=2 adrs=0
container-build-run-commands: status=review verified_at=null deps=2 affects=2 adrs=0
static-server-container-removal: status=review verified_at=null deps=1 affects=0 adrs=0
readme-deployment-and-local-container: status=review verified_at=null deps=2 affects=0 adrs=0
readme-project-accuracy: status=review verified_at=null deps=2 affects=0 adrs=0
deployment-target-references: status=review verified_at=null deps=0 affects=0 adrs=0
type-check-zero-errors: status=review verified_at=null deps=0 affects=3 adrs=0
type-check-build-independence: status=review verified_at=null deps=1 affects=0 adrs=0
a11y-audit-real-browser-coverage: status=review verified_at=null deps=0 affects=4 adrs=0
a11y-audit-final-state-evaluation: status=review verified_at=null deps=1 affects=0 adrs=0
a11y-audit-browser-portability: status=review verified_at=null deps=1 affects=0 adrs=0
profile-verification-commands: status=review verified_at=null deps=2 affects=0 adrs=0
observations-log-merge: status=review verified_at=null deps=0 affects=0 adrs=0
```
<!-- evidencia:fin verify-report.30 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.31","forma":"archivo","argv":null,"texto":"echo \"--- contenedores (podman ps -a)\"; podman ps -a --format '{{.ID}} {{.Image}} {{.Status}}'; echo \"(vacio = ninguno)\"\necho \"--- procesos workerd/astro/podman run/fake-smtp\"; pgrep -af 'workerd|astro preview|podman run|fake-smtp|chrome-linux64' | /usr/bin/grep -v pgrep; echo \"pgrep exit=$? (1 = ninguno)\"\necho \"--- puertos 4321 y 2525 y 4300-4399 en escucha\"; ss -ltn | /usr/bin/grep -E ':4321|:2525|:43[0-9][0-9]'; echo \"grep exit=$? (1 = ninguno)\"\necho \"--- worktree: archivos sin versionar del arbol de la app (.dev.vars no debe existir)\"\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman && git status --short -- log-atm-web-astro .gitattributes; ls log-atm-web-astro/.dev.vars 2\u003e&1\necho \"--- repo principal intacto (rama y estado)\"; git -C /home/kapridoo/projects/log-atm-web-astro status --short | head -5\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:28:57-03:00","exit":0,"sha256":"74fb6eb331c2391df74659d5f7f381e85fa5dcdc337b1db5e74cf8e68fcde143","lineas":11,"omitidas":0,"no_recomprobable":"estado del entorno al cierre; cambia con el tiempo"} -->
**Evidencia `verify-report.31`** · exit 0 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:28:57-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: estado del entorno al cierre; cambia con el tiempo

```bash
echo "--- contenedores (podman ps -a)"; podman ps -a --format '{{.ID}} {{.Image}} {{.Status}}'; echo "(vacio = ninguno)"
echo "--- procesos workerd/astro/podman run/fake-smtp"; pgrep -af 'workerd|astro preview|podman run|fake-smtp|chrome-linux64' | /usr/bin/grep -v pgrep; echo "pgrep exit=$? (1 = ninguno)"
echo "--- puertos 4321 y 2525 y 4300-4399 en escucha"; ss -ltn | /usr/bin/grep -E ':4321|:2525|:43[0-9][0-9]'; echo "grep exit=$? (1 = ninguno)"
echo "--- worktree: archivos sin versionar del arbol de la app (.dev.vars no debe existir)"
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman && git status --short -- log-atm-web-astro .gitattributes; ls log-atm-web-astro/.dev.vars 2>&1
echo "--- repo principal intacto (rama y estado)"; git -C /home/kapridoo/projects/log-atm-web-astro status --short | head -5
```

```text
--- contenedores (podman ps -a)
(vacio = ninguno)
--- procesos workerd/astro/podman run/fake-smtp
pgrep exit=1 (1 = ninguno)
--- puertos 4321 y 2525 y 4300-4399 en escucha
grep exit=1 (1 = ninguno)
--- worktree: archivos sin versionar del arbol de la app (.dev.vars no debe existir)
ls: cannot access 'log-atm-web-astro/.dev.vars': No such file or directory
--- repo principal intacto (rama y estado)
?? memory/auditoria-specs-vs-codigo-2026-07-05.md
?? memory/validacion-auditoria-2026-10-02.md
```
<!-- evidencia:fin verify-report.31 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.32","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:31:13-03:00","exit":1,"sha256":"898ab0eb60ba574f1b1c04008c75305eb174185b6542b3da669fadf71d561f69","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este informe"} -->
**Evidencia `verify-report.32`** · exit 1 · 1 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:31:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/apply-evidence.md","bloques":50,"comprobados":29,"calzan":["apply-evidence.1","apply-evidence.2","apply-evidence.3","apply-evidence.6","apply-evidence.7","apply-evidence.8","apply-evidence.9","apply-evidence.12","apply-evidence.18","apply-evidence.19","apply-evidence.21","apply-evidence.24","apply-evidence.25","apply-evidence.29","apply-evidence.30","apply-evidence.31","apply-evidence.37","apply-evidence.39","apply-evidence.40","apply-evidence.41","apply-evidence.42","apply-evidence.43","apply-evidence.44","apply-evidence.45","apply-evidence.46","apply-evidence.47","apply-evidence.48"],"no_calzan":[{"id":"apply-evidence.10","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.11","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.4","motivo":"fixture ef\u00edmero bajo el directorio de temporales del despacho, que se borra al cerrar la fase"},{"id":"apply-evidence.5","motivo":"fixture ef\u00edmero bajo el directorio de temporales del despacho, que se borra al cerrar la fase"},{"id":"apply-evidence.13","motivo":"copia aislada ef\u00edmera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"},{"id":"apply-evidence.14","motivo":"copia aislada ef\u00edmera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"},{"id":"apply-evidence.15","motivo":"copia aislada ef\u00edmera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"},{"id":"apply-evidence.16","motivo":"copia aislada ef\u00edmera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"},{"id":"apply-evidence.17","motivo":"copia aisla…(+2142 caracteres)
```
<!-- evidencia:fin verify-report.32 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.33","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\necho \"antes: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')\"\nnode scripts/axe-audit.mjs \u003e/dev/null 2\u003e&1 &\nP=$!\nsleep 8\necho \"workerd/chrome en ejecucion antes de SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[c]hrome-linux64')\"\nkill -INT $P; wait $P; echo \"exit tras SIGINT: $?\"\nsleep 3\necho \"despues (3 s): $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')\"\nps -eo pid,stat,args | /usr/bin/grep -E '[w]orkerd|[a]stro preview|[c]hrome-linux64' | cut -c1-120\nss -ltn | /usr/bin/grep -E ':43[0-9][0-9]|:4321|:5[0-9]{4}' ; echo \"ss grep exit=$? (1 = sin puertos de servidor)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey","head":null,"fecha":"2026-10-06T19:31:40-03:00","exit":0,"sha256":"90ce15cb12301a109fd282d3b06a5677b2762af2ccd56c0dff17f8cb68571714","lineas":6,"omitidas":0,"no_recomprobable":"interrupcion con SIGINT; una sola vez"} -->
**Evidencia `verify-report.33`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:31:40-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-verify-cuqfyxey`
No re-comprobable: interrupcion con SIGINT; una sola vez

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro || exit 9
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
echo "antes: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')"
node scripts/axe-audit.mjs >/dev/null 2>&1 &
P=$!
sleep 8
echo "workerd/chrome en ejecucion antes de SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[c]hrome-linux64')"
kill -INT $P; wait $P; echo "exit tras SIGINT: $?"
sleep 3
echo "despues (3 s): $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')"
ps -eo pid,stat,args | /usr/bin/grep -E '[w]orkerd|[a]stro preview|[c]hrome-linux64' | cut -c1-120
ss -ltn | /usr/bin/grep -E ':43[0-9][0-9]|:4321|:5[0-9]{4}' ; echo "ss grep exit=$? (1 = sin puertos de servidor)"
```

```text
antes: 1
workerd/chrome en ejecucion antes de SIGINT: 13
exit tras SIGINT: 130
despues (3 s): 1
3359720 Ss   /bin/zsh -c source /home/kapridoo/.claude/shell-snapshots/snapshot-zsh-1791168531417-e7297d.sh 2>/dev/null 
ss grep exit=1 (1 = sin puertos de servidor)
```
<!-- evidencia:fin verify-report.33 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.34","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"aa19357281da61a0a6e767315a81de8d37201b17","fecha":"2026-10-06T19:31:44-03:00","exit":0,"sha256":"f1fdba4a1a43e872e27a064ea6013c719cd9de87d0916b7cb6e86cca2cd1e0ef","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria este informe a si mismo"} -->
**Evidencia `verify-report.34`** · exit 0 · 1 líneas, 0 omitidas · HEAD `aa19357281da` · 2026-10-06T19:31:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`
No re-comprobable: re-ejecutarlo comprobaria este informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/memory/changes/chore-local-container-podman/verify-report.md","bloques":33,"comprobados":2,"calzan":["verify-report.2","verify-report.19"],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"fixture efimero en directorio de temporales; recrear no aporta"},{"id":"verify-report.3","motivo":"ninguna: lectura estatica del README, idempotente"},{"id":"verify-report.4","motivo":"ninguna: lectura estatica, idempotente"},{"id":"verify-report.5","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.6","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.7","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.8","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.9","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.10","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.11","motivo":"segunda corrida de la auditoria solo para resumir por regla; la salida es la de verify-report.10"},{"id":"verify-report.12","motivo":"la construccion con la credencial canary corre una sola vez"},{"id":"verify-report.13","motivo":"construccion sin cache de una sola vez; consume minutos de red"},{"id":"verify-report.14","motivo":"inspeccion de imagen una sola vez; escribe y borra temporales"},{"id":"verify-report.15","motivo":"inspeccion de imagen una sola vez; escribe y borra temporales"},{"id":"verify-report.16","motivo":"intento unico de ejecucion sin credenciales"},{"id":"verify-report.17","motivo":"ejecucion unica del contenedor con credencial canary; efimero"},{"id":"verify-report.18","motivo":"ejecucion unica del contenedor con credencial canary; efimero"},{…(+1217 caracteres)
```
<!-- evidencia:fin verify-report.34 -->
