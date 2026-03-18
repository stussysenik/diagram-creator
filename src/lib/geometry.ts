/* ── Layout Geometry ──
   Pure functions that compute box positions, arrow endpoints,
   and feedback loop coordinates from a DiagramConfig.
   Ported unchanged from the vanilla implementation. */

import type { DiagramConfig } from '../types'

export interface BoxLayout {
  x: number
  y: number
  width: number
  height: number
  label: string
}

export interface ArrowLayout {
  x1: number
  y1: number
  x2: number
  y2: number
  direction: 'right' | 'down'
}

export interface FeedbackLayout {
  startX: number
  startY: number
  endX: number
  endY: number
  loopOffset: number
  cornerRadius: number
  direction: 'vertical' | 'horizontal'
}

export interface DiagramLayout {
  boxes: BoxLayout[]
  arrows: ArrowLayout[]
  feedback: FeedbackLayout | null
  totalWidth: number
  totalHeight: number
}

export function computeLayout(config: DiagramConfig): DiagramLayout {
  if (config.layoutDirection === 'vertical') {
    return computeVerticalLayout(config)
  }
  return computeHorizontalLayout(config)
}

function computeVerticalLayout(config: DiagramConfig): DiagramLayout {
  const { steps, boxWidth, boxHeight, boxSpacing, canvasWidth, canvasHeight } = config

  const centerX = canvasWidth / 2
  const totalChainHeight = steps.length * boxHeight + (steps.length - 1) * boxSpacing
  const startY = (canvasHeight - totalChainHeight) / 2

  const boxes: BoxLayout[] = steps.map((step, i) => ({
    x: centerX - boxWidth / 2,
    y: startY + i * (boxHeight + boxSpacing),
    width: boxWidth,
    height: boxHeight,
    label: step.label,
  }))

  const arrows: ArrowLayout[] = []
  for (let i = 0; i < boxes.length - 1; i++) {
    const from = boxes[i]
    const to = boxes[i + 1]
    arrows.push({
      x1: from.x + from.width / 2,
      y1: from.y + from.height,
      x2: to.x + to.width / 2,
      y2: to.y,
      direction: 'down',
    })
  }

  let feedback: FeedbackLayout | null = null
  if (config.feedbackLoop && boxes.length >= 2) {
    const last = boxes[boxes.length - 1]
    const first = boxes[0]
    const loopOffset = 60
    feedback = {
      startX: last.x + last.width / 2,
      startY: last.y + last.height,
      endX: first.x,
      endY: first.y + first.height / 2,
      loopOffset,
      cornerRadius: config.feedbackCornerRadius,
      direction: 'vertical',
    }
  }

  return { boxes, arrows, feedback, totalWidth: canvasWidth, totalHeight: canvasHeight }
}

function computeHorizontalLayout(config: DiagramConfig): DiagramLayout {
  const { steps, boxWidth, boxHeight, boxSpacing, canvasWidth, canvasHeight } = config

  const totalChainWidth = steps.length * boxWidth + (steps.length - 1) * boxSpacing
  const startX = (canvasWidth - totalChainWidth) / 2
  const centerY = canvasHeight / 2

  const boxes: BoxLayout[] = steps.map((step, i) => ({
    x: startX + i * (boxWidth + boxSpacing),
    y: centerY - boxHeight / 2,
    width: boxWidth,
    height: boxHeight,
    label: step.label,
  }))

  const arrows: ArrowLayout[] = []
  for (let i = 0; i < boxes.length - 1; i++) {
    const from = boxes[i]
    const to = boxes[i + 1]
    arrows.push({
      x1: from.x + from.width,
      y1: from.y + from.height / 2,
      x2: to.x,
      y2: to.y + to.height / 2,
      direction: 'right',
    })
  }

  let feedback: FeedbackLayout | null = null
  if (config.feedbackLoop && boxes.length >= 2) {
    const last = boxes[boxes.length - 1]
    const first = boxes[0]
    const loopOffset = boxHeight * 1.2 + 30
    feedback = {
      startX: last.x + last.width / 2,
      startY: last.y + last.height,
      endX: first.x + first.width / 2,
      endY: first.y + first.height,
      loopOffset,
      cornerRadius: config.feedbackCornerRadius,
      direction: 'horizontal',
    }
  }

  return { boxes, arrows, feedback, totalWidth: canvasWidth, totalHeight: canvasHeight }
}
