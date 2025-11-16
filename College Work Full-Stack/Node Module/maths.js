// math.js (User-defined module)

function Addition(a, b) {
    return a + b;
}

function Subtraction(a, b) {
    return a - b;
}

function Multiplication(a, b) {
    return a * b;
}

function Division(a, b) {
    if (b === 0) {
        return "Cannot divide by zero!";
    }
    return a / b;
}

// Export functions
module.exports = {
    Addition,
    Subtraction,
    Multiplication,
    Division
};