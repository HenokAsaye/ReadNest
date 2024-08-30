import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectToDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to MongoDB")
    } catch (err) {
        console.log('Error connecting to MongoDB:', error);
    }
 };
 export default connectToDB