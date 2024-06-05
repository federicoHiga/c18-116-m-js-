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
  


// //funcion que lo envía
// const leerDatos = async () => {
//   try {
//     const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/.json");
//     if (!response.ok) {
//       throw new Error('Error al leer datos');
//     }
//     const data = await response.json();
//     console.log('Datos leídos:', data);
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// Función para obtener y manipular datos
// Función para leer datos de Firebase
const leerDatos = async () => {
  try {
    const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
    if (!response.ok) {
      throw new Error('Error al leer datos');
    }
    const data = await response.json();
    console.log('Datos leídos:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para obtener y manipular datos
const obtenerYManipularDatos = async () => {
  const datos = await leerDatos();
  if (datos) {
    // Asegúrate de que `datos` es un objeto y no está vacío
    const products = datos;
    if (products && typeof products === 'object' && Object.keys(products).length > 0) {
      // Accede y manipula los datos de products
      Object.keys(products).forEach(key => {
        const product = products[key];
        console.log(`Producto ${key}:`, product);
      });
    } else {
      console.log('No se encontraron productos o el formato de datos es incorrecto');
    }
  } else {
    console.log('No se encontraron datos');
  }
};

// Llamar a la función para obtener y manipular datos
obtenerYManipularDatos();