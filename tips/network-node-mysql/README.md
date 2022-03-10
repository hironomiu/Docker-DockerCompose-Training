# network-node-mysql

<!-- TODO mysqlを既存のものから新規で作成して資料に記述する -->

docker の network 機能を用いて node(`node-app`)コンテナと mysql(`mysqld`)コンテナをコンテナ名で通信できるよう設定する

## ネットワークの作成

```
docker network create node-mysql
```

## ボリュームの作成

```
docker volume create node-app
docker volume create mysql-volume
```

## コンテナの作成＆起動

`node`アプリコンテナ

```
docker run -dit --name node-app -p 8082:8082 -v node-app:/node-app --net node-mysql node:latest
```

`mysql`コンテナ

```
docker run --name mysqld -dit -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql --net node-mysql mysql:latest
```

## コンテナの起動確認

Up していることを確認

```
docker container ls -a

CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS                        PORTS                                       NAMES
1f9584824fe0   mysql:latest   "docker-entrypoint.s…"   37 seconds ago       Up 37 seconds                 3306/tcp, 33060/tcp                         mysqld
cffcd4960e09   node:latest    "docker-entrypoint.s…"   About a minute ago   Up About a minute             0.0.0.0:8082->8082/tcp, :::8082->8082/tcp   node-app
```

### 接続し express でアプリの作成

node-app に接続

```
docker container exec -it node-app bash
```

ワークディレクトリに遷移

```
cd node-app
```

今回利用するパッケージ`express`,`mysql2`のインストール

```
npm install express mysql2
```

コード編集用に`vim`をインストール

```
apt update
apt install -y vim
```

vi で`index.js`を作成

```
const express = require('express')

const app = express()

app.get('/',(req,res) => {
	res.json({message:'hello!'})
})

app.listen(8082,() => {
	console.log('listening on *:8082')
})
```

## アプリを起動

```
node index.js
```

## ブラウザで確認

`losalhost:8082`にアクセスし`{"message":"hello!"}`が表示されること

表示後アプリを CTRL + C で停止しコンテナから抜ける

```
exit
```

## MySQL にテーブルの作成

```
docker container exec -it mysqld bash
```

パスワードは`mysql`

```
mysql -p
```

DB の作成

```
create database test;
```

DB を抜ける

```
exit
```

コンテナを抜ける

```
exit
```

## アプリの修正

```
docker container exec -it node-app bash
```

```
cd node-app
```

MySQL にアクセスするよう`index.js`を修正

```
const express = require('express')
const mysql2 = require('mysql2')

const app = express()

const pool = mysql2.createPool({
	host:'mysqld',
	user:'root',
	password:'mysql',
	database:'test',
})
const promisePool = pool.promise()

app.get('/',async (req,res) => {
	const [rows,fields] = await promisePool.query('select 1 as num')
	res.json(rows)
})

app.listen(8082,() => {
	console.log('listening on *:8082')
})
```

## アプリの起動

```
node index.js
```

## 動作確認

`losalhost:8082`にアクセスし`[{"num":1}]`が表示されること

表示後アプリを CTRL + C で停止しコンテナから抜ける

```
exit
```

## 掃除

```
docker container stop node-app
docker container rm node-app
docker image rm node:latest
docker container stop mysqld
docker container rm mysqld
docker image rm mysql:latest
docker volume rm node-app
docker volume rm mysql-volume
docker network rm node-mysql
```

## 既存の MySQL をネットワークに追加

```
docker network connect node-mysql mysqld
docker container start mysqld
docker container exec -it mysqld bash

```
