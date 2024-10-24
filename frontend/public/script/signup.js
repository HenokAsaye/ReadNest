const signUpForm=document.getElementById("signup");


signUpForm.addEventListener("submit",async function(e){
    e.preventDefault()
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());
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
         alert(data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });