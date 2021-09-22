import express from 'express';
import { getOffres, createOffres,getOffresRecentDate,deleteOffre, getOffresJob, getOffresCreator, updateOffre ,getOffre} from '../controllers/offresControllers.js';

const router = express.Router();

router.get('/', getOffres);
router.get('/offre/:id', getOffre);
router.get('/:id', getOffre);
router.get('/recentDate', getOffresRecentDate)
router.get('/job/:job', getOffresJob)
router.get('/admin/delete/:id', deleteOffre)
router.get('/creator/:creator', getOffresCreator)
router.post('/', createOffres);
router.post('/update/:id', updateOffre)


export default router;