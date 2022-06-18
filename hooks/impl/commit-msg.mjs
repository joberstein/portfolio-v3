import execAsync from '../utils/execAsync.mjs';
import getHookName from '../utils/getFileName.mjs';

const [node, currentPath, messagePath] = process.argv;

console.log(`Running '${getHookName(import.meta.url)}' hook...`);

try {
    const { stdout: result } = await execAsync(
        `npx commitlint --edit "\${messagePath}" --config app/commitlint.config.ts`
    );

    if (result) {
        console.log(result);
    }
} catch (e) {
    console.log(e.stdout);
    process.exit(1);
}