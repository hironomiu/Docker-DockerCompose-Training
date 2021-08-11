# recipe-mysql

MySQL 単体の環境構築

- PORT
  - host 3306 : guest 3306
- 作成 DB
  - test
- アカウント
  - root mysql
  - appuser appuser
- install tools
  - vim

## setup

### Dockerfile の配置

任意のディレクトリで以下のディレクトリを作成

```
mkdir -p docker/mysql
```

`docker/mysql`に[Dockerfile](./docker/mysql/Dockerfile)を作成

```
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
```

`docker/mysql`に`conf.d`ディレクトリを作成

```
mkdir conf.d
```

`conf.d`配下に[my.cnf](./docker/mysql/conf.d/my.cnf)を作成

```
[mysqld]
innodb-buffer-pool-size=128M
default-authentication-plugin=mysql_native_password
```

### images 作成

```
docker image build -t mysql:latest ./docker/mysql/
```

### container 起動(初回)

```
docker container run --name mysqld -d -p 3306:3306 mysql
```

## 接続

```
docker container exec -it mysqld bash

mysql -u root -p

mysql>
```

ローカルに mysql client がある場合

```
mysql -u root -p -h127.0.0.1

mysql>
```

## 注意

`image`削除後は適時`volume`を削除
