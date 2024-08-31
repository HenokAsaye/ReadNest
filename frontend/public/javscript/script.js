const recommendedBooks = document.querySelector(".books");
const createBook=document.querySelector(".createBook");
const myBooks = document.querySelector(".myBooks");
const bookContainer = document.getElementById("books");
const myBookContainer = document.getElementById("myBooks");
const showMyBooks = document.getElementById("showMyBooks");
const showRecommended=document.getElementById("showRecommended")
const showCreateBook=document.getElementById("showCreateBook")

let booksData={};
let myBookList={};
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDJjNjEyNjM0MzBjYmIyYjFiYTI0NCIsImlhdCI6MTcyNTA4OTMxM30.zCOWdPCin6BKy8j8kkVQu2yTOhBCsv14vy6tRLpdxI4";
const fetchData=async(url)=>{
     try{
         const res=await fetch(url,{
                method:"GET",
                 headers: {
                 "Content-type": "application/json;",
                 "authorization":token
              }
         });
         const data=await res.json();
         return data
     }catch(err){
           console.log("error: "+err.message);
     }
}
const getBooks=async()=>{
   try  { 
    const myBooksList=await fetchData("http://localhost:3000/books/");
    const recommendedBooks=await fetchData("http://localhost:3000/api/books?genre=thriller")
    booksData={...recommendedBooks}
    myBookList={recommendations:[...myBooksList.books]}
   }catch (error) {
    console.error('Error fetching books:', error);
  }
  displayBooks(myBookList,myBookContainer,"Mark Complete")
  displayBooks(booksData,bookContainer,"Add Book");
}
getBooks();
const displayBooks = (book,container,btnMsg) => {
   book.recommendations.forEach((book,index) => {
      if(!book.coverImg) {
        book.coverImg="../../img/book.jpg";
    }
      container.innerHTML += `
          <div class="book" id=${index}>
                <h2>Title: ${book.title}</h2>
                <img src=${book.coverImg} alt="no image">
                <p>author: ${book.author} </p>
                <button class="addBooks">${btnMsg}</button>
            </div>
          `;
   });
};
bookContainer.addEventListener("click",async(e)=>{
    if(e.target.tagName=="BUTTON") {
        const index=e.target.parentElement.id
       try{ const response=await fetch("http://localhost:3000/books/",{
            method: "POST",
            body: JSON.stringify(booksData.recommendations[index]),
            headers: {
            "Content-type": "application/json",
            "authorization":token
          }
         });
         if (response.ok) {
            const result = await response.json();
            console.log('book added successfully:', result);
        } else {
            console.error('book adding failed:');
        }}catch(err){
            console.log(err)
        }
      }
})
showMyBooks.onclick=() => {
   recommendedBooks.style.display = "none";
   myBooks.style.display="block"
   createBook.style.display="none";
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

document.getElementById("bookForm").addEventListener("submit",async function(e){
     e.preventDefault();
     const formData = new FormData(this);
     const formObject = Object.fromEntries(formData.entries());
     try{const response=await fetch("http://localhost:3000/books/",{
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
        "Content-type": "application/json",
        "authorization":token
      }
     })
     if (response.ok) {
        const result = await response.json();
        console.log('book form added successfully:', result);
    } else {
        console.error('book form adding failed:');
    }}catch(err){
        console.log(err)
    }
})
