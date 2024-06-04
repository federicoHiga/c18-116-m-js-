// Obtener productos desde el servidor
async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // En este caso data ya es el array de productos
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return []; // Devuelve un array vacío en caso de error
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

// // Función para extraer productos del JSON
// function extractProducts(data) {
//     let extractedProducts = [];
//     for (const category in data) {
//         for (const product in data[category]) {
//             extractedProducts.push(data[category][product]);
//         }
//     }
//     return extractedProducts;
// }

// Función para inicializar la carga de productos en un contenedor específico
async function init(containerId) {
    const products = await getProducts(); ;

    // Crear las tarjetas
    products.forEach((product, index) => {
        createCard(product, index, containerId);
    });
}


function redirectToPage(url) {
    window.location.href = url;
}
// Inicializar contenedores
init('card-container-1');
init('card-container-2');



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