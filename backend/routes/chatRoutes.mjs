import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getChat, sendMessage } from '../controllers/chatController';

const router = express.Router();

// Route for getting chat messages between users
router.get('/:userId', requireAuth, getChat);

// Route for sending a message to a user
router.post('/:userId', requireAuth, sendMessage);

export default router;
