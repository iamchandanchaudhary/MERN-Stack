import Navbar from "./Navbar";

function Services() {
    return (
        <>
            <section className="bg-pink-400 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Service Section.</h1>
                </div>
            </section>
        </>
    );
}

export default Services;