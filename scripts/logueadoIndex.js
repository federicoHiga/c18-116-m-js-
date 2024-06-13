//usuario sesion
document.addEventListener("DOMContentLoaded", function() {
    const userStatus = document.getElementById("userStatus");
    const storedEmail = localStorage.getItem('userEmail');

    if (storedEmail) {
      userStatus.innerHTML = `Bienvenido: ${storedEmail}` 
    //  , <button id="logout" href="#">Cerrar sesión</button>`;
        
      if(storedEmail == "zenithadmin@zenith.com"){
        userStatus.innerHTML = `<a href="screens/productForm.html">Cargar producto</a>`} 
      else{
        userStatus.innerHTML = `Bienvenido: ${storedEmail}` 
      }      
    }   


    else {
      userStatus.innerHTML = `<a href="screens/login.html">Iniciar sesión</a>`;
    }});

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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