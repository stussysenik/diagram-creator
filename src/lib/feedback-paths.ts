/* ── Feedback Loop Path Data ──
   Pure functions that return SVG path `d` strings and arrowhead points
   for vertical and horizontal feedback loops.
   Extracted from the imperative feedback-loop.ts renderer. */

import type { FeedbackLayout } from './geometry'
import type { DiagramConfig } from '../types'

interface FeedbackPathData {
  d: string
  arrowPoints: string
  label: {
    x: number
    y: number
    text: string
    rotation: number
  } | null
}

export function computeFeedbackPath(
  feedback: FeedbackLayout,
  config: DiagramConfig
): FeedbackPathData {
  if (feedback.direction === 'vertical') {
    return verticalPath(feedback, config)
  }
  return horizontalPath(feedback, config)
}

function verticalPath(fb: FeedbackLayout, config: DiagramConfig): FeedbackPathData {
  const { startX, startY, endX, endY, loopOffset, cornerRadius: r } = fb
  const loopX = endX - 40
  const bottomY = startY + loopOffset
  const hs = config.arrowHeadSize

  let d: string
  if (r > 0) {
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${bottomY - r}`,
      `Q ${startX} ${bottomY} ${startX - r} ${bottomY}`,
      `L ${loopX + r} ${bottomY}`,
      `Q ${loopX} ${bottomY} ${loopX} ${bottomY - r}`,
      `L ${loopX} ${endY + r}`,
      `Q ${loopX} ${endY} ${loopX + r} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(' ')
  } else {
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${bottomY}`,
      `L ${loopX} ${bottomY}`,
      `L ${loopX} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(' ')
  }

  const arrowPoints = `${endX},${endY} ${endX - hs * 1.2},${endY - hs} ${endX - hs * 1.2},${endY + hs}`

  const labelText = config.feedbackLabel
    ? (config.uppercase ? config.feedbackLabel.toUpperCase() : config.feedbackLabel)
    : null

  const label = labelText
    ? { x: loopX - 8, y: (bottomY + endY) / 2, text: labelText, rotation: -90 }
    : null

  return { d, arrowPoints, label }
}

function horizontalPath(fb: FeedbackLayout, config: DiagramConfig): FeedbackPathData {
  const { startX, startY, endX, endY, loopOffset, cornerRadius: r } = fb
  const loopY = startY + loopOffset
  const hs = config.arrowHeadSize

  let d: string
  if (r > 0) {
    const downToCorner1 = loopY - r
    const upFromCorner2 = loopY - r
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${downToCorner1}`,
      `Q ${startX} ${loopY} ${startX - r} ${loopY}`,
      `L ${endX + r} ${loopY}`,
      `Q ${endX} ${loopY} ${endX} ${upFromCorner2}`,
      `L ${endX} ${endY}`,
    ].join(' ')
  } else {
    d = [
      `M ${startX} ${startY}`,
      `L ${startX} ${loopY}`,
      `L ${endX} ${loopY}`,
      `L ${endX} ${endY}`,
    ].join(' ')
  }

  const arrowPoints = `${endX},${endY} ${endX - hs},${endY + hs * 1.2} ${endX + hs},${endY + hs * 1.2}`

  const labelText = config.feedbackLabel
    ? (config.uppercase ? config.feedbackLabel.toUpperCase() : config.feedbackLabel)
    : null

  const label = labelText
    ? { x: (startX + endX) / 2, y: loopY - 8, text: labelText, rotation: 0 }
    : null

  return { d, arrowPoints, label }
}
