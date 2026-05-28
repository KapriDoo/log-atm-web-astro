---
type: verify-report
change_name: "remove-marketing-claims"
date: "2026-05-28"
veredicto: "PASS"
fast_path: "apply-only"
spec_refs: []
---

# Verify Report: remove-marketing-claims

**Fecha**: 2026-05-28
**Veredicto**: ✅ PASS
**Fast path**: apply-only (sin specs — validación contra tasks.md)
**Commits auditados**: `658df31` (T1–T3) · `3a46e9b` (T4)
**Verificación**: Independiente — no se reutilizó el reporte de sdd-apply.

---

## Metodología

Verificación independiente sobre el worktree `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/remove-marketing-claims`. Se ejecutaron greps exhaustivos, `npm run validate-i18n` oficial, y `npm run build` en frío. Los resultados se compararon criterio a criterio contra tasks.md (T1–T4).

---

## Resultados por tarea

### T1 — Eliminar toda mención a "más de 70 países"

| Criterio de Acceptance | Status | Detalle |
|---|---|---|
| `grep -ri` no devuelve ninguna mención a "70 países / 70 paises / 70 countries" en contexto de claim | ✅ | 0 ocurrencias residuales. Comando ejecutado: `grep -ri "70 pa" src/` y `grep -ri "70 countr" src/` → sin output. Los únicos "70" restantes en src/ son numéricos legítimos (`-70.5756` coordenada, `70kg` en Courier), no claims de marketing. |
| Textos donde estaba embebido el claim quedan gramaticalmente correctos en 3 idiomas | ✅ | Revisión manual de faq[2].a, manifesto.p3Html, details.items[0].features[0] en es/en/pt: frases coherentes, sin conectores huérfanos ni comas colgantes. |
| No quedan claves i18n huérfanas ni elementos de UI vacíos asociados al claim | ✅ | Clave `servicios.metaCountries` eliminada en los 3 locales y confirmada como no referenciada en páginas/componentes. Ítem de `WHY_ITEMS` / `why.items` eliminado íntegramente. |

**Veredicto T1**: ✅ PASS

---

### T2 — Eliminar toda mención al "90% de satisfacción"

| Criterio de Acceptance | Status | Detalle |
|---|---|---|
| `grep -ri` no devuelve ninguna mención a "90% ... satisfacción / satisfaction / satisfação" | ✅ | 0 ocurrencias de "90%" en src/ (confirmado independientemente). Claim ausente en el codebase antes y después del cambio. |
| Textos gramaticalmente correctos en 3 idiomas | ✅ | No se modificaron textos (no había nada que eliminar). |
| No quedan claves i18n huérfanas | ✅ | Sin impacto de T2 en las claves i18n. |

**Veredicto T2**: ✅ PASS (claim confirmado como ausente en el codebase pre-cambio)

---

### T3 — Verificación de build/integridad i18n

| Criterio de Acceptance | Status | Detalle |
|---|---|---|
| Las tres locales (es/en/pt) quedan con el mismo conjunto de claves | ✅ | `npm run validate-i18n` → `[i18n] en: OK (642 claves)` · `[i18n] pt: OK (642 claves)`. El conteo cambió de 643 a 642 por la eliminación de `servicios.metaCountries` (T1) y luego a 642 por `home.hero.stripStats[1]` (T4). Paridad perfecta en las 3 locales. |
| No hay referencias en componentes/páginas a claves eliminadas | ✅ | `npm run build` completado sin errores. 27 rutas generadas. |

**Veredicto T3**: ✅ PASS

---

### T4 — Eliminar el stat "98% Satisfacción" del hero

| Criterio de Acceptance | Status | Detalle |
|---|---|---|
| El stat "98% Satisfacción" (y variantes en/pt) ya no aparece en `src/` ni se renderiza en el hero | ✅ | `grep -rni "satisf" log-atm-web-astro/src/` → 0 ocurrencias. `HERO_STRIP_STATS` tiene exactamente 2 ítems (`20+` y `1:1`). El HTML del home (es/en/pt) generado en `dist/client/index.html` no contiene "98%" ni palabras con "satisf". |
| El hero strip queda visualmente balanceado tras quitar el ítem | ✅ | Strip reducido de 3 a 2 ítems. El commit confirma que `flex-wrap` rebalancea automáticamente sin cambios CSS. |
| Paridad de claves i18n es/en/pt mantenida; sin claves huérfanas ni referencias rotas | ✅ | `validate-i18n` pasa: 642/642. `stripStats` array en es/en/pt tiene exactamente 2 elementos. |
| `astro build` y `validate-i18n` pasan | ✅ | Ver T3. |

**Veredicto T4**: ✅ PASS

---

## Mapa de Satisfacción — Ocurrencias residuales de "satisf" y "98%" en src/

Grep exhaustivo ejecutado:
- `grep -rni "satisf" log-atm-web-astro/src/` → **0 ocurrencias**
- `grep -rni "98%" log-atm-web-astro/src/` → **5 ocurrencias** (todas con "98%" pero SIN la palabra satisf*)

