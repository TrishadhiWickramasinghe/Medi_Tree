import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, updatePatientStatus, reprioritizePatient } from '../../services/patientService';
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

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-400">Loading...</p></div>;
  if (!patient) return <div className="text-center py-16 text-gray-400">Patient not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
        <PriorityBadge score={patient.priorityScore} severity={patient.severityRating} />
      </div>

      {/* Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-gray-500">Age</span><p className="font-medium">{patient.age}</p></div>
        <div><span className="text-gray-500">Gender</span><p className="font-medium capitalize">{patient.gender}</p></div>
        <div><span className="text-gray-500">Contact</span><p className="font-medium">{patient.contact || '—'}</p></div>
        <div><span className="text-gray-500">Status</span><p className="font-medium capitalize">{patient.status}</p></div>
        <div><span className="text-gray-500">Arrival</span><p className="font-medium">{new Date(patient.arrivalTime).toLocaleString()}</p></div>
        <div><span className="text-gray-500">Priority Score</span><p className="font-bold text-blue-600">{patient.priorityScore}</p></div>
      </div>

      {/* Vitals */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Vital Signs</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Heart Rate</p><p className="font-bold text-lg">{patient.vitals?.heartRate ?? '—'} <span className="text-xs font-normal text-gray-400">bpm</span></p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">SpO2</p><p className="font-bold text-lg">{patient.vitals?.oxygenSaturation ?? '—'} <span className="text-xs font-normal text-gray-400">%</span></p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Temperature</p><p className="font-bold text-lg">{patient.vitals?.temperature ?? '—'} <span className="text-xs font-normal text-gray-400">°C</span></p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">BP Systolic</p><p className="font-bold text-lg">{patient.vitals?.bloodPressureSystolic ?? '—'} <span className="text-xs font-normal text-gray-400">mmHg</span></p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">BP Diastolic</p><p className="font-bold text-lg">{patient.vitals?.bloodPressureDiastolic ?? '—'} <span className="text-xs font-normal text-gray-400">mmHg</span></p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Resp. Rate</p><p className="font-bold text-lg">{patient.vitals?.respiratoryRate ?? '—'} <span className="text-xs font-normal text-gray-400">/min</span></p></div>
        </div>
      </div>

      {/* Symptoms & Conditions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {patient.symptoms.map(s => <span key={s} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">{s}</span>)}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Pre-existing Conditions</h2>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.length > 0
              ? patient.conditions.map(c => <span key={c} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">{c}</span>)
              : <span className="text-gray-400 text-sm">None recorded</span>
            }
          </div>
        </div>
      </div>

      {/* Actions */}
      {patient.status === 'waiting' && (
        <div className="flex gap-3">
          <button
            onClick={() => handleStatusUpdate('in-treatment')}
            disabled={updating}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            Call for Treatment
          </button>
        </div>
      )}
      {patient.status === 'in-treatment' && (
        <button
          onClick={() => handleStatusUpdate('treated')}
          disabled={updating}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          Mark as Treated
        </button>
      )}
    </div>
  );
};

export default PatientDetail;