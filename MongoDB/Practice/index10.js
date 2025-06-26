import mongoose from "mongoose";

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/college15');
}

main()
    .then(() => console.log("Connection Successfull."))
    .catch((err) => console.log("ERROR - ", err));

const student = new mongoose.Schema ({
    name: String,
    age: Number,
    city: String
});

const Student = mongoose.model("Student", student);

Student.insertMany([
    {name: "Chandan Chaudhary", age: 18, city: "Basti"},
    {name: "Aman Chaudhary", age: 25, city: "Lucknow"},
    {name: "Ajeet Varma", age: 21, city: "Baliya"},
])
    .then((data) => console.log(data));