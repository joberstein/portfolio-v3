#!/usr/bin/env zx

$.verbose = false;

const projectDir = (await $`git rev-parse --show-toplevel`).stdout.trim();
const hooksPath = `${projectDir}/hooks`;

await $`git config core.hooksPath ${hooksPath}`;
console.log(`Set local hooks path to: ${hooksPath}`);