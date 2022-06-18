#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

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

console.log(`Running '${path.basename(__filename)}' hook...`);

exec('git branch --show-current', (err, stdout, stderr) => {
    const issue = stdout.replace("issues/", "").trim();
    const isIssueNumeric = issue && /\d+/.test(issue);
    const issueTag = `Issue ${issue}.`;

    if (isIssueNumeric && !messageContents.includes(issueTag)) {
        const newMessage = messageContents
            .concat("\n".repeat(2))
            .concat(issueTag)
            .concat(messageComments);

        fs.writeFileSync(messagePath, newMessage);
        console.log("Appended the issue number to the commit message.");
    } else {
        console.log("No commit message modifications necessary.");
    }

    // Extra newline
    console.log();
});