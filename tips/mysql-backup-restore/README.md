# mysql-backup-restore

MySQL コンテナのバックアップリストア

## ボリュームの作成

```
docker volume create mysql-volume
```

## MySQL コンテナの起動

```
docker run --name mysqld -dit -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql mysql:latest
```

## リストア時に確認用の DB,テーブルの作成、データの投入

### コンテナ接続

```
docker container exec -it mysqld bash
```

### MySQL 接続

MySQL Client で接続。パスワードは`mysql`

```
mysql -p
```

### DB、テーブルの作成、データの挿入

DB の作成

```
create database sample;
```

作成した DB(sample)に遷移

```
use sample
```

テーブルの作成、データの挿入

```
create table users ( id int not null auto_increment ,name varchar(20) not null,primary key(id));
insert into users(name) values("taro");
```

挿入したデータの確認

```
select * from users;

+----+------+
| id | name |
+----+------+
|  1 | taro |
+----+------+
1 row in set (0.00 sec)
```

### MySQL から抜ける

```
exit
```

## コンテナから抜ける

```
exit
```

## バックアップ

MySQL コンテナは無停止（稼働中）だが挿入中などは未検証（基本はクラッシュリカバリなどでリカバリ時は対応されると思う）

```
docker run --rm -v mysql-volume:/src -v "$PWD":/dest busybox tar czvf /dest/backup.tar.gz -C /src .
```

カレントディレクトリに`backup.tar.gz`が作成されていること

```
$ ll
-rw-r--r--  1 root   root   11429209 Mar  6 09:11 backup.tar.gz
```

## リストア準備

コンテナの停止、削除、イメージの削除、ボリュームの削除

```
docker container stop mysqld
docker container rm mysqld
docker image rm mysql:latest
docker volume rm mysql-volume
```

## リストア

ボリュームを作成

```
docker volume create mysql-volume
```

作成したボリュームにリストア

```
docker run --rm -v mysql-volume:/dest -v "$PWD":/src busybox tar xzf /src/backup.tar.gz -C /dest .
```

## リストア確認

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
select * from users;

+----+------+
| id | name |
+----+------+
|  1 | taro |
+----+------+
1 row in set (0.00 sec)
```
