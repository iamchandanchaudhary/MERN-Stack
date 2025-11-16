const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  // Folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Initialize Upload
const upload = multer({ storage: storage });

// Single File Upload Route
app.post("/upload", upload.single("myFile"), (req, res) => {
    res.send("File uploaded successfully!");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});