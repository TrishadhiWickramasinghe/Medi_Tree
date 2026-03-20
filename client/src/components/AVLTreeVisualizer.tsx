import type { TreeNode } from '../types';

interface Props {
  tree: TreeNode | null;
}

const NodeBox = ({ node, x, y, level }: { node: TreeNode; x: number; y: number; level: number }) => {
  const boxW = 120;
  const boxH = 50;
  const gapY = 80;
  const gapX = Math.max(200 / (level + 1), 60);

  const getSeverityColor = (bf: number) => {
    if (bf > 1 || bf < -1) return '#fee2e2';
    if (bf === 0) return '#dcfce7';
    return '#dbeafe';
  };

  return (
    <g>
      {node.left && (
        <>
          <line
            x1={x} y1={y + boxH}
            x2={x - gapX} y2={y + boxH + gapY - boxH}
            stroke="#94a3b8" strokeWidth="1.5"
          />
          <NodeBox node={node.left} x={x - gapX} y={y + gapY} level={level + 1} />
        </>
      )}
      {node.right && (
        <>
          <line
            x1={x} y1={y + boxH}
            x2={x + gapX} y2={y + boxH + gapY - boxH}
            stroke="#94a3b8" strokeWidth="1.5"
          />
          <NodeBox node={node.right} x={x + gapX} y={y + gapY} level={level + 1} />
        </>
      )}
      <rect
        x={x - boxW / 2} y={y}
        width={boxW} height={boxH}
        rx="8"
        fill={getSeverityColor(node.balanceFactor)}
        stroke="#cbd5e1" strokeWidth="1"
      />
      <text x={x} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b">
        {node.patientName.split(' ')[0]}
      </text>
      <text x={x} y={y + 32} textAnchor="middle" fontSize="10" fill="#475569">
        Score: {node.priority}
      </text>
      <text x={x} y={y + 44} textAnchor="middle" fontSize="9" fill="#94a3b8">
        BF: {node.balanceFactor} | H: {node.height}
      </text>
    </g>
  );
};

const AVLTreeVisualizer = ({ tree }: Props) => {
  if (!tree) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-400 text-sm">No patients in queue — AVL Tree is empty</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="flex gap-4 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 inline-block"></span> Balanced (BF=0)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-100 inline-block"></span> Slight lean (BF=±1)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 inline-block"></span> Needs rotation</span>
      </div>
      <svg width="100%" height="400" viewBox="0 0 800 400">
        <NodeBox node={tree} x={400} y={20} level={0} />
      </svg>
    </div>
  );
};

export default AVLTreeVisualizer;
