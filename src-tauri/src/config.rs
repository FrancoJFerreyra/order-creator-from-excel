use serde::{Deserialize, Serialize};
use std::fs;
use tauri::{AppHandle, Manager};

const CONFIG_FILE: &str = "config.json";

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct AppConfig {
    pub catalog: Option<CatalogConfig>,
    pub output: OutputConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CatalogConfig {
    pub file_path: String,
    pub sheet_name: String,
    pub header_row: usize,
    pub reference_column: usize,
    pub name_column: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct OutputConfig {
    pub headers: Vec<String>,
}

fn get_config_path(app: &AppHandle) -> Result<std::path::PathBuf, String> {
  let app_data_dir = app
      .path()
      .app_local_data_dir()
      .map_err(|e| e.to_string())?;

  fs::create_dir_all(&app_data_dir)
      .map_err(|e| e.to_string())?;

  Ok(app_data_dir.join(CONFIG_FILE))
}

#[tauri::command]
pub fn get_app_config(app: AppHandle) -> Result<AppConfig, String> {
  let path = get_config_path(&app)?;

  if !path.exists() {
      return Ok(AppConfig::default());
  }

  let content = fs::read_to_string(path)
      .map_err(|e| e.to_string())?;

  serde_json::from_str(&content)
      .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_app_config(
  app: AppHandle,
  config: AppConfig,
) -> Result<(), String> {
  let path = get_config_path(&app)?;

  let content = serde_json::to_string_pretty(&config)
      .map_err(|e| e.to_string())?;

  fs::write(path, content)
      .map_err(|e| e.to_string())?;

  Ok(())
}