import type {UserConfig} from '@commitlint/types';

const scopes = [
    'about',
    'analytics',
    'ci',
    'contact',
    'config',
    'docs',
    'dependencies',
    'home',
    'hooks',
    'index',
    'navigation',
    'portfolio',
    'scripts',
    'tests',
    'utilities',
].sort();

const types = [
    'chore',
    'feat',
    'fix',
    'merge',
    'refactor',
    'revert',
    'style',
];

/**
 * Base configuration:
 * https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/index.js
 */
const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        'body-case': [2, 'always', ['sentence-case']],
        'body-full-stop': [2, 'always', '.'],
        'body-max-line-length': [0],
        'footer-max-line-length': [0],
        'header-max-length': [0],
        'scope-case': [2, 'always', ['kebab-case']],
        'scope-enum': [2, 'always', scopes],
        'subject-case': [2, 'always', ['sentence-case']],
        'subject-full-stop': [2, 'always', '.'],
        'type-enum': [2, 'always', types],
    },
};

module.exports = Configuration;