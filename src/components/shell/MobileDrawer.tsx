/* ── MobileDrawer ──
   Drawer overlay for mobile controls. */

import { Drawer, Portal, Box, Text, CloseButton } from '@chakra-ui/react'
import { ControlPanel } from '../panels/ControlPanel'
import type { RefObject } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  svgRef: RefObject<SVGSVGElement | null>
}

export function MobileDrawer({ open, onClose, svgRef }: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={(d) => { if (!d.open) onClose() }} placement="start">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content maxW="320px">
            <Drawer.Header borderBottom="1px solid" borderColor="border">
              <Box flex={1}>
                <Text fontSize="md" fontWeight={700} letterSpacing="-0.02em">
                  Parameters
                </Text>
              </Box>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body p={3}>
              <ControlPanel svgRef={svgRef} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
