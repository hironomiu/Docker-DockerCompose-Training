const router = require("express").Router()
const jwt = require("jsonwebtoken")
const config = require("../config/jwt.config")

router.get("/", (req, res) => {
  console.log("login get")
  res.send("hello")
})

router.post("/", (req, res) => {
  if (
    (req.body.userId == "001" && req.body.passWord == "qwerty") ||
    (req.body.userId == "002" && req.body.passWord == "asdfgh")
  ) {
    const payload = {
      userId: req.body.userId,
    }

    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)

    res.cookie("token", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "none",
      secure: true,
    })

    res.json({
      isSuccess: true,
      token: token,
    })
  } else {
    res.json({
      isSuccess: false,
      message: "ユーザーIDまたはパスワードが違います。",
    })
  }
})
module.exports = router
