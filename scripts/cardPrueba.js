
// async function fetchProducts(callback) {
//   try {
//     // Make the GET request using Fetch API
//     const response = await fetch('https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json');
//     const productsData = await response.json() ;
//     // Check if the request was successful
//     if (productsData) {
//       // Transformar el objeto en un array
//       callback(productsArray);
//       const productsArray = Object.values(productsData);
//       return productsArray;
//   } else {
//       console.error('La estructura de la respuesta no es la esperada:', productsData);
//       return [];
//   }
// } catch (error) {
//   console.error('Error al obtener productos:', error);
//   return [];
// }
// }


// fetchProducts(productsData => {
//   console.log('Products fetched:', productsData);
//   // You can now use 'productsData' within this callback
//   products = productsData; // Optionally, assign to a local variable here if needed
// });
