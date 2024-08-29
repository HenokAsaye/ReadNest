import dotenv from 'dotenv';
import app from "./app.js";
dotenv.config();

const port = process.env.PORT_NUM;


try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.log('Error connecting to the server:', error);
};