{/* <script>
  console.log("fuera");

  document.addEventListener('DOMContentLoaded', () => {
    init(() => {
      // console.log("dentro");
      const productId = new URL(document.location.toString()).searchParams.get('productId');
      const productsArray = Object.values(products);
      const product = productsArray.find(p => p.id == productId);
      // products.filter(p => p.categorias.includes("Hombre") && p.categorias.includes("Hot Sale"));
      console.log('productId: ', productId);
      // console.log(product.marca)
      const precioDetail = document.querySelector("#precioDetail");
      const marcaDetail = document.querySelector("#marcaDetail")
      const nombreDetail = document.querySelector("#nombreDetail")
      const descripcionDetail = document.querySelector("#descripcionDetail")
      const imagenDetail = document.querySelector("#imagenDetail")
      const codigoDetail = document.querySelector("#codigoDetail")
      const img1Detail = document.querySelector("#img1Detail")
      const img2Detail = document.querySelector("#img2Detail")
      const img3Detail = document.querySelector("#img3Detail")

      marcaDetail.innerHTML = product.marca
      precioDetail.innerHTML = "$" + product.precio
      nombreDetail.innerHTML = "Modelo: " + product.nombre
      codigoDetail.innerHTML = "Codigo: " + product.id
      descripcionDetail.innerHTML = product.descripcion
      img1Detail.src = product.image1
      img2Detail.src = product.image2
      img3Detail.src = product.image3

      //filtro colores
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
      // console.log('colores desde html', colores);
      //filtro colores

      //cart inicio
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItemsDiv = document.getElementById('cart-items-conteiner');
      // cartItemsDiv.dataset.productId = `[data-product-id="${productId}"]`;
      function addToCart(product) {
        function generateCartItemHTML(product, quantity) {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          // cartItem.dataset.productId = `[data-product-id="${productId}"]`;
          cartItem.dataset.id = productId
          const itemName = document.createElement('span');
          itemName.textContent = `Producto: ${product.nombre}`;
          cartItem.appendChild(itemName);

          const itemPrice = document.createElement('span');
          itemPrice.textContent = `Precio: $${product.precio}`;
          cartItem.appendChild(itemPrice);

          const itemQuantity = document.createElement('span');
          itemQuantity.textContent = `Cantidad: ${quantity}`;
          cartItem.appendChild(itemQuantity);

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Eliminar';
          cartItem.appendChild(removeButton);
          removeButton.addEventListener('click', () => {
            removeFromCart(product.id, cartItem); // Pass product ID for removal
          });

          return cartItem;
        }
        // Check if cart data exists in localStorage
        // let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Find existing product in cart (if any)
        // findIndex evalua la condition si es true return: 1 sino: -1
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        console.log("exist: ", existingProductIndex)
        const cartCount = document.querySelector("#cartCount")

        if (existingProductIndex !== -1) {
          // Product already exists, update quantity
          cart[existingProductIndex].quantity++;
          
        } else {
          // Add new product to cart with quantity 1
          cart.push({ ...product, quantity: 1 }); // Spread operator preserves product properties
        }

        // Update localStorage with updated cart data
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optional: Display confirmation message (consider using a UI library for better visuals)

        //cart counter y consollogeos
        const count = cart[existingProductIndex !== -1 ? existingProductIndex : cart.length - 1].quantity
        cartCount.innerHTML = count
        console.log(`${product.nombre} added to cart (quantity: ${cart[existingProductIndex !== -1 ? existingProductIndex : cart.length - 1].quantity})`);
        console.log('cart data: ', cart)

        const cartItemHTML = generateCartItemHTML(product, count);
        // const cartItemsDiv = document.getElementById('cart-items-conteiner');
        cartItemsDiv.appendChild(cartItemHTML);

        updateCartCount(cart.length);
      }
      console.log('cart',cart)
      const cartItemToRemove = cartItem.querySelector(`[data-product-id="${productId}"]
            `);
      function removeFromCart(productId, cartItem,) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // console.log('cart desde removeF: ',cart[i])
        const productIndex = cart.findIndex(item => item.id === productId);
       
        if (productIndex !== -1) {
          cart.splice(productIndex, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          if (cartItem) {
            // const cartItemToRemove = cartItem.querySelector(`[data-product-id="${productId}"]
            // `); // Still use data attribute for UI removal (optional)
            console.log('item a remover',cartItemToRemove)
            if (cartItemToRemove) {
              cartItemsDiv.removeChild(cartItemToRemove);
            } else {
              console.warn("Cart item element not found for removed product:", productId);
            }
          }
          updateCartCount(cart.length); // Update cart count after removal
        } else {
          console.warn("Product with ID:", productId, "not found in cart");
        }
      };


      function updateCartCount(itemCount) {
        const cartCount = document.getElementById("cartCount");
        if (cartCount) {
          cartCount.innerHTML = itemCount;
        } else {
          console.warn("Cart count element (cartCount) not found!");
        }
      }
      //call
      const addToCartButton = document.getElementById('btnAddToCart');
      addToCartButton.addEventListener('click', () => {
        addToCart(product); // Pass the product object to the function
      });
      //cart fin
    });

    const product = products.find(p => p.id == productId);
  });
  // init(() => {
  //   // console.log("dentro");
  //   const productId = new URL(document.location.toString()).searchParams.get('productId');
  //   const productsArray = Object.values(products);
  //   const product = productsArray.find(p => p.id == productId);
  //   // products.filter(p => p.categorias.includes("Hombre") && p.categorias.includes("Hot Sale"));
  //   console.log('productId: ', productId);
  //   // console.log(product.marca)
  //   const precioDetail = document.querySelector("#precioDetail");
  //   const marcaDetail = document.querySelector("#marcaDetail")
  //   const nombreDetail = document.querySelector("#nombreDetail")
  //   const descripcionDetail = document.querySelector("#descripcionDetail")
  //   const imagenDetail = document.querySelector("#imagenDetail")
  //   const codigoDetail = document.querySelector("#codigoDetail")
  //   const img1Detail = document.querySelector("#img1Detail")
  //   const img2Detail = document.querySelector("#img2Detail")
  //   const img3Detail = document.querySelector("#img3Detail")

  //   marcaDetail.innerHTML = product.marca
  //   precioDetail.innerHTML = "$" + product.precio
  //   nombreDetail.innerHTML = "Modelo: " + product.nombre
  //   codigoDetail.innerHTML = "Codigo: " + product.id
  //   descripcionDetail.innerHTML = product.descripcion
  //   img1Detail.src = product.image1
  //   img2Detail.src = product.image2
  //   img3Detail.src = product.image3

  //   //filtro colores
  //   const colorsDiv = document.getElementById("colorsDiv")
  //   const colores = product.color.map(color => {
  //     const colorBtn = document.createElement("button")
  //     colorBtn.classList.add('colorProducto', 'color-' + color.toLowerCase());
  //     colorBtn.addEventListener("click", () => {
  //       console.log("Button clicked:", color);
  //     });
  //     return colorBtn;
  //   })

  //   colores.forEach(function (color) {
  //     colorsDiv.appendChild(color);
  //   });
  //   console.log('colores desde html', colores);
  //   //filtro colores

  //   //cart inicio
  //   function addToCart(product) {
  //     function generateCartItemHTML(product, quantity) {
  //       const cartItem = document.getElementById('cart-item');
  //       // cartItem.classList.add('cart-item');

  //       const itemName = document.createElement('span');
  //       itemName.textContent = `Producto: ${product.nombre}`;
  //       cartItem.appendChild(itemName);

  //       const itemPrice = document.createElement('span');
  //       itemPrice.textContent = `Precio: $${product.precio}`;
  //       cartItem.appendChild(itemPrice);

  //       const itemQuantity = document.createElement('span');
  //       itemQuantity.textContent = `Cantidad: ${quantity}`;
  //       cartItem.appendChild(itemQuantity);

  //       const removeButton = document.createElement('button');
  //       removeButton.textContent = 'Eliminar';
  //       cartItem.appendChild(removeButton);
  //       removeButton.addEventListener('click', () => {
  //         removeFromCart(product.id); // Pass product ID for removal
  //       });

  //       return cartItem;
  //     }
  //     // Check if cart data exists in localStorage
  //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
  //     // Find existing product in cart (if any)
  //     // findIndex evalua la condition si es true return: 1 sino: -1
  //     const existingProductIndex = cart.findIndex(item => item.id === product.id);
  //     console.log("exist: ", existingProductIndex)
  //     const cartCount = document.querySelector("#cartCount")

  //     if (existingProductIndex !== -1) {
  //       // Product already exists, update quantity
  //       cart[existingProductIndex].quantity++;
  //     } else {
  //       // Add new product to cart with quantity 1
  //       cart.push({ ...product, quantity: 1 }); // Spread operator preserves product properties
  //     }

  //     // Update localStorage with updated cart data
  //     localStorage.setItem('cart', JSON.stringify(cart));

  //     // Optional: Display confirmation message (consider using a UI library for better visuals)

  //     //cart counter y consollogeos
  //     const count = cart[existingProductIndex !== -1 ? existingProductIndex : cart.length - 1].quantity
  //     cartCount.innerHTML = count
  //     console.log(`${product.nombre} added to cart (quantity: ${cart[existingProductIndex !== -1 ? existingProductIndex : cart.length - 1].quantity})`);
  //     console.log('cart data: ', cart)

  //     const cartItemHTML = generateCartItemHTML(product, count);
  //     const cartItemsDiv = document.getElementById('cart-items');
  //     cartItemsDiv.appendChild(cartItemHTML);

  //   }
  //   //call
  //   const addToCartButton = document.getElementById('btnAddToCart');
  //   addToCartButton.addEventListener('click', () => {
  //     addToCart(product); // Pass the product object to the function
  //   });
  //   //cart fin
  // });

  // const product = products.find(p => p.id == productId);



</script> */}