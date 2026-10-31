import { useConfigStore } from '@/infraestructure/store/configStore'
import { saveAppConfig } from '@/infraestructure/tauri/config'
import { open } from '@tauri-apps/plugin-dialog'
import { Button } from '@/components/button/Button'
import { FileUpIcon } from 'lucide-react'
import Card from '@/components/card/Card'
import { getSheets } from '@/infraestructure/tauri/commands'
import type { ColumnHeader, FileSheet } from '@/types/FileConfig'

interface Props {
  setHeaders: ColumnHeader[]
  setSheets: FileSheet[]
}

const FileManager = ({ setHeaders, setSheets }: Props) => {
  const getConfig = useConfigStore((state) => state.getConfig)
  const setConfig = useConfigStore((state) => state.setConfig)

  const config = getConfig();

  const handleSelectExcel = async () => {
    const filePath = await selectExcelFile()

    if (!filePath) return

    const sheets = await getSheets(filePath)

    const nextConfig = {
      ...config!,
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

    setSheets(sheets)
  }

  const selectExcelFile = async () => {
    return await open({
      multiple: false,
      filters: [
        {
          name: 'Excel',
          extensions: ['xlsx'],
        },
      ],
    })
  }

  return (
    <div>
      <Card onClick={selectExcelFile} color="contrast" className="flex justify-center flex-col items-center gap-4 border-2 border-ui-primary/30 rounded-md border-dashed p-8 transition-all duration-500 hover:border-ui-primary cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <div className='border border-ui-primary border-dashed rounded-full p-8'>
            <FileUpIcon className="size-10" />
          </div>
        </div>
        <p className="text-lg font-bold">Pulsa aquí para cargar el catálogo</p>
        <Button>Cargar catálogo</Button>
      </Card>
    </div>
  );
}

export default FileManager;
