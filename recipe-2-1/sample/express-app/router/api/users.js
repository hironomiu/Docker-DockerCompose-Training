import express from 'express'
import { promisePool } from '../../config/db.js'

const users = express.Router()

users
  .route('/')
  .get(async (req, res) => {
    const [rows] = await promisePool.query('select id,name from users')
    res.json(rows)
  })
  .post(async (req, res) => {
    const ret = await promisePool.query('insert into users(name) values(?)', [
      req.body.name,
    ])
    console.log(ret[0].insertId)
    res.json({ message: 'ok', insertId: ret[0].insertId })
  })

users
  .route('/:id')
  .get(async (req, res) => {
    const [rows] = await promisePool.query(
      'select name from users where id = ?',
      [req.params.id]
    )
    res.json({ name: rows[0].name })
  })
  .post(async (req, res) => {
    const ret = await promisePool.query(
      'update users set name = ? where id = ?',
      [req.body.name, req.params.id]
    )
    // console.log(ret[0])
    res.json({ message: ret[0].info, insertId: ret[0].insertId })
  })

export default users
