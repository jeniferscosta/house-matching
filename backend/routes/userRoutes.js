import express from 'express';
import { registerUser, updateUserProfile } from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/update-profile', upload.single('profileImage'), updateUserProfile);
router.post('/login', loginUser);

export default router;