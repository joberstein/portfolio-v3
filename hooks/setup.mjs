#!/usr/bin/env node

const util = require('node:util');
const { exec } = require('child_process');
const execAsync = util.promisify(exec);

const { stdout: projectDir } = await execAsync('git rev-parse --show-toplevel');
const hooksPath = `${projectDir}/hooks`;

const { err } = await execAsync(`git config core.hooksPath ${hooksPath}`);
const completionMessage = err ?
    'Could not set local hooks path' :
    `Set local hooks path to: ${hooksPath}`;

console.log(completionMessage);