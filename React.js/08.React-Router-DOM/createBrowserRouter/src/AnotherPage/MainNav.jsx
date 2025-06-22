import React from 'react';
import { NavLink } from 'react-router-dom';

function MainNav() {
  return (
    <section className="flex justify-between items-center w-full h-16 px-10 bg-blue-500 text-[#fff]">

        <div className="flex justify-center items-center gap-5">
            <NavLink to={"/main-page"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Main</NavLink>
            <NavLink to={"/dashboard"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Dashboard</NavLink>
            <NavLink to={"/community"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Community</NavLink>
        </div>
    </section>
  )
}

export default MainNav;
