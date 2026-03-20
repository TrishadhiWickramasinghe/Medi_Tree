import type { TreeNode } from '../types';

interface Props { tree: TreeNode | null; }

const NodeBox = ({ node, x, y, level }: { node: TreeNode; x: number; y: number; level: number }) => {
  const boxW = 130;
  const boxH = 56;
  const gapY = 90;
  const gapX = Math.max(180 / (level + 1), 70);

  const getBF = (bf: number) => {
    if (bf > 1 || bf < -1) return { fill: '#7f1d1d', stroke: '#ef4444', text: '#fca5a5' };
    if (bf === 0) return { fill: '#052e16', stroke: '#22c55e', text: '#86efac' };
    return { fill: '#172554', stroke: '#3b82f6', text: '#93c5fd' };
  };

  const colors = getBF(node.balanceFactor);

  return (
    <g>
      {node.left && (
        <>
          <line x1={x} y1={y + boxH} x2={x - gapX} y2={y + boxH + gapY - boxH} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          <NodeBox node={node.left} x={x - gapX} y={y + gapY} level={level + 1} />
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + boxH} x2={x + gapX} y2={y + boxH + gapY - boxH} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          <NodeBox node={node.right} x={x + gapX} y={y + gapY} level={level + 1} />
        </>
      )}
      <rect x={x - boxW / 2} y={y} width={boxW} height={boxH} rx="10" fill={colors.fill} stroke={colors.stroke} strokeWidth="1.5" />
      <text x={x} y={y + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">
        {node.patientName.split(' ')[0]}
      </text>
      <text x={x} y={y + 30} textAnchor="middle" fontSize="10" fill="#94a3b8">
        Score: <tspan fill={colors.text} fontWeight="600">{node.priority}</tspan>
      </text>
      <text x={x} y={y + 44} textAnchor="middle" fontSize="9" fill="#64748b">
        BF: {node.balanceFactor}  |  H: {node.height}
      </text>
    </g>
  );
};

const AVLTreeVisualizer = ({ tree }: Props) => {
  if (!tree) return (
    <div className="flex flex-col items-center justify-center h-48 bg-slate-900 rounded-2xl border border-dashed border-slate-700">
      <div className="text-slate-600 text-4xl mb-2">⊘</div>
      <p className="text-slate-500 text-sm">AVL Tree is empty — no patients in queue</p>
    </div>
  );

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-auto">
      <div className="flex gap-5 text-xs text-slate-500 mb-4 px-2">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-900 border border-emerald-500 inline-block" /> Balanced (BF=0)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-950 border border-blue-500 inline-block" /> Slight lean (BF=±1)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-950 border border-red-500 inline-block" /> Needs rotation</span>
      </div>
      <svg width="100%" height="420" viewBox="0 0 800 420">
        <NodeBox node={tree} x={400} y={20} level={0} />
      </svg>
    </div>
  );
};

export default AVLTreeVisualizer;