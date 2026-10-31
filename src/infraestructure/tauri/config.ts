import type { AppConfig } from "../../types/AppConfig"
import { invoke } from "@tauri-apps/api/core"

export const getAppConfig = () =>
  invoke<AppConfig>('get_app_config')

export const saveAppConfig = (config: AppConfig) =>
  invoke<void>('save_app_config', { config })