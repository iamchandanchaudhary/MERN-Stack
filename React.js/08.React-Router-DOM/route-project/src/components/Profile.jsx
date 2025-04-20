import Navbar from "./Navbar";

function Profile() {
    return (
        <>
            <section className="bg-red-400 h-screen w-full">
                <Navbar />

                <div className="text-[#111] m-5">
                    <h1 className="text-4xl font-bold">This is a Profile Section.</h1>
                </div>
            </section>
        </>
    );
}

export default Profile;