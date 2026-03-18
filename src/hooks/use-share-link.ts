/* ── Share Link Hook ──
   Generates a shareable URL from current config and copies to clipboard. */

import { useCallback } from 'react'
import { useStore } from '../store'
import { writeHashConfig } from '../lib/url-codec'

export function useShareLink() {
  const config = useStore((s) => s.config)

  const generateLink = useCallback(() => {
    return writeHashConfig(config)
  }, [config])

  const copyToClipboard = useCallback(async () => {
    const url = generateLink()
    await navigator.clipboard.writeText(url)
    return url
  }, [generateLink])

  return { generateLink, copyToClipboard }
}
