import socket from 'socket.io-client';

const io = socket('http://192.168.1.18:1515');

export default io;
