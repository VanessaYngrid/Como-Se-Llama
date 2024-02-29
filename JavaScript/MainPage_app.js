// slideshow feature
let currentSlide = 0;

  function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }


document.addEventListener('DOMContentLoaded', function () {
  // Select all accordion titles
  var accordionTitles = document.querySelectorAll('.accordion-title');

  // Add click event listener to each accordion title
  accordionTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      // Toggle the 'active' class on the clicked accordion item
      this.parentElement.classList.toggle('active');

      // Toggle the 'show' class on the corresponding accordion content
      var content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});

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

