import express from 'express';
import { createUsers, getUsers, getUserConnexion, getUser, deleteUser, updateUser, getUsersJob, updateStatus } from "../controllers/usersControllers.js"

const router = express.Router();

router.get('/', getUsers)
router.post('/', createUsers);
router.post('/connexion', getUserConnexion)
router.get('/:id', getUser)
router.get('/job/:job', getUsersJob)
// router.get('/recentDate', getUsersRecentDate)  
router.get('/delete/:id', deleteUser)
router.post('/update/:id', updateUser)
router.post('/:id', updateStatus)

export default router;