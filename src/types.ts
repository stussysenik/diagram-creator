/* ── Diagram Configuration Types ──
   Core data model for the diagram creator.
   BackgroundConfig extends the original with gradient, pattern, and transparent modes. */

export interface StepConfig {
  label: string
}

export type BackgroundType = 'solid' | 'gradient' | 'pattern' | 'transparent'
export type PatternVariant = 'dots' | 'lines' | 'cross-hatch'

export interface BackgroundConfig {
  type: BackgroundType
  color: string
  gradientFrom: string
  gradientTo: string
  gradientAngle: number
  patternVariant: PatternVariant
  patternColor: string
  patternSpacing: number
  patternBase: string
}

export interface DiagramConfig {
  steps: StepConfig[]

  layoutDirection: 'vertical' | 'horizontal'
  padding: number

  canvasWidth: number
  canvasHeight: number
  background: BackgroundConfig

  boxWidth: number
  boxHeight: number
  boxSpacing: number
  boxCornerRadius: number

  borderThickness: number
  borderGap: number
  borderColor: string

  fontSize: number
  fontFamily: string
  fontWeight: number
  fontColor: string
  uppercase: boolean

  arrowStrokeWidth: number
  arrowHeadSize: number
  arrowColor: string

  feedbackLoop: boolean
  feedbackCornerRadius: number
  feedbackLabel: string
}

export const DEFAULT_BACKGROUND: BackgroundConfig = {
  type: 'solid',
  color: '#f8f7f4',
  gradientFrom: '#f8f7f4',
  gradientTo: '#e0ddd4',
  gradientAngle: 180,
  patternVariant: 'dots',
  patternColor: '#d0d0d0',
  patternSpacing: 20,
  patternBase: '#f8f7f4',
}

export const DEFAULT_CONFIG: DiagramConfig = {
  steps: [
    { label: 'IMAGINE' },
    { label: 'RE-THINK' },
    { label: 'SHIP' },
  ],

  layoutDirection: 'vertical',
  padding: 40,

  canvasWidth: 600,
  canvasHeight: 760,
  background: { ...DEFAULT_BACKGROUND },

  boxWidth: 360,
  boxHeight: 120,
  boxSpacing: 80,
  boxCornerRadius: 0,

  borderThickness: 2,
  borderGap: 0,
  borderColor: '#1a1a1a',

  fontSize: 28,
  fontFamily: 'Rubik',
  fontWeight: 700,
  fontColor: '#1a1a1a',
  uppercase: true,

  arrowStrokeWidth: 2,
  arrowHeadSize: 10,
  arrowColor: '#1a1a1a',

  feedbackLoop: true,
  feedbackCornerRadius: 0,
  feedbackLabel: '',
}

export interface PresetConfig {
  name: string
  config: Partial<DiagramConfig>
}

export const PRESETS: PresetConfig[] = [
  {
    name: 'Reference (Vertical)',
    config: {
      layoutDirection: 'vertical',
      padding: 40,
      canvasWidth: 600,
      canvasHeight: 760,
      background: { ...DEFAULT_BACKGROUND },
      boxWidth: 360,
      boxHeight: 120,
      boxSpacing: 80,
      boxCornerRadius: 0,
      borderThickness: 2,
      borderGap: 0,
      borderColor: '#1a1a1a',
      fontSize: 28,
      fontFamily: 'Rubik',
      fontWeight: 700,
      fontColor: '#1a1a1a',
      uppercase: true,
      arrowStrokeWidth: 2,
      arrowHeadSize: 10,
      arrowColor: '#1a1a1a',
      feedbackLoop: true,
      feedbackCornerRadius: 0,
      feedbackLabel: '',
    },
  },
  {
    name: 'Original (Horizontal)',
    config: {
      layoutDirection: 'horizontal',
      padding: 40,
      canvasWidth: 800,
      canvasHeight: 600,
      background: { type: 'solid', color: '#ffffff', gradientFrom: '#ffffff', gradientTo: '#e0e0e0', gradientAngle: 180, patternVariant: 'dots', patternColor: '#d0d0d0', patternSpacing: 20, patternBase: '#ffffff' },
      boxWidth: 180,
      boxHeight: 64,
      boxSpacing: 80,
      boxCornerRadius: 12,
      borderThickness: 2.5,
      borderGap: 4,
      borderColor: '#1a1a1a',
      fontSize: 18,
      fontFamily: 'Inter',
      fontWeight: 700,
      fontColor: '#1a1a1a',
      uppercase: true,
      arrowStrokeWidth: 2.5,
      arrowHeadSize: 10,
      arrowColor: '#1a1a1a',
      feedbackLoop: true,
      feedbackCornerRadius: 20,
      feedbackLabel: 'REPEAT',
    },
  },
]
