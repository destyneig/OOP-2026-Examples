// Sorting arrays
const numbers = [15, 8, 7, 20, 3, 12, 1, 9];

console.log(numbers.sort()); // lexicographic

console.log(numbers.sort((a, b) => a - b)); // ascending numeric
console.log(numbers.sort((a, b) => b - a)); // descending numeric

const friends = [
  { name: 'John', age: 30 },
  { name: 'Ana', age: 20 },
  { name: 'Chris', age: 25 }
];

console.log(friends.sort((a, b) => a.age - b.age));
console.log(friends.sort((a, b) => a.name.localeCompare(b.name)));
