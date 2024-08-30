import dotenv from 'dotenv';
import connectToDB from './config/db.js'
import app from "./app.js";
dotenv.config();

connectToDB()

const port = process.env.PORT_NUM;

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.log('Error connecting to the server:', error);
};