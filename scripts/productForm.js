// function cargarEventos() {
  
//   document.getElementById("nuevo-producto").addEventListener("submit", nuevoProducto, false);
//   }
//     document.getElementById("nuevo-producto").addEventListener("click", function(event){
//       event.preventDefault()
//     });
document.addEventListener("DOMContentLoaded", function() {
  cargarEventos();
});

function cargarEventos() {
  document.getElementById("nuevo-producto").addEventListener("submit", function(event) {
    event.preventDefault();
    // nuevoProducto();
  }, false);
}

// Llamamos a cargarEventos para asegurarnos de que los eventos se añadan cuando se cargue la página.
cargarEventos();


  nuevoElemento =
  
    function nuevoProducto() {
      getTalles();
      getColores();
     nuevoElemento = nuevoProducto = { 
        nombre: nombreDetail.value,
        marca: marcaDetail.value,
        descripcion: descripcionDetail.value,
        precio: precioDetail.value,
        uso: usoDetail.value,
        talle: talleDetail,
        color: colorDetail,
        genero: generoDetail.value,
        imagen1: img1Detail,
        imagen2: img2Detail,
        imagen3: img3Detail,};
      return nuevoElemento  
    }




    nombreDetail = document.getElementById("nombreDetail");
    descripcionDetail = document.getElementById("descripcionDetail");
    precioDetail = document.getElementById("precioDetail");
    usoDetail = document.getElementById("usoDetail");
    marcaDetail = document.getElementById("marcaDetail");
 
    generoDetail = document.getElementById("generoDetail")
    img1Detail = document.getElementById("img1");
    img2Detail = document.getElementById("img2");
    img3Detail = document.getElementById("img3");







    //funciones:
    //funcion para obtener los talles seleccionados en el checkbox
    function getTalles() {
      const form = document.getElementById('nuevo-producto');
      const checkboxes = form.querySelectorAll('input[name="tallas"]:checked');
      let selectedItems = [];
      
      checkboxes.forEach((checkbox) => {
          selectedItems.push(checkbox.value);
      });
    
      talleDetail= [selectedItems];
      return talleDetail
    }

    function getColores() {
      const form = document.getElementById('nuevo-producto');
      const checkboxes = form.querySelectorAll('input[name="color"]:checked');
      let selectedItems = [];
      
      checkboxes.forEach((checkbox) => {
          selectedItems.push(checkbox.value);
      });
    
      colorDetail= [selectedItems];
      return colorDetail
    }
  


//funcion que lo envía
const enviar = async () => { 
await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoElemento)
})
}
