FROM mysql:latest
ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
RUN apt-get update
RUN apt-get install locales -y
RUN sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen && locale-gen && update-locale LANG=ja_JP.UTF-8 
RUN echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc