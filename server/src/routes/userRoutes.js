import express from 'express'
import { authUser,getUserProfile,registerUser,logoutUser,updateUserProfile } from "../controllers/userController.js";
import { jwtGuard } from '../middlewares/jwtMiddleware.js';
import {check, validationResult} from 'express-validator'
const router = express.Router();

router.post('/',  registerUser);
router.post('/auth',[
  check('username').notEmpty(),
  check('password').notEmpty(),
  (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Invalid ${errors[0].path}`);
      // throw new Error(`Invalid ${errors[0].path}`)
    }
    next();
  }
]
,authUser);
router.post('/logout',logoutUser);
router.route('/profile')
.get(jwtGuard,getUserProfile)
.put(jwtGuard,updateUserProfile);


export default router;