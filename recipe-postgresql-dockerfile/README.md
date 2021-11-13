# recipe-postgresql-dockerfile

PostgreSQL 単体の環境

## 構成

- PORT
  - host 5433 : guest 5432
- 作成DB
  - test
- アカウント、パスワード
  - postgres postgres

## build

```
docker image build -t postgresql:latest ./docker/postgresql/
```

## run

```
docker container run --name postgresql -d -p 5433:5432 postgresql
```

## 接続

パスワードは `postgres`

```
psql -U postgres -p 5433 -h 127.0.0.1
```

## 掃除

```
docker container stop postgresql
docker container rm postgresql
docker image rm postgresql
docker volume prune
```