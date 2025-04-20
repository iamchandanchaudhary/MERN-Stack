import Navbar from "./Navbar";

function Contacts() {
    return (
        <>
            <section className="bg-yellow-200 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Contact Section.</h1>
                </div>
            </section>
        </>
    );
}

export default Contacts;