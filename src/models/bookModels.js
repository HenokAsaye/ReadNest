import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    publishedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    id: {
        type: Number,
        unique: true  
    }
});

const Book = mongoose.model('Book', bookSchema); 
export default Book;
