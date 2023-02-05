#!/bin/bash

BRANCH="gh-pages"
SOURCE="build"
VERSION=$1
TEMP_FOLDER=$(mktemp -d)

if [ -z $VERSION ];
then
    echo "Version must be specified."
    exit
fi

echo "Checking out $BRANCH..."
git checkout $BRANCH

echo "Storing files in '$SOURCE'..."
cp -r $SOURCE/* $TEMP_FOLDER

echo "Cleaning..."
git clean -df \
&& git rm -r .

echo "Restoring files in '$SOURCE'..."
cp -r $TEMP_FOLDER/* . \
&& rm -r $TEMP_FOLDER

echo "Adding files..."
git add -vA

echo "Committing files..."
git commit -vm "Deploy $VERSION"

echo "Pushing commit..."
git push origin -u $BRANCH