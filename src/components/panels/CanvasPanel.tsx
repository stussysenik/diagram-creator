import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'

export function CanvasPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)

  return (
    <>
      <SliderField label="Width" value={config.canvasWidth} min={400} max={2000} onChange={(v) => set({ canvasWidth: v })} />
      <SliderField label="Height" value={config.canvasHeight} min={300} max={1500} onChange={(v) => set({ canvasHeight: v })} />
    </>
  )
}
