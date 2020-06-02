'use strict';

const help = require(`./help.js`);
const generate = require(`./version.js`);
const version = require(`./generate.js`);
const server = require(`./server.js`);

const cli = {
  [help.name]: help,
  [generate.name]: generate,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  cli,
};
