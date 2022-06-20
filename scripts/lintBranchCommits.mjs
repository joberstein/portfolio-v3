#!/usr/bin/env zx

$.verbose = false;

const branch = process.argv[3] || (await $`git branch --show-current`).stdout.trim();

if (!branch || branch === "master") {
    console.log(`Skipped commit validation on branch '${branch}'.`);
    process.exit(0);
}

console.log("Fetching commits available on the master branch...");
await $`git fetch origin master:master`;

const { stdout: from } = await $`git rev-list ^master "${branch}" | tail -n 1`;
const fromCommit = from.trim();

if (!fromCommit) {
    console.log('All commit messages on this branch have already been validated.');
    process.exit(0);
}

console.log(`Validating commit messages on branch '${branch}'...\n`);

try {
    const { stdout } = await $`npx commitlint --from ${fromCommit}^ -V`;
    console.log(stdout);
} catch (e) {
    const errorMessage = e.stdout?.trim() || e;
    console.log(errorMessage);
    process.exit(1);
}

console.log('All commit messages successfully validated.');
