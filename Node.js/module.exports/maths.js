let PI = 3.14;
let g = 9.8;

function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// module.exports = g;

let obj = {
    sum: sum,
    multiply: multiply,
    PI: PI,
    g: g
}

module.exports = obj;

// ==> Different ways of implementing 'exports'

// module.exports.g = 9.8;
// exports.PI = 9.8;

// module.exports = {
//     sum: sum,
//     multiply: multiply,
//     PI: PI,
//     g: g
// }