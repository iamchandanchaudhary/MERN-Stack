const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Practice")
}

main()
    .then(() => console.log("Connection Successful..."))
    .catch((error) => console.log("ERROR-", error));

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: Number,
    city: String,

})

const Student = mongoose.model("Student", studentSchema);

Student.insertMany([
    {name: "Manjeet Singh", age: 21, city: "Barabanki"},
    {name: "Sanjeev Mehta", age: 25, city: "Surat"},
    {name: "Akhilesh Yadav", age: 44, city: "Kannauj"},
])
    .then((data) => console.log(data));
