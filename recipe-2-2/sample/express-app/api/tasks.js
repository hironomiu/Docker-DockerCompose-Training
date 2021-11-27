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

module.exports = router
