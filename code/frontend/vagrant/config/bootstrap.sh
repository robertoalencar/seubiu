#!/bin/sh -e

export DEBIAN_FRONTEND=noninteractive

# Update apt-get
apt-get update
apt-get -y upgrade

# Install Curl
apt-get install -y curl

# Git
apt-get install -y git

# Install Node.js and NPM
apt-get remove -y nodejs
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Grunt
npm install -g grunt-cli

# Install supervisor
npm install -g supervisor

# Install Jasmine
npm install -g jasmine

# App dir
APP_DIR=/seubiu

cd $APP_DIR

# Install the NPM dependencies
npm install

echo ""
echo "The environment was created successfully."
