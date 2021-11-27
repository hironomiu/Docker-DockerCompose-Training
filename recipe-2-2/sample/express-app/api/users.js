const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db')
const bcrypt = require('bcrypt')
const registerErrorMessage = { isSuccess: false, message: '登録エラー' }
router
  .route('/')
  .get(verifyToken, async (req, res) => {
    // usersのエンドポイントだが自身しか参照させないためwhere句で絞り込み
    const [rows, fields] = await promisePool.query(
      'select id,name,email from users where id = ?',
      [req.decoded.id]
    )

    // verifiTokeでdecodedの設定確認用（処理では利用していない）
    console.log(req.decoded.id)
    if (req.decoded.email == 'taro@example.com') {
      results = {
        userId: req.decoded.userId,
        name: '太郎',
      }
    }

    return res.json(rows)
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
    try {
      const ret = await promisePool.query(
        'insert into users(name,email,password) values(?,?,?)',
        [req.body.name, req.body.email, password]
      )
      res.json({ isSuccess: true, message: 'insertId:' + ret[0].insertId })
    } catch (err) {
      res.json(registerErrorMessage)
    }
  })

router.get('/:id', verifyToken, async (req, res) => {
  const [rows, fields] = await promisePool.query(
    'select id,name,email,password from users where id = ?',
    [req.params.id]
  )

  // verifiTokeでdecodedの設定確認用(payloadにemailが含まれていることの確認)
  console.log(
    'payload id:',
    req.decoded.id,
    'payload email:',
    req.decoded.email
  )

  let results = { name: rows[0].name }
  return res.json(results)
})

module.exports = router
