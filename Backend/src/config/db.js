import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); 
    }
};

export default connectToDb;
