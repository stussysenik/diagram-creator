/* ── URL Codec ──
   Encodes diagram config as a URL hash for sharing.
   Diffs against DEFAULT_CONFIG to keep URLs short. */

import type { DiagramConfig } from '../types'
import { DEFAULT_CONFIG } from '../types'

export function encodeConfig(config: DiagramConfig): string {
  const diff: Record<string, unknown> = {}

  for (const key of Object.keys(config) as (keyof DiagramConfig)[]) {
    const current = config[key]
    const base = DEFAULT_CONFIG[key]
    if (JSON.stringify(current) !== JSON.stringify(base)) {
      diff[key] = current
    }
  }

  if (Object.keys(diff).length === 0) return ''
  return btoa(JSON.stringify(diff))
}

export function decodeConfig(hash: string): Partial<DiagramConfig> | null {
  if (!hash) return null
  try {
    const json = atob(hash)
    return JSON.parse(json) as Partial<DiagramConfig>
  } catch {
    return null
  }
}

export function readHashConfig(): Partial<DiagramConfig> | null {
  const hash = window.location.hash.slice(1)
  return decodeConfig(hash)
}

export function writeHashConfig(config: DiagramConfig): string {
  const encoded = encodeConfig(config)
  const url = new URL(window.location.href)
  url.hash = encoded
  return url.toString()
}
