#!/bin/sh

DOCKER_NAME=kurlymall-nx
DOCKER_PROCESS=$(docker ps -a -f name=$DOCKER_NAME -q)

if [ $DOCKER_PROCESS ]; then
  docker stop $DOCKER_PROCESS
  docker rm $DOCKER_PROCESS
fi

# 환경에 맞는 www-proxy.location 파일을 생성한다.
node $(pwd)/scripts/setup-local-nginx-config.js

docker run -d --name $DOCKER_NAME -p 80:80 -v $(pwd)/nginx:/etc/nginx/conf.d nginx:1.20.0-alpine

next dev
