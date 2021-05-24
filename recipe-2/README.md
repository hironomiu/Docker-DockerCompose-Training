# Docker-React-Express

## 事前準備

Docker

VSCode

## すること

1. 全体を通して Docker、Docker Compose の基本的な使い方の理解
2. 全体を通して VSCode から Docker コンテナに接続しアプリケーションコードを作成
3. docker を用いてフロントサーバ、API サーバをたて連携(Part 1)
4. 3 を Docker Compose で行う(Part 2)

## Part 1

ここでは docker で 2 つのコンテナを立ち上げフロントサーバ、API サーバとして動作させる

### フロントサーバ(react-app)

ここでは React アプリを立ち上げるための node 環境を docker で立ち上げていきます

#### create Dockerfile

docker ファイルの格納ディレクトリ`docker/react-app`を作成する(VSCode のターミナル、Exploer から直接作成のどちらでも良い)

```
$ mkdir -p docker/react-app
```

上記ディレクトリ配下に`Dockerfile`として`cat`で表示した内容を転記する

```
$ cat Dockerfile
FROM node:latest

ENV APP_PATH=/react-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npx create-react-app .
```

#### image build

docker イメージを作成する

```
$ docker image build --file=./docker/react-app/Dockerfile -t react-app:1 .
```

#### volume create

今回立ち上げるコンテナと mount する volume を作成する(※ Mac 以外は要確認)

```
$ docker volume create react-app
```

#### container up

docker コンテナの起動(port 3000 で React アプリはアクセスするよう設定)

```
$ docker container run -p 3000:3000 --mount type=volume,src=react-app,dst=/react-app -it -d --name react-app-1 react-app:1
```

#### VSCode で接続

#### アプリ起動

```
$ yarn start
```

#### サンプルコード React

Index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

App.js

```
import React,{useState,useEffect} from 'react'

const App = () => {
  const [message,setMessage] = useState("hoge")

  useEffect(() => {
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then(data => setMessage(data.message))
  },[])

  return (
    <div>
      hello:{message}
    </div>
  )
}

export default App
```

起動(3000)

```
$ yarn start
```

### express-app

create Dockerfile

```
$ mkdir -p docker/express-app
```

```
FROM node:latest

ENV APP_PATH=/express-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npm init -y
RUN npm install -y express cors
```

image build

```
$ docker image build --file=./docker/express-app/Dockerfile -t express-app:1 .
```

volume create

```
$ docker volume create express-app
```

container up

```
$ docker container run -p 5000:5000 --mount type=volume,src=express-app,dst=/express-app -it -d --name express-app-1 express-app:1
```

### Express

index.js

```
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}))

app.get('/',(req,res) => {
  res.json({
    message:"fugaaaaaa!!"
  })
})
server.listen(5000,() => {
  console.log('listening on *:5000')
})
```

起動(5000)

```
$ node index.js
```

#### 掃除

react-app

```
$ docker container stop react-app-1
$ docker container rm react-app-1
$ docker volume rm react-app
$ docker image rm react-app:1
```

express-app

```
$ docker container stop express-app-1
$ docker container rm express-app-1
$ docker volume rm express-app
$ docker image rm express-app:1
```
