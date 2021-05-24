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

docker イメージを作成します。確認 -> 作成 -> 確認の手順で行います

確認

```
$ docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
```

作成

```
$ docker image build --file=./docker/react-app/Dockerfile -t react-app:1 .
```

確認(`react-app`が存在すること)

```
$ docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
react-app                   1         29ad70606561   32 seconds ago   1.23GB
```

#### volume create

今回立ち上げるコンテナに mount し永続化する volume を作成します(※ Mac 以外は要確認)。確認 -> 作成 -> 確認の手順で行います

確認

```
$ docker volume ls
DRIVER    VOLUME NAME
```

作成

```
$ docker volume create react-app
```

確認(`react-app`が存在すること)

```
$ docker volume ls
DRIVER    VOLUME NAME
local     react-app
```

#### container up

docker コンテナの起動(port 3000 で React アプリはアクセスするよう設定)確認 -> 起動 -> 確認の手順で行います

確認(`-a`は停止しているコンテナも出力)

```
$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED       STATUS                     PORTS                               NAMES
```

起動

```
$ docker container run -p 3000:3000 --mount type=volume,src=react-app,dst=/react-app -it -d --name react-app-1 react-app:1
```

確認(`react-app-1`の STATUS が`UP`になっていること)

```
$ docker container ls -a
CONTAINER ID   IMAGE                              COMMAND                  CREATED          STATUS                     PORTS                                       NAMES
f1f0a91fb71d   react-app:1                        "docker-entrypoint.s…"   46 seconds ago   Up 41 seconds              0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   react-app-1
```

#### VSCode で接続

`Remote Explorer`から`Containers`を選択し`react-app:1`のディレクトリを押下

![docker-01](./images/docker-01.png)

`react-app`ディレクトリを指定(もしくは入力)し OK を押下

![docker-02](./images/docker-02.png)

React アプリの環境が作成されていることを確認
![docker-03](./images/docker-03.png)

#### アプリ起動

以降は上で接続した VSCode で作業を行います

React のサンプルをターミナルから起動

```
$ yarn start

Compiled successfully!

You can now view react-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.17.0.2:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

起動完了後`localhost:3000`で React アプリが動作していることを確認(違う port で開いた場合は 3000 に書き換えて確認)

![docker-04](./images/docker-04.png)

#### サンプルコード React

[src/Index.js](./sample/react-app/Index.js)を以下に修正

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

`src/App.js`を[src/components/App.js](./sample/react-app/components/App.js)として修正

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

念のためターミナルで起動しているアプリを Ctrl + C で停止し再起動(3000)

```
$ yarn start
```

dev tools を立ち上げ確認(現在は API サーバをたてていないのでエラーとなる)

![docker-05](./images/docker-05.png)

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
console.log('listening on \*:5000')
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

```

```
