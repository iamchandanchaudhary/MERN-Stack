const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Done"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/book");
}

// Schema Validation
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
    // {title: "Rich Dad & Poor Dad", author: "ChanduBhaiii", price: 240},
    // {title: "Full Stack", author: "ChanduBhaiii"}
        {author: "ChanduBhaiii", price: 240}
])

Book.find({}).then((data) => console.log(data));