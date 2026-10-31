use calamine::{open_workbook_auto, Reader};
use serde::{Deserialize, Serialize};
use std::{
    fs,
    path::PathBuf,
    sync::Mutex,
};
use tauri::{AppHandle, Manager, State};
use unicode_normalization::{char::is_combining_mark, UnicodeNormalization};

// ============================================================
// MODELOS
// ============================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Product {
    pub source_row: usize,
    pub reference: String,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ColumnHeader {
    pub index: usize,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CatalogSummary {
    pub product_count: usize,
    pub sheet_name: String,
    pub reference_column: usize,
    pub name_column: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CatalogConfig {
    pub file_path: String,
    pub sheet_name: String,

    // Índices basados en cero.
    pub header_row: usize,
    pub reference_column: usize,
    pub name_column: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Catalog {
    pub config: CatalogConfig,
    pub products: Vec<Product>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct AppConfig {
    pub catalog: Option<CatalogConfig>,
}

// ============================================================
// ESTADO DE TAURI
// ============================================================

#[derive(Default)]
pub struct CatalogState {
    pub catalog: Mutex<Option<Catalog>>,
}

// ============================================================
// RUTAS LOCALES
// ============================================================

fn data_directory(app: &AppHandle) -> Result<PathBuf, String> {
    let directory = app
        .path()
        .app_local_data_dir()
        .map_err(|error| {
            format!("No se pudo obtener el directorio local: {error}")
        })?;

    fs::create_dir_all(&directory)
        .map_err(|error| {
            format!("No se pudo crear el directorio local: {error}")
        })?;

    Ok(directory)
}

fn catalog_cache_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(data_directory(app)?.join("catalog.json"))
}

fn config_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(data_directory(app)?.join("config.json"))
}

// ============================================================
// PERSISTENCIA JSON
// ============================================================

fn write_json<T: Serialize>(
    path: &PathBuf,
    value: &T,
) -> Result<(), String> {
    let contents = serde_json::to_vec_pretty(value)
        .map_err(|error| {
            format!("No se pudo serializar la configuración: {error}")
        })?;

    let file_name = path
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap_or("data.json");

    let temporary_path = path.with_file_name(
        format!("{file_name}.tmp")
    );

    fs::write(&temporary_path, contents)
        .map_err(|error| {
            format!("No se pudo escribir el archivo temporal: {error}")
        })?;

    // En Windows, rename puede fallar si el destino ya existe.
    // Eliminamos el destino antes de renombrar.
    if path.exists() {
        fs::remove_file(path)
            .map_err(|error| {
                format!("No se pudo reemplazar el archivo anterior: {error}")
            })?;
    }

    fs::rename(&temporary_path, path)
        .map_err(|error| {
            format!("No se pudo guardar el archivo: {error}")
        })?;

    Ok(())
}

fn read_json<T: for<'de> Deserialize<'de>>(
    path: &PathBuf,
) -> Result<T, String> {
    let contents = fs::read(path)
        .map_err(|error| {
            format!("No se pudo leer el archivo: {error}")
        })?;

    serde_json::from_slice(&contents)
        .map_err(|error| {
            format!("El archivo JSON no es válido: {error}")
        })
}

// ============================================================
// UTILIDADES
// ============================================================

fn normalize_text(value: &str) -> String {
    value
        .nfd()
        .filter(|character| !is_combining_mark(*character))
        .flat_map(char::to_lowercase)
        .collect::<String>()
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

fn cell_to_string(cell: Option<&calamine::Data>) -> String {
    match cell {
        Some(value) => value.to_string().trim().to_string(),
        None => String::new(),
    }
}

fn open_sheet(
    path: &str,
    sheet_name: &str,
) -> Result<calamine::Range<calamine::Data>, String> {
    let mut workbook = open_workbook_auto(path)
        .map_err(|error| {
            format!("No se pudo abrir el Excel: {error}")
        })?;

    workbook
        .worksheet_range(sheet_name)
        .map_err(|error| {
            format!(
                "No se pudo leer la hoja '{sheet_name}': {error}"
            )
        })
}

// ============================================================
// COMANDO: OBTENER HOJAS
// ============================================================

#[tauri::command]
pub fn get_workbook_sheets(
    path: String,
) -> Result<Vec<String>, String> {
    let workbook = open_workbook_auto(&path)
        .map_err(|error| {
            format!("No se pudo abrir el Excel: {error}")
        })?;

    Ok(workbook.sheet_names().to_vec())
}

// ============================================================
// COMANDO: OBTENER ENCABEZADOS
// ============================================================

#[tauri::command]
pub fn get_sheet_headers(
    path: String,
    sheet_name: String,
    header_row: usize,
) -> Result<Vec<ColumnHeader>, String> {
    let range = open_sheet(&path, &sheet_name)?;

    let row = range
        .rows()
        .nth(header_row)
        .ok_or_else(|| {
            format!(
                "La fila de encabezados {} no existe.",
                header_row + 1
            )
        })?;

    let headers: Vec<ColumnHeader> = row
        .iter()
        .enumerate()
        .map(|(index, cell)| {
            let name = cell_to_string(Some(cell));

            ColumnHeader {
                index,
                name: if name.is_empty() {
                    format!("Columna {}", index + 1)
                } else {
                    name
                },
            }
        })
        .collect();

    if headers.is_empty() {
        return Err("La fila seleccionada no contiene columnas.".into());
    }

    Ok(headers)
}

// ============================================================
// COMANDO: IMPORTAR CATÁLOGO
// ============================================================

#[tauri::command]
pub fn import_catalog(
    app: AppHandle,
    state: State<'_, CatalogState>,
    config: CatalogConfig,
) -> Result<CatalogSummary, String> {
    if config.file_path.trim().is_empty() {
        return Err("Debes seleccionar un archivo Excel.".into());
    }

    if config.reference_column == config.name_column {
        return Err(
            "La referencia y el nombre deben ser columnas diferentes."
                .into(),
        );
    }

    let range = open_sheet(
        &config.file_path,
        &config.sheet_name,
    )?;

    let header = range
        .rows()
        .nth(config.header_row)
        .ok_or_else(|| {
            "La fila de encabezados no existe.".to_string()
        })?;

    let column_count = header.len();

    if config.reference_column >= column_count {
        return Err(
            "La columna de referencia no existe.".into()
        );
    }

    if config.name_column >= column_count {
        return Err(
            "La columna de nombre no existe.".into()
        );
    }

    let products: Vec<Product> = range
        .rows()
        .enumerate()
        .skip(config.header_row + 1)
        .filter_map(|(row_index, row)| {
            let reference = cell_to_string(
                row.get(config.reference_column)
            );

            let name = cell_to_string(
                row.get(config.name_column)
            );

            // Ignorar filas sin referencia o sin nombre.
            if reference.is_empty() || name.is_empty() {
                return None;
            }

            Some(Product {
                // Número de fila de Excel, empezando en 1.
                source_row: row_index + 1,
                reference,
                name,
            })
        })
        .collect();

    if products.is_empty() {
        return Err(
            "No se encontraron productos válidos en el catálogo."
                .into(),
        );
    }

    let catalog = Catalog {
        config: config.clone(),
        products,
    };

    // Guardamos la caché antes de sustituir el catálogo en memoria.
    let cache_path = catalog_cache_path(&app)?;
    write_json(&cache_path, &catalog)?;

    // Si falla la importación o el guardado, no sustituimos
    // el catálogo que ya estaba cargado.
    let product_count = catalog.products.len();

    {
        let mut current_catalog = state
            .catalog
            .lock()
            .map_err(|_| {
                "No se pudo acceder al estado del catálogo.".to_string()
            })?;

        *current_catalog = Some(catalog);
    }

    // Guardar la configuración para futuras ejecuciones.
    let path = config_path(&app)?;
    let app_config = AppConfig {
        catalog: Some(config.clone()),
    };

    write_json(&path, &app_config)?;

    Ok(CatalogSummary {
        product_count,
        sheet_name: config.sheet_name,
        reference_column: config.reference_column,
        name_column: config.name_column,
    })
}

// ============================================================
// COMANDO: CARGAR CATÁLOGO GUARDADO
// ============================================================

#[tauri::command]
pub fn load_catalog(
    app: AppHandle,
    state: State<'_, CatalogState>,
) -> Result<Option<CatalogSummary>, String> {
    let path = catalog_cache_path(&app)?;

    if !path.exists() {
        return Ok(None);
    }

    let catalog: Catalog = read_json(&path)?;

    let summary = CatalogSummary {
        product_count: catalog.products.len(),
        sheet_name: catalog.config.sheet_name.clone(),
        reference_column: catalog.config.reference_column,
        name_column: catalog.config.name_column,
    };

    let mut current_catalog = state
        .catalog
        .lock()
        .map_err(|_| {
            "No se pudo acceder al estado del catálogo.".to_string()
        })?;

    *current_catalog = Some(catalog);

    Ok(Some(summary))
}

// ============================================================
// COMANDO: BUSCAR PRODUCTOS
// ============================================================

#[tauri::command]
pub fn search_products(
    state: State<'_, CatalogState>,
    query: String,
    limit: Option<usize>,
) -> Result<Vec<Product>, String> {
    let query = normalize_text(&query);

    if query.is_empty() {
        return Ok(Vec::new());
    }

    let limit = limit.unwrap_or(50).clamp(1, 100);

    let current_catalog = state
        .catalog
        .lock()
        .map_err(|_| {
            "No se pudo acceder al estado del catálogo.".to_string()
        })?;

    let catalog = current_catalog
        .as_ref()
        .ok_or_else(|| {
            "Todavía no hay ningún catálogo cargado.".to_string()
        })?;

    let mut matches: Vec<(u8, &Product)> = catalog
        .products
        .iter()
        .filter_map(|product| {
            let reference = normalize_text(&product.reference);
            let name = normalize_text(&product.name);

            let rank = if reference == query {
                0
            } else if reference.starts_with(&query) {
                1
            } else if name == query {
                2
            } else if name.starts_with(&query) {
                3
            } else if reference.contains(&query) {
                4
            } else if name.contains(&query) {
                5
            } else {
                return None;
            };

            Some((rank, product))
        })
        .collect();

    matches.sort_by(|(rank_a, product_a), (rank_b, product_b)| {
        rank_a
            .cmp(rank_b)
            .then_with(|| {
                product_a
                    .name
                    .to_lowercase()
                    .cmp(&product_b.name.to_lowercase())
            })
    });

    Ok(matches
        .into_iter()
        .take(limit)
        .map(|(_, product)| product.clone())
        .collect())
}