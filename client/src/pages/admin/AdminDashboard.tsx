import { useState, useEffect } from 'react';
import { getAllStaff, getAuditLogs } from '../../services/adminService';

const AdminDashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    getAllStaff().then(s => setStaffCount(s.length));
    getAuditLogs().then(l => setRecentLogs(l.slice(0, 6)));
  }, []);

  const actionColor = (action: string) => {
    if (action.includes('CREATED')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (action.includes('DEACTIVATED') || action.includes('DELETED')) return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (action.includes('LOGIN')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="page-container animate-fade-in">
      <div>
        <h1 className="page-title">Admin Overview</h1>
        <p className="page-subtitle">System management and monitoring</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card-glow p-6 border-blue-500/30">
          <p className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-2">Active Staff</p>
          <p className="text-5xl font-black text-white">{staffCount}</p>
          <p className="text-slate-500 text-xs mt-1">registered accounts</p>
        </div>
        <div className="card-glow p-6 border-purple-500/30">
          <p className="text-purple-400 text-xs font-medium uppercase tracking-wider mb-2">Recent Actions</p>
          <p className="text-5xl font-black text-white">{recentLogs.length}</p>
          <p className="text-slate-500 text-xs mt-1">in audit log</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="section-title">Recent Activity</h2>
        <div className="space-y-3">
          {recentLogs.map(log => (
            <div key={log._id} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`badge border ${actionColor(log.action)}`}>{log.action}</span>
                <p className="text-slate-400 text-sm">{log.details}</p>
              </div>
              <span className="text-slate-600 text-xs shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
          {recentLogs.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No activity yet</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;