import express from 'express';
import userAuth  from '../middleware/userAuth.js';
import { getUserInfo } from '../controllers/userController.js';

const router = express.Router();
// Route to get user profile
router.get('/data', userAuth, getUserInfo);
// Route to update user profile
// router.put('/update', updateUserProfile);

export default router;