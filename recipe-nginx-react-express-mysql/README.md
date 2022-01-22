# docker-nginx-react-express-mysql

Nginx + React + Express + MySQL の環境レシピ

React は build image を Nginx に volume の共有で認識させる

## Build & Up

```
docker-compose up --build -d
```

## 掃除

```
docker-compose stop
docker-compose rm
docker image rm nginx
docker image rm express-app
docker image rm react-app
docker image rm compose-mysql
docker volume rm recipe-nginx-react-express-mysql_express-app
docker volume rm recipe-nginx-react-express-mysql_react-app
docker volume rm recipe-nginx-react-express-mysql_mysql
```

## 動作確認用サンプルコード

### react-app

`.src/App.js`実装後`yarn build`を行い`./src/build`が作成されること。これにより`Nginx http://localhost:8080`から React アプリをアクセスできる。

```
import {useEffect} from 'react'

const App = () => {
  useEffect(() => {
    (async() => {
      const res = await fetch('http://localhost:5500/api/v1/hello')
      const data = await res.json()
      console.log(data)
    })()
  },[])
  return (
    <div>
      hello
    </div>
  )
}

export default App
```

### express-app

`index.js`

```
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

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
    origin:'http://localhost:8080',
    credentials:true,
    optionsSuccessStatus:200,
  })
)

app.get('/api/v1/hello', async (req,res) => {
  const [rows,fields] = await promisePool.query('select 1 as num')
  res.json({message:`hello ${rows[0].num}`})
})

app.listen(5500,() => {
  console.log(`express listen *:5500`)
})
```

## Memo コンテナ単位での起動

### 共有ボリューム(react-app)

```
docker volume create react-app
```

### Nginx

```
docker image build --file=./docker/nginx/Dockerfile -t nginx:1 ./docker/nginx
```

```
docker container run -p 8080:80 --mount type=volume,src=react-app,dst=/react-app -it -d --name nginxd nginx:1
```

```
docker container stop nginxd
docker container rm nginxd
docker image rm nginx:1
docker volume rm react-app
```

### React

```
docker image build --file=./docker/react-app/Dockerfile -t react-app:1 .
```

```
docker container run -p 3555:3000 --mount type=volume,src=react-app,dst=/react-app -it -d --name react-app react-app:1
```
