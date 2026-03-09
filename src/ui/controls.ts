import { store } from '../state';
import type { DiagramConfig } from '../types';
import { PRESETS } from '../types';
import { exportSVG } from '../export/svg-export';
import { exportPNG } from '../export/png-export';

// ---------- helpers ----------

function section(title: string): HTMLDetailsElement {
  const details = document.createElement('details');
  details.className = 'control-section';
  details.open = true;
  const summary = document.createElement('summary');
  summary.textContent = title;
  details.appendChild(summary);
  return details;
}

function row(label: string, input: HTMLElement): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'control-row';
  const lbl = document.createElement('label');
  lbl.textContent = label;
  div.appendChild(lbl);
  div.appendChild(input);
  return div;
}

function slider(
  key: keyof DiagramConfig,
  min: number,
  max: number,
  step: number = 1
): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'slider-wrap';
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(store.get()[key]);
  const val = document.createElement('span');
  val.className = 'slider-value';
  val.textContent = String(store.get()[key]);

  input.addEventListener('input', () => {
    const v = parseFloat(input.value);
    val.textContent = String(v);
    store.update({ [key]: v } as Partial<DiagramConfig>);
  });

  store.subscribe((cfg) => {
    const v = String(cfg[key]);
    if (input.value !== v) {
      input.value = v;
      val.textContent = v;
    }
  });

  wrap.appendChild(input);
  wrap.appendChild(val);
  return wrap;
}

function colorInput(key: keyof DiagramConfig): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = String(store.get()[key]);
  input.addEventListener('input', () => {
    store.update({ [key]: input.value } as Partial<DiagramConfig>);
  });
  store.subscribe((cfg) => {
    input.value = String(cfg[key]);
  });
  return input;
}

function textInput(key: keyof DiagramConfig): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = String(store.get()[key]);
  input.addEventListener('input', () => {
    store.update({ [key]: input.value } as Partial<DiagramConfig>);
  });
  store.subscribe((cfg) => {
    if (document.activeElement !== input) {
      input.value = String(cfg[key]);
    }
  });
  return input;
}

function checkbox(key: keyof DiagramConfig): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = Boolean(store.get()[key]);
  input.addEventListener('change', () => {
    store.update({ [key]: input.checked } as Partial<DiagramConfig>);
  });
  store.subscribe((cfg) => {
    input.checked = Boolean(cfg[key]);
  });
  return input;
}

function selectInput(
  key: keyof DiagramConfig,
  options: { value: string; label: string }[]
): HTMLSelectElement {
  const select = document.createElement('select');
  select.setAttribute('data-key', key);
  for (const opt of options) {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  }
  select.value = String(store.get()[key]);
  select.addEventListener('change', () => {
    store.update({ [key]: select.value } as Partial<DiagramConfig>);
  });
  store.subscribe((cfg) => {
    select.value = String(cfg[key]);
  });
  return select;
}

// ---------- step editor ----------

function createStepsEditor(container: HTMLElement): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'steps-editor';

  function rebuild() {
    wrapper.innerHTML = '';
    const steps = store.get().steps;
    steps.forEach((step, i) => {
      const stepRow = document.createElement('div');
      stepRow.className = 'step-row';
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.value = step.label;
      inp.addEventListener('input', () => {
        store.updateStep(i, { label: inp.value });
      });
      const rmBtn = document.createElement('button');
      rmBtn.textContent = '\u00d7';
      rmBtn.className = 'btn-remove';
      rmBtn.title = 'Remove step';
      rmBtn.disabled = steps.length <= 1;
      rmBtn.addEventListener('click', () => {
        store.removeStep(i);
      });
      stepRow.appendChild(inp);
      stepRow.appendChild(rmBtn);
      wrapper.appendChild(stepRow);
    });
    const addBtn = document.createElement('button');
    addBtn.textContent = '+ Add Step';
    addBtn.className = 'btn-add';
    addBtn.addEventListener('click', () => {
      store.addStep('NEW');
    });
    wrapper.appendChild(addBtn);
  }

  rebuild();
  store.subscribe(rebuild);
  container.appendChild(wrapper);
}

// ---------- export controls ----------

