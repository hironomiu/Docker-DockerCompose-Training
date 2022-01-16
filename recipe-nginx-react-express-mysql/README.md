# docker-nginx-react-express-mysql

TODO MySQL

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
docker volume rm docker-nginx-react_express-app
docker volume rm docker-nginx-react_react-app
```

## 動作確認用サンプルコード

### react-app

`.src/App.js`

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
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin:'http://localhost:8080',
    credentials:true,
    optionsSuccessStatus:200,
  })
)

app.get('/api/v1/hello',(req,res) => {
  res.json({message:"hello"})
})

app.listen(5500,() => {
  console.log(('listening on *:5500'))
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
