import { usePatients } from '../../hooks/usePatients';
import { updatePatientStatus } from '../../services/patientService';
import PatientCard from '../../components/PatientCard';

const Queue = () => {
  const { queue, loading } = usePatients();
  const waiting = queue.filter(p => p.status === 'waiting');
  const inTreatment = queue.filter(p => p.status === 'in-treatment');

  const handleCallNext = async () => {
    if (waiting.length === 0) return;
    await updatePatientStatus(waiting[0]._id, 'in-treatment', 'Called for treatment');
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="page-container">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="page-title">Patient Queue</h1>
          <p className="page-subtitle">{waiting.length} patients waiting · {inTreatment.length} in treatment</p>
        </div>
        <button onClick={handleCallNext} disabled={waiting.length === 0} className="btn-primary disabled:opacity-40">
          Call Next Patient
        </button>
      </div>

      {inTreatment.length > 0 && (
        <div className="animate-fade-in">
          <h2 className="section-title text-emerald-400">Currently In Treatment</h2>
          <div className="space-y-2">
            {inTreatment.map((p, i) => <PatientCard key={p._id} patient={p} rank={i + 1} />)}
          </div>
        </div>
      )}

      <div className="animate-fade-in">
        <h2 className="section-title">Waiting Queue</h2>
        <div className="space-y-2">
          {waiting.map((patient, i) => (
            <PatientCard key={patient._id} patient={patient} rank={i + 1} />
          ))}
          {waiting.length === 0 && (
            <div className="card p-16 text-center">
              <p className="text-slate-400 text-2xl font-bold mb-2">All clear</p>
              <p className="text-slate-600 text-sm">No patients currently waiting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;