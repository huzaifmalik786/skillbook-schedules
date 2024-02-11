#!/bin/bash
# Change Directory to HOME directory
cd
set -xe
# This code will be copy and paste to EC2 instance User Data Field, Or UserData Property in Cloudformation,...

# Set environmentable to detect your project source code folder in EC2/VMware Instance
# Change project name here
PROJECT_NAME=skillbook

    echo "This script will set up your server to be listenning GitHub Action and pull code Automatically when main branch or master branch change"
    mkdir actions-runner && cd actions-runner
    curl -o actions-runner-linux-x64-2.309.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.309.0/actions-runner-linux-x64-2.309.0.tar.gz
    tar xzf ./actions-runner-linux-x64-2.309.0.tar.gz
################################# ################################################## ################################################## #####
# Warning this token and link is getting from TAB Setting -> Actions -> Runner -> Create New Runner -> Linux in your GitHub Repository
echo -ne '\n' | ./config.sh --url https://github.com/heliverse --token AHJA6J34XBM3A3ETXIQPYTTFATKZM
##################################### ################################################## ################################################## #
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
echo "Complete Setup Github Action CI/CD by GitHub Runner"