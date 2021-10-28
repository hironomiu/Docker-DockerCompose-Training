# recipe-2.1 Docker-React-Express-MySQL

recipe-2-0 に MySQL を追加、express-app を router で書き直し

## 前提

recipe-2-0 に追加する形で実装(`Docker-React-Express`ディレクトリ配下で実装する)

## MySQL

`docker`配下に`mysql`ディレクトリを作成し Dockerfile を配置する

```
FROM mysql:latest
ADD ./conf.d/my.cnf /etc/mysql/conf.d/my.cnf
```

`docker/mysql`配下に`conf.d`ディレクトリを作成し my.cnf を配置する

```
[mysqld]
innodb-buffer-pool-size=128M
default-authentication-plugin=mysql_native_password
```

## express-app/Dockerfile

`mysql2`のインストールを追記する

```
FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express cors mysql2 pug
```

## docker-compose.yml

MySQL の設定を追加しサーバサイド(`express-ap`)から参照できるよう追記する

```
version: '3'
services:
  react-app:
    build: docker/react-app
    tty: true
    volumes:
      - react-app:/react-app
    ports:
      - '3000:3000'
    user: root
  express-app:
    build: docker/express-app
    tty: true
    volumes:
      - express-app:/express-app
    ports:
      - '5000:5000'
    user: root
    depends_on:
      - db
  db:
    build: docker/mysql
    tty: true
    volumes:
      - mysql:/var/lib/mysql
    environment:
      MYSQL_DATABASE: test
      MYSQL_ROOT_PASSWORD: mysql
      MYSQL_USER: appuser
      MYSQL_PASSWORD: mysql
    expose:
      - '3306'
    ports:
      - '3307:3306'
volumes:
  react-app:
  express-app:
  mysql:
```

## run

```
$ docker-compose up --build -d
```

## express-app

VSCode から接続しサーバ(`index.js`)を起動する

```
node index.js
```

## react-app

VSCode から接続しアプリを起動する

```
yarn start
```

## express-app の修正

`index.js`を MySQL に接続しレコードを取得しレスポンスで返すよう修正する

```
import express from 'express'
import http from 'http'
import cors from 'cors'
import { promisePool } from './config/db.js'
import { ORIGIN_URL } from './config/index.js'
import users from './router/api/users.js'

const app = express()
const server = http.createServer(app)

app.set('view engine', 'pug')

app.use('/static', express.static('static'))

app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.use('/api/users', users)
app.use('/api/users/:id', users)

app.get('/', async (req, res) => {
  const [rows, fields] = await promisePool.query('select 1 as num')
  res.render('index', {
    title: 'Hey',
    message: `Hello there!num is ${rows[0].num}`,
  })
})

server.listen(5000, () => {
  console.log('listening 5000')
})
```

`express-app`配下に`router/api`ディレクトリを作成し`user.js`を配置する

```
import express from 'express'
import { promisePool } from '../../config/db.js'

const users = express.Router()

users
  .route('/')
  .get(async (req, res) => {
    const [rows] = await promisePool.query('select id,name from users')
    res.json(rows)
  })
  .post(async (req, res) => {
    const ret = await promisePool.query('insert into users(name) values(?)', [
      req.body.name,
    ])
    console.log(ret[0].insertId)
    res.json({ message: 'ok', insertId: ret[0].insertId })
  })

users
  .route('/:id')
  .get(async (req, res) => {
    const [rows] = await promisePool.query(
      'select name from users where id = ?',
      [req.params.id]
    )
    res.json({ name: rows[0].name })
  })
  .post(async (req, res) => {
    const ret = await promisePool.query(
      'update users set name = ? where id = ?',
      [req.body.name, req.params.id]
    )
    // console.log(ret[0])
    res.json({ message: ret[0].info, insertId: ret[0].insertId })
  })

export default users
```

`express-app`配下に`config`ディレクトリを作成し`db.js`,`index.js`を配置する

`db.js`

```
import mysql from 'mysql2'

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'db',
  user: 'appuser',
  password: 'mysql',
  database: 'test',
})

export const promisePool = pool.promise()
```

`index.js`

```
export const ORIGIN_URL = 'http://localhost:3000'
```

ES6 で実装するため`package.json`に`"type": "module",`を`scripts`以下に追記する

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
```

## MySQL

MySQL に接続し`test`DB に api 用のテーブルを作成する

```
mysql -u root -p --port=3307 -h127.0.0.1

mysql> use test

```

以下を実行

```
create table users (
    id int auto_increment not null,
    name varchar(10) not null ,
    primary key(id)
);
```

サンプルデータを insert する

```
insert into users(name) values('太郎'),('John'),('花子');
```

exit

```
mysql> exit
```

## サーバの再起動

express-app の`index.js`が起動している場合 CTRL + C で停止し再度起動する

```
node index.js
```
