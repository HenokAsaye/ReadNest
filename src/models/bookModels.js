import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    publishedDate: {
        type: Date
    }
});

const book = mongoose.model('book', bookSchema);
export default book
