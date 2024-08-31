import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDb from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
