# python-redis

python、redis が動作する環境

python は docker 起動時にはアプリは起動せず docker 起動後に適時起動する(flask の想定。そのため Port5000 番を解放)

## run

```
docker-compose up -d
```

## stop & start

```
docker-compose stop
```

```
docker-compose start
```

## container 内 flask 起動

アプリをセーブしたら Flask に反映させるため debug,development で実行

VSCode で接続し Terminal で以下を実行（フォアグランドで実行し続ける）

```
FLASK_APP=app.py FLASK_ENV=development flask run
```

bash 接続し上と同じく実行

```
docker container --it xxx bash
FLASK_APP=app.py FLASK_ENV=development flask run
```
