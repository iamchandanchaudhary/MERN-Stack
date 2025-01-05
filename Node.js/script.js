// let student1 = ["Chandan", 18, 99.8];

// console.log("Student :", student1);

// for(let i = 0; i < 5; i++) {
//     console.log("Chandu Bhaiii");
// }

// console.log(process.argv);

let args = process.argv;

for(let i = 2; i < args.length; i++) {
    console.log("Hello & Welcome:", args[i]);
}