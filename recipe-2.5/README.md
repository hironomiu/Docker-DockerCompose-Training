# recipe-2.5 Docker-React-Express-MySQL-HTTPS-JWT

recipe-2.1 に JWT,HTTPS を追加

```
$ docker-compose up --build -d
```

React アプリは`https://localhost:10443`で開く(ブラウザから怒られるがそのまま開く)

`jwt.config.js`の`secret`は以下で作成

```
$ node -e "console.log(require('jsonwebtoken').sign({username:'hoge'},'my_secret'))"
```
