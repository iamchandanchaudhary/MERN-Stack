import React from 'react'
import MainNav from './MainNav';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard';
import Community from './Community';

const router = createBrowserRouter(
    [
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

function Main() {

  return (
    <section className="bg-blue-300 h-screen w-full">
        <RouterProvider router={router} />
        <MainNav />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">This is a Main Page.</h1>
        </div>
    </section>
  )
}

export default Main;
