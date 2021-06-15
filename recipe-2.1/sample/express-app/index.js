const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const server = http.createServer(app)
const mysql = require("mysql")

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
  let message = "Hello Express App!!solution is -> "
  const connection = mysql.createConnection({
    host: "db",
    user: "appuser",
    password: "mysql",
    database: "test",
  })
  connection.connect()
  connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
    if (err) throw err
    message += rows[0].solution
    connection.end()
    res.json({
      message: message,
    })
  })
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
