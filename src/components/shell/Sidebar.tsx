/* ── Sidebar ──
   Fixed-width sidebar for desktop. Contains control panels. */

import { Box, Flex, Text } from '@chakra-ui/react'
import { ControlPanel } from '../panels/ControlPanel'
import { TemplateGallery } from '../templates/TemplateGallery'
import type { RefObject } from 'react'

interface Props {
  svgRef: RefObject<SVGSVGElement | null>
}

export function Sidebar({ svgRef }: Props) {
  return (
    <Box
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      w="320px"
      minW="320px"
      h="100vh"
      overflowY="auto"
      bg="bg"
      borderRight="1px solid"
      borderColor="border"
      p={4}
      gap={1}
    >
      <Flex align="center" justify="space-between" mb={2}>
        <Text fontSize="md" fontWeight={700} letterSpacing="-0.02em">
          Parameters
        </Text>
        <TemplateGallery />
      </Flex>
      <ControlPanel svgRef={svgRef} />
    </Box>
  )
}
