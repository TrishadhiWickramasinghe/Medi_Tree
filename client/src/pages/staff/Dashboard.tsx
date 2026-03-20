import { usePatients } from '../../hooks/usePatients';
import AVLTreeVisualizer from '../../components/AVLTreeVisualizer';
import PatientCard from '../../components/PatientCard';

const Dashboard = () => {
  const { queue, tree, loading } = usePatients();
  const waiting = queue.filter(p => p.status === 'waiting');
  const critical = queue.filter(p => p.severityRating === 5 && p.status === 'waiting');
  const inTreatment = queue.filter(p => p.status === 'in-treatment');

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Live emergency room triage overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card animate-fade-in">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Waiting</p>
          <p className="text-4xl font-black text-white">{waiting.length}</p>
          <p className="text-slate-500 text-xs">patients in queue</p>
        </div>
        <div className="card-glow p-5 flex flex-col gap-2 border-red-500/30 animate-fade-in">
          <p className="text-red-400 text-xs font-medium uppercase tracking-wider">Critical</p>
          <p className="text-4xl font-black text-red-400">{critical.length}</p>
          <p className="text-slate-500 text-xs">severity 5 patients</p>
        </div>
        <div className="card-glow p-5 flex flex-col gap-2 border-emerald-500/30 animate-fade-in">
          <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider">In Treatment</p>
          <p className="text-4xl font-black text-emerald-400">{inTreatment.length}</p>
          <p className="text-slate-500 text-xs">currently being seen</p>
        </div>
        <div className="card-glow p-5 flex flex-col gap-2 border-blue-500/30 animate-fade-in">
          <p className="text-blue-400 text-xs font-medium uppercase tracking-wider">Next Patient</p>
          <p className="text-lg font-black text-blue-400 truncate">{waiting[0]?.name ?? '—'}</p>
          <p className="text-slate-500 text-xs">highest priority</p>
        </div>
      </div>

      {/* AVL Tree */}
      <div className="animate-fade-in">
        <h2 className="section-title">Live AVL Tree Visualization</h2>
        <AVLTreeVisualizer tree={tree} />
      </div>

      {/* Queue */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Priority Queue</h2>
          <span className="badge bg-slate-800 text-slate-400">{waiting.length} waiting</span>
        </div>
        <div className="space-y-2">
          {waiting.slice(0, 6).map((patient, i) => (
            <PatientCard key={patient._id} patient={patient} rank={i + 1} />
          ))}
          {waiting.length === 0 && (
            <div className="card p-12 text-center">
              <p className="text-slate-500 text-lg font-medium">Queue is empty</p>
              <p className="text-slate-600 text-sm mt-1">No patients currently waiting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;