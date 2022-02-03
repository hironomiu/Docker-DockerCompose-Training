# recipe-https-nginx-typescript-react-express-mysql

HTTPS + Nginx + TypeScript + React + Express + MySQL の環境レシピ

HTTPS は Nginx に証明書を設定し実現する
React は build image を Nginx に volume の共有で認識させる

## 事前準備

### ドメイン（任意）

自己署名入り証明書ではなく正規のドメインからサブドメインなどに[Let’s Encrypt](https://letsencrypt.org/)で証明書を発行する場合は取得

### 証明書

`./docker/nginx/`配下に`cert`ディレクトリを作成し、取得作成した`cert.crt`,`cert.key`を配置する(`cert`は`.gitignore`で除外されていることを確認する)

```
mkdir ./docker/nginx/cert
```

独自ドメインに Let’ Encrypt にて証明書を取得する場合は[create-https-localhost-with-letsencrypt](https://github.com/hironomiu/create-https-localhost-with-letsencrypt)を参照

その他[mkcert](https://github.com/FiloSottile/mkcert)を利用し作成する方法もある

## Build & Up

```
docker-compose up --build -d
```

## 掃除

```
docker-compose stop
docker-compose rm
docker image rm https-nginx
docker image rm https-express-app
docker image rm https-react-app
docker image rm https-mysql
docker volume rm https-express-app
docker volume rm https-mysql
docker volume rm https-react-app
```

## 動作確認用サンプルコード

アプリの起動は`npx ts-node index.ts`で行う

### express-app

`index.ts`

```
import express,{ Request,Response } from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'db',
  user: 'appuser',
  password: 'mysql',
  database: 'test',
})

const promisePool = pool.promise()

app.use(
  cors({
    // origin -> 作成したサブドメイン、Dcoker react-appコンテナ
    origin:['https://localhost.hironomiu.com','http://localhost:3333'],
    credentials:true,
    optionsSuccessStatus:200,
  })
)

app.get('/api/v1/hello', async (req:Request,res:Response) => {
  const [rows,fields]:[mysql.RowDataPacket[],any] = await promisePool.query('select 1 as num')
  if(rows[0]){
    res.json({message:`hello ${rows[0].num}`})
  }
})

app.listen(5550,() => {
  console.log(`express listen *:5550`)
})
```

### react-app

`.src/App.tsx`実装後`npm run build`を行い`./src/build`を作成する。これにより`https://作成したサブドメイン or https://localhost`にアクセスし`Nginx`経由で Build した React アプリにアクセスできる。

```
import {FC ,useEffect,useState} from 'react';

const App:FC = () => {
  const [data,setData] = useState({message:"hoge"})
  useEffect(()=> {
    ( async () => {
      // fetch先は作成したサブドメインに適時書き換える
      const res = await fetch('https://localhost.hironomiu.com/api/v1/hello')
      const data = await res.json()
      setData(data)
    })()
  })
  return <div>{data.message}</div>;
};

export default App;
```

## Memo

`./docker/nginx/Dockerfile` -> `RUN mkdir ${APP_PATH}`をコメントにしているが作成されない場合はコメントを外す
