import socket from 'socket.io-client';

const io = socket('http://104.131.184.199:1515');

export default io;
