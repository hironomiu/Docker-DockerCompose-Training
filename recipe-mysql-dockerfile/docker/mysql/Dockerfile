FROM mysql:latest
ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf

ENV MYSQL_DATABASE=test
ENV MYSQL_ROOT_PASSWORD=mysql
ENV MYSQL_USER=appuser
ENV MYSQL_PASSWORD=appuser

RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y locales
RUN sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen
RUN locale-gen
RUN update-locale LANG=ja_JP.UTF-8
RUN echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc

EXPOSE 3306