import execAsync from '../utils/execAsync.mjs';
import getFileName from '../utils/getFileName.mjs';

const [node, currentPath, messagePath] = process.argv;

const { name: hook } = getFileName(import.meta.url);
console.log(`Running '${hook}' hook...`);

try {
    await execAsync(`npx commitlint --edit "\${messagePath}"`);
} catch (e) {
    const errorMessage = e.stdout || e;
    console.log(errorMessage);
    process.exit(1);
}