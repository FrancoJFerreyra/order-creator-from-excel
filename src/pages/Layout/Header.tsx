import { Link } from 'react-router-dom';
import { Button } from '@/components/button/Button';
import { HomeIcon, SettingsIcon } from 'lucide-react';

const Header = () => {
  return (
    <ul className="grid grid-cols-3 bg-ui-navigation p-4">
      <li></li>
      <li className="text-center">
        <h1 className="text-2xl font-bold">Creador de pedidos</h1>
      </li>
      <li className="w-full flex justify-end gap-4">
        <Link to="/">
          <Button variant="solid" size="sm" endIcon={<HomeIcon className="size-6" />}>
            Inicio
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="solid" size="sm" endIcon={<SettingsIcon className="size-6" />}>
            Configuración
          </Button>
        </Link>
      </li>
    </ul>
  );
}

export default Header;
