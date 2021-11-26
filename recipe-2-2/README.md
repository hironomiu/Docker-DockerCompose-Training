# recipe-2-2 Docker-React-Express-MySQL-JWT-COOKIE-CSRF

recipe-2-1 に jwt,cookie,csrf,validator を追加

## 前提

recipe-2-0,recipe-2-1 に追加する形で実装(`Docker-React-Express`ディレクトリ配下で実装する)

## docker/express-app/Dockerfile

`Dockerfile`に`jsonwebtoken`,`cookie-parser`,`csurf`,`bcrypt`,`express-validator`を追記

```
FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express cors mysql2 pug jsonwebtoken cookie-parser csurf bcrypt express-validator

```

## docker/react-app/Dockerfile

recipe-2-1 から redux-toolkit を追加で使うため template redux の利用に Dockerfile を修正(`yarn start`でエラーになる場合`FROM node:16.0`を指定し build し直す)

```
FROM node:latest

ENV APP_PATH=/react-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npx create-react-app . --template redux
```

## docker/mysql/Dockerfile

recipe-2-1 と同じ

## docker/mysql/conf.d/my.cnf

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

## express-app アプリ

[sample/espress-app](./sample/express-app)以下を`express-app`に記述

### Memo

```
mkdir api config middlewares views
touch api/csrfToken.js api/login.js api/logout.js api/users.js
touch config/db.js config/index.js config/jwt.config.js
touch middlewares/validator.js middlewares/verifyToken.js
touch views/index.pug
touch index.js
```

### Run

```
node index.js
```

## react-app アプリ

[sample/react-app](./sample/react-app)以下を`react-app`に記述

### Memo

```
mkdir src/components src/features/credentials src/features/login
touch src/components/Login.js src/components/Main.js src/components/SignUp.js src/features/credentials/credentialsSlice.js src/features/login/loginSlice.js
```

## 掃除

```
docker-compose stop
docker-compose rm

docker image rm docker-react-express_react-app

docker volume rm docker-react-express_react-app
```
