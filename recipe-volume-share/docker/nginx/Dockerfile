FROM nginx:latest

ENV SHARE_PATH=/share
RUN mkdir $SHARE_PATH
WORKDIR $SHARE_PATH

# default.cof 書き換え
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf