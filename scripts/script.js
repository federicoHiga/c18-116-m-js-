// Nueva función para obtener productos desde el servidor
async function getProducts() {
    try {
        const response = await fetch("https://c-18-116-m-html-default-rtdb.firebaseio.com/products.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            // Transformar el objeto en un array
            const productsArray = Object.values(data);
            return productsArray;
        } else {
            console.error('La estructura de la respuesta no es la esperada:', data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

// Crear tarjetas
function createCard(product, index, containerId) {
    const cardContainer = document.getElementById(containerId);

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
    newCarousel.id = `carouselExample${containerId}${index}`;
    carouselInner.classList.add("carousel-inner");
    newCardDetail.classList.add("card-details");
    newTextTitle.classList.add("text-title");
    newTextNombre.classList.add("text-title");
    newTextPrice.classList.add("text-Body");

    // Añadir imágenes al carrusel
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

    // Botones para mover el carrusel
    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-control-prev");
    prevButton.type = "button";
    prevButton.dataset.bsTarget = `#carouselExample${containerId}${index}`;
    prevButton.dataset.bsSlide = "prev";
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.dataset.bsTarget = `#carouselExample${containerId}${index}`;
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
    // modifique id por nombre para que aparezcan los nombres de los productos

    newCard.appendChild(newCarousel);
    newCardDetail.appendChild(newTextTitle);
    newCardDetail.appendChild(newTextNombre);
    newCardDetail.appendChild(newTextPrice);
    newCard.appendChild(newCardDetail);

    cardContainer.appendChild(newCard);

    // Inicializar carrusel de Bootstrap
    new bootstrap.Carousel(newCarousel);
}

// Función para inicializar la carga de productos en un contenedor específico
async function init(containerId) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';  // Mostrar indicador de carga

    const products = await getProducts();

    loader.style.display = 'none';  // Ocultar indicador de carga

    // Crear las tarjetas
    products.forEach((product, index) => {
        createCard(product, index, containerId);
    });
}

function redirectToPage(url) {
    window.location.href = url;
}


// Evento de búsqueda
const searchForm = document.getElementById('search-form');
console.log(searchForm); // Verificar si el formulario se selecciona correctamente

if (searchForm) {
    const searchButton = document.getElementById('search-button');
    console.log(searchButton); // Verificar si el botón de búsqueda se selecciona correctamente

    const handleSearch = function(event) {
        console.log("Evento de búsqueda activado"); // Verificar si el evento de búsqueda se activa
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const query = document.getElementById('search-bar').value;
        // Redirigir a la página de productos y pasar la consulta de búsqueda como parámetro en la URL
        window.location.href = `screens/productos.html?query=${encodeURIComponent(query)}`;
    };

    searchButton.addEventListener('click', handleSearch);
    searchForm.addEventListener('submit', handleSearch);
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

// Inicializar contenedores
init('card-container-1');
init('card-container-2');



//usuario sesion
document.addEventListener("DOMContentLoaded", function() {
    const userStatus = document.getElementById("userStatus");
    const storedEmail = localStorage.getItem('userEmail');

  
    if (storedEmail) {
      userStatus.innerHTML = `Bienvenido: ${storedEmail}` 
    //  , <button id="logout" href="#">Cerrar sesión</button>`;
        
      if(storedEmail == "zenithadmin@zenith.com"){
        userStatus.innerHTML = `<a href="./productForm.html">Cargar producto</a>,<div ><button id="logout" onclick="cerrarSesion()">Cerrar sesion</button></div>`} 
      else{
        userStatus.innerHTML = `Bienvenido: ${storedEmail}, <br>Cerrar sesion` 
      }      
    }   


    else {
      userStatus.innerHTML = `<a href="screens/login.html">Iniciar sesión</a>`;
    }});
    const logoutButton = document.getElementById("logout");
    
    function cerrarSesion(){
      localStorage.removeItem('userEmail');
      userStatus.innerHTML = `<a href="screens/login.html">Iniciar sesión</a>`;
      logoutButton.style.display = "none";
      
    }