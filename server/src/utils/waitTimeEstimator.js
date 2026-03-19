import { avlTree } from '../datastructures/AVLTree.js';

export const estimateWaitTime = (patientPriorityScore) => {
  const queue = avlTree.getSortedQueue();
  const avgTreatmentMinutes = 15;

  const patientsAhead = queue.filter(
    (p) => p.priorityScore > patientPriorityScore && p.status === 'waiting'
  ).length;

  return patientsAhead * avgTreatmentMinutes;
};