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
    },
    coverImg:{
        type:String
    },
    ownedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
});

const Book = mongoose.model('book', bookSchema);
export default Book
