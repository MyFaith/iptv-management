FROM node

COPY ./ /iptv
WORKDIR /iptv

RUN cd web && yarn && yarn build && cd .. \
    cd admin && yarn && yarn build && cd .. \
    cd server && yarn && cd .. \
    yarn global add pm2 \
    mkdir -p /app \
    cp -r web/dist /app/web \
    cp -r admin/dist /app/admin \
    cp -r server /app/server \
    apt update && apt install -y nginx \
    cp nginx.conf /etc/nginx/conf.d/ \
    /etc/init.d/nginx stop && /etc/init.d/nginx start

WORKDIR /app

RUN cd server && pm2 start app.js