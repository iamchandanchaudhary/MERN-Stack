const mongoose = require("mongoose");

const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/Practice7');
        console.log(`Rquest Received: ${connectionInstance}`);
    }
    catch(err) {
        console.log("MongoDB connection Error:", err);
    }
}
connectionDB();

// main()
//     .then(() => console.log(`Rquest Received ${connectionInstance}`))
//     .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    marks: Number
});

const Student = mongoose.model("Student", studentSchema);

// stu1.save()
//     .then((data) => console.log(data));
//     // .catch(() => console.log(err));

// Student.insertMany([
//     {name: "Abhishekh Sharma", age: 21, city: "Lucknow", marks: 91},
//     {name: "Naman Dash", age: 31, city: "Barabanki", marks: 82},
//     {name: "Ajay Singh", age: 25, city: "Ayodhya", marks: 92},
//     {name: "Sanjay Jaiswal", age: 20, city: "Gonda", marks: 77}
// ])
//     .then((data) => console.log(data))