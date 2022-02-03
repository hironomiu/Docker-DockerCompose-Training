FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express cors pug mysql2
RUN npm install -D typescript @types/node ts-node
RUN npm install -D @types/express types/mysql2# @types/cors @types/pug
