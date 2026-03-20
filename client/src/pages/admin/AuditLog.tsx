import { useState, useEffect } from 'react';
import { getAuditLogs } from '../../services/adminService';
import type { AuditLog as AuditLogType } from '../../types';

const AuditLog = () => {
  const [logs, setLogs] = useState<AuditLogType[]>([]);

  useEffect(() => { getAuditLogs().then(setLogs); }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Action</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Performed By</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Details</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{log.action}</td>
                <td className="px-4 py-3 text-gray-600">{log.performedBy?.name}</td>
                <td className="px-4 py-3 text-gray-500">{log.details}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;