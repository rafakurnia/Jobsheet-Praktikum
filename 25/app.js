// ====== STATE ======
const state = {
  products: [],
  status: "idle", // idle | loading | success | error
  errorMessage: "",
};

// ====== FETCH FUNCTION ======
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=30");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    throw error;
  }
}

// ====== LOAD + UPDATE STATE ======
async function loadProducts() {
  state.status = "loading";
  render();

  try {
    const products = await fetchProducts();
    state.products = products;
    state.status = "success";
  } catch (error) {
    state.status = "error";
    state.errorMessage = error.message;
  } finally {
    render();
  }
}

// ====== RENDER UTAMA ======
function render() {
  const statusArea = document.getElementById("status-area");
  const grid = document.getElementById("product-grid");

  statusArea.innerHTML = "";
  grid.innerHTML = "";

  if (state.status === "loading") {
    statusArea.innerHTML = "<p>Memuat produk...</p>";
    return;
  }

  if (state.status === "error") {
    statusArea.innerHTML = `
      <p>Gagal memuat produk: ${state.errorMessage}</p>
      <button onclick="loadProducts()">Coba Lagi</button>
    `;
    return;
  }

  if (state.status === "success") {
    grid.innerHTML = state.products.map(p => `
      <div>
        <img src="${p.thumbnail}" alt="${p.title}" width="100">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
      </div>
    `).join("");

    renderStatistics();
    renderCategoryAnalytics();
  }
}

// ====== 25.1 STATISTICS ======
function getStatistics(products) {
  const total = products.length;
  const prices = products.map(p => p.price);
  const ratings = products.map(p => p.rating);
  const stocks = products.map(p => p.stock);

  const totalPrice = prices.reduce((sum, p) => sum + p, 0);
  const totalStock = stocks.reduce((sum, s) => sum + s, 0);
  const totalRating = ratings.reduce((sum, r) => sum + r, 0);

  return {
    totalProducts: total,
    averagePrice: total ? totalPrice / total : 0,
    highestPrice: total ? Math.max(...prices) : 0,
    lowestPrice: total ? Math.min(...prices) : 0,
    totalStock: totalStock,
    averageRating: total ? totalRating / total : 0,
  };
}

function renderStatistics() {
  const stats = getStatistics(state.products);
  const el = document.getElementById("stats-area");
  el.innerHTML = `
    <ul>
      <li>Total produk: ${stats.totalProducts}</li>
      <li>Rata-rata harga: $${stats.averagePrice.toFixed(2)}</li>
      <li>Harga tertinggi: $${stats.highestPrice}</li>
      <li>Harga terendah: $${stats.lowestPrice}</li>
      <li>Total stok: ${stats.totalStock}</li>
      <li>Rata-rata rating: ${stats.averageRating.toFixed(2)}</li>
    </ul>
  `;
}

// ====== 25.2 CATEGORY ANALYTICS ======
function getCategoryAnalytics(products) {
  const grouped = {};
  for (const p of products) {
    if (!grouped[p.category]) {
      grouped[p.category] = [];
    }
    grouped[p.category].push(p);
  }

  const result = {};
  for (const category in grouped) {
    const items = grouped[category];
    const count = items.length;
    const totalPrice = items.reduce((sum, p) => sum + p.price, 0);
    const totalRating = items.reduce((sum, p) => sum + p.rating, 0);
    const totalStock = items.reduce((sum, p) => sum + p.stock, 0);

    result[category] = {
      count,
      averagePrice: totalPrice / count,
      averageRating: totalRating / count,
      totalStock,
    };
  }

  return result;
}

function renderCategoryAnalytics() {
  const analytics = getCategoryAnalytics(state.products);
  const el = document.getElementById("category-area");

  el.innerHTML = Object.entries(analytics).map(([category, data]) => `
    <div>
      <strong>${category}</strong>
      <ul>
        <li>Jumlah produk: ${data.count}</li>
        <li>Rata-rata harga: $${data.averagePrice.toFixed(2)}</li>
        <li>Rata-rata rating: ${data.averageRating.toFixed(2)}</li>
        <li>Total stok: ${data.totalStock}</li>
      </ul>
    </div>
  `).join("");
}

// ====== 25.3 SEARCH — TIGA MODE ======
function exactSearch(products, keyword) {
  return products.filter(p => p.title === keyword);
}

function partialSearch(products, keyword) {
  const lower = keyword.toLowerCase();
  return products.filter(p => p.title.toLowerCase().includes(lower));
}

function caseInsensitiveSearch(products, keyword) {
  const lower = keyword.toLowerCase();
  return products.filter(p => p.title.toLowerCase() === lower);
}

function handleSearch() {
  const keyword = document.getElementById("search-input").value.trim();
  const mode = document.getElementById("search-mode").value;
  const resultsEl = document.getElementById("search-results");

  if (!keyword) {
    resultsEl.innerHTML = "<p>Masukkan keyword dulu.</p>";
    return;
  }

  let results;
  if (mode === "exact") {
    results = exactSearch(state.products, keyword);
  } else if (mode === "caseInsensitive") {
    results = caseInsensitiveSearch(state.products, keyword);
  } else {
    results = partialSearch(state.products, keyword);
  }

  if (results.length === 0) {
    resultsEl.innerHTML = "<p>Tidak ada produk ditemukan.</p>";
    return;
  }

  resultsEl.innerHTML = `
    <p>${results.length} produk ditemukan:</p>
    <ul>
      ${results.map(p => `<li>${p.title} — $${p.price}</li>`).join("")}
    </ul>
  `;
}

// ====== JALANKAN SAAT HALAMAN DIBUKA ======
loadProducts();