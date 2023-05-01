import React from 'react';
import ReactDOM from 'react-dom/client';

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

import Layout from './pages/Layout'

import Unauthorized from './pages/unauthoorized'
import ErrorPage from "./pages/error-page";
// import Contact, {
//   loader as contactLoader,
// } from "./routes/contact";
import User, {
  loader as userLoader,
} from "./routes/user";



import SpinnerOfDoom from "./routes/spinner"; 
import Login, {
  action as authAction
} from "./routes/login"



const router = createBrowserRouter([
  {
    // path: "/",
    // element:  <RequireAuth  />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    // children: [
    //   {
    //     path: "portal/",
    //     element: <Root />,
    //     loader: contactLoader,
    //   },
    //   {
    //     path: '/users',
    //     element: <Users />,
    //     errorElement: <ErrorPage />,
    //   },
    // ]
    path: "/",
    element:  <Layout  />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/portal",
            element: <Root />,
            loader: userLoader,
          },
          // {
          //   path: '/users',
          //   element: <Users />,
          //   errorElement: <ErrorPage />,
          // },
        ]
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
    action: authAction
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
