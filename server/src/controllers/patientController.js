import Patient from '../models/Patient.js';
import { avlTree } from '../datastructures/AVLTree.js';
import { calculatePriority } from '../datastructures/PriorityCalculator.js';
import { estimateWaitTime } from '../utils/waitTimeEstimator.js';
import { logAction } from '../utils/auditLogger.js';
import { EVENTS } from '../socket/events.js';

let io;
export const setIO = (socketIO) => { io = socketIO; };

const emitUpdate = () => {
  if (io) {
    io.emit(EVENTS.QUEUE_UPDATED, avlTree.getSortedQueue());
    io.emit(EVENTS.TREE_UPDATED, avlTree.getTreeStructure());
  }
};

// @POST /api/patients
export const addPatient = async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      arrivalTime: new Date(),
      registeredBy: req.user._id
    };

    patientData.priorityScore = calculatePriority({
      ...patientData,
      ...patientData.vitals
    });

    const patient = await Patient.create(patientData);
    avlTree.insert(patient);

    await logAction({
      action: 'PATIENT_ADDED',
      performedBy: req.user._id,
      targetType: 'patient',
      targetId: patient._id,
      details: `Patient ${patient.name} added with priority ${patient.priorityScore}`,
      ipAddress: req.ip
    });

    emitUpdate();

    res.status(201).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/patients/queue
export const getQueue = async (req, res) => {
  try {
    const queue = avlTree.getSortedQueue();
    const queueWithWaitTime = queue.map((patient) => ({
      ...patient.toObject ? patient.toObject() : patient,
      estimatedWaitMinutes: estimateWaitTime(patient.priorityScore)
    }));

    res.json({ success: true, queue: queueWithWaitTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/patients/:id
export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('registeredBy', 'name');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/patients/:id/status
export const updatePatientStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.status = status;
    patient.statusHistory.push({
      status,
      updatedBy: req.user._id,
      note
    });

    if (status === 'in-treatment') patient.treatmentStartTime = new Date();
    if (status === 'treated') {
      patient.treatmentEndTime = new Date();
      avlTree.delete(patient._id);
    }

    await patient.save();

    await logAction({
      action: 'PATIENT_STATUS_UPDATED',
      performedBy: req.user._id,
      targetType: 'patient',
      targetId: patient._id,
      details: `Patient ${patient.name} status changed to ${status}`,
      ipAddress: req.ip
    });

    emitUpdate();
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/patients/:id/reprioritize
export const reprioritizePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    // Update vitals if provided
    if (req.body.vitals) patient.vitals = { ...patient.vitals.toObject(), ...req.body.vitals };
    if (req.body.severityRating) patient.severityRating = req.body.severityRating;

    // Recalculate priority
    const newScore = calculatePriority({
      ...patient.toObject(),
      ...patient.vitals.toObject(),
      arrivalTime: patient.arrivalTime
    });

    // Remove old node and reinsert with new score
    avlTree.delete(patient._id);
    patient.priorityScore = newScore;
    await patient.save();
    avlTree.insert(patient);

    await logAction({
      action: 'PATIENT_REPRIORITIZED',
      performedBy: req.user._id,
      targetType: 'patient',
      targetId: patient._id,
      details: `Patient ${patient.name} reprioritized to score ${newScore}`,
      ipAddress: req.ip
    });

    emitUpdate();
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/patients/tree
export const getTreeStructure = async (req, res) => {
  try {
    const tree = avlTree.getTreeStructure();
    res.json({ success: true, tree });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};