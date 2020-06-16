'use strict';

const pino = require(`pino`);
const path = require(`path`);

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
}, pino.destination(path.join(__dirname, `./info.log`)));

module.exports = {
  logger,
  // Метод всегда возвращает новый логгер, унаследованный
  // от стандартного логгера. В метод можно передать
  // специфичные настройки для нового экземпляра класса.
  getLogger(options = {}) {
    return logger.child(options);
  }
};
