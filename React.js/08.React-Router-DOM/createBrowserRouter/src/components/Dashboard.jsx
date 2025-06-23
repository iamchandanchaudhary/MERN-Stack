import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
  return (
    <section className="bg-blue-300 h-screen w-full">
        <Navbar />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">This is a Dashboard Page.</h1>

            <Link to={"/"}>
                <button className="bg-black hover:bg-gray-800 px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home</button>
            </Link>
        </div>

        <div className="flex gap-5 w-max py-3 px-10 bg-blue-500 text-[#fff] items-center mt-10 mb-5">
            <NavLink to={"courses"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Courses</NavLink>
            <NavLink to={"test"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Test</NavLink>
            <NavLink to={"reports"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Reports</NavLink>
        </div>
        
        <Outlet />
    </section>
  )
}

export default Dashboard;
