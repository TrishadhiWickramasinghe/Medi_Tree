import { useState, useEffect } from 'react';
import { getAllStaff, createStaff, deactivateStaff } from '../../services/adminService';
import type { StaffMember } from '../../types';

const StaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStaff = () => getAllStaff().then(setStaff);
  useEffect(() => { fetchStaff(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createStaff(form);
      setForm({ name: '', email: '', password: '' });
      fetchStaff();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create staff');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    await deactivateStaff(id);
    fetchStaff();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Add New Staff</h2>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
        <form onSubmit={handleCreate} className="grid grid-cols-3 gap-4">
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" type="email" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" type="password" required className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={loading} className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors">
            {loading ? 'Creating...' : 'Create Staff Account'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">All Staff ({staff.length})</h2>
        <div className="space-y-2">
          {staff.map(s => (
            <div key={s._id} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-800 text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {s.isActive ? 'Active' : 'Inactive'}
                </span>
                {s.isActive && (
                  <button onClick={() => handleDeactivate(s._id)} className="text-red-500 hover:text-red-700 text-xs">
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;