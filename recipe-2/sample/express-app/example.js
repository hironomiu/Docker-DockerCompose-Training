const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const server = http.createServer(app)

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.get("/", (req, res) => {
  setTimeout(() => {
    console.log("get")
    res.json({
      message: "Hello Express Get App!!",
    })
  }, 5000)
})

app.post("/", (req, res) => {
  console.log(req.body)
  res.json({
    message: "Hello Express Post " + req.body.name + " App!!",
  })
})

server.listen(5000, () => {
  console.log("listening on *:5000")
})
