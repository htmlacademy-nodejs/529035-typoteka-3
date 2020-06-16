'use strict';

const getMockData = require(`../lib/get-mock-data`);
const app = require(`../server`);
require(`dotenv`).config();
const DEFAULT_PORT = process.env.PORT;
const {logger} = require(`../logs/pino`);
const {EXIT_CODE} = require(`../../constants`);

module.exports = {
  name: `--server`,
  async run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      await getMockData();

      app.listen(port, (err) => {
        if (err) {
          return logger.error(`Error: Server dont start, ${err}`);
        }

        return logger.info(`Start server on port ${port}`);
      });

    } catch (err) {
      logger.error(`Произошла ошибка: ${err.message}`);
      process.exit(EXIT_CODE.error);
    }
  }
};
