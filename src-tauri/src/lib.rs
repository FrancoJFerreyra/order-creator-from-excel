mod catalog;
mod config;

use catalog::CatalogState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(debug_assertions)]
    let devtools = tauri_plugin_devtools::init();

    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .manage(CatalogState::default())
        .invoke_handler(tauri::generate_handler![
            catalog::get_workbook_sheets,
            catalog::get_sheet_headers,
            catalog::import_catalog,
            catalog::load_catalog,
            catalog::search_products,
            config::get_app_config,
            config::save_app_config,
        ]);

    #[cfg(debug_assertions)]
    let builder = builder.plugin(devtools);

    #[cfg(not(debug_assertions))]
    let builder = builder.plugin(
        tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
    );

    builder
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}