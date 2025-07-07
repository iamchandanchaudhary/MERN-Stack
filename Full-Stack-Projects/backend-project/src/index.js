// require('dotenv').config({path: "./env"});

import dotenv from "dotenv";
import ConnectDB from "./db/database.js";

import app from "./app.js";

dotenv.config({path: "./env"})

const port = process.env.PORT || 8000;

ConnectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️ Server is running at port ${port}`);
        })
    })
    .catch((err) => console.log("MongoDatabase Error !!!", err));





// ==> Full process in index file
// async function main() {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
// }

// main()
//     .then(() => console.log("Connection Done."))
//     .catch((err) => console.log(err));