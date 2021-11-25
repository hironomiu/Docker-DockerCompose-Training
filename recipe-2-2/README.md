# recipe-2-2 Docker-React-Express-MySQL-JWT-COOKIE-CSRF

recipe-2-1 に jwt,cookie,csrf を追加

## 前提

recipe-2-0,recipe-2-1 に追加する形で実装(`Docker-React-Express`ディレクトリ配下で実装する)

## express-app/Dockerfile

`Dockerfile`に`jsonwebtoken`,`cookie-parser`,`csurf`,`bcrypt`,`express-validator`を追記

```
FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express cors mysql2 pug jsonwebtoken cookie-parser csurf bcrypt express-validator
```

## react-app/Dockerfile

recipe-2-1 と同じ

## docker-compose.yml

recipe-2-1 と同じ

## up

```
$ docker-compose up --build -d
```

`jwt.config.js`の`secret`は以下で作成

```
$ node -e "console.log(require('jsonwebtoken').sign({username:'hoge'},'my_secret'))"
```

## MySQL

recipe-2-1 と以下同じ（email,password を追加）

MySQL に接続し`test`DB に api 用のテーブルを作成する

```
mysql -u root -p --port=3307 -h127.0.0.1

mysql> use test

```

`users`テーブルの削除＆作成

```
drop table users;
create table users (
    id int auto_increment not null,
    name varchar(10) not null ,
    email varchar(100) not null,
    password varchar(100) not null,
    primary key(id),
    unique (email)
);
```

`users`テーブルのサンプルデータを insert (`bcrypt` で hash 化してある、パスワードは全て`abcd`)

```
insert into users(name,email,password) values
('太郎','taro@example.com','$2b$10$iFCxa4wOsuZhklYp00bnCuk0sBJxGOU.e4YnfqvoDEyIk1C1rrd0K'),
('John','john@example.com','$2b$10$8W1a6GfBsmn/gY8jhXjGbOCQwcWfF/PeI5O07ONakuhX9bYIZNe82'),
('花子','hanako@example.com','$2b$10$TXCGCYDpn6p35Csz5UyoA.UHJ9SkE3Q7JP6lRO9ZgMaXuNwEo.wWW');
```

exit

```
mysql> exit
```
