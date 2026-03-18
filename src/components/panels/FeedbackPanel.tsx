import { useStore } from '../../store'
import { SliderField } from './shared/SliderField'
import { Flex, Text, Input, Switch } from '@chakra-ui/react'

export function FeedbackPanel() {
  const config = useStore((s) => s.config)
  const set = useStore((s) => s.set)

  return (
    <>
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Enabled</Text>
        <Switch.Root
          checked={config.feedbackLoop}
          onCheckedChange={(d) => set({ feedbackLoop: d.checked })}
          size="sm"
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Flex>
      <SliderField label="Corner radius" value={config.feedbackCornerRadius} min={0} max={60} onChange={(v) => set({ feedbackCornerRadius: v })} />
      <Flex align="center" gap={3} py={1}>
        <Text fontSize="xs" color="fg.muted" minW="80px" flexShrink={0}>Label</Text>
        <Input
          size="xs"
          value={config.feedbackLabel}
          onChange={(e) => set({ feedbackLabel: e.target.value })}
          maxW="160px"
        />
      </Flex>
    </>
  )
}
