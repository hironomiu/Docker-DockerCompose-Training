const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db.js')

router.get('/', verifyToken, (req, res) => {
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

  res.json(results)
})

router.get('/:id', verifyToken, async (req, res) => {
  const [rows, fields] = await promisePool.query(
    'select id,name,email,password from users where id = ?',
    [req.params.id]
  )

  let results = { name: rows[0].name }
  res.json(results)
})

module.exports = router
