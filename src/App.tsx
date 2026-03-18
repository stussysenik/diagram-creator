/* ── App ──
   Root component. Hydrates store from URL hash on mount. */

import { useEffect } from 'react'
import { AppShell } from './components/shell/AppShell'
import { useStore } from './store'
import { readHashConfig } from './lib/url-codec'
import { TemplateGallery } from './components/templates/TemplateGallery'
import { Flex } from '@chakra-ui/react'

export function App() {
  const set = useStore((s) => s.set)

  useEffect(() => {
    const hashConfig = readHashConfig()
    if (hashConfig) set(hashConfig)
  }, [set])

  return (
    <>
      <Flex
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        top={0}
        right={3}
        h="48px"
        align="center"
        zIndex={1002}
      >
        <TemplateGallery />
      </Flex>
      <AppShell />
    </>
  )
}
