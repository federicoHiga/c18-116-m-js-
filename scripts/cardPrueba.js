async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/Productos/Hombre/');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return {};
    }
};

getProducts()
// const productos = [...new Set (data)]

