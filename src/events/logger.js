'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in logger.js created!'));

// Listener
client.on('data', data => {
  let payload = JSON.parse(data.toString().trim());

  if(payload.name === 'saved'){ 
    console.log('Connection to logger socket saved', payload);

  } else { 
    console.error('Error connecting to logger socket', payload);
  }
});

client.on('close', () => {
  console.log('Connection to logger socket closed');
});