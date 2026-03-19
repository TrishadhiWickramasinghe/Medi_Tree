import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetType: {
    type: String,
    enum: ['patient', 'user', 'system', 'report'],
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId
  },
  details: {
    type: String
  },
  ipAddress: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);