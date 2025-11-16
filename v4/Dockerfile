FROM nginx:1.29.3
WORKDIR /var/www/html/website
COPY assets assets
COPY public public
COPY index.html .
COPY nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
