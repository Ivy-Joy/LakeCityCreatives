/*This script will:Read the category from the URL.
Filter products from products.js.
Dynamically inject them into the DOM */

// URL Params:Read category from the URL parameter
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const bestseller = params.get("bestseller");

// Get product heading, container, and pagination
const productList = document.getElementById("product-list");
const categoryHeading = document.getElementById("category-heading");
const pagination = document.getElementById("pagination-controls");

const itemsPerPage = 9;
let currentPage = 1;

// Initial filtering and display products
let filteredProducts = products;

if (category) {
  filteredProducts = filteredProducts.filter(p => p.category === category);
}
 //Filter by best seller and update heading
if (bestseller === "true") {
  filteredProducts = filteredProducts.filter(p => p.bestseller);
  categoryHeading.innerText = "Best Sellers";
} else if (category) {
  categoryHeading.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Category`;
} else {
  categoryHeading.innerText = "All Products";
}

// Render page/function
function renderPage(page) {
  productList.innerHTML = ""; // Clear previous products
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProducts.slice(start, end);

  if (pageItems.length === 0) {
  productList.innerHTML = `<p style="text-align:center; font-size:18px; margin-top:20px;">No products found for this category.</p>`;
  pagination.innerHTML = "";
  return;
}


  //Render each product, and render only current page's products
  pageItems.forEach(product => {
    const productCard = `
      <div class="pro">
        <img src="${product.image}" alt="${product.name}" onclick="location.href='sproduct.html?id=${product.id}'">
        <div class="des" onclick="location.href='sproduct.html?id=${product.id}'">
          <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          <h5>${product.name}</h5>
          <div class="star">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <h4>Ksh. ${product.price}</h4>
        </div>
        <a href="sproduct.html?id=${product.id}"><i class="fa fa-shopping-cart cart"></i></a>
      </div>`;
    productList.innerHTML += productCard;
  });

  renderPaginationControls();
}

// Render pagination buttons
function renderPaginationControls() {
  pagination.innerHTML = ""; // Clear old buttons
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

   if (totalPages <= 1) return; // Don't show pagination if only 1 page

  // for (let i = 1; i <= totalPages; i++) {
  //   pagination.innerHTML += `<a href="#" class="${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</a>`;
  // }

  // Add numbered pages
  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? "active" : "";
    pagination.innerHTML += `<a href="#" class="${activeClass}" onclick="goToPage(${i})">${i}</a>`;
  }

  // Add arrow only if there's a next page
  if (currentPage < totalPages) {
    pagination.innerHTML += `<a href="#" onclick="goToPage(${currentPage + 1})"><i class="fa fa-long-arrow-right"></i></a>`;
  }
} 
// Go to a different/specific page
window.goToPage = function(page) {
  currentPage = page;
  renderPage(currentPage);
};

// Initial load/render
renderPage(currentPage);

// Optional: Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalQuantity;
}
updateCartCount();
