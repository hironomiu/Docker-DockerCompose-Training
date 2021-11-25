const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db.js')
const bcrypt = require('bcrypt')
const registerErrorMessage = { isSuccess: false, message: '登録エラー' }
router
  .route('/')
  .get(verifyToken, async (req, res) => {
    const [rows, fields] = await promisePool.query(
      'select id,name,email from users'
    )
    let results = {}

    // verifiTokeでdecodedの設定確認用（処理では利用していない）
    if (req.decoded.email == 'taro@example.com') {
      results = {
        userId: req.decoded.userId,
        name: '太郎',
      }
    }

    res.json(rows)
  })
  .post(async (req, res) => {
    // sigUp を作成したらそちらに移行する（以下でhashを作成しusersのpasswordにinsertする）
    const hash = new Promise((resolve) =>
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.json(registerErrorMessage)
        resolve(hash)
      })
    )
    const password = await hash
    const ret = await promisePool
      .query('insert into users(name,email,password) values(?,?,?)', [
        req.body.name,
        req.body.email,
        password,
      ])
      .catch((_) => res.json(registerErrorMessage))
    res.json({ isSuccess: true, message: 'insertId:' + ret[0].insertId })
  })

router.get('/:id', verifyToken, async (req, res) => {
  const [rows, fields] = await promisePool.query(
    'select id,name,email,password from users where id = ?',
    [req.params.id]
  )

  // verifiTokeでdecodedの設定確認用(payloadにemailが含まれていることの確認)
  console.log('payload', req.decoded.email)

  let results = { name: rows[0].name }
  res.json(results)
})

module.exports = router
