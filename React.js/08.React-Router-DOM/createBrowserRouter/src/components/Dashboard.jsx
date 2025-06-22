import React from 'react';
import MainNav from './Navbar';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <section className="bg-blue-300 h-screen w-full">
        <MainNav />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">This is a Dashboard Page.</h1>

            <Link to={"/"}>
                <button className="bg-black hover:bg-gray-800 px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home</button>
            </Link>
        </div>
    </section>
  )
}

export default Dashboard;
