// Common array methods showcased in the chapter
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.toString());
console.log(numbers.join('-'));

console.log(numbers.indexOf(3));
console.log(numbers.includes(6));

console.log(numbers.concat([6, 7, 8]));
console.log(numbers.slice(1, 4));

console.log(numbers.every((n) => n > 0));
console.log(numbers.some((n) => n % 2 === 0));

console.log(numbers.map((n) => n * 2));
console.log(numbers.filter((n) => n % 2 === 1));
console.log(numbers.reduce((acc, curr) => acc + curr, 0));
