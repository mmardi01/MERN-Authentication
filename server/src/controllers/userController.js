import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js';
import { generateAccessToken } from '../utils/generateToken.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Auth User',
  });
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;
  console.log(req.headers);
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
  
  const token = generateAccessToken(user.username,user.email);
  res.status(200).setHeader('Authorization',`Bearer ${token}`).json({
    id: user._id,
    username: user.username,
    email:user.email
  })

});

// @desc Logout a user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'User Loged out',
  });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'User profile',
  });
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Update user profile',
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
};