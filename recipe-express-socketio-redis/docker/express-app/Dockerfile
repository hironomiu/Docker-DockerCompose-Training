FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express socket.io-redis socket.io
RUN apt-get update
RUN apt-get install -y vim

COPY index.html /$APP_PATH/
COPY main.js /$APP_PATH/