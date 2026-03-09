import type { DiagramConfig } from './types';
import { DEFAULT_CONFIG } from './types';

type Listener = (config: DiagramConfig) => void;

class Store {
  private config: DiagramConfig;
  private listeners: Set<Listener> = new Set();
  private frameId: number | null = null;

  constructor(initial: DiagramConfig) {
    this.config = structuredClone(initial);
  }

  get(): DiagramConfig {
    return this.config;
  }

  update(partial: Partial<DiagramConfig>): void {
    Object.assign(this.config, partial);
    this.scheduleNotify();
  }

  updateStep(index: number, step: Partial<{ label: string }>): void {
    if (this.config.steps[index]) {
      Object.assign(this.config.steps[index], step);
      this.scheduleNotify();
    }
  }

  addStep(label: string = 'NEW'): void {
    this.config.steps.push({ label });
    this.scheduleNotify();
  }

  removeStep(index: number): void {
    if (this.config.steps.length > 1) {
      this.config.steps.splice(index, 1);
      this.scheduleNotify();
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private scheduleNotify(): void {
    if (this.frameId !== null) return;
    this.frameId = requestAnimationFrame(() => {
      this.frameId = null;
      for (const fn of this.listeners) {
        fn(this.config);
      }
    });
  }
}

export const store = new Store(structuredClone(DEFAULT_CONFIG));
