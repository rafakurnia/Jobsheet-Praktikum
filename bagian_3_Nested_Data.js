const products = [
  {
    id: 1,
    title: "Laptop",
    price: 1200,
    rating: 4.5,
    stock: 10,
    category: "laptops",
    tags: ["computer", "electronics", "office"],
    dimensions: {
      width: 30,
      height: 2,
      depth: 20
    },
    reviews: [
      {
        user: "A",
        rating: 5,
        comment: "Good product"
      },
      {
        user: "B",
        rating: 4,
        comment: "Worth it"
      }
    ]
  },
  {
    id: 2,
    title: "Smartphone",
    price: 800,
    rating: 4.2,
    stock: 15,
    category: "phones",
    tags: ["mobile", "electronics"],
    dimensions: {
      width: 7,
      height: 0.8,
      depth: 15
    },
    reviews: [
      {
        user: "C",
        rating: 4,
        comment: "Nice camera"
      },
      {
        user: "D",
        rating: 5,
        comment: "Fast"
      },
      {
        user: "E",
        rating: 3,
        comment: "Battery so-so"
      }
    ]
  }
];
/*1. Ambil semua tag dari seluruh produk menjadi satu array (boleh masih berbentuk array di dalam array,
akan diratakan pada Bagian 4).*/

const alltags = products.map(products => products.tags)
console.log(alltags)
console.log("=================================================")
/* 2. Buat function findProductsByTag(products, tag) yang mengembalikan semua produk yang
memiliki tag tertentu*/
function findProductsByTag(products,tag){
  return products.filter(products => products.tags.includes(tag));
}

console.log(findProductsByTag(products,"computer"))
console.log("=================================================")


// 3. Hitung jumlah review pada setiap produk, hasilkan { id, title, totalReviews } .
const reviewCounts = products.map(product => ({
  id: product.id,
  title: product.title,
  totalReviews: product.reviews.length
}));

console.log(reviewCounts);
console.log("=================================================")


// 4. Dari seluruh produk, kumpulkan review yang ratingnya 5.
const reviewsRating5 = products
  .flatMap(product => product.reviews)
  .filter(review => review.rating === 5);

console.log(reviewsRating5);
console.log("=================================================")


// 5. Hitung rata-rata rating dari array reviews pada setiap produk (bukan dari field rating yang sudah
// tersedia, tapi dihitung ulang secara manual).
const averageRatings = products.map(product => {
  const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
  
  return {
    id: product.id,
    title: product.title,
    averageRating: Number(average.toFixed(2))
  };
});

console.log(averageRatings);
console.log("=================================================")

// 6. Temukan produk dengan jumlah review terbanyak.
const mostReviewedProduct = products.reduce((prev, current) => 
  current.reviews.length > prev.reviews.length ? current : prev
);

console.log(mostReviewedProduct);
console.log("=================================================")


// 7. Kumpulkan seluruh nilai rating dari semua review di semua produk menjadi satu array datar.
const allRatings = products.flatMap(product => 
  product.reviews.map(review => review.rating)
);

console.log(allRatings);