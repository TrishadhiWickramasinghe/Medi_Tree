import api from './api';
import type { Patient } from '../types';

export const addPatient = async (patientData: Partial<Patient>) => {
  const res = await api.post('/patients', patientData);
  return res.data.patient;
};

export const getQueue = async (): Promise<Patient[]> => {
  const res = await api.get('/patients/queue');
  return res.data.queue;
};

export const getPatient = async (id: string): Promise<Patient> => {
  const res = await api.get(`/patients/${id}`);
  return res.data.patient;
};

export const updatePatientStatus = async (
  id: string,
  status: string,
  note?: string
) => {
  const res = await api.put(`/patients/${id}/status`, { status, note });
  return res.data.patient;
};

export const reprioritizePatient = async (
  id: string,
  data: { vitals?: Partial<Patient['vitals']>; severityRating?: number }
) => {
  const res = await api.put(`/patients/${id}/reprioritize`, data);
  return res.data.patient;
};

export const getTreeStructure = async () => {
  const res = await api.get('/patients/tree');
  return res.data.tree;
};