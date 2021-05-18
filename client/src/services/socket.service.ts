import socketio from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SERVER_BASE_URL ?? '';

export const socket = socketio.connect(SOCKET_URL);
