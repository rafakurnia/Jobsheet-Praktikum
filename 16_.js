// Buat array berisi angka 1 sampai 10.000 secara terurut
const dataArray = Array.from({ length: 10000 }, (_, i) => i + 1);
const target = 10000; // Angka paling ujung (kasus tersulit)

// 1. Linear Search (O(n))
function countLinear(arr, target) {
  let steps = 0;
  for (let i = 0; i < arr.length; i++) {
    steps++;
    if (arr[i] === target) break;
  }
  return steps;
}

// 2. Binary Search (O(log n))
function countBinary(arr, target) {
  let steps = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) break;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return steps;
}

console.log("Langkah Linear Search:", countLinear(dataArray, target)); // Output: 10000
console.log("Langkah Binary Search:", countBinary(dataArray, target)); // Output: 14



// Buat data simulasi 1.000 produk
const dummyProducts = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  category: `Category-${i % 5}` // Ada 5 kategori berulang
}));

// --- CARA 1: Nested Loop (O(n²)) ---
let stepsSlow = 0;
for (let i = 0; i < dummyProducts.length; i++) {
  for (let j = 0; j < dummyProducts.length; j++) {
    stepsSlow++; // Menghitung setiap perbandingan
    if (i !== j && dummyProducts[i].category === dummyProducts[j].category) {
      // Pasangan ditemukan
    }
  }
}

// --- CARA 2: Grouping Objek/Map (O(n)) ---
let stepsFast = 0;
const grouped = {};
for (let i = 0; i < dummyProducts.length; i++) {
  stepsFast++; // Cukup dibaca 1x per produk
  const cat = dummyProducts[i].category;
  if (!grouped[cat]) grouped[cat] = [];
  grouped[cat].push(dummyProducts[i]);
}

console.log("Langkah Nested Loop O(n²):", stepsSlow); // Output: 1.000.000
console.log("Langkah Grouping Map O(n):", stepsFast);   // Output: 1.000