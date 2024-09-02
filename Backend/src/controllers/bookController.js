import Book from "../models/bookModels.js";
import User from "../models/userModels.js";

export const addBook = async (req, res) => {
    try {
        const userId = req.user.id
        const { title, author, genre } = req.body;

        if (!title || !author || !genre) {
            return res.status(400).json({ message: "Title,Author And genre are required" });
        }
        const existingBook=await Book.findOne({title:title});
        if(existingBook) return res.status(409).json({message:"Book already exist in the collection"});
        let newBook = new Book(req.body);
        newBook.owner=userId;
        newBook=await newBook.save();
        const user=await User.findByIdAndUpdate(userId, { $push: { books: newBook._id } },{new:true});
        return res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
        return res.status(500).json({ message: "An  error occurred!"+error.message });
    }
};

export const getUserBooks = async (req, res) => {
    try {
        const userId = req.user.id
        const foundUser = await User.findById(userId).populate({
            path: 'books',
            options: {
                sort: { title: 1 },
            }
        });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const books = foundUser.books;
        const totalBooks = books.length;

        return res.status(200).json({
            totalBooks,
            books,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while retrieving the books"+error.message });
    }
};

export const updateBookStatus = async (req, res) => {
    try {
        const userId = req.user.id
        const { title, status } = req.body;

        if (!title || !status) {
            return res.status(400).json({ message: "Book title and ReadStatus are required!" });
        }

        if (!['Not Started', 'In Progress', 'Completed'].includes(status)) {
            return res.status(400).json({ message: "Invalid Read Status!" });
        }

        const updatedBook = await Book.findOneAndUpdate({title:title,owner:userId},{$set:{status:status}},{new:true});
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found in your collection" });
        }
        return res.status(200).json({ message: "Read status updated successfully!" 
            ,updatedBook:updatedBook});

    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the read status"+error.message });
    }
};

export const deleteBooks = async (req, res) => {
    try {
        const userId = req.user.id
        const { title, author } = req.body;

        if (!title) {
            return res.status(400).json({ message: `title field is required` });
        }

        const userD = await User.findById(userId).populate('books');

        if (!userD) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookD = userD.books.find(b => b.title === title && (!author || b.author === author));

        if (!bookD) {
            return res.status(404).json({ message: `No book found with title "${title}" in your collection` });
        }

        userD.books = userD.books.filter(b => b._id.toString() !== bookD._id.toString());
        await userD.save();
        await Book.findByIdAndDelete(bookD._id);

        return res.status(200).json({ message: `Book "${title}" by ${author || 'unknown author'} has been successfully deleted from your collection` });
    } catch (error) {
        return res.status(500).json({ message: "An unknown error has occurred"+error.message });
    }
};