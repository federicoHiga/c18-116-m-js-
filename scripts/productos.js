let filtros = {
    marca: [],
    genero: [],
    talle: [],
    color: []
};
let allProducts = []; // Almacena todos los productos
let loadedProductsCount = 0; // Cuenta los productos cargados
const productsPerLoad = 6; // Número de productos a cargar por clic

// async function getProducts() {
//     try {
//         const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
//         const data = await response.json();

//         if (Array.isArray(data)) {
//             allProducts = data; // Guardar todos los productos
//             return data;
//         } else {
//             console.error('La estructura de la respuesta no es la esperada:', data);
//             return [];
//         }
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         return [];
//     }
// }

async function getProducts() {
    try {
        const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
        const data = await response.json();

        if (data) {
            allProducts = data; // Guardar todos los productos
            return data;
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

    // Verificar si el filtroType existe en el objeto filtros
    if (!filtros[filterType]) {
        console.error('Tipo de filtro no reconocido:', filterType);
        return;
    }

    // Toggle active class
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
}

// function filtro(filtros, products) {
//     if (!products || !Array.isArray(products)) {
//         console.error('Productos no está definido o no es un array:', products);
//         return [];
//     }
// return (products.filter(p => {
//     const matchMarca = filtros.marca.length === 0 || filtros.marca.includes(p.marca);
//     const matchGenero = filtros.genero.length === 0 || filtros.genero.some(g => p.categorias.includes(g));
//     const matchTalle = filtros.talle.length === 0 || filtros.talle.some(t => p.talle.includes(parseInt(t)));
//     const matchColor = filtros.color.length === 0 || filtros.color.some(c => p.color.includes(c));

//     return matchMarca && matchGenero && matchTalle && matchColor;
// }));
// }

    function filtro(filtros, products) {
        const productsArray = Object.values(products);
        if (!products) {
            console.error('Productos no está definido o no es un array:', products);
            return [];
        }

    return (productsArray.filter(p => {
        const matchMarca = filtros.marca.length === 0 || filtros.marca.includes(p.marca);
        const matchGenero = filtros.genero.length === 0 || filtros.genero.some(g => p.categorias.includes(g));
        const matchTalle = filtros.talle.length === 0 || filtros.talle.some(t => p.talle.includes(parseInt(t)));
        const matchColor = filtros.color.length === 0 || filtros.color.some(c => p.color.includes(c));

        return matchMarca && matchGenero && matchTalle && matchColor;
    }));
}

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

async function mostrarProductosFiltrados() {
    const productosFiltrados = filtro(filtros, allProducts);
    console.log('Productos filtrados:', productosFiltrados);
    const productosContainer = document.getElementById('card-container');
    productosContainer.innerHTML = ''; // Limpiar contenido anterior
    loadedProductsCount = 0; // Reiniciar el contador de productos cargados

    // Mostrar los primeros productosPerLoad productos
    cargarMasProductos(productosFiltrados);

    actualizarContadorDeResultados(productosFiltrados.length); // Actualizar el contador de resultados

    return productosFiltrados;
}

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

document.addEventListener('DOMContentLoaded', async () => {
    const products = await getProducts();
    console.log('Productos obtenidos:', products);

    // Mostrar todos los productos inicialmente
    await mostrarProductosFiltrados();
});

function actualizarContadorDeResultados(cantidad) {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = ''; // Limpiar el contenido anterior

    const resultado = document.createElement("p");
    resultado.classList.add("resultadosProductos");
    resultado.textContent = `Resultados: ${cantidad}`;

    resultados.appendChild(resultado);
}

const checkboxes = document.querySelectorAll('input[type="checkbox"], .cajaColor button');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleCheckboxClick);
});

const aplicarButton = document.getElementById('aplicar');
aplicarButton.addEventListener('click', async () => {
    await mostrarProductosFiltrados();
});


const loadMoreButton = document.getElementById('load-more');
loadMoreButton.addEventListener('click', () => {
    const productosFiltrados = filtro(filtros, allProducts);
    cargarMasProductos(productosFiltrados);
});

async function init(onFinish) {
    const data = await getProducts();
    products = data;
    onFinish();
}

function redirectToPage(url) {
    window.location.href = url;
}

// Mostrar botón de "Volver arriba" después de cierto desplazamiento
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