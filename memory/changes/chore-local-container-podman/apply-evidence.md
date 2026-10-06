---
type: apply-evidence
change_name: "chore-local-container-podman"
created: "2026-10-06"
tags: [apply-evidence]
---

# Apply evidence: chore-local-container-podman

El proyecto no tiene framework de tests: la evidencia es la ejecución de cada comando,
registrada con `evidence_block.py registrar`. Los comandos que escriben en el repositorio
(`npm ci`, `npm install`, `npm run build`, `podman build`) se ejecutan fuera del registro; se
registran los comandos de lectura que muestran su resultado. Las pruebas que mutan código o
crean credenciales falsas corren en copias aisladas bajo el directorio de temporales del
despacho; sus bloques llevan `--no-recomprobable` porque la copia se borra al terminar.

## Tarea 1 — `.gitattributes` con `merge=union` (commit `a89d8c7`)

Los bloques `apply-evidence.1` y `apply-evidence.2` muestran el atributo del registro de
observaciones y de un archivo del vault que no es append-only. El bloque `apply-evidence.3`
muestra que el commit de la tarea contiene solo `.gitattributes`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["git","check-attr","merge","memory/observations.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"bb49f39c031a360d50be5486cd99834682c2f311","fecha":"2026-10-06T18:45:44-03:00","exit":0,"sha256":"829ff732f86c66632d7c7c5684ea18bf5829780760e14c79f2d04707f67c578d","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 0 · 1 líneas, 0 omitidas · HEAD `bb49f39c031a` · 2026-10-06T18:45:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```text
git check-attr merge memory/observations.md
```

```text
memory/observations.md: merge: union
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["git","check-attr","merge","memory/_profile.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"bb49f39c031a360d50be5486cd99834682c2f311","fecha":"2026-10-06T18:45:44-03:00","exit":0,"sha256":"24ea064861c08997a8a45242d156415e6ccdbe84afeda02081947e9b0b278c4e","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 1 líneas, 0 omitidas · HEAD `bb49f39c031a` · 2026-10-06T18:45:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```text
git check-attr merge memory/_profile.md
```

```text
memory/_profile.md: merge: unspecified
```
<!-- evidencia:fin apply-evidence.2 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["git","show","--stat","--format=%s","a89d8c7"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"bb49f39c031a360d50be5486cd99834682c2f311","fecha":"2026-10-06T18:45:44-03:00","exit":0,"sha256":"dd27eb56d6611890f94e1185ab9a6ae4dfd6800fd0a18d39c4b79b7711476255","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 0 · 4 líneas, 0 omitidas · HEAD `bb49f39c031a` · 2026-10-06T18:45:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```text
git show --stat --format=%s a89d8c7
```

```text
chore(repo): merge memory/observations.md with the union driver

 .gitattributes | 5 +++++
 1 file changed, 5 insertions(+)
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"archivo","argv":null,"texto":"# Repo de prueba: unión en observations.md, conflicto en una spec, sin config local merge.*\nset -u\nD=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/merge-fixture.XXXXXXXX)\ng() { git -C \"$D\" -c user.name=t -c user.email=t@t \"$@\"; }\ng init -q -b main\nmkdir -p \"$D/memory/specs/x\"\ncp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/.gitattributes \"$D/.gitattributes\"\nprintf '# Observations\\n\\n- base\\n' \u003e \"$D/memory/observations.md\"\nprintf 'title: original\\n' \u003e \"$D/memory/specs/x/y.md\"\ng add -A && g commit -q -m base\ng checkout -q -b obs-a && printf -- '- entrada A\\n' \u003e\u003e \"$D/memory/observations.md\" && g commit -q -am a\ng checkout -q main && g checkout -q -b obs-b && printf -- '- entrada B\\n' \u003e\u003e \"$D/memory/observations.md\" && g commit -q -am b\ng checkout -q obs-a\necho \"== fusión obs-b en obs-a (observations.md)\"\ng merge -q --no-edit obs-b; echo \"exit merge: $?\"\ncat \"$D/memory/observations.md\"\ng checkout -q main && g checkout -q -b spec-a && printf 'title: A\\n' \u003e \"$D/memory/specs/x/y.md\" && g commit -q -am sa\ng checkout -q main && g checkout -q -b spec-b && printf 'title: B\\n' \u003e \"$D/memory/specs/x/y.md\" && g commit -q -am sb\necho \"== fusión spec-b en spec-a (spec, misma línea)\"\ng merge -q --no-edit spec-b 2\u003e&1; echo \"exit merge: $?\"\ng merge --abort\necho \"== config local merge.* (vacío esperado)\"\ngit -C \"$D\" config --local --get-regexp '^merge\\.'; echo \"exit config: $?\"\nrm -rf \"$D\"\necho \"== repo de prueba borrado: $(test -e \"$D\" && echo no || echo sí)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w","head":null,"fecha":"2026-10-06T18:45:56-03:00","exit":0,"sha256":"0dee5ec2a90d567abde074b1c716be280b31e230d2ad792587d10e8215e77d19","lineas":14,"omitidas":0,"no_recomprobable":"fixture efímero bajo el directorio de temporales del despacho, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.4`** · exit 0 · 14 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:45:56-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w`
No re-comprobable: fixture efímero bajo el directorio de temporales del despacho, que se borra al cerrar la fase

```bash
# Repo de prueba: unión en observations.md, conflicto en una spec, sin config local merge.*
set -u
D=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/merge-fixture.XXXXXXXX)
g() { git -C "$D" -c user.name=t -c user.email=t@t "$@"; }
g init -q -b main
mkdir -p "$D/memory/specs/x"
cp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/.gitattributes "$D/.gitattributes"
printf '# Observations\n\n- base\n' > "$D/memory/observations.md"
printf 'title: original\n' > "$D/memory/specs/x/y.md"
g add -A && g commit -q -m base
g checkout -q -b obs-a && printf -- '- entrada A\n' >> "$D/memory/observations.md" && g commit -q -am a
g checkout -q main && g checkout -q -b obs-b && printf -- '- entrada B\n' >> "$D/memory/observations.md" && g commit -q -am b
g checkout -q obs-a
echo "== fusión obs-b en obs-a (observations.md)"
g merge -q --no-edit obs-b; echo "exit merge: $?"
cat "$D/memory/observations.md"
g checkout -q main && g checkout -q -b spec-a && printf 'title: A\n' > "$D/memory/specs/x/y.md" && g commit -q -am sa
g checkout -q main && g checkout -q -b spec-b && printf 'title: B\n' > "$D/memory/specs/x/y.md" && g commit -q -am sb
echo "== fusión spec-b en spec-a (spec, misma línea)"
g merge -q --no-edit spec-b 2>&1; echo "exit merge: $?"
g merge --abort
echo "== config local merge.* (vacío esperado)"
git -C "$D" config --local --get-regexp '^merge\.'; echo "exit config: $?"
rm -rf "$D"
echo "== repo de prueba borrado: $(test -e "$D" && echo no || echo sí)"
```

```text
== fusión obs-b en obs-a (observations.md)
Auto-merging memory/observations.md
exit merge: 0
# Observations

- base
- entrada A
- entrada B
== fusión spec-b en spec-a (spec, misma línea)
exit merge: 0
== config local merge.* (vacío esperado)
exit config: 1
== repo de prueba borrado: sí
fatal: There is no merge to abort (MERGE_HEAD missing).
```
<!-- evidencia:fin apply-evidence.4 -->

El bloque `apply-evidence.4` tiene un error del fixture, no del cambio: la segunda fusión se
ejecutó con `spec-b` como rama activa (falta `checkout spec-a`), así que fusionó la rama
consigo misma. El bloque `apply-evidence.5` repite el fixture corregido.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"archivo","argv":null,"texto":"# Repo de prueba: unión en observations.md, conflicto en una spec, sin config local merge.*\nset -u\nD=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/merge-fixture.XXXXXXXX)\ng() { git -C \"$D\" -c user.name=t -c user.email=t@t \"$@\"; }\ng init -q -b main\nmkdir -p \"$D/memory/specs/x\"\ncp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/.gitattributes \"$D/.gitattributes\"\nprintf '# Observations\\n\\n- base\\n' \u003e \"$D/memory/observations.md\"\nprintf 'title: original\\n' \u003e \"$D/memory/specs/x/y.md\"\ng add -A && g commit -q -m base\ng checkout -q -b obs-a && printf -- '- entrada A\\n' \u003e\u003e \"$D/memory/observations.md\" && g commit -q -am a\ng checkout -q main && g checkout -q -b obs-b && printf -- '- entrada B\\n' \u003e\u003e \"$D/memory/observations.md\" && g commit -q -am b\ng checkout -q obs-a\necho \"== fusión obs-b en obs-a (observations.md)\"\ng merge -q --no-edit obs-b; echo \"exit merge: $?\"\ncat \"$D/memory/observations.md\"\ng checkout -q main && g checkout -q -b spec-a && printf 'title: A\\n' \u003e \"$D/memory/specs/x/y.md\" && g commit -q -am sa\ng checkout -q main && g checkout -q -b spec-b && printf 'title: B\\n' \u003e \"$D/memory/specs/x/y.md\" && g commit -q -am sb\ng checkout -q spec-a\necho \"== fusión spec-b en spec-a (spec, misma línea)\"\ng merge -q --no-edit spec-b 2\u003e&1; echo \"exit merge: $?\"\ng merge --abort\necho \"== config local merge.* (vacío esperado)\"\ngit -C \"$D\" config --local --get-regexp '^merge\\.'; echo \"exit config: $?\"\nrm -rf \"$D\"\necho \"== repo de prueba borrado: $(test -e \"$D\" && echo no || echo sí)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w","head":null,"fecha":"2026-10-06T18:46:07-03:00","exit":0,"sha256":"a14af7c516ad468f898b7072efba0570fe9d34e0195a4be77cbdcabd86579e89","lineas":16,"omitidas":0,"no_recomprobable":"fixture efímero bajo el directorio de temporales del despacho, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.5`** · exit 0 · 16 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:46:07-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w`
No re-comprobable: fixture efímero bajo el directorio de temporales del despacho, que se borra al cerrar la fase

```bash
# Repo de prueba: unión en observations.md, conflicto en una spec, sin config local merge.*
set -u
D=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/merge-fixture.XXXXXXXX)
g() { git -C "$D" -c user.name=t -c user.email=t@t "$@"; }
g init -q -b main
mkdir -p "$D/memory/specs/x"
cp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/.gitattributes "$D/.gitattributes"
printf '# Observations\n\n- base\n' > "$D/memory/observations.md"
printf 'title: original\n' > "$D/memory/specs/x/y.md"
g add -A && g commit -q -m base
g checkout -q -b obs-a && printf -- '- entrada A\n' >> "$D/memory/observations.md" && g commit -q -am a
g checkout -q main && g checkout -q -b obs-b && printf -- '- entrada B\n' >> "$D/memory/observations.md" && g commit -q -am b
g checkout -q obs-a
echo "== fusión obs-b en obs-a (observations.md)"
g merge -q --no-edit obs-b; echo "exit merge: $?"
cat "$D/memory/observations.md"
g checkout -q main && g checkout -q -b spec-a && printf 'title: A\n' > "$D/memory/specs/x/y.md" && g commit -q -am sa
g checkout -q main && g checkout -q -b spec-b && printf 'title: B\n' > "$D/memory/specs/x/y.md" && g commit -q -am sb
g checkout -q spec-a
echo "== fusión spec-b en spec-a (spec, misma línea)"
g merge -q --no-edit spec-b 2>&1; echo "exit merge: $?"
g merge --abort
echo "== config local merge.* (vacío esperado)"
git -C "$D" config --local --get-regexp '^merge\.'; echo "exit config: $?"
rm -rf "$D"
echo "== repo de prueba borrado: $(test -e "$D" && echo no || echo sí)"
```

```text
== fusión obs-b en obs-a (observations.md)
Auto-merging memory/observations.md
exit merge: 0
# Observations

- base
- entrada A
- entrada B
== fusión spec-b en spec-a (spec, misma línea)
Auto-merging memory/specs/x/y.md
CONFLICT (content): Merge conflict in memory/specs/x/y.md
Automatic merge failed; fix conflicts and then commit the result.
exit merge: 1
== config local merge.* (vacío esperado)
exit config: 1
== repo de prueba borrado: sí
```
<!-- evidencia:fin apply-evidence.5 -->

## Tarea 2 — Fusión de `observations.md` en un repo de prueba (sin commit: solo evidencia)

El bloque `apply-evidence.5` muestra la fusión de las dos ramas que agregan al final del
registro con salida 0 y ambas entradas presentes; la fusión de dos ramas que editan la misma
línea de una spec termina en `CONFLICT (content)`; `git config --local --get-regexp '^merge\.'`
no imprime nada (exit 1 = sin coincidencias), así que la regla viene solo de `.gitattributes`;
el repo de prueba queda borrado.


## Tareas 3, 4 y 7 — Dependencias, script `a11y` y reescritura de `axe-audit.mjs` (commit `a5cb95f`)

`playwright-core@^1.63.0` y `axe-core@^4.14.0` quedan en `devDependencies`, el script
`a11y` vale `node scripts/axe-audit.mjs` y `build` no cambia (bloque `apply-evidence.6`).
`jsdom` no aparece en `scripts/` ni en `package.json` (bloque `apply-evidence.7`, exit 1 de
`grep` = sin coincidencias). La cabecera del script documenta el estado final con movimiento
reducido (Tarea 7) y ambos contextos fijan `reducedMotion: 'reduce'` sin bandera que lo anule
(bloque `apply-evidence.8`).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["node","-e","const p=require(\"./package.json\");console.log(JSON.stringify({build:p.scripts.build,a11y:p.scripts.a11y,\"playwright-core\":p.devDependencies[\"playwright-core\"],\"axe-core\":p.devDependencies[\"axe-core\"]}))"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"a5cb95f41059bd39f9ad94ca1750d9003a68cb31","fecha":"2026-10-06T18:50:02-03:00","exit":0,"sha256":"e9fa44863b0e93bc0771277d7a1ee94be12daf0881741b3a067e29f39dfd258f","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.6`** · exit 0 · 1 líneas, 0 omitidas · HEAD `a5cb95f41059` · 2026-10-06T18:50:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
node -e 'const p=require("./package.json");console.log(JSON.stringify({build:p.scripts.build,a11y:p.scripts.a11y,"playwright-core":p.devDependencies["playwright-core"],"axe-core":p.devDependencies["axe-core"]}))'
```

```text
{"build":"astro build","a11y":"node scripts/axe-audit.mjs","playwright-core":"^1.63.0","axe-core":"^4.14.0"}
```
<!-- evidencia:fin apply-evidence.6 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["grep","-rn","jsdom","scripts","package.json"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"a5cb95f41059bd39f9ad94ca1750d9003a68cb31","fecha":"2026-10-06T18:50:03-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.7`** · exit 1 · 0 líneas, 0 omitidas · HEAD `a5cb95f41059` · 2026-10-06T18:50:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
grep -rn jsdom scripts package.json
```

```text
```
<!-- evidencia:fin apply-evidence.7 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["grep","-nE","reducedMotion|NO_REDUCED|process.argv","scripts/axe-audit.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"a5cb95f41059bd39f9ad94ca1750d9003a68cb31","fecha":"2026-10-06T18:50:03-03:00","exit":0,"sha256":"f0b790d210016b503121693fba08ba616ec875145edf5d44ace898e4badf0f07","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.8`** · exit 0 · 3 líneas, 0 omitidas · HEAD `a5cb95f41059` · 2026-10-06T18:50:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
grep -nE 'reducedMotion|NO_REDUCED|process.argv' scripts/axe-audit.mjs
```

```text
14: * - Ambos contextos fijan `reducedMotion: 'reduce'`: se audita el estado final de cada página.
40:  { label: 'escritorio', options: { viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' } },
43:    options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
```
<!-- evidencia:fin apply-evidence.8 -->

## Tarea 5 — Cobertura, informe y exit codes (sin commit: solo evidencia)

Con el sitio compilado (`npm run build`, exit 0, fuera del registro porque escribe `dist/`),
el bloque `apply-evidence.9` es la corrida de `npm run a11y` con el Chrome local por
`CHROME_PATH`; muestra las primeras 40 líneas de hallazgos. El bloque `apply-evidence.10`
repite la corrida y resume: la línea de totales, el conteo por regla y tamaño, el conteo de
`color-contrast` y los procesos `workerd`/`astro preview` que quedan al terminar.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"a5cb95f41059bd39f9ad94ca1750d9003a68cb31","fecha":"2026-10-06T18:50:36-03:00","exit":1,"sha256":"a80aaa0001ee5b133e8abf3d1280c6b02aeb2aa1e9678c17b9bcffe77d11dee6","lineas":70,"omitidas":30,"no_recomprobable":null} -->
**Evidencia `apply-evidence.9`** · exit 1 · 70 líneas, 30 omitidas · HEAD `a5cb95f41059` · 2026-10-06T18:50:36-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
```
<!-- evidencia:fin apply-evidence.9 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"archivo","argv":null,"texto":"# Corre la auditoría y resume su salida; luego busca procesos huérfanos del servidor.\nO=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node scripts/axe-audit.mjs 2\u003e&1)\nRC=$?\necho \"exit auditoría: $RC\"\nprintf '%s\\n' \"$O\" | /usr/bin/grep '^Resumen:'\necho \"== hallazgos por tamaño y regla\"\nprintf '%s\\n' \"$O\" | /usr/bin/grep -oE '^\\[(escritorio|móvil)\\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c\necho \"== líneas color-contrast: $(printf '%s\\n' \"$O\" | /usr/bin/grep -c ' color-contrast ')\"\nsleep 1\necho \"== procesos workerd / astro preview tras terminar: $(pgrep -f 'workerd|astro preview' | /usr/bin/grep -vc \"^$$\\$\")\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"a5cb95f41059bd39f9ad94ca1750d9003a68cb31","fecha":"2026-10-06T18:51:01-03:00","exit":0,"sha256":"7f8c4da4af4bddd23b59a03aed66707f1fe8c1e51eeb55aef5618cc05e893964","lineas":7,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.10`** · exit 0 · 7 líneas, 0 omitidas · HEAD `a5cb95f41059` · 2026-10-06T18:51:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Corre la auditoría y resume su salida; luego busca procesos huérfanos del servidor.
O=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node scripts/axe-audit.mjs 2>&1)
RC=$?
echo "exit auditoría: $RC"
printf '%s\n' "$O" | /usr/bin/grep '^Resumen:'
echo "== hallazgos por tamaño y regla"
printf '%s\n' "$O" | /usr/bin/grep -oE '^\[(escritorio|móvil)\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c
echo "== líneas color-contrast: $(printf '%s\n' "$O" | /usr/bin/grep -c ' color-contrast ')"
sleep 1
echo "== procesos workerd / astro preview tras terminar: $(pgrep -f 'workerd|astro preview' | /usr/bin/grep -vc "^$$\$")"
```

```text
exit auditoría: 1
Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
== hallazgos por tamaño y regla
     42 [escritorio] label-content-name-mismatch
     21 [móvil] label-content-name-mismatch
== líneas color-contrast: 0
== procesos workerd / astro preview tras terminar: 1
```
<!-- evidencia:fin apply-evidence.10 -->

El conteo de procesos del bloque `apply-evidence.10` (1) es un `workerd` en estado
`<defunct>` observado en el instante en que el script retornaba: el script enviaba
`SIGTERM` al grupo y salía sin esperar. El commit `6e64c26` hace que el script espere (hasta
5 s) a que el servidor termine antes de informar. El bloque `apply-evidence.11` repite el
resumen con el script corregido y además interrumpe una corrida con `SIGINT` a los 8 s
(exit 130) y comprueba que no quedan `workerd`, `astro preview` ni Chrome.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"archivo","argv":null,"texto":"# Corre la auditoría y resume su salida; luego busca procesos huérfanos del servidor.\nCP=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nO=$(CHROME_PATH=$CP node scripts/axe-audit.mjs 2\u003e&1)\necho \"exit auditoría: $?\"\nprintf '%s\\n' \"$O\" | /usr/bin/grep '^Resumen:'\necho \"== hallazgos por tamaño y regla\"\nprintf '%s\\n' \"$O\" | /usr/bin/grep -oE '^\\[(escritorio|móvil)\\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c\necho \"== líneas color-contrast: $(printf '%s\\n' \"$O\" | /usr/bin/grep -c ' color-contrast ')\"\necho \"== procesos tras terminar: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')\"\necho \"== interrupción con SIGINT a los 8 s\"\nCHROME_PATH=$CP node scripts/axe-audit.mjs \u003e/dev/null 2\u003e&1 &\nP=$!\nsleep 8\necho \"workerd en ejecución antes de SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd')\"\nkill -INT $P\nwait $P\necho \"exit tras SIGINT: $?\"\nsleep 1\necho \"procesos tras SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6e64c26b4b0d636691f29460fccc475221f30281","fecha":"2026-10-06T18:53:12-03:00","exit":0,"sha256":"b292245f7ca1bc7fad1d2a360e66e6db0ad1c4e407e66596f556d311c0490592","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 11 líneas, 0 omitidas · HEAD `6e64c26b4b0d` · 2026-10-06T18:53:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Corre la auditoría y resume su salida; luego busca procesos huérfanos del servidor.
CP=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
O=$(CHROME_PATH=$CP node scripts/axe-audit.mjs 2>&1)
echo "exit auditoría: $?"
printf '%s\n' "$O" | /usr/bin/grep '^Resumen:'
echo "== hallazgos por tamaño y regla"
printf '%s\n' "$O" | /usr/bin/grep -oE '^\[(escritorio|móvil)\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c
echo "== líneas color-contrast: $(printf '%s\n' "$O" | /usr/bin/grep -c ' color-contrast ')"
echo "== procesos tras terminar: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')"
echo "== interrupción con SIGINT a los 8 s"
CHROME_PATH=$CP node scripts/axe-audit.mjs >/dev/null 2>&1 &
P=$!
sleep 8
echo "workerd en ejecución antes de SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd')"
kill -INT $P
wait $P
echo "exit tras SIGINT: $?"
sleep 1
echo "procesos tras SIGINT: $(ps -eo args | /usr/bin/grep -cE '[w]orkerd|[a]stro preview|[c]hrome-linux64')"
```

```text
exit auditoría: 1
Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
== hallazgos por tamaño y regla
     42 [escritorio] label-content-name-mismatch
     21 [móvil] label-content-name-mismatch
== líneas color-contrast: 0
== procesos tras terminar: 1
== interrupción con SIGINT a los 8 s
workerd en ejecución antes de SIGINT: 2
exit tras SIGINT: 130
procesos tras SIGINT: 1
```
<!-- evidencia:fin apply-evidence.11 -->

El conteo «1» del bloque `apply-evidence.11` es un falso positivo del método: `ps -eo args`
con un patrón de texto coincide con la línea de comandos del shell del agente que lanzó el
registro (contiene la palabra en su texto). El bloque `apply-evidence.12` filtra por nombre de
proceso (`comm` = `workerd` o `chrome`, o `node` con `astro preview`) y lista cada proceso que
encuentra.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"archivo","argv":null,"texto":"# Procesos del servidor y del navegador por nombre de proceso, tras una corrida completa y tras SIGINT.\nCP=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nvivos() { ps -eo comm=,args= | awk '$1==\"workerd\" || $1==\"chrome\" || ($1==\"node\" && /astro preview/)'; }\nCHROME_PATH=$CP node scripts/axe-audit.mjs \u003e/dev/null 2\u003e&1\necho \"exit auditoría completa: $?\"\necho \"procesos vivos tras terminar: $(vivos | wc -l)\"\nCHROME_PATH=$CP node scripts/axe-audit.mjs \u003e/dev/null 2\u003e&1 &\nP=$!\nsleep 8\necho \"workerd vivos antes de SIGINT: $(vivos | awk '$1==\"workerd\"' | wc -l | tr -d ' ' | sed 's/^0$/0/;s/^[1-9][0-9]*$/\u003e0/')\"\nkill -INT $P\nwait $P\necho \"exit tras SIGINT: $?\"\nsleep 1\necho \"procesos vivos tras SIGINT: $(vivos | wc -l)\"\nvivos\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6e64c26b4b0d636691f29460fccc475221f30281","fecha":"2026-10-06T18:54:02-03:00","exit":0,"sha256":"a7d1de5c991bded2fad3ba6ce0cd4d5574f8651e36d2bde2e062792307f34697","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.12`** · exit 0 · 5 líneas, 0 omitidas · HEAD `6e64c26b4b0d` · 2026-10-06T18:54:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Procesos del servidor y del navegador por nombre de proceso, tras una corrida completa y tras SIGINT.
CP=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
vivos() { ps -eo comm=,args= | awk '$1=="workerd" || $1=="chrome" || ($1=="node" && /astro preview/)'; }
CHROME_PATH=$CP node scripts/axe-audit.mjs >/dev/null 2>&1
echo "exit auditoría completa: $?"
echo "procesos vivos tras terminar: $(vivos | wc -l)"
CHROME_PATH=$CP node scripts/axe-audit.mjs >/dev/null 2>&1 &
P=$!
sleep 8
echo "workerd vivos antes de SIGINT: $(vivos | awk '$1=="workerd"' | wc -l | tr -d ' ' | sed 's/^0$/0/;s/^[1-9][0-9]*$/>0/')"
kill -INT $P
wait $P
echo "exit tras SIGINT: $?"
sleep 1
echo "procesos vivos tras SIGINT: $(vivos | wc -l)"
vivos
```

```text
exit auditoría completa: 1
procesos vivos tras terminar: 0
workerd vivos antes de SIGINT: >0
exit tras SIGINT: 130
procesos vivos tras SIGINT: 0
```
<!-- evidencia:fin apply-evidence.12 -->

## Tarea 6 — Errores de entorno y dependencias declaradas (sin commit: solo evidencia)

En una copia aislada (`git archive` de `6e64c26` bajo el directorio de temporales, con
`npm ci` desde cero y sin `chrome/` ni `dist/`): el bloque `apply-evidence.13` muestra que la
instalación limpia deja `playwright-core` y `axe-core` instalados; el bloque
`apply-evidence.14`, que sin `dist/` el script termina con exit 2 y pide `npm run build`.
Tras compilar la copia, el bloque `apply-evidence.15` muestra que sin `CHROME_PATH` y sin
`./chrome` termina con exit 2 y nombra `CHROME_PATH` y el comando de instalación, y el
bloque `apply-evidence.16`, que un `CHROME_PATH` inexistente termina con exit 2 y nombra la
variable.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["npm","ls","playwright-core","axe-core"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:54:34-03:00","exit":0,"sha256":"1546e12e33c537d6d0263c1ed803751cbf3db111104a594afed46ce98f822b57","lineas":4,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:54:34-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase

```text
npm ls playwright-core axe-core
```

```text
log-atm-web-astro@0.0.1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro
├── axe-core@4.14.0
└── playwright-core@1.63.0

```
<!-- evidencia:fin apply-evidence.13 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["env","-u","CHROME_PATH","npm","run","a11y"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:54:34-03:00","exit":2,"sha256":"74d62522078c0b7e9fc6fc07cfc54a2f4dfb9241c6e8817618bd21dfcaa79d97","lineas":5,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.14`** · exit 2 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:54:34-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase

```text
env -u CHROME_PATH npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Error: no hay contenido compilado del sitio. Compilá el sitio primero: npm run build
```
<!-- evidencia:fin apply-evidence.14 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"argv","argv":["env","-u","CHROME_PATH","npm","run","a11y"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:56:28-03:00","exit":2,"sha256":"7002155e5a25ed0164aab2559571c4eb9f46b68e638fcfeaaecb27dd717b7f7d","lineas":5,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.15`** · exit 2 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:56:28-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase

```text
env -u CHROME_PATH npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Error: no se encontró un navegador para la auditoría. Indicá su ruta con la variable de entorno CHROME_PATH o instalá Chrome en ./chrome con: npx @puppeteer/browsers install chrome@stable
```
<!-- evidencia:fin apply-evidence.15 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["env","CHROME_PATH=/ruta/inexistente/chrome","npm","run","a11y"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:56:29-03:00","exit":2,"sha256":"e000ce96627baa393a947fbef3923687750c246d5290f7cf20604f1e26be0bc1","lineas":5,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.16`** · exit 2 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:56:29-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase

```text
env CHROME_PATH=/ruta/inexistente/chrome npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Error: CHROME_PATH apunta a un archivo inexistente: /ruta/inexistente/chrome
```
<!-- evidencia:fin apply-evidence.16 -->

## Tarea 5 (continuación) — Mutación de contraste y página nueva en la copia aislada

En la misma copia se inyecta en `src/pages/nosotros.astro` un párrafo
`#mutacion-contraste` con `color:#cccccc` sobre `#ffffff` y se agrega la página
`src/pages/prueba-a11y.astro`, sin tocar `scripts/axe-audit.mjs`; la copia compila con 19
páginas. El bloque `apply-evidence.17` es la auditoría de la copia con `CHROME_PATH`, filtrada
a las líneas de `color-contrast`, de `/prueba-a11y/` y al resumen.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"archivo","argv":null,"texto":"# Auditoría de la copia mutada: líneas de color-contrast, de la página nueva y resumen.\nO=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node scripts/axe-audit.mjs 2\u003e&1)\necho \"exit auditoría: $?\"\nprintf '%s\\n' \"$O\" | /usr/bin/grep -E ' color-contrast |/prueba-a11y/|^Resumen:'\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:56:54-03:00","exit":0,"sha256":"84b113641623e93706aceb244de2b178a2eaf0489ba01a15aea75ea6694fec3d","lineas":8,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.17`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:56:54-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-a11y.9GZxfL5J/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6e64c26) bajo el directorio de temporales, que se borra al cerrar la fase

```bash
# Auditoría de la copia mutada: líneas de color-contrast, de la página nueva y resumen.
O=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node scripts/axe-audit.mjs 2>&1)
echo "exit auditoría: $?"
printf '%s\n' "$O" | /usr/bin/grep -E ' color-contrast |/prueba-a11y/|^Resumen:'
```

```text
exit auditoría: 1
[escritorio] /en/nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
[escritorio] /nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
[escritorio] /pt/nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
[móvil] /en/nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
[móvil] /nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
[móvil] /pt/nosotros/ color-contrast (serious) Elements must meet minimum color contrast ratio thresholds → #mutacion-contraste
Resumen: 44 auditorías (22 URLs × 2 tamaños: 19 páginas, 3 sondas 404) · 69 violaciones en 2 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin apply-evidence.17 -->

Lectura de la Tarea 5: la auditoría recorre 21 URLs (18 páginas + 3 sondas 404) en escritorio
y móvil, 42 auditorías, sin estados HTTP inesperados (bloques `apply-evidence.11` y
`apply-evidence.12`); cada hallazgo trae tamaño, URL, regla, impacto, ayuda y selector
(bloque `apply-evidence.9`). El sitio vigente tiene una violación existente,
`label-content-name-mismatch`, en el enlace de marca y en `#lang-trigger`, así que el comando
termina con exit 1; se registra como deuda al final de `memory/observations.md` y no se corrige
en este cambio. En la copia mutada (bloque `apply-evidence.17`) el texto inyectado aparece como
`color-contrast` con página, tamaño y selector `#mutacion-contraste` y exit 1, y la página nueva
entra al recorrido sin editar el script (19 páginas, 22 URLs, 44 auditorías).

## Tarea 7 — Estado final y contraste de portadas (sin commit propio: la cabecera va en `a5cb95f`)

La cabecera del script explica que se audita el estado final con movimiento reducido y por qué;
los dos contextos fijan `reducedMotion: 'reduce'` sin opción para anularlo (bloque
`apply-evidence.8`: el script no lee `process.argv`). Sobre el sitio vigente, las portadas `/`,
`/en/` y `/pt/` informan 0 violaciones `color-contrast` en escritorio y móvil: el bloque
`apply-evidence.11` muestra 0 líneas `color-contrast` en las 42 auditorías.


## Tarea 8 — `npm run check` con `@astrojs/check` y `typescript@^6` (commit `9122439`)

El bloque `apply-evidence.18` muestra el árbol de `typescript` y `@astrojs/check` resuelto
sin `invalid` ni advertencias de peer (`typescript@6.0.3` deduplicado). El script `check` vale
`astro check` y `build` sigue en `astro build` (bloque `apply-evidence.19`).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["npm","ls","typescript","@astrojs/check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:57:52-03:00","exit":0,"sha256":"9ebcfb25d91b7ee5c52be8f613fa6788ba1af2aef338c159ee940d86aa2a0413","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.18`** · exit 0 · 8 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:57:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
npm ls typescript @astrojs/check
```

```text
log-atm-web-astro@0.0.1 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro
├─┬ @astrojs/check@0.9.10
│ ├─┬ @astrojs/language-server@2.17.1
│ │ └─┬ @volar/kit@2.4.28
│ │   └── typescript@6.0.3 deduped
│ └── typescript@6.0.3 deduped
└── typescript@6.0.3

```
<!-- evidencia:fin apply-evidence.18 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["node","-e","const p=require(\"./package.json\");console.log(JSON.stringify({build:p.scripts.build,check:p.scripts.check,\"@astrojs/check\":p.devDependencies[\"@astrojs/check\"],typescript:p.devDependencies.typescript}))"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:57:52-03:00","exit":0,"sha256":"7c4f72b15fd11b9f41ca6192bce335d592bda4c677acb708903bfa33816e45f9","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.19`** · exit 0 · 1 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:57:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
node -e 'const p=require("./package.json");console.log(JSON.stringify({build:p.scripts.build,check:p.scripts.check,"@astrojs/check":p.devDependencies["@astrojs/check"],typescript:p.devDependencies.typescript}))'
```

```text
{"build":"astro build","check":"astro check","@astrojs/check":"^0.9.10","typescript":"^6.0.3"}
```
<!-- evidencia:fin apply-evidence.19 -->

## Tarea 9 [TDD] — Corrección de los cuatro errores de tipos en su origen

**RED** (bloque `apply-evidence.20`, sobre `9122439`, antes de corregir): `npm run check`
informa los 4 errores esperados —TS2353 `platformProxy`, TS7031 `logger`, TS2307
`cloudflare:workers` y TS2322 del `timer`— y termina con exit distinto de cero.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"archivo","argv":null,"texto":"# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.\nO=$(npm run check 2\u003e&1)\nRC=$?\nprintf '%s\\n' \"$O\" | sed 's/\\x1b\\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'\necho \"exit npm run check: $RC\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:57:59-03:00","exit":0,"sha256":"27d6a6f5285225f739878404031ca9d36166a27ff7668d25521c27286b8eaed3","lineas":9,"omitidas":0,"no_recomprobable":"RED previo a la corrección: el árbol final ya no tiene estos errores"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 9 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:57:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: RED previo a la corrección: el árbol final ya no tiene estos errores

```bash
# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.
O=$(npm run check 2>&1)
RC=$?
printf '%s\n' "$O" | sed 's/\x1b\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'
echo "exit npm run check: $RC"
```

```text
astro.config.mjs:51:5 - error ts(2353): Object literal may only specify known properties, and 'platformProxy' does not exist in type 'Options'.
astro.config.mjs:21:31 - error ts(7031): Binding element 'logger' implicitly has an 'any' type.
src/lib/mailer.ts:2:30 - error ts(2307): Cannot find module 'cloudflare:workers' or its corresponding type declarations.
src/scripts/gsap-ind-directory.ts:99:5 - error ts(2322): Type 'number' is not assignable to type 'Timeout'.
Result (50 files): 
- 4 errors
- 0 warnings
- 0 hints
exit npm run check: 1
```
<!-- evidencia:fin apply-evidence.20 -->

**GREEN** (bloque `apply-evidence.21`): con `src/types/cloudflare-workers.d.ts` (script ambient
que declara `cloudflare:workers` con `env: Record<string, unknown>`), sin `platformProxy` en el
adapter, con el JSDoc `@returns {import('astro').AstroIntegration}` en `i18nValidator` y con
`timer: number | null`, `npm run check` informa 0 errores sobre 51 archivos y exit 0. El JSDoc
de `resolveMailEnv` nombra el plugin de Vite de Cloudflare; el código de la función no cambia.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"archivo","argv":null,"texto":"# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.\nO=$(npm run check 2\u003e&1)\nRC=$?\nprintf '%s\\n' \"$O\" | sed 's/\\x1b\\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'\necho \"exit npm run check: $RC\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:58:37-03:00","exit":0,"sha256":"31e2559922cf2d218c69c8bbd0e00b37ce3805461fb9dc7be1f709f224048a5d","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.21`** · exit 0 · 5 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:58:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.
O=$(npm run check 2>&1)
RC=$?
printf '%s\n' "$O" | sed 's/\x1b\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'
echo "exit npm run check: $RC"
```

```text
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints
exit npm run check: 0
```
<!-- evidencia:fin apply-evidence.21 -->

**Mutación** (bloque `apply-evidence.22`): con el nombre del módulo declarado cambiado a
`cloudflare:workers-mutado` en `src/types/cloudflare-workers.d.ts`, `npm run check` vuelve a
rojo con TS2307 en `src/lib/mailer.ts`. La mutación se deshace con la edición inversa (bloque
`apply-evidence.23`: el archivo no difiere de la versión corregida) y no entra en ningún commit.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"archivo","argv":null,"texto":"# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.\nO=$(npm run check 2\u003e&1)\nRC=$?\nprintf '%s\\n' \"$O\" | sed 's/\\x1b\\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'\necho \"exit npm run check: $RC\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:58:45-03:00","exit":0,"sha256":"a92f48ff9f44645dccca2bd067ea14e3b41c41b2f812947d77b10c8de7a42f82","lineas":5,"omitidas":0,"no_recomprobable":"mutación deshecha con la edición inversa; el árbol final no la contiene"} -->
**Evidencia `apply-evidence.22`** · exit 0 · 5 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:58:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: mutación deshecha con la edición inversa; el árbol final no la contiene

```bash
# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.
O=$(npm run check 2>&1)
RC=$?
printf '%s\n' "$O" | sed 's/\x1b\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'
echo "exit npm run check: $RC"
```

```text
src/lib/mailer.ts:2:30 - error ts(2307): Cannot find module 'cloudflare:workers' or its corresponding type declarations.
Result (51 files): 
- 0 warnings
- 0 hints
exit npm run check: 1
```
<!-- evidencia:fin apply-evidence.22 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["cmp","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/cf-backup.d.ts","src/types/cloudflare-workers.d.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"91224398f2e7e8fb395b6640aefc78fbe37d877c","fecha":"2026-10-06T18:58:45-03:00","exit":0,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":"comparación contra el respaldo temporal tomado antes de la mutación, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.23`** · exit 0 · 0 líneas, 0 omitidas · HEAD `91224398f2e7` · 2026-10-06T18:58:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: comparación contra el respaldo temporal tomado antes de la mutación, que se borra al cerrar la fase

```text
cmp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/cf-backup.d.ts src/types/cloudflare-workers.d.ts
```

```text
```
<!-- evidencia:fin apply-evidence.23 -->

Commit de la Tarea 9: `69df563`.

## Tarea 10 — Criterios de la verificación de tipos (sin commit: solo evidencia)

El bloque `apply-evidence.24` cuenta las supresiones (`@ts-ignore`, `@ts-expect-error`,
`@ts-nocheck`) en `src/` y `astro.config.mjs` en la base `main` (`3a49528`) y en `HEAD`: la
cifra no cambia. El bloque `apply-evidence.25` muestra que `tsconfig.json` y
`src/types/globals.d.ts` no difieren de la base. En una copia aislada (`git archive` de
`69df563`, `npm ci` desde cero): el bloque `apply-evidence.26` muestra el registro de `npm ci`
sin líneas de peer, `invalid` ni `ERESOLVE` y el árbol de `typescript` y `@astrojs/check`; con
un error deliberado (`export const errorDeliberado: number = 'texto';` en
`src/i18n/utils.ts`), el bloque `apply-evidence.27` muestra `npm run check` en rojo con la
ubicación del error.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"archivo","argv":null,"texto":"# Supresiones de tipos en src/ y astro.config.mjs: base main (3a49528) frente a HEAD.\nfor REV in 3a49528 HEAD; do\n  N=$(git grep -nE '@ts-ignore|@ts-expect-error|@ts-nocheck' \"$REV\" -- log-atm-web-astro/src log-atm-web-astro/astro.config.mjs | wc -l)\n  echo \"$REV: $N supresiones\"\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"69df5638ad2e2bf2d3db4b754eb4343cedb17daf","fecha":"2026-10-06T18:59:19-03:00","exit":0,"sha256":"9baae1ebe559402c82f5d5d6a79941de82f91c010761d75a20d8259e59de3d8d","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.24`** · exit 0 · 2 líneas, 0 omitidas · HEAD `69df5638ad2e` · 2026-10-06T18:59:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Supresiones de tipos en src/ y astro.config.mjs: base main (3a49528) frente a HEAD.
for REV in 3a49528 HEAD; do
  N=$(git grep -nE '@ts-ignore|@ts-expect-error|@ts-nocheck' "$REV" -- log-atm-web-astro/src log-atm-web-astro/astro.config.mjs | wc -l)
  echo "$REV: $N supresiones"
done
```

```text
3a49528: 0 supresiones
HEAD: 0 supresiones
```
<!-- evidencia:fin apply-evidence.24 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"argv","argv":["git","diff","--stat","3a49528","HEAD","--","log-atm-web-astro/tsconfig.json","log-atm-web-astro/src/types/globals.d.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"69df5638ad2e2bf2d3db4b754eb4343cedb17daf","fecha":"2026-10-06T18:59:19-03:00","exit":0,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.25`** · exit 0 · 0 líneas, 0 omitidas · HEAD `69df5638ad2e` · 2026-10-06T18:59:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```text
git diff --stat 3a49528 HEAD -- log-atm-web-astro/tsconfig.json log-atm-web-astro/src/types/globals.d.ts
```

```text
```
<!-- evidencia:fin apply-evidence.25 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.26","forma":"archivo","argv":null,"texto":"# Advertencias del npm ci desde cero de la copia y árbol de typescript / @astrojs/check.\necho \"líneas de peer/invalid/ERESOLVE en el registro de npm ci: $(/usr/bin/grep -ciE 'peer|invalid|ERESOLVE' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/c2-npmci.log)\"\nnpm ls typescript @astrojs/check\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:59:19-03:00","exit":0,"sha256":"5dfd97df536854452600e479f17574d9072ad3f6d4e5192b047381da18385e2d","lineas":9,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.26`** · exit 0 · 9 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:59:19-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase

```bash
# Advertencias del npm ci desde cero de la copia y árbol de typescript / @astrojs/check.
echo "líneas de peer/invalid/ERESOLVE en el registro de npm ci: $(/usr/bin/grep -ciE 'peer|invalid|ERESOLVE' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/c2-npmci.log)"
npm ls typescript @astrojs/check
```

```text
líneas de peer/invalid/ERESOLVE en el registro de npm ci: 0
log-atm-web-astro@0.0.1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro
├─┬ @astrojs/check@0.9.10
│ ├─┬ @astrojs/language-server@2.17.1
│ │ └─┬ @volar/kit@2.4.28
│ │   └── typescript@6.0.3 deduped
│ └── typescript@6.0.3 deduped
└── typescript@6.0.3

```
<!-- evidencia:fin apply-evidence.26 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.27","forma":"archivo","argv":null,"texto":"# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.\nO=$(npm run check 2\u003e&1)\nRC=$?\nprintf '%s\\n' \"$O\" | sed 's/\\x1b\\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'\necho \"exit npm run check: $RC\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro","head":null,"fecha":"2026-10-06T18:59:27-03:00","exit":0,"sha256":"79e75000447b5604dccf45a5e6421ce27c7891093cb2da5443d6694ea36b8336","lineas":5,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.27`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T18:59:27-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase

```bash
# Ejecuta npm run check y muestra los diagnósticos y el resultado, sin colores ni marcas de tiempo.
O=$(npm run check 2>&1)
RC=$?
printf '%s\n' "$O" | sed 's/\x1b\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors|warnings|hints)'
echo "exit npm run check: $RC"
```

```text
src/i18n/utils.ts:171:14 - error ts(2322): Type 'string' is not assignable to type 'number'.
Result (51 files): 
- 0 warnings
- 0 hints
exit npm run check: 1
```
<!-- evidencia:fin apply-evidence.27 -->

## Tarea 12 — La compilación no depende de la verificación de tipos (sin commit: solo evidencia)

`build` vale exactamente `astro build` y `check` es un script propio (bloque
`apply-evidence.19`). En la copia aislada con el error deliberado de la Tarea 10, el bloque
`apply-evidence.28` compila con exit 0 mientras `npm run check` de la misma copia termina en
rojo (bloque `apply-evidence.27`). En el worktree, tras quitar `platformProxy`, `npm run build`
termina con exit 0 (fuera del registro: escribe `dist/`) y el bloque `apply-evidence.29`
cuenta 18 archivos `*.html` en `dist/client`, el Worker en `dist/server` y el config de
`astro preview`; la API de contacto y la 404 del Worker se verifican sobre el contenedor en la
Tarea 16.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.28","forma":"archivo","argv":null,"texto":"# Compila la copia con el error de tipos deliberado; muestra el error en el fuente y el resultado.\n/usr/bin/grep -n 'errorDeliberado' src/i18n/utils.ts\nnpm run build \u003e /dev/null 2\u003e&1\necho \"exit npm run build: $?\"\necho \"páginas html: $(find dist/client -name '*.html' | wc -l)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:01:17-03:00","exit":0,"sha256":"bfefa301a4f73017bde592273b487ba3ed2a115dda3adc0a771116a6ac4e4057","lineas":3,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.28`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:01:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-tipos.yYWF9GpJ/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 69df563) bajo el directorio de temporales, que se borra al cerrar la fase

```bash
# Compila la copia con el error de tipos deliberado; muestra el error en el fuente y el resultado.
/usr/bin/grep -n 'errorDeliberado' src/i18n/utils.ts
npm run build > /dev/null 2>&1
echo "exit npm run build: $?"
echo "páginas html: $(find dist/client -name '*.html' | wc -l)"
```

```text
171:export const errorDeliberado: number = 'texto';
exit npm run build: 0
páginas html: 18
```
<!-- evidencia:fin apply-evidence.28 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.29","forma":"archivo","argv":null,"texto":"# Contenido del build del worktree: páginas, Worker y config de astro preview.\necho \"páginas html en dist/client: $(find dist/client -name '*.html' | wc -l)\"\nfor f in dist/server/entry.mjs dist/server/wrangler.json .wrangler/deploy/config.json; do\n  test -f \"$f\" && echo \"existe: $f\" || echo \"falta: $f\"\ndone\necho \"chunks del Worker (API y 404):\"; ls dist/server/chunks | /usr/bin/grep -E \"^(contacto|cotizacion|cotizacion-rapida|404)_\" | sed -E \"s/_[^_]+\\.mjs$//\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"69df5638ad2e2bf2d3db4b754eb4343cedb17daf","fecha":"2026-10-06T19:01:39-03:00","exit":0,"sha256":"0fc4021c029e4353641dbfc72c3898ae5b5a94227eaa91890e7db0b4ad5115c2","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.29`** · exit 0 · 9 líneas, 0 omitidas · HEAD `69df5638ad2e` · 2026-10-06T19:01:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Contenido del build del worktree: páginas, Worker y config de astro preview.
echo "páginas html en dist/client: $(find dist/client -name '*.html' | wc -l)"
for f in dist/server/entry.mjs dist/server/wrangler.json .wrangler/deploy/config.json; do
  test -f "$f" && echo "existe: $f" || echo "falta: $f"
done
echo "chunks del Worker (API y 404):"; ls dist/server/chunks | /usr/bin/grep -E "^(contacto|cotizacion|cotizacion-rapida|404)_" | sed -E "s/_[^_]+\.mjs$//"
```

```text
páginas html en dist/client: 18
existe: dist/server/entry.mjs
existe: dist/server/wrangler.json
existe: .wrangler/deploy/config.json
chunks del Worker (API y 404):
404
contacto
cotizacion
cotizacion-rapida
```
<!-- evidencia:fin apply-evidence.29 -->

## Tarea 11 — `## Stack` del perfil (commit `10a8e07`)

`### Dev Tools` de `memory/_profile.md` lista `@astrojs/check@^0.9.10`, `typescript@^6.0.3`,
`playwright-core@^1.63.0` y `axe-core@^4.14.0`, los rangos de `package.json` (bloques
`apply-evidence.6` y `apply-evidence.19`); el commit solo toca esa sección.

## Tareas 13, 14 y 15 — `Containerfile`, `.containerignore` y scripts (commit `6ff4c84`)

El `Containerfile` sigue el contrato de D1 (un stage `node:22-slim`, `npm ci`, `COPY . .`,
`npm run build`, `EXPOSE 4321`, `CMD` en forma exec con `astro preview --host :: --port 4321`)
con los tres comentarios en español y sin copiar `.dev.vars`. `.containerignore` excluye las
diez entradas de D2 y re-incluye `.dev.vars.example`. El bloque `apply-evidence.30` muestra los
dos scripts con su valor exacto y `package.json` como JSON válido.

## Tarea 16 — Paridad del contenedor con producción (sin commit: solo evidencia)

El bloque `apply-evidence.31` muestra Podman en modo rootless. `npm run container:build` en el
worktree termina con exit 0 (bloque `apply-evidence.32`, con la caché de la primera
construcción, que tardó 2 min 13 s). El bloque `apply-evidence.33` ejecuta
`npm run container:run` desde `src/` de una copia aislada (`git archive` de `6ff4c84`) con un
`.dev.vars` de prueba: el montaje usa la ruta absoluta de la raíz de la app; las portadas
responden 200 en `127.0.0.1` y `localhost`; las tres rutas inexistentes responden 404 con el
título de la página de «no encontrado» de su idioma, distinto del de la portada; el `POST`
inválido responde 400 `application/json` con el error de validación; tras detenerlo no
quedan contenedores ni el puerto 4321 abierto.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.30","forma":"argv","argv":["node","-e","const p=require(\"./package.json\");console.log(p.scripts[\"container:build\"]);console.log(p.scripts[\"container:run\"])"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6ff4c84f0266df3c434e71b370dd74a308fb2897","fecha":"2026-10-06T19:05:20-03:00","exit":0,"sha256":"c1dc5cebe2c195a1e504e094af53bef2db45cf9f667f10d30d1740c5e13b1e53","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.30`** · exit 0 · 2 líneas, 0 omitidas · HEAD `6ff4c84f0266` · 2026-10-06T19:05:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
node -e 'const p=require("./package.json");console.log(p.scripts["container:build"]);console.log(p.scripts["container:run"])'
```

```text
podman build -t log-atm-web -f Containerfile .
podman run --rm --init -p 4321:4321 -v "$PWD/.dev.vars:/app/dist/server/.dev.vars:ro" log-atm-web
```
<!-- evidencia:fin apply-evidence.30 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.31","forma":"argv","argv":["podman","info","--format","{{.Host.Security.Rootless}}"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6ff4c84f0266df3c434e71b370dd74a308fb2897","fecha":"2026-10-06T19:05:20-03:00","exit":0,"sha256":"a17fcf0a2f50e2d495e4f90ce263410edc183add6c62699a2facbccf60410f74","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.31`** · exit 0 · 1 líneas, 0 omitidas · HEAD `6ff4c84f0266` · 2026-10-06T19:05:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
podman info --format '{{.Host.Security.Rootless}}'
```

```text
true
```
<!-- evidencia:fin apply-evidence.31 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.32","forma":"argv","argv":["npm","run","container:build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6ff4c84f0266df3c434e71b370dd74a308fb2897","fecha":"2026-10-06T19:05:21-03:00","exit":0,"sha256":"a2c2604ffaad66ca4da6091458df2d5ef22b0bfdc6e9232708d4f0f6df824b21","lineas":29,"omitidas":0,"no_recomprobable":"salida de podman build con identificadores de capa y caché que cambian en cada construcción"} -->
**Evidencia `apply-evidence.32`** · exit 0 · 29 líneas, 0 omitidas · HEAD `6ff4c84f0266` · 2026-10-06T19:05:21-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: salida de podman build con identificadores de capa y caché que cambian en cada construcción

```text
npm run container:build
```

```text

> log-atm-web-astro@0.0.1 container:build
> podman build -t log-atm-web -f Containerfile .

STEP 1/8: FROM docker.io/library/node:22-slim
STEP 2/8: WORKDIR /app
--> Using cache 031d6cce642e449a5eca50881a339b3ea77485d5437340a4da6d959dc6868940
--> 031d6cce642e
STEP 3/8: COPY package.json package-lock.json ./
--> Using cache d4ca2f6378d98a553f4d8cac3bb6bd0459c3a41be6b83a0c624147b427c1aff5
--> d4ca2f6378d9
STEP 4/8: RUN npm ci
--> Using cache d62873ce45782aa09bda571ee67f8d01cfccc2618b73463cb12ab05da91a6430
--> d62873ce4578
STEP 5/8: COPY . .
--> Using cache 92bbe4e2c77fd582795cb76ff7eec603a1878a8f0c9ef9301af051534862c95b
--> 92bbe4e2c77f
STEP 6/8: RUN npm run build
--> Using cache 0167b1fc895fa51a75299c1573ba056acb3ac682c23bdba7ec9b41eedba66b41
--> 0167b1fc895f
STEP 7/8: EXPOSE 4321
--> Using cache 1dad077bf69c7830401677528c74695610271e15c7dd87834c2d86f5ee3d9d55
--> 1dad077bf69c
STEP 8/8: CMD ["/app/node_modules/.bin/astro", "preview", "--host", "::", "--port", "4321"]
--> Using cache 75cb75b54c4c14db4f4beb77bdd07d5aa846afb8a5693c9d5dc8e2778b136beb
COMMIT log-atm-web
--> 75cb75b54c4c
Successfully tagged localhost/log-atm-web:latest
75cb75b54c4c14db4f4beb77bdd07d5aa846afb8a5693c9d5dc8e2778b136beb
```
<!-- evidencia:fin apply-evidence.32 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.33","forma":"archivo","argv":null,"texto":"# Ejecuta npm run container:run desde src/ de la copia (con .dev.vars de prueba) y prueba el sitio.\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro/src\nLOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)\nnpm run container:run \u003e \"$LOG\" 2\u003e&1 &\nNPID=$!\nfor i in $(seq 1 120); do\n  [ \"$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)\" = 200 ] && break\n  sleep 0.5\ndone\necho \"== montaje del contenedor (ruta absoluta del origen)\"\npodman inspect --format '{{range .Mounts}}{{.Source}} -\u003e {{.Destination}} rw={{.RW}}{{end}}' $(podman ps -q --filter ancestor=localhost/log-atm-web)\necho \"== portadas\"\nfor H in 127.0.0.1 localhost; do for P in / /en/ /pt/; do\n  echo \"$H$P -\u003e $(curl -s -o /dev/null -w '%{http_code}' http://$H:4321$P)\"\ndone; done\necho \"== rutas inexistentes (código y <title\u003e)\"\nfor P in /no-existe /en/no-existe /pt/no-existe; do\n  echo \"$P -\u003e $(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.html -w '%{http_code}' http://localhost:4321$P) $(grep -o '<title\u003e[^<]*</title\u003e' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.html)\"\ndone\necho \"portada / -\u003e $(curl -s http://localhost:4321/ | grep -o '<title\u003e[^<]*</title\u003e')\"\necho \"== POST /api/contacto con cuerpo inválido\"\ncurl -s -D - -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.json -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:4321/api/contacto | grep -iE '^HTTP|^content-type'\ncat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.json; echo\necho \"== detener el contenedor\"\npodman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) \u003e /dev/null\nwait $NPID\necho \"exit npm run container:run tras detener: $?\"\necho \"contenedores (podman ps -a): $(podman ps -aq | wc -l)\"\necho \"puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)\"\nrm -f \"$LOG\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:05:24-03:00","exit":0,"sha256":"c7b92d43876bbf6e3c42f562f8c48bb0f7668eeebf483f6aed3c5f18358645c6","lineas":22,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars de prueba, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.33`** · exit 0 · 22 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:05:24-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars de prueba, que se borra al cerrar la fase

```bash
# Ejecuta npm run container:run desde src/ de la copia (con .dev.vars de prueba) y prueba el sitio.
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro/src
LOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)
npm run container:run > "$LOG" 2>&1 &
NPID=$!
for i in $(seq 1 120); do
  [ "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)" = 200 ] && break
  sleep 0.5
done
echo "== montaje del contenedor (ruta absoluta del origen)"
podman inspect --format '{{range .Mounts}}{{.Source}} -> {{.Destination}} rw={{.RW}}{{end}}' $(podman ps -q --filter ancestor=localhost/log-atm-web)
echo "== portadas"
for H in 127.0.0.1 localhost; do for P in / /en/ /pt/; do
  echo "$H$P -> $(curl -s -o /dev/null -w '%{http_code}' http://$H:4321$P)"
done; done
echo "== rutas inexistentes (código y <title>)"
for P in /no-existe /en/no-existe /pt/no-existe; do
  echo "$P -> $(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.html -w '%{http_code}' http://localhost:4321$P) $(grep -o '<title>[^<]*</title>' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.html)"
done
echo "portada / -> $(curl -s http://localhost:4321/ | grep -o '<title>[^<]*</title>')"
echo "== POST /api/contacto con cuerpo inválido"
curl -s -D - -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.json -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:4321/api/contacto | grep -iE '^HTTP|^content-type'
cat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/body.json; echo
echo "== detener el contenedor"
podman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) > /dev/null
wait $NPID
echo "exit npm run container:run tras detener: $?"
echo "contenedores (podman ps -a): $(podman ps -aq | wc -l)"
echo "puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)"
rm -f "$LOG"
```

```text
== montaje del contenedor (ruta absoluta del origen)
/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro/.dev.vars -> /app/dist/server/.dev.vars rw=false
== portadas
127.0.0.1/ -> 200
127.0.0.1/en/ -> 200
127.0.0.1/pt/ -> 200
localhost/ -> 200
localhost/en/ -> 200
localhost/pt/ -> 200
== rutas inexistentes (código y <title>)
/no-existe -> 404 <title>Página no encontrada | LOG ATM</title>
/en/no-existe -> 404 <title>Page not found | LOG ATM</title>
/pt/no-existe -> 404 <title>Página não encontrada | LOG ATM</title>
portada / -> <title>Logística Aérea y Marítima | LOG ATM</title>
== POST /api/contacto con cuerpo inválido
HTTP/1.1 400 Bad Request�
content-type: application/json; charset=utf-8�
{"ok":false,"error":"validation","fields":{"name":"Requerido.","email":"Requerido."}}
== detener el contenedor
exit npm run container:run tras detener: 0
contenedores (podman ps -a): 0
puerto 4321 escuchando: 0
```
<!-- evidencia:fin apply-evidence.33 -->

## Tarea 17 — Aislamiento de secretos (sin commit: solo evidencia)

La copia de la Tarea 16 tiene un `.dev.vars` falso con `SMTP_HOST=127.0.0.1`, `SMTP_PORT=1` y
`SMTP_PASS=FAKE_SECRET_<aleatorio>`. El bloque `apply-evidence.34` construye la imagen con
`npm run container:build` en esa copia y barre el valor: 0 coincidencias en
`podman history --no-trunc`, 0 en `podman inspect`, ningún archivo de la imagen lo contiene
(`grep -rl` termina en 1) y la imagen no tiene `.dev.vars` en `/app` ni en `/app/dist/server`.
Nota de proceso: el script del barrido se ejecutó una vez antes de registrarlo (mismo
resultado); la corrida registrada reutiliza la caché de esa construcción.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.34","forma":"archivo","argv":null,"texto":"# Construye la imagen en la copia con el .dev.vars falso presente y barre historial, metadatos y sistema de archivos.\necho \"valor buscado: FAKE_SECRET_ac59d9d3808b6af82226fa42 (presente en .dev.vars de la copia: $(grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42' .dev.vars))\"\nnpm run container:build \u003e /dev/null 2\u003e&1\necho \"exit npm run container:build: $?\"\necho \"coincidencias en podman history --no-trunc: $(podman history --no-trunc log-atm-web | grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42')\"\necho \"coincidencias en podman inspect: $(podman inspect log-atm-web | grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42')\"\necho \"archivos con el valor en la imagen:\"\npodman run --rm --entrypoint grep log-atm-web -rl 'FAKE_SECRET_ac59d9d3808b6af82226fa42' / --exclude-dir=proc --exclude-dir=sys --exclude-dir=dev\necho \"exit grep en la imagen (1 = sin coincidencias): $?\"\necho \"¿.dev.vars dentro de la imagen?: $(podman run --rm --entrypoint sh log-atm-web -c 'ls -a /app /app/dist/server | grep -c \"^.dev.vars$\"')\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:05:47-03:00","exit":0,"sha256":"b171857084a9dbc9988b9698f855985a6d45841133f3a55c886b148b586b91b6","lineas":7,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.34`** · exit 0 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:05:47-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase

```bash
# Construye la imagen en la copia con el .dev.vars falso presente y barre historial, metadatos y sistema de archivos.
echo "valor buscado: FAKE_SECRET_ac59d9d3808b6af82226fa42 (presente en .dev.vars de la copia: $(grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42' .dev.vars))"
npm run container:build > /dev/null 2>&1
echo "exit npm run container:build: $?"
echo "coincidencias en podman history --no-trunc: $(podman history --no-trunc log-atm-web | grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42')"
echo "coincidencias en podman inspect: $(podman inspect log-atm-web | grep -c 'FAKE_SECRET_ac59d9d3808b6af82226fa42')"
echo "archivos con el valor en la imagen:"
podman run --rm --entrypoint grep log-atm-web -rl 'FAKE_SECRET_ac59d9d3808b6af82226fa42' / --exclude-dir=proc --exclude-dir=sys --exclude-dir=dev
echo "exit grep en la imagen (1 = sin coincidencias): $?"
echo "¿.dev.vars dentro de la imagen?: $(podman run --rm --entrypoint sh log-atm-web -c 'ls -a /app /app/dist/server | grep -c "^.dev.vars$"')"
```

```text
valor buscado: FAKE_SECRET_ac59d9d3808b6af82226fa42 (presente en .dev.vars de la copia: 1)
exit npm run container:build: 0
coincidencias en podman history --no-trunc: 0
coincidencias en podman inspect: 0
archivos con el valor en la imagen:
exit grep en la imagen (1 = sin coincidencias): 1
¿.dev.vars dentro de la imagen?: 0
```
<!-- evidencia:fin apply-evidence.34 -->

El bloque `apply-evidence.35` ejecuta `npm run container:run` en la copia (montaje `:ro` del
`.dev.vars` falso) y envía un `POST /api/contacto` válido: el log del contenedor muestra el
error de la API y cuenta las líneas `Missing env var` y las que nombran `127.0.0.1:1`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.35","forma":"archivo","argv":null,"texto":"# Ejecuta el contenedor con el .dev.vars falso montado :ro y envía un contacto válido.\nLOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)\nnpm run container:run \u003e \"$LOG\" 2\u003e&1 &\nNPID=$!\nfor i in $(seq 1 120); do\n  [ \"$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)\" = 200 ] && break\n  sleep 0.5\ndone\necho \"== POST /api/contacto válido\"\ncurl -s -w ' (HTTP %{http_code})\\n' -X POST -H 'Content-Type: application/json' -d '{\"name\":\"Prueba\",\"email\":\"prueba@example.com\",\"message\":\"Hola\"}' http://127.0.0.1:4321/api/contacto\nsleep 1\npodman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) \u003e /dev/null\nwait $NPID\necho \"== log del contenedor desde el error de /api/contacto\"\nsed -n '/\\[\\/api\\/contacto\\]/,+12p' \"$LOG\" | sed 's/\\x1b\\[[0-9;]*m//g'\necho \"== líneas 'Missing env var' en el log: $(grep -c 'Missing env var' \"$LOG\")\"\necho \"== líneas que nombran 127.0.0.1:1 en el log: $(grep -cE '127\\.0\\.0\\.1:1\\b|127\\.0\\.0\\.1.*\\b1\\b' \"$LOG\")\"\necho \"contenedores tras detener: $(podman ps -aq | wc -l)\"\nrm -f \"$LOG\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:06:04-03:00","exit":0,"sha256":"78937d308381a3951198ef8765752b4984f63661bd01727f67bcbb1e498fad70","lineas":8,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.35`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:06:04-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase

```bash
# Ejecuta el contenedor con el .dev.vars falso montado :ro y envía un contacto válido.
LOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)
npm run container:run > "$LOG" 2>&1 &
NPID=$!
for i in $(seq 1 120); do
  [ "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)" = 200 ] && break
  sleep 0.5
done
echo "== POST /api/contacto válido"
curl -s -w ' (HTTP %{http_code})\n' -X POST -H 'Content-Type: application/json' -d '{"name":"Prueba","email":"prueba@example.com","message":"Hola"}' http://127.0.0.1:4321/api/contacto
sleep 1
podman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) > /dev/null
wait $NPID
echo "== log del contenedor desde el error de /api/contacto"
sed -n '/\[\/api\/contacto\]/,+12p' "$LOG" | sed 's/\x1b\[[0-9;]*m//g'
echo "== líneas 'Missing env var' en el log: $(grep -c 'Missing env var' "$LOG")"
echo "== líneas que nombran 127.0.0.1:1 en el log: $(grep -cE '127\.0\.0\.1:1\b|127\.0\.0\.1.*\b1\b' "$LOG")"
echo "contenedores tras detener: $(podman ps -aq | wc -l)"
rm -f "$LOG"
```

```text
== POST /api/contacto válido
{"ok":false,"error":"server"} (HTTP 500)
== log del contenedor desde el error de /api/contacto
[/api/contacto] error: [Error: proxy request failed, cannot connect to the specified address]
POST /api/contacto 500 Internal Server Error (9ms)
== líneas 'Missing env var' en el log: 0
== líneas que nombran 127.0.0.1:1 en el log: 1
contenedores tras detener: 0
```
<!-- evidencia:fin apply-evidence.35 -->

El conteo «127.0.0.1:1» del bloque `apply-evidence.35` usa una expresión demasiado laxa y no
prueba nada por sí solo; la prueba es el mensaje del error: con el archivo montado, la API
supera la lectura de `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` y `MAIL_TO` (0 líneas
`Missing env var`) y falla al conectar con la dirección configurada
(`cannot connect to the specified address`; el `.dev.vars` falso apunta a `127.0.0.1:1`, donde
nada escucha). El bloque `apply-evidence.36` es el contraste: el mismo envío con un archivo
montado que omite `SMTP_PASS` falla con `Missing env var: SMTP_PASS`, así que los valores que
la API usa vienen del archivo montado en la ejecución.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.36","forma":"archivo","argv":null,"texto":"# Contraste: mismo envío con un .dev.vars montado que omite SMTP_PASS; la credencial viene del archivo montado.\nF=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/devvars-sin-pass.XXXXXXXX)\ngrep -v '^SMTP_PASS=' .dev.vars \u003e \"$F\"\necho \"claves del archivo montado: $(cut -d= -f1 \"$F\" | tr '\\n' ' ')\"\nLOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)\npodman run --rm --init -p 4321:4321 -v \"$F:/app/dist/server/.dev.vars:ro\" log-atm-web \u003e \"$LOG\" 2\u003e&1 &\nNPID=$!\nfor i in $(seq 1 120); do\n  [ \"$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)\" = 200 ] && break\n  sleep 0.5\ndone\ncurl -s -w ' (HTTP %{http_code})\\n' -X POST -H 'Content-Type: application/json' -d '{\"name\":\"Prueba\",\"email\":\"prueba@example.com\",\"message\":\"Hola\"}' http://127.0.0.1:4321/api/contacto\nsleep 1\npodman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) \u003e /dev/null\nwait $NPID\necho \"== log del contenedor desde el error de /api/contacto\"\nsed -n '/\\[\\/api\\/contacto\\]/,+2p' \"$LOG\" | sed 's/\\x1b\\[[0-9;]*m//g'\necho \"contenedores tras detener: $(podman ps -aq | wc -l)\"\nrm -f \"$LOG\" \"$F\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:06:23-03:00","exit":0,"sha256":"168e4624fd8f73b466922fc05c4ca2d3eed980b157f1757878807a2942775a83","lineas":7,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.36`** · exit 0 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:06:23-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6ff4c84) con .dev.vars falso, que se borra al cerrar la fase

```bash
# Contraste: mismo envío con un .dev.vars montado que omite SMTP_PASS; la credencial viene del archivo montado.
F=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/devvars-sin-pass.XXXXXXXX)
grep -v '^SMTP_PASS=' .dev.vars > "$F"
echo "claves del archivo montado: $(cut -d= -f1 "$F" | tr '\n' ' ')"
LOG=$(mktemp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/run-log.XXXXXXXX)
podman run --rm --init -p 4321:4321 -v "$F:/app/dist/server/.dev.vars:ro" log-atm-web > "$LOG" 2>&1 &
NPID=$!
for i in $(seq 1 120); do
  [ "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4321/)" = 200 ] && break
  sleep 0.5
done
curl -s -w ' (HTTP %{http_code})\n' -X POST -H 'Content-Type: application/json' -d '{"name":"Prueba","email":"prueba@example.com","message":"Hola"}' http://127.0.0.1:4321/api/contacto
sleep 1
podman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) > /dev/null
wait $NPID
echo "== log del contenedor desde el error de /api/contacto"
sed -n '/\[\/api\/contacto\]/,+2p' "$LOG" | sed 's/\x1b\[[0-9;]*m//g'
echo "contenedores tras detener: $(podman ps -aq | wc -l)"
rm -f "$LOG" "$F"
```

```text
claves del archivo montado: SMTP_HOST SMTP_PORT SMTP_SECURE SMTP_USER MAIL_TO 
{"ok":false,"error":"server"} (HTTP 500)
== log del contenedor desde el error de /api/contacto
[/api/contacto] error: Error: Missing env var: SMTP_PASS
    at require_ (file:///app/dist/server/chunks/email-templates_DtyDaGEM.mjs:415:18)
    at sendMail (file:///app/dist/server/chunks/email-templates_DtyDaGEM.mjs:421:16)
contenedores tras detener: 0
```
<!-- evidencia:fin apply-evidence.36 -->

El bloque `apply-evidence.37` ejecuta `npm run container:run` en el worktree, donde no existe
`.dev.vars`: Podman rechaza el montaje con un error `statfs` y exit distinto de cero, y no
queda ningún contenedor creado ni el puerto abierto.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.37","forma":"archivo","argv":null,"texto":"# Sin .dev.vars en la raíz de la app: npm run container:run debe fallar sin crear contenedor.\necho \"¿existe .dev.vars?: $(test -e .dev.vars && echo sí || echo no)\"\ntimeout 60 npm run container:run 2\u003e&1 | sed -E 's/[0-9a-f]{64}/<id\u003e/g'\necho \"exit npm run container:run: ${PIPESTATUS[0]}\"\necho \"contenedores (podman ps -a): $(podman ps -aq | wc -l)\"\necho \"puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"6ff4c84f0266df3c434e71b370dd74a308fb2897","fecha":"2026-10-06T19:06:31-03:00","exit":0,"sha256":"d09eccdca72a1715da3262323bd37a7547da7095d96201eb9e9b91f89545fc62","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.37`** · exit 0 · 9 líneas, 0 omitidas · HEAD `6ff4c84f0266` · 2026-10-06T19:06:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Sin .dev.vars en la raíz de la app: npm run container:run debe fallar sin crear contenedor.
echo "¿existe .dev.vars?: $(test -e .dev.vars && echo sí || echo no)"
timeout 60 npm run container:run 2>&1 | sed -E 's/[0-9a-f]{64}/<id>/g'
echo "exit npm run container:run: ${PIPESTATUS[0]}"
echo "contenedores (podman ps -a): $(podman ps -aq | wc -l)"
echo "puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)"
```

```text
¿existe .dev.vars?: no

> log-atm-web-astro@0.0.1 container:run
> podman run --rm --init -p 4321:4321 -v "$PWD/.dev.vars:/app/dist/server/.dev.vars:ro" log-atm-web

Error: statfs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro/.dev.vars: no such file or directory
exit npm run container:run: 125
contenedores (podman ps -a): 0
puerto 4321 escuchando: 0
```
<!-- evidencia:fin apply-evidence.37 -->

## Tarea 18 — Comandos y ciclo de reconstrucción (sin commit: solo evidencia)

El bloque `apply-evidence.38` ejecuta, desde `src/` de la copia, `npm run container:build` y
`npm run container:run` (200 en `/` con el título vigente); luego cambia el título de la
portada en `src/i18n/translations/es.json`, vuelve a ejecutar los mismos dos comandos sin
limpiar nada entre medio (el `--rm` ya retiró el contenedor anterior) y la portada responde 200
con el cambio visible. Al terminar no quedan contenedores ni el puerto abierto.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.38","forma":"archivo","argv":null,"texto":"# Ciclo construir → ejecutar → cambio trivial → reconstruir → ejecutar, todo desde src/ de la copia.\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro/src\nejecutar() {\n  npm run container:run \u003e /dev/null 2\u003e&1 &\n  NPID=$!\n  for i in $(seq 1 120); do\n    [ \"$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321/)\" = 200 ] && break\n    sleep 0.5\n  done\n  echo \"GET / -\u003e $(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/home.html -w '%{http_code}' http://localhost:4321/) $(grep -o '<title\u003e[^<]*</title\u003e' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/home.html)\"\n  podman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) \u003e /dev/null\n  wait $NPID\n  echo \"contenedores tras detener: $(podman ps -aq | wc -l)\"\n}\nnpm run container:build \u003e /dev/null 2\u003e&1; echo \"== construcción 1: exit $?\"\nejecutar\nsed -i 's/\"title\": \"Logística Aérea y Marítima\",/\"title\": \"Logística Aérea y Marítima RECONSTRUIDA\",/' ../src/i18n/translations/es.json\necho \"== cambio trivial: $(grep -c 'RECONSTRUIDA' ../src/i18n/translations/es.json) línea en es.json\"\nnpm run container:build \u003e /dev/null 2\u003e&1; echo \"== construcción 2: exit $?\"\nejecutar\necho \"puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro","head":null,"fecha":"2026-10-06T19:08:37-03:00","exit":0,"sha256":"a8046a55597e40bb15bca760f347eaee2750effe1ba0e4b9263ac9d71ba14511","lineas":8,"omitidas":0,"no_recomprobable":"copia aislada efímera (git archive del commit 6ff4c84) mutada por el propio ciclo, que se borra al cerrar la fase"} -->
**Evidencia `apply-evidence.38`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T19:08:37-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro`
No re-comprobable: copia aislada efímera (git archive del commit 6ff4c84) mutada por el propio ciclo, que se borra al cerrar la fase

```bash
# Ciclo construir → ejecutar → cambio trivial → reconstruir → ejecutar, todo desde src/ de la copia.
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/copia-contenedor.sDLSZgsf/log-atm-web-astro/src
ejecutar() {
  npm run container:run > /dev/null 2>&1 &
  NPID=$!
  for i in $(seq 1 120); do
    [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4321/)" = 200 ] && break
    sleep 0.5
  done
  echo "GET / -> $(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/home.html -w '%{http_code}' http://localhost:4321/) $(grep -o '<title>[^<]*</title>' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-local-container-podman/sdd-apply-0q6szf6w/home.html)"
  podman stop -t 5 $(podman ps -q --filter ancestor=localhost/log-atm-web) > /dev/null
  wait $NPID
  echo "contenedores tras detener: $(podman ps -aq | wc -l)"
}
npm run container:build > /dev/null 2>&1; echo "== construcción 1: exit $?"
ejecutar
sed -i 's/"title": "Logística Aérea y Marítima",/"title": "Logística Aérea y Marítima RECONSTRUIDA",/' ../src/i18n/translations/es.json
echo "== cambio trivial: $(grep -c 'RECONSTRUIDA' ../src/i18n/translations/es.json) línea en es.json"
npm run container:build > /dev/null 2>&1; echo "== construcción 2: exit $?"
ejecutar
echo "puerto 4321 escuchando: $(ss -ltnH 'sport = :4321' | wc -l)"
```

```text
== construcción 1: exit 0
GET / -> 200 <title>Logística Aérea y Marítima | LOG ATM</title>
contenedores tras detener: 0
== cambio trivial: 1 línea en es.json
== construcción 2: exit 0
GET / -> 200 <title>Logística Aérea y Marítima RECONSTRUIDA | LOG ATM</title>
contenedores tras detener: 0
puerto 4321 escuchando: 0
```
<!-- evidencia:fin apply-evidence.38 -->

## Tarea 19 — Menciones a Cloudflare Pages (commit `5be9818`)

El bloque `apply-evidence.39` busca «Cloudflare Pages» en `log-atm-web-astro/` (sin
`node_modules` ni `dist`) y en la raíz del repo (sin `memory/`, `.sdd/`, `.git`): 0
resultados en ambos alcances, y muestra las líneas que ahora nombran Cloudflare Workers en
`astro.config.mjs` y `.dev.vars.example`. El bloque `apply-evidence.40` muestra que las líneas
de `.dev.vars.example` que no son comentario no cambian respecto de la base.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.39","forma":"archivo","argv":null,"texto":"# Menciones a Cloudflare Pages en los dos alcances y menciones a Cloudflare Workers en los dos archivos.\necho \"log-atm-web-astro/: $(/usr/bin/grep -rn 'Cloudflare Pages' --exclude-dir=node_modules --exclude-dir=dist log-atm-web-astro | wc -l) resultados\"\necho \"raíz del repo: $(/usr/bin/grep -rn 'Cloudflare Pages' --exclude-dir=memory --exclude-dir=.sdd --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist . | wc -l) resultados\"\n/usr/bin/grep -n 'Cloudflare Workers' log-atm-web-astro/astro.config.mjs log-atm-web-astro/.dev.vars.example\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"928caa08010b4f0bc78369663f44ed13f53df27f","fecha":"2026-10-06T19:10:02-03:00","exit":0,"sha256":"a5af833e4aebfac830766d3d554d3518b2657ba57ec9b615f5ade56971649222","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.39`** · exit 0 · 4 líneas, 0 omitidas · HEAD `928caa08010b` · 2026-10-06T19:10:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Menciones a Cloudflare Pages en los dos alcances y menciones a Cloudflare Workers en los dos archivos.
echo "log-atm-web-astro/: $(/usr/bin/grep -rn 'Cloudflare Pages' --exclude-dir=node_modules --exclude-dir=dist log-atm-web-astro | wc -l) resultados"
echo "raíz del repo: $(/usr/bin/grep -rn 'Cloudflare Pages' --exclude-dir=memory --exclude-dir=.sdd --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist . | wc -l) resultados"
/usr/bin/grep -n 'Cloudflare Workers' log-atm-web-astro/astro.config.mjs log-atm-web-astro/.dev.vars.example
```

```text
log-atm-web-astro/: 0 resultados
raíz del repo: 0 resultados
log-atm-web-astro/astro.config.mjs:14: * entornos sin loader TS en runtime (p. ej. el build alojado de Cloudflare Workers Builds), donde
log-atm-web-astro/.dev.vars.example:3:# En Cloudflare Workers (producción) estas variables se configuran en el dashboard del Worker.
```
<!-- evidencia:fin apply-evidence.39 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.40","forma":"archivo","argv":null,"texto":"# Líneas de .dev.vars.example que no son comentario: base main (3a49528) frente a HEAD.\ndiff <(git show 3a49528:log-atm-web-astro/.dev.vars.example | /usr/bin/grep -v '^#') <(git show HEAD:log-atm-web-astro/.dev.vars.example | /usr/bin/grep -v '^#')\necho \"exit diff (0 = idénticas): $?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"928caa08010b4f0bc78369663f44ed13f53df27f","fecha":"2026-10-06T19:10:02-03:00","exit":0,"sha256":"4fbcc53bf690544ef607ee9c0afd4687dccd96e9f2cd2210d1e6335d469c4438","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.40`** · exit 0 · 1 líneas, 0 omitidas · HEAD `928caa08010b` · 2026-10-06T19:10:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Líneas de .dev.vars.example que no son comentario: base main (3a49528) frente a HEAD.
diff <(git show 3a49528:log-atm-web-astro/.dev.vars.example | /usr/bin/grep -v '^#') <(git show HEAD:log-atm-web-astro/.dev.vars.example | /usr/bin/grep -v '^#')
echo "exit diff (0 = idénticas): $?"
```

```text
exit diff (0 = idénticas): 0
```
<!-- evidencia:fin apply-evidence.40 -->

## Tareas 20 y 21 — README (commits `6a738a2` y `928caa0`)

El bloque `apply-evidence.41` busca en el README los términos excluidos (`docker`, `nginx`,
`TODO`, `a confirmar`, `potrace`, `astro-icon`, sin distinguir mayúsculas): 0 resultados. Para
que esta búsqueda literal pase, la palabra española «todo» de la sección *Principios* se
reformula como «cada valor». El bloque `apply-evidence.42` compara el mayor de Astro del
README con el del rango de `astro` en `package.json` y comprueba que cada `npm run <script>`
que nombra el README existe en `package.json`. El bloque `apply-evidence.43` muestra las
líneas que cubren cada criterio de lectura: destino de despliegue, Workers Builds, requisito
de `.dev.vars`, comandos del contenedor, tamaño de la imagen, limitación de la vista previa,
WSL2, `CHROME_PATH` y el motivo del movimiento reducido.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.41","forma":"argv","argv":["grep","-ciE","potrace|astro-icon|docker|nginx|TODO|a confirmar","README.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"928caa08010b4f0bc78369663f44ed13f53df27f","fecha":"2026-10-06T19:10:02-03:00","exit":1,"sha256":"9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.41`** · exit 1 · 1 líneas, 0 omitidas · HEAD `928caa08010b` · 2026-10-06T19:10:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
grep -ciE 'potrace|astro-icon|docker|nginx|TODO|a confirmar' README.md
```

```text
0
```
<!-- evidencia:fin apply-evidence.41 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.42","forma":"archivo","argv":null,"texto":"# Mayor de Astro del README frente a package.json y existencia de cada script documentado.\nR=$(/usr/bin/grep -oE '\\[Astro\\]\\(https://astro.build\\) [0-9]+' README.md | awk '{print $2}')\nP=$(node -p 'require(\"./package.json\").dependencies.astro.replace(/^[^0-9]*/, \"\").split(\".\")[0]')\necho \"Astro en README: $R · mayor del rango en package.json: $P\"\nfor S in $(/usr/bin/grep -oE 'npm run [a-z0-9:-]+' README.md | awk '{print $3}' | sort -u); do\n  node -e \"process.exit(require('./package.json').scripts['$S'] ? 0 : 1)\" && echo \"existe: $S\" || echo \"FALTA: $S\"\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"928caa08010b4f0bc78369663f44ed13f53df27f","fecha":"2026-10-06T19:10:03-03:00","exit":0,"sha256":"212e040295d63a49125acdb89d2c1365759f79ee027d93f6039348d8e5ec0adc","lineas":12,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.42`** · exit 0 · 12 líneas, 0 omitidas · HEAD `928caa08010b` · 2026-10-06T19:10:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```bash
# Mayor de Astro del README frente a package.json y existencia de cada script documentado.
R=$(/usr/bin/grep -oE '\[Astro\]\(https://astro.build\) [0-9]+' README.md | awk '{print $2}')
P=$(node -p 'require("./package.json").dependencies.astro.replace(/^[^0-9]*/, "").split(".")[0]')
echo "Astro en README: $R · mayor del rango en package.json: $P"
for S in $(/usr/bin/grep -oE 'npm run [a-z0-9:-]+' README.md | awk '{print $3}' | sort -u); do
  node -e "process.exit(require('./package.json').scripts['$S'] ? 0 : 1)" && echo "existe: $S" || echo "FALTA: $S"
done
```

```text
Astro en README: 6 · mayor del rango en package.json: 6
existe: a11y
existe: astro
existe: build
existe: check
existe: check-i18n-links
existe: container:build
existe: container:run
existe: dev
existe: measure:images
existe: preview
existe: validate-i18n
```
<!-- evidencia:fin apply-evidence.42 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.43","forma":"argv","argv":["grep","-nE","Despliegue \\||Workers Builds|cp .dev.vars.example|container:(build|run) |960 MB|error 500|networkingMode|CHROME_PATH|estado final|Potrace|Icon.astro","README.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"928caa08010b4f0bc78369663f44ed13f53df27f","fecha":"2026-10-06T19:10:03-03:00","exit":0,"sha256":"67d6a0176d2266a576872afef56d608d03b41efec6460e0963e4332a0a36ce00","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.43`** · exit 0 · 11 líneas, 0 omitidas · HEAD `928caa08010b` · 2026-10-06T19:10:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`

```text
grep -nE 'Despliegue \||Workers Builds|cp .dev.vars.example|container:(build|run) |960 MB|error 500|networkingMode|CHROME_PATH|estado final|Potrace|Icon.astro' README.md
```

```text
35:| Iconos | Lucide (`@iconify-json/lucide`) con el componente local `Icon.astro` |
40:| Despliegue | Cloudflare Workers (producción) · Podman (local, opcional) |
73:  `CHROME_PATH` o se instala en `./chrome` con `npx @puppeteer/browsers install chrome@stable`.
77:  relevante es el del estado final de la página: las animaciones de entrada parten de textos
88:compilar con la vista previa activa, responde con error 500 hasta reiniciarla: detenerla y
103:cp .dev.vars.example .dev.vars   # completar las credenciales; sin este archivo la ejecución falla
104:npm run container:build          # construye la imagen log-atm-web
105:npm run container:run            # sirve el sitio en http://localhost:4321
112:- La imagen pesa alrededor de 960 MB; es un tamaño aceptable para un uso local y opcional.
114:  local o desde un móvil, se activa `networkingMode=mirrored` en el archivo `.wslconfig` de
121:Producción corre en Cloudflare Workers mediante la integración git de Workers Builds: cada push
```
<!-- evidencia:fin apply-evidence.43 -->

## Tareas 22 y 23 — Retiro del camino Docker + nginx (commit `0809264`)

El bloque `apply-evidence.44` muestra que `git ls-files` no lista ninguno de los cinco
archivos retirados. El bloque `apply-evidence.45` busca referencias a lo retirado y a
Cloudflare Pages con el alcance de D4: `grep -rnIE` sobre el repo excluyendo `memory/`,
`.sdd/`, `node_modules/`, `dist/` y `package-lock.json` (también `.git/`, que no es
árbol de trabajo), y `git grep` sobre el árbol versionado excluyendo `memory/`: 0
resultados en ambos.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.44","forma":"archivo","argv":null,"texto":"# Archivos retirados presentes en el índice (vacío esperado).\nfor F in log-atm-web-astro/Dockerfile log-atm-web-astro/nginx.conf log-atm-web-astro/default.conf docker-compose.yml fix-wsl2-port.bat; do\n  echo \"$F: $(git ls-files -- \"$F\" | wc -l) en el índice\"\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"080926431bfe402161dd44deaf5476f7791f54d9","fecha":"2026-10-06T19:10:24-03:00","exit":0,"sha256":"5c5b53b63927283591fa5ce937375bc88a36c028d1a78b45b621dafad5a670a2","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.44`** · exit 0 · 5 líneas, 0 omitidas · HEAD `080926431bfe` · 2026-10-06T19:10:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Archivos retirados presentes en el índice (vacío esperado).
for F in log-atm-web-astro/Dockerfile log-atm-web-astro/nginx.conf log-atm-web-astro/default.conf docker-compose.yml fix-wsl2-port.bat; do
  echo "$F: $(git ls-files -- "$F" | wc -l) en el índice"
done
```

```text
log-atm-web-astro/Dockerfile: 0 en el índice
log-atm-web-astro/nginx.conf: 0 en el índice
log-atm-web-astro/default.conf: 0 en el índice
docker-compose.yml: 0 en el índice
fix-wsl2-port.bat: 0 en el índice
```
<!-- evidencia:fin apply-evidence.44 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.45","forma":"archivo","argv":null,"texto":"# Referencias a lo retirado y a Cloudflare Pages fuera de memory/ y .sdd/.\nPAT='Dockerfile|nginx|default\\.conf|docker-compose|docker compose|fix-wsl2-port|Cloudflare Pages'\n/usr/bin/grep -rnIE \"$PAT\" --exclude-dir=memory --exclude-dir=.sdd --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude=package-lock.json .\necho \"exit grep -r (1 = sin resultados): $?\"\ngit grep -nIE \"$PAT\" -- . ':!memory' ':!**/package-lock.json'\necho \"exit git grep (1 = sin resultados): $?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"080926431bfe402161dd44deaf5476f7791f54d9","fecha":"2026-10-06T19:10:24-03:00","exit":0,"sha256":"df8d7572f4361e53e0a9319ebf505aa4ddebeacee9c2e74e37d4665a34a793b3","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.45`** · exit 0 · 2 líneas, 0 omitidas · HEAD `080926431bfe` · 2026-10-06T19:10:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Referencias a lo retirado y a Cloudflare Pages fuera de memory/ y .sdd/.
PAT='Dockerfile|nginx|default\.conf|docker-compose|docker compose|fix-wsl2-port|Cloudflare Pages'
/usr/bin/grep -rnIE "$PAT" --exclude-dir=memory --exclude-dir=.sdd --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude=package-lock.json .
echo "exit grep -r (1 = sin resultados): $?"
git grep -nIE "$PAT" -- . ':!memory' ':!**/package-lock.json'
echo "exit git grep (1 = sin resultados): $?"
```

```text
exit grep -r (1 = sin resultados): 1
exit git grep (1 = sin resultados): 1
```
<!-- evidencia:fin apply-evidence.45 -->

## Tarea 24 — `## Build & Deploy` del perfil (commit `68b9a0e`)

El bloque `apply-evidence.46` muestra `## Build & Deploy` de `memory/_profile.md`:
destino Cloudflare Workers por Workers Builds; `Container` con el `Containerfile` de Podman y
sus dos comandos; `Type-check` separado del build; `Verification Commands` con `check`,
`a11y` (y su requisito de build y Chrome), `validate-i18n` y `check-i18n-links`; `CI` sin
integración continua. El bloque `apply-evidence.47` muestra que el perfil no nombra Docker ni
nginx y que los cambios del perfil en esta fase (`10a8e07` y `68b9a0e`) solo tocan
`### Dev Tools` y `## Build & Deploy`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.46","forma":"argv","argv":["sed","-n","/^## Build & Deploy/,/^## Design System/p","memory/_profile.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"68b9a0efee61ac1344b959824fab14aec3989c36","fecha":"2026-10-06T19:10:44-03:00","exit":0,"sha256":"4a404d43c166acb95ba87d8942079656de25ab4afd18ccad959987d539b95ec9","lineas":12,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.46`** · exit 0 · 12 líneas, 0 omitidas · HEAD `68b9a0efee61` · 2026-10-06T19:10:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```text
sed -n '/^## Build & Deploy/,/^## Design System/p' memory/_profile.md
```

```text
## Build & Deploy

- **Output:** `output: 'static'` (SSG)
- **Deploy Target:** Cloudflare Workers mediante Workers Builds (integración git: cada push dispara un build; `main` es producción)
- **Build Scripts:** `npm run build` (`astro build`, sin type-check); `npm run validate-i18n` (validador i18n vía tsx, ejecución separada); `npm run check-i18n-links` (chequeo de links i18n vía tsx, ejecución separada)
- **Validation:** Custom i18n validator via tsx at build time
- **Container:** `log-atm-web-astro/Containerfile` (Podman rootless, un stage `node:22-slim`, `astro preview` con workerd en el puerto 4321; `.dev.vars` montado en solo lectura al ejecutar); comandos `npm run container:build` / `npm run container:run`
- **Type-check:** `npm run check` (`astro check`), separado de `npm run build`, que no verifica tipos
- **Verification Commands:** `npm run check`; `npm run a11y` (requiere `npm run build` y Chrome vía `CHROME_PATH` o `./chrome`); `npm run validate-i18n`; `npm run check-i18n-links`
- **CI:** sin integración continua; las verificaciones las ejecuta quien desarrolla y `sdd-verify`

## Design System & Branding
```
<!-- evidencia:fin apply-evidence.46 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.47","forma":"archivo","argv":null,"texto":"# Menciones a Docker/nginx en el perfil y secciones tocadas por los commits de perfil de sdd-apply.\necho \"menciones docker|nginx: $(/usr/bin/grep -ciE 'docker|nginx' memory/_profile.md)\"\nfor C in 10a8e07 HEAD; do :; done\ngit diff -U0 10a8e07~1 HEAD -- memory/_profile.md | /usr/bin/grep -E '^@@' | sed -E 's/^@@ [^@]+ @@ ?//'\ngit diff --stat 10a8e07~1 HEAD -- memory/_profile.md | tail -1\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"68b9a0efee61ac1344b959824fab14aec3989c36","fecha":"2026-10-06T19:10:44-03:00","exit":0,"sha256":"901a7fd04f0631468230cb173a98b7b7c97fd24b642cc82179e12990581ff881","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.47`** · exit 0 · 5 líneas, 0 omitidas · HEAD `68b9a0efee61` · 2026-10-06T19:10:44-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Menciones a Docker/nginx en el perfil y secciones tocadas por los commits de perfil de sdd-apply.
echo "menciones docker|nginx: $(/usr/bin/grep -ciE 'docker|nginx' memory/_profile.md)"
for C in 10a8e07 HEAD; do :; done
git diff -U0 10a8e07~1 HEAD -- memory/_profile.md | /usr/bin/grep -E '^@@' | sed -E 's/^@@ [^@]+ @@ ?//'
git diff --stat 10a8e07~1 HEAD -- memory/_profile.md | tail -1
```

```text
menciones docker|nginx: 0
updated: "2026-10-06"
updated: "2026-10-06"
updated: "2026-10-06"
 1 file changed, 9 insertions(+), 4 deletions(-)
```
<!-- evidencia:fin apply-evidence.47 -->

El bloque `apply-evidence.47` muestra el conteo de Docker/nginx (0), pero los encabezados de
hunk de `git diff` traen la línea de contexto `updated:` y no el nombre de la sección. El bloque
`apply-evidence.48` lista, para cada línea cambiada del perfil entre `10a8e07~1` y `68b9a0e`,
la sección `##`/`###` que la contiene.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.48","forma":"archivo","argv":null,"texto":"# Sección del perfil que contiene cada línea cambiada por los commits de perfil de sdd-apply (10a8e07, 68b9a0e).\ngit diff -U0 10a8e07~1 68b9a0e -- memory/_profile.md | awk '/^@@/{split($3,a,/[+,]/); print a[2]}' | while read N; do\n  head -n \"$N\" memory/_profile.md | /usr/bin/grep -E '^##' | tail -1\ndone | sort | uniq -c\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman","head":"68b9a0efee61ac1344b959824fab14aec3989c36","fecha":"2026-10-06T19:10:52-03:00","exit":0,"sha256":"028f74ce3365ac671aee0ecddc12ea50b5de67c7d44c8f529d589d774fd8a822","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.48`** · exit 0 · 2 líneas, 0 omitidas · HEAD `68b9a0efee61` · 2026-10-06T19:10:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman`

```bash
# Sección del perfil que contiene cada línea cambiada por los commits de perfil de sdd-apply (10a8e07, 68b9a0e).
git diff -U0 10a8e07~1 68b9a0e -- memory/_profile.md | awk '/^@@/{split($3,a,/[+,]/); print a[2]}' | while read N; do
  head -n "$N" memory/_profile.md | /usr/bin/grep -E '^##' | tail -1
done | sort | uniq -c
```

```text
      2 ## Build & Deploy
      1 ### Dev Tools
```
<!-- evidencia:fin apply-evidence.48 -->

## Tamaño de la imagen (README)

Con la imagen reconstruida desde el worktree en su estado final, el bloque `apply-evidence.49`
muestra un tamaño de 964 MB. El README declara «alrededor de 960 MB», el valor medido. La spec
`[[readme-deployment-and-local-container]]` y `design.md` (D7) dicen ~866 MB, la cifra de la
exploración, anterior a las devDependencies que agrega este cambio (`typescript`,
`@astrojs/check`, `playwright-core`, `axe-core`), que la imagen instala con `npm ci`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.49","forma":"argv","argv":["podman","images","--format","{{.Repository}}:{{.Tag}} {{.Size}}","localhost/log-atm-web"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"68b9a0efee61ac1344b959824fab14aec3989c36","fecha":"2026-10-06T19:13:13-03:00","exit":0,"sha256":"56480add204e611997430485846aa859cea7001e01331173f14bc60e9482bb64","lineas":1,"omitidas":0,"no_recomprobable":"tamaño de una imagen reconstruida, que puede variar entre construcciones"} -->
**Evidencia `apply-evidence.49`** · exit 0 · 1 líneas, 0 omitidas · HEAD `68b9a0efee61` · 2026-10-06T19:13:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: tamaño de una imagen reconstruida, que puede variar entre construcciones

```text
podman images --format '{{.Repository}}:{{.Tag}} {{.Size}}' localhost/log-atm-web
```

```text
localhost/log-atm-web:latest 964 MB
```
<!-- evidencia:fin apply-evidence.49 -->

## Cierre — corrida completa de las verificaciones del perfil

Con `npm run build` del árbol final (exit 0, fuera del registro), el bloque `apply-evidence.50`
corre una vez los cuatro comandos de `Verification Commands` del perfil: `npm run check`
(0 errores), `npm run a11y` (exit 1 por la deuda existente `label-content-name-mismatch`
registrada en `observations.md`; 0 `color-contrast`), `npm run validate-i18n` y
`npm run check-i18n-links`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.50","forma":"archivo","argv":null,"texto":"# Corrida completa de cierre: los cuatro comandos de verificación del perfil sobre el árbol final.\necho \"== npm run check\"\nnpm run check 2\u003e&1 | sed 's/\\x1b\\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors?|warnings?|hints?)'\necho \"exit: ${PIPESTATUS[0]}\"\necho \"== npm run a11y\"\nO=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y 2\u003e&1)\nRC=$?\nprintf '%s\\n' \"$O\" | /usr/bin/grep '^Resumen:'\nprintf '%s\\n' \"$O\" | /usr/bin/grep -oE '^\\[(escritorio|móvil)\\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c\necho \"líneas color-contrast: $(printf '%s\\n' \"$O\" | /usr/bin/grep -c ' color-contrast ')\"\necho \"exit: $RC\"\necho \"== npm run validate-i18n\"\nnpm run validate-i18n 2\u003e&1 | tail -3\necho \"exit: ${PIPESTATUS[0]}\"\necho \"== npm run check-i18n-links\"\nnpm run check-i18n-links 2\u003e&1 | tail -3\necho \"exit: ${PIPESTATUS[0]}\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro","head":"68b9a0efee61ac1344b959824fab14aec3989c36","fecha":"2026-10-06T19:13:45-03:00","exit":0,"sha256":"8ea15bb645d0fb9a3dfeac5e46982e706215314ea99c331c829cc28250eaa7a2","lineas":22,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.50`** · exit 0 · 22 líneas, 0 omitidas · HEAD `68b9a0efee61` · 2026-10-06T19:13:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```bash
# Corrida completa de cierre: los cuatro comandos de verificación del perfil sobre el árbol final.
echo "== npm run check"
npm run check 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | /usr/bin/grep -E ' - error |^Result|^- [0-9]+ (errors?|warnings?|hints?)'
echo "exit: ${PIPESTATUS[0]}"
echo "== npm run a11y"
O=$(CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y 2>&1)
RC=$?
printf '%s\n' "$O" | /usr/bin/grep '^Resumen:'
printf '%s\n' "$O" | /usr/bin/grep -oE '^\[(escritorio|móvil)\] [^ ]+ [a-z-]+' | awk '{print $1, $3}' | sort | uniq -c
echo "líneas color-contrast: $(printf '%s\n' "$O" | /usr/bin/grep -c ' color-contrast ')"
echo "exit: $RC"
echo "== npm run validate-i18n"
npm run validate-i18n 2>&1 | tail -3
echo "exit: ${PIPESTATUS[0]}"
echo "== npm run check-i18n-links"
npm run check-i18n-links 2>&1 | tail -3
echo "exit: ${PIPESTATUS[0]}"
```

```text
== npm run check
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints
exit: 0
== npm run a11y
Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
     42 [escritorio] label-content-name-mismatch
     21 [móvil] label-content-name-mismatch
líneas color-contrast: 0
exit: 1
== npm run validate-i18n

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
exit: 0
== npm run check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
exit: 0
```
<!-- evidencia:fin apply-evidence.50 -->

## Resumen de commits

| Commit | Tareas | Specs |
|---|---|---|
| `a89d8c7` | 1 | `[[observations-log-merge]]` |
| `a5cb95f` | 3, 4, 7 | `[[a11y-audit-real-browser-coverage]]`, `[[a11y-audit-browser-portability]]`, `[[a11y-audit-final-state-evaluation]]` |
| `6e64c26` | 4 (espera del servidor al terminar) | `[[a11y-audit-real-browser-coverage]]` |
| `9122439` | 8 | `[[type-check-zero-errors]]`, `[[type-check-build-independence]]` |
| `69df563` | 9 | `[[type-check-zero-errors]]` |
| `10a8e07` | 11 | `[[profile-verification-commands]]` |
| `6ff4c84` | 13, 14, 15 | `[[container-production-parity]]`, `[[container-secrets-isolation]]`, `[[container-build-run-commands]]` |
| `5be9818` | 19 | `[[deployment-target-references]]` |
| `6a738a2` | 20 | `[[readme-deployment-and-local-container]]` |
| `928caa0` | 21 | `[[readme-project-accuracy]]`, `[[a11y-audit-final-state-evaluation]]`, `[[a11y-audit-browser-portability]]` |
| `0809264` | 22 | `[[static-server-container-removal]]` |
| `68b9a0e` | 24 | `[[profile-verification-commands]]` |

Las Tareas 2, 5, 6, 10, 12, 16, 17, 18 y 23 son solo evidencia. Al cerrar la fase quedan la
imagen `localhost/log-atm-web` (construida desde el árbol final) y su base
`docker.io/library/node:22-slim`; ningún contenedor, ninguna imagen de prueba, ningún proceso
`workerd`/`astro preview`/Chrome y el puerto 4321 libre.
