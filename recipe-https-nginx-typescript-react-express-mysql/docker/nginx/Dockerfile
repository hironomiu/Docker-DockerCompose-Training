FROM nginx:latest

ENV APP_PATH=/react-app
# RUN mkdir ${APP_PATH}

ENV SSL_PATH=/etc/nginx/ssl
RUN mkdir ${SSL_PATH}}

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./cert/cert.crt /etc/nginx/ssl/cert.crt
COPY ./cert/cert.key /etc/nginx/ssl/cert.key