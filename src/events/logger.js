'use strict';

const fs = require('fs');
const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in logger.js created!'));

// Listener
client.on('data', data => {
  let payload = JSON.parse(data.toString().trim());
  console.log(payload)
});

client.on('error', () => {
  console.log('Connection to logger socket closed');
});

client.on('save', () => {
  console.log('Connection to logger socket closed');
});

client.on('close', () => {
  console.log('Connection to logger socket closed');
});