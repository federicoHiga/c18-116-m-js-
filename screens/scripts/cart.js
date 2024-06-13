{/* <script>
  const productId = new URL(document.location.toString()).searchParams.get('productId');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsDiv = document.getElementById('cart-items-conteiner');
const cartCount = document.querySelectorAll(".cartCount");
const dataDiv = document.createElement('div');
// Variables para almacenar la selección de color y talle
let selectedColor = null;
let selectedTalle = null;

// Update cart count initially
updateCartCount(cart);

window.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

function loadCartFromLocalStorage() {
  if (cart.length > 0) {
    cartItemsDiv.innerHTML = ''; // Clear existing items
    cart.forEach((product) => {
      const cartItemHTML = generateCartItemHTML(product);
      cartItemsDiv.appendChild(cartItemHTML);
    });
  }
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity--;
      document.querySelector(`.cart-item[data-id='${productId}'] .item-quantity`).textContent = `Cantidad: ${cart[productIndex].quantity}`;
    } else {
      cart.splice(productIndex, 1);
      document.querySelector(`.cart-item[data-id='${productId}']`).remove();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
  }
}

function generateCartItemHTML(product) {
  if (product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.dataset.id = product.id;

    const removeButton = document.createElement('button');
    removeButton.classList.add('deleteButton');
    const deleteIcon = '<img src="../src/atomo/papelera.svg" alt="eliminar">';
    removeButton.innerHTML = deleteIcon;
    cartItem.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
      removeFromCart(product.id);
    });

    const image = document.createElement('img');
    image.classList.add('product-cart-img');
    image.src = product.image1;
    cartItem.appendChild(image);

    const itemName = document.createElement('span');
    itemName.classList.add('item-name');
    itemName.textContent = product.nombre;

    const itemQuantity = document.createElement('span');
    itemQuantity.textContent = `Cantidad: ${product.quantity}`;
    itemQuantity.classList.add('item-quantity');

    // const dataDiv = document.createElement('div');
    dataDiv.classList.add('data-div');
    dataDiv.appendChild(itemName);
    dataDiv.appendChild(itemQuantity);
    cartItem.appendChild(dataDiv);

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `$${product.precio}`;
    itemPrice.classList.add('item-price');
    cartItem.appendChild(itemPrice);

    return cartItem;
  }
}

function updateCartCount(cart) {
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
  if (cartCount) {
    cartCount.forEach(element => {
      element.innerHTML = totalQuantity;
    });
  } else {
    console.warn("Cart count element (cartCount) not found!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userStatus = document.getElementById("userStatus");
  const storedEmail = localStorage.getItem('userEmail');

  if (storedEmail) {
    if(storedEmail == "zenithadmin@zenith.com"){
      userStatus.innerHTML = `<a href="screens/productForm.html">Cargar producto</a>`;
    } else {
      userStatus.innerHTML = `Bienvenido: ${storedEmail}`;
    }
  } else {
    userStatus.innerHTML = `<a href="screens/login.html">Iniciar sesión</a>`;
  }

  init(() => {
    const productsArray = Object.values(products);
    const product = productsArray.find(p => p.id == productId);

    const precioDetail = document.querySelector("#precioDetail");
    const marcaDetail = document.querySelector("#marcaDetail");
    const nombreDetail = document.querySelector("#nombreDetail");
    const descripcionDetail = document.querySelector("#descripcionDetail");
    const imagenDetail = document.querySelector("#imagenDetail");
    const codigoDetail = document.querySelector("#codigoDetail");
    const img1Detail = document.querySelector("#img1Detail");
    const img2Detail = document.querySelector("#img2Detail");
    const img3Detail = document.querySelector("#img3Detail");

    marcaDetail.innerHTML = product.marca;
    precioDetail.innerHTML = "$" + product.precio;
    nombreDetail.innerHTML = "Modelo: " + product.nombre;
    codigoDetail.innerHTML = "Codigo: " + product.id;
    descripcionDetail.innerHTML = product.descripcion;
    img1Detail.src = product.image1;
    img2Detail.src = product.image2;
    img3Detail.src = product.image3;

    const colorsDiv = document.getElementById("colorsDiv");
    const colores = product.color.map(color => {
      const colorBtn = document.createElement("button");
      colorBtn.classList.add('colorProducto', 'color-' + color.toLowerCase());
      colorBtn.addEventListener("click", () => {
        selectedColor = color;
        // Resaltar el color seleccionado
        document.querySelectorAll('.colorProducto').forEach(btn => btn.classList.remove('selected-color'));
        colorBtn.classList.add('selected-color');
        
      });
      return colorBtn;
    });

    colores.forEach(function (color) {
      colorsDiv.appendChild(color);
    });

    // Talles
    const tallesDiv = document.getElementById("cajaTalles");
    const talles = product.talle.map(talle => {
      const talleDiv = document.createElement("div");
      talleDiv.classList.add('disponible', 'talla', "titulotalles");
      talleDiv.innerText = talle;

      talleDiv.addEventListener("click", () => {
        selectedTalle = talle;
        // Resaltar el talle seleccionado
        document.querySelectorAll('.talla').forEach(div => div.classList.remove('selected-talle'));
        talleDiv.classList.add('selected-talle');
      });

      return talleDiv;
    });

    talles.forEach(talle => {
      tallesDiv.appendChild(talle);
    });

    function addToCart(product) {
      if (!selectedColor || !selectedTalle) {
        alert('Por favor, seleccione un color y un talle.');
        return;
      }

      const existingProductIndex = cart.findIndex(item => item.id === product.id && item.color === selectedColor && item.talle === selectedTalle);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
      } else {
        cart.push({ ...product, quantity: 1, color: selectedColor, talle: selectedTalle });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount(cart);
      loadCartFromLocalStorage();
    }

    const addToCartButton = document.getElementById('btnAddToCart');
    addToCartButton.addEventListener('click', () => {
      addToCart(product);
    });
  });
});


</script> */}