import express from 'express'
import { authUser,getUserProfile,registerUser,logoutUser,updateUserProfile } from "../controllers/userController.js";
import { jwtGuard } from '../middlewares/jwtMiddleware.js';
const router = express.Router();

router.post('/', registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile')
.get(jwtGuard,getUserProfile)
.put(jwtGuard,updateUserProfile);


export default router;