/**
 * A reusable interface that works with any type T.
 * T is a placeholder that will be defined when the interface is used.
 */
interface Comparable<T> {
  compareTo(b: T): number;
}

class MyObject implements Comparable<MyObject> {
  // We must define the property here for it to be used in the method
  age: number;

  constructor(age: number) {
    this.age = age;
  }

  /**
   * Implementation of the compareTo method.
   * Returns 0 if equal, 1 if greater, -1 if smaller.
   */
  compareTo(b: MyObject): number {
    if (this.age === b.age) {
      return 0;
    }
    return this.age > b.age ? 1 : -1;
  }
}

// Example usage for students:
const obj1 = new MyObject(20);
const obj2 = new MyObject(25);
console.log(obj1.compareTo(obj2)); // Expected output: -1