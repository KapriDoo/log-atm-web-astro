---
name: como-se-verifica
description: Cómo se verifica un cambio en este proyecto, que no tiene tests automatizados.
---

## Cómo se verifica

- El proyecto no tiene tests automatizados: `package.json` no trae un script de tests ni un runner, y no hay integración continua. Lo automático son los comandos que lista el `AGENTS.md`, que simba corre como compuertas.
- Lo demás (el comportamiento en el navegador, el envío real de correos, lo que se ve en pantalla) lo verifica a mano quien desarrolla, antes del deploy.
- Por eso, un criterio de comportamiento se verifica leyendo el código contra el criterio y con esos comandos, sin exigir un test; agregar un runner de tests es un cambio aparte, que se pide.
