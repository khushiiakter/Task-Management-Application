import { createBrowserRouter } from "react-router-dom";
// import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import MainLayouts from "../layouts/MainLayouts";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
    //   errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
      
        },
        // {
        //   path: "/services",
        //   element: <Services></Services>,
        //   loader: () => fetch('https://assignment-11-server-nine-peach.vercel.app/services')
        // },
        // {
        //   path: "/my-services",
        //   element: <MyServices></MyServices>,
        
        // },
        // {
        //   path: "/add-service",
        
        //   element:<PrivateRoute><AddService></AddService></PrivateRoute> ,
        // },
        // {
        //   path: "/update-service",
        //   element:<PrivateRoute><UpdateService></UpdateService></PrivateRoute> ,
        // },
        
        
        // {
        //   path: "/service-details/:id",
        //   element:<PrivateRoute><ServiceDetail></ServiceDetail></PrivateRoute> ,
        //   loader: ({params}) => fetch(`https://assignment-11-server-nine-peach.vercel.app/services/${params.id}`),

        // },
        
        // {
        //   path: "/auth",
        //   element: <AuthLayouts></AuthLayouts>,
        //   children: [
        //     {
        //       path: "/auth/login",
        //       element: <Login></Login>
        //     },
        //     {
        //       path: "/auth/register",
        //       element: <Register></Register>,
        //     },
        //   ]
        // }
        
      ]
    },
  ]);
export default router;