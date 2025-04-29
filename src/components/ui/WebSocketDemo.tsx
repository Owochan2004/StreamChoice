'use client';

import { useSocket } from "@/hooks/useSocket";
import { useState, useEffect } from "react";

interface Notification {
  id: number;
  message: string;
}

export default function WebSocketDemo() {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("notificacion", (message: string) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message }]);

        // Eliminar la notificación después de 5 segundos
        setTimeout(() => {
          setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 5000);
      });

      return () => {
        socket.off("notificacion");
      };
    }
  }, [socket]);

  return (
    <div className="fixed top-4 right-4 space-y-4 z-50">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut"
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
}