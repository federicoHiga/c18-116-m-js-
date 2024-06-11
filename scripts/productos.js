let filtros = {
    marca: [],
    genero: [],
    talle: [],
    color: []
};
let allProducts = []; // Almacena todos los productos
let loadedProductsCount = 0; // Cuenta los productos cargados
const productsPerLoad = 20; // Número de productos a cargar por clic

async function getProducts() {
    try {
        const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
        const data = await response.json();

        if (data) {
            allProducts = Object.values(data); // Convertir los productos en un array
            return allProducts;
        } else {
            console.error('La estructura de la respuesta no es la esperada:', data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

function handleCheckboxClick(event) {
    const checkboxId = event.target.id;
    const filterType = event.target.dataset.filterType;

    if (!filtros[filterType]) {
        console.error('Tipo de filtro no reconocido:', filterType);
        return;
    }

    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        const index = filtros[filterType].indexOf(checkboxId);
        if (index > -1) {
            filtros[filterType].splice(index, 1);
        }
    } else {
        event.target.classList.add('active');
        filtros[filterType].push(checkboxId);
    }

    console.log('Filtros seleccionados:', filtros);
    mostrarProductosFiltrados(); // Mostrar productos filtrados y ordenados después de actualizar los filtros
}

function filtro(filtros, products) {
    if (!Array.isArray(products)) {
        console.error('Productos no está definido o no es un array:', products);
        return [];
    }

    return products.filter(p => {
        const matchMarca = filtros.marca.length === 0 || (p.marca && filtros.marca.includes(p.marca));
        const matchGenero = filtros.genero.length === 0 || (Array.isArray(p.categorias) && filtros.genero.some(g => p.categorias.includes(g)));
        const matchTalle = filtros.talle.length === 0 || (Array.isArray(p.talle) && filtros.talle.some(t => p.talle.includes(parseInt(t))));
        const matchColor = filtros.color.length === 0 || (Array.isArray(p.color) && filtros.color.some(c => p.color.includes(c)));

        return matchMarca && matchGenero && matchTalle && matchColor;
    });
}


////////////////////////////CREAR CARDS
function createCard(product, index) {
    const newCard = document.createElement("div");
    const newCarousel = document.createElement("div");
    const carouselInner = document.createElement("div");
    const newCardDetail = document.createElement("div");
    const newTextTitle = document.createElement("h2");
    const newTextPrice = document.createElement("p");
    const newTextNombre = document.createElement("p");
    newCard.onclick = () => redirectToPage(`../screens/productDetail.html?productId=${product.id}`);

    newCard.classList.add("card");
    newCarousel.classList.add("carousel", "slide");
    newCarousel.id = `carouselExample${index}`;
    carouselInner.classList.add("carousel-inner");
    newCardDetail.classList.add("card-details");
    newTextTitle.classList.add("text-title");
    newTextNombre.classList.add("text-title");
    newTextPrice.classList.add("text-Body");

    [product.image1, product.image2, product.image3].forEach((imgSrc, imgIndex) => {
        const imgDiv = document.createElement("div");
        const newImage = document.createElement("img");

        imgDiv.classList.add("carousel-item");
        if (imgIndex === 0) {
            imgDiv.classList.add("active");
        }

        newImage.classList.add("d-block", "w-100");
        newImage.src = imgSrc;
        newImage.alt = product.marca;

        imgDiv.appendChild(newImage);
        carouselInner.appendChild(imgDiv);
    });
    newCarousel.appendChild(carouselInner);

    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-control-prev");
    prevButton.type = "button";
    prevButton.dataset.bsTarget = `#carouselExample${index}`;
    prevButton.dataset.bsSlide = "prev";
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.dataset.bsTarget = `#carouselExample${index}`;
    nextButton.dataset.bsSlide = "next";
    nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    `;

    prevButton.addEventListener("click", (event) => event.stopPropagation());
    nextButton.addEventListener("click", (event) => event.stopPropagation());

    newCarousel.appendChild(prevButton);
    newCarousel.appendChild(nextButton);

    newTextTitle.textContent = product.marca;  // Usar 'marca' como título
    newTextNombre.textContent = product.nombre;
    newTextPrice.textContent = `$${product.precio}`;  // Usar 'precio'

    newCard.appendChild(newCarousel);
    newCardDetail.appendChild(newTextTitle);
    newCardDetail.appendChild(newTextNombre);
    newCardDetail.appendChild(newTextPrice);
    newCard.appendChild(newCardDetail);
    
    const cardContainer = document.getElementById('card-container');
    
    cardContainer.appendChild(newCard);
}

function ordenarProductos(productos) {
    const menorMayorCheckbox = document.getElementById('menor-mayor').checked;
    const mayorMenorCheckbox = document.getElementById('mayor-menor').checked;
    
    // Desmarcar el otro checkbox si uno está marcado
    if (menorMayorCheckbox) {
        document.getElementById('mayor-menor').checked = false;
    } else if (mayorMenorCheckbox) {
        document.getElementById('menor-mayor').checked = false;
    }
    
    // Ordenar los productos según el checkbox seleccionado
    if (menorMayorCheckbox) {
        productos.sort((a, b) => parseInt(a.precio) - parseInt(b.precio));
    } else if (mayorMenorCheckbox) {
        productos.sort((a, b) => parseInt(b.precio) - parseInt(a.precio));
    }
    
    // Mostrar los productos ordenados
    mostrarProductosOrdenados(productos);
}

async function aplicarFiltros() {
    let productosFiltrados = allProducts;
    
    // Filtrar por precio
    const minimo = parseInt(document.getElementById('minimo').value, 10);
    const maximo = parseInt(document.getElementById('maximo').value, 10);
    
    if (!isNaN(minimo) && !isNaN(maximo) && minimo < maximo) {
        productosFiltrados = filtrarPrecio(productosFiltrados);
    }
    
    // Aplicar otros filtros
    productosFiltrados = filtro(filtros, productosFiltrados);
    
    return productosFiltrados;
}

async function aplicarFiltrosYMostrar() {
    let productosFiltrados = allProducts;

    // Filtrar por precio
    productosFiltrados = filtrarPrecio(productosFiltrados);

    // Aplicar otros filtros
    productosFiltrados = filtro(filtros, productosFiltrados);

    // Ordenar productos si algún checkbox de orden está marcado
    const menorMayorCheckbox = document.getElementById('menor-mayor').checked;
    const mayorMenorCheckbox = document.getElementById('mayor-menor').checked;

    if (menorMayorCheckbox || mayorMenorCheckbox) {
        ordenarProductos(productosFiltrados);
    } else {
        // Mostrar los productos filtrados sin ordenación
        mostrarProductosOrdenados(productosFiltrados);
    }

    // Actualizar el contador de resultados
    actualizarContadorDeResultados(productosFiltrados.length);
}

function mostrarProductosOrdenados(productos) {
    const productosContainer = document.getElementById('card-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior
    loadedProductsCount = 0; // Reiniciar el contador de productos cargados

    // Mostrar los primeros productosPerLoad productos
    cargarMasProductos(productos);

    actualizarContadorDeResultados(productos.length); // Actualizar el contador de resultados
}

////////MENSAJE DE CUANTOS PRODUCTOS SE CARGARON
function actualizarContadorDeResultados(cantidad) {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = ''; // Limpiar el contenido anterior

    const resultado = document.createElement("p");
    resultado.classList.add("resultadosProductos");
    resultado.textContent = `Resultados: ${cantidad}`;

    resultados.appendChild(resultado);
}
//lector de todos los checkbox
const checkboxes = document.querySelectorAll('input[type="checkbox"], .cajaColor button');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleCheckboxClick);
});
//aplicar filtros
const aplicarButton = document.getElementById('aplicar');
aplicarButton.addEventListener('click', async () => {
    await aplicarFiltrosYMostrar();
});

///////////////////BOTON DE CARGAR MAS
function cargarMasProductos(productosFiltrados) {
    const productosContainer = document.getElementById('card-container');
    const productosACargar = productosFiltrados.slice(loadedProductsCount, loadedProductsCount + productsPerLoad);

    productosACargar.forEach((producto, index) => {
        createCard(producto, loadedProductsCount + index);
    });

    loadedProductsCount += productsPerLoad;

    // Ocultar el botón "Cargar más" si no hay más productos por cargar
    if (loadedProductsCount >= productosFiltrados.length) {
        document.getElementById('load-more').style.display = 'none';
    } else {
        document.getElementById('load-more').style.display = 'block';
    }
}

const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
    const productosFiltrados = filtro(filtros, allProducts);
    cargarMasProductos(productosFiltrados);
});

/////////////////inicio pagina
async function init(onFinish) {
    const data = await getProducts();
    products = data;
    onFinish();
}
///////////////redireccion a producDetail
function redirectToPage(url) {
    window.location.href = url;
}

//////////////////////////////// Mostrar botón de "Volver arriba" después de cierto desplazamiento
window.onscroll = function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Funcionalidad del botón de "Volver arriba"
document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/////////////////////////////// color al presionar boton de filtro
document.addEventListener('DOMContentLoaded', () => {
    const hoverNegro = document.querySelector('.colorProducto-colorNegro');
    const hoverBlanco = document.querySelector('.colorProducto-colorBlanco');
    const hoverRojo = document.querySelector('.colorProducto-colorRojo');
    const hoverAzul = document.querySelector('.colorProducto-colorAzul');
    const hoverVerde = document.querySelector('.colorProducto-colorVerde');

    hoverNegro.addEventListener('click', () => {
        hoverNegro.classList.toggle('red-border');
    });

    hoverBlanco.addEventListener('click', () => {
        hoverBlanco.classList.toggle('red-border');
    });

    hoverRojo.addEventListener('click', () => {
        hoverRojo.classList.toggle('red-border');
    });

    hoverAzul.addEventListener('click', () => {
        hoverAzul.classList.toggle('red-border');
    });

    hoverVerde.addEventListener('click', () => {
        hoverVerde.classList.toggle('red-border');
    });
});

////////////////////////////////////////BUSCADOR////////////////////////
// Función de búsqueda
function buscarProductos(query) {
    query = query.toLowerCase();
    return allProducts.filter(product => 
        product.nombre.toLowerCase().includes(query) || 
        product.marca.toLowerCase().includes(query)
    );
}

// Evento de búsqueda
document.getElementById('search-bar').addEventListener('input', async function() {
    const query = this.value;
    const productosFiltrados = buscarProductos(query);
    
    const productosContainer = document.getElementById('card-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior

    productosFiltrados.forEach((producto, index) => {
        createCard(producto, index);
    });

    actualizarContadorDeResultados(productosFiltrados.length); // Actualizar el contador de resultados
    actualizarTerminoDeBusqueda(query); // Mostrar el término de búsqueda
});

// Función para obtener el valor del parámetro "query"
function obtenerParametroQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query');
}

// Función para mostrar productos filtrados por query
async function mostrarProductosFiltradosConQuery(productosFiltrados, query) {
    const productosContainer = document.getElementById('card-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior
    loadedProductsCount = 0; // Reiniciar el contador de productos cargados

    // Mostrar los primeros productosPerLoad productos
    cargarMasProductos(productosFiltrados);

    actualizarContadorDeResultados(productosFiltrados.length); // Actualizar el contador de resultados
    actualizarTerminoDeBusqueda(query); // Mostrar el término de búsqueda
    
    return productosFiltrados;
}

// Función para mostrar el término de búsqueda
function actualizarTerminoDeBusqueda(query) {
    const searchTerm = document.getElementById('search-term');
    searchTerm.textContent = `Buscando: ${query}`;
}

// Llamar a la función para obtener el valor del parámetro "query" y mostrar los productos filtrados
document.addEventListener('DOMContentLoaded', async () => {
    const products = await getProducts();
    console.log('Productos obtenidos:', products);
    
    // Obtener el valor del parámetro "query" de la URL y filtrar productos si existe
    const query = obtenerParametroQuery();
    if (query) {
        const productosFiltrados = buscarProductos(query);
        mostrarProductosFiltradosConQuery(productosFiltrados, query);
    } else {
        // Mostrar todos los productos si no hay término de búsqueda en la URL
        allProducts = products;
        mostrarProductosOrdenados(allProducts); // Mostrar todos los productos ordenados inicialmente
    }
});

/////////////////////////filtro de precios que puede ingresar el usuario a gusto en los filtros
function filtrarPrecio(productos) {
    // Verificar si 'productos' está definido y es un array
    if (!Array.isArray(productos)) {
        console.error('precio no definido:', productos);
        return [];
    }
    let minimo = parseInt(document.getElementById('minimo').value, 10);
    let maximo = parseInt(document.getElementById('maximo').value, 10);

    // Asignar valores predeterminados si los inputs están vacíos o no son números
    if (isNaN(minimo)) minimo = parseInt(1);
    if (isNaN(maximo)) maximo = parseInt(9999999);

    if (minimo >= maximo) {
        alert("El precio mínimo no puede ser igual o más alto que el precio máximo");
        return productos; // Devolver la lista original sin filtrar
    }
    if(minimo < 0 || maximo < 0){
        alert("El precio no puede ser negativo");
        minimo = parseInt(1);
        maximo = parseInt(9999999);
    }
    return productos.filter(producto => producto.precio >= minimo && producto.precio <= maximo);
}
// Llamada a init
init(() => {
    console.log('Todos los productos han sido cargados y mostrados.');
});
