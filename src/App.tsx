import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { useEffect } from 'react';
import { getAppConfig } from './infraestructure/tauri/config.ts';
import { useConfigStore } from './infraestructure/store/configStore.ts';

const App = () => {
  const setConfig = useConfigStore((state) => state.setConfig)
  const initAppConfig = async () => {
    const config = await getAppConfig();
    setConfig(config);
  }

  useEffect(() => {
    initAppConfig();
  }, [])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
