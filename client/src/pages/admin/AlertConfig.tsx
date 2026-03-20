import { useState, useEffect } from 'react';
import { getThresholds, updateThresholds } from '../../services/adminService';
import type { Thresholds } from '../../types';

const AlertConfig = () => {
  const [thresholds, setThresholds] = useState<Thresholds>({ severity5: 5, severity4: 15, severity3: 30, severity2: 60, severity1: 120 });
  const [saved, setSaved] = useState(false);

  useEffect(() => { getThresholds().then(setThresholds); }, []);

  const handleSave = async () => {
    await updateThresholds(thresholds);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const severityConfig = [
    { key: 'severity5', label: 'Severity 5', desc: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { key: 'severity4', label: 'Severity 4', desc: 'Severe', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { key: 'severity3', label: 'Severity 3', desc: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    { key: 'severity2', label: 'Severity 2', desc: 'Minor', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { key: 'severity1', label: 'Severity 1', desc: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Alert Configuration</h1>
        <p className="page-subtitle">Set maximum wait times before a critical alert fires</p>
      </div>

      <div className="card p-6 space-y-3">
        {severityConfig.map(({ key, label, desc, color, bg }) => (
          <div key={key} className={`flex items-center justify-between p-4 rounded-xl border ${bg}`}>
            <div>
              <p className={`font-semibold text-sm ${color}`}>{label} — {desc}</p>
              <p className="text-slate-500 text-xs mt-0.5">Maximum wait time before alert triggers</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number" value={thresholds[key as keyof Thresholds]} min={1}
                onChange={e => setThresholds({...thresholds, [key]: Number(e.target.value)})}
                className="w-20 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-500 text-sm">min</span>
            </div>
          </div>
        ))}

        <button onClick={handleSave}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 mt-2 ${
            saved ? 'bg-emerald-600 text-white' : 'btn-primary'
          }`}>
          {saved ? 'Saved!' : 'Save Thresholds'}
        </button>
      </div>
    </div>
  );
};

export default AlertConfig;