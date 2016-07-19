import socket from 'socket.io-client';
const io = socket('http://localhost:1515');

export default io;
