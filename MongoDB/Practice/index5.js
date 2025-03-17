const mongoose = require("mongoose");
const Person = require("./model5");

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Practice5");
}

// const Person = new mongoose.model("Person", personSchema);

Person.insertMany([
    {name: "Chandan Chaudhary", age: 18, course: "BCA", city: "Basti"},
    {name: "Jitedra Singh", age: 28, course: "MCA", city: "Ayodhya"},
    {name: "Ajay Mishra", age: 21, course: "BCOM", city: "Patna"},
    {name: "Amand Chaudhary", age: 32, course: "B-Tech", city: "Delhi"},
    {name: "Satish Tripathi", age: 27, course: "BScs Ag", city: "Manikapur"},  
])
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

// Person.deleteMany({age: {$gte: 18}}).then((data) => console.log(data));
// Person.find({}).then((data) => console.log(data));