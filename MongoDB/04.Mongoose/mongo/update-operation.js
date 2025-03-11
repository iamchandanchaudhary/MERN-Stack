const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Successeful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/college4");
}

const personData = new mongoose.Schema({
    name: String,
    city: String,
    age: Number
});

const Person = mongoose.model("Person", personData);

// Person.insertMany([
//     {name: "Chandan Chaudhary", city: "Basti", age: 18},
//     {name: "Nikhil Pandey", city: "Lucknow", age: 27},
//     {name: "Abhisekh Sharma", city: "Haidrabad", age: 22},
//     {name: "Sonam Singh", city: "Mumbai", age: 20}
// ])
//     .then((data) => console.log(data));