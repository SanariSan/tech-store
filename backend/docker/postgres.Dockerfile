FROM postgres:14
COPY --chown=root:root ./db/init.sql /docker-entrypoint-initdb.d/init.sql
RUN ["chmod", "755", "/docker-entrypoint-initdb.d/init.sql"]
