import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function About() {
    return (
        <>
            <section className="bg-green-300 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a About Section.</h1>

                    <Link to={"/"}>
                        <button className="bg-black px-3 py-1 text-[#fff] rounded-md mt-5" type="button">Back to Home</button>
                    </Link>
                </div>

            </section>
        </>
    );
}

export default About;