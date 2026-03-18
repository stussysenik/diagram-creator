/* ── Diagram Templates ──
   Pre-built configurations for common diagram patterns. */

import type { DiagramConfig } from '../types'
import { DEFAULT_CONFIG, DEFAULT_BACKGROUND } from '../types'

export interface Template {
  name: string
  description: string
  config: DiagramConfig
}

const base = (overrides: Partial<DiagramConfig>): DiagramConfig => ({
  ...DEFAULT_CONFIG,
  background: { ...DEFAULT_BACKGROUND },
  ...overrides,
})

export const TEMPLATES: Template[] = [
  {
    name: 'Simple Process',
    description: '3-step vertical, minimal',
    config: base({
      steps: [{ label: 'INPUT' }, { label: 'PROCESS' }, { label: 'OUTPUT' }],
      fontFamily: 'Rubik',
      feedbackLoop: false,
    }),
  },
  {
    name: 'Design Thinking',
    description: '5-step horizontal + feedback',
    config: base({
      steps: [
        { label: 'EMPATHIZE' },
        { label: 'DEFINE' },
        { label: 'IDEATE' },
        { label: 'PROTOTYPE' },
        { label: 'TEST' },
      ],
      layoutDirection: 'horizontal',
      canvasWidth: 1100,
      canvasHeight: 500,
      boxWidth: 150,
      boxHeight: 60,
      boxSpacing: 60,
      boxCornerRadius: 8,
      fontSize: 14,
      fontFamily: 'DM Sans',
      feedbackLoop: true,
      feedbackCornerRadius: 16,
      feedbackLabel: 'ITERATE',
    }),
  },
  {
    name: 'Sprint Cycle',
    description: '4-step vertical, rounded corners',
    config: base({
      steps: [
        { label: 'PLAN' },
        { label: 'BUILD' },
        { label: 'REVIEW' },
        { label: 'RETRO' },
      ],
      canvasHeight: 900,
      boxCornerRadius: 16,
      borderGap: 4,
      fontFamily: 'Space Grotesk',
      feedbackLoop: false,
    }),
  },
  {
    name: 'Build-Measure-Learn',
    description: '3-step + feedback loop',
    config: base({
      steps: [{ label: 'BUILD' }, { label: 'MEASURE' }, { label: 'LEARN' }],
      feedbackLoop: true,
      feedbackCornerRadius: 12,
      feedbackLabel: 'PIVOT',
      boxCornerRadius: 8,
      fontFamily: 'Inter',
    }),
  },
  {
    name: 'Deploy Pipeline',
    description: '4-step horizontal',
    config: base({
      steps: [
        { label: 'COMMIT' },
        { label: 'BUILD' },
        { label: 'TEST' },
        { label: 'DEPLOY' },
      ],
      layoutDirection: 'horizontal',
      canvasWidth: 960,
      canvasHeight: 400,
      boxWidth: 160,
      boxHeight: 64,
      boxSpacing: 60,
      fontSize: 18,
      fontFamily: 'JetBrains Mono',
      feedbackLoop: false,
    }),
  },
  {
    name: 'PDCA Cycle',
    description: '4-step + feedback loop',
    config: base({
      steps: [
        { label: 'PLAN' },
        { label: 'DO' },
        { label: 'CHECK' },
        { label: 'ACT' },
      ],
      canvasHeight: 960,
      feedbackLoop: true,
      feedbackCornerRadius: 0,
      feedbackLabel: 'REPEAT',
      fontFamily: 'Rubik',
    }),
  },
]
