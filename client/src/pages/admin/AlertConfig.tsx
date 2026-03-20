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

  const labels: Record<string, string> = {
    severity5: 'Severity 5 — Critical (minutes)',
    severity4: 'Severity 4 — Severe (minutes)',
    severity3: 'Severity 3 — Moderate (minutes)',
    severity2: 'Severity 2 — Minor (minutes)',
    severity1: 'Severity 1 — Low (minutes)',
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Alert Configuration</h1>
      <p className="text-gray-500 text-sm">Set the maximum wait time per severity level before a critical alert is triggered.</p>
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        {Object.entries(thresholds).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-gray-700 flex-1">{labels[key]}</label>
            <input
              type="number" value={value} min={1}
              onChange={e => setThresholds({...thresholds, [key]: Number(e.target.value)})}
              className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {saved ? 'Saved!' : 'Save Thresholds'}
        </button>
      </div>
    </div>
  );
};

export default AlertConfig;