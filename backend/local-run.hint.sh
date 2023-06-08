# docker-compose up --build --always-recreate-deps --force-recreate

docker run --detach --rm -v "online-shop-backend-assets-volume:/assets_to" -v "./assets:/assets_from" busybox sh -c "cp -rf /assets_from/* /assets_to"

CORS_URL='https://localhost' \
API_VERSION='v1' \
COOKIE_SECRET='12345' \
DB_USER='postgres' \
DB_PASSWORD='postgres' \
CACHE_PASSWORD='redis' \
VIRTUAL_HOST='localhost' \
LETSENCRYPT_HOST='localhost' \
docker-compose -f ./docker-compose.dev.yaml up --build --always-recreate-deps --force-recreate