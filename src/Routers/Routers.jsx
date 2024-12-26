import {
    createBrowserRouter,
  } from "react-router-dom";
import Roote from "../Components/Roote/Roote";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import Services from "../Components/Services/Services";
import Register from "../Components/Register/Register";
import Loging from "../Components/Loging/Loging";
import Cheked from "../Components/Cheked/Cheked";
import Booking from "../Components/Booking/Booking";
import PrivetRoute from "./PrivetRoute";
const router = createBrowserRouter([
    {
      path: "/",
      element:<Roote></Roote>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },  
        {
            path: "/about",
            element:<About></About>,
          }, 
          {
            path: "/service",
            element:<Services></Services>,
          }, 
          {
            path: "/Register",
            element:<Register></Register>,
          }, 
          {
            path: "/loging",
            element:<Loging></Loging>,
          }, 
          {
            path:'cheked/:id',
            element:<PrivetRoute><Cheked></Cheked></PrivetRoute>,
            loader: ({params}) => fetch(`https://car-doctor-server-five-murex.vercel.app/services/${params.id}`)
          }, 
          {
            path:'booking',
            element:<PrivetRoute><Booking></Booking></PrivetRoute>
          }
      ],
    },
  ]);

  export default router;