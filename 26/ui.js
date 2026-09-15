// ui.js
// Satu-satunya modul yang boleh menyentuh DOM langsung.
// Menerima state + hasil algorithms, lalu merender ke elemen HTML.

import {
  searchProducts,
  filterByCategory,
  sortProducts,
  getStatistics,
  getCategoryAnalytics,
  getUniqueCategories,
} from "./algorithms.js";

// ============ HELPER: hitung produk yang siap ditampilkan ============
// Urutan penting: search -> filter kategori -> sort.
// Ini "derived data" — dihitung ulang setiap render, tidak disimpan di state.
function getVisibleProducts(state) {
  let result = state.allProducts;
  result = searchProducts(result, state.searchKeyword);
  result = filterByCategory(result, state.selectedCategory);
  result = sortProducts(result, state.sortBy);
  return result;
}

// ============ RENDER: STATUS (loading/error) ============
function renderStatus(state) {
  const el = document.getElementById("status-area");

  if (state.status === "loading") {
    el.innerHTML = `<p class="status status-loading">Memuat produk...</p>`;
    return;
  }

  if (state.status === "error") {
    el.innerHTML = `
      <div class="status status-error">
        <p>Gagal memuat produk: ${state.errorMessage}</p>
        <button id="retry-btn">Coba Lagi</button>
      </div>
    `;
    return;
  }

  el.innerHTML = "";
}

// ============ RENDER: PRODUCT LIST ============
function renderProductList(products) {
  const grid = document.getElementById("product-grid");

  if (products.length === 0) {
    grid.innerHTML = `<p class="empty">Tidak ada produk yang cocok dengan pencarian/filter ini.</p>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (p) => `
      <div class="product-card">
        <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p class="category">${p.category}</p>
        <p class="price">$${p.price}</p>
        <p class="rating">⭐ ${p.rating}</p>
        <p class="stock">${p.stock > 0 ? `Stok: ${p.stock}` : "Stok habis"}</p>
      </div>
    `
    )
    .join("");
}

// ============ RENDER: STATISTICS ============
function renderStatistics(products) {
  const stats = getStatistics(products);
  const el = document.getElementById("stats-area");

  el.innerHTML = `
    <ul class="stats-list">
      <li><strong>${stats.totalProducts}</strong><span>Total Produk</span></li>
      <li><strong>$${stats.averagePrice.toFixed(2)}</strong><span>Rata-rata Harga</span></li>
      <li><strong>$${stats.highestPrice}</strong><span>Harga Tertinggi</span></li>
      <li><strong>$${stats.lowestPrice}</strong><span>Harga Terendah</span></li>
      <li><strong>${stats.totalStock}</strong><span>Total Stok</span></li>
      <li><strong>${stats.averageRating.toFixed(2)}</strong><span>Rata-rata Rating</span></li>
    </ul>
  `;
}

// ============ RENDER: CATEGORY ANALYTICS ============
function renderCategoryAnalytics(products) {
  const analytics = getCategoryAnalytics(products); // Map
  const el = document.getElementById("category-area");

  const rows = Array.from(analytics.entries())
    .map(
      ([category, data]) => `
      <tr>
        <td>${category}</td>
        <td>${data.count}</td>
        <td>$${data.averagePrice.toFixed(2)}</td>
        <td>${data.averageRating.toFixed(2)}</td>
        <td>${data.totalStock}</td>
      </tr>
    `
    )
    .join("");

  el.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Kategori</th><th>Jumlah</th><th>Avg Harga</th><th>Avg Rating</th><th>Total Stok</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ============ RENDER: DROPDOWN KATEGORI ============
// Hanya dibuat ulang isinya kalau daftar kategori berubah (dipicu dari main.js
// setelah fetch sukses), supaya pilihan user di dropdown tidak ke-reset tiap render.
export function renderCategoryOptions(state) {
  const select = document.getElementById("category-filter");
  const categories = getUniqueCategories(state.allProducts);

  const optionsHtml = [`<option value="all">Semua Kategori</option>`]
    .concat(categories.map((c) => `<option value="${c}">${c}</option>`))
    .join("");

  select.innerHTML = optionsHtml;
  select.value = state.selectedCategory;
}

// ============ RENDER UTAMA ============
// Dipanggil setiap kali state berubah (lewat subscribe di main.js).
export function render(state) {
  renderStatus(state);

  const grid = document.getElementById("product-grid");
  const statsArea = document.getElementById("stats-area");
  const categoryArea = document.getElementById("category-area");

  if (state.status !== "success") {
    grid.innerHTML = "";
    statsArea.innerHTML = "";
    categoryArea.innerHTML = "";
    return;
  }

  const visibleProducts = getVisibleProducts(state);

  renderProductList(visibleProducts);
  renderStatistics(visibleProducts);
  renderCategoryAnalytics(visibleProducts);
}