// require('dotenv').config({path: "./env"})

// import mongoose from "mongoose";
// import express from "express";
// import { DB_NAME } from "./constants";

import dotenv from "dotenv";
import ConnectDB from "./db/database.js";

dotenv.config({path: "./env"})

ConnectDB();

// async function main() {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
// }

// main()
//     .then(() => console.log("Connection Done."))
//     .catch((err) => console.log(err));