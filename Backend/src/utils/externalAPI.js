import dotenv from "dotenv"
dotenv.config();
export const fetchBooks = async (query) => {
    const apiKey =process.env.API_KEY ;
    const maxResults = 16;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
       return data.items.map((book)=>{
             return {
                title:book.volumeInfo.title,
                author:(book.volumeInfo.authors&&book.volumeInfo.authors.join(", "))||"No author",
                genre:(book.volumeInfo.categories&&book.volumeInfo.categories.join(", "))||"No catagorie",
                publishedDate:book.volumeInfo.publishedDate||"unknown",
                description:book.volumeInfo.description||"no description",
                coverImg:(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ||"no image",
             }
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

