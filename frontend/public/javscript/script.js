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
    booksData=[...recommendedBooks.recommendations]
    myBookList=[...myBooksList.books]
   }catch (error) {
    console.error('Error fetching books:', error);
  }
  displayBooks(myBookList,myBookContainer,"Mark Complete",true)
  displayBooks(booksData,bookContainer,"Add Book",false);
}
getBooks();
const displayBooks = (book,container,btnMsg,isMyCollection) => {

   book.forEach((book,index) => {
      if(!book.coverImg) {
        book.coverImg="../../img/book.jpg";
    }
    if(btnMsg!=="Add Book"){
        if(book.status==="Not Started"){
             btnMsg="Start Now";
        }
        else if(book.status==="In Progress"){
            btnMsg="Mark as Complete"
        }
        else{
            btnMsg="Completed"
        }
    }
      container.innerHTML += `
          <div class="book" id=${index}>
                <h2>Title: ${book.title}</h2>
                <img src=${book.coverImg} alt="no image">
                <p>author: ${book.author} </p>
                <button class="addBooks">${btnMsg}</button>
                ${isMyCollection?"<button class='removeBook'>X</button>":""}
            </div>
          `;
   });
};
bookContainer.addEventListener("click",async(e)=>{
    if(e.target.tagName=="BUTTON") {
        const index=e.target.parentElement.id
       try{ const response=await fetch("http://localhost:3000/books/",{
            method: "POST",
            body: JSON.stringify(booksData[index]),
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
myBookContainer.addEventListener("click",async(e)=>{
    if(e.target.classList.contains("addBooks")) {
        const index=e.target.parentElement.id
        let status;
        if(e.target.textContent==="Start Now"){
            e.target.textContent="Mark as Complete"
            status="In Progress"
        }
        else if(e.target.textContent==="Mark as Complete"){
             status="Completed";
             e.target.textContent="Completed"
        }
        try{
            const response=await fetch("http://localhost:3000/books/",{
                method:"PATCH",
                body:JSON.stringify({title:myBookList[index].title,status}),
                headers:{
                    "Content-type": "application/json",
                    "authorization":token
                }
            })
            if (response.ok) {
                const result = await response.json();
                console.log('status updated successfully:', result);
            } else {
                console.error('status updating failed:');
            }
        }catch(err){
            console.log(err)
        }
    }
    if(e.target.classList.contains("removeBook")) {
        const index=e.target.parentElement.id
        e.target.parentElement.remove();
        try{
            const response=await fetch("http://localhost:3000/books/",{
                method:"DELETE",
                body:JSON.stringify({title:myBookList[index].title,author:myBookList[index].author}),
                headers:{
                    "Content-type": "application/json",
                    "authorization":token
                }
            })
            if (response.ok) {
                const result = await response.json();
                console.log('book deleted successfully:', result);
            } else {
                console.error('book deleting failed:');
            }
        }catch(err){
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
