import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'
import { ColorField } from './shared/ColorField'

export function ArrowsPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)

  return (
    <>
      <SliderField label="Stroke" value={config.arrowStrokeWidth} min={0.5} max={8} step={0.5} onChange={(v) => set({ arrowStrokeWidth: v })} />
      <SliderField label="Head size" value={config.arrowHeadSize} min={4} max={24} onChange={(v) => set({ arrowHeadSize: v })} />
      <ColorField label="Color" value={config.arrowColor} onChange={(v) => set({ arrowColor: v })} />
    </>
  )
}
