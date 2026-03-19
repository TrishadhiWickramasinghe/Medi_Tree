import { avlTree } from '../datastructures/AVLTree.js';

// Max wait times in minutes per severity level
const MAX_WAIT_TIMES = {
  5: 5,
  4: 15,
  3: 30,
  2: 60,
  1: 120
};

export const checkCriticalPatients = (io) => {
  const queue = avlTree.getSortedQueue();
  const criticalPatients = [];

  queue.forEach((patient) => {
    if (patient.status !== 'waiting') return;

    const waitMinutes = (Date.now() - new Date(patient.arrivalTime)) / 60000;
    const maxWait = MAX_WAIT_TIMES[patient.severityRating];

    if (waitMinutes >= maxWait) {
      criticalPatients.push({
        patientId: patient._id,
        name: patient.name,
        severityRating: patient.severityRating,
        waitMinutes: Math.floor(waitMinutes),
        maxWait
      });
    }
  });

  if (criticalPatients.length > 0) {
    io.emit('critical_alert', criticalPatients);
  }
};

export const startAlertMonitor = (io) => {
  setInterval(() => checkCriticalPatients(io), 60000);
  console.log('Alert monitor started');
};