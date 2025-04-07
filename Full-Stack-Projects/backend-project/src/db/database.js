import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const ConnectDB = async () => {
    try {
        // const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/Practice');
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connection Done !! ${connectionInstance.connection.host}`);
        // console.log(`MongoDb Connected !! ${connectionInstance}`);
    }

    catch(error) {
        console.log("MongoDB connection Error:", error);
        process.exit(1); // it is a reference of our current application
    }
}

export default ConnectDB;

// async function main() {
//     const connectionInstance = await mongoose.connect(`${process.env.MONGODB}/${DB_NAME}`);
// }

// main()
//     .then(() => {
//         console.log("MongoDB Connection Done !!")
//         console.log(`MongoDB Connection Done !! ${connectionInstance.connection.host}`);
//         // console.log(`MongoDb Connected !! ${connectionInstance}`);
//     })
//     .catch((err) => {
//         console.log("MongoDB connection Error:", err);
//         process.exit(1); // it is a reference of our current application
//     });