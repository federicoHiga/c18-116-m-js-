// function showAvailableColors(data){
//     const availableColors = [...new Sett(data.colors)];
//     const colorBtn = document.querySelectorAll('.colorProducto');
  
//     colorBtn.forEach(btn =>{
//       const btns = btn.classList.contains('colorNegro') ? 'Negro' :
//           btn.classList.contains('colorBlanco') ? 'Blanco' :
//           btn.classList.contains('colorRojo') ? 'Rojo' :
//           btn.classList.contains('colorAzul') ? 'Azul' : 'Verde';
  
//           if(!availableColors.includes(btns)){
//             btn.style.display = 'none';
//           }
//     });
//   }


//   fetch('http://localhost:3000/products')
//   .then(response => response.json())
//   .then(data => showAvailableColors(data));

// async function getColors() {
//     try {
//       const response = await fetch('http://localhost:3000/products');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const colorData = await response.json();
//       const coloresDisponibles = [...new Set(colorData.colores)]; // Extract unique colors
//       return coloresDisponibles;
//     } catch (error) {
//       console.error('Error fetching colors:', error);
//       return []; // Return empty array on error
//     }
//   }
  

// async function getProducts() {
//   try {
//       const response = await fetch('http://localhost:3000/products');
      
//       if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       // console.log('data desde filtro: ', data[0].color[2]); //accediendo al array objeto 0, objteo de colores y elemento 3 (rojo)
//       return data; // En este caso data ya es el array de productos
      
//   } catch (error) {
//       console.error('Error al obtener productos:', error);
//       return []; // Devuelve un array vacío en caso de error
//   }
// }

// getProducts();

// // console.log('color desde html',product.color[1]);