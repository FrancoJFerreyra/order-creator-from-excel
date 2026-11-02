import { create } from 'zustand'
import type { AppConfig } from '../../types/AppConfig'

type State = {
  config: AppConfig
  setConfig: (config: AppConfig) => void
  clearConfig: () => void
}

const initialConfig: AppConfig = {
  catalog: {
    filePath: '',
    sheetName: '',
    headerRow: 0,
    referenceColumn: 0,
    nameColumn: 0,
  },
  output: {
    headers: [],
  },
}

export const useConfigStore = create<State>()((set) => ({
  config: initialConfig,

  setConfig: (config) => set({ config }),
  clearConfig: () => set({ config: initialConfig }),
}))
