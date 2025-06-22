import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Profile() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    };

    return (
        <>
            <section className="bg-red-400 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Profile Section.</h1>
                    
                    <button
                        onClick={handleClick}
                        className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home
                    </button>
                </div>

            </section>
        </>
    );
}

export default Profile;