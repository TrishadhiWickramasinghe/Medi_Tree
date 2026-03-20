import api from './api';
import type { Thresholds } from '../types';

export const createStaff = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post('/admin/staff', data);
  return res.data.user;
};

export const getAllStaff = async () => {
  const res = await api.get('/admin/staff');
  return res.data.staff;
};

export const deactivateStaff = async (id: string) => {
  const res = await api.put(`/admin/staff/${id}/deactivate`);
  return res.data;
};

export const getAuditLogs = async () => {
  const res = await api.get('/admin/logs');
  return res.data.logs;
};

export const getThresholds = async (): Promise<Thresholds> => {
  const res = await api.get('/admin/thresholds');
  return res.data.thresholds;
};

export const updateThresholds = async (thresholds: Thresholds) => {
  const res = await api.put('/admin/thresholds', thresholds);
  return res.data.thresholds;
};