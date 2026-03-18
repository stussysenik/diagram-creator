import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'
import { ColorField } from './shared/ColorField'

export function BordersPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)

  return (
    <>
      <SliderField label="Thickness" value={config.borderThickness} min={0.5} max={8} step={0.5} onChange={(v) => set({ borderThickness: v })} />
      <SliderField label="Gap (double)" value={config.borderGap} min={0} max={12} onChange={(v) => set({ borderGap: v })} />
      <ColorField label="Color" value={config.borderColor} onChange={(v) => set({ borderColor: v })} />
    </>
  )
}
