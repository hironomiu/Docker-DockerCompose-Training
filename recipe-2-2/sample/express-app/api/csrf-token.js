const router = require("express").Router()

router.get("/", (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

module.exports = router
