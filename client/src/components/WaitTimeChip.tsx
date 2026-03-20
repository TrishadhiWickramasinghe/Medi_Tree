interface Props {
  minutes: number;
}

const WaitTimeChip = ({ minutes }: Props) => {
  const getColor = () => {
    if (minutes === 0) return 'bg-green-100 text-green-800';
    if (minutes <= 15) return 'bg-blue-100 text-blue-800';
    if (minutes <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const format = () => {
    if (minutes === 0) return 'Next up';
    if (minutes < 60) return `~${minutes} min`;
    return `~${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {format()}
    </span>
  );
};

export default WaitTimeChip;