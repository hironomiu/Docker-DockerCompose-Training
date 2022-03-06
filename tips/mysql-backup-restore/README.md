# mysql-backup-restore

ボリュームの作成

```
docker volume create mysql-volume
```

```
docker run --name mysqld -dit -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql mysql:latest
```

確認用の DB,テーブルの作成、データの投入

コンテナに接続

```
docker container exec -it mysqld bash
```

MySQL Client で接続。パスワードは`mysql`

```
mysql -p
```

DB、テーブルの作成、データの挿入

```
create database sample;
use sample

create table users ( id int not null auto_increment ,name varchar(20) not null,primary key(id));
insert into users(name) values("taro");
```

挿入したデータの確認

```
mysql> select * from users;
+----+------+
| id | name |
+----+------+
|  1 | taro |
+----+------+
1 row in set (0.00 sec)
```

MySQL とコンテナから抜ける

```
exit
exit
```

バックアップ

```
docker run --rm -v mysql-volume:/src -v "$PWD":/dest busybox tar czvf /dest/backup.tar.gz -C /src .
```

カレントディレクトリに`backup.tar.gz`が作成されていること

```
$ ll
-rw-r--r--  1 root   root   11429209 Mar  6 09:11 backup.tar.gz
```

コンテナの停止、削除、イメージの削除、ボリュームの削除

```
docker container stop mysqld
docker container rm mysqld
docker image rm mysql:latest
docker volume rm mysql-volume
```

ボリュームを作成しリストア

```
docker volume create mysql-volume
docker run --rm -v mysql-volume:/dest -v "$PWD":/src busybox tar xzf /src/backup.tar.gz -C /dest .
```

コンテナを起動

```
docker run --name mysqld -dit -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql mysql:latest
```

コンテナに接続

```
docker container exec -it mysqld bash
```

MySQL Client で接続。パスワードは`mysql`

```
mysql -p
use sample
```

データの確認

```
mysql> select * from users;
+----+------+
| id | name |
+----+------+
|  1 | taro |
+----+------+
1 row in set (0.00 sec)
```
