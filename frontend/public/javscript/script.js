import { books } from "./booksData.js";
import { myBooksList } from "./booksData.js";
const recommendedBooks = document.querySelector(".books");
const createBook=document.querySelector(".createBook");
const myBooks = document.querySelector(".myBooks");
const bookContainer = document.getElementById("books");
const myBookContainer = document.getElementById("myBooks");
const showMyBooks = document.getElementById("showMyBooks");
const showRecommended=document.getElementById("showRecommended")
const showCreateBook=document.getElementById("showCreateBook")


const displayBooks = (book,container) => {
   book.recommendations.forEach((book) => {
      container.innerHTML += `
          <div class="book">
                <h2>Title: ${book.title}</h2>
                <img src=${book.coverImg} alt="no image">
                <p>author: ${book.author} </p>
                <button class="addBooks">Add Book</button>
            </div>
          `;
   });
};

showMyBooks.onclick=() => {
   recommendedBooks.style.display = "none";
   myBooks.style.display="block"
   createBook.style.display="none";
   displayBooks(myBooksList,myBookContainer)
};
showRecommended.onclick=()=>{
    recommendedBooks.style.display = "block";
    myBooks.style.display="none"
    createBook.style.display="none";
}
showCreateBook.onclick=()=>{
    recommendedBooks.style.display = "none";
    myBooks.style.display="none"
    createBook.style.display="block";
}

displayBooks(books,bookContainer);
