/* ── Chakra UI Theme ──
   Minimal theme configuration. Extends Chakra v3 defaults. */

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      height: '100%',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      fontSize: '14px',
    },
    '#root': {
      height: '100%',
    },
  },
})

export const system = createSystem(defaultConfig, config)
