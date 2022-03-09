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
```

## コンテナの作成＆起動

```
docker run -dit --name node-app -p 8082:8082 -v node-app:/node-app --net node-mysql node:latest
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
npm install express
npm install mysql2
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

## 既存の MySQL をネットワークに追加

```
docker network connect node-mysql mysqld
docker container start mysqld
docker container exec -it mysqld bash

mysql -p
create database test;
```

## アプリの修正

MySQL にアクセスするようコードを修正

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

## 動作確認

`losalhost:8082`にアクセスし`[{"num":1}]`が表示されること
