const cart = [
 { title: "Laptop", price: 1000, discountPercent: 10 },
 { title: "Mouse", price: 20, discountPercent: 5 },
 { title: "Keyboard", price: 50, discountPercent: 0 }
];

function applyDiscounts(cart) {
 const result = [];
 for (const item of cart) {
    const discountAmount = (item.price * item.discountPercent)/100
    const finalprice = item.price - discountAmount;
    
    
 // hitung harga akhir, push ke result
    result.push({
        ...item,
        finalprice: finalprice
    })
 }
 return result;
}


console.log(applyDiscounts(cart))