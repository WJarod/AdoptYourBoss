import express from 'express';
import { addFriend, getFriendById, updateStatusAmis } from '../controllers/amisControllers.js'

const router = express.Router();

router.get('/:User1', getFriendById)
router.post('/', addFriend)
router.post('/update/:id', updateStatusAmis)


export default router;