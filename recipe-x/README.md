# recipe-x Docker-MySQL

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

## DB の作成

MySQL 上に`test`DB の作成例

bash モードでコンテナに接続し MySQL の接続(パスワードは`mysql`)
※日本語入力を可能にするために`apt-get`,`source`をし反映させてから`mysql`コマンドを実行しましょう(`docker container start|stop`では初回だけ行えば良い)

```
$ docker container exec -it mysqld bash
root@88f10acb0dc0:/# apt-get update && apt-get install -y locales && locale-gen ja_JP.UTF-8 && echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc
root@88f10acb0dc0:/# source ~/.bashrc

root@88f10acb0dc0:/#　mysql -u root -p
```

ローカルに MySQL Client がインストールされている場合(パスワードは`mysql`)の接続

```
$ mysql -u root -p -h127.0.0.1
```

`test`DB の作成

```
mysql> create database test;
Query OK, 1 row affected (0.12 sec)
```

確認

```
mysql> show create database test;
+----------+--------------------------------------------------------------------------------------------------------------------------------+
| Database | Create Database                                                                                                                |
+----------+--------------------------------------------------------------------------------------------------------------------------------+
| test     | CREATE DATABASE `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */ |
+----------+--------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.01 sec)
```

`test`DB に遷移(具体的な SQL のオペレーションは遷移後に行う)

```
mysql> use test
Database changed
mysql>
```

作業が終わったら EXIT

```
mysql> exit
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
