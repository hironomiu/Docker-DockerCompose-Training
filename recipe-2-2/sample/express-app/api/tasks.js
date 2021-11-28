const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db')

router.route('/').get(verifyToken, async (req, res) => {
  const [rows, fields] = await promisePool.query(
    'select a.id,a.title,a.task,b.name as status from tasks a inner join task_status b on a.user_id = b.id where a.user_id = ?',
    [req.decoded.id]
  )
  return res.json(rows)
})

router.route('/:id').delete(async (req, res) => {
  try {
    const ret = await promisePool.query('delete from tasks where id = ?', [
      req.params.id,
    ])
    console.log(ret)
  } catch (err) {
    res.json({ isSuccess: false, message: '削除エラー' })
  }
  return res.json({ isSuccess: true, message: 'ok' })
})

module.exports = router
