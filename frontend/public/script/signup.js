const signUpForm=document.getElementById("signup");
const username=document.getElementById("name")
const email=document.getElementById("email")
const password=document.getElementById("password")
const errorShowEl=document.querySelectorAll(".error");
console.log(username);

username.addEventListener("focus",()=>{
  errorShowEl[0].textContent = "";
})
email.addEventListener("focus", () => {
  errorShowEl[1].textContent = "";
});
password.addEventListener("focus", () => {
  errorShowEl[2].textContent = "";
});
signUpForm.addEventListener("submit",async function(e){
    e.preventDefault()
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());
    if(username.value.length<5){
      errorShowEl[0].textContent = "name is too short (min-length:5 characters)";
      return;
    }
    else if (email.value.length < 5) {
      errorShowEl[1].textContent = "Too short Email(min-length:5 characters)";
      return;
    }
    else if (password.value.length < 6) {
      errorShowEl[2].textContent =
         "password is too short (min-length:6 characters)";
      return;
   }
    try {
      const response = await fetch(
        "https://readnest.onrender.com/auth/register",
        {
          method: "POST",
          body: JSON.stringify(formObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      localStorage.setItem("user",JSON.stringify(data))
      if (response.ok) {
         setTimeout(() => {
             window.location.href="./index.html";
         }, 100);
      } else {
         if(response.status===409)
            errorShowEl[1].textContent=data.error
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });