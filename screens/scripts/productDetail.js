//ventanas debajo productos

// estrellas
const estrellas = document.querySelectorAll(".estrella");

estrellas.forEach(function (estrella, index) {
  estrella.addEventListener("click", function () {
    for (let i = 0; i <= index; i++) {
      estrellas[i].classList.add("activa");
    }
    for (let i = index + 1; i < estrellas.length; i++) {
      estrellas[i].classList.remove("activa");
    }
  });
});
//estrellas

// funciones esto se puede borrar

var producto = [
  {
    nombre: nombreDetail,
    marca: marcaDetail,
    descripcion: descripcionDetail,
    precio: precioDetail,
    // tipo: usoDetail,
    medida: [talleDetail],
    color: [colorDetail],
    // genero: generoDetail,
    img1: img1Detail,
    img2: img2Detail,
    img3: img3Detail  ,
  },
];




function cargarEventos() {
  
document.getElementById("nuevo-producto").addEventListener("submit", nuevoProducto, false);
}

nuevoElemento =

  function nuevoProducto() {
   
   nuevoElemento = nuevoProducto = { 
      nombre: nombreDetail.value,
      marca: marcaDetail.value,
      descripcion: descripcionDetail.value,
      precio: precioDetail.value,
      // tipo: usoDetail,
      medida: talleDetail.value,
      color: [colorDetail].value,
      // genero: generoDetail,
      imagen1: img1Detail.value,
      imagen2: img2Detail.value,
      imagen3: img3Detail.value,};
    return nuevoElemento
  }

// //array dce productos

nombreDetail = document.getElementById("nombreDetail");
descripcionDetail = document.getElementById("descripcionDetail");
precioDetail = document.getElementById("precioDetail");
// usoDetail = document.productForm.tipoDetail
talleDetail = document.getElementById("talleDetail");
marcaDetail = document.getElementById("marcaDetail");
// materialDetail = document.getElementById("materialDetail");
colorDetail = document.getElementById("colorDetail");
// generoDetail =  document.productForm.generoDetailDetail
// img1Detail = document.getElementById("img1").value;
// img2Detail = document.getElementById("img2").value;
// img3Detail = document.getElementById("img3").value;





//usuario sesion
document.addEventListener("DOMContentLoaded", function() {
  const userStatus = document.getElementById("userStatus");
  const storedEmail = localStorage.getItem('userEmail');
  const botonFinal = document.getElementById("botonFinal");
  const imagenContainer = document.getElementById("imagenContainer");


  if (storedEmail) {
    userStatus.innerHTML = `Bienvenido: ${storedEmail}`;
  } else {
    userStatus.innerHTML = `<a href="./login.html">Iniciar sesión</a>`;}


   });  
   function finalizarCompra(){
    botonFinal.addEventListener("click", function() {
      
      imagenContainer.innerHTML = `<div class="fondoFinal"><img class="imagenFinal" src="/src/atomo/imagenFinal.png"><p class="textoFinal">Tu compra se realizó con éxito!</p><p class="textoFinal2">Nos comunicaremos vía mail para informarte sobre el detalle de envío.</p></div>`
    })}