# recipe-2-2 Docker-React-Express-MySQL-JWT-COOKIE-CSRF

recipe-2-1 に jwt,cookie,csrf,validator を追加

## 前提

recipe-2-0,recipe-2-1 に追加だが、`create-react-app`のテンプレートを変更するため新規で作成する(`Docker-React-Express`ディレクトリ配下で実装する)

```
mkdir Docker-React-Express
cd Docker-React-Express
```

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

recipe-2-1 から テンプレートを redux-toolkit に変更し使うため template redux の利用に Dockerfile を修正(`yarn start`で`node:latest`だとエラーになる場合`FROM node:16.0`を指定し build し直す)、Tailwind 周りのインストールを追加

```
FROM node:latest

ENV APP_PATH=/react-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npx create-react-app . --template redux
RUN yarn add @headlessui/react
RUN yarn add @heroicons/react
RUN yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
RUN yarn add @craco/craco
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
    name varchar(100) not null ,
    email varchar(100) not null,
    password varchar(100) not null,
    primary key(id),
    unique (email)
);

drop table task_status;
create table task_status (
    id int auto_increment not null,
    name varchar(100) not null,
    primary key(id),
    unique (name)
);

drop table tasks;
create table tasks (
    id int auto_increment not null,
    title varchar(100) not null,
    task text not null,
    status int not null,
    user_id int not null,
    primary key(id),
    FOREIGN KEY (status) REFERENCES task_status (id)
);

```

`users`,`task_status`,`tasks`テーブルのサンプルデータを insert (`bcrypt` で hash 化してある、パスワードは全て`abcd`)

```
insert into users(name,email,password) values
('太郎','taro@example.com','$2b$10$iFCxa4wOsuZhklYp00bnCuk0sBJxGOU.e4YnfqvoDEyIk1C1rrd0K'),
('John','john@example.com','$2b$10$8W1a6GfBsmn/gY8jhXjGbOCQwcWfF/PeI5O07ONakuhX9bYIZNe82'),
('花子','hanako@example.com','$2b$10$TXCGCYDpn6p35Csz5UyoA.UHJ9SkE3Q7JP6lRO9ZgMaXuNwEo.wWW');

insert into task_status(id,name) values
(1,'未着手'),(2,'着手中'),(3,'完了');

insert into tasks(title,task,status,user_id) values
('太郎　タスク１','タスク１の詳細',1,1),
('太郎　タスク２','タスク２の詳細',1,1),
('John タスク１','タスク１の詳細',1,2),
('John タスク２','タスク２の詳細',1,2);


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
touch api/csrfToken.js api/login.js api/logout.js api/users.js api/tasks.js
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

`package.json`の scripts を`craco`で構成する

before

```
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
```

after(eject は削除)

```
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
```

`craco.config.js`を作成（touch ではなく VSCode からファイル作成でも良い）

```
touch craco.config.js
```

作成した`craco.config.js`に以下を記述

```
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
```

tailwind の初期化

```
npx tailwindcss init -p
```

`tailwind.config.js`の purge を修正

```
- purge: [],

+ purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
```

`./src/index.css` を tailwind を利用する設定に修正（以下の 3 行に全てを書き換え）

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[sample/react-app](./sample/react-app)以下を`react-app`に記述

### Run

```
yarn start
```

### Memo

```
mkdir src/app src/components src/config src/features/auth src/features/tasks
touch src/app/store.js src/components/Footer.js src/components/Header.js src/components/Layout.js src/components/Login.js src/components/Main.js src/components/Modal.js src/components/SignUp.js src/config/index.js src/features/auth/authSlice.js src/features/tasks/tasksSlice.js
```

## 掃除

```
docker-compose stop
docker-compose rm

docker image rm docker-react-express_react-app
docker image rm docker-react-express_express-app
docker image rm docker-react-express_db
docker volume rm docker-react-express_react-app
docker volume rm docker-react-express_express-app
docker volume rm docker-react-express_mysql
```
