import { Link } from 'react-router-dom';
import { Button } from '@/components/button/Button';
import { HomeIcon, SettingsIcon } from 'lucide-react';

const Header = () => {
  return (
    <ul className="flex justify-end bg-ui-navigation p-4">
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
