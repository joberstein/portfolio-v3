# Portfolio v3

The most recent iteration of my portfolio website. Started on 07/26/2019.

This application's contact form is supported by the [iac-contact-form](https://github.com/joberstein/iac-contact-form) 
repo.

## GitHub Pages
The repository settings are configured to read from the `gh-pages` branch instead of the master branch. This allows 
for comprehensible and clean master branch.

## Setup

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you do not already have node 16 and npm 8 
installed. 

2. Install node & npm:
```
nvm install lts/* --latest-npm  
nvm use lts/*
```

3. Install [yarn](https://classic.yarnpkg.com/en/docs/install) (1.17.x):
```
npm i -g yarn
```

4. Install [pre-commit](https://pre-commit.com/#install). Then, install the repo [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks):
```
pre-commit install
```

6. Install project dependencies:
```
yarn install --frozen-lockfile
```

## Contributing

### Hooks

This project's hooks are managed by [pre-commit](https://pre-commit.com).

Configured hooks:
- **giticket**: Appends `Closes #<number>` when a branch is formatted as `#\d+` (e.g. #2)
- **commitlint**: Runs the `commitlint` package against the commit message to enforce
  the conventional commit standard
- **semantic-release**: Runs the `semantic-release` package to perform a release of this repo

### Development

Once cloned into a local repository, run:
```
yarn start
```

This will start up a local instance of the application at localhost:8080

Any source code modifications made will instantly be reflected in the browser upon save.  You may need to stop and 
restart the application if any changes are made to the package dependencies to see those changes take effect.

## Testing

Run the tests in this repository:
```
yarn test
```

## Validation

### Code-Style
Run eslint to check for code-style issues:
```
yarn lint
```

### Commits
Travis runs commitlint to verify that all the commits on the current branch are valid.

Commits must conform to the conventional commit standard to trigger a deploy.
```
yarn validate:commits
```

## Build

Compile and bundle the application using webpack, and output it to the `/build` directory:
```
yarn build
```

Also copies the `public/index.html` file contents to a file named `404.html`. GitHub Pages will automatically use 
`404.html` at the project root as an entrypoint when a page isn't found.

## Deploy

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) 
to deploy a new Github version, and updated code to GitHub Pages.

A deploy initiates with each merge to the master branch if semantic-release detects 
that a new version should be deployed. Semantic-release determines this by analyzing 
the commit history.

To perform a dry-run of semantic-release on the current branch, you can add an `args` 
option to the pre-commit hook, but remember to revert your changes:

```
  - repo: https://github.com/joberstein/precommit-semantic-release
      rev: v1.0.1
      hooks:
          - id: semantic-release
            additional_dependencies:
              - "@qiwi/semantic-release-gh-pages-plugin"
            stages:
              - manual
            args:
              - -d
              - -b <current branch if not 'master'>
```

Then, run the following commands in the terminal from the project root:

```
git add .pre-commit-config.yaml
export GITHUB_TOKEN=<gh-personal-access-token>
yarn release
```