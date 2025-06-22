import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {

  // let isActive = ({isActive}) => isActive ? "active-link" : "";

  return (
    <section className="flex justify-between items-center w-full h-16 px-10 bg-blue-500 text-[#fff]">

        <div className="flex justify-center items-center gap-5">
            <NavLink to={"/"} className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to={"/dashboard"} className={({isActive}) => isActive ? "active-link" : ""}>Dashboard</NavLink>
            <NavLink to={"/community"} className={({isActive}) => isActive ? "active-link" : ""}>Community</NavLink>
        </div>
    </section>
  )
}

export default Navbar;
