import Subtitle from '@/components/heading/Subtitle'
import FileManager from './FileManager'
import Card from '@/components/card/Card';
import FileConfig from './FileConfig';
import { useConfigStore } from '@/infraestructure/store/configStore';
import { invoke } from '@tauri-apps/api/core';
import type { ColumnHeader } from '@/types/FileConfig';
import { useEffect, useState } from 'react';

const Settings = () => {
  const [headers, setHeaders] = useState<ColumnHeader[]>([])
  const getConfig = useConfigStore((state) => state.getConfig)
  const config = getConfig()

  const getHeaders = async ({ filePath, sheetName, headerRow }: { filePath: string, sheetName: string, headerRow: number }) => {
    console.log({ filePath, sheetName, headerRow });
    const headers = await invoke<ColumnHeader[]>(
      'get_sheet_headers',
      {
        path: filePath,
        sheetName: sheetName,
        headerRow: headerRow,
      },
    )
    return headers
  }

  const getSheets = async (filePath: string) => {
    const sheets = await invoke<string[]>(
      'get_workbook_sheets',
      {
        path: filePath,
      },
    )
    console.log(sheets);
    return sheets

  }
  useEffect(() => {
    getSheets(config?.catalog?.filePath || '').then((sheets) => {
      console.log(sheets);
    })
  }, [config?.catalog?.filePath, config?.catalog?.sheetName, config?.catalog?.headerRow])

  return (
    <div className="flex flex-col gap-4">
      <Subtitle title="Panel de configuración" />
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <FileManager />
          <FileConfig headers={headers} />
        </div>
      </Card>
    </div>
  );
}

export default Settings;
