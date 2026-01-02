import { useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userId) {
      // Replace with your backend URL
      const newSocket = io("http://localhost:5000", {
        query: { userId },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => setIsConnected(true));
      newSocket.on("disconnect", () => setIsConnected(false));

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  return { socket, onlineUsers, isConnected };
};