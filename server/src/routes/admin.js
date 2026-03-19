import express from 'express';
import {
  createStaff, getAllStaff, deactivateStaff,
  getAuditLogs, getThresholds, updateThresholds
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

router.use(protect, requireAdmin);
router.post('/staff', createStaff);
router.get('/staff', getAllStaff);
router.put('/staff/:id/deactivate', deactivateStaff);
router.get('/logs', getAuditLogs);
router.get('/thresholds', getThresholds);
router.put('/thresholds', updateThresholds);

export default router;