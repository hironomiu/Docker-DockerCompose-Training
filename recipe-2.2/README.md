# recipe-2.1 Docker-React-Express-MySQL-JWT-COOKIE-CSRF

recipe-2.1 に jwt,cookie,csrf を追加

```
$ docker-compose up --build -d
```

`jwt.config.js`の`secret`は以下で作成

```
$ node -e "console.log(require('jsonwebtoken').sign({username:'hoge'},'my_secret'))"
```
