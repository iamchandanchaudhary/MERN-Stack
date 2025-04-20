import Navbar from "./Navbar";

function Home() {
    return (
        <>
            <section className="bg-blue-200 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Home Section.</h1>
                </div>
            </section>
        </>
    );
}

export default Home;