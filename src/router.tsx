import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Layout from "./pages/Layout/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      }
    ]
  }
]);

export default router;