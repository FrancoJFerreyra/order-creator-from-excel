import { useEffect, useState } from 'react';
import type { CatalogSummary } from '@/types/Catalog';
import type { CatalogConfig } from '@/types/AppConfig';
import { useConfigStore } from '@/infraestructure/store/configStore';
import { importCatalog, loadCatalog } from '@/infraestructure/tauri/commands';

const sameCatalog = (summary: CatalogSummary, config: CatalogConfig) =>
  summary.filePath === config.filePath &&
  summary.sheetName === config.sheetName &&
  summary.referenceColumn === config.referenceColumn &&
  summary.nameColumn === config.nameColumn;

const useCatalog = () => {
  const catalogConfig = useConfigStore((state) => state.config.catalog);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const prepareCatalog = async () => {
      if (!catalogConfig?.filePath) {
        setReady(false);
        setError('Cargá un catálogo desde Configuración.');
        return;
      }

      try {
        const loaded = await loadCatalog();

        if (loaded && sameCatalog(loaded, catalogConfig)) {
        } else {
          await importCatalog(catalogConfig);
        }

        if (!cancelled) setReady(true);
      } catch (reason) {
        if (!cancelled) setError(String(reason));
      }
    };

    prepareCatalog();

    return () => {
      cancelled = true;
    };
  }, [catalogConfig]);

  return { ready, error };
};

export default useCatalog;
