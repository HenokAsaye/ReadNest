const signUpForm=document.getElementById("signup");


signUpForm.addEventListener("submit",async function(e){
    e.preventDefault()
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(
        "http://localhost:3000/auth/register",
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
             window.location.href="../html/index.html";
         }, 500);
      } else {
        console.log(data.errors)
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });