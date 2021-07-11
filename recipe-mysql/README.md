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
