import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Community() {
  return (
    <section className="bg-blue-300 h-screen w-full">
        <Navbar />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">This is a Community Page.</h1>

            <Link to={"/"}>
                <button className="bg-black hover:bg-gray-800 px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home</button>
            </Link>
        </div>
    </section>
  )
}

export default Community;
