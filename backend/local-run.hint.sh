docker-compose up --build --always-recreate-deps --force-recreate

CORS_URL='https://test.nodejs.monster' \
API_VERSION='v1' \
COOKIE_SECRET='12345' \
DB_USER='postgres' \
DB_PASSWORD='postgres' \
CACHE_PASSWORD='redis' \
VIRTUAL_HOST='test.nodejs.monster' \
LETSENCRYPT_HOST='test.nodejs.monster' \
docker-compose up --build --always-recreate-deps --force-recreate