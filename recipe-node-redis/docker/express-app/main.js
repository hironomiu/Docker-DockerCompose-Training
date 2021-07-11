const redis = require("socket.io-redis")
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const HOST = "redis"
const PORT = 6379

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.adapter(redis({ host: HOST, port: PORT }))

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })
})

server.listen(5010, () => {
  console.log("listening on *:5010")
})
