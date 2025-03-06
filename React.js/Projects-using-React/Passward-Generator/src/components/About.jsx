import "./About.css";

function About() {
    return (
        <section className="flex flex-col items-center w-max bg-[#fff1e6] dark:bg-[#0a1338] my-8 py-12 px-20 rounded-lg drop-shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold">What makes a password strong?</h1>

            <div className="flex mt-12 gap-8">
                <div className="max-w-72 bg-[#fff] hover:bg-[#1848a1] hover:text-[#fff] dark:bg-gray-800 dark:hover:bg-[#1848a1] px-6 md:px-8 py-4 flex items-center justify-center flex-col gap-4 rounded-lg drop-shadow-lg transition-all duration-500 ease-in-out">
                    <i class="fa-solid fa-key text-3xl md:text-4xl"></i>
                    <h1 className="text-lg md:text-xl font-bold">Long</h1>
                    <p className="text-sm md:text-base text-center">While length is crucial, combining it with complexity (uppercase and lowercase, numbers, and symbols) further strengthens your password.</p>
                </div>

                <div className="max-w-72 w-max bg-[#fff] hover:bg-[#1848a1] hover:text-[#fff] dark:bg-gray-800 dark:hover:bg-[#1848a1] px-6 md:px-8 py-4 flex items-center justify-center flex-col gap-4 rounded-lg drop-shadow-lg transition-all duration-500 ease-in-out">
                    <i class="fa-solid fa-lock text-3xl md:text-4xl"></i>
                    <h1 className="text-lg md:text-xl font-bold">Complex</h1>
                    <p className="text-sm md:text-base text-center">Mixing characters makes patterns unpredictable, They add layers of difficulty, protecting your accounts.</p>
                </div>

                <div className="max-w-72 bg-[#fff] hover:bg-[#1848a1] hover:text-[#fff] dark:bg-gray-800 dark:hover:bg-[#1848a1] px-8 py-4 flex items-center justify-center flex-col gap-4 rounded-lg drop-shadow-lg transition-all duration-500 ease-in-out">
                    <i class="fa-solid fa-shield-halved text-3xl md:text-4xl"></i>
                    <h1 className="text-lg md:text-xl font-bold">Unique</h1>
                    <p className="text-sm md:text-base text-center">A strong password should be unique to each account to reduce vulnerability in the event of a hack.</p>
                </div>
            </div>
        </section>
    );
}

export default About;