const cardContainer = document.getElementById("card-container");

// Obtener productos desde el servidor
async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return {};
    }
}

// Crear tarjetas
function createCard(product, index) {
    const newCard = document.createElement("div");
    const newCarousel = document.createElement("div");
    const carouselInner = document.createElement("div");
    const newCardDetail = document.createElement("div");
    const newTextTitle = document.createElement("h2");
    const newTextPrice = document.createElement("p");
    newCard.onclick = () => redirectToPage(`../screens/productDetail.html?productId=${product.id}`);

    newCard.classList.add("card");
    newCarousel.classList.add("carousel", "slide");
    newCarousel.id = `carouselExample${index}`;
    carouselInner.classList.add("carousel-inner");
    newCardDetail.classList.add("card-details");
    newTextTitle.classList.add("text-title");
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
    newTextPrice.textContent = `$${product.precio}`;  // Usar 'precio'

    newCard.appendChild(newCarousel);
    newCardDetail.appendChild(newTextTitle);
    newCardDetail.appendChild(newTextPrice);
    newCard.appendChild(newCardDetail);

    cardContainer.appendChild(newCard);
}

// Cargar las tarjetas
let currentIndex = 0;
let products = [];


// Función para cargar más tarjetas
function loadCards() {
    for (let i = 0; i < 4 && currentIndex < products.length; i++, currentIndex++) {
        createCard(products[currentIndex], currentIndex);
    }

    if (currentIndex >= products.length) {
        loadMoreButton.style.display = 'none';
    }
}

// Inicializar la carga de productos
async function init(onFinish) {
    const data = await getProducts();
    products = data;
    onFinish();
}

const loadMoreButton = document.getElementById('load-more');
if (loadMoreButton) {
    // Agregar evento al botón para cargar más tarjetas
    loadMoreButton.addEventListener('click', loadCards);
}

function redirectToPage(url) {  
    window.location.href = url;
}
