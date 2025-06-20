import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketStore {
    socket: Socket;
}

export const useSocketStore = create<SocketStore>(() => ({
    socket: io("https://socket-u7uh.onrender.com"),
}));
