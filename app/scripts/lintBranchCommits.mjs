#!/usr/bin/env node

import execAsync from '../../hooks/utils/execAsync.mjs';

const [node, currentPath, branch] = process.argv;

if (branch === "master") {
    console.log('Skipped commit validation on master.');
    process.exit(0);
}

console.log(`Validating commit messages on branch '${branch}'...`);

const { stdout: from } = await execAsync(`git rev-list ^master "${branch}" | tail -n 1`);
const fromCommit = from.trim();

if (!fromCommit) {
    console.log('All commit messages on this branch have already been validated.');
    process.exit(0);
}

try {
    await execAsync(`npx commitlint --from ${fromCommit} --config app/commitlint.config.ts -V`);
} catch (e) {
    console.log(e.stdout);
    process.exit(1);
}

console.log('All commit messages successfully validated.');