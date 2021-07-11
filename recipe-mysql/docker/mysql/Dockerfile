FROM mysql:latest
ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf

ENV MYSQL_DATABASE=test
ENV MYSQL_ROOT_PASSWORD=mysql
ENV MYSQL_USER=appuser
ENV MYSQL_PASSWORD=appuser

RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN echo "export LANG=ja_JP.UTF-8"

EXPOSE 3306