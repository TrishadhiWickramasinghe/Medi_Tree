import { EVENTS } from './events.js';
import { avlTree } from '../datastructures/AVLTree.js';
import { startAlertMonitor } from '../utils/alertMonitor.js';

export const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send current queue on connection
    socket.emit(EVENTS.QUEUE_UPDATED, avlTree.getSortedQueue());
    socket.emit(EVENTS.TREE_UPDATED, avlTree.getTreeStructure());

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  startAlertMonitor(io);
};