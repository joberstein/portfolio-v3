const {parse, resolve} = require("path");
const {execSync} = require("child_process");
const crypto = require('crypto');
const {readdirSync, readFileSync, lstatSync} = require("fs");

const encoding = 'utf-8';
const GH_PAGES = "gh-pages";

const getValue = (digest) => digest.digest('hex');

const hashPath = (path, digest, options = {}) => {
    const {files = [], folders = []} = options.exclude || {};
    const {base} = parse(path);
    const lstat = lstatSync(path);
    const isExcludedFolder = () => folders.some(folder => new RegExp(folder).test(base));
    const isExcludedFile = () => files.some(file => new RegExp(file).test(base));

    if (lstat.isDirectory() && !isExcludedFolder()) {
        readdirSync(path)
            .map(child => resolve(path, child))
            .forEach(child => hashPath(child, digest, options));
    } else if (lstat.isFile() && !isExcludedFile()) {
        digest.update(readFileSync(path));
    }
}

module.exports = {
    isDeployRequired: (branch) => {
        console.info("Generating a hash of the development build...");
        const devHash = crypto.createHash('sha256');

        hashPath(resolve('build'), devHash);

        console.info(`Fetching commits available on the '${GH_PAGES}' branch...`);
        execSync(`git fetch origin ${GH_PAGES}:${GH_PAGES}`);

        console.info(`Switching to the '${GH_PAGES}' branch...`);
        execSync(`git checkout ${GH_PAGES}`);

        const repoPath = execSync(`git rev-parse --show-toplevel`, { encoding });
        const { name: repo } = parse(repoPath.trim());

        console.info("Generating a hash of the production build...");
        const prodHash = crypto.createHash('sha256');

        hashPath(resolve(repo), prodHash, {
            exclude: {
                files: ['\\..*'],
                folders: ['build', 'node_modules']
            }
        });

        console.info(`Switching back to branch '${branch}'...`);
        execSync(`git checkout ${branch}`);

        console.info(`Comparing build artifact hashes...`);
        return getValue(devHash) !== getValue(prodHash);
    }
};