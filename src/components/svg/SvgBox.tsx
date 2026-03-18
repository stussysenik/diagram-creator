/* ── SvgBox ──
   Renders a diagram box: outer rect, optional inner rect (double border), and label. */

import type { BoxLayout } from '../../lib/geometry'
import type { DiagramConfig } from '../../types'

interface Props {
  box: BoxLayout
  config: DiagramConfig
}

export function SvgBox({ box, config }: Props) {
  const { borderThickness, borderGap, borderColor, boxCornerRadius } = config

  return (
    <g className="diagram-box">
      <rect
        x={box.x}
        y={box.y}
        width={box.width}
        height={box.height}
        rx={boxCornerRadius}
        ry={boxCornerRadius}
        fill="none"
        stroke={borderColor}
        strokeWidth={borderThickness}
      />

      {borderGap > 0 && (() => {
        const inset = borderThickness / 2 + borderGap
        return (
          <rect
            x={box.x + inset}
            y={box.y + inset}
            width={Math.max(0, box.width - inset * 2)}
            height={Math.max(0, box.height - inset * 2)}
            rx={Math.max(0, boxCornerRadius - inset)}
            ry={Math.max(0, boxCornerRadius - inset)}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderThickness}
          />
        )
      })()}

      <text
        x={box.x + box.width / 2}
        y={box.y + box.height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={config.fontColor}
        fontSize={config.fontSize}
        fontFamily={config.fontFamily}
        fontWeight={config.fontWeight}
      >
        {config.uppercase ? box.label.toUpperCase() : box.label}
      </text>
    </g>
  )
}
