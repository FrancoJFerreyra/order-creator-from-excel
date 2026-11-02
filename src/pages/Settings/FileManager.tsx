import { useConfigStore } from '@/infraestructure/store/configStore'
import { saveAppConfig } from '@/infraestructure/tauri/config'
import { open } from '@tauri-apps/plugin-dialog'
import { Button } from '@/components/button/Button'
import { FileUpIcon, RefreshCcw } from 'lucide-react'
import Card from '@/components/card/Card'
import { getSheets } from '@/infraestructure/tauri/commands'
import Subtitle from '@/components/heading/Subtitle'

const FileManager = () => {
  const config = useConfigStore((state) => state.config)
  const setConfig = useConfigStore((state) => state.setConfig)

  const hasCatalog = !!config.catalog?.filePath

  const selectExcelFile = async () => {
    const filePath = await open({
      multiple: false,
      filters: [
        {
          name: 'Excel',
          extensions: ['xlsx'],
        },
      ],
    })

    if (!filePath) return

    const sheets = await getSheets(filePath)

    const nextConfig = {
      ...config,
      catalog: {
        filePath,
        sheetName: sheets[0] ?? '',
        headerRow: 0,
        referenceColumn: 0,
        nameColumn: 1,
      },
    }

    setConfig(nextConfig)
    await saveAppConfig(nextConfig)
  }

  return (
    <div>
      <Card onClick={selectExcelFile} color="contrast" className="flex justify-center flex-col items-center gap-4 border-2 border-ui-primary/30 rounded-md border-dashed p-8 transition-all duration-500 hover:border-ui-primary cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <div className='border border-ui-primary border-dashed rounded-full p-8'>
            {hasCatalog ? <RefreshCcw className="size-10" /> : <FileUpIcon className="size-10" />}
          </div>
        </div>
        <p className="text-lg font-bold text-center">
          {hasCatalog ? 'Ya hay un archivo seleccionado' : 'Pulsa aquí para cargar el catálogo'}
        </p>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          {hasCatalog
            ? config.catalog?.filePath.split(/[/\\]/).pop()
            : 'Selecciona el archivo .xlsx con la lista de precios'}
        </p>
        <Button>{hasCatalog ? 'Reemplazar archivo' : 'Cargar catálogo'}</Button>
      </Card>
    </div>
  );
}

export default FileManager;
