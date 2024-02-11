#!/bin/bash
cd /home/ubuntu/skillbook
sudo chown -R ubuntu:ubuntu /home/ubuntu/skillbook
/usr/local/bin/aws s3 cp s3://skillac-configuration-files/env-stage /home/ubuntu/skillbook/.env >> /home/ubuntu/logs/aws-copy-log
/usr/bin/npm i --force >> /home/ubuntu/logs/nodemodules.log
/usr/bin/npm run build >> /home/ubuntu/logs/build.log
/usr/bin/pm2 reload skillc-frontend >> /home/ubuntu/logs/pm2.log
