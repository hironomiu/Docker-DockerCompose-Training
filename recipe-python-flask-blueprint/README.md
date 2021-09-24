# recipe-python-flask-blueprint

Docker で Flask の開発環境（Blueprint を用いたサンプルコード`sample`配下まで配置）の構築例

## 事前準備

[Docker](https://www.docker.com/)、[Docker Compose](https://docs.docker.com/compose/)が動作すること([Docker Desktop](https://www.docker.com/get-started)で可能)

## Docker

### Dockerfile

`docker/flask`配下にに配置

### build

```
docker build --file=./docker/flask/Dockerfile -t flask-app:1 .
```

### create volume

```
docker volume create flask-app
```

### run

```
docker container run -p 5001:5001 --mount type=volume,src=flask-app,dst=/flask-app -it -d --name flask-app-1 flask-app:1
```

### 掃除

```
docker container stop flask-app-1
docker container rm flask-app-1
docker volume rm flask-app
docker image rm flask-app:1
```

## Flask

### アプリケーションの配置

ルーティングによる呼び出しは Blueprint で分割しテンプレートは`/`のみ呼び出し他は API で構成する

`sample/app`配下を`flask-app`に配置

### run

`WORKDIR`直下で以下を実行

```
export FLASK_APP=app
export FLASK_ENV=development
export FLASK_RUN_PORT=5001
export FLASK_RUN_HOST=0.0.0.0
flask run
```
