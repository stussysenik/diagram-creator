/* ── PreviewArea ──
   Centered SVG preview with checkerboard background. */

import { Box } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { DiagramSVG } from '../svg/DiagramSVG'
import { useStore } from '../../store'

export const PreviewArea = forwardRef<SVGSVGElement>((_props, ref) => {
  const config = useStore((s) => s.config)

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="auto"
      p={{ base: '64px 16px 16px', md: 8 }}
      bg="repeating-conic-gradient(#e8e8e8 0% 25%, transparent 0% 50%) 50% / 20px 20px"
      aria-live="polite"
    >
      <Box
        boxShadow="0 4px 24px rgba(0,0,0,0.08)"
        maxW="100%"
        maxH="100%"
      >
        <DiagramSVG ref={ref} config={config} />
      </Box>
    </Box>
  )
})

PreviewArea.displayName = 'PreviewArea'
