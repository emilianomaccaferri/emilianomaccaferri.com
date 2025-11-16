FROM ghcr.io/getzola/zola:v0.17.1 as zola

COPY . /build
WORKDIR /build
RUN ["zola", "build"]

FROM nginx:1.29.3

WORKDIR /var/www/html/website
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=zola /build/public .

CMD ["nginx", "-g", "daemon off;"]
