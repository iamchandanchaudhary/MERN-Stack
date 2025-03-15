const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Working properly.");
})

app.listen(8080, () => {
    console.log("Application was listning on port 8080");
})

main()
    .then(() => console.log("Connection Successful"))
    .catch((error) => console.log(error));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}