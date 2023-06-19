#!/bin/bash

cp ./prod.env ./.env;

# local vps only for cleanup purposes
# docker container rm \
# -f $(docker ps -a -q --no-trunc --filter name=^/online-shop-front-build-container$) > /dev/null 2>&1;

# local vps only for cleanup purposes
# docker run --rm \
# -v "online-shop-front-build-staging-volume:/data" \
# busybox sh -c "rm -rf /data/*";

docker build \
--build-arg "REACT_APP_API_URL=${CORS_URL}" \
--build-arg "REACT_APP_API_VERSION=${API_VERSION}" \
-t "online-shop-front-build-img" \
-f ./docker/build.Dockerfile .;

docker run --detach --rm \
--name "online-shop-front-build-container" \
-v "online-shop-front-build-volume:/home/node/proj/build" \
online-shop-front-build-img;

sleep 1;

if [ "$(docker ps -aqf "name=online-shop-front-build-container")" ]; then 
    while docker inspect online-shop-front-build-container >/dev/null 2>&1; do 
        echo "Waiting for build to finish...";
        sleep 5; 
    done;
    echo "Build completed (unknown if failed or succeeded)";

    docker run --detach --rm \
    -v "online-shop-front-build-volume:/from-inside-volume" \
    -v "$(pwd)/build-volume:/to-local-folder" busybox sh \
    -c "cp -rf /from-inside-volume/* /to-local-folder";
    echo "Pulled files from volume to local folder (./build-volume)";
fi

exit;