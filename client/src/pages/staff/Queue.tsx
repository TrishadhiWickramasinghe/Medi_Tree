import { usePatients } from '../../hooks/usePatients';
import { updatePatientStatus } from '../../services/patientService';
import PatientCard from '../../components/PatientCard';

const Queue = () => {
  const { queue, loading } = usePatients();
  const waiting = queue.filter(p => p.status === 'waiting');

  const handleCallNext = async () => {
    if (waiting.length === 0) return;
    const next = waiting[0];
    await updatePatientStatus(next._id, 'in-treatment', 'Called for treatment');
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Queue</h1>
          <p className="text-gray-500 text-sm mt-1">{waiting.length} patients waiting</p>
        </div>
        <button
          onClick={handleCallNext}
          disabled={waiting.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
        >
          Call Next Patient
        </button>
      </div>

      <div className="space-y-2">
        {waiting.map((patient, i) => (
          <PatientCard key={patient._id} patient={patient} rank={i + 1} />
        ))}
        {waiting.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Queue is empty</p>
            <p className="text-sm mt-1">All patients have been seen</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Queue;