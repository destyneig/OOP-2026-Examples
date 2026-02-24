# CIST 0265: Data Structures & Algorithms
## Chapter 1: JavaScript & TypeScript Fundamentals

Welcome to the starter repository for Chapter 1. This project is designed to bridge the gap between basic scripting and software engineering. We use **JavaScript** for its ubiquity and **TypeScript** to enforce the structural integrity required for complex data structures.

---

## 🛠️ Environment Setup

Before starting, ensure you have **Node.js** installed. Then, initialize the project dependencies:

```bash
# Install TypeScript and execution tools
npm install
```

---

## 🚀 Running the Code

The project is organized into layers. You can run any specific lesson directly from the terminal using the following commands:

### **JavaScript Basics**
* `npm run js:01` - Variables and Data Types
* `npm run js:02` - Operators and Expressions
* `npm run js:03` - Truthy and Falsy Logic
* `npm run js:04` - Control Structures (Loops/Conditionals)
* `npm run js:05` - Functions
* `npm run js:06` - Object-Oriented JS (ES6 Classes)

### **TypeScript & Type Safety**
* `npm run ts:01` - Static Typing Basics
* `npm run ts:02` - Interfaces and Structural Typing
* `npm run ts:03` - Generics and Reusable Components

---

## 🐞 Debugging Like an Engineer

To truly understand how data moves through an algorithm, you should use the **Debugger** rather than just `console.log`.

1. **Set a Breakpoint:** Open any file (e.g., `03-generics.ts`) and click in the margin to the left of the line numbers. A **red dot** will appear.
2. **Launch:** Press **F5** on your keyboard.
3. **Inspect:** The execution will pause at your red dot. Look at the **Variables** pane on the left to see the `age`, `title`, or `object` state change in real-time.

---

## 📂 Project Structure

Following the "Folders reflect architecture" principle:

```text
/
├── src/
│   ├── 01-javascript/   # Dynamic, runtime-evaluated logic
│   └── 02-typescript/   # Type-safe, compiled structures
├── .vscode/             # Debugger configurations (launch.json)
├── package.json         # Project metadata and scripts
└── tsconfig.json        # TypeScript compiler settings