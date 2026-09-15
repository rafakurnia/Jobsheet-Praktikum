function countdown(n) {
 if (n <= 0) {
 console.log("Selesai");
 return;
 }
 console.log(n);
 countdown(n - 1);
}
console.log(countdown(5))

const categories = [
 {
 name: "Electronics",
 children: [
 { name: "Laptop", children: [] },
 { name: "Phone", children: [] }
 ]
 }
];


// LAtihan 15.1
function printCategories(categories, depth = 0) {
 for (const category of categories) {
 console.log(" ".repeat(depth) + category.name);
 if (category.children.length > 0) {
 printCategories(category.children, depth + 1);
 }
 }
}

printCategories(categories);
