import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPatient } from '../../services/patientService';

const SYMPTOMS = ['Chest pain', 'Difficulty breathing', 'Head trauma', 'Abdominal pain', 'Fracture', 'Fever', 'Unconscious', 'Bleeding'];
const CONDITIONS = ['Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'Cancer', 'Kidney disease'];

const AddPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', age: '', gender: 'male', contact: '',
    severityRating: '3', symptoms: [] as string[], conditions: [] as string[],
    vitals: { heartRate: '', bloodPressureSystolic: '', bloodPressureDiastolic: '', temperature: '', oxygenSaturation: '', respiratoryRate: '' }
  });

  const toggleItem = (list: 'symptoms' | 'conditions', item: string) => {
    setForm(prev => ({
      ...prev,
      [list]: prev[list].includes(item) ? prev[list].filter(i => i !== item) : [...prev[list], item]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addPatient({
        ...form, age: Number(form.age),
        gender: form.gender as 'male' | 'female' | 'other',
        severityRating: Number(form.severityRating) as any,
        vitals: Object.fromEntries(Object.entries(form.vitals).map(([k, v]) => [k, Number(v)])) as any
      });
      navigate('/queue');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register patient');
    } finally {
      setLoading(false);
    }
  };

  const severityConfig: Record<number, { label: string; color: string; active: string }> = {
    1: { label: 'Low', color: 'border-slate-700 text-slate-400 hover:border-emerald-500', active: 'border-emerald-500 bg-emerald-500/20 text-emerald-400' },
    2: { label: 'Minor', color: 'border-slate-700 text-slate-400 hover:border-blue-500', active: 'border-blue-500 bg-blue-500/20 text-blue-400' },
    3: { label: 'Moderate', color: 'border-slate-700 text-slate-400 hover:border-yellow-500', active: 'border-yellow-500 bg-yellow-500/20 text-yellow-400' },
    4: { label: 'Severe', color: 'border-slate-700 text-slate-400 hover:border-orange-500', active: 'border-orange-500 bg-orange-500/20 text-orange-400' },
    5: { label: 'Critical', color: 'border-slate-700 text-slate-400 hover:border-red-500', active: 'border-red-500 bg-red-500/20 text-red-400' },
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Register New Patient</h1>
        <p className="page-subtitle">Fill in patient details to calculate priority score</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-white">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Full Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input" placeholder="Patient full name" required />
            </div>
            <div>
              <label className="label">Age</label>
              <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="input" placeholder="Age" required min="0" max="120" />
            </div>
            <div>
              <label className="label">Gender</label>
              <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="input">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Contact Number</label>
              <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="input" placeholder="Phone number" />
            </div>
          </div>
        </div>

        {/* Severity */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-4">Severity Rating</h2>
          <div className="grid grid-cols-5 gap-3">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setForm({...form, severityRating: String(n)})}
                className={`py-4 rounded-xl text-sm font-bold border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                  form.severityRating === String(n) ? severityConfig[n].active : severityConfig[n].color
                }`}>
                <span className="text-2xl font-black">{n}</span>
                <span className="text-xs">{severityConfig[n].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vitals */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-white">Vital Signs</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'heartRate', label: 'Heart Rate', unit: 'bpm' },
              { key: 'oxygenSaturation', label: 'SpO2', unit: '%' },
              { key: 'bloodPressureSystolic', label: 'BP Systolic', unit: 'mmHg' },
              { key: 'bloodPressureDiastolic', label: 'BP Diastolic', unit: 'mmHg' },
              { key: 'temperature', label: 'Temperature', unit: '°C' },
              { key: 'respiratoryRate', label: 'Respiratory Rate', unit: '/min' },
            ].map(({ key, label, unit }) => (
              <div key={key}>
                <label className="label">{label} <span className="text-slate-600">({unit})</span></label>
                <input type="number"
                  value={form.vitals[key as keyof typeof form.vitals]}
                  onChange={e => setForm({...form, vitals: {...form.vitals, [key]: e.target.value}})}
                  className="input" placeholder="—" />
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-3">Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map(s => (
              <button key={s} type="button" onClick={() => toggleItem('symptoms', s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-150 ${
                  form.symptoms.includes(s)
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-3">Pre-existing Conditions</h2>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map(c => (
              <button key={c} type="button" onClick={() => toggleItem('conditions', c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-150 ${
                  form.conditions.includes(c)
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}>{c}</button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-50">
          {loading ? 'Calculating Priority & Registering...' : 'Register Patient'}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;