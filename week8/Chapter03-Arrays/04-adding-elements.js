// Adding and removing elements from arrays
const numbers = [0, 1, 2, 3, 4, 5];

numbers[numbers.length] = 6;
numbers[numbers.length] = 7;
console.log(numbers);

numbers.push(8);
numbers.push(9, 10);
console.log(numbers);

numbers.unshift(-1);
numbers.unshift(-3, -2);
console.log(numbers);

numbers.pop();
console.log(numbers);

numbers.shift();
console.log(numbers);

numbers.splice(5, 3); // remove 3 elements starting at index 5
console.log(numbers);

numbers.splice(5, 0, 5, 6, 7); // insert without removing
console.log(numbers);

numbers.splice(5, 3, 'a', 'b', 'c'); // replace range
console.log(numbers);
