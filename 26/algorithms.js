// algorithms.js
// Fungsi murni (pure functions): menerima array produk, mengembalikan hasil baru.
// Tidak menyentuh DOM maupun state global sama sekali.

// ============ SEARCH (Bagian 25.3) ============

export function exactSearch(products, keyword) {
  return products.filter((p) => p.title === keyword);
}

export function partialSearch(products, keyword) {
  const lower = keyword.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(lower));
}

export function caseInsensitiveSearch(products, keyword) {
  const lower = keyword.toLowerCase();
  return products.filter((p) => p.title.toLowerCase() === lower);
}

// Search default yang dipakai UI: partial + case-insensitive sekaligus,
// karena itu perilaku yang paling wajar untuk kotak pencarian biasa.
export function searchProducts(products, keyword) {
  if (!keyword.trim()) return products;
  return partialSearch(products, keyword);
}

// ============ FILTER KATEGORI ============

// Set dipakai untuk mendapatkan daftar kategori unik tanpa duplikat.
export function getUniqueCategories(products) {
  const categorySet = new Set(products.map((p) => p.category));
  return Array.from(categorySet).sort();
}

export function filterByCategory(products, category) {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

// ============ SORTING ============

// sortBy: "price-asc" | "price-desc" | "rating" | "title"
export function sortProducts(products, sortBy) {
  // slice() dulu supaya tidak memodifikasi array asli (sort() itu mutating)
  const sorted = products.slice();

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

// ============ STATISTICS (Bagian 25.1) ============

export function getStatistics(products) {
  const total = products.length;

  if (total === 0) {
    return {
      totalProducts: 0,
      averagePrice: 0,
      highestPrice: 0,
      lowestPrice: 0,
      totalStock: 0,
      averageRating: 0,
    };
  }

  const prices = products.map((p) => p.price);
  const totalPrice = prices.reduce((sum, price) => sum + price, 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalRating = products.reduce((sum, p) => sum + p.rating, 0);

  return {
    totalProducts: total,
    averagePrice: totalPrice / total,
    highestPrice: Math.max(...prices),
    lowestPrice: Math.min(...prices),
    totalStock,
    averageRating: totalRating / total,
  };
}

// ============ CATEGORY ANALYTICS (Bagian 25.2) ============

// Map dipakai untuk mengelompokkan produk per kategori, karena kunci
// analitiknya (nama kategori) sebaiknya tetap menjaga urutan insert
// dan bisa berupa string apa pun tanpa risiko bentrok prototype object.
export function getCategoryAnalytics(products) {
  const grouped = new Map();

  for (const product of products) {
    if (!grouped.has(product.category)) {
      grouped.set(product.category, []);
    }
    grouped.get(product.category).push(product);
  }

  const analytics = new Map();

  for (const [category, items] of grouped) {
    const count = items.length;
    const totalPrice = items.reduce((sum, p) => sum + p.price, 0);
    const totalRating = items.reduce((sum, p) => sum + p.rating, 0);
    const totalStock = items.reduce((sum, p) => sum + p.stock, 0);

    analytics.set(category, {
      count,
      averagePrice: totalPrice / count,
      averageRating: totalRating / count,
      totalStock,
    });
  }

  return analytics;
}

// ============ HELPER TAMBAHAN (contoh some / every / find) ============

export function hasOutOfStock(products) {
  return products.some((p) => p.stock === 0);
}

export function isEveryProductInStock(products) {
  return products.every((p) => p.stock > 0);
}

export function findProductById(products, id) {
  return products.find((p) => p.id === id);
}