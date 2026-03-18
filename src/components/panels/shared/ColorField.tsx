/* ── ColorField ──
   Label + native color input. */

import { Flex, Text } from '@chakra-ui/react'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorField({ label, value, onChange }: Props) {
  return (
    <Flex align="center" gap={3} py={1}>
      <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>
        {label}
      </Text>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 32,
          height: 24,
          border: '1px solid var(--chakra-colors-border)',
          borderRadius: 4,
          cursor: 'pointer',
          padding: 0,
        }}
      />
    </Flex>
  )
}
