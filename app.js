'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => console.log('Socket in app.js created!'));

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const toUpper = (buffer) => Buffer.from(buffer.toString().trim().toUpperCase());

const alterFile = (file) => {
  readFile(file) 
    .then(data => {
      data = toUpper(data);
      writeFile(file, data);
    })
    .then(() => {
      let save = {
        name: 'save',
        message: 'Successfully saved!',
      };
      client.write(JSON.stringify(save));
    })
    .catch(() => {
      let error = {
        name: 'error',
        message: 'Uhoh! Error!',
      };
      client.write(JSON.stringify(error));
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
