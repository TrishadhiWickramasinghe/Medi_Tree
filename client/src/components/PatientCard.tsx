import { useNavigate } from 'react-router-dom';
import type { Patient } from '../types';
import PriorityBadge from './PriorityBadge';
import WaitTimeChip from './WaitTimeChip';

interface Props {
  patient: Patient;
  rank: number;
}

const PatientCard = ({ patient, rank }: Props) => {
  const navigate = useNavigate();

  const waitMinutes = patient.estimatedWaitMinutes ?? 0;
  const arrivalTime = new Date(patient.arrivalTime).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div
      onClick={() => navigate(`/patients/${patient._id}`)}
      className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 truncate">{patient.name}</span>
          <PriorityBadge score={patient.priorityScore} severity={patient.severityRating} />
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-3">
          <span>Age {patient.age}</span>
          <span>·</span>
          <span>Arrived {arrivalTime}</span>
          <span>·</span>
          <span>{patient.symptoms.slice(0, 2).join(', ')}</span>
        </div>
      </div>
      <WaitTimeChip minutes={waitMinutes} />
    </div>
  );
};

export default PatientCard;
