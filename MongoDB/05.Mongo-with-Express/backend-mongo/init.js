// Sample data to initilize

const mongoose = require("mongoose");
const Chat = require("./models/chat");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log(err));

// let allChats = [
//     {from: "Sneha Chaudhary", to: "Chandan Chaudhary", msg: "How are you?", created_at: new Date()},
//     {from: "Anshika Patel", to: "Anand Sukla", msg: "Please call me", created_at: new Date()},
//     {from: "Safali Singh", to: "Nilam Mishra", msg: "Who are you?", created_at: new Date()},
//     {from: "Jagat Patel", to: "Satish Yadav", msg: "Where are you?", created_at: new Date()},
//     {from: "Akash Pathak", to: "Divaynsh Singh", msg: "When did you come?", created_at: new Date()},
//     {from: "Manish Tripathi", to: "Harshit Debey", msg: "Meet me tommarow", created_at: new Date()},
// ];

// Chat.insertMany(allChats)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
