interface Props { score: number; severity: number; }

const PriorityBadge = ({ score, severity }: Props) => {
  const config = {
    5: { label: 'Critical', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
    4: { label: 'Severe', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' },
    3: { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    2: { label: 'Minor', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
    1: { label: 'Low', color: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  }[severity] ?? { label: 'Unknown', color: 'bg-slate-700 text-slate-400' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${severity === 5 ? 'bg-red-400 animate-ping' : 'bg-current'}`} />
      {config.label}
      <span className="opacity-60">· {score}</span>
    </span>
  );
};

export default PriorityBadge;