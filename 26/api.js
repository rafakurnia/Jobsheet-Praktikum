// api.js
// Tanggung jawab tunggal: ambil data mentah dari DummyJSON.
// Tidak ada logic UI atau transformasi data di sini.

const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(limit = 100) {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.products; // { products, total, skip, limit } -> ambil products saja
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    throw error;
  }
}