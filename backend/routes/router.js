import express from 'express';
import { addPost, getPosts } from '../service/post.service.js';
import { register, login, user, verifyToken } from '../service/login.service.js';



const router = express.Router();

router.post('/posts', addPost);
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/user', verifyToken, user);
router.get('/posts', getPosts)


export default router;