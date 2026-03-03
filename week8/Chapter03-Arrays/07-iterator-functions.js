// Iterator functions used with arrays
const numbers = [1, 2, 3, 4, 5];

const isEven = (x) => x % 2 === 0;

console.log(numbers.every(isEven));
console.log(numbers.some(isEven));
console.log(numbers.forEach((x) => console.log(x)));
console.log(numbers.map(isEven));
console.log(numbers.filter(isEven));
console.log(numbers.reduce((prev, cur) => prev + cur));
