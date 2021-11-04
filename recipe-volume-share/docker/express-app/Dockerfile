FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH
ENV SHARE_PATH=/share
RUN mkdir $SHARE_PATH

COPY package.json /express-app/
COPY index.js /express-app/

RUN npm install