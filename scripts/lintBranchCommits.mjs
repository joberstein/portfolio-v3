#!/usr/bin/env node

import execAsync from '../utils/execAsync.mjs';

const [node, currentPath, branch] = process.argv;

if (branch === "master") {
    console.log('Skipped commit validation on master.');
    process.exit(0);
}

console.log("Fetching commits available on the master branch...");
await execAsync('git fetch origin master:master');

const { stdout: from } = await execAsync(`git rev-list ^master "${branch}" | tail -n 1`);
const fromCommit = from.trim();

if (!fromCommit) {
    console.log('All commit messages on this branch have already been validated.');
    process.exit(0);
}

console.log(`Validating commit messages on branch '${branch}'...\n`);

try {
    const { stdout } = await execAsync(`npx commitlint --from ${fromCommit}^ --config commitlint.config.ts -V`);
    console.log(stdout);
} catch (e) {
    const errorMessage = e.stdout?.trim() || e;
    console.log(errorMessage);
    process.exit(1);
}

console.log('All commit messages successfully validated.');
