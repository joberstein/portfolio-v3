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

3. Install git hooks:
```
node ./hooks/setup.mjs
```

4. Install yarn:
```
npm install --global yarn
```

## Contributing

### Hooks

This project utilizes git hooks to enforce conventional commits, which support semantic versioning.

Supported hooks:
- **prepare-commit-msg**: Appends the issue number, if found, to the commit message.
  Retrieves the issue number from the branch when named like `issues/<number>`
- **commit-msg**: Runs the `commitlint` package against the commit message to enforce
  the conventional commit standard

The top-level files located in the `hooks` will be used as the actual git hooks once the setup script is run.

A file in the `impl` directory should share the same name as the hook it implements. This setup is advantageous because
it allows hooks to run as node scripts, and supports ECMAScript module features (i.e. top-level await).

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

Run eslint to check for code-style issues:
```
yarn lint
```

Run commitlint to verify all the commits on a branch are valid:
```
yarn lint:commits <branch>
```

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