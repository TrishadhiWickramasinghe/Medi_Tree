import { useState } from 'react';
import type { CriticalAlert } from '../types';
import { useSocket } from '../hooks/useSocket';

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<CriticalAlert[]>([]);

  useSocket({ onCriticalAlert: (incoming) => setAlerts(incoming) });

  if (alerts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="font-bold text-sm tracking-wide">CRITICAL ALERT</span>
          <span className="text-sm text-red-100">
            {alerts.length} patient{alerts.length > 1 ? 's have' : ' has'} exceeded safe wait time —
            {' '}<span className="font-semibold">{alerts.map(a => a.name).join(', ')}</span>
          </span>
        </div>
        <button onClick={() => setAlerts([])} className="text-white/70 hover:text-white text-xl font-bold transition-colors">×</button>
      </div>
    </div>
  );
};

export default AlertBanner;