FROM public.ecr.aws/unocha/nodejs-builder:12-alpine AS builder

WORKDIR /src

COPY . .

RUN apk add --update-cache \
    autoconf \
    automake \
    nasm \
	git \
	build-base \
    libtool \
    file \
    zlib

RUN npm install

RUN ./node_modules/.bin/gulp build --production

FROM public.ecr.aws/unocha/nginx:1.20

COPY --from=builder /src/dependency-deploy-config.txt /srv/
COPY --from=builder /src/dist /var/www/
COPY --from=builder /src/docker/common.conf /src/docker/default.conf /etc/nginx/http.d/

VOLUME /var/log/nginx

# Volumes
# - Conf: /etc/nginx/conf.d (default.conf)
# - Cache: /var/cache/nginx
# - Logs: /var/log/nginx
# - Data: /var/www
