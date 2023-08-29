import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (socket)
      socket.on("connect", () => {
        setSocket(socket);
      });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return { socket };
};

export default useSocket;
