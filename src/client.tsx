import { Fetch, io, WebSocket } from "socket.io-client";

console.log('main.tsx loaded')


const socket = io('ws://localhost:3000', {
  autoConnect: false,
  path: '/socket.io/',
  transports: [WebSocket, Fetch],
});

socket.connect()
