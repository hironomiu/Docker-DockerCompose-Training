const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app)

app.set('view engine', 'pug')

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
  res.json([{ name: 'Bob' }, { name: '花子' }, { name: '太郎' }])
})

app.get('/api/users/:id', (req, res) => {
  res.json({ name: `No.${req.params.id} is Bob` })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
