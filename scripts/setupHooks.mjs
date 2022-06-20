#!/usr/bin/env zx

$.verbose = false;

const { stdout: projectDir } = await $`git rev-parse --show-toplevel`;
const hooksPath = `${projectDir.trim()}/hooks`;

await $`git config core.hooksPath ${hooksPath}`;
console.log(`Set local hooks path to: ${hooksPath}`);