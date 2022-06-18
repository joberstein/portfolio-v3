#!/usr/bin/env node

import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

const getDirectoryResult = await execAsync('git rev-parse --show-toplevel');
const projectDir = getDirectoryResult.stdout.trim();
const hooksPath = `${projectDir}/hooks`;

await execAsync(`git config core.hooksPath ${hooksPath}`);
console.log(`Set local hooks path to: ${hooksPath}`);