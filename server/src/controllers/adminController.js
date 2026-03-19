import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { logAction } from '../utils/auditLogger.js';
import { defaultThresholds } from '../config/thresholds.js';

let currentThresholds = { ...defaultThresholds };

// @POST /api/admin/staff
export const createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password, role: 'staff' });

    await logAction({
      action: 'STAFF_CREATED',
      performedBy: req.user._id,
      targetType: 'user',
      targetId: user._id,
      details: `Staff account created for ${name}`,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/admin/staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password');
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/admin/staff/:id/deactivate
export const deactivateStaff = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = false;
    await user.save();

    await logAction({
      action: 'STAFF_DEACTIVATED',
      performedBy: req.user._id,
      targetType: 'user',
      targetId: user._id,
      details: `Staff account deactivated for ${user.name}`,
      ipAddress: req.ip
    });

    res.json({ success: true, message: 'Staff account deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/admin/logs
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('performedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/admin/thresholds
export const getThresholds = async (req, res) => {
  res.json({ success: true, thresholds: currentThresholds });
};

// @PUT /api/admin/thresholds
export const updateThresholds = async (req, res) => {
  try {
    currentThresholds = { ...currentThresholds, ...req.body };

    await logAction({
      action: 'THRESHOLDS_UPDATED',
      performedBy: req.user._id,
      targetType: 'system',
      details: `Alert thresholds updated`,
      ipAddress: req.ip
    });

    res.json({ success: true, thresholds: currentThresholds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};