import { useState, useEffect } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reports').then(res => setReports(res.data.reports));
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <div>
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Daily treatment statistics and analytics</p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-5 px-4 py-3 bg-slate-800 text-xs font-medium text-slate-400 uppercase tracking-wider">
          <span>Date</span>
          <span>Total Patients</span>
          <span>Treated</span>
          <span>Avg Wait</span>
          <span>Avg Treatment</span>
        </div>
        <div className="divide-y divide-slate-800">
          {reports.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg font-medium">No reports yet</p>
              <p className="text-slate-600 text-sm mt-1">Reports are generated daily</p>
            </div>
          )}
          {reports.map(r => (
            <div key={r._id} className="grid grid-cols-5 px-4 py-4 hover:bg-slate-800/50 transition-colors text-sm">
              <span className="text-white font-medium">{new Date(r.date).toLocaleDateString()}</span>
              <span className="text-slate-300">{r.totalPatients}</span>
              <span className="text-emerald-400">{r.treatedPatients}</span>
              <span className="text-slate-300">{r.averageWaitTime} min</span>
              <span className="text-slate-300">{r.averageTreatmentTime} min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;