const { check, validationResult } = require('express-validator/check')

const checkEmailIsEmpty = check('email').not().isEmpty().withMessage('email empty')
const checkEmailIsEmail = check('email').isEmail().withMessage('email not format')
const checkPasswordIsEmpty = check('password').not().isEmpty().withMessage('password empty')

const checkHogeIsEmpty = check('hoge').not().isEmpty().withMessage('hoge empty')

function validator(req,res,next){
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('empty:',errors)
    return res
      .status(422)
      .json({ isSuccess: false, message: errors.array() })
  }
  next()
}

exports.checkEmailIsEmpty = checkEmailIsEmpty
exports.checkEmailIsEmail = checkEmailIsEmail
exports.checkPasswordIsEmpty = checkPasswordIsEmpty

exports.checkHogeIsEmpty = checkHogeIsEmpty
exports.validator = validator