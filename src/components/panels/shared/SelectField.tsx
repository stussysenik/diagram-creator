/* ── SelectField ──
   Label + native select for simple dropdowns. */

import { Flex, Text, NativeSelect } from '@chakra-ui/react'

interface Props {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function SelectField({ label, value, options, onChange }: Props) {
  return (
    <Flex align="center" gap={3} py={1}>
      <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>
        {label}
      </Text>
      <NativeSelect.Root size="xs" flex={1} maxW="160px">
        <NativeSelect.Field
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  )
}
