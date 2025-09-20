const isLoggedIn = localStorage.getItem('isLoggedIn');

if(isLoggedIn !== "true"){
    alert("Login terlebih dahulu untuk melihat page ini!")
    window.location.href = "login.html";
}