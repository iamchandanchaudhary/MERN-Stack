const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/Practice');

main()
    .then(() => console.log("Connection Successeful"))
    .catch((err) => console.log(err));
  
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Practice3');
}

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    sallary: Number
})

const Person = mongoose.model("Person", personSchema);

pre1.save().then((data) => console.log(data));

Person.insertMany([
    {name: "Priya Singh", age: 24, sallary: 18000},
    {name: "Swati Pandey", age: 25, sallary: 21000},
    {name: "Sikha Rajput", age: 27, sallary: 14000}
]).then((data) => console.log(data));