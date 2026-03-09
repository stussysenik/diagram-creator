export interface StepConfig {
  label: string;
}

export interface DiagramConfig {
  steps: StepConfig[];

  // Layout
  layoutDirection: 'vertical' | 'horizontal';
  padding: number;

  // Canvas
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;

  // Boxes
  boxWidth: number;
  boxHeight: number;
  boxSpacing: number;
  boxCornerRadius: number;

  // Borders
  borderThickness: number;
  borderGap: number;
  borderColor: string;

  // Typography
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  fontColor: string;
  uppercase: boolean;

  // Arrows
  arrowStrokeWidth: number;
  arrowHeadSize: number;
  arrowColor: string;

  // Feedback loop
  feedbackLoop: boolean;
  feedbackCornerRadius: number;
  feedbackLabel: string;
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
  backgroundColor: '#f8f7f4',

  boxWidth: 360,
  boxHeight: 120,
  boxSpacing: 80,
  boxCornerRadius: 0,

  borderThickness: 2,
  borderGap: 0,
  borderColor: '#1a1a1a',

  fontSize: 28,
  fontFamily: 'monospace',
  fontWeight: 700,
  fontColor: '#1a1a1a',
  uppercase: true,

  arrowStrokeWidth: 2,
  arrowHeadSize: 10,
  arrowColor: '#1a1a1a',

  feedbackLoop: true,
  feedbackCornerRadius: 0,
  feedbackLabel: '',
};

export interface PresetConfig {
  name: string;
  config: Partial<DiagramConfig>;
}

export const PRESETS: PresetConfig[] = [
  {
    name: 'Reference (Vertical)',
    config: {
      layoutDirection: 'vertical',
      padding: 40,
      canvasWidth: 600,
      canvasHeight: 760,
      backgroundColor: '#f8f7f4',
      boxWidth: 360,
      boxHeight: 120,
      boxSpacing: 80,
      boxCornerRadius: 0,
      borderThickness: 2,
      borderGap: 0,
      borderColor: '#1a1a1a',
      fontSize: 28,
      fontFamily: 'monospace',
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
      backgroundColor: '#ffffff',
      boxWidth: 180,
      boxHeight: 64,
      boxSpacing: 80,
      boxCornerRadius: 12,
      borderThickness: 2.5,
      borderGap: 4,
      borderColor: '#1a1a1a',
      fontSize: 18,
      fontFamily: 'Inter, system-ui, sans-serif',
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
];
