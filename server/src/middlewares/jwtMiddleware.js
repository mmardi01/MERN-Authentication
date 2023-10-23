import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
dotenv.config()
const jwtGuard = expressAsyncHandler(async (req, res, next) => {
  
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token,process.env.TOKEN_SECRET);
      req.user = await User.find({_id:decode.id}).select('-password');
      next();
    }
    catch(err) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }
  else {
    res.status(401);
    throw new Error('Not authorized, invalid token');
  }
})

export { jwtGuard };