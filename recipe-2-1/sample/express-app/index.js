import express from 'express'
import http from 'http'
import cors from 'cors'
import { promisePool } from './config/db.js'
import { ORIGIN_URL } from './config/index.js'
import users from './router/api/users.js'

const app = express()
const server = http.createServer(app)

app.set('view engine', 'pug')

app.use('/static', express.static('static'))

app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.use('/api/users', users)
app.use('/api/users/:id', users)

app.get('/', async (req, res) => {
  const [rows, fields] = await promisePool.query('select 1 as num')
  res.render('index', {
    title: 'Hey',
    message: `Hello there!num is ${rows[0].num}`,
  })
})

server.listen(5000, () => {
  console.log('listening 5000')
})
