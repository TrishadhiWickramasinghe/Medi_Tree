interface Props { minutes: number; }

const WaitTimeChip = ({ minutes }: Props) => {
  const config = minutes === 0
    ? { color: 'bg-emerald-500/20 text-emerald-400', label: 'Next up' }
    : minutes <= 15
    ? { color: 'bg-blue-500/20 text-blue-400', label: `~${minutes}m` }
    : minutes <= 30
    ? { color: 'bg-yellow-500/20 text-yellow-400', label: `~${minutes}m` }
    : { color: 'bg-red-500/20 text-red-400', label: `~${Math.floor(minutes / 60)}h ${minutes % 60}m` };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  );
};

export default WaitTimeChip;