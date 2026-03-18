/* ── SvgArrow ──
   Renders an arrow between boxes: line segment + triangular arrowhead. */

import type { ArrowLayout } from '../../lib/geometry'
import type { DiagramConfig } from '../../types'

interface Props {
  arrow: ArrowLayout
  config: DiagramConfig
}

export function SvgArrow({ arrow, config }: Props) {
  const { arrowStrokeWidth, arrowHeadSize: hs, arrowColor } = config

  if (arrow.direction === 'down') {
    return (
      <g className="diagram-arrow">
        <line
          x1={arrow.x1} y1={arrow.y1}
          x2={arrow.x2} y2={arrow.y2 - hs * 1.2}
          stroke={arrowColor} strokeWidth={arrowStrokeWidth}
        />
        <polygon
          points={`${arrow.x2},${arrow.y2} ${arrow.x2 - hs},${arrow.y2 - hs * 1.2} ${arrow.x2 + hs},${arrow.y2 - hs * 1.2}`}
          fill={arrowColor}
        />
      </g>
    )
  }

  return (
    <g className="diagram-arrow">
      <line
        x1={arrow.x1} y1={arrow.y1}
        x2={arrow.x2 - hs * 1.2} y2={arrow.y2}
        stroke={arrowColor} strokeWidth={arrowStrokeWidth}
      />
      <polygon
        points={`${arrow.x2},${arrow.y2} ${arrow.x2 - hs * 1.2},${arrow.y2 - hs} ${arrow.x2 - hs * 1.2},${arrow.y2 + hs}`}
        fill={arrowColor}
      />
    </g>
  )
}
