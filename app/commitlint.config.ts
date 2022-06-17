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
   'index',
   'navigation',
   'portfolio',
   'tests',
   'utilities',
].sort();

const types =  [
  'chore',
  'feat',
  'fix',
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
    'body-full-stop': [2, 'always', '.'],
    'body-case': [2, 'always', ['sentence-case']],
    'scope-case': [2, 'always', ['kebab-case']],
    'scope-enum': [2, 'always', scopes],
    'subject-full-stop': [2, 'always', '.'],
    'subject-case': [2, 'always', ['sentence-case']],
    'type-enum': [2, 'always', types],
  },
};

module.exports = Configuration;