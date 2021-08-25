const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app)

app.set('view engine', 'pug')

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!',
  })
})

app.get('/api/users', (req, res) => {
  res.json({
    message: 'request api/users',
  })
})

app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id)
  res.json({ message: `request no ${req.params.id} is OK` })
})

app.post('/api/users', (req, res) => {
  console.log(req.body)
  res.json({
    message: 'Hello Express Post ' + req.body.name + ' App!!',
  })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
