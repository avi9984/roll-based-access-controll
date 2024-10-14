
import express from 'express';
import { getUsers, updateUser, deleteUser, getUsersRegisteredLast7Days } from '../controllers/admin';
import { protect, admin } from '../middleware/auth';


const router = express.Router();

router.get('/users', protect, admin, getUsers);
router.put('/user/:id', protect, admin, updateUser);
router.delete('/user/:id', protect, admin, deleteUser);
router.get('/users/recent', protect, admin, getUsersRegisteredLast7Days);


export default router;

