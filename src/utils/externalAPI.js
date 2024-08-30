import dotenv from "dotenv"
dotenv.config();
export const fetchBooks = async (query) => {
    const apiKey =process.env.API_KEY ;
    const maxResults = 10;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
       return data.items.map((book)=>{
             return {
                title:book.volumeInfo.title,
                author:(book.volumeInfo.authors&&book.volumeInfo.authors.join(", "))||"No author",
                genre:(book.volumeInfo.categories&&book.volumeInfo.categories.join(", "))||"No catagorie",
                description:book.volumeInfo.description||"no description",
                coverImg:(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ||"no image",
                publishedDate:book.volumeInfo.publishedDate||"unknown"
             }
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// sample on how to use the api

/* const getBooks=async()=>{
      const books=await fetchBooks(`subject:adventure`);
      console.log(books)
      books.forEach((book, index) => {
        console.log(`${index + 1}. Title: ${book.title}`);
        console.log(`categories: ${book.genre}`)
        console.log(`   Authors: ${book.author}`);
        console.log(`CoverImage : ${book.coverImg}`)
        console.log(`publishedDate : ${book.publishedDate}`)
        console.log('---');
    });
}
getBooks(); */
