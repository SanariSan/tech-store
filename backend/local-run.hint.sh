docker run --detach --rm -v "online-shop-backend-assets-volume:/assets_to" -v "/$(pwd)/assets:/assets_from" busybox sh -c "cp -rf /assets_from/* /assets_to"

CORS_URL='https://localhost' \
API_VERSION='v1' \
COOKIE_SECRET='12345' \
DB_USER='postgres' \
DB_PASSWORD='postgres' \
CACHE_PASSWORD='redis' \
VIRTUAL_HOST='localhost' \
LETSENCRYPT_HOST='localhost' \
docker-compose -f ./docker-compose.dev.yaml -p tech-store up --build --always-recreate-deps --force-recreate
# docker-compose -f ./docker-compose.dev.yaml -p tech-store down --remove-orphans