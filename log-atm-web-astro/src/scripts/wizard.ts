/**
 * wizard.ts — Lógica del wizard de cotización (módulo TS standalone)
 *
 * Gestiona el estado del wizard multi-paso: selección de modalidad, ruta, carga,
 * contacto y envío. Lee los strings i18n desde data-* attributes del contenedor
 * #stepper (inyectados por cotizar.astro en el frontmatter).
 *
 * Se carga desde cotizar.astro con <script import>. Astro/Vite lo transpila
 * correctamente — a diferencia de <script define:vars> que emite verbatim.
 *
 * Relacionado con: [[interactive-component-transitions/wizard-step-modality-selection]]
 *                  [[forms-email/quote-folio-server-generated]]
 *                  [[forms-email/wizard-responsive-mobile]]
 */

type Unit = 'cbm' | 'fcl20' | 'fcl40';

interface ClientStrings {
  empty: string;
  submit: string;
  next: string;
  folioPrefix: string;
  descPersonal: string;
  unitFcl20: string;
  unitFcl40: string;
}

/** Lee los strings i18n desde data-* attributes del elemento #stepper. */
function readClientStrings(): ClientStrings {
  const el = document.getElementById('stepper');
  return {
    empty:        el?.dataset.strEmpty        ?? '—',
    submit:       el?.dataset.strSubmit       ?? 'Enviar',
    next:         el?.dataset.strNext         ?? 'Siguiente',
    folioPrefix:  el?.dataset.strFolioPrefix  ?? 'Folio',
    descPersonal: el?.dataset.strDescPersonal ?? '',
    unitFcl20:    el?.dataset.strUnitFcl20    ?? "20' FCL",
    unitFcl40:    el?.dataset.strUnitFcl40    ?? "40' FCL",
  };
}

/** Estado del wizard — se reinicializa en cada astro:page-load */
function makeState() {
  return {
    step: 0,
    mode: '',
    modeName: '',
    origin: '',
    dest: '',
    incoterm: 'FOB',
    unit: 'cbm' as Unit,
    volume: '',
    weight: '',
    cargo: [] as string[],
    extras: [] as string[],
    name: '', company: '', email: '', phone: '', notes: '',
    folio: '',
  };
}

