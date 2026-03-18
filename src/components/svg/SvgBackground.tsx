/* ── SvgBackground ──
   Renders one of four background types inside the SVG:
   solid, gradient, pattern (dots/lines/cross-hatch), or transparent. */

import type { BackgroundConfig } from '../../types'

interface Props {
  width: number
  height: number
  background: BackgroundConfig
}

export function SvgBackground({ width, height, background }: Props) {
  switch (background.type) {
    case 'transparent':
      return null

    case 'solid':
      return <rect width={width} height={height} fill={background.color} />

    case 'gradient':
      return <GradientBackground width={width} height={height} bg={background} />

    case 'pattern':
      return <PatternBackground width={width} height={height} bg={background} />
  }
}

function GradientBackground({ width, height, bg }: { width: number; height: number; bg: BackgroundConfig }) {
  const rad = (bg.gradientAngle * Math.PI) / 180
  const x1 = 50 - Math.sin(rad) * 50
  const y1 = 50 - Math.cos(rad) * 50
  const x2 = 50 + Math.sin(rad) * 50
  const y2 = 50 + Math.cos(rad) * 50

  return (
    <>
      <defs>
        <linearGradient id="bg-grad" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
          <stop offset="0%" stopColor={bg.gradientFrom} />
          <stop offset="100%" stopColor={bg.gradientTo} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#bg-grad)" />
    </>
  )
}

function PatternBackground({ width, height, bg }: { width: number; height: number; bg: BackgroundConfig }) {
  const s = bg.patternSpacing
  const id = 'bg-pat'

  let patternContent: React.ReactNode
  switch (bg.patternVariant) {
    case 'dots':
      patternContent = <circle cx={s / 2} cy={s / 2} r={1.5} fill={bg.patternColor} />
      break
    case 'lines':
      patternContent = <line x1={0} y1={s} x2={s} y2={0} stroke={bg.patternColor} strokeWidth={0.5} />
      break
    case 'cross-hatch':
      patternContent = (
        <>
          <line x1={0} y1={0} x2={s} y2={s} stroke={bg.patternColor} strokeWidth={0.5} />
          <line x1={s} y1={0} x2={0} y2={s} stroke={bg.patternColor} strokeWidth={0.5} />
        </>
      )
      break
  }

  return (
    <>
      <defs>
        <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
          <rect width={s} height={s} fill={bg.patternBase} />
          {patternContent}
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id})`} />
    </>
  )
}
