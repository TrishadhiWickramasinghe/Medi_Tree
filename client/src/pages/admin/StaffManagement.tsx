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

  return (
    <div className="page-container animate-fade-in">
      <div>
        <h1 className="page-title">Staff Management</h1>
        <p className="page-subtitle">Create and manage staff accounts</p>
      </div>

      <div className="card p-6">
        <h2 className="section-title">Add New Staff Member</h2>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}
        <form onSubmit={handleCreate} className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" required className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@hospital.com" type="email" required className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" type="password" required className="input" />
          </div>
          <button type="submit" disabled={loading} className="col-span-3 btn-primary disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Staff Account'}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="section-title">All Staff ({staff.length})</h2>
        <div className="space-y-2">
          {staff.map(s => (
            <div key={s._id} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl animate-slide-in">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{s.name}</p>
                  <p className="text-slate-500 text-xs">{s.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${s.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-500'}`}>
                  {s.isActive ? 'Active' : 'Inactive'}
                </span>
                {s.isActive && (
                  <button onClick={() => deactivateStaff(s._id).then(fetchStaff)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20">
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
          {staff.length === 0 && <p className="text-slate-500 text-sm text-center py-6">No staff accounts yet</p>}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;