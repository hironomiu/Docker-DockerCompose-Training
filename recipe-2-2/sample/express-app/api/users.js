const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db.js')
const bcrypt = require('bcrypt')

router
  .route('/')
  .get(verifyToken, async (req, res) => {
    const [rows, fields] = await promisePool.query(
      'select id,name,email from users'
    )
    console.log(rows)
    let results = {}
    console.log(req.decoded.email)
    if (req.decoded.email == 'taro@example.com') {
      console.log('OK')
      results = {
        userId: req.decoded.userId,
        name: '太郎',
      }
    } else if (req.decoded.userId == '002') {
      results = {
        userId: req.decoded.userId,
        name: '二郎',
      }
    }

    res.json(rows)
  })
  .post(async (req, res) => {
    console.log('users posted:', req.body.password)
    // sigUp を作成したらそちらに移行する（以下でhashを作成しusersのpasswordにinsertする）
    const hash = new Promise((resolve) =>
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        // errorハンドリングをいれる
        console.log(err)
        resolve(hash)
      })
    )
    // hashエラーだった場合のresを書く
    const password = await hash
    const ret = await promisePool.query(
      'insert into users(name,email,password) values(?,?,?)',
      [req.body.name, req.body.email, password]
    )
    // insertエラー（ユニーク制約、etc）だった場合のresを書く
    console.log('insertId:', ret[0].insertId)
    res.json({ isSuccess: true, message: 'insertId:' + ret[0].insertId })
  })

router.get('/:id', verifyToken, async (req, res) => {
  const [rows, fields] = await promisePool.query(
    'select id,name,email,password from users where id = ?',
    [req.params.id]
  )

  console.log('payload', req.decoded.email)

  let results = { name: rows[0].name }
  res.json(results)
})

module.exports = router
