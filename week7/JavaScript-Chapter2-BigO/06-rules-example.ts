/**
 * RULE 1: WORST CASE - We assume the 'target' is at the very end.
 * RULE 2: DROP CONSTANTS - O(2n) becomes O(n).
 * RULE 3: DROP NON-DOMINANT TERMS - O(n^2 + n) becomes O(n^2).
 */

function demonstrateBigORules(items: number[]) {
    const n = items.length;

    // SECTION A: O(1) - Constant Time
    // Accessing an index takes the same time whether n is 10 or 10,000,000.
    console.log("Middle element:", items[Math.floor(n / 2)]); 

    // SECTION B: O(n) - Linear Time
    // This loop runs 'n' times. Even if we had two separate loops, 
    // O(2n) simplifies to O(n).
    for (let i = 0; i < n; i++) {
        console.log("Checking item:", items[i]);
    }

    // SECTION C: O(n^2) - Quadratic Time
    // Nested loops mean for every 1 item, we check 'n' items.
    // If n=10, this runs 100 times. If n=1000, it runs 1,000,000 times!
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j && items[i] === items[j]) {
                console.log("Found duplicate!");
            }
        }
    }
}

/**
 * TOTAL COMPLEXITY ANALYSIS:
 * Section A: O(1)
 * Section B: O(n)
 * Section C: O(n^2)
 * * Logic: O(1 + n + n^2) 
 * Simplification: We keep only the fastest-growing (dominant) term.
 * RESULT: O(n^2)
 */