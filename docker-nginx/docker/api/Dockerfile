FROM node:latest

ENV APP_PATH=/api
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

COPY package.json /api/
COPY index.js /api/

RUN npm install