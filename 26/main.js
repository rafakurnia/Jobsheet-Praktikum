// main.js
// Entry point aplikasi. Menyambungkan api.js, state.js, dan ui.js,
// serta memasang event listener untuk interaksi user.

import { fetchProducts } from "./api.js";
import {
  state,
  subscribe,
  setLoading,
  setSuccess,
  setError,
  setSearchKeyword,
  setCategory,
  setSortBy,
} from "./state.js";
import { render, renderCategoryOptions } from "./ui.js";

// setiap kali state berubah -> render ulang UI
subscribe(render);

// ============ LOAD DATA ============
async function loadProducts() {
  setLoading();

  try {
    const products = await fetchProducts(100);
    setSuccess(products);
    renderCategoryOptions(state); // isi dropdown kategori setelah data ada
  } catch (error) {
    setError(error.message);
  }
}

// ============ EVENT LISTENERS ============

// Search — pakai debounce ringan supaya tidak render di setiap ketikan huruf
let searchTimeout;
document.getElementById("search-input").addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  const value = e.target.value;
  searchTimeout = setTimeout(() => setSearchKeyword(value), 250);
});

// Filter kategori
document.getElementById("category-filter").addEventListener("change", (e) => {
  setCategory(e.target.value);
});

// Sorting
document.getElementById("sort-select").addEventListener("change", (e) => {
  setSortBy(e.target.value);
});

// Tombol retry saat error (dipasang lewat event delegation karena
// tombolnya dibuat ulang setiap kali status berubah jadi "error")
document.getElementById("status-area").addEventListener("click", (e) => {
  if (e.target.id === "retry-btn") {
    loadProducts();
  }
});

// ============ MULAI APLIKASI ============
loadProducts();