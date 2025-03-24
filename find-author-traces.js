// find-author-traces.js

const fs = require("fs");
const path = require("path");

const TARGET_KEYWORDS = [
  "dawid",               // lowercase
  "Dawid",               // uppercase
  "dejwid",           // GitHub username
  "david@example.com",   // email
  "Dawid Paszko",          // full name
];

const IGNORED_DIRS = ['node_modules', '.git', '.next', 'build', 'out'];

function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = TARGET_KEYWORDS.filter(keyword => content.includes(keyword));
  if (matches.length > 0) {
    console.log(`🔍 Found in ${filePath}: ${matches.join(', ')}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.includes(file)) {
        walk(fullPath);
      }
    } else {
      searchInFile(fullPath);
    }
  }
}

// 🔥 Start from current folder
console.log("🧼 Scanning project for author traces...\n");
walk(process.cwd());
