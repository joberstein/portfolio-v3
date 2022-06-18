import fs from 'fs';
import execAsync from '../utils/execAsync.mjs';
import getFileName from '../utils/getFileName.mjs';

const [node, currentPath, messagePath] = process.argv;

const isCommentedLine = line => line.startsWith('#');

const messageLines = fs.readFileSync(messagePath, 'utf8')
    .trim()
    .split('\n');

const messageComments = messageLines
    .filter(isCommentedLine)
    .join('\n')
    .trim();

const messageContents = messageLines
    .filter(line => !isCommentedLine(line))
    .join('\n')
    .trim();

const { name: hook } = getFileName(import.meta.url);
console.log(`Running '${hook}' hook...`);

const { stdout: branch } = await execAsync('git branch --show-current');
const issue = branch.trim().replace("issues/", "");
const isIssueNumeric = issue && /\d+/.test(issue);
const issueTag = `Issue ${issue}.`;

if (isIssueNumeric && !messageContents.includes(issueTag)) {
    const newMessage = messageContents
        .concat("\n".repeat(2))
        .concat(issueTag)
        .concat("\n".repeat(2))
        .concat(messageComments);

    fs.writeFileSync(messagePath, newMessage);
    console.log("Appended the issue number to the commit message.");
} else {
    console.log("No commit message modifications necessary.");
}

// Extra newline
console.log();