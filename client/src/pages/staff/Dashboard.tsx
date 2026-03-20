import { usePatients } from '../../hooks/usePatients';
import AVLTreeVisualizer from '../../components/AVLTreeVisualizer';
import PatientCard from '../../components/PatientCard';

const Dashboard = () => {
  const { queue, tree, loading } = usePatients();

  const waiting = queue.filter(p => p.status === 'waiting');
  const critical = queue.filter(p => p.severityRating === 5);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Live emergency room triage overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Patients Waiting</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{waiting.length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-sm text-red-600">Critical (Severity 5)</p>
          <p className="text-3xl font-bold text-red-700 mt-1">{critical.length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-sm text-blue-600">Next Patient</p>
          <p className="text-lg font-bold text-blue-700 mt-1 truncate">
            {waiting[0]?.name ?? '—'}
          </p>
        </div>
      </div>

      {/* AVL Tree */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Live AVL Tree</h2>
        <AVLTreeVisualizer tree={tree} />
      </div>

      {/* Top 5 queue */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Priority Queue (Top 5)</h2>
        <div className="space-y-2">
          {waiting.slice(0, 5).map((patient, i) => (
            <PatientCard key={patient._id} patient={patient} rank={i + 1} />
          ))}
          {waiting.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-8">No patients waiting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;