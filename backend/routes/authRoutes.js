import express from 'express';
import { login, registerUser, logout, sendVerifyOtp, verifyEmail, isAuthenticated, resetPassword, sendResetPasswordOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register',  registerUser);
router.post('/login',  login);
router.post('/logout',  logout);
router.post('/send-verify-otp',  userAuth, sendVerifyOtp);
router.post('/verify-account',  userAuth, verifyEmail);
router.get('/is-auth',  userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetPasswordOtp);
router.post('/reset-password', resetPassword);
export default router;