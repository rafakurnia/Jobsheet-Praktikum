let price = 67000
let discountPercent = 60

function calculatediscountedprice(price,discountPercent){
    return price - (price * discountPercent)/100;

}

console.log(calculatediscountedprice(price,discountPercent))