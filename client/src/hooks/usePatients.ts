import { useState, useEffect } from 'react';
import type { Patient, TreeNode } from '../types';
import { getQueue, getTreeStructure } from '../services/patientService';
import { useSocket } from './useSocket';

export const usePatients = () => {
  const [queue, setQueue] = useState<Patient[]>([]);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [queueData, treeData] = await Promise.all([
          getQueue(),
          getTreeStructure()
        ]);
        setQueue(queueData);
        setTree(treeData);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useSocket({
    onQueueUpdate: (updatedQueue) => setQueue(updatedQueue),
    onTreeUpdate: (updatedTree) => setTree(updatedTree)
  });

  return { queue, tree, loading };
};