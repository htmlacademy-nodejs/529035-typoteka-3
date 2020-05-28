'use strict';

const {cli} = require(`./cli`);
const {USER_PARAMS_START, DEFAULT_COMMAND, EXIT_CODE} = require(`../constants`);

const userProcess = process.argv.slice(USER_PARAMS_START);
const [userCommand] = userProcess;

if (!cli[userCommand] || userProcess.length === 0) {
  cli[DEFAULT_COMMAND].run();
  process.exit(EXIT_CODE.success);
}

cli[userCommand].run(userProcess.slice(1));