document.addEventListener('astro:page-load', () => {
  // Reset flag de animación colgado de posibles navegaciones interrumpidas
  const resetFn = (window as Window & { __stepperReset?: () => void }).__stepperReset;
  if (resetFn) resetFn();

  const clientStrings = readClientStrings();
  const state = makeState();

  // Refs del DOM (se obtienen en cada carga porque el DOM se reconstruye)
  const $  = <T extends HTMLElement = HTMLElement>(sel: string) =>
    document.querySelector<T>(sel);
  const $$ = <T extends HTMLElement = HTMLElement>(sel: string) =>
    Array.from(document.querySelectorAll<T>(sel));

  const stepperSteps = $$<HTMLDivElement>('.stepper__step');
  const stepPanels   = $$<HTMLDivElement>('[data-step-panel]');
  const btnBack      = $<HTMLButtonElement>('#btn-back');
  const btnNext      = $<HTMLButtonElement>('#btn-next');
  const btnNextLabel = $('#btn-next-label');
  const stepperRoot  = $('#stepper');
  const quoteCard    = $('#quote-card');
  const summary      = $('#quote-summary');
  const success      = $('#quote-success');

  const sum = {
    mode:     $('#sum-mode'),
    origin:   $('#sum-origin'),
    dest:     $('#sum-dest'),
    incoterm: $('#sum-incoterm'),
    cargo:    $('#sum-cargo'),
    volume:   $('#sum-volume'),
    extras:   $('#sum-extras'),
    extrasRow:$('#sum-extras-row'),
  };

  // Asegurarse que éxito esté oculto y wizard visible al entrar a la página
  stepperRoot?.removeAttribute('hidden');
  quoteCard?.removeAttribute('hidden');
  summary?.removeAttribute('hidden');
  success?.setAttribute('hidden', '');

  // Initial defaults from selects
  const destSel     = $<HTMLSelectElement>('#q-dest');
  const incotermSel = $<HTMLSelectElement>('#q-incoterm');
  if (destSel)     state.dest     = destSel.value || destSel.options[0]?.value || '';
  if (incotermSel) state.incoterm = incotermSel.value || 'FOB';

  // Usar AbortController para limpiar listeners en astro:before-swap
  const controller = new AbortController();
  document.addEventListener('astro:before-swap', () => controller.abort(), { once: true });
  const sig = { signal: controller.signal };

  function setText(el: Element | null, txt: string, empty = false) {
    if (!el) return;
    el.textContent = txt;
    el.classList.toggle('empty', empty);
  }

  function renderSummary() {
    const EMPTY = clientStrings.empty;
    setText(sum.mode,   state.modeName || EMPTY, !state.modeName);
    setText(sum.origin, state.origin   || EMPTY, !state.origin);
    setText(sum.dest,   state.dest, false);
    setText(sum.incoterm, state.incoterm, false);
    setText(sum.cargo,  state.cargo.length ? state.cargo.join(', ') : EMPTY, state.cargo.length === 0);

    let vol = '';
    if (state.unit === 'cbm') {
      vol = state.volume ? `${state.volume} m³` : '';
    } else {
      const label = state.unit === 'fcl20' ? clientStrings.unitFcl20 : clientStrings.unitFcl40;
      vol = state.volume ? `${state.volume} × ${label}` : '';
    }
    setText(sum.volume, vol || EMPTY, !vol);

    if (state.extras.length) {
      sum.extrasRow?.removeAttribute('hidden');
      setText(sum.extras, state.extras.join(', '), false);
    } else {
      sum.extrasRow?.setAttribute('hidden', '');
    }
  }

  function canAdvance(): boolean {
    if (state.step === 0) return !!state.mode;
    if (state.step === 1) return !!state.origin && !!state.dest;
    if (state.step === 2) return state.cargo.length > 0 && (!!state.volume || !!state.weight);
    if (state.step === 3) return !!state.name && !!state.email;
    return true;
  }

  // Tracking del paso anterior para detectar cambios y determinar la dirección
  let previousStep = state.step;

  function updateStepperUI(): void {
    stepperSteps.forEach((el, i) => {
      el.classList.toggle('stepper__step--active', i === state.step);
      el.classList.toggle('stepper__step--done',   i <  state.step);
      const bullet = el.querySelector('.stepper__bullet');
      if (bullet) bullet.textContent = (i < state.step) ? '✓' : String(i + 1).padStart(2, '0');
    });
    if (btnBack)      btnBack.disabled = state.step === 0;
    if (btnNext)      btnNext.disabled = !canAdvance();
    if (btnNextLabel) btnNextLabel.textContent = state.step === 3 ? clientStrings.submit : clientStrings.next;
  }

  function renderStep(): void {
    // Guard contra desincronización: si hay un tween en curso y el usuario logró
    // cambiar state.step (click en bullet, btnBack, btnNext), revertir al paso
    // anterior y esperar a que la animación termine. Evita estado inconsistente
    // entre state.step y el panel visible.
    const isAnimating = (window as Window & { __stepperIsAnimating?: () => boolean }).__stepperIsAnimating?.();
    if (isAnimating && previousStep !== state.step) {
      state.step = previousStep;
      updateStepperUI();
      return;
    }

    // Actualizar bullets y controles del stepper siempre
    updateStepperUI();

    if (previousStep === state.step) {
      // Sin cambio de paso — solo asegurar que el panel correcto esté visible
      stepPanels.forEach((p, i) => {
        if (i === state.step) p.removeAttribute('hidden');
        else                  p.setAttribute('hidden', '');
      });
      return;
    }

    const from = previousStep;
    const to = state.step;
    previousStep = state.step;

    // Obtener transitionStep del contexto window (inyectado por el script GSAP)
    const doTransition = (window as Window & { __stepperTransition?: (opts: unknown) => void }).__stepperTransition;
    if (!doTransition) {
      // Fallback sin GSAP: swap directo
      stepPanels.forEach((p, i) => {
        if (i === to) p.removeAttribute('hidden');
        else          p.setAttribute('hidden', '');
      });
      return;
    }

    doTransition({
      panels: stepPanels,
      fromIndex: from,
      toIndex: to,
      onMidpoint: () => {
        stepPanels.forEach((p, i) => {
          if (i === to) p.removeAttribute('hidden');
          else          p.setAttribute('hidden', '');
        });
      },
      onComplete: () => {
        // Actualizar controles tras completar la animación
        if (btnNext) btnNext.disabled = !canAdvance();
      },
    });
  }

  // ── Step 0: mode tiles ────────────────────────────────────
  $$<HTMLButtonElement>('.mode-tile').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode || '';
      const name = btn.dataset.modeName || '';
      state.mode = mode;
      state.modeName = name;
      $$<HTMLButtonElement>('.mode-tile').forEach((b) => b.classList.toggle('mode-tile--active', b === btn));
      renderSummary();
      renderStep();
    }, sig);
  });

  // ── Step 1: route + incoterm + date ────────────────────────
  $('#q-origin')?.addEventListener('change',   (e) => { state.origin   = (e.target as HTMLSelectElement).value; renderSummary(); renderStep(); }, sig);
  $('#q-dest')?.addEventListener('change',     (e) => { state.dest     = (e.target as HTMLSelectElement).value; renderSummary(); renderStep(); }, sig);
  $('#q-incoterm')?.addEventListener('change', (e) => { state.incoterm = (e.target as HTMLSelectElement).value; renderSummary(); }, sig);

  // ── Step 2: cargo chips + unit toggle + volume fields ──────
  $$<HTMLButtonElement>('#cargo-chips .chip-multi').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.cargo || '';
      const idx = state.cargo.indexOf(v);
      if (idx >= 0) state.cargo.splice(idx, 1);
      else          state.cargo.push(v);
      btn.classList.toggle('chip-multi--active');
      renderSummary();
      renderStep();
    }, sig);
  });

  $$<HTMLButtonElement>('#extras-chips .chip-multi').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.extra || '';
      const idx = state.extras.indexOf(v);
      if (idx >= 0) state.extras.splice(idx, 1);
      else          state.extras.push(v);
      btn.classList.toggle('chip-multi--active');
      renderSummary();
    }, sig);
  });

  const cbmFields = $('#cbm-fields');
  const fclFields = $('#fcl-fields');
  $$<HTMLButtonElement>('#unit-toggle .unit-toggle__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const u = (btn.dataset.unit || 'cbm') as Unit;
      state.unit   = u;
      state.volume = '';
      state.weight = '';
      $$<HTMLButtonElement>('#unit-toggle .unit-toggle__btn').forEach((b) => b.classList.toggle('unit-toggle__btn--active', b === btn));
      // Reset inputs
      (['q-volume', 'q-weight', 'q-count'] as const).forEach((id) => {
        const el = document.getElementById(id) as HTMLInputElement | null;
        if (el) el.value = '';
      });
      if (u === 'cbm') {
        cbmFields?.removeAttribute('hidden');
        fclFields?.setAttribute('hidden', '');
      } else {
        cbmFields?.setAttribute('hidden', '');
        fclFields?.removeAttribute('hidden');
      }
      renderSummary();
      renderStep();
    }, sig);
  });

  $('#q-volume')?.addEventListener('input', (e) => { state.volume = (e.target as HTMLInputElement).value; renderSummary(); renderStep(); }, sig);
  $('#q-weight')?.addEventListener('input', (e) => { state.weight = (e.target as HTMLInputElement).value; renderSummary(); renderStep(); }, sig);
  $('#q-count')?.addEventListener('input',  (e) => { state.volume = (e.target as HTMLInputElement).value; renderSummary(); renderStep(); }, sig);

  // ── Step 3: contact ────────────────────────────────────────
  $('#q-name')?.addEventListener('input',    (e) => { state.name    = (e.target as HTMLInputElement).value; renderStep(); }, sig);
  $('#q-company')?.addEventListener('input', (e) => { state.company = (e.target as HTMLInputElement).value; }, sig);
  $('#q-email')?.addEventListener('input',   (e) => { state.email   = (e.target as HTMLInputElement).value; renderStep(); }, sig);
  $('#q-phone')?.addEventListener('input',   (e) => { state.phone   = (e.target as HTMLInputElement).value; }, sig);
  $('#q-notes')?.addEventListener('input',   (e) => { state.notes   = (e.target as HTMLInputElement).value; }, sig);

  // ── Navigation ─────────────────────────────────────────────
  btnBack?.addEventListener('click', () => {
    if (state.step > 0) {
      state.step -= 1;
      renderStep();
    }
  }, sig);

  const statusEl = $('#quote-status');
  function setQuoteStatus(msg: string, kind: '' | 'error' | 'success' = '') {
    if (!statusEl) return;
    statusEl.textContent = msg;
    (statusEl as HTMLElement).style.color =
      kind === 'error' ? '#c0392b' : kind === 'success' ? '#2d9b6f' : '';
  }

  async function submitQuote(): Promise<void> {
    const hp = ($<HTMLInputElement>('#q-website'))?.value ?? '';
    const payload = {
      name: state.name,
      company: state.company,
      email: state.email,
      phone: state.phone,
      notes: state.notes,
      modality: state.modeName || state.mode,
      origin: state.origin,
      dest: state.dest,
      incoterm: state.incoterm,
      cargoType: state.cargo.join(', '),
      volume: state.volume,
      weight: state.weight,
      containerCount: state.unit === 'cbm' ? '' : state.volume,
      containerType: state.unit === 'fcl20' ? "20' FCL" : state.unit === 'fcl40' ? "40' FCL" : '',
      services: state.extras,
      website: hp,
    };

    if (btnNext) btnNext.disabled = true;
    setQuoteStatus('Enviando tu solicitud…');
    try {
      const r = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const res = await r.json().catch(() => ({})) as { ok?: boolean; folio?: string; fields?: Record<string, string> };
      if (r.ok && res.ok && res.folio) {
        // Folio viene del servidor — no se genera en cliente
        state.folio = res.folio;
        setQuoteStatus('');
        showSuccess();
        // Reset state silenciosamente para que un eventual "atrás" no muestre datos viejos.
        Object.assign(state, makeState());
        return;
      }
      // Error: no mostrar success con folio vacío o inexistente
      if (r.status === 400 && res.fields) {
        const first = Object.values(res.fields)[0] as string;
        setQuoteStatus(`Revisa los datos: ${first}`, 'error');
      } else {
        setQuoteStatus('No pudimos enviar. Reintenta o escríbenos por WhatsApp.', 'error');
      }
    } catch {
      setQuoteStatus('Error de conexión. Reintenta en unos segundos.', 'error');
    } finally {
      if (btnNext) btnNext.disabled = !canAdvance();
    }
  }

  btnNext?.addEventListener('click', () => {
    if (!canAdvance()) return;
    if (state.step < 3) {
      state.step += 1;
      renderStep();
    } else {
      void submitQuote();
    }
  }, sig);

  // Permite click en bullet del stepper para volver a un paso completado
  stepperSteps.forEach((el, i) => {
    el.addEventListener('click', () => {
      if (i <= state.step) {
        state.step = i;
        renderStep();
      }
    }, sig);
  });

  function showSuccess() {
    const idEl   = $('#success-id');
    const descEl = $('#success-desc');
    // Usar folio del servidor (state.folio set antes de llamar a showSuccess)
    if (idEl)   idEl.textContent = `${clientStrings.folioPrefix} · ${state.folio}`;
    const firstName = state.name.split(' ')[0] || '';
    if (descEl) descEl.textContent = clientStrings.descPersonal
      .replace('{name}', firstName)
      .replace('{email}', state.email);
    stepperRoot?.setAttribute('hidden', '');
    quoteCard?.setAttribute('hidden', '');
    summary?.setAttribute('hidden', '');
    success?.removeAttribute('hidden');
    success?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Initial render
  renderSummary();
  renderStep();
});
