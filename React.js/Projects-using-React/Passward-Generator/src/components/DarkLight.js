let lightBtn = document.querySelector(".light-btn");
let darkBtn = document.querySelector(".dark-btn");

lightBtn.addEventListener("click", () => {
    darkBtn.classList.add("visible");
    darkBtn.classList.add("flex");
    darkBtn.classList.remove("hidden");
    lightBtn.classList.add("hidden");

    // html.classList.add("dark");
})

darkBtn.addEventListener("click", () => {
    lightBtn.classList.add("visible");
    lightBtn.classList.remove("hidden");
    darkBtn.classList.add("hidden");

    // html.classList.remove("dark");
})
