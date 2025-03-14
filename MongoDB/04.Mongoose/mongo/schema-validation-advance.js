const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/store");
}

const bookSchama = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
    },

    price: {
        type: Number,
        min: [1, "Please enter valid price"]
    },

    discount: {
        type: Number,
        default: 0,
    }
})

const Book = mongoose.model("Book", bookSchama);