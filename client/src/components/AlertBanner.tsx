import { useState, useEffect } from 'react';
import type { CriticalAlert } from '../types';
import { useSocket } from '../hooks/useSocket';

const AlertBanner = () => {
  const [alerts, setAlerts] = useState<CriticalAlert[]>([]);

  useSocket({
    onCriticalAlert: (incoming) => setAlerts(incoming)
  });

  if (alerts.length === 0) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">CRITICAL ALERT</span>
          <span className="text-sm">
            {alerts.length} patient{alerts.length > 1 ? 's have' : ' has'} exceeded safe wait time:
            {' '}{alerts.map(a => a.name).join(', ')}
          </span>
        </div>
        <button
          onClick={() => setAlerts([])}
          className="text-white opacity-75 hover:opacity-100 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
