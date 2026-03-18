/* ── DiagramSVG ──
   Root SVG component. Computes layout from config, renders all diagram elements.
   Memoized layout computation for performance. */

import { useMemo, forwardRef } from 'react'
import type { DiagramConfig } from '../../types'
import { computeLayout } from '../../lib/geometry'
import { SvgBackground } from './SvgBackground'
import { SvgBox } from './SvgBox'
import { SvgArrow } from './SvgArrow'
import { SvgFeedbackLoop } from './SvgFeedbackLoop'

interface Props {
  config: DiagramConfig
}

export const DiagramSVG = forwardRef<SVGSVGElement, Props>(({ config }, ref) => {
  const layout = useMemo(() => computeLayout(config), [config])

  const stepsDesc = config.steps.map((s) => s.label).join(', ')
  const ariaLabel = `Flow diagram: ${stepsDesc}. ${config.layoutDirection} layout.`

  return (
    <svg
      ref={ref}
      className="diagram-svg"
      xmlns="http://www.w3.org/2000/svg"
      width={layout.totalWidth}
      height={layout.totalHeight}
      viewBox={`0 0 ${layout.totalWidth} ${layout.totalHeight}`}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>

      <SvgBackground
        width={layout.totalWidth}
        height={layout.totalHeight}
        background={config.background}
      />

      {layout.boxes.map((box, i) => (
        <SvgBox key={i} box={box} config={config} />
      ))}

      {layout.arrows.map((arrow, i) => (
        <SvgArrow key={i} arrow={arrow} config={config} />
      ))}

      {layout.feedback && (
        <SvgFeedbackLoop feedback={layout.feedback} config={config} />
      )}
    </svg>
  )
})

DiagramSVG.displayName = 'DiagramSVG'
