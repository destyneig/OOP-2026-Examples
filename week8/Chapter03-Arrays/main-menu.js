const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { spawn } = require('node:child_process');

const examples = fs
  .readdirSync(__dirname)
  .filter((file) => /^\d{2}-.*\.js$/.test(file))
  .sort((a, b) => a.localeCompare(b));

function printExamples() {
  console.log('\nChapter 3 - Arrays: Main Menu');
  console.log('================================');
  examples.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  console.log('0. Exit\n');
}

function runExample(index) {
  const file = examples[index];
  if (!file) {
    console.log('Invalid selection.');
    return;
  }

  const filePath = path.join(__dirname, file);
  console.log(`\nRunning ${file}...\n`);

  const child = spawn(process.execPath, [filePath], { stdio: 'inherit' });
  child.on('exit', (code) => {
    console.log(`\nFinished ${file} (exit code ${code ?? 'unknown'}).\n`);
  });
}

if (process.argv.includes('--list')) {
  printExamples();
  process.exit(0);
}

const maybeSelection = process.argv[2];
if (maybeSelection && /^\d+$/.test(maybeSelection)) {
  const selectedIndex = Number(maybeSelection);
  if (selectedIndex === 0) {
    process.exit(0);
  }
  runExample(selectedIndex - 1);
  process.exit(0);
}

printExamples();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose an example number to run: ', (answer) => {
  const selectedIndex = Number(answer);

  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > examples.length) {
    console.log('Please enter a valid number from the menu.');
    rl.close();
    return;
  }

  if (selectedIndex === 0) {
    console.log('Goodbye!');
    rl.close();
    return;
  }

  runExample(selectedIndex - 1);
  rl.close();
});
