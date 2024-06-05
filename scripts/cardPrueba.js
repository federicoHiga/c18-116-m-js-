//get db
async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        console.log("data db: ",data);
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return {};
    }
};

getProducts()
// const productos = [...new Set (data)]

//get firebase
const leerDatos = async () => {
    try {
      const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
      if (!response.ok) {
        throw new Error('Error al leer datos');
      }
      const data = await response.json();
      console.log('data firebase: ', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  leerDatos ()