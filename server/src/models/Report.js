import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  totalPatients: {
    type: Number,
    default: 0
  },
  treatedPatients: {
    type: Number,
    default: 0
  },
  averageWaitTime: {
    type: Number,
    default: 0
  },
  averageTreatmentTime: {
    type: Number,
    default: 0
  },
  severityDistribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  peakHour: {
    type: Number
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);