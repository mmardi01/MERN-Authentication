import {check, validationResult} from 'express-validator'


const signInErrorHandler =  (req, res,next) => {
  const {errors} = validationResult(req);
  if (errors.length) {
    let err = new Error()
    err.statusCode = 400;
    err.message = errors[0].msg;
    next(err);
    return;
  }
  next();
}

const signUpErrorHandler = (req, res, next) => {
  const {errors} = validationResult(req);
  if (errors.length) {
    res.status(400);
    res.json(errors[0]);
    return ;
  }
  next()
}

const signInValidation = [
  check('username')
  .notEmpty()
  .withMessage('Username cannot be empty'),
  check('password')
  .notEmpty()
  .withMessage('Password cannot be empty'),
  signInErrorHandler
];



const signUpValidation = [
  check('username')
  .notEmpty()
  .withMessage('username cannot be empty')
  .isAlphanumeric()
  .withMessage('invalid  username')
  .trim()
  .isLength({
    min:4
  }).withMessage('username must have at least 4 charcters'),
  check('email')
  .isEmail()
  .withMessage('invalid email')
  .notEmpty(),
  check('password')
  .isLength({
    min:8
  }).withMessage('password must have at least 8 characters'),
  signUpErrorHandler
]

export { signInValidation, signUpValidation };