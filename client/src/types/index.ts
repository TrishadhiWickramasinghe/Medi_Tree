export interface Vitals {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
}

export interface StatusHistory {
  status: string;
  updatedBy: string;
  updatedAt: string;
  note: string;
}

export interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  severityRating: 1 | 2 | 3 | 4 | 5;
  symptoms: string[];
  conditions: string[];
  vitals: Vitals;
  priorityScore: number;
  status: 'waiting' | 'in-treatment' | 'treated' | 'discharged';
  arrivalTime: string;
  treatmentStartTime?: string;
  treatmentEndTime?: string;
  estimatedWaitMinutes?: number;
  statusHistory: StatusHistory[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface TreeNode {
  priority: number;
  patientName: string;
  patientId: string;
  height: number;
  balanceFactor: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface CriticalAlert {
  patientId: string;
  name: string;
  severityRating: number;
  waitMinutes: number;
  maxWait: number;
}

export interface StaffMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuditLog {
  _id: string;
  action: string;
  performedBy: { name: string; email: string };
  targetType: string;
  details: string;
  createdAt: string;
}

export interface Thresholds {
  severity5: number;
  severity4: number;
  severity3: number;
  severity2: number;
  severity1: number;
}