docker-compose up --build --always-recreate-deps --force-recreate

CORS_URL='https://localhost' \
API_VERSION='v1' \
COOKIE_SECRET='12345' \
DB_USER='postgres' \
DB_PASSWORD='postgres' \
CACHE_PASSWORD='redis' \
VIRTUAL_HOST='localhost' \
LETSENCRYPT_HOST='localhost' \
docker-compose up --build --always-recreate-deps --force-recreate