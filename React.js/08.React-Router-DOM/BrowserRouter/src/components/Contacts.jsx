import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Contacts() {

    const navigate = useNavigate(); // it is also use to navigate on different pages

    function handleClick() {
        navigate("/profile");
    };

    return (
        <>
            <section className="bg-yellow-200 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Contact Section.</h1>

                    {/* Link tag is use to redirect on another route */}
                    <Link to={"/"}>
                    {/* <a href="/"> */}
                        <button className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home</button>
                    {/* </a> */}
                    </Link>

                    <br />

                    <button
                        onClick={handleClick}
                        className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Go to Profile
                    </button>
                </div>
            </section>
        </>
    );
}

export default Contacts;