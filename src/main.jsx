import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './index.css'



import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import { AuthProvider, RequireAuth } from "./context/Auth";


import Unauthorized from './pages/unauthoorized'
import ErrorPage from "./pages/error-page";
import Contact, {
  loader as contactLoader,
} from "./routes/contact";
import Users from "./routes/users"; 
import SpinnerOfDoom from "./routes/spinner"; 
import Login from "./pages/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element:  <RequireAuth  />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "portal/",
        element: <Root />,
        loader: contactLoader,
      },
      {
        path: '/users',
        element: <Users />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "/unauthorized",
    element:  <Unauthorized />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element:  <Login />,
    errorElement: <ErrorPage />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} 
        fallbackElement={<SpinnerOfDoom />}
      />
    </AuthProvider>
    
  </React.StrictMode>,
)
