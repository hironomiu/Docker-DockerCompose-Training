const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../config/jwt.config')
const verifyToken = require('../middlewares/verifyToken')

router.post('/', verifyToken, (req, res) => {
  res.clearCookie('token')
  res.json({
    isSuccess: true,
    token: '',
  })
})
module.exports = router
