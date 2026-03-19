import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  contact: {
    type: String,
    trim: true
  },
  severityRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  symptoms: [{
    type: String
  }],
  conditions: [{
    type: String
  }],
  vitals: {
    heartRate: { type: Number },
    bloodPressureSystolic: { type: Number },
    bloodPressureDiastolic: { type: Number },
    temperature: { type: Number },
    oxygenSaturation: { type: Number },
    respiratoryRate: { type: Number }
  },
  priorityScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['waiting', 'in-treatment', 'treated', 'discharged'],
    default: 'waiting'
  },
  arrivalTime: {
    type: Date,
    default: Date.now
  },
  treatmentStartTime: {
    type: Date
  },
  treatmentEndTime: {
    type: Date
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  statusHistory: [{
    status: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now },
    note: String
  }]
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);