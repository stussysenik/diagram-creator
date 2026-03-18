/* ── Zustand Store ──
   Single source of truth for diagram configuration.
   Actions mirror the old imperative Store class. */

import { create } from 'zustand'
import type { DiagramConfig, StepConfig, BackgroundConfig } from './types'
import { DEFAULT_CONFIG } from './types'

interface DiagramStore {
  config: DiagramConfig
  set: (partial: Partial<DiagramConfig>) => void
  setBackground: (partial: Partial<BackgroundConfig>) => void
  updateStep: (index: number, step: Partial<StepConfig>) => void
  addStep: (label?: string) => void
  removeStep: (index: number) => void
  loadConfig: (config: DiagramConfig) => void
  reset: () => void
}

export const useStore = create<DiagramStore>((set) => ({
  config: structuredClone(DEFAULT_CONFIG),

  set: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),

  setBackground: (partial) =>
    set((state) => ({
      config: {
        ...state.config,
        background: { ...state.config.background, ...partial },
      },
    })),

  updateStep: (index, step) =>
    set((state) => {
      const steps = state.config.steps.map((s, i) =>
        i === index ? { ...s, ...step } : s
      )
      return { config: { ...state.config, steps } }
    }),

  addStep: (label = 'NEW') =>
    set((state) => ({
      config: {
        ...state.config,
        steps: [...state.config.steps, { label }],
      },
    })),

  removeStep: (index) =>
    set((state) => {
      if (state.config.steps.length <= 1) return state
      return {
        config: {
          ...state.config,
          steps: state.config.steps.filter((_, i) => i !== index),
        },
      }
    }),

  loadConfig: (config) => set({ config: structuredClone(config) }),

  reset: () => set({ config: structuredClone(DEFAULT_CONFIG) }),
}))
