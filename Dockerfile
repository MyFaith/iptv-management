FROM alpine

COPY ./ /source
WORKDIR /source

RUN apk update && \
    apk add nodejs npm nginx && \
    mkdir -p /run/nginx && mkdir -p /app && \
    cd /source/web && npm run build && \
    cd /source/admin && npm run build && \
    cp -r /source/web/* /app && cp -r /source/admin /app && \
    cp -r /source/server /app && cp -f /source/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

VOLUME /source
VOLUME /app
EXPOSE 80

ENTRYPOINT nginx -s reload && node --experimental-modules server/app.js