# Portfolio v3

Most recent iteration of my portfolio website as of 07/26/2019.

## Develop

### Frontend Development

Once cloned into a local repository, from the project root:

1. `cd app`
2. `yarn start` - This will start up a local instance of the application at localhost:8080


Any source code modifications made will instantly be reflected in the browser upon save.  You may need to stop and restart the application if any changes are made to the package dependencies to see those changes take effect.

### Backend Development

This project takes advantage of a number of AWS technologies (API Gateway, Lambda, and Simple Email Service) in order to provide the project with a serverless backend.  As a result, this makes it difficult to test out larger changes to the 'sendEmail' module without having access to the AWS account that the lambda function is hosted on.

Once cloned into a local repository, from the project root:

1. `cd sendEmail`
2. `mvn clean install` - This will build the project in a target folder


Since the Lambda function and API Gateway are hosted on my personal AWS account, any potential contributors may want to opt for changes compatible with the existing API model (defined by the objects in the package 'joberstein.portfolio.model') and the Lambda Handler API that can be adequately unit tested.

## Testing

The 'sendEmail' module features some JUnit and Mockito Unit tests for testing the Captcha verification flow and Lambda handler behavior.

## Deploy

This repository takes advantage of Travis CI to easily deploy to Github Pages and AWS Lambda.  The travis.yml file in the project root contains the deployment configuration. 

### Overview

At a high level, the build steps are as follows for each module:

1. Install all project dependencies.
2. Build the project.
3. Deploy if both of the following conditions are true:
    a) The build is running as a result of the 'deploy' tag being pushed, and 
    b) The tag message is equal to ('app' for the app module, or 'sendEmail' for the sendEmail module).
4. The deploy process consists of:
    1. Tag the current changes with the Travis build number.
    2. Publishing the built code via the specified Travis provider.
    3. Delete the original 'deploy' tag (if exists) from the remote server.

#### Deploy Tag Script
I added the script, 'tag-for-deploy', to standardize the tagging process for deploys. It deletes the 'deploy' tag if it still exists locally, and tags the current commit with a new deploy tag based on the first argument.

#### App Module

The 'app' module creates a build folder and pushes that folder to the specified Github Pages branch.  

#### SendEmail Module

The 'sendEmail' module builds a Maven jar with dependencies using the Maven Assembly plugin and uploads the jar to the specified AWS Lambda function.  It also publishes a new version of the Lambda function with each deploy.


### Notes

* Building the project consists of running the react-scripts build script, as well as copying the index page html file contents to a file named `404.html`.  Github Pages will automatically use `404.html` at the project root as an entrypoint when a page isn't found.

* The repository settings are configured to read from the `gh-pages` branch instead of the master branch. This allows for an easily viewable and clean master branch.

* The deploy tag message may also be set to 'all', which indicates that both the 'app' and 'sendEmail' modules should be deployed in the same build.

* After pushing the deploy tag, it is good practice to delete it locally to avoid an accidental deploy on the next push.  I've included a step for deleting the 'deploy' tag locally in the 'tag-for-deploy' script to help address this shortcoming.