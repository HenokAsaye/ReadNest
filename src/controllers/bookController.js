import { fetchBooks } from "../utils/externalAPI";

export const getBooks = async (req, res) => {
   try {
      const category = req.query.category||"thriller"; // use default value thriller if no query is provided
      const books = await fetchBooks(category);
      res.status(200).send(books);
   } catch (err) {
      res.status(500).send("Failed to get the books");
   }
};
