const recommendedBooks = document.querySelector(".books");
const createBook=document.querySelector(".createBook");
const myBooks = document.querySelector(".myBooks");
const searchResult=document.querySelector(".searchResults");
const bookContainer = document.getElementById("books");
const myBookContainer = document.getElementById("myBooks");
const showMyBooks = document.getElementById("showMyBooks");
const showRecommended=document.getElementById("showRecommended")
const showCreateBook=document.getElementById("showCreateBook")
const loadingIndicator = document.getElementById("loading");
const searchResultContainer=document.getElementById("searchResult");
const searchBtn=document.getElementById("searchButton");
const searchBox=document.getElementById("search");
const goBackBtn=document.getElementById("goBack");
loadingIndicator.style.display = "block";
let booksData={};
let myBookList={};
const userData=JSON.parse(localStorage.getItem("user"))
const token=userData.token;
const genre=userData.preferredGenre;
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
    const recommendedBooks=await fetchData(`http://localhost:3000/api/books?genre=${genre}`)
    loadingIndicator.style.display = "none";
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
const addBooks=async(booksData,index)=>{
    try{ const response=await fetch("http://localhost:3000/books/",{
        method: "POST",
        body: JSON.stringify(booksData),
        headers: {
        "Content-type": "application/json",
        "authorization":token
      }
     });
     if (response.ok) {
        window.location.reload();
        const result = await response.json();
        console.log('book added successfully:', result);
    } else {
        console.error('book adding failed:');
    }}catch(err){
        console.log(err)
    }
}
bookContainer.addEventListener("click",(e)=>{
    if(e.target.tagName=="BUTTON") {
       const index=e.target.parentElement.id
       addBooks(booksData[index]);
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
        const parentElement=e.target.parentElement
        const modal=document.getElementById("modal")
        modal.style.display="block";
        document.getElementById("yes").addEventListener("click",async(e)=>{
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
                    parentElement.remove();
                    const result = await response.json();
                    console.log('book deleted successfully:', result);
                } else {
                    console.error('book deleting failed:');
                }
            }catch(err){
                console.log(err)
            }
            modal.style.display="none"
        })
        document.getElementById("no").addEventListener("click",(e)=>{
            modal.style.display="none"
        })
        
    }
})
searchBtn.addEventListener("click",async(e)=>{
      const title=searchBox.value;
      searchBox.value="";
         recommendedBooks.style.display = "none";
         myBooks.style.display="none"
         searchResult.style.display="block";
      loadingIndicator.style.display="block"
      try{
         const searchedBooks=await fetchData(`http://localhost:3000/api/books/search?q=${title}`)
         loadingIndicator.style.display="none"
         displayBooks(searchedBooks.results,searchResultContainer,"Add Book",false);
         createBook.style.display="none";

         searchResultContainer.addEventListener("click",(e)=>{
            if(e.target.tagName=="BUTTON") {
               const index=e.target.parentElement.id
               addBooks(searchedBooks.results[index]);
              }
        })
      }catch(err){
           console.log(err)
      }
})
goBackBtn.onclick=()=>{
    searchResultContainer.innerHTML='';
    searchResult.style.display="none"
    recommendedBooks.style.display = "block";
}
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

document.getElementById("bookForm").addEventListener("submit",function(e){
     e.preventDefault();
     const formData = new FormData(this);
     const formObject = Object.fromEntries(formData.entries());
     addBooks(formObject);
})