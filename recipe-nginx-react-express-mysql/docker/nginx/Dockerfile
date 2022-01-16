FROM nginx:latest

ENV APP_PATH=/react-app
RUN mkdir ${APP_PATH}

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf