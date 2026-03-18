import { useStore } from '../../store'
import { PRESETS } from '../../types'
import { SelectField } from './shared/SelectField'
import { Flex, Text, NativeSelect } from '@chakra-ui/react'

export function LayoutPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)
  const loadConfig = useStore((s) => s.loadConfig)

  return (
    <>
      <SelectField
        label="Direction"
        value={config.layoutDirection}
        options={[
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' },
        ]}
        onChange={(v) => set({ layoutDirection: v as 'vertical' | 'horizontal' })}
      />
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>
          Preset
        </Text>
        <NativeSelect.Root size="xs" flex={1} maxW="160px">
          <NativeSelect.Field
            value=""
            onChange={(e) => {
              const preset = PRESETS.find((p) => p.name === e.target.value)
              if (preset) loadConfig({ ...config, ...preset.config })
            }}
          >
            <option value="">Choose preset...</option>
            {PRESETS.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
    </>
  )
}
