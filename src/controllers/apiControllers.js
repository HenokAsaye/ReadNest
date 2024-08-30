import { fetchBooks } from "../utils/externalAPI";

export const getBooks = async (req, res) => {
  try {
    const genre = req.query.genre;
    if (!genre) {
      return res.status(400).json({ error: "Genre query parameter is required" });
    }
    const query = `subject:${genre}`;
    const recommendedBooks = await fetchBooks(query);
    if (!recommendedBooks) {
      return res.status(404).json({ error: `No books found in the genre "${genre}"` });
    }
    return res.status(200).json({
      message: `Recommended books in the genre "${genre}":`,
      recommendations: recommendedBooks
    });
  } catch (error) {
    return res.status(500).json({ error: "An unknown error occurred" });
  }
};
export const searchBooks = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Search query parameter is required" });
    }
    const titleQuery = `intitle:${query}`;
    const searchResults = await fetchBooks(titleQuery);

    if (!searchResults) {

      return res.status(404).json({ error: `No books found with the title "${query}"` });
=======
   

    }
    return res.status(200).json({
      message: `Search results for books with the title "${query}":`,
      results: searchResults
    });
  } catch (error) {
    return res.status(500).json({ error: "An unknown error occurred during the search" });
  }
};
