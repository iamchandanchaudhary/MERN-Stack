import {NavLink} from "react-router-dom";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <section className="flex justify-center items-center w-full h-16 px-10 bg-blue-500 text-[#fff]">

            <div className="flex justify-center items-center gap-5 menu">
                <NavLink to={"/"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Home</NavLink>
                <NavLink to={"/contacts"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Contacts</NavLink>
                <NavLink to={"/services"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Services</NavLink>
                <NavLink to={"/about"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">About</NavLink>
                <NavLink to={"/profile"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Profile</NavLink>
            </div>
        </section>
    );
}

export default Navbar;