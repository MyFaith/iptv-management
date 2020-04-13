FROM node

COPY ./web/dist /app/web
COPY ./admin/dist /app/admin
COPY ./server /app/server
COPY ./nginx.conf /app

WORKDIR /app

RUN apt update && apt install -y nginx && \
    cp nginx.conf /etc/nginx/conf.d/default.conf && \
    yarn global add pm2

EXPOSE 80

ENTRYPOINT /etc/init.d/nginx restart && \
    pm2 start server/app.js -i 4 && top