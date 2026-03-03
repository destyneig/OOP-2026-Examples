/**
 * University of Pittsburgh Bradford - CIST 0265
 * Chapter 2: Big O Rules of Thumb (Comprehensive Example)
 * * This script demonstrates how we simplify algorithm analysis by
 * identifying dominant terms and dropping constants.
 */

console.log('=== Chapter 2: Big O Rules & Growth Analysis ===\n');

// ============================================================================
// The Functions to Analyze
// ============================================================================

// O(1) - Constant: Independent of n
const constantOp = <T>(items: T[]): T => items[0];

// O(n) - Linear: Grows directly with n
const linearOp = <T>(items: T[]): void => {
    for (let i = 0; i < items.length; i++) { /* O(n) logic */ }
};

// O(n^2) - Quadratic: Grows by the square of n
const quadraticOp = <T>(items: T[]): void => {
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) { /* O(n^2) logic */ }
    }
};

// ============================================================================
// Performance Comparison Table
// ============================================================================

interface GrowthData {
  n: number;
  constant: number;
  linear: number;
  quadratic: number;
}

const tableData: GrowthData[] = [
  { n: 10, constant: 1, linear: 10, quadratic: 100 },
  { n: 100, constant: 1, linear: 100, quadratic: 10000 },
  { n: 1000, constant: 1, linear: 1000, quadratic: 1000000 }
];

console.log('Growth Comparison (Number of Operations):');
console.table(tableData);

console.log('\nAnalysis of combined logic: O(1 + n + n^2)');
console.log('  • Rule: Drop non-dominant terms.');
console.log('  • Reason: At n=1,000, the n^2 term is 1,000x larger than the linear term.');
console.log('  • FINAL GRADE: O(n^2)\n');

/**
 * 🛠️ LAB INSTRUCTIONS FOR STUDENTS:
 * Run this file using the loader to bridge Node 22 and TypeScript:
 * node --loader ts-node/esm src/02-bigOnotation/ts/06-rules-example.ts
 */