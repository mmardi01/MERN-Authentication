import {check, validationResult} from 'express-validator'


const signInErrorHandler =  (req, res,next) => {
  const {errors} = validationResult(req);
  console.log(req.body.username);
  if (errors.length) {
    const errorPath = errors[0].path
    res.status(400);
    throw new Error(`Invalid ${errorPath}`);
  }
  next();
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
  check('username').notEmpty().trim(),
  check('password').notEmpty(),
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