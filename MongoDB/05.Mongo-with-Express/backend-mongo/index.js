const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const Chat = require("./models/chat"); // ==> Chat model

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
    .then(() => console.log("Connection Successful"))
    .catch((error) => console.log(error));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.listen(8080, () => {
    console.log("Application was listning on port 8080");
})

app.get("/", (req, res) => {
    res.send("Working properly.");
})

// Chat.insertMany([
//     {from: "Sneha Chaudhary", to: "Neha Chaudhary", msg: "How are you?", created_at: new Date()},
//     {from: "Chandan Chaudhary", to: "Sheshmani Chaudhary", msg: "Call me", created_at: new Date()},
// ])
//     .then((data) => console.log(data));

// Index routes 
app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    // res.send("Working");
    res.render("index.ejs", { chats });
})

// Chat.find({}).then((data) => console.log(data)).catch((err) => console.log(err));