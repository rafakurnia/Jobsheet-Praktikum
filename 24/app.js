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

// ====== RENDER ======
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
  }
}

// ====== JALANKAN SAAT HALAMAN DIBUKA ======
loadProducts();