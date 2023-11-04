import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js';
import { generateAccessToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';


// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username});
  if (!user) {
    res.status(404);
    throw new Error('user not found');
  }
  
  const compare = await bcrypt.compare( password, user.password);
  
  if (!compare) {
    res.status(401);
    throw new Error('Incorrect password!');
  }
  
  if (user) {
    const token = generateAccessToken(user._id, user.username,user.email);
    res.status(201);
    res.cookie('jwt',token,{
      httpOnly: true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json({
      _id:user.id,
      username:user.username,
      email:user.email
    });
  }

});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const findUserEmail = await User.findOne({ email });
  const findUserName = await User.findOne({ username });
  
  if (findUserName) {
    res.status(400);
    throw new Error('username already in use.');
  }
  
  if (findUserEmail) {
    res.status(400);
    throw new Error('email already in use.');
  }
  
  const user = await User.create({
    username,
    email,
    password
  });

  if (!user) {
    res.status(400);
    throw new Error('error while creating user')
  }
  
  const token = generateAccessToken(user._id ,user.username,user.email);
  res.status(200);
  res.cookie('jwt',token,{
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge:30 * 24 * 60 * 60 * 1000,
  })
  res.json({
    _id: user._id,
    username: user.username,
    email:user.email,
  });

});

// @desc Logout a user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {

  res.cookie('jwt', '',{
    expires:  new Date(0)
  });
  res.status(200);
  res.send('user logged out successfully');
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(201);
  res.json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findOne({_id:req.user._id});
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password)
      user.password = req.body.password;

    try {

      const updatedUser = await user.save();
      res.status(200);
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      })
    }
    catch(err) {
      res.status(400);
      throw new Error('Failed to update profile.');
    }
  }
  else {
    res.status(400);
    throw new Error('Failed to update profile.');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};