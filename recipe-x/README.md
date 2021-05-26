# Docker-MySQL

## 事前準備

Docker

## すること

1. Docker で MySQL を起動し接続

## MysSQL

イメージの確認

```
$ docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
```

run(イメージを取得しコンテナの起動)

```
$ docker run --name mysqld -e MYSQL_ROOT_PASSWORD=mysql -d -p 3306:3306 mysql
```

イメージの確認

```
$ docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
mysql                       latest    c0cdc95609f1   13 days ago     556MB
```

コンテナの確認

```
$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED         STATUS                     PORTS                                                  NAMES
88f10acb0dc0   mysql                              "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes               0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysqld
```

bash モードでコンテナに接続

```
$ docker container exec -it mysqld bash
root@88f10acb0dc0:/#
```

MySQL の操作(パスワードは`mysql`)

```
root@88f10acb0dc0:/# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.25 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
mysql> exit
Bye
root@88f10acb0dc0:/#
```

コンテナから exit

```
root@88f10acb0dc0:/# exit
exit
$
```

ローカルに MySQL Client がインストールされている場合(パスワードは`mysql`)

```
$ mysql -u root -p -h127.0.0.1
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.25 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
mysql> exit
Bye
$
```

## 基本操作

確認

```
$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED         STATUS                     PORTS                                                  NAMES
88f10acb0dc0   mysql                              "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes               0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysqld
```

停止(と確認)

```
$ docker container stop mysqld
mysqld

$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED         STATUS                      PORTS                                       NAMES
88f10acb0dc0   mysql                              "docker-entrypoint.s…"   8 minutes ago   Exited (0) 11 seconds ago                                               mysqld
```

起動(と確認)

```
$ docker container start mysqld
mysqld

$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED         STATUS                     PORTS                                                  NAMES
88f10acb0dc0   mysql                              "docker-entrypoint.s…"   8 minutes ago   Up 2 seconds               0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysqld
```
