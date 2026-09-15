

async function loadProducts() {
 try {
    const products = await getProducts();
    state.products = products;
    state.status = "success";
 }  catch (error) {
    state.status = "error";
    console.error(error);
 }  finally {
    render();
 }
}

const state = {
  products: [],
  status: "idle", // idle | loading | success | error
};


function render() {
  if (state.status === "success") {
    console.log("Produk:", state.products);
  } else if (state.status === "error") {
    console.log("Terjadi kesalahan saat memuat produk");
  }
}
loadProducts()