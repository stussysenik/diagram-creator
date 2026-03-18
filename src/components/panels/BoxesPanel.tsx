import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'

export function BoxesPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)

  return (
    <>
      <SliderField label="Width" value={config.boxWidth} min={60} max={400} onChange={(v) => set({ boxWidth: v })} />
      <SliderField label="Height" value={config.boxHeight} min={30} max={200} onChange={(v) => set({ boxHeight: v })} />
      <SliderField label="Spacing" value={config.boxSpacing} min={20} max={200} onChange={(v) => set({ boxSpacing: v })} />
      <SliderField label="Corner radius" value={config.boxCornerRadius} min={0} max={40} onChange={(v) => set({ boxCornerRadius: v })} />
    </>
  )
}
