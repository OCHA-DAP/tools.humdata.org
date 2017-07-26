FROM unocha/alpine-base:3.6

RUN apk add --update-cache \
        nginx && \
    rm -rv /var/cache/apk/* && \
    rm -rf /var/www && \
    mkdir -p /run/nginx/

COPY assets index.html /var/www/
COPY docker/default.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80

VOLUME [/var/log/nginx /var/www]

# Volumes
# - Conf: /etc/nginx/conf.d (default.conf)
# - Cache: /var/cache/nginx
# - Logs: /var/log/nginx
# - Data: /var/www
