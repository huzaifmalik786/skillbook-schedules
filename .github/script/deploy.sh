#! /bin/bash

# # Ensure correct version of node is installed
# if [ -z "$NODE_VER" ]; then
#   NODE_VER="--lts"
# fi

# # Ensure correct domain name is set
# if [ -z "$DOMAIN_NAME" ]; then
#   DOMAIN_NAME="_"
# fi

# # Run NVM if not runing
# # And Install NVM if not installed
# if ! command -v nvm >/dev/null; then
#   if [ ! -f "~/.nvm/nvm.sh" ]; then
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
#   fi
#   . ~/.nvm/nvm.sh
# fi

# # Install required version of node and pm2
# nvm install $NODE_VER
# nvm use $NODE_VER

# # Install pm2 if not installed
# # Else stop server and flush logs
# if ! command -v pm2 >/dev/null; then
#   npm i -g pm2
# else
#   pm2 flush
#   pm2 kill
# fi

# # Delete and set environment variables
# rm -rf node_modules
# export NODE_ENV=production
# if [ -f .env ]; then
#   export $(cat .env | xargs)
# fi

echo "Update app from Git"
git pull -f
# Install dependencies and start server
echo "Install app dependencies"
npm install --force
echo "Build your app"
npm run build
# pm2 start npm --name frontend --update-env -- run start
echo "Restart PM2"
pm2 restart ecosystem.json

# if systemctl is-active -q nginx; then
#   sudo systemctl stop nginx
# fi

