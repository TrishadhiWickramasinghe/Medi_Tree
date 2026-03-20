import { useState, useEffect } from 'react';
import { getAllStaff, getAuditLogs } from '../../services/adminService';

const AdminDashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    getAllStaff().then(s => setStaffCount(s.length));
    getAuditLogs().then(l => setRecentLogs(l.slice(0, 5)));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">System management dashboard</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Active Staff Accounts</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{staffCount}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <p className="text-sm text-purple-600">Recent Actions</p>
          <p className="text-3xl font-bold text-purple-700 mt-1">{recentLogs.length}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentLogs.map(log => (
            <div key={log._id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-3">
              <div>
                <span className="font-medium text-gray-800">{log.action}</span>
                <p className="text-gray-500 text-xs mt-0.5">{log.details}</p>
              </div>
              <span className="text-gray-400 text-xs">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;