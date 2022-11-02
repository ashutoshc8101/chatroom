const express = require('express');

require('dotenv').config();
const db = require('./db');

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

io.on('connection', async (socket) => {
  const data = await db.Message.find().limit(50);

  socket.emit('all-messages', data);

  socket.on('add-message', async (data) => {
    let messageInstance = db.Message({...data});
    await messageInstance.save();
    io.emit('new-message', messageInstance);
  });
});

io.on("connect_error", (err) => {
  console.error(`connect_error due to ${err.message}`);
});

require('./speechToText')(io);

server.listen(5000, () => {
  console.log('listening on *:5000');
});
