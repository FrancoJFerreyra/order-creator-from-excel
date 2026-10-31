import { useConfigStore } from '@/infraestructure/store/configStore'
import { saveAppConfig } from '@/infraestructure/tauri/config'
import { open } from '@tauri-apps/plugin-dialog'
import { Button } from '@/components/button/Button'
import { FileUpIcon } from 'lucide-react'
import Card from '@/components/card/Card'

const FileManager = () => {
  const getConfig = useConfigStore((state) => state.getConfig)
  const setConfig = useConfigStore((state) => state.setConfig)

  const openFile = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Excel',
          extensions: ['xlsx'],
        },
      ],
    })
    await handleSaveFile(selected as string)
  }

  const handleSaveFile = async (selected: string) => {
    if (!selected) return
    const config = getConfig()
    const updatedConfig = { ...config, catalog: { ...config.catalog, filePath: selected } }
    setConfig(updatedConfig)
    await saveAppConfig(updatedConfig)
  }
  return (
    <div>
      <Card onClick={openFile} color="contrast" className="flex justify-center flex-col items-center gap-4 border-2 border-ui-primary/30 rounded-md border-dashed p-8 transition-all duration-500 hover:border-ui-primary cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <div className='border border-ui-primary border-dashed rounded-full p-8'>
            <FileUpIcon className="size-10" />
          </div>
        </div>
        <p className="text-lg font-bold">Pulsa aquí para cargar el catálogo</p>
        <Button onClick={openFile}>Cargar catálogo</Button>
      </Card>
    </div>
  );
}

export default FileManager;
