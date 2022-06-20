#!/usr/bin/env node

import execAsync from '../utils/execAsync.mjs';

const { stdout: projectDir } = await execAsync('git rev-parse --show-toplevel');
const hooksPath = `${projectDir.trim()}/hooks`;

await execAsync(`git config core.hooksPath ${hooksPath}`);
console.log(`Set local hooks path to: ${hooksPath}`);