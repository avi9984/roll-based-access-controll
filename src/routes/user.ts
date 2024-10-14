import express from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/user';
const router = express.Router();
import { protect } from '../middleware/auth';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', protect, getUserById);


export default router;