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

3. Install [google/zx](https://github.com/google/zx) - provides utilities for running NodeJS scripts:
```
npm i -g zx
```

4. Install [yarn](https://classic.yarnpkg.com/en/docs/install) (1.17.x):
```
npm i -g yarn
```

5. Install [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks):
```
node ./scripts/setupHooks.mjs
```

6. Install project dependencies:
```
yarn install --frozen-lockfile
```

## Contributing

### Hooks

This project utilizes git hooks to enforce conventional commits, which support semantic versioning.

Supported hooks:
- **prepare-commit-msg**: Appends the issue number, if found, to the commit message.
  Retrieves the issue number from the branch when named like `issues/<number>`
- **commit-msg**: Runs the `commitlint` package against the commit message to enforce
  the conventional commit standard

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
Run commitlint to verify that all the commits on the current branch are valid:
```
yarn lint:commits
```

### Releases
Compare the current build hash to the GitHub Pages build hash, and analyze the 
commit history on the current branch:
```
export GITHUB_TOKEN=<gh-personal-access-token>
yarn release:validate
```
The release is valid if either of the following cases is true:
- The source code has changed, and the commit history indicates a release should be created
- The source code has not changed, and the commit history does not indicate a release should be created

## Build

Compile and bundle the application using webpack, and output it to the `/build` directory:
```
yarn build
```

Also copies the `public/index.html` file contents to a file named `404.html`. GitHub Pages will automatically use 
`404.html` at the project root as an entrypoint when a page isn't found.

## Deploy

This repository takes advantage of Travis CI to easily deploy to GitHub Pages. The 
travis.yml file in the project root contains the deployment configuration.

A deploy is initiated with each merge to the master branch and consists of two parts:
- Create a GitHub release
  - Analyzes the commit history since the last release to generate the next semantic version
  - Adds a release and notes (generated from the commit history) for the new version
  - Tags the release commit with the new version 
- Deploy the built application to GitHub Pages
  - Pushes the `/build` folder contents to the `gh-pages` branch

To do a dry-run for a deploy locally:
```
export GITHUB_TOKEN=<gh-personal-access-token>  
yarn release -d --branches=<current-branch>
```