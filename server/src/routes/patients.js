import express from 'express';
import {
  addPatient, getQueue, getPatient,
  updatePatientStatus, reprioritizePatient, getTreeStructure
} from '../controllers/patientController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.post('/', addPatient);
router.get('/queue', getQueue);
router.get('/tree', getTreeStructure);
router.get('/:id', getPatient);
router.put('/:id/status', updatePatientStatus);
router.put('/:id/reprioritize', reprioritizePatient);

export default router;