import express from 'express';
import { protect } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import Report from '../models/Report.js';

const router = express.Router();

router.use(protect, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 }).limit(30);
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;