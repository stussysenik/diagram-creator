/* ── SliderField ──
   Label + range slider + numeric readout. */

import { Box, Flex, Slider, Text } from '@chakra-ui/react'

interface Props {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

export function SliderField({ label, value, min, max, step = 1, onChange }: Props) {
  return (
    <Flex align="center" gap={3} py={1}>
      <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>
        {label}
      </Text>
      <Box flex={1}>
        <Slider.Root
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(d) => onChange(d.value[0])}
          size="sm"
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
          </Slider.Control>
        </Slider.Root>
      </Box>
      <Text fontSize="xs" color="fg.muted" fontVariantNumeric="tabular-nums" minW="32px" textAlign="right">
        {value}
      </Text>
    </Flex>
  )
}
