/* ── TemplateCard ──
   Mini SVG preview + name for the template gallery. */

import { Box, Text } from '@chakra-ui/react'
import { DiagramSVG } from '../svg/DiagramSVG'
import type { Template } from '../../data/templates'

interface Props {
  template: Template
  onSelect: () => void
}

export function TemplateCard({ template, onSelect }: Props) {
  return (
    <Box
      as="button"
      onClick={onSelect}
      borderWidth="1px"
      borderRadius="lg"
      p={3}
      cursor="pointer"
      _hover={{ borderColor: 'blue.500', bg: 'blue.50' }}
      transition="all 0.15s"
      textAlign="center"
      w="100%"
    >
      <Box
        overflow="hidden"
        borderRadius="md"
        mb={2}
        h="120px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Box transform="scale(0.15)" transformOrigin="center" pointerEvents="none">
          <DiagramSVG config={template.config} />
        </Box>
      </Box>
      <Text fontSize="sm" fontWeight={600}>{template.name}</Text>
      <Text fontSize="xs" color="fg.muted">{template.description}</Text>
    </Box>
  )
}
