function outer() {
    let a = 15;

    function inner() {
        let b = 25;
        console.log("Sum:", a + b);
    }

    return inner();
}

outer();