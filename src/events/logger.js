'use strict';

const net = require('net');
const event = require('./event');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in logger.js created!'));

// Listener
client.on('data', (buffer) => {
  let payload = JSON.parse(buffer.toString().trim());

  if(payload.name === 'saved'){ 
    event.emit('save', payload);

  } else if(payload.name === 'error') { 
    event.emit('error', payload);
  }
});

let save = (payload) => {
  console.log(payload.message);
};

let error = (payload) => {
  console.error(payload.message);
};

event.on('save', save);
event.on('error', error);