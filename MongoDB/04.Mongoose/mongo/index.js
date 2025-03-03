const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/college');

main()
    .then(() => {
    console.log("Connection Successeful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/college');
}

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
  rollno: Number
});

const Student = mongoose.model("Student", studentSchema);
// const User = mongoose.model("User", studentSchema);

const stu1 = new Student({
  name: "Chandan Chaudhary",
  age: 18,
  city: "Basti",
  rollno: 230010,
})

stu1.save();