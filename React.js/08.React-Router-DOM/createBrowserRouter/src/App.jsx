import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Community from './components/Community';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/NestedComponents/Courses';
import Test from './components/NestedComponents/Test';
import Reports from './components/NestedComponents/Reports';
import NotFound from './components/NotFound';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },

        {
            path: "/dashboard",
            element: <Dashboard />,

            // Nested Routes
            children: [
                {
                    path: "courses",
                    element: <Courses />,
                }, 
                {
                    path: "test",
                    element: <Test />,
                }, 
                {
                    path: "reports",
                    element: <Reports />,
                }
            ]
        },

        {
            path: "/community",
            element: <Community />
        },

        {
        // If the page was not found (due to wrong url)
            path: "*",
            element: <NotFound />
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
