---
status: accepted
date: 2026-05-12
deciders: sdd-design
consulted: exploration.md, proposal.md
informed: sdd-apply, sdd-verify
capability: i18n-translations
tags: [adr, i18n, validation, build, ci]
---

# ADR 0003: Validación de claves i18n — script de build hook (no test de Vitest)

## Contexto

Los 6 JSONs de traducción (`es.json`, `en.json`, `zh.json`, `hi.json`, `ar.json`, `pt.json`) deben mantener paridad de claves en todo momento. `es.json` es el master: si un desarrollador añade una nueva clave en español y olvida replicarla en los otros JSONs, el fallback en el helper `t()` oculta el problema en desarrollo, pero las otras traducciones quedan huérfanas permanentemente.

Se necesita una estrategia para detectar este drift de forma automática. Las opciones son:

1. **Script de validación en build hook** (`astro:build:start`): se ejecuta como parte del proceso de build de Astro, antes de que Astro empiece a compilar páginas.
2. **Test de Vitest/Jest**: un test unitario que importa los JSONs y verifica paridad de claves. Se ejecuta en el pipeline CI, separado del build.
3. **CI-only check**: script standalone que solo corre en CI (GitHub Actions / GitLab CI), no durante builds locales.

## Decisión

Implementar la validación como **script TypeScript standalone** (`scripts/validate-i18n.ts`) que:

1. Se invoca antes del build via `"prebuild"` script en `package.json` (mecanismo de npm scripts: `prebuild` corre automáticamente antes de `build`).
2. También se registra como integración inline en `astro.config.mjs` usando el hook `astro:build:start` para garantizar que corra incluso si se llama `astro build` directamente.
3. Se puede ejecutar de forma independiente con `npm run validate-i18n` durante desarrollo.

El script **falla con exit code 1** si encuentra claves presentes en `es.json` pero ausentes en cualquier otro locale (`missing`), o claves en un locale no presentes en `es.json` (`extra`). No falla por diferencias de valores (las traducciones pendientes son aceptables; la estructura no).

## Consecuencias

### Positivas

- **Fail-fast**: el build local falla antes de que Astro empiece a generar HTML. El desarrollador ve el error inmediatamente, no después de 30 segundos de build.
- **CI automático**: el script en `package.json` lo hace parte del pipeline CI sin configuración adicional.
- **Standalone**: se puede correr sin ejecutar el build completo para verificación rápida durante desarrollo de nuevas traducciones.
- **Sin dependencias de test runner**: no requiere Vitest, Jest ni ningún framework de testing. El script usa solo Node.js built-ins (`fs/promises`, `path`).
- **Reportes precisos**: el script reporta exactamente qué claves faltan en qué locale, con la ruta dot-notation completa.

### Negativas

- **Duplicación de lógica de build**: la misma validación se ejecuta dos veces si el desarrollador usa `npm run build` (el `prebuild` + el hook `astro:build:start`). Mitigado haciendo el hook Astro un wrapper que llama al mismo módulo del script.
- **No cubre semántica**: el script valida paridad estructural, no que los valores estén correctamente traducidos (eso es responsabilidad de revisión humana).
- **Bloquea builds si se olvida un JSON**: un desarrollador que agrega una clave en `es.json` debe también añadirla a los otros 5 JSONs antes de poder hacer build. Esto es intencional — es el objetivo de la validación.

## Alternativas descartadas

### Opción A: Test de Vitest

Un test unitario que importa los JSONs y verifica paridad.

**Descartada porque**:
- Requiere que el desarrollador recuerde correr `npm test` además de `npm run build`. Si el CI corre los tests y el build en pasos separados, y un desarrollador pushea sin correr tests localmente, el problema se detecta tarde.
- El proyecto actualmente no tiene Vitest instalado. Añadirlo solo para este caso viola YAGNI.
- El build hook garantiza que la validación corre siempre que el build corre, sin dependencia de que el desarrollador recuerde un paso extra.

### Opción B: CI-only check

Script que solo corre en el pipeline CI, no localmente.

**Descartada porque**:
- Degrada la experiencia de desarrollo local: el error se descubre solo en CI, después de un push, con latencia de 2-5 minutos.
- El objetivo es fail-fast local: el desarrollador debe saber en segundos que olvidó actualizar los JSONs.

### Opción C: TypeScript types exhaustivos (errores de compilación)

Usar el tipo `TranslationKey` generado desde `es.json` para que el uso de una clave inexistente sea error de compilación.

**Complementario, no sustituto**: el tipo `TranslationKey` atrapa el uso de claves que no existen en el master, pero no detecta que los otros JSONs sean incompletos (el fallback hace que el código compile aunque `ar.json` no tenga la clave nueva). Esta opción no reemplaza la validación de paridad de JSONs; ambas se implementan.

## Notas de implementación

```typescript
// scripts/validate-i18n.ts
import { readFile } from 'fs/promises';
import { join } from 'path';

const ROOT = join(process.cwd(), 'src/i18n/translations');
const LOCALES = ['en', 'zh', 'hi', 'ar', 'pt'] as const;

function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null
      ? flattenKeys(v as Record<string, unknown>, prefix ? `${prefix}.${k}` : k)
      : [prefix ? `${prefix}.${k}` : k]
  );
}

async function validate() {
  const esRaw = await readFile(join(ROOT, 'es.json'), 'utf8');
  const esKeys = new Set(flattenKeys(JSON.parse(esRaw)).filter(k => !k.startsWith('_')));
  let hasErrors = false;

  for (const locale of LOCALES) {
    const localeRaw = await readFile(join(ROOT, `${locale}.json`), 'utf8');
    const localeKeys = new Set(flattenKeys(JSON.parse(localeRaw)).filter(k => !k.startsWith('_')));
    const missing = [...esKeys].filter(k => !localeKeys.has(k));
    const extra   = [...localeKeys].filter(k => !esKeys.has(k));
    if (missing.length || extra.length) {
      hasErrors = true;
      if (missing.length) console.error(`[i18n] ${locale}.json — ${missing.length} claves faltantes:`, missing);
      if (extra.length)   console.error(`[i18n] ${locale}.json — ${extra.length} claves extra:`, extra);
    }
  }

  if (hasErrors) process.exit(1);
  console.log('[i18n] Validación de claves: OK');
}

validate().catch(err => { console.error(err); process.exit(1); });
```

En `package.json`:
```json
{
  "scripts": {
    "validate-i18n": "tsx scripts/validate-i18n.ts",
    "prebuild": "npm run validate-i18n",
    "build": "astro build"
  }
}
```

En `astro.config.mjs` (hook complementario):
```javascript
{
  name: 'validate-i18n',
  hooks: {
    'astro:build:start': async () => {
      const { execSync } = await import('child_process');
      execSync('npm run validate-i18n', { stdio: 'inherit' });
    }
  }
}
```

## Estado

**Accepted** — 2026-05-12

No supersede ningún ADR previo.
