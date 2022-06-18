import execAsync from '../utils/execAsync.mjs';
import getFileName from '../utils/getFileName.mjs';

const [node, currentPath, messagePath] = process.argv;

const { name: hook } = getFileName(import.meta.url);
console.log(`Running '${hook}' hook...`);

try {
    await execAsync(`npx commitlint --edit "\${messagePath}" --config app/commitlint.config.ts`);
} catch (e) {
    console.log(e.stdout);
    process.exit(1);
}