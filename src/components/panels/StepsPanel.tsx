import { useStore } from '../../store'
import { Flex, Input, IconButton, Button, Box } from '@chakra-ui/react'

export function StepsPanel() {
  const steps = useStore((s) => s.config.steps)
  const updateStep = useStore((s) => s.updateStep)
  const addStep = useStore((s) => s.addStep)
  const removeStep = useStore((s) => s.removeStep)

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {steps.map((step, i) => (
        <Flex key={i} gap={2}>
          <Input
            size="xs"
            value={step.label}
            onChange={(e) => updateStep(i, { label: e.target.value })}
            flex={1}
          />
          <IconButton
            aria-label="Remove step"
            size="xs"
            variant="outline"
            disabled={steps.length <= 1}
            onClick={() => removeStep(i)}
          >
            ×
          </IconButton>
        </Flex>
      ))}
      <Button
        size="xs"
        variant="outline"
        onClick={() => addStep()}
        colorPalette="blue"
      >
        + Add Step
      </Button>
    </Box>
  )
}
