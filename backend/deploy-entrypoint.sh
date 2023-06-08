cp ./prod.env ./.env
docker-compose down > /dev/null 2>&1
docker run --detach --rm -v "online-shop-backend-assets-volume:/assets_to" -v "./assets:/assets_from" busybox sh -c "cp -rf /assets_from/* /assets_to"
docker run --rm -v vhost:/vhost_og busybox sh -c "{ echo 'client_max_body_size 10m;'; } > /vhost_og/${VIRTUAL_HOST}" &&
docker-compose build
docker-compose -f ./docker-compose.yaml --compatibility up --detach --always-recreate-deps --force-recreate --remove-orphans