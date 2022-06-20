#!/usr/bin/env zx

import { parse } from "path";

$.verbose = false;

const branch = process.argv[3] || (await $`git branch --show-current`).stdout.trim();

if (!branch || branch === "master") {
    console.log(`Skipped commit validation on branch '${branch}'.`);
    process.exit(0);
}

const prodArtifact = "prod";
const devArtifact = "dev";
const GH_PAGES = "gh-pages";

console.log("Generating a hash of the development build...");
await $`tar --mtime="1" -C build -cf ${devArtifact} .`;
const { stdout: devHash } = await $`HASH=($(sha1sum ${devArtifact})) && echo $HASH`;

console.log("Cleaning up the development build artifacts...");
await $`rm ${devArtifact}`;

console.log(`Fetching commits available on the '${GH_PAGES}' branch...`);
await $`git fetch origin ${GH_PAGES}:${GH_PAGES}`;

console.log(`Switching to the '${GH_PAGES}' branch...`);
await $`git checkout ${GH_PAGES}`;

const { name: repo } = parse((await $`git rev-parse --show-toplevel`).stdout.trim());

console.log("Generating a hash of the production build...");
await $`(cd ../ && tar --mtime="1" -C ${repo} --exclude=build --exclude=node_modules --exclude='.[^/]*' -cf ${prodArtifact} .)`;

const { stdout: prodHash } = await $`HASH=($(sha1sum ../${prodArtifact})) && echo $HASH`;

console.log(`Switching back to branch '${branch}'...`);
await $`git checkout ${branch}`;

console.log(`Comparing build artifact hashes...`);
const isAlreadyDeployed = devHash === prodHash;

console.log(`Analyzing the commit history on branch '${branch}'...`);
const nextVersion = (await $`
    yarn release -d --branches=${branch} | 
    sed -n "s/.*The next release version is \\(.*\\)$/\\1/p"
`).stdout?.trim();

if (isAlreadyDeployed && !!nextVersion) {
    console.log("There are no source code changes to deploy, but the commit history indicates a new release.");
    process.exit(1);
}

if (!isAlreadyDeployed && !nextVersion) {
    console.log("There are source code changes to deploy, but the commit history does not indicate a new release.");
    process.exit(1);
}

if (!!nextVersion) {
    console.log(`A release (${nextVersion}) will be created when branch '${branch}' is merged to master.`);
} else {
    console.log(`A release will not be necessary when branch '${branch}' is merged to master.`);
}