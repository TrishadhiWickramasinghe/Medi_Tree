import AuditLog from '../models/AuditLog.js';

export const logAction = async ({ action, performedBy, targetType, targetId, details, ipAddress }) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetType,
      targetId,
      details,
      ipAddress
    });
  } catch (error) {
    console.error('Audit log failed:', error.message);
  }
};