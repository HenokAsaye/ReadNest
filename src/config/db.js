import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB")
)
    .catch((error) => console.log('Error connecting to MongoDB:', error))
