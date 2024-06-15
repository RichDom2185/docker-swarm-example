FROM nginx:latest

COPY ./public /var/www/frontend.local
COPY ./nginx-config /etc/nginx/conf.d
