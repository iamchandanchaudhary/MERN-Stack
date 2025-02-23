function About() {
    return (
        <section className="flex flex-col items-center w-max mt-12 bg-orange-300">
            <h1 className="text-4xl font-bold">What makes a password strong?</h1>

            <div className="flex">
                <div className="max-w-72">
                    <i class="fa-solid fa-key"></i>
                    <p>Long</p>
                    <p>The longer a password, the more secure it is. A strong password should be at least 10 characters long.</p>
                </div>
                <div className="max-w-72">
                    <i class="fa-solid fa-lock"></i>
                    <p>Complex</p>
                    <p>Strong passwords use a combination of letters, numbers, cases, and symbols to form an unpredictable string of characters that doesn't resemble words or names.</p>
                </div>
                <div className="max-w-72">
                    <i class="fa-solid fa-shield-halved"></i>
                    <p>Unique</p>
                    <p>A strong password should be unique to each account to reduce vulnerability in the event of a hack.</p>
                </div>
            </div>
        </section>
    );
}

export default About;