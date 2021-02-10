# Docker-DockerCompose-Training

## 前提

[Docker](https://www.docker.com/)、[Docker Compose](https://docs.docker.com/compose/)が動作すること

[Docker Desktop](https://www.docker.com/get-started)で可能

## 公式ドキュメント

[docker docs](https://docs.docker.com/)

## すること

1. Docker で環境構築
   1. docker exec で接続し開発
   1. VSCode から接続し開発
   1. Docker の基本的な操作
1. Docker Compose で環境構築
   1. Docker をマウントし開発
   1. VSCode から接続し開発
   1. Docker Compose の基本的な操作

## 1. Docker で環境構築

### 今回の作業ディレクトリの作成

```
$ mkdir Docker-DockerCompose-Training
$ cd Docker-DockerCompose-Training
```

### サンプルコード用ディレクトリの作成

```
$ mkdir app
```

`.gitignore`に以下を追記し管理対象から除外

```
+ app/*
```

### Dockerfile の作成

`docker/app`ディレクトリを作成し配下に[`Dockerfile`](./docker/app/Dockerfile)の作成

```
$ mkdir -p docker/app
```

### Docker イメージの確認

```
$ docker images
```

### build

`Docker-DockerCompose-Training`から実行

```
$ docker build --file=./docker/app/Dockerfile -t sample:1 .
```

### Docker イメージの確認

```
$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
sample       1         43a2ae7ab3ee   About a minute ago   936MB
node         latest    96e42e8537de   2 days ago           936MB
```

### Docker コンテナの確認

```
$ docker ps -a
```

### 新しい Docker コンテナの起動

```
$ docker run -v `pwd`/app:/app -it -d --name sample-1 -p 3000:3000 sample:1
```

### Docker コンテナの確認

```
$ docker ps -a
CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS                     PORTS                               NAMES
54306bc7ef99   sample:1   "docker-entrypoint.s…"   29 seconds ago   Up 28 seconds              0.0.0.0:3000->3000/tcp              sample-1
```

### 1.1 docker exec で接続し開発

`docker ps -a`で確認した`CONTAINER ID`を`-it`以降に指定する

```
$ docker exec -it 54306bc7ef99 bash
```

#### ファイルの作成と確認

```
# touch hoge
# ls -la
total 8
drwxr-xr-x 2 root root 4096 Feb  8 06:20 .
drwxr-xr-x 1 root root 4096 Feb  8 06:18 ..
-rw-r--r-- 1 root root    0 Feb  8 06:20 hoge

# exit
```

#### ファイルの確認

```
$ ls -la app
total 0
drwxr-xr-x  3 miurahironori  staff   96  2  8 15:29 .
drwxr-xr-x  4 miurahironori  staff  128  2  8 15:28 ..
-rw-r--r--  1 miurahironori  staff    0  2  8 15:29 hoge
```

### 1.2 VSCode から接続し開発

#### 拡張機能のインストール

VSCode -> 拡張機能 -> [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)をインストール

#### 接続

`sample:1`の横の`+`を押下後、ディレクトリ(フォルダー)の入力を聞かれた場合は`/app`を入力
![docker-01](./images/docker-01.png)

新しいウインドウで作成した Docker 環境に接続し開発ができる状態であること
![docker-02](./images/docker-02.png)

fuga と言うファイルを追加し`Docker-DockerCompose-Training`から確認

```
$ ls -la app
```

### 1.3 Docker の基本的な操作

#### Docker イメージの確認

```
$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED             SIZE
sample       1         43a2ae7ab3ee   About an hour ago   936MB
node         latest    96e42e8537de   2 days ago          936MB
```

#### build

**build 済みなので実行しない**

~~`Docker-DockerCompose-Training`から実行~~

```
$ docker build --file=./docker/app/Dockerfile -t sample:1 .
```

#### Docker コンテナの確認

```
$ docker ps -a
CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS                     PORTS                               NAMES
d621283c4a42   sample:1   "docker-entrypoint.s…"   16 minutes ago   Up 16 minutes              0.0.0.0:3000->3000/tcp              sample-1
```

#### 新しい Docker コンテナの起動

**実行済みなので実行しない**

```
$ docker run -v `pwd`/app:/app -it -d --name sample-1 -p 3000:3000 sample:1
```

#### Docker コンテナの停止

`docker ps -a`で確認した`CONTAINER ID`を指定

```
$ docker stop d621283c4a42
```

#### Docker コンテナの起動

`docker ps -a`で確認した`CONTAINER ID`を指定

```
$ docker start d621283c4a42
```

#### Docker コンテナの削除

停止後`docker ps -a`で確認した`CONTAINER ID`を指定

```
$ docker rm d621283c4a42
```

確認

```
$ docker ps -a
```

#### Docker イメージの削除

`docker images`で確認した`IMAGE ID`を指定

```
$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
sample       1         43a2ae7ab3ee   2 hours ago    936MB
node         latest    96e42e8537de   2 days ago     936MB

$ docker rmi 43a2ae7ab3ee
$ docker rmi 96e42e8537de
```

### 掃除

`app`内を掃除

```
$ rm app/*
```

## 2. Docker Compose で環境構築

### React サンプルコードの準備

```
$ cd app
$ npx create-react-app .
```

### docker-compose.yml の作成

Docker-DockerCompose-Training 直下に[docker-compose.yml](./docker-compose.yml)を作成

### up

Docker-DockerCompose-Training で実行

```
$ docker-compose up
```

`Compiled successfully!`となること
![docker-compose-01](./images/docker-compose-01.png)

ブラウザにサンプルコードが`http://localhost:3000`で表示されること(確認後、Ctrl+C で停止)

![docker-compose-02](./images/docker-compose-02.png)

### 2.1 Docker をマウントし React のサンプルコードを用い開発

`app/src/App.js`を編集し`hello`と表示されることを確認しましょう

```
import React from 'react'

const App = () => {
 return (
   <>
     hello
   </>
 );
}

export default App;
```

### 2.2 VSCode から接続し開発

#### 接続

リモートエクスプローラー -> 今回作成した Docker-Compose の環境を選択

![docker-compose-03](./images/docker-compose-03.png)

フォルダを押下
![docker-compose-04](./images/docker-compose-04.png)

`app`を指定し`OK`を押下(2 回)
![docker-compose-05](./images/docker-compose-05.png)

#### 開発

`app/src/App.js`を編集し`docker compose hello`と表示されることを確認しましょう

### 2.3 Docker Compose の基本的な操作

#### 起動

フォアグランドで起動(停止は Ctrl+C)

```
$ docker-compose up
```

バックグラウンドで起動

```
$ docker-compose up
```

#### 起動

```
$ docker-compose start
```

#### 停止

```
$ docker-compose stop
```

#### 確認

```
$ docker-compose ps
               Name                              Command               State           Ports
-----------------------------------------------------------------------------------------------------
docker-dockercompose-training_app_1   docker-entrypoint.sh yarn  ...   Up      0.0.0.0:3000->3000/tcp
```
