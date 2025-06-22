import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Community from './components/Community';
import Navbar from './components/Navbar';
import Home from './components/Home';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },

        {
            path: "/dashboard",
            element: <Dashboard />
        },

        {
            path: "/community",
            element: <Community />
        }
    ]
)

function App() {

  return (
    <div className="bg-blue-300 h-screen w-full">
        <RouterProvider router={router} />
    </div>
  )
}

export default App;
