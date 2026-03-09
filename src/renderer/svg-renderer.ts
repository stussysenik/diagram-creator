import type { DiagramConfig } from '../types';
import type { BoxLayout, ArrowLayout } from './geometry';
import { computeLayout } from './geometry';
import { createFeedbackLoop } from './feedback-loop';

const SVG_NS = 'http://www.w3.org/2000/svg';

function createBox(box: BoxLayout, config: DiagramConfig): SVGGElement {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'diagram-box');

  const { borderThickness, borderGap, borderColor, boxCornerRadius } = config;

  // Outer border rect
  const outer = document.createElementNS(SVG_NS, 'rect');
  outer.setAttribute('x', String(box.x));
  outer.setAttribute('y', String(box.y));
  outer.setAttribute('width', String(box.width));
  outer.setAttribute('height', String(box.height));
  outer.setAttribute('rx', String(boxCornerRadius));
  outer.setAttribute('ry', String(boxCornerRadius));
  outer.setAttribute('fill', 'none');
  outer.setAttribute('stroke', borderColor);
  outer.setAttribute('stroke-width', String(borderThickness));
  g.appendChild(outer);

  // Inner border rect (double-border effect)
  if (borderGap > 0) {
    const inset = borderThickness / 2 + borderGap;
    const inner = document.createElementNS(SVG_NS, 'rect');
    inner.setAttribute('x', String(box.x + inset));
    inner.setAttribute('y', String(box.y + inset));
    inner.setAttribute('width', String(Math.max(0, box.width - inset * 2)));
    inner.setAttribute('height', String(Math.max(0, box.height - inset * 2)));
    inner.setAttribute('rx', String(Math.max(0, boxCornerRadius - inset)));
    inner.setAttribute('ry', String(Math.max(0, boxCornerRadius - inset)));
    inner.setAttribute('fill', 'none');
    inner.setAttribute('stroke', borderColor);
    inner.setAttribute('stroke-width', String(borderThickness));
    g.appendChild(inner);
  }

  // Label
  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('x', String(box.x + box.width / 2));
  text.setAttribute('y', String(box.y + box.height / 2));
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('fill', config.fontColor);
  text.setAttribute('font-size', String(config.fontSize));
  text.setAttribute('font-family', config.fontFamily);
  text.setAttribute('font-weight', String(config.fontWeight));
  if (config.uppercase) {
    text.setAttribute('text-transform', 'uppercase');
  }
  text.textContent = config.uppercase ? box.label.toUpperCase() : box.label;
  g.appendChild(text);

  return g;
}

function createArrow(arrow: ArrowLayout, config: DiagramConfig): SVGGElement {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'diagram-arrow');

  const { arrowStrokeWidth, arrowHeadSize, arrowColor } = config;
  const hs = arrowHeadSize;

  if (arrow.direction === 'down') {
    // Vertical arrow pointing down
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(arrow.x1));
    line.setAttribute('y1', String(arrow.y1));
    line.setAttribute('x2', String(arrow.x2));
    line.setAttribute('y2', String(arrow.y2 - hs * 1.2));
    line.setAttribute('stroke', arrowColor);
    line.setAttribute('stroke-width', String(arrowStrokeWidth));
    g.appendChild(line);

    // Arrowhead pointing down
    const polygon = document.createElementNS(SVG_NS, 'polygon');
    polygon.setAttribute(
      'points',
      `${arrow.x2},${arrow.y2} ${arrow.x2 - hs},${arrow.y2 - hs * 1.2} ${arrow.x2 + hs},${arrow.y2 - hs * 1.2}`
    );
    polygon.setAttribute('fill', arrowColor);
    g.appendChild(polygon);
  } else {
    // Horizontal arrow pointing right
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(arrow.x1));
    line.setAttribute('y1', String(arrow.y1));
    line.setAttribute('x2', String(arrow.x2 - hs * 1.2));
    line.setAttribute('y2', String(arrow.y2));
    line.setAttribute('stroke', arrowColor);
    line.setAttribute('stroke-width', String(arrowStrokeWidth));
    g.appendChild(line);

    // Arrowhead pointing right
    const polygon = document.createElementNS(SVG_NS, 'polygon');
    polygon.setAttribute(
      'points',
      `${arrow.x2},${arrow.y2} ${arrow.x2 - hs * 1.2},${arrow.y2 - hs} ${arrow.x2 - hs * 1.2},${arrow.y2 + hs}`
    );
    polygon.setAttribute('fill', arrowColor);
    g.appendChild(polygon);
  }

  return g;
}

export function render(config: DiagramConfig, container: HTMLElement): SVGSVGElement {
  const layout = computeLayout(config);

  // Remove old SVG
  const existing = container.querySelector('svg.diagram-svg');
  if (existing) existing.remove();

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'diagram-svg');
  svg.setAttribute('xmlns', SVG_NS);
  svg.setAttribute('width', String(layout.totalWidth));
  svg.setAttribute('height', String(layout.totalHeight));
  svg.setAttribute('viewBox', `0 0 ${layout.totalWidth} ${layout.totalHeight}`);

  // Background
  const bg = document.createElementNS(SVG_NS, 'rect');
  bg.setAttribute('width', String(layout.totalWidth));
  bg.setAttribute('height', String(layout.totalHeight));
  bg.setAttribute('fill', config.backgroundColor);
  svg.appendChild(bg);

  // Boxes
  for (const box of layout.boxes) {
    svg.appendChild(createBox(box, config));
  }

  // Arrows between boxes
  for (const arrow of layout.arrows) {
    svg.appendChild(createArrow(arrow, config));
  }

  // Feedback loop
  if (layout.feedback) {
    svg.appendChild(createFeedbackLoop(layout.feedback, config));
  }

  container.appendChild(svg);
  return svg;
}
