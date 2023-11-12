import {check, validationResult} from 'express-validator'


const signInErrorHandler =  (req, res,next) => {
  const {errors} = validationResult(req);
  if (errors.length) {
    let err = new Error()
    err.statusCode = 400;
    err.message = errors[0].msg;
    next(err);
  }
  else{
    next();
  }
  
}

const signUpErrorHandler = (req, res, next) => {
  const {errors} = validationResult(req);
  if (errors.length) {
    const errorPath = errors[0].path;
    throw new Error(`Invalid ${errorPath}`)
  }
  next()
}

const signInValidation = [
  check('username').notEmpty().withMessage('Username cannot be empty'),
  check('password').notEmpty().withMessage('Password cannot be empty'),
  signInErrorHandler
];



const signUpValidation = [
  check('username')
  .notEmpty()
  .isAlphanumeric()
  .trim(),
  check('email')
  .isEmail()
  .notEmpty(),
  check('password')
  .isLength({
    min:8
  }),
  signUpErrorHandler
]

export { signInValidation, signUpValidation };