import Subtitle from '@/components/heading/Subtitle'
import FileManager from './FileManager'
import Card from '@/components/card/Card';
import FileConfig from './FileConfig';
import { useState } from 'react';
import type { ColumnHeader, FileSheet } from '@/types/FileConfig';

const Settings = () => {
  const [headers, setHeaders] = useState<ColumnHeader[]>([]);
  const [sheets, setSheets] = useState<FileSheet[]>([])

  return (
    <div className="flex flex-col gap-4">
      <Subtitle title="Panel de configuración" />
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <FileManager setSheets={setSheets} setHeaders={setHeaders} />
          <FileConfig headers={headers} />
        </div>
      </Card>
    </div>
  );
}

export default Settings;
