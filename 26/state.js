// state.js
// Menyimpan seluruh state aplikasi di satu tempat.
// UI "berlangganan" (subscribe) ke perubahan state lewat notify().

export const state = {
  // data mentah dari API, tidak pernah difilter/diurutkan di sini
  allProducts: [],

  // status siklus fetch: "idle" | "loading" | "success" | "error"
  status: "idle",
  errorMessage: "",

  // kontrol UI
  searchKeyword: "",
  selectedCategory: "all",
  sortBy: "none", // "none" | "price-asc" | "price-desc" | "rating" | "title"
};

// daftar fungsi yang akan dipanggil setiap kali state berubah
const listeners = [];

export function subscribe(listener) {
  listeners.push(listener);
}

function notify() {
  for (const listener of listeners) {
    listener(state);
  }
}

// ============ ACTIONS ============
// Semua perubahan state HARUS lewat fungsi-fungsi ini, bukan
// dimodifikasi langsung dari luar. Ini memudahkan tracking bug.

export function setLoading() {
  state.status = "loading";
  notify();
}

export function setSuccess(products) {
  state.allProducts = products;
  state.status = "success";
  notify();
}

export function setError(message) {
  state.status = "error";
  state.errorMessage = message;
  notify();
}

export function setSearchKeyword(keyword) {
  state.searchKeyword = keyword;
  notify();
}

export function setCategory(category) {
  state.selectedCategory = category;
  notify();
}

export function setSortBy(sortBy) {
  state.sortBy = sortBy;
  notify();
}