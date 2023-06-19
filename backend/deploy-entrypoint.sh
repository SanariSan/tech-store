#!/bin/bash

cp ./prod.env ./.env;

docker-compose --compatibility down > /dev/null 2>&1;

docker run --detach --rm \
-v "online-shop-backend-assets-volume:/assets-to" \
-v "/$(pwd)/assets:/assets-from" \
busybox sh -c "cp -rf /assets-from/* /assets-to";

docker run --rm \
-v "vhost:/vhost-mounted" \
busybox sh -c "{ echo 'client_max_body_size 25m;'; } > /vhost-mounted/${VIRTUAL_HOST}";

docker-compose build;

docker-compose -f ./docker-compose.yaml --compatibility up \
--detach --always-recreate-deps --force-recreate --remove-orphans;

exit;