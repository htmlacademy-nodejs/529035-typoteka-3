'use strict';

const help = require(`./help.js`);
const generate = require(`./version.js`);
const version = require(`./generate.js`);

const cli = {
  [help.name]: help,
  [generate.name]: generate,
  [version.name]: version,
};

module.exports = {
  cli,
};
