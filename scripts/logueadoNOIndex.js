//usuario sesion
document.addEventListener("DOMContentLoaded", function() {
    const userStatus = document.getElementById("userStatus");
    const storedEmail = localStorage.getItem('userEmail');

  
    if (storedEmail) {
      userStatus.innerHTML = `Bienvenido: ${storedEmail}` 
    //  , <button id="logout" href="#">Cerrar sesión</button>`;
        
      if(storedEmail == "zenithadmin@zenith.com"){
        userStatus.innerHTML = `<a href="./productForm.html">Cargar producto</a>,<div ><button id="logout" onclick="cerrarSesion()">Cerrar sesion</button></div>`} 
      else{
        userStatus.innerHTML = `Bienvenido: ${storedEmail}, <br>Cerrar sesion` 
      }      
    }   


    else {
      userStatus.innerHTML = `<a href="./login.html">Iniciar sesión</a>`;
    }});
    const logoutButton = document.getElementById("logout");
    
    function cerrarSesion(){
      localStorage.removeItem('userEmail');
      userStatus.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
      logoutButton.style.display = "none";
      
    }

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