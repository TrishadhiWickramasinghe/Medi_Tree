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
    severityRating: '3',
    symptoms: [] as string[],
    conditions: [] as string[],
    vitals: {
      heartRate: '', bloodPressureSystolic: '', bloodPressureDiastolic: '',
      temperature: '', oxygenSaturation: '', respiratoryRate: ''
    }
  });

  const toggleItem = (list: 'symptoms' | 'conditions', item: string) => {
    setForm(prev => ({
      ...prev,
      [list]: prev[list].includes(item)
        ? prev[list].filter(i => i !== item)
        : [...prev[list], item]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addPatient({
        ...form,
        age: Number(form.age),
        gender: form.gender as 'male' | 'female' | 'other',
        severityRating: Number(form.severityRating) as any,
        vitals: Object.fromEntries(
          Object.entries(form.vitals).map(([k, v]) => [k, Number(v)])
        ) as any
      });
      navigate('/queue');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Register New Patient</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required min="0" max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Severity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Severity Rating</h2>
          <div className="flex gap-3">
            {[1,2,3,4,5].map(n => (
              <button
                key={n} type="button"
                onClick={() => setForm({...form, severityRating: String(n)})}
                className={`flex-1 py-3 rounded-lg text-sm font-bold border-2 transition-all ${
                  form.severityRating === String(n)
                    ? n === 5 ? 'bg-red-600 border-red-600 text-white'
                    : n === 4 ? 'bg-orange-500 border-orange-500 text-white'
                    : n === 3 ? 'bg-yellow-500 border-yellow-500 text-white'
                    : n === 2 ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
            <span>Low</span><span>Critical</span>
          </div>
        </div>

        {/* Vitals */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-800">Vital Signs</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'heartRate', label: 'Heart Rate (bpm)' },
              { key: 'oxygenSaturation', label: 'SpO2 (%)' },
              { key: 'bloodPressureSystolic', label: 'BP Systolic (mmHg)' },
              { key: 'bloodPressureDiastolic', label: 'BP Diastolic (mmHg)' },
              { key: 'temperature', label: 'Temperature (°C)' },
              { key: 'respiratoryRate', label: 'Respiratory Rate' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="number"
                  value={form.vitals[key as keyof typeof form.vitals]}
                  onChange={e => setForm({...form, vitals: {...form.vitals, [key]: e.target.value}})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-3">Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map(s => (
              <button
                key={s} type="button"
                onClick={() => toggleItem('symptoms', s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  form.symptoms.includes(s)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-600 hover:border-blue-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-3">Pre-existing Conditions</h2>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map(c => (
              <button
                key={c} type="button"
                onClick={() => toggleItem('conditions', c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  form.conditions.includes(c)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-600 hover:border-purple-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering Patient...' : 'Register Patient'}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;