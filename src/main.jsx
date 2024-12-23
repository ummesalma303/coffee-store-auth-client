import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import User from './components/User.jsx';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import User2 from './components/User2.jsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://coffee-store-server-omega-seven.vercel.app/coffee')
      },
      {
        path: 'addCoffee',
        element: <AddCoffee></AddCoffee>
      },
      {
        path: 'updateCoffee/:id',
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) => fetch(`https://coffee-store-server-omega-seven.vercel.app/coffee/${params.id}`)
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/user',
        element: <User></User>,
        loader:()=>fetch('https://coffee-store-server-omega-seven.vercel.app/user')
      },
      {
        path: '/user2',
        element: <User2></User2>,
        // loader:()=>fetch('https://coffee-store-server-omega-seven.vercel.app/user')
      },
    ]
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
