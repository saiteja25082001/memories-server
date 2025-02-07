import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Like post route should come before the general update post route
router.patch('/:id/likePost', auth, likePost);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
