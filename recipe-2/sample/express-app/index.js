const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const server = http.createServer(app)

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.get("/", (req, res) => {
  res.json({
    message: "fugaaaaaa!!",
  })
})
server.listen(5000, () => {
  console.log("listening on *:5000")
})
