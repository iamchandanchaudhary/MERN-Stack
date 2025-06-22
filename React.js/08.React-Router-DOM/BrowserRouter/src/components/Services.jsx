import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Services() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/profile");
    };

    return (
        <>
            <section className="bg-pink-400 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Service Section.</h1>

                    <button
                        onClick={handleClick}
                        className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home
                    </button>
                </div>

            </section>
        </>
    );
}

export default Services;