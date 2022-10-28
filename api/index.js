const express = require('express');

require('dotenv').config();

const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('add-message', (data) => {
    io.emit('new-message', data);
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

require('./speechToText')(io);

server.listen(5000, () => {
  console.log('listening on *:5000');
});
