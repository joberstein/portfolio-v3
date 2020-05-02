# Portfolio v3

Most recent iteration of my portfolio website as of 07/26/2019.

## Develop

Once cloned into a local repository, from the project root:
1. `cd app`
2. `yarn start` - This will start up a local instance of the application at localhost:8080

Any source code modifications made will instantly be reflected in the browser upon save.  You may need to stop and restart the application if any changes are made to the package dependencies to see those changes take effect.

## Deploy

This repository takes advantage of Travis CI to easily deploy to Github Pages.  The travis.yml file in the project root contains the deployment configuration. At a high level, the steps are as follows:
1. Clean the yarn cache and install all project dependencies.
2. Build the project. The built project is stored in the `app/build` folder.
3. Commit everything in `app/build` to the 'gh-pages' branch.

Notes:
* Building the project consists of running the react-scripts build script, as well as copying the index page html file contents to a file named `404.html`.  Github Pages will automatically use `404.html` at the project root as an entrypoint when a page isn't found.
* The repository settings are configured to read from the `gh-pages` branch instead of the master branch. This allows for an easily viewable and clean master branch.
