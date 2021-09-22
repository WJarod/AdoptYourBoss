import express from 'express';
import { getMessage, addMessage }  from '../controllers/chatControllers.js'

const router = express.Router();

router.get('/', getMessage)
router.post('/', addMessage)

export default router