function createExportControls(container: HTMLElement): void {
  const sec = section('Export');

  const exportW = document.createElement('input');
  exportW.type = 'number';
  exportW.value = '1920';
  exportW.min = '100';
  exportW.max = '8000';

  const exportH = document.createElement('input');
  exportH.type = 'number';
  exportH.value = '1080';
  exportH.min = '100';
  exportH.max = '8000';

  sec.appendChild(row('Width (px)', exportW));
  sec.appendChild(row('Height (px)', exportH));

  const btnRow = document.createElement('div');
  btnRow.className = 'export-buttons';

  const svgBtn = document.createElement('button');
  svgBtn.textContent = 'Export SVG';
  svgBtn.className = 'btn-export';
  svgBtn.addEventListener('click', () => {
    const svg = document.querySelector('.diagram-svg') as SVGSVGElement | null;
    if (svg) exportSVG(svg);
  });

  const pngBtn = document.createElement('button');
  pngBtn.textContent = 'Export PNG';
  pngBtn.className = 'btn-export btn-export-png';
  pngBtn.addEventListener('click', () => {
    const svg = document.querySelector('.diagram-svg') as SVGSVGElement | null;
    if (svg) {
      const w = parseInt(exportW.value) || 1920;
      const h = parseInt(exportH.value) || 1080;
      exportPNG(svg, w, h);
    }
  });

  btnRow.appendChild(svgBtn);
  btnRow.appendChild(pngBtn);
  sec.appendChild(btnRow);
  container.appendChild(sec);
}

// ---------- main build ----------

export function buildControls(sidebar: HTMLElement): void {
  // Layout
  const layoutSec = section('Layout');
  layoutSec.appendChild(
    row(
      'Direction',
      selectInput('layoutDirection', [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ])
    )
  );

  // Preset dropdown
  const presetSelect = document.createElement('select');
  presetSelect.setAttribute('data-key', 'preset');
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = 'Choose preset...';
  presetSelect.appendChild(defaultOpt);
  for (const preset of PRESETS) {
    const option = document.createElement('option');
    option.value = preset.name;
    option.textContent = preset.name;
    presetSelect.appendChild(option);
  }
  presetSelect.addEventListener('change', () => {
    const preset = PRESETS.find((p) => p.name === presetSelect.value);
    if (preset) {
      store.update(preset.config);
    }
    presetSelect.value = '';
  });
  layoutSec.appendChild(row('Preset', presetSelect));
  sidebar.appendChild(layoutSec);

  // Steps
  const stepsSec = section('Steps');
  createStepsEditor(stepsSec);
  sidebar.appendChild(stepsSec);

  // Canvas
  const canvasSec = section('Canvas');
  canvasSec.appendChild(row('Width', slider('canvasWidth', 400, 2000)));
  canvasSec.appendChild(row('Height', slider('canvasHeight', 300, 1500)));
  canvasSec.appendChild(row('Background', colorInput('backgroundColor')));
  sidebar.appendChild(canvasSec);

  // Boxes
  const boxSec = section('Boxes');
  boxSec.appendChild(row('Width', slider('boxWidth', 60, 400)));
  boxSec.appendChild(row('Height', slider('boxHeight', 30, 200)));
  boxSec.appendChild(row('Spacing', slider('boxSpacing', 20, 200)));
  boxSec.appendChild(row('Corner radius', slider('boxCornerRadius', 0, 40)));
  sidebar.appendChild(boxSec);

  // Borders
  const borderSec = section('Borders');
  borderSec.appendChild(row('Thickness', slider('borderThickness', 0.5, 8, 0.5)));
  borderSec.appendChild(row('Gap (double)', slider('borderGap', 0, 12)));
  borderSec.appendChild(row('Color', colorInput('borderColor')));
  sidebar.appendChild(borderSec);

  // Typography
  const typoSec = section('Typography');
  typoSec.appendChild(row('Size', slider('fontSize', 8, 48)));
  typoSec.appendChild(row('Family', textInput('fontFamily')));
  typoSec.appendChild(row('Weight', slider('fontWeight', 100, 900, 100)));
  typoSec.appendChild(row('Color', colorInput('fontColor')));
  typoSec.appendChild(row('Uppercase', checkbox('uppercase')));
  sidebar.appendChild(typoSec);

  // Arrows
  const arrowSec = section('Arrows');
  arrowSec.appendChild(row('Stroke', slider('arrowStrokeWidth', 0.5, 8, 0.5)));
  arrowSec.appendChild(row('Head size', slider('arrowHeadSize', 4, 24)));
  arrowSec.appendChild(row('Color', colorInput('arrowColor')));
  sidebar.appendChild(arrowSec);

  // Feedback loop
  const fbSec = section('Feedback Loop');
  fbSec.appendChild(row('Enabled', checkbox('feedbackLoop')));
  fbSec.appendChild(row('Corner radius', slider('feedbackCornerRadius', 0, 60)));
  fbSec.appendChild(row('Label', textInput('feedbackLabel')));
  sidebar.appendChild(fbSec);

  // Export
  createExportControls(sidebar);
}
