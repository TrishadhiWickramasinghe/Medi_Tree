interface Props {
  score: number;
  severity: number;
}

const PriorityBadge = ({ score, severity }: Props) => {
  const getColor = () => {
    if (severity === 5) return 'bg-red-100 text-red-800 border border-red-300';
    if (severity === 4) return 'bg-orange-100 text-orange-800 border border-orange-300';
    if (severity === 3) return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    if (severity === 2) return 'bg-blue-100 text-blue-800 border border-blue-300';
    return 'bg-green-100 text-green-800 border border-green-300';
  };

  const getLabel = () => {
    if (severity === 5) return 'Critical';
    if (severity === 4) return 'Severe';
    if (severity === 3) return 'Moderate';
    if (severity === 2) return 'Minor';
    return 'Low';
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      <span className="font-bold">{getLabel()}</span>
      <span className="opacity-70">· {score}</span>
    </span>
  );
};

export default PriorityBadge;