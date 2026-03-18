import { useState } from 'react'
import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'
import { ColorField } from './shared/ColorField'
import { SelectField } from './shared/SelectField'
import { Flex, Text, Input, Switch } from '@chakra-ui/react'

const FONT_OPTIONS = [
  { value: 'Rubik', label: 'Rubik' },
  { value: 'Inter', label: 'Inter' },
  { value: 'Space Grotesk', label: 'Space Grotesk' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: '__custom__', label: 'Custom...' },
]

export function TypographyPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)
  const isPreset = FONT_OPTIONS.some((o) => o.value === config.fontFamily)
  const [customMode, setCustomMode] = useState(!isPreset)

  const handleFontSelect = (value: string) => {
    if (value === '__custom__') {
      setCustomMode(true)
    } else {
      setCustomMode(false)
      set({ fontFamily: value })
    }
  }

  return (
    <>
      <SliderField label="Size" value={config.fontSize} min={8} max={48} onChange={(v) => set({ fontSize: v })} />
      {customMode ? (
        <Flex align="center" gap={3} py={1}>
          <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Family</Text>
          <Input
            size="xs"
            value={config.fontFamily}
            onChange={(e) => set({ fontFamily: e.target.value })}
            maxW="160px"
            placeholder="e.g. Georgia, serif"
          />
        </Flex>
      ) : (
        <SelectField
          label="Family"
          value={config.fontFamily}
          options={FONT_OPTIONS}
          onChange={handleFontSelect}
        />
      )}
      <SliderField label="Weight" value={config.fontWeight} min={100} max={900} step={100} onChange={(v) => set({ fontWeight: v })} />
      <ColorField label="Color" value={config.fontColor} onChange={(v) => set({ fontColor: v })} />
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Uppercase</Text>
        <Switch.Root
          checked={config.uppercase}
          onCheckedChange={(d) => set({ uppercase: d.checked })}
          size="sm"
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Flex>
    </>
  )
}
