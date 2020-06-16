'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);

const {logger} = require(`../logs/pino`);
const FILE_PATH = path.join(__dirname, `../../mocks.json`);

let data = null;

const getMockData = async () => {

  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_PATH);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);

};

(async () => {
  try {
    const fileContent = await fs.readFile(FILE_PATH);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
  }
})();

module.exports = getMockData;
