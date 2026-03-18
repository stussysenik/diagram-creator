/* ── AppShell ──
   Root layout. Desktop: sidebar + preview. Mobile: topbar + drawer + preview. */

import { useState, useRef } from 'react'
import { Flex } from '@chakra-ui/react'
import { TopBar } from './TopBar'
import { Sidebar } from './Sidebar'
import { MobileDrawer } from './MobileDrawer'
import { PreviewArea } from './PreviewArea'

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const svgRef = useRef<SVGSVGElement | null>(null)

  return (
    <Flex h="100vh" position="relative">
      <TopBar onToggle={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} svgRef={svgRef} />
      <Sidebar svgRef={svgRef} />
      <PreviewArea ref={svgRef} />
    </Flex>
  )
}
