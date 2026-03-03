// ES2015+ helpers for arrays
const values = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(values);

const zeros = Array(5).fill(0);
console.log(zeros);

const copyWithinExample = [1, 2, 3, 4, 5];
console.log(copyWithinExample.copyWithin(0, 3));

const entries = ['a', 'b', 'c'];
for (const [index, value] of entries.entries()) {
  console.log(index, value);
}
