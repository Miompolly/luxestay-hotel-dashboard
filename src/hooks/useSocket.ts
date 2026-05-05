/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback } from 'react';

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const ws = new WebSocket(`${protocol}//${host}`);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      // Reconnect logic could go here
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const addListener = useCallback((handler: (event: MessageEvent) => void) => {
    if (socket) {
      socket.addEventListener('message', handler);
    }
    return () => {
      if (socket) {
        socket.removeEventListener('message', handler);
      }
    };
  }, [socket]);

  return { isConnected, addListener };
};
