
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const categoryList = $("#categoryList");
const plantsWrapper = $("#plantsWrapper");
const loading = $("#loading");
const cartList = $("#cartList");
const cartTotal = $("#cartTotal");

let categories = [];
let activeCategoryId = "all";
let cart = [];

// Fetch categories
async function loadCategories() {
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  categories = data.categories || [];
  renderCategories();
}

// Render categories
function renderCategories() {
  categoryList.innerHTML = "";

  // All Trees
  const btnAll = document.createElement("button");
  btnAll.className = "btn btn-sm justify-start bg-white border-gray-200 hover:bg-[#166534]/10";
  btnAll.dataset.id = "all";
  btnAll.textContent = "All Trees";
  categoryList.appendChild(btnAll);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-sm justify-start bg-white border-gray-200 hover:bg-[#166534]/10";
    btn.dataset.id = cat.id;
    btn.textContent = cat.category || cat.name || "Category";
    categoryList.appendChild(btn);
  });

  // Listeners
  $$("#categoryList .btn").forEach((b) =>
    b.addEventListener("click", () => {
      activeCategoryId = b.dataset.id;
      setActiveCategoryButton();
      loadPlants(activeCategoryId);
    })
  );

  setActiveCategoryButton();
}

// Highlight active button
function setActiveCategoryButton() {
  $$("#categoryList .btn").forEach((b) =>
    b.classList.remove("bg-green-700", "text-white")
  );
  const activeBtn = $(`#categoryList .btn[data-id="${activeCategoryId}"]`);
  if (activeBtn) activeBtn.classList.add("bg-green-700", "text-white");
}

// Fetch plants
async function loadPlants(categoryId = "all") {
  plantsWrapper.innerHTML = "";
  loading.classList.remove("hidden");

  let url =
    categoryId === "all"
      ? "https://openapi.programming-hero.com/api/plants"
      : `https://openapi.programming-hero.com/api/category/${categoryId}`;

  const res = await fetch(url);
  const data = await res.json();
  const plants = data.plants || data.data || [];
  renderPlants(plants);

  loading.classList.add("hidden");
}

// Render plants
function renderPlants(plants) {
  plantsWrapper.innerHTML = plants
    .map(
      (p) => `
      <div class="bg-white rounded-2xl shadow p-3 flex flex-col">
        <div class="h-32 bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="h-full object-contain"/>
        </div>
        <h4 class="font-bold cursor-pointer text-green-800" onclick="showDetails(${p.id})">${p.name}</h4>
        <p class="text-sm text-gray-600 line-clamp-2">${p.description.slice(0,60)}...</p>
        <span class="badge badge-sm mt-1">${p.category}</span>
        <p class="font-semibold mt-1">৳${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})" class="btn btn-sm mt-2 bg-green-700 text-white hover:bg-green-800">Add to Cart</button>
      </div>`
    )
    .join("");
}

// Show modal details
async function showDetails(id) {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  const plant = data.plant;

  alert(`${plant.name}\n\n${plant.description}\nPrice: ৳${plant.price}`);
}

// Cart
function addToCart(id, name, price) {
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((i) => {
    total += i.price * i.qty;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center";
    li.innerHTML = `
      <span>${i.name} ৳${i.price} × ${i.qty}</span>
      <button onclick="removeFromCart(${i.id})" class="text-red-500">✕</button>
    `;
    cartList.appendChild(li);
  });
  cartTotal.textContent = total;
}


loadCategories();
loadPlants();
