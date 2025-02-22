import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
          
      
        },
        
       
      ]
    },
  ]);
export default router;