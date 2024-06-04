async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return {};
    }
}
const button = document.getElementById('btn-productos');
button.onclick = getProducts;

const cart = new Set();

cart.add(products[0]); //add
cart.add(products[1]); //add

cart.delete(products[1]);

cart.forEach(value => { //muestra los elementos del object
    console.log(value);
});

console.log(cart.has(products[0])); //booleano q confirma si existe ese elemento

console.log(cart.size); //un .lenght 

cart.clear(); //borra todo

console.log(cart.size); //para checkear si esta vacio