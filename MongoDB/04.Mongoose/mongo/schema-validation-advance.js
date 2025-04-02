const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/store");
}

// ==> Schema Validation (Advance)
const bookSchama = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Must be present 
        maxLength: 20, // maximum length & you can also use Custom error message using array
        unique: true, // title must be different
    },

    author: {
        type: String,
    },

    description: {
        type: String,
        lowercase: true, // Automatic change description to lowercase
    },

    price: {
        type: Number,
        min: [1, "Please enter valid price"], // Custom Errors using error
    },

    discount: {
        type: Number,
        default: 0, // by default value
    },

    category: {
        type: String,
        enum: ["fiction", "non-fiction"], // Only two option
    },

    genere: [String], // can store multiple data in the form of array
});

const Book = mongoose.model("Book", bookSchama);

Book.insertMany([
    // {title: "Physics XII", author: "HC Verma", description: "A physics World", price: 850, discount: 150, category: "non-fiction"},
    // {title: "Mathematics X", author: "RD Sharma", description: "A mathematical World", price: 1250, discount: 250, category: "non-fiction"},
    // {title: "Wings of fire", author: "APJ Abdul Kalam", description: "Auto biography of APJ Abdul Kalam", price: 350, category: "non-fiction"},

    // {title: "Wings of fire", author: "APJ Abdul Kalam", description: "Auto biography of APJ Abdul Kalam", price: 350, discount: 150, category: "auto-biography"}, // => Invalid because enum is different from listed
    // {title: "Wings of fire", author: "APJ Abdul Kalam", description: "Auto biography of APJ Abdul Kalam", price: 0, discount: 150, category: "fiction"}, // => Invalid because price is less then 1

    // {title: "Marvel Comics", author: "Stan Lee", description: "The Marvel chenematic universe", price: 700, discount: 50, category: "fiction", genere: ["comics", "superheros", "fiction"]},

])
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));

// Book.find({}).then((data) => console.log(data));

// ==> Update validation
// Book.findOneAndUpdate(
//      {title: "Mathematics X"}, 
//      {price: -650})
//      .then((data) => console.log(data)
// ); // Updation will be perform without validation

Book.findOneAndUpdate(
    {title: "Mathematics X"}, 
    {price: -520}, 
    {runValidators: true})
    .then((data) => console.log(data))
    .catch((err) => console.log(err.errors.price.properties)
); // Updation can be perform by on the basis of Schema validation

Book.findOneAndUpdate({title: "Mathematics X"}, {price: 950}).then((data) => console.log(data));

// Book.find({}).then((data) => console.log(data));