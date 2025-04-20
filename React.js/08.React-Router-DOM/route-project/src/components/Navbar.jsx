function Navbar() {
    return (
        <section className="flex justify-center items-center w-full h-16 px-10 bg-blue-500 text-[#fff]">

            <ul className="flex justify-center items-center gap-5">
                <li><a href="/" className="hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Home</a></li>
                <li><a href="/contacts" className="hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Contacts</a></li>
                <li><a href="/services" className="hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Services</a></li>
                <li><a href="/about" className="hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">About</a></li>
                <li><a href="/profile" className="hover:bg-[#fff] hover:text-[#000] px-3 py-1 rounded-md hover:drop-shadow-md transition-all duration-300 ease-in-out">Profile</a></li>
            </ul>
        </section>
    );
}

export default Navbar;