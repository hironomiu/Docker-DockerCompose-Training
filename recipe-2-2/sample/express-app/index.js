const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const csrf = require("csurf")
const cookieParser = require("cookie-parser")
const server = http.createServer(app)
const mysql = require("mysql")

const MYSQL_CONFIG = {
  host: "db",
  user: "appuser",
  password: "mysql",
  database: "test",
}

const csrfProtection = csrf({
  cookie: true,
})

app.use(cookieParser())

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

app.use(csrfProtection)

app.get("/", (req, res) => {
  let message = "Hello Express App!!solution is -> "

  const connection = mysql.createConnection(MYSQL_CONFIG)

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

app.use(
  "/api/v1",
  (() => {
    const router = express.Router()
    router.use("/login", require("./api/login.js"))
    router.use("/logout", require("./api/logout.js"))
    router.use("/users", require("./api/users.js"))
    router.use("/csrf-token", require("./api/csrfToken.js"))
    return router
  })()
)

server.listen(5000, () => {
  console.log("listening on *:5000")
})
