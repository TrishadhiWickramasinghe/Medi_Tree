import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Patient, TreeNode, CriticalAlert } from '../types';

interface SocketEvents {
  onQueueUpdate?: (queue: Patient[]) => void;
  onTreeUpdate?: (tree: TreeNode) => void;
  onCriticalAlert?: (alerts: CriticalAlert[]) => void;
}

export const useSocket = (events: SocketEvents) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    if (events.onQueueUpdate)
      socketRef.current.on('queue_updated', events.onQueueUpdate);

    if (events.onTreeUpdate)
      socketRef.current.on('tree_updated', events.onTreeUpdate);

    if (events.onCriticalAlert)
      socketRef.current.on('critical_alert', events.onCriticalAlert);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};