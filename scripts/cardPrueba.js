//get db
// async function getProducts() {
//     try {
//         const response = await fetch('http://localhost:3000/products');
//         const data = await response.json();
//         console.log("data db: ",data);
//         return data;
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         return {};
//     }
// };

// getProducts()
// const productos = [...new Set (data)]

//get firebase

const allProducts = [];

// const getFirebase = async () => {
//     try {
//       const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
//       if (!response.ok) {
//         throw new Error('Error al leer datos');
//       }
//       const data = await response.json();
//       allProducts = data;
//       console.log('data firebase: ', allProducts);
//       return allProducts;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  async function getFirebase () {
    try {
      const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
      if (!response.ok) {
        throw new Error('Error al leer datos');
      }
      const data = await response.json();
      allProducts = data;
      console.log('data firebase: ', allProducts);
      return allProducts;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const products = await getFirebase();
    console.log('Productos obtenidos:', products);
});


  
  console.log("fuera");

    console.log("dentro");
    const productId = new URL(document.location.toString()).searchParams.get('productId');
    const productsArray = Object.values(products);
    const product = productsArray.find(p => p.id == productId);

    const colorsDiv = document.getElementById("colorsDiv")
    const colores = product.color.map(color => {
      const colorBtn = document.createElement("button")
      colorBtn.classList.add('colorProducto', 'color-' + color.toLowerCase());
      colorBtn.addEventListener("click", () => {
        console.log("Button clicked:", color);
      });
      return colorBtn;
  })
  colores.forEach(function (color) {
    colorsDiv.appendChild(color);
  });
