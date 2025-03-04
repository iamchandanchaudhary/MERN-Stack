const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/college");

main()
    .then(() => console.log("Rquest Received"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Practice');
}

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    marks: Number
});

const Student = mongoose.model("Student", studentSchema);

const stu1 = new Student({
    name: "Chandan Chaudhary",
    age: 18,
    city: "Basti",
    marks: 98.5
})

stu1.save()
    .then((data) => console.log(data));
    // .catch(() => console.log(err));

Student.insertMany([
    {name: "Nukhil Verma", age: 21, city: "Lucknow", marks: 91},
    {name: "Ashok Singh", age: 31, city: "Barabanki", marks: 82},
    {name: "Manoj Rajput", age: 25, city: "Ayodhya", marks: 92},
    {name: "Akansha Mishra", age: 20, city: "Gonda", marks: 77}
])
    .then((data) => console.log(data))