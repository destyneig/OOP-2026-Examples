// Typed arrays
const length = 5;
const int16 = new Int16Array(length);

for (let i = 0; i < length; i++) {
  int16[i] = i + 1;
}

console.log(int16);

const uint8 = Uint8Array.from([10, 20, 30]);
console.log(uint8);
