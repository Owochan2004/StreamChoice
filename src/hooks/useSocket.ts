import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Asegúrate que sea donde corre tu backend

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [welcomeMsg, setWelcomeMsg] = useState<string | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);

    socketInstance.on('connect', () => {
      console.log('🟢 Conectado al servidor WebSocket');
    });

    socketInstance.on('bienvenida', (mensaje: string) => {
      console.log('🎉 Mensaje recibido:', mensaje);
      setWelcomeMsg(mensaje);
    });

    socketInstance.on("notificacion", (message) => {
        console.log("Notificación recibida:", message);
      });

    socketInstance.on('disconnect', () => {
      console.log('🔴 Desconectado del servidor WebSocket');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, welcomeMsg };
};
