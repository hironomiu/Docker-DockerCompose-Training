FROM mysql:latest
ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf
ENV MYSQL_ROOT_PASSWORD=mysql
RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y locales
RUN locale-gen ja_JP.UTF-8
RUN echo "export LANG=ja_JP.UTF-8"
EXPOSE 3306