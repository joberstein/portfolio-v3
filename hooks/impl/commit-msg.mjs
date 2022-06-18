#!/usr/bin/env node

const path = require('path');
const { exec } = require("child_process");

const [node, currentPath, messagePath] = process.argv;
console.log(messagePath);
console.log(`Running '${path.basename(__filename)}' hook...`);
exec(`npx commitlint --edit "\${messagePath}" --config app/commitlint.config.ts`, (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
});
