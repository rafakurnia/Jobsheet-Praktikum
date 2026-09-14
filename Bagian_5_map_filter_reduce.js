const products = [
  { id: 1, title: "Laptop", price: 1200, category: "laptops", stock: 5 },
  { id: 2, title: "Smartphone", price: 800, category: "phones", stock: 15 },
  { id: 3, title: "Headphones", price: 100, category: "audio", stock: 3 },
  { id: 4, title: "Gaming Laptop", price: 1500, category: "laptops", stock: 7 },
  { id: 5, title: "Tablet", price: 500, category: "tablets", stock: 10 },
  { id: 6, title: "Smartwatch", price: 250, category: "wearables", stock: 12 },
  { id: 7, title: "Wireless Earbuds", price: 80, category: "audio", stock: 20 },
  { id: 8, title: "Mechanical Keyboard", price: 120, category: "accessories", stock: 8 },
  { id: 9, title: "Gaming Mouse", price: 60, category: "accessories", stock: 14 },
  { id: 10, title: "Monitor", price: 300, category: "monitors", stock: 6 },
  { id: 11, title: "iPhone", price: 1100, category: "phones", stock: 9 },
  { id: 12, title: "Android Phone", price: 650, category: "phones", stock: 18 },
  { id: 13, title: "Ultrabook", price: 1300, category: "laptops", stock: 4 },
  { id: 14, title: "USB-C Hub", price: 45, category: "accessories", stock: 25 },
  { id: 15, title: "Webcam", price: 90, category: "accessories", stock: 11 },
  { id: 16, title: "Bluetooth Speaker", price: 75, category: "audio", stock: 16 },
  { id: 17, title: "Soundbar", price: 200, category: "audio", stock: 5 },
  { id: 18, title: "Smart TV", price: 900, category: "televisions", stock: 7 },
  { id: 19, title: "4K Monitor", price: 450, category: "monitors", stock: 8 },
  { id: 20, title: "Drawing Tablet", price: 180, category: "tablets", stock: 6 },
  { id: 21, title: "Fitness Tracker", price: 100, category: "wearables", stock: 13 },
  { id: 22, title: "VR Headset", price: 400, category: "gaming", stock: 4 },
  { id: 23, title: "Game Console", price: 500, category: "gaming", stock: 9 },
  { id: 24, title: "External SSD", price: 150, category: "storage", stock: 17 },
  { id: 25, title: "External HDD", price: 90, category: "storage", stock: 20 },
  { id: 26, title: "Power Bank", price: 50, category: "accessories", stock: 30 },
  { id: 27, title: "Wireless Charger", price: 40, category: "accessories", stock: 22 },
  { id: 28, title: "Printer", price: 250, category: "printers", stock: 6 },
  { id: 29, title: "Projector", price: 600, category: "projectors", stock: 3 },
  { id: 30, title: "Router", price: 120, category: "networking", stock: 15 }
];

const title = products.map(p => p.title);
const expensiveProducts = products.filter(p => p.price > 500);
const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

// latihan 5.1
const hargalaptop = products.filter(p=>p.category === "laptops").map(p=>p.price);
const avg = hargalaptop.reduce((a, b) => a + b, 0) / hargalaptop.length;
console.log(avg)

//latihan 5.2

function getStatistics(product){
  const prices = products.map(p => p.price);

  const totalProducts = products.length;
  const totalPrice = prices.reduce((sum, price) => sum + price, 0);
  const averagePrice = totalPrice / totalProducts;
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);

  return {
    totalProducts,
    averagePrice,
    highestPrice,
    lowestPrice
  };
  
}
console.log(getStatistics(products));
