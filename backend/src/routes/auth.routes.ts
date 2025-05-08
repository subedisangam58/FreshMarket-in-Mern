import { Router } from 'express';
import {
    signup,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    checkAuth
} from '../controllers/auth.controller';

const router = Router();

// Auth Routes
router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/check-auth', checkAuth);
router.patch('/update-profile', updateProfile);

export default router;
