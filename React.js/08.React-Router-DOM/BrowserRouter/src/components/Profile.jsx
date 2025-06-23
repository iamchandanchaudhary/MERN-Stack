import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Profile() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    };

    return (
        <>
            <section className="bg-red-200 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Profile Section.</h1>
                    
                    <button
                        onClick={handleClick}
                        className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home
                    </button>
                </div>

                <div className="flex gap-8 w-max py-3 px-5 bg-blue-500 text-[#fff] items-center mt-10 mb-5">
                    <NavLink to={"courses"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Courses</NavLink>
                    <NavLink to={"test"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Test</NavLink>
                    <NavLink to={"reports"} className="menu hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Reports</NavLink>
                </div>

                <Outlet />
            </section>
        </>
    );
}

export default Profile;