import { useNavigate } from 'react-router-dom';
import type { Patient } from '../types';
import PriorityBadge from './PriorityBadge';
import WaitTimeChip from './WaitTimeChip';

interface Props { patient: Patient; rank: number; }

const PatientCard = ({ patient, rank }: Props) => {
  const navigate = useNavigate();
  const arrivalTime = new Date(patient.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const waitMinutes = patient.estimatedWaitMinutes ?? 0;

  const rankColor = rank === 1
    ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white'
    : rank === 2
    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white'
    : rank === 3
    ? 'bg-gradient-to-br from-yellow-500 to-amber-400 text-white'
    : 'bg-slate-800 text-slate-400';

  return (
    <div
      onClick={() => navigate(`/patients/${patient._id}`)}
      className="card hover:border-slate-600 hover:bg-slate-800/80 p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 animate-fade-in group"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${rankColor}`}>
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">{patient.name}</span>
          <PriorityBadge score={patient.priorityScore} severity={patient.severityRating} />
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <span>Age {patient.age}</span>
          <span className="text-slate-700">·</span>
          <span>{patient.gender}</span>
          <span className="text-slate-700">·</span>
          <span>Arrived {arrivalTime}</span>
          {patient.symptoms.length > 0 && (
            <>
              <span className="text-slate-700">·</span>
              <span className="text-slate-400">{patient.symptoms.slice(0, 2).join(', ')}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <WaitTimeChip minutes={waitMinutes} />
        <span className="text-slate-600 group-hover:text-slate-400 transition-colors">›</span>
      </div>
    </div>
  );
};

export default PatientCard;