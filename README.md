# Portfolio v3

Most recent iteration of my portfolio website as of 07/26/2019.

## Develop

### app - Frontend Development

Once cloned into a local repository, from the project root:

1. `cd app`
2. `yarn start` - This will start up a local instance of the application at localhost:8080

Any source code modifications made will instantly be reflected in the browser upon save.  You may need to stop and 
restart the application if any changes are made to the package dependencies to see those changes take effect.

### sendEmail - Backend Development

In order to send messages on the 'Contact' page, the application invokes 
a Java AWS Lambda function.

Once cloned into a local repository, from the project root:

1. `cd sendEmail`
2. `mvn clean install` - This will build the jar in the 'target' folder

### infrastructure - Serverless Infrastructure

This project has a serverless architecture. The infrastructure is defined as AWS CloudFormation stacks in code, and can
be synthesised in CloudFormation templates.

This module contains the following stacks: 
* sendEmailBucket: contains versions of the 'sendEmail' jar
* sendEmailRole: assigned to the 'sendEmail' lambda
* sendEmailLambda: allows the 'sendEmail' jar to be executed
* messagesApi: provides an api for invoking the 'sendEmail' lambda

Once cloned into a local repository, from the project root:

1. `cd infrastructure`
2. `npm install -g aws-cli`
3. `aws configure` - configure aws access key id, secret access key, and region locally for testing deploys
4. `npm install -g aws-cdk`
5. `cdk synth -c GOOGLE_CAPTCHA_KEY="${YOUR_CAPTCHA_KEY}" -c COMMIT_MESSAGE="${1234567 YOUR_COMMIT_MESSAGE}"` - 
   generate the CloudFormation templates in the 'cdk.out' folder

## Testing

The 'sendEmail' module features some JUnit and Mockito Unit tests for testing the Captcha verification flow and Lambda 
handler behavior.

## Deploy

This repository takes advantage of Travis CI to easily deploy to Github Pages, AWS S3, and AWS CloudFormation.  The 
travis.yml file in the project root contains the deployment configuration. 

Certain portions of the project can be deployed based on the pushed branch:
* **deploy**
    * Performs the steps for all deploys
* **deploy-sendEmail**: 
    * Creates/updates an S3 Bucket 
    * Builds a Maven jar with dependencies using the Maven Assembly plugin 
    * Upload the packaged 'sendEmail' jar to the S3 Bucket as a new version 
    * Re-deploy the project infrastructure so the Lambda function pulls the newest version of the 'sendEmail' jar
* **deploy-infrastructure**
    * Creates/updates all the AWS CloudFormation stacks
* **deploy-app**
    * Packages the app into a 'build' folder
    * Deploys to Github Pages by copying the 'build' folder over to the 'gh-pages' branch

### Notes

* Building the project consists of running the react-scripts build script, as well as copying the index page html file 
  contents to a file named `404.html`.  Github Pages will automatically use `404.html` at the project root as an 
  entrypoint when a page isn't found.
* The repository settings are configured to read from the `gh-pages` branch instead of the master branch. This allows 
  for an easily viewable and clean master branch.