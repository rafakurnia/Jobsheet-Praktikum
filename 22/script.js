// Data Dummy
const dummyProducts = [
  { id: 1, title: "Laptop", price: 1200, category: "laptops", stock: 5 },
  { id: 2, title: "Smartphone", price: 800, category: "phones", stock: 15 },
  { id: 3, title: "Headphones", price: 100, category: "audio", stock: 3 },
  { id: 4, title: "Gaming Laptop", price: 1500, category: "laptops", stock: 7 },
  { id: 5, title: "Tablet", price: 500, category: "tablets", stock: 10 },
  { id: 6, title: "USB-C Hub", price: 45, category: "accessories", stock: 25 }
];

// Centralized State
const state = {
  products: [], // Diisi dari API/Promise
  search: "",
  category: "all",
  sortBy: "default",
  status: "idle" // idle, loading, success, error
};

// Logika Filter & Sort
function getProcessedProducts() {
  return state.products
    .filter(p => state.category === "all" || p.category === state.category)
    .filter(p => p.title.toLowerCase().includes(state.search.toLowerCase()))
    .sort((a, b) => {
      if (state.sortBy === "price-asc") return a.price - b.price;
      if (state.sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
}

// Simulasi Request API
function fetchProductsFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isOnline = true; // Ubah ke false jika ingin tes tampilan error
      if (isOnline) resolve(dummyProducts);
      else reject("Gagal terhubung ke server!");
    }, 1500);
  });
}

// Render UI Berdasarkan State
function render() {
  const container = document.querySelector("#product-list");
  if (!container) return;

  if (state.status === "loading") {
    container.innerHTML = `<p>⏳ Memuat data produk...</p>`;
    return;
  }

  if (state.status === "error") {
    container.innerHTML = `<p style="color: red;">❌ Gagal memuat data dari server.</p>`;
    return;
  }

  const filteredProducts = getProcessedProducts();

  if (filteredProducts.length === 0) {
    container.innerHTML = `<p>Produk tidak ditemukan.</p>`;
    return;
  }

  container.innerHTML = filteredProducts.map(product => `
    <div class="product-card" style="border: 1px solid #ddd; padding: 10px; margin-bottom: 8px; border-radius: 4px;">
      <h3 style="margin: 0 0 5px 0;">${product.title}</h3>
      <p style="margin: 2px 0;">Kategori: ${product.category}</p>
      <p style="margin: 2px 0;">Harga: $${product.price}</p>
      <p style="margin: 2px 0;">Stok: ${product.stock}</p>
    </div>
  `).join("");
}

// Inisialisasi Event Listener
function setupEventListeners() {
  document.querySelector("#search-input").addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });

  document.querySelector("#category-select").addEventListener("change", (e) => {
    state.category = e.target.value;
    render();
  });

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    render();
  });
}

// Inisialisasi Utama Saat DOM Siap
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();

  // 1. Ubah status ke loading dan RENDER LANGSUNG agar teks loading muncul
  state.status = "loading";
  render();

  // 2. Jalankan simulasi API
  fetchProductsFromAPI()
    .then((data) => {
      state.products = data;
      state.status = "success";
    })
    .catch((err) => {
      console.error(err);
      state.status = "error";
    })
    .finally(() => {
      // 3. Render ulang dengan data baru
      render();
    });
});