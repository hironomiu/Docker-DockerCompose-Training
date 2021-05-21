# Docker-React-Express

## 事前準備

Docker

VSCode

## react-app

create Dockerfile

```
$ mkdir -p docker/react-app
```

```
$ cat Dockerfile
FROM node:latest

ENV APP_PATH=/react-app
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

RUN npx create-react-app .
```

image build

```
$ docker image build --file=./docker/react-app/Dockerfile -t react-app:1 .
```

volume create

```
$ docker volume create react-app
```

container up

```
$ docker container run -p 3000:3000 --mount type=volume,src=react-app,dst=/react-app -it -d --name react-app-1 react-app:1
```

## express-app

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

## React

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

## Express

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

## 掃除

```
$ docker stop react-app-1
$ docker rm react-app-1
```
