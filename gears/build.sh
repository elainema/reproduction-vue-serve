#!/bin/bash

git_home=$(readlink -f $(dirname $0))/..
cd $git_home

export NODE_HOME=/opt/tools/node-v10.15.1-linux-x64
export PATH=${NODE_HOME}/bin:$PATH

branch=`git status | grep "On branch" | cut -d' ' -f3`
if [[ -f "ym-web-newmanage.tar.gz" && "${branch}" != "master" ]]; 
	then
    echo " ym-web-newmanage.tar.gz is exist. "
    cp ym-web-newmanage.tar.gz gears/ym-web-newmanage.tar.gz
else
    echo "npm install"
    npm install
    echo "npm run build"
    npm run build
    echo "tar -czf gears/ym-web-newmanage.tar.gz output"
    pwd
    tar -czf gears/ym-web-newmanage.tar.gz output
    ls -al output/dianyi/app/yfp/newmanage/
fi