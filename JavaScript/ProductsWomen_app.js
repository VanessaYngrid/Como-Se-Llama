// cart feature
function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let cart = getCartFromLocalStorage();

function displayCartInModal() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Loop through the cart items and display them
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Calculate and display the total price of items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `$${totalPrice}`;

    // Show the modal
    cartModal.style.display = 'block';

    // Close the modal when the '×' (close) button is clicked
    const closeModal = document.querySelector('.close');
    closeModal.onclick = function() {
        cartModal.style.display = 'none';
    };

    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    };
}

function clearCart() {
    // Clear the cart array
    cart = [];

    // Update localStorage to reflect the cleared cart
    localStorage.removeItem('cart');
}

function purchaseCart() {
    alert("Sorry! We currently have an issue with our payment system. \n\nYour items has been saved in our system and we will review your order with you before we finalize the payment. \n\nThank you for your patience");
    
    clearCart();
}


class Product {                                             /* template for the product objects */
    constructor(id, image, name, quantity, price, material, color)
    {
        this.id=id;
        this.image=image;
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.material=material;
        this.color=color;
    }
}

class ProductItem {
    constructor(product)
    {
        this.product=product;
    }

    renderItem() {
        const prodElement = document.createElement("div");
        prodElement.className = 'product-item';
        prodElement.innerHTML = `
            <div class="card mx-lg-4 mb-2 mb-lg-5 mt-2" style="">                                            
                <img src="${this.product.image}" class="card-img-top" style="height:450px" alt="insert image here">
                <div class="card-body card-product text-center pb-3">
                    <p class="card-text">${this.product.name} \- $${this.product.price}</p>
                    <p class="card-text">${this.product.material} \- ${this.product.color}</p>
                    <button class="btn btn-success addToCartBtn" data-product-id="${this.product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        // this above section places this html-type code dynamically into the HTML without it being
        // physically present there. So if there are 15 products, it will generate 15 cards and if
        // there are 7 products, it will only generate 7 cards

        const addToCartButtons = prodElement.querySelectorAll('.addToCartBtn');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId; 
                productList.addToCart(productId);
            });
        });
    
        return prodElement;
    }
}

class ProductList {
    allProducts = [                               // array of women's products
        new Product(
            'W0001',
            '../product_photos/womean1.jpeg',
            'White Vicuña Sweater',
            5,
            100.99,
            '70% Vicuña Fiber, 30% Polyester',
            'White'
        ),
        new Product(
            'W0002',
            '../product_photos/women_alpaca.jpg',
            'Dark Blue Alpaca Sweater',
            3,
            90.99,
            '100% Alpaca Fiber',
            'Dark Blue'
        ),
        new Product(
            'W0003',
            '../product_photos/women5_alpaca.JPG',
            'Blue Alpaca Sweater',
            10,
            70.99,
            '80% Alpaca Fiber, 20% Polyester',
            'Blue'
        ),
        new Product(
            'W0004',
            '../product_photos/women_llama.jpg',
            'Green Llama Sweater',
            6,
            75.00,
            '90% Llama Fiber, 10% Polyester',
            'Green'
        ),
        new Product(
            'W0005',
            '../product_photos/trend1.JPG',
            'Beige Alpaca Sweater',
            10,
            86.99,
            '100% Alpaca Fiber',
            'Beige'
        ),
        new Product(
            'W0006',
            '../product_photos/women7.jpg',
            'Black Alpaca Sweater',
            5,
            98.00,
            '100% Alpaca',
            'Black'   
        ),
        new Product(
            'W0007',
            '../product_photos/women6_vicuna.jpg',
            'Blue Vicuña Sweater',
            6,
            75.99,
            '100% Vicuña Fiber',
            'Blue'
        ),
        new Product(
            'W0008',
            '../product_photos/women_vicuna.JPG',
            'Purple Vicuña Sweater',
            4,
            67.99,
            '80% Vicuña Fiber + 20% Polyester',
            'Purple'
        )
    ];

    constructor() {}

    addToCart(itemId) {
        const selectedItem = this.allProducts.find(product => product.id === itemId);
    
        if (selectedItem) {
            // Check if the item is already in the cart
            const existingItemIndex = cart.findIndex(product => product.id === itemId);
    
            if (existingItemIndex !== -1) {
                // If the item exists in the cart, increase its quantity
                cart[existingItemIndex].quantity++;
            } else {
                // If the item is not in the cart, add it with quantity 1
                const newItem = { ...selectedItem, quantity: 1 };
                cart.push(newItem);
            }
    
            //displayCart(); // Call a function to display the updated cart on the website
        } else {
            console.log("Item not found"); // Handle error if the item is not found
        }
        saveCartToLocalStorage();
    }

    renderList() {
        const renderElement = document.getElementById('productListing');    // looks for productListing in HTML
        const productList = document.createElement('div');
        productList.className = 'row row-cols-md-2 mt-5';

        for (const prod of this.allProducts)                // goes through each product in the above array
        {
            const productItem = new ProductItem(prod);      // passes each product through class ProductItem above
            const productElement = productItem.renderItem();    // and calls the method 
            productList.append(productElement);             // then adds the product to the productList ('ul')
        }
        renderElement.append(productList);                  // finally puts everything onto HTML through append
    }
}

const productList = new ProductList();         // fast way to instantly call the javascript once the webpage is opened
productList.renderList();

// registration modal
$(document).ready(function () {
    var users = [
      { email: "test1@gmail.com", password: "test1" },
      { email: "test2@gmail.com", password: "test2" },
      { email: "test3@gmail.com", password: "test3" },
      // Add more users as needed
    ];
  
    $("#loginButton").click(function () {
      $("#modalLoginForm").modal('show');
    });
  
    $("#registerLink").click(function () {
      $("#modalLoginForm").modal('hide');
      $("#modalRegisterForm").modal('show');
    });
  
    $("#loginButtonModal").click(function () {
      var userEmail = $("#defaultForm-email").val();
      var userPassword = $("#defaultForm-pass").val();
  
      var user = users.find(function (u) {
        return u.email === userEmail && u.password === userPassword;
      });
  
      if (user) {
        alert("Successful login!");
        $("#modalLoginForm").modal('hide');
      } else {
        alert("Invalid email or password. Please try again.");
      }
    });
  
    $("#registerButton").click(function () {
      var registerEmail = $("#registerForm-email").val();
      var registerPassword = $("#registerForm-pass").val();
      var registerAddress = $("#registerForm-address").val();
      var registerPhone = $("#registerForm-phone").val();
  
      // Validate if the email is unique before registering
      if (users.some(user => user.email === registerEmail)) {
        alert("Email already registered. Please use a different email.");
        return;
      }
  
      // Add new user to the array
      users.push({
        email: registerEmail,
        password: registerPassword,
        address: registerAddress,
        phone: registerPhone
      });
  
      alert("Registration successful! You can now log in.");
      $("#modalRegisterForm").modal('hide');
    });
  });

  // search bar
  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar');
    const productListing = document.getElementById('productListing');
    const productList = new ProductList();

    function displayProducts(products) {
        productListing.className = 'row row-cols-md-2 mt-5';
        productListing.innerHTML = '';
        products.forEach(product => {
            const productItem = new ProductItem(product);
            productListing.appendChild(productItem.renderItem());
        });
    }

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            // If the search bar is empty, display all products
            displayProducts(productList.allProducts);
        } 
        else {
            const filteredProducts = productList.allProducts.filter(product => {
                // Customize the search criteria based on your needs
                return (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.material.toLowerCase().includes(searchTerm) ||
                    product.color.toLowerCase().includes(searchTerm)
                );
            });
            displayProducts(filteredProducts);
        }
    });

    // Initial display of all products
   
    displayProducts(productList.allProducts);
});

// end search bar