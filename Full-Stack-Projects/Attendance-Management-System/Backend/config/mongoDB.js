import mongoose from "mongoose";

const main = async () => {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not set.");
    }

    await mongoose.connect(`${mongoUri}/Attendence-MS`);
    console.log("DB Connection Successful...");
};

export default main;