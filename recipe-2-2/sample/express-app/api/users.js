const router = require("express").Router()
const verifyToken = require("../middlewares/verifyToken")

router.get("/", verifyToken, (req, res) => {
  let results = {}
  if (req.decoded.userId == "001") {
    results = {
      userId: req.decoded.userId,
      name: "太郎",
    }
  } else if (req.decoded.userId == "002") {
    results = {
      userId: req.decoded.userId,
      name: "二郎",
    }
  }

  res.json(results)
})
module.exports = router
