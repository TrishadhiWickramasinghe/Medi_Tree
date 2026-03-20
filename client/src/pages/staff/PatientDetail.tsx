import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, updatePatientStatus } from '../../services/patientService';
import type { Patient } from '../../types';
import PriorityBadge from '../../components/PriorityBadge';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) getPatient(id).then(setPatient).finally(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async (status: string) => {
    if (!patient) return;
    setUpdating(true);
    try {
      const updated = await updatePatientStatus(patient._id, status);
      setPatient(updated);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!patient) return <div className="text-center py-16 text-slate-500">Patient not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">{patient.name}</h1>
        <PriorityBadge score={patient.priorityScore} severity={patient.severityRating} />
      </div>

      {/* Info */}
      <div className="card p-6 grid grid-cols-3 gap-4 text-sm">
        {[
          { label: 'Age', value: patient.age },
          { label: 'Gender', value: patient.gender },
          { label: 'Contact', value: patient.contact || '—' },
          { label: 'Status', value: patient.status },
          { label: 'Arrival', value: new Date(patient.arrivalTime).toLocaleString() },
          { label: 'Priority Score', value: patient.priorityScore, highlight: true },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="bg-slate-800 rounded-xl p-3">
            <p className="text-slate-500 text-xs mb-1">{label}</p>
            <p className={`font-semibold capitalize ${highlight ? 'text-blue-400 text-lg' : 'text-white'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Vitals */}
      <div className="card p-6">
        <h2 className="font-semibold text-white mb-4">Vital Signs</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Heart Rate', value: patient.vitals?.heartRate, unit: 'bpm' },
            { label: 'SpO2', value: patient.vitals?.oxygenSaturation, unit: '%' },
            { label: 'Temperature', value: patient.vitals?.temperature, unit: '°C' },
            { label: 'BP Systolic', value: patient.vitals?.bloodPressureSystolic, unit: 'mmHg' },
            { label: 'BP Diastolic', value: patient.vitals?.bloodPressureDiastolic, unit: 'mmHg' },
            { label: 'Resp. Rate', value: patient.vitals?.respiratoryRate, unit: '/min' },
          ].map(({ label, value, unit }) => (
            <div key={label} className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-500 text-xs mb-1">{label}</p>
              <p className="text-white font-bold text-xl">{value ?? '—'} <span className="text-slate-500 text-xs font-normal">{unit}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Symptoms & Conditions */}
      <div className="card p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-white mb-3">Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {patient.symptoms.length > 0
              ? patient.symptoms.map(s => <span key={s} className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">{s}</span>)
              : <span className="text-slate-500 text-sm">None recorded</span>}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-3">Pre-existing Conditions</h2>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.length > 0
              ? patient.conditions.map(c => <span key={c} className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-500/30">{c}</span>)
              : <span className="text-slate-500 text-sm">None recorded</span>}
          </div>
        </div>
      </div>

      {/* Actions */}
      {patient.status === 'waiting' && (
        <button onClick={() => handleStatusUpdate('in-treatment')} disabled={updating}
          className="btn-primary w-full py-4 text-base disabled:opacity-50">
          Call for Treatment
        </button>
      )}
      {patient.status === 'in-treatment' && (
        <button onClick={() => handleStatusUpdate('treated')} disabled={updating}
          className="btn-success w-full py-4 text-base disabled:opacity-50">
          Mark as Treated
        </button>
      )}
    </div>
  );
};

export default PatientDetail;