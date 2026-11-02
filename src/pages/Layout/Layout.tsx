import { Outlet } from 'react-router-dom';
import Header from './Header';
import Container from '@/components/container/Container';

const Layout = () => {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <Container size="responsive" className="mx-auto">
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
