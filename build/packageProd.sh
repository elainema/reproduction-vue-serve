#!/bin/bash
rm -rf ym-web-newmanage.tar.gz
vue-cli-service build
tar -zcf ym-web-newmanage.tar.gz output
rm -rf output 