const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const promisePool = require('../config/db')
const {
  validator,
  checkTasksTitleIsEmpty,
  checkTasksTaskIsEmpty,
  checkTasksStatusIsEmpty,
} = require('../middlewares/validator')

router
  .route('/')
  .get(verifyToken, async (req, res) => {
    const [rows, fields] = await promisePool.query(
      'select a.id,a.title,a.task,a.status,b.name as status_name from tasks a inner join task_status b on a.status = b.id where a.user_id = ?',
      [req.decoded.id]
    )
    return res.json(rows)
  })
  .post(
    [checkTasksTitleIsEmpty, checkTasksTaskIsEmpty, checkTasksStatusIsEmpty],
    validator,
    verifyToken,
    async (req, res) => {
      try {
        const ret = await promisePool.query(
          'insert into tasks(title,task,status,user_id) values(?,?,?,?)',
          [
            req.body.task.title,
            req.body.task.task,
            req.body.task.status,
            req.decoded.id,
          ]
        )
        return res.json({ isSuccess: true, message: 'ok' })
      } catch (err) {
        console.log(err)
        return res.json({ isSuccess: false, message: 'INSERT ERROR' })
      }
    }
  )

router
  .route('/:id')
  .delete(verifyToken, async (req, res) => {
    // 自分のレコード以外は削除できない処理を今後追加
    try {
      const ret = await promisePool.query('delete from tasks where id = ?', [
        req.params.id,
      ])
      console.log(ret)
    } catch (err) {
      return res.json({ isSuccess: false, message: '削除エラー' })
    }
    return res.json({ isSuccess: true, message: 'ok' })
  })
  .put(verifyToken, async (req, res) => {
    // 自分のレコード以外は削除できない処理を今後追加
    console.log('task update start')
    try {
      console.log(req.body.task, req.params.id)
      const ret = await promisePool.query(
        'update tasks set title = ? ,task = ? ,status = ? where id = ?',
        [
          req.body.task.title,
          req.body.task.task,
          parseInt(req.body.task.status),
          req.params.id,
        ]
      )
      console.log(ret)
    } catch (err) {
      console.log(err)
      return res.json({ isSuccess: false, message: '更新エラー' })
    }
    return res.json({ isSuccess: true, message: 'ok' })
  })

module.exports = router
