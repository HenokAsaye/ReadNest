import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectToDb from "./config/db.js";


const port = process.env.PORT || 3000;

connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
