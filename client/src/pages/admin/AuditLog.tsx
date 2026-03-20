import { useState, useEffect } from 'react';
import { getAuditLogs } from '../../services/adminService';
import type { AuditLog as AuditLogType } from '../../types';

const AuditLog = () => {
  const [logs, setLogs] = useState<AuditLogType[]>([]);

  useEffect(() => { getAuditLogs().then(setLogs); }, []);

  const actionColor = (action: string) => {
    if (action.includes('CREATED')) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (action.includes('DEACTIVATED')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (action.includes('LOGIN')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (action.includes('UPDATED')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-slate-700 text-slate-400 border-slate-600';
  };

  return (
    <div className="page-container animate-fade-in">
      <div>
        <h1 className="page-title">Audit Log</h1>
        <p className="page-subtitle">Complete history of all system actions</p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-4 px-4 py-3 bg-slate-800 text-xs font-medium text-slate-400 uppercase tracking-wider">
          <span>Action</span>
          <span>Performed By</span>
          <span>Details</span>
          <span>Time</span>
        </div>
        <div className="divide-y divide-slate-800">
          {logs.map(log => (
            <div key={log._id} className="grid grid-cols-4 px-4 py-3 hover:bg-slate-800/50 transition-colors animate-slide-in items-center">
              <span className={`badge border w-fit ${actionColor(log.action)}`}>{log.action}</span>
              <span className="text-slate-300 text-sm">{log.performedBy?.name}</span>
              <span className="text-slate-500 text-sm truncate pr-4">{log.details}</span>
              <span className="text-slate-600 text-xs">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-12 text-slate-500">No audit logs yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;