const { check, validationResult } = require('express-validator')

// users validator
const checkNameIsEmpty = check('name').not().isEmpty().withMessage('name empty')
const checkEmailIsEmpty = check('email')
  .not()
  .isEmpty()
  .withMessage('email empty')
const checkEmailIsEmail = check('email')
  .isEmail()
  .withMessage('email not format')
const checkPasswordIsEmpty = check('password')
  .not()
  .isEmpty()
  .withMessage('password empty')

// tasks validator
const checkTasksTitleIsEmpty = check('task.title')
  .not()
  .isEmpty()
  .withMessage('task.title empty')
const checkTasksTaskIsEmpty = check('task.task')
  .not()
  .isEmpty()
  .withMessage('task.task empty')
const checkTasksStatusIsEmpty = check('task.status')
  .not()
  .isEmpty()
  .withMessage('task.status empty')

function validator(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const messages = errors.array()
    return res.status(422).json({ isSuccess: false, message: messages[0].msg })
  }
  next()
}

exports.checkNameIsEmpty = checkNameIsEmpty
exports.checkEmailIsEmpty = checkEmailIsEmpty
exports.checkEmailIsEmail = checkEmailIsEmail
exports.checkPasswordIsEmpty = checkPasswordIsEmpty

exports.checkTasksTitleIsEmpty = checkTasksTitleIsEmpty
exports.checkTasksTaskIsEmpty = checkTasksTaskIsEmpty
exports.checkTasksStatusIsEmpty = checkTasksStatusIsEmpty

exports.validator = validator
