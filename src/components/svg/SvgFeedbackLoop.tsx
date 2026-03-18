/* ── SvgFeedbackLoop ──
   Renders the feedback loop path with arrowhead and optional label.
   Uses pure path data functions from lib/feedback-paths.ts. */

import type { FeedbackLayout } from '../../lib/geometry'
import type { DiagramConfig } from '../../types'
import { computeFeedbackPath } from '../../lib/feedback-paths'

interface Props {
  feedback: FeedbackLayout
  config: DiagramConfig
}

export function SvgFeedbackLoop({ feedback, config }: Props) {
  const { d, arrowPoints, label } = computeFeedbackPath(feedback, config)

  return (
    <g className="feedback-loop">
      <path
        d={d}
        fill="none"
        stroke={config.arrowColor}
        strokeWidth={config.arrowStrokeWidth}
      />
      <polygon points={arrowPoints} fill={config.arrowColor} />
      {label && (
        <text
          x={label.x}
          y={label.y}
          textAnchor="middle"
          fill={config.arrowColor}
          fontSize={config.fontSize * 0.75}
          fontFamily={config.fontFamily}
          fontWeight={config.fontWeight}
          transform={label.rotation !== 0 ? `rotate(${label.rotation}, ${label.x}, ${label.y})` : undefined}
        >
          {label.text}
        </text>
      )}
    </g>
  )
}
