const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/book");
}

main()
    .then(() => console.log("Connection Done"))
    .catch((err) => console.log(err));

// ==> Schema Validation
const booksData = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    price: {
        type: Number
    }
})

const Book = mongoose.model("Book", booksData);

Book.insertMany([
    {title: "Rich Dad & Poor Dad", author: "Robert Kiyosaki", price: 240},
    {title: "Full Stack", author: "ChanduBhaiii"},
    // {author: "ChanduBhaiii", price: 240}, // => Invalide because it don't have title(required)
    {title: "Physics XII", author: "HC Verma", price: "750"}, // => Valide case because it can be converted in Numbers(in Mongo)
    // {title: "Mathematics XII", author: "RD Sharma", price: "abc"}, // => Invalide case because it can't be converted in Numbers(in Mongo)
])

Book.find({}).then((data) => console.log(data));