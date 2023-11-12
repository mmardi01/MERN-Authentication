import express from 'express'
import { authUser,getUserProfile,registerUser,logoutUser,updateUserProfile } from "../controllers/userController.js";
import { jwtGuard } from '../middlewares/jwtMiddleware.js';
import { signInValidation, signUpValidation } from '../middlewares/formValidation.js';
const router = express.Router();

router.post('/', signUpValidation, registerUser);
router.post('/auth', signInValidation, authUser);
router.post('/logout',logoutUser);
router.route('/profile')
.get(jwtGuard,getUserProfile)
.put(jwtGuard,updateUserProfile);


export default router;