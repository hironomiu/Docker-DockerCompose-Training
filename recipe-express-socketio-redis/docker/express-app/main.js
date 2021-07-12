// express
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)

// socket-io + redis
const redis = require("socket.io-redis")
const { Server } = require("socket.io")
const io = new Server(server)
const HOST = "redis"
const REDIS_PORT = 6379
const WEB_PORT = 5010

io.adapter(redis({ host: HOST, port: REDIS_PORT }))

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

server.listen(WEB_PORT, () => {
  console.log(`listening on *:${WEB_PORT}`)
})
