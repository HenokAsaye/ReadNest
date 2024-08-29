import dotenv from "dotenv"
dotenv.config();
export const fetchBooks = async (query) => {
    const apiKey =process.env.API_KEY ;
    const maxResults = 10;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// sample on how to use the api

/* const getBooks=async()=>{
      const books=await fetchBooks("history");
      console.log(books)
      books.forEach((book, index) => {
        console.log(`${index + 1}. Title: ${book.volumeInfo.title}`);
        console.log(`   Authors: ${book.volumeInfo.authors.join(', ')}`);
        console.log(`CoverImage : ${(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ||"no image"}`)
        console.log('---');
    });
}
getBooks(); */
