import type { DiagramConfig } from '../types';
import type { FeedbackLayout } from './geometry';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function createFeedbackLoop(
  feedback: FeedbackLayout,
  config: DiagramConfig
): SVGGElement {
  if (feedback.direction === 'vertical') {
    return createVerticalFeedback(feedback, config);
  }
  return createHorizontalFeedback(feedback, config);
}

function createVerticalFeedback(
  feedback: FeedbackLayout,
  config: DiagramConfig
): SVGGElement {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'feedback-loop');

  const { startX, startY, endX, endY, loopOffset, cornerRadius } = feedback;
  const r = cornerRadius;

  // Vertical feedback path: all straight lines matching reference SVG
  // Down from last box bottom-center → left to loopX → up to first box centerY → right to first box left edge
  const loopX = endX - 40; // 40px left of first box
  const bottomY = startY + loopOffset;

  const path = document.createElementNS(SVG_NS, 'path');

  let d: string;
  if (r > 0) {
    // With rounded corners at the 3 turn points
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${bottomY - r}`,
      `Q ${startX} ${bottomY} ${startX - r} ${bottomY}`,
      `L ${loopX + r} ${bottomY}`,
      `Q ${loopX} ${bottomY} ${loopX} ${bottomY - r}`,
      `L ${loopX} ${endY + r}`,
      `Q ${loopX} ${endY} ${loopX + r} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(' ');
  } else {
    // Sharp 90-degree turns (matching reference exactly)
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${bottomY}`,
      `L ${loopX} ${bottomY}`,
      `L ${loopX} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(' ');
  }

  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', config.arrowColor);
  path.setAttribute('stroke-width', String(config.arrowStrokeWidth));
  g.appendChild(path);

  // Arrowhead pointing RIGHT into first box left edge
  const hs = config.arrowHeadSize;
  const arrow = document.createElementNS(SVG_NS, 'polygon');
  arrow.setAttribute(
    'points',
    `${endX},${endY} ${endX - hs * 1.2},${endY - hs} ${endX - hs * 1.2},${endY + hs}`
  );
  arrow.setAttribute('fill', config.arrowColor);
  g.appendChild(arrow);

  // Optional label along left vertical segment
  if (config.feedbackLabel) {
    const midY = (bottomY + endY) / 2;
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('x', String(loopX - 8));
    text.setAttribute('y', String(midY));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', config.arrowColor);
    text.setAttribute('font-size', String(config.fontSize * 0.75));
    text.setAttribute('font-family', config.fontFamily);
    text.setAttribute('font-weight', String(config.fontWeight));
    text.setAttribute('transform', `rotate(-90, ${loopX - 8}, ${midY})`);
    text.textContent = config.uppercase
      ? config.feedbackLabel.toUpperCase()
      : config.feedbackLabel;
    g.appendChild(text);
  }

  return g;
}

function createHorizontalFeedback(
  feedback: FeedbackLayout,
  config: DiagramConfig
): SVGGElement {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'feedback-loop');

  const { startX, startY, endX, endY, loopOffset, cornerRadius } = feedback;
  const r = cornerRadius;
  const loopY = startY + loopOffset;

  const path = document.createElementNS(SVG_NS, 'path');

  let d: string;
  if (r > 0) {
    const downToCorner1 = loopY - r;
    const upFromCorner2 = loopY - r;
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${downToCorner1}`,
      `Q ${startX} ${loopY} ${startX - r} ${loopY}`,
      `L ${endX + r} ${loopY}`,
      `Q ${endX} ${loopY} ${endX} ${upFromCorner2}`,
      `L ${endX} ${endY}`,
    ].join(' ');
  } else {
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${loopY}`,
      `L ${endX} ${loopY}`,
      `L ${endX} ${endY}`,
    ].join(' ');
  }

  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', config.arrowColor);
  path.setAttribute('stroke-width', String(config.arrowStrokeWidth));
  g.appendChild(path);

  // Arrowhead pointing up at the end (into first box bottom)
  const hs = config.arrowHeadSize;
  const arrow = document.createElementNS(SVG_NS, 'polygon');
  arrow.setAttribute(
    'points',
    `${endX},${endY} ${endX - hs},${endY + hs * 1.2} ${endX + hs},${endY + hs * 1.2}`
  );
  arrow.setAttribute('fill', config.arrowColor);
  g.appendChild(arrow);

  // Optional label on the bottom horizontal segment
  if (config.feedbackLabel) {
    const midX = (startX + endX) / 2;
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('x', String(midX));
    text.setAttribute('y', String(loopY - 8));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', config.arrowColor);
    text.setAttribute('font-size', String(config.fontSize * 0.75));
    text.setAttribute('font-family', config.fontFamily);
    text.setAttribute('font-weight', String(config.fontWeight));
    text.textContent = config.uppercase
      ? config.feedbackLabel.toUpperCase()
      : config.feedbackLabel;
    g.appendChild(text);
  }

  return g;
}
