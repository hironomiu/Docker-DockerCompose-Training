const router = require('express').Router()

router.get('/', (req, res) => {
  const csrfToken = req.csrfToken()
  res.json({ csrfToken: csrfToken })
})

module.exports = router
