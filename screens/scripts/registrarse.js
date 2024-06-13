  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";  
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyACFIyQ4dTJZxVJdgj3nUtwC4REJXm3k9Y",
    authDomain: "c-18-116-m-html.firebaseapp.com",
    databaseURL: "https://c-18-116-m-html-default-rtdb.firebaseio.com",
    projectId: "c-18-116-m-html",
    storageBucket: "c-18-116-m-html.appspot.com",
    messagingSenderId: "623166454779",
    appId: "1:623166454779:web:ea2d35912fa7068cd4295e",
    measurementId: "G-P03JLH7RPV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);




// submit
const submit = document.getElementById("submit");
submit.addEventListener("click", function(event){
event.preventDefault()
//inputs
const email = document.getElementById("email").value;
const password =document.getElementById("password").value;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("logueado")
    window.location.href="registro3.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  })
})

// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  })