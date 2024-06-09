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

// function usoZapatilla(){
//   usoDetail.addEventListener("select", () => {
//       if(usoDetail.value == "1"){
//       return usoDetail = "Uso urbanos"
//           }
//     else if(usoDetail.value == "2"){
//        return tipoDeZapa = "Uso deportivo"
//           }
//     else if(usoDetail.value == "3")
//     tipoDeZapa = "De vestir"
      
// })}

// usoZapatilla()



// HASTA ACÁ NO VA
