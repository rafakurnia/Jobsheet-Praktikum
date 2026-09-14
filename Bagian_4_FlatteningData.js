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

// const tags = [
//  ["computer", "office"],
//  ["electronics"],
//  ["gaming", "computer"]
// ];

// // ["computer", "office", "electronics", "gaming", "computer"]
// console.log(tags.flat())

// const products = [
//  { title: "Laptop", tags: ["computer", "office"] },
//  { title: "Phone", tags: ["mobile"] }
// ];
// const allTags = products.flatMap(p => p.tags);

// console.log(allTags)


const alltags = products.flatMap(p => p.tags);
console.log(alltags)

const allcomment = products.flatMap(products => products.reviews.map(reviews=>reviews.comment))
console.log(allcomment)