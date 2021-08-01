# recipe-2.1 Docker-React-Express-MySQL

recipe-2 に MySQL を追加

```
$ docker-compose up --build -d
```

## memo

`express-app`は sample のように ES6 で実装する際は`package.json`に`"type": "module",`を記述

api 用のテーブル

```
create table users (
    id int auto_increment not null,
    name varchar(10) not null ,
    primary key(id)
);
```

サンプルデータ

```
insert into users(name) values('太郎'),('John'),('花子');
```