| # | Archivo | Línea | Texto exacto | Idioma | Clasificación |
|---|---|---|---|---|---|
| 1 | `src/i18n/translations/es.json` | 379 | `"p3Html": "Hoy operamos con clientes en 12 industrias y una retención del 98%."` | ES | **(b) otra cosa** — tasa de retención de clientes, sin la palabra "satisfacción" |
| 2 | `src/i18n/translations/en.json` | 379 | `"p3Html": "Today we operate with clients across 12 industries and a retention rate of 98%."` | EN | **(b) otra cosa** — retention rate, sin "satisfaction" |
| 3 | `src/i18n/translations/pt.json` | 379 | `"p3Html": "Hoje operamos com clientes em 12 indústrias e uma retenção de 98%."` | PT | **(b) otra cosa** — taxa de retenção, sin "satisfação" |
| 4 | `src/lib/constants.ts` | 60 | `{ value: '98%', label: 'Clientes que repiten con nosotros', icon: 'lucide:sparkles' }` | N/A | **(b) otra cosa** — array `STATS` no importado en ningún componente/página; no se renderiza actualmente. Label dice "Clientes que repiten con nosotros", no satisfacción. |
| 5 | `src/pages/industrias.astro` | 54 | `<span class="v">98%</span><span class="k">{t('industrias.metaRetention')}</span>` | ES/EN/PT | **(b) otra cosa** — clave `metaRetention` = "Retención / Retention / Retenção". Etiqueta de retención, no de satisfacción. |

**Conclusión mapa de satisfacción**: Ninguna de las 5 ocurrencias residuales de "98%" es un claim/stat de **satisfacción** (tipo a). Todas son referencias a la **tasa de retención** de clientes, expresada con terminología "retención/retention/retenção" y/o con el label "Clientes que repiten con nosotros". Están fuera del scope de T2/T4 tal como fueron definidas. El orquestador puede confirmar si desea eliminarlas en un cambio separado.

**Conteo de claims de satisfacción visibles al usuario (tipo a)**: **0** — PASS.

---

## Comandos ejecutados

```bash
# Claim "70 países" y variantes
grep -ri "70 pa" log-atm-web-astro/src/          → sin output (0 ocurrencias)
grep -ri "70 countr" log-atm-web-astro/src/       → sin output (0 ocurrencias)

# Mapa exhaustivo "satisf" y "98%"
grep -rni "satisf" log-atm-web-astro/src/         → sin output (0 ocurrencias)
grep -rni "98%" log-atm-web-astro/src/            → 5 ocurrencias (ver tabla)

# Paridad i18n
npm run validate-i18n
  → [i18n] en: OK (642 claves)
  → [i18n] pt: OK (642 claves)

# Build
npm run build
  → 27 rutas generadas (prerender static routes OK)
  → 0 errores, 0 warnings
  → [build] Complete!

# Verificación del output compilado (home pages)
grep -c "98%" dist/client/index.html      → 0
grep -c "98%" dist/client/en/index.html   → 0
grep -c "98%" dist/client/pt/index.html   → 0
grep -ri "satisf" dist/client/            → sin output
```

---

## Archivos modificados por el cambio (auditados)

| Archivo | Cambios verificados | Estado |
|---|---|---|
| `src/i18n/translations/es.json` | Eliminados: stripStats[2] (98% Satisfacción), why.items[1], metaCountries; editados: details.items[0].features[0], faq[2].a, nosotros.manifesto.p3Html | ✅ Limpio |
| `src/i18n/translations/en.json` | Ídem en inglés | ✅ Limpio |
| `src/i18n/translations/pt.json` | Ídem en portugués | ✅ Limpio |
| `src/lib/constants.ts` | HERO_STRIP_STATS: 2 ítems (20+, 1:1); WHY_ITEMS: eliminado entry países; SERVICE_DETAILS['01']: editado | ✅ Limpio |

---

## Hallazgos de seguridad

No aplica (domain: fix, cambio de contenido de marketing sin lógica de negocio).

---

## Veredicto global

✅ **PASS**

| Tarea | Veredicto | Conteo residual |
|---|---|---|
| T1 — Claim "70 países/countries/países" | ✅ PASS | 0 ocurrencias |
| T2 — Claim "90% satisfacción" | ✅ PASS | 0 ocurrencias (nunca existió) |
| T3 — Build + paridad i18n | ✅ PASS | 642 claves, 0 errores build |
| T4 — Stat "98% Satisfacción" del hero strip | ✅ PASS | 0 ocurrencias en hero/home |
| **Global** | **✅ PASS** | |

**Claims de satisfacción visibles (tipo a) en src/**: **0**
**Ocurrencias residuales de "98%"**: 5 (todas clasificadas tipo b — retención, fuera de scope)

---

## Acciones requeridas

Ninguna para este cambio. El change `remove-marketing-claims` está listo para archive.

**Nota para el orquestador**: Quedan 5 ocurrencias de "98%" en src/ referidas a la tasa de retención de clientes ("Clientes que repiten con nosotros", "Retención"). No son claims de satisfacción; están fuera del scope de T2/T4. Si negocio desea eliminar también estas referencias, recomendamos un nuevo cambio SDD separado.
