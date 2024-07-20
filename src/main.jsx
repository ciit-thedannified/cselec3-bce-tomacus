import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from "./routes/AppRoutes.jsx";
import {RouterProvider} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
          <RouterProvider router={AppRoutes} />
      </UserProvider>
  </React.StrictMode>,
)
