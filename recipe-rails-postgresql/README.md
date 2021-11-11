# recipe-rails-postgresql

rails + postgresqlの環境

## docker-compose 

### build & up

```
docker-compose up --build -d
```

### 起動

```
docker-compose start
```

### 停止

```
docker-compose stop
```

### rails(VSCode Remote Explorerで接続) 

`/rails-app/sample`で実行

#### server 起動

```
rails s -p 5555 -b 0.0.0.0
```

#### コントローラー、モデル、マイグレーションサンプル

実行後ブラウザで`localhost:5555/users/new`を開きエンドポイントが作成されていることを確認

```
rails generate controller Users new
rails generate model User name:string email:string
bundle exec rake db:migrate
```

### Postgresql(VSCode Remote Explorerで接続)
パスワードは`postgres`、selectの結果が返る場合はrailsからのマイグレーションがPostgresqlに対して成功

```
psql -U postgres -d test

select * from users;
```

### 掃除

```
docker-compose stop
docker-compose rm
docker image rm recipe-rails-postgresql_rails
docker image rm recipe-rails-postgresql_db
docker volume prune
```

## docker
個別にdocker containerを立ち上げる場合は以下

### rails

#### buid & run

```
docker image build --file=./docker/rails/Dockerfile -t rails:latest ./docker/rails/
docker container run --name rails -it -d -p 5555:5555 rails
```

#### 掃除
```
docker container stop rails
docker container rm rails
docker image rm rails
```

### postgresql

#### buid & run

```
docker image build -t postgresql:latest ./docker/postgresql/
docker container run --name postgresql -d -p 5432:5432 postgresql
```

#### 掃除
```
docker container stop postgresql
docker container rm postgresql
docker image rm postgresql
docker volume prune
```