import { useState, useEffect } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reports').then(res => setReports(res.data.reports));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Total Patients</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Treated</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Avg Wait (min)</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Avg Treatment (min)</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-gray-400">No reports yet</td></tr>
            )}
            {reports.map(r => (
              <tr key={r._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{r.totalPatients}</td>
                <td className="px-4 py-3">{r.treatedPatients}</td>
                <td className="px-4 py-3">{r.averageWaitTime}</td>
                <td className="px-4 py-3">{r.averageTreatmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;