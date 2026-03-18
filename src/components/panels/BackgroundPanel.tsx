import { useStore } from '../../store'
import type { BackgroundType, PatternVariant } from '../../types'
import { SelectField } from './shared/SelectField'
import { ColorField } from './shared/ColorField'
import { SliderField } from './shared/SliderField'

export function BackgroundPanel() {
  const bg = useStore((s) => s.config.background)
  const setBg = useStore((s) => s.setBackground)

  return (
    <>
      <SelectField
        label="Type"
        value={bg.type}
        options={[
          { value: 'solid', label: 'Solid' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'pattern', label: 'Pattern' },
          { value: 'transparent', label: 'Transparent' },
        ]}
        onChange={(v) => setBg({ type: v as BackgroundType })}
      />

      {bg.type === 'solid' && (
        <ColorField label="Color" value={bg.color} onChange={(v) => setBg({ color: v })} />
      )}

      {bg.type === 'gradient' && (
        <>
          <ColorField label="From" value={bg.gradientFrom} onChange={(v) => setBg({ gradientFrom: v })} />
          <ColorField label="To" value={bg.gradientTo} onChange={(v) => setBg({ gradientTo: v })} />
          <SliderField label="Angle" value={bg.gradientAngle} min={0} max={360} onChange={(v) => setBg({ gradientAngle: v })} />
        </>
      )}

      {bg.type === 'pattern' && (
        <>
          <SelectField
            label="Pattern"
            value={bg.patternVariant}
            options={[
              { value: 'dots', label: 'Dots' },
              { value: 'lines', label: 'Lines' },
              { value: 'cross-hatch', label: 'Cross Hatch' },
            ]}
            onChange={(v) => setBg({ patternVariant: v as PatternVariant })}
          />
          <ColorField label="Base" value={bg.patternBase} onChange={(v) => setBg({ patternBase: v })} />
          <ColorField label="Pattern" value={bg.patternColor} onChange={(v) => setBg({ patternColor: v })} />
          <SliderField label="Spacing" value={bg.patternSpacing} min={8} max={60} onChange={(v) => setBg({ patternSpacing: v })} />
        </>
      )}
    </>
  )
}
