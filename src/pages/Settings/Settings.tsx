import Subtitle from '@/components/heading/Subtitle'
import FileManager from './FileManager'
import Card from '@/components/card/Card';
import FileConfig from './FileConfig';

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Subtitle title="Panel de configuración" />
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Cargar catálogo</h3>
            <FileManager />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Configurar catálogo</h3>
            <FileConfig />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